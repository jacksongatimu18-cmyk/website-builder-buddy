import { CheckCircle2, Circle, PlayCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseModule, Lesson } from "@/hooks/useCourses";
import type { UserLessonProgress } from "@/hooks/useProgress";

interface ModuleWithLessons extends CourseModule {
  lessons: Lesson[];
}

interface CourseSidebarProps {
  modules: ModuleWithLessons[];
  currentLessonId?: string;
  progress: UserLessonProgress[];
  onSelectLesson: (lessonId: string) => void;
}

export function CourseSidebar({
  modules,
  currentLessonId,
  progress,
  onSelectLesson,
}: CourseSidebarProps) {
  const getLessonStatus = (lessonId: string) => {
    const p = progress.find((pr) => pr.lesson_id === lessonId);
    return p?.status || "not_started";
  };

  const getStatusIcon = (status: string, isCurrent: boolean) => {
    if (status === "completed") {
      return <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />;
    }
    if (isCurrent || status === "in_progress") {
      return <PlayCircle className="h-4 w-4 text-primary flex-shrink-0" />;
    }
    return <Circle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />;
  };

  return (
    <aside className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="font-bold text-lg text-foreground mb-4">Course Content</h2>
        
        <div className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <div key={module.id}>
              {/* Module Header */}
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  Module {moduleIndex + 1}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{module.title}</h3>
              
              {/* Lessons */}
              <ul className="space-y-1">
                {module.lessons.map((lesson) => {
                  const status = getLessonStatus(lesson.id);
                  const isCurrent = lesson.id === currentLessonId;

                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => onSelectLesson(lesson.id)}
                        className={cn(
                          "w-full flex items-start gap-2 p-2 rounded-lg text-left transition-colors",
                          isCurrent
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {getStatusIcon(status, isCurrent)}
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-sm truncate", isCurrent && "font-medium")}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lesson.estimated_minutes} min
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
