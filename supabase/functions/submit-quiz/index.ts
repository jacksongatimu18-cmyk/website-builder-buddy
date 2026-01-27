import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // Create client with user's token for auth verification
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify user
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      console.error("Auth error:", claimsError);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub as string;
    console.log("Authenticated user:", userId);

    // Parse request body
    const { quiz_id, answers } = await req.json();
    
    if (!quiz_id || !answers) {
      console.error("Missing quiz_id or answers");
      return new Response(
        JSON.stringify({ error: "Missing quiz_id or answers" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing quiz:", quiz_id);

    // Create admin client to access correct answers (service role bypasses RLS)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Rate limiting: Check for recent attempts (max 3 per minute)
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
    const { data: recentAttempts, error: attemptsError } = await supabaseAdmin
      .from("user_quiz_attempts")
      .select("created_at")
      .eq("user_id", userId)
      .eq("quiz_id", quiz_id)
      .gte("created_at", oneMinuteAgo);

    if (attemptsError) {
      console.error("Error checking recent attempts:", attemptsError);
    }

    if (recentAttempts && recentAttempts.length >= 3) {
      console.warn("Rate limit exceeded for user:", userId);
      return new Response(
        JSON.stringify({ error: "Too many attempts. Please wait a minute before trying again." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch quiz questions with correct answers (admin bypasses RLS)
    const { data: questions, error: questionsError } = await supabaseAdmin
      .from("quiz_questions")
      .select("id, correct_answer")
      .eq("quiz_id", quiz_id);

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch quiz questions" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!questions || questions.length === 0) {
      console.error("No questions found for quiz:", quiz_id);
      return new Response(
        JSON.stringify({ error: "Quiz not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calculate score server-side
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    console.log("Calculated score:", score, "correct:", correct, "total:", questions.length);

    // Fetch passing score
    const { data: quiz, error: quizError } = await supabaseAdmin
      .from("quizzes")
      .select("passing_score")
      .eq("id", quiz_id)
      .single();

    if (quizError || !quiz) {
      console.error("Error fetching quiz:", quizError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch quiz details" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const passed = score >= quiz.passing_score;
    console.log("Passed:", passed, "Required:", quiz.passing_score);

    // Insert attempt using admin client
    const { data: attempt, error: insertError } = await supabaseAdmin
      .from("user_quiz_attempts")
      .insert({
        quiz_id,
        user_id: userId,
        answers,
        score,
        passed,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting attempt:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save quiz attempt" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Quiz attempt saved successfully:", attempt.id);

    return new Response(
      JSON.stringify({ score, passed, attempt_id: attempt.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
