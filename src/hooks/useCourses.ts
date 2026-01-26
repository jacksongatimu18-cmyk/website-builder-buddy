import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Course = Tables<"courses">;
export type CourseModule = Tables<"course_modules">;
export type Lesson = Tables<"lessons">;

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Course[];
    },
  });
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;
      return data as Course | null;
    },
    enabled: !!slug,
  });
}

export function useCourseModules(courseId: string | undefined) {
  return useQuery({
    queryKey: ["course-modules", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_modules")
        .select("*")
        .eq("course_id", courseId!)
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as CourseModule[];
    },
    enabled: !!courseId,
  });
}

export function useModuleLessons(moduleId: string | undefined) {
  return useQuery({
    queryKey: ["module-lessons", moduleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("module_id", moduleId!)
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as Lesson[];
    },
    enabled: !!moduleId,
  });
}

export function useLesson(lessonId: string | undefined) {
  return useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId!)
        .maybeSingle();

      if (error) throw error;
      return data as Lesson | null;
    },
    enabled: !!lessonId,
  });
}

export function useCourseWithModulesAndLessons(courseId: string | undefined) {
  return useQuery({
    queryKey: ["course-full", courseId],
    queryFn: async () => {
      // Get modules
      const { data: modules, error: modulesError } = await supabase
        .from("course_modules")
        .select("*")
        .eq("course_id", courseId!)
        .order("order_index", { ascending: true });

      if (modulesError) throw modulesError;

      // Get lessons for all modules
      const moduleIds = modules.map((m) => m.id);
      const { data: lessons, error: lessonsError } = await supabase
        .from("lessons")
        .select("*")
        .in("module_id", moduleIds)
        .order("order_index", { ascending: true });

      if (lessonsError) throw lessonsError;

      // Organize lessons by module
      const modulesWithLessons = modules.map((module) => ({
        ...module,
        lessons: lessons.filter((l) => l.module_id === module.id),
      }));

      return modulesWithLessons;
    },
    enabled: !!courseId,
  });
}
