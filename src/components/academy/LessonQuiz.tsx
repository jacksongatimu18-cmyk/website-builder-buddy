import { useState } from "react";
import { CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";
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

    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= quiz.passing_score;

    await submitAttempt.mutateAsync({
      quizId: quiz.id,
      userId,
      answers,
      score,
      passed,
    });

    setResult({ score, passed });
    setSubmitted(true);

    if (passed) {
      onPass();
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
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
          const isCorrect = submitted && userAnswer === question.correct_answer;
          const isWrong = submitted && userAnswer !== undefined && userAnswer !== question.correct_answer;

          return (
            <div key={question.id} className="bg-muted/30 rounded-xl p-5">
              <p className="font-medium text-foreground mb-4">
                {qIndex + 1}. {question.question}
              </p>

              <div className="space-y-2">
                {options.map((option, oIndex) => {
                  const isSelected = userAnswer === oIndex;
                  const showCorrect = submitted && oIndex === question.correct_answer;
                  const showWrong = submitted && isSelected && oIndex !== question.correct_answer;

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelect(question.id, oIndex)}
                      disabled={submitted}
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-colors flex items-center gap-3",
                        !submitted && isSelected && "bg-primary/10 border-2 border-primary",
                        !submitted && !isSelected && "bg-card border-2 border-transparent hover:border-primary/50",
                        showCorrect && "bg-green-500/10 border-2 border-green-500",
                        showWrong && "bg-red-500/10 border-2 border-red-500",
                        submitted && !showCorrect && !showWrong && "bg-card border-2 border-transparent opacity-60"
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
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                      {showWrong && <XCircle className="h-5 w-5 text-red-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
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
          <Button onClick={handleSubmit} disabled={!allAnswered} className="w-full">
            Submit Quiz
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
