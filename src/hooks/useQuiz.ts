import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, Json } from "@/integrations/supabase/types";

export type Quiz = Tables<"quizzes">;
export type QuizQuestion = Tables<"quiz_questions">;
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
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("quiz_id", quizId!)
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as QuizQuestion[];
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
      userId,
      answers,
      score,
      passed,
    }: {
      quizId: string;
      userId: string;
      answers: Record<string, number>;
      score: number;
      passed: boolean;
    }) => {
      const { data, error } = await supabase
        .from("user_quiz_attempts")
        .insert({
          quiz_id: quizId,
          user_id: userId,
          answers: answers as unknown as Json,
          score,
          passed,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["quiz-attempts", variables.quizId, variables.userId] });
    },
  });
}
