import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, Json } from "@/integrations/supabase/types";

export type Quiz = Tables<"quizzes">;
export type QuizQuestion = Omit<Tables<"quiz_questions">, "correct_answer">;
export type UserQuizAttempt = Tables<"user_quiz_attempts">;

export function useLessonQuiz(lessonId: string | undefined) {
  return useQuery({
    queryKey: ["lesson-quiz", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("lesson_id", lessonId!)
        .maybeSingle();

      if (error) throw error;
      return data as Quiz | null;
    },
    enabled: !!lessonId,
  });
}

export function useQuizQuestions(quizId: string | undefined) {
  return useQuery({
    queryKey: ["quiz-questions", quizId],
    queryFn: async () => {
      // Use the public view that excludes correct_answer
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (supabase as any)
        .from("quiz_questions_public")
        .select("id, quiz_id, question, options, explanation, order_index, created_at")
        .eq("quiz_id", quizId)
        .order("order_index", { ascending: true });

      if (response.error) throw response.error;
      return (response.data || []) as QuizQuestion[];
    },
    enabled: !!quizId,
  });
}

export function useUserQuizAttempts(quizId: string | undefined, userId: string | undefined) {
  return useQuery({
    queryKey: ["quiz-attempts", quizId, userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_quiz_attempts")
        .select("*")
        .eq("quiz_id", quizId!)
        .eq("user_id", userId!)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as UserQuizAttempt[];
    },
    enabled: !!quizId && !!userId,
  });
}

export function useSubmitQuizAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quizId,
      answers,
    }: {
      quizId: string;
      answers: Record<string, number>;
    }): Promise<{ score: number; passed: boolean; attempt_id: string }> => {
      // Get current session for auth token
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (!token) {
        throw new Error("Not authenticated");
      }

      // Call the secure edge function for server-side grading
      const { data, error } = await supabase.functions.invoke("submit-quiz", {
        body: { quiz_id: quizId, answers },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to submit quiz");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return data as { score: number; passed: boolean; attempt_id: string };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["quiz-attempts", variables.quizId] });
    },
  });
}
