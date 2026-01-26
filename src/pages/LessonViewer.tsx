import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import spacLogo from "@/assets/spac-logo.jpg";
import { useLesson, useCourseModules, useModuleLessons, useCourse } from "@/hooks/useCourses";
import { useUserLessonProgress, useUpdateLessonProgress } from "@/hooks/useProgress";
import { CourseSidebar } from "@/components/academy/CourseSidebar";
import { LessonContent } from "@/components/academy/LessonContent";

const LessonViewer = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: lesson, isLoading: lessonLoading } = useLesson(lessonId);
  
  // Get module for this lesson to find course
  const [courseId, setCourseId] = useState<string | undefined>();
  const [courseSlug, setCourseSlug] = useState<string>("");

  const { data: modules } = useCourseModules(courseId);
  const { data: progress } = useUserLessonProgress(user?.id);
  const updateProgress = useUpdateLessonProgress();

  // Fetch course info from lesson's module
  useEffect(() => {
    if (lesson?.module_id) {
      supabase
        .from("course_modules")
        .select("course_id")
        .eq("id", lesson.module_id)
        .single()
        .then(({ data }) => {
          if (data) {
            setCourseId(data.course_id);
            // Get course slug
            supabase
              .from("courses")
              .select("slug")
              .eq("id", data.course_id)
              .single()
              .then(({ data: courseData }) => {
                if (courseData) setCourseSlug(courseData.slug);
              });
          }
        });
    }
  }, [lesson?.module_id]);

  // Build ordered list of all lessons
  const allLessons = useMemo(() => {
    if (!modules) return [];
    return modules.flatMap((module) => {
      // Need to fetch lessons for each module
      return [];
    });
  }, [modules]);

  // Fetch all lessons for navigation
  const [orderedLessons, setOrderedLessons] = useState<{ id: string; title: string }[]>([]);
  const [modulesWithLessons, setModulesWithLessons] = useState<any[]>([]);

  useEffect(() => {
    if (courseId) {
      // Fetch modules with lessons
      supabase
        .from("course_modules")
        .select("*")
        .eq("course_id", courseId)
        .order("order_index", { ascending: true })
        .then(async ({ data: mods }) => {
          if (!mods) return;

          const moduleIds = mods.map((m) => m.id);
          const { data: lessons } = await supabase
            .from("lessons")
            .select("*")
            .in("module_id", moduleIds)
            .order("order_index", { ascending: true });

          if (lessons) {
            const modulesWithL = mods.map((mod) => ({
              ...mod,
              lessons: lessons.filter((l) => l.module_id === mod.id),
            }));
            setModulesWithLessons(modulesWithL);

            // Flatten for navigation
            const ordered = modulesWithL.flatMap((m) => m.lessons.map((l: any) => ({ id: l.id, title: l.title })));
            setOrderedLessons(ordered);
          }
        });
    }
  }, [courseId]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Mark as in_progress when viewing
  useEffect(() => {
    if (user && lesson && progress) {
      const lessonProgress = progress.find((p) => p.lesson_id === lesson.id);
      if (!lessonProgress || lessonProgress.status === "not_started") {
        updateProgress.mutate({
          lessonId: lesson.id,
          userId: user.id,
          status: "in_progress",
          progressPercent: 10,
        });
      }
    }
  }, [user?.id, lesson?.id, progress]);

  if (loading || lessonLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!user || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Lesson not found</p>
          <Link to="/academy">
            <Button>Back to Academy</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = orderedLessons.findIndex((l) => l.id === lessonId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < orderedLessons.length - 1;
  const lessonProgress = progress?.find((p) => p.lesson_id === lesson.id);
  const isCompleted = lessonProgress?.status === "completed";

  const handleComplete = () => {
    updateProgress.mutate({
      lessonId: lesson.id,
      userId: user.id,
      status: "completed",
      progressPercent: 100,
    });
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      navigate(`/academy/lesson/${orderedLessons[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      navigate(`/academy/lesson/${orderedLessons[currentIndex + 1].id}`);
    } else if (courseSlug) {
      // Go back to course page
      navigate(`/academy/course/${courseSlug}`);
    }
  };

  const handleSelectLesson = (id: string) => {
    navigate(`/academy/lesson/${id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/academy" className="flex items-center gap-2">
                <img src={spacLogo} alt="SPAC Network" className="h-8 w-auto" />
              </Link>
              <span className="text-lg font-bold text-primary">Academy</span>
            </div>
            {courseSlug && (
              <Link to={`/academy/course/${courseSlug}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Course
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <CourseSidebar
          modules={modulesWithLessons}
          currentLessonId={lessonId}
          progress={progress || []}
          onSelectLesson={handleSelectLesson}
        />

        {/* Lesson Content */}
        <LessonContent
          lesson={lesson}
          userId={user.id}
          isCompleted={isCompleted}
          onComplete={handleComplete}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
};

export default LessonViewer;
