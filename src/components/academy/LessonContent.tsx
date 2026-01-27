import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/hooks/useCourses";
import { LessonQuiz } from "./LessonQuiz";
import { LessonQA } from "./LessonQA";
import ReactMarkdown from "react-markdown";

interface LessonContentProps {
  lesson: Lesson;
  userId: string;
  isCompleted: boolean;
  onComplete: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function LessonContent({
  lesson,
  userId,
  isCompleted,
  onComplete,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: LessonContentProps) {
  const [showQuiz, setShowQuiz] = useState(false);

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto p-8">
        {/* Lesson Title */}
        <h1 className="text-3xl font-bold text-foreground mb-6">{lesson.title}</h1>

        {/* Video Player */}
        {lesson.media_type === "video" && lesson.media_url && (
          <div className="mb-8">
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              {getYouTubeEmbedUrl(lesson.media_url) ? (
                <iframe
                  src={getYouTubeEmbedUrl(lesson.media_url)!}
                  title={lesson.media_title || lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <a
                    href={lesson.media_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                  >
                    <PlayCircle className="h-12 w-12" />
                    <span>Watch Video</span>
                  </a>
                </div>
              )}
            </div>
            {lesson.media_title && (
              <p className="text-sm text-muted-foreground mt-2">{lesson.media_title}</p>
            )}
          </div>
        )}

        {/* Lesson Content - Using react-markdown for safe rendering */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-foreground mt-8 mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-foreground mt-8 mb-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-muted-foreground mb-4">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em>{children}</em>,
              ul: ({ children }) => (
                <ul className="list-disc ml-4 text-muted-foreground">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-4 text-muted-foreground">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground bg-muted/50 rounded-r">
                  {children}
                </blockquote>
              ),
            }}
          >
            {lesson.content_md}
          </ReactMarkdown>
        </div>

        {/* Quiz Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <LessonQuiz
            lessonId={lesson.id}
            userId={userId}
            onPass={() => {
              if (!isCompleted) onComplete();
            }}
          />
        </div>

        {/* Q&A Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <LessonQA lessonId={lesson.id} userId={userId} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!hasPrevious}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-4">
            {!isCompleted && (
              <Button variant="outline" onClick={onComplete}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
            )}
            {isCompleted && (
              <span className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </span>
            )}
          </div>

          <Button onClick={onNext} disabled={!hasNext}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
