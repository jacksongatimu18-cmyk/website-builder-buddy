import { useState } from "react";
import { CheckCircle2, XCircle, Award, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLessonQuiz, useQuizQuestions, useUserQuizAttempts, useSubmitQuizAttempt } from "@/hooks/useQuiz";
import { cn } from "@/lib/utils";

interface LessonQuizProps {
  lessonId: string;
  userId: string;
  onPass: () => void;
}

export function LessonQuiz({ lessonId, userId, onPass }: LessonQuizProps) {
  const { data: quiz, isLoading: quizLoading } = useLessonQuiz(lessonId);
  const { data: questions, isLoading: questionsLoading } = useQuizQuestions(quiz?.id);
  const { data: attempts } = useUserQuizAttempts(quiz?.id, userId);
  const submitAttempt = useSubmitQuizAttempt();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (quizLoading || questionsLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-4" />
        <div className="h-20 bg-muted rounded mb-4" />
      </div>
    );
  }

  if (!quiz || !questions || questions.length === 0) {
    return null;
  }

  const hasPassed = attempts?.some((a) => a.passed);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (!questions) return;

    setSubmitting(true);
    setError(null);

    try {
      // Submit to secure edge function - server calculates score
      const result = await submitAttempt.mutateAsync({
        quizId: quiz.id,
        answers,
      });

      setResult({ score: result.score, passed: result.passed });
      setSubmitted(true);

      if (result.passed) {
        onPass();
      }
    } catch (err) {
      console.error("Quiz submission error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setError(null);
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">📝 {quiz.title}</h2>
        {hasPassed && (
          <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <Award className="h-4 w-4" />
            Passed
          </span>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl mb-6 bg-red-500/10 border border-red-500/20">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Result Banner */}
      {result && (
        <div
          className={cn(
            "p-4 rounded-xl mb-6 flex items-center justify-between",
            result.passed
              ? "bg-green-500/10 border border-green-500/20"
              : "bg-red-500/10 border border-red-500/20"
          )}
        >
          <div className="flex items-center gap-3">
            {result.passed ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <XCircle className="h-6 w-6 text-red-600" />
            )}
            <div>
              <p className={cn("font-semibold", result.passed ? "text-green-600" : "text-red-600")}>
                {result.passed ? "Congratulations! You passed!" : "Not quite. Try again!"}
              </p>
              <p className="text-sm text-muted-foreground">
                Score: {result.score}% (Required: {quiz.passing_score}%)
              </p>
            </div>
          </div>
          {!result.passed && (
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          )}
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, qIndex) => {
          const options = question.options as string[];
          const userAnswer = answers[question.id];

          return (
            <div key={question.id} className="bg-muted/30 rounded-xl p-5">
              <p className="font-medium text-foreground mb-4">
                {qIndex + 1}. {question.question}
              </p>

              <div className="space-y-2">
                {options.map((option, oIndex) => {
                  const isSelected = userAnswer === oIndex;

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelect(question.id, oIndex)}
                      disabled={submitted || submitting}
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-colors flex items-center gap-3",
                        isSelected && "bg-primary/10 border-2 border-primary",
                        !isSelected && "bg-card border-2 border-transparent hover:border-primary/50",
                        (submitted || submitting) && "opacity-60 cursor-not-allowed"
                      )}
                    >
                      <span
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}
                      >
                        {String.fromCharCode(65 + oIndex)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation - only show after submission if available */}
              {submitted && question.explanation && (
                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="mt-6">
          <Button 
            onClick={handleSubmit} 
            disabled={!allAnswered || submitting} 
            className="w-full"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Quiz"
            )}
          </Button>
          {!allAnswered && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              Answer all questions to submit
            </p>
          )}
        </div>
      )}
    </div>
  );
}
