import { Link } from "react-router-dom";
import { BookOpen, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/hooks/useCourses";

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const levelColors: Record<string, string> = {
    Beginner: "bg-green-500/10 text-green-600",
    Intermediate: "bg-amber-500/10 text-amber-600",
    Advanced: "bg-red-500/10 text-red-600",
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
      {/* Hero Image */}
      <div className="h-40 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
        <BookOpen className="h-16 w-16 text-primary/40" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${levelColors[course.level] || "bg-muted text-muted-foreground"}`}>
            {course.level}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {course.estimated_hours} hours
          </span>
        </div>

        {/* Title & Summary */}
        <h3 className="text-xl font-bold text-foreground mb-2">{course.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
          {course.summary}
        </p>

        {/* Progress Bar */}
        {progress !== undefined && progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <Link to={`/academy/course/${course.slug}`}>
          <Button className="w-full" variant={progress ? "outline" : "default"}>
            {progress ? (
              <>
                <BarChart3 className="h-4 w-4 mr-2" />
                Continue Learning
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4 mr-2" />
                Start Course
              </>
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
}
