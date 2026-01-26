import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, Json } from "@/integrations/supabase/types";

export type UserLessonProgress = Tables<"user_lesson_progress">;
export type UserQuizAttempt = Tables<"user_quiz_attempts">;
export type UserCertificate = Tables<"user_course_certificates">;

export function useUserLessonProgress(userId: string | undefined) {
  return useQuery({
    queryKey: ["user-lesson-progress", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_lesson_progress")
        .select("*")
        .eq("user_id", userId!);

      if (error) throw error;
      return data as UserLessonProgress[];
    },
    enabled: !!userId,
  });
}

export function useLessonProgress(lessonId: string | undefined, userId: string | undefined) {
  return useQuery({
    queryKey: ["lesson-progress", lessonId, userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_lesson_progress")
        .select("*")
        .eq("lesson_id", lessonId!)
        .eq("user_id", userId!)
        .maybeSingle();

      if (error) throw error;
      return data as UserLessonProgress | null;
    },
    enabled: !!lessonId && !!userId,
  });
}

export function useUpdateLessonProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      lessonId,
      userId,
      status,
      progressPercent,
      lastPosition,
    }: {
      lessonId: string;
      userId: string;
      status: string;
      progressPercent: number;
      lastPosition?: Json;
    }) => {
      const { data: existing } = await supabase
        .from("user_lesson_progress")
        .select("id")
        .eq("lesson_id", lessonId)
        .eq("user_id", userId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("user_lesson_progress")
          .update({
            status,
            progress_percent: progressPercent,
            last_position: lastPosition ?? null,
            completed_at: status === "completed" ? new Date().toISOString() : null,
          })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("user_lesson_progress").insert([{
          lesson_id: lessonId,
          user_id: userId,
          status,
          progress_percent: progressPercent,
          last_position: lastPosition ?? null,
          completed_at: status === "completed" ? new Date().toISOString() : null,
        }]);

        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lesson-progress", variables.lessonId] });
      queryClient.invalidateQueries({ queryKey: ["user-lesson-progress", variables.userId] });
    },
  });
}

export function useUserCertificates(userId: string | undefined) {
  return useQuery({
    queryKey: ["user-certificates", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_course_certificates")
        .select("*")
        .eq("user_id", userId!);

      if (error) throw error;
      return data as UserCertificate[];
    },
    enabled: !!userId,
  });
}

export function useCreateCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      courseId,
      userId,
    }: {
      courseId: string;
      userId: string;
    }) => {
      // Generate unique certificate code
      const certificateCode = `SPAC-${courseId.substring(0, 4).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

      const { data, error } = await supabase
        .from("user_course_certificates")
        .insert({
          course_id: courseId,
          user_id: userId,
          certificate_code: certificateCode,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user-certificates", variables.userId] });
    },
  });
}
