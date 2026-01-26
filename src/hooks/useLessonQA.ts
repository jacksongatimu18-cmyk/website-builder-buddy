import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type LessonQuestion = Tables<"lesson_questions">;
export type LessonAnswer = Tables<"lesson_answers">;

export function useLessonQuestions(lessonId: string | undefined) {
  return useQuery({
    queryKey: ["lesson-questions", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lesson_questions")
        .select("*")
        .eq("lesson_id", lessonId!)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as LessonQuestion[];
    },
    enabled: !!lessonId,
  });
}

export function useQuestionAnswers(questionId: string | undefined) {
  return useQuery({
    queryKey: ["question-answers", questionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lesson_answers")
        .select("*")
        .eq("question_id", questionId!)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as LessonAnswer[];
    },
    enabled: !!questionId,
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lessonId,
      userId,
      title,
      body,
    }: {
      lessonId: string;
      userId: string;
      title: string;
      body: string;
    }) => {
      const { data, error } = await supabase
        .from("lesson_questions")
        .insert({
          lesson_id: lessonId,
          user_id: userId,
          title,
          body,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lesson-questions", variables.lessonId] });
    },
  });
}

export function useCreateAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      questionId,
      userId,
      body,
    }: {
      questionId: string;
      userId: string;
      body: string;
    }) => {
      const { data, error } = await supabase
        .from("lesson_answers")
        .insert({
          question_id: questionId,
          user_id: userId,
          body,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["question-answers", variables.questionId] });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, lessonId }: { questionId: string; lessonId: string }) => {
      const { error } = await supabase
        .from("lesson_questions")
        .delete()
        .eq("id", questionId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lesson-questions", variables.lessonId] });
    },
  });
}

export function useDeleteAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ answerId, questionId }: { answerId: string; questionId: string }) => {
      const { error } = await supabase
        .from("lesson_answers")
        .delete()
        .eq("id", answerId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["question-answers", variables.questionId] });
    },
  });
}
