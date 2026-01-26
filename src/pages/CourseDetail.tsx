import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Award, BookOpen, CheckCircle2, Play } from "lucide-react";
import spacLogo from "@/assets/spac-logo.jpg";
import { useCourse, useCourseWithModulesAndLessons } from "@/hooks/useCourses";
import { useUserLessonProgress, useUserCertificates, useCreateCertificate } from "@/hooks/useProgress";
import { CourseCertificate } from "@/components/academy/CourseCertificate";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: course, isLoading: courseLoading } = useCourse(slug || "");
  const { data: modules, isLoading: modulesLoading } = useCourseWithModulesAndLessons(course?.id);
  const { data: progress } = useUserLessonProgress(user?.id);
  const { data: certificates } = useUserCertificates(user?.id);
  const createCertificate = useCreateCertificate();

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

  if (loading || courseLoading || modulesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!user || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Course not found</p>
          <Link to="/academy">
            <Button>Back to Academy</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate progress
  const allLessons = modules?.flatMap((m) => m.lessons) || [];
  const completedLessons = progress?.filter((p) => p.status === "completed" && allLessons.some((l) => l.id === p.lesson_id)) || [];
  const progressPercent = allLessons.length > 0 ? (completedLessons.length / allLessons.length) * 100 : 0;
  const isCompleted = progressPercent === 100;
  const certificate = certificates?.find((c) => c.course_id === course.id);

  // Find first incomplete lesson or first lesson
  const firstIncompleteLesson = allLessons.find((l) => !completedLessons.some((cl) => cl.lesson_id === l.id));
  const startLessonId = firstIncompleteLesson?.id || allLessons[0]?.id;

  const handleStartCourse = () => {
    if (startLessonId) {
      navigate(`/academy/lesson/${startLessonId}`);
    }
  };

  const handleGetCertificate = async () => {
    if (!certificate && isCompleted) {
      await createCertificate.mutateAsync({
        courseId: course.id,
        userId: user.id,
      });
    }
  };

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Student";

  const levelColors: Record<string, string> = {
    Beginner: "bg-green-500/10 text-green-600",
    Intermediate: "bg-amber-500/10 text-amber-600",
    Advanced: "bg-red-500/10 text-red-600",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/academy" className="flex items-center gap-2">
                <img src={spacLogo} alt="SPAC Network" className="h-10 w-auto" />
              </Link>
              <span className="text-xl font-bold text-primary">Academy</span>
            </div>
            <Link to="/academy">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Certificate View */}
        {certificate && (
          <div className="mb-12">
            <CourseCertificate course={course} certificate={certificate} userName={userName} />
          </div>
        )}

        {/* Course Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${levelColors[course.level]}`}>
              {course.level}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {course.estimated_hours} hours
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              {allLessons.length} lessons
            </span>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">{course.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{course.summary}</p>

          {/* Progress Bar */}
          {progressPercent > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Your Progress</span>
                <span className="font-medium text-primary">{Math.round(progressPercent)}% complete</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-4">
            {!isCompleted && (
              <Button size="lg" onClick={handleStartCourse}>
                <Play className="h-5 w-5 mr-2" />
                {progressPercent > 0 ? "Continue Learning" : "Start Course"}
              </Button>
            )}
            {isCompleted && !certificate && (
              <Button size="lg" onClick={handleGetCertificate} disabled={createCertificate.isPending}>
                <Award className="h-5 w-5 mr-2" />
                Get Your Certificate
              </Button>
            )}
            {isCompleted && certificate && (
              <span className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle2 className="h-5 w-5" />
                Course Completed!
              </span>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Course Content</h2>
          
          <div className="space-y-6">
            {modules?.map((module, moduleIndex) => (
              <div key={module.id} className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Module Header */}
                <div className="bg-muted/50 px-6 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      Module {moduleIndex + 1}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {module.lessons.length} lessons
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{module.title}</h3>
                  {module.summary && (
                    <p className="text-sm text-muted-foreground mt-1">{module.summary}</p>
                  )}
                </div>

                {/* Lessons */}
                <ul className="divide-y divide-border">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const isLessonCompleted = completedLessons.some((cl) => cl.lesson_id === lesson.id);

                    return (
                      <li key={lesson.id}>
                        <Link
                          to={`/academy/lesson/${lesson.id}`}
                          className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors"
                        >
                          {isLessonCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <span className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {lesson.estimated_minutes} min
                              {lesson.media_type && ` • ${lesson.media_type}`}
                            </p>
                          </div>
                          <Play className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
