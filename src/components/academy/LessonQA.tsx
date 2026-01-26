import { useState } from "react";
import { MessageSquare, Send, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  useLessonQuestions,
  useQuestionAnswers,
  useCreateQuestion,
  useCreateAnswer,
  useDeleteQuestion,
  useDeleteAnswer,
} from "@/hooks/useLessonQA";
import { formatDistanceToNow } from "date-fns";

interface LessonQAProps {
  lessonId: string;
  userId: string;
}

export function LessonQA({ lessonId, userId }: LessonQAProps) {
  const { data: questions, isLoading } = useLessonQuestions(lessonId);
  const createQuestion = useCreateQuestion();

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const handleSubmitQuestion = async () => {
    if (!newTitle.trim() || !newBody.trim()) return;

    await createQuestion.mutateAsync({
      lessonId,
      userId,
      title: newTitle.trim(),
      body: newBody.trim(),
    });

    setNewTitle("");
    setNewBody("");
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Questions & Discussion
        </h2>
        <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
          Ask a Question
        </Button>
      </div>

      {/* New Question Form */}
      {showForm && (
        <div className="bg-muted/30 rounded-xl p-4 mb-6">
          <Input
            placeholder="Question title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mb-3"
          />
          <Textarea
            placeholder="Describe your question in detail..."
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            className="mb-3 min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmitQuestion}
              disabled={!newTitle.trim() || !newBody.trim() || createQuestion.isPending}
            >
              <Send className="h-4 w-4 mr-2" />
              Post Question
            </Button>
          </div>
        </div>
      )}

      {/* Questions List */}
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-muted rounded" />
          <div className="h-20 bg-muted rounded" />
        </div>
      ) : questions && questions.length > 0 ? (
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              userId={userId}
              lessonId={lessonId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No questions yet. Be the first to ask!</p>
        </div>
      )}
    </div>
  );
}

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    body: string;
    user_id: string;
    created_at: string;
  };
  userId: string;
  lessonId: string;
}

function QuestionCard({ question, userId, lessonId }: QuestionCardProps) {
  const { data: answers } = useQuestionAnswers(question.id);
  const createAnswer = useCreateAnswer();
  const deleteQuestion = useDeleteQuestion();
  const deleteAnswer = useDeleteAnswer();

  const [expanded, setExpanded] = useState(false);
  const [newAnswer, setNewAnswer] = useState("");

  const isOwner = question.user_id === userId;

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) return;

    await createAnswer.mutateAsync({
      questionId: question.id,
      userId,
      body: newAnswer.trim(),
    });

    setNewAnswer("");
  };

  const handleDeleteQuestion = async () => {
    if (confirm("Delete this question?")) {
      await deleteQuestion.mutateAsync({ questionId: question.id, lessonId });
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{question.title}</h3>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}
          </p>
        </div>
        {isOwner && (
          <Button variant="ghost" size="icon" onClick={handleDeleteQuestion}>
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
        )}
      </div>

      <p className="text-muted-foreground text-sm mb-3">{question.body}</p>

      {/* Toggle Answers */}
      <Button
        variant="ghost"
        size="sm"
        className="text-primary"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
        {answers?.length || 0} {answers?.length === 1 ? "Answer" : "Answers"}
      </Button>

      {/* Answers */}
      {expanded && (
        <div className="mt-4 pl-4 border-l-2 border-border space-y-3">
          {answers?.map((answer) => (
            <div key={answer.id} className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <p className="text-sm text-foreground flex-1">{answer.body}</p>
                {answer.user_id === userId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => deleteAnswer.mutateAsync({ answerId: answer.id, questionId: question.id })}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(answer.created_at), { addSuffix: true })}
              </p>
            </div>
          ))}

          {/* Answer Form */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Write an answer..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="min-h-[60px] text-sm"
            />
            <Button
              size="sm"
              onClick={handleSubmitAnswer}
              disabled={!newAnswer.trim() || createAnswer.isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
