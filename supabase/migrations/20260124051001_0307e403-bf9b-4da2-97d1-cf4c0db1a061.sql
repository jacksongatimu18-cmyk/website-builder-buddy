-- Curriculum + Academy backend (Lovable Cloud)

-- 1) Utility function for updated_at
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2) Core content tables
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  level text not null default 'Beginner',
  estimated_hours int not null default 6,
  is_published boolean not null default true,
  hero_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_courses_updated_at
before update on public.courses
for each row execute function public.update_updated_at_column();

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  summary text,
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_course_modules_course_id on public.course_modules(course_id);

create trigger trg_course_modules_updated_at
before update on public.course_modules
for each row execute function public.update_updated_at_column();

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  content_md text not null,
  media_title text,
  media_url text,
  media_type text, -- e.g. 'video', 'audio', 'slides'
  order_index int not null default 0,
  estimated_minutes int not null default 15,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lessons_module_id on public.lessons(module_id);

create trigger trg_lessons_updated_at
before update on public.lessons
for each row execute function public.update_updated_at_column();

-- 3) Quizzes
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  title text not null,
  passing_score int not null default 70,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_quizzes_lesson_id on public.quizzes(lesson_id);

create trigger trg_quizzes_updated_at
before update on public.quizzes
for each row execute function public.update_updated_at_column();

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question text not null,
  options jsonb not null, -- ["A","B","C","D"]
  correct_answer int not null, -- index in options array
  explanation text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_quiz_questions_quiz_id on public.quiz_questions(quiz_id);

-- 4) Progress tracking
create table if not exists public.user_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  status text not null default 'not_started', -- not_started | in_progress | completed
  progress_percent int not null default 0,
  last_position jsonb, -- e.g. {"scrollY": 1200}
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

create index if not exists idx_user_lesson_progress_user_id on public.user_lesson_progress(user_id);
create index if not exists idx_user_lesson_progress_lesson_id on public.user_lesson_progress(lesson_id);

create trigger trg_user_lesson_progress_updated_at
before update on public.user_lesson_progress
for each row execute function public.update_updated_at_column();

create table if not exists public.user_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  score int not null default 0,
  passed boolean not null default false,
  answers jsonb, -- e.g. {"questionId": 2}
  created_at timestamptz not null default now(),
  unique(user_id, quiz_id)
);

create index if not exists idx_user_quiz_attempts_user_id on public.user_quiz_attempts(user_id);
create index if not exists idx_user_quiz_attempts_quiz_id on public.user_quiz_attempts(quiz_id);

-- 5) Lesson Q&A (community)
create table if not exists public.lesson_questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  user_id uuid not null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lesson_questions_lesson_id on public.lesson_questions(lesson_id);
create index if not exists idx_lesson_questions_user_id on public.lesson_questions(user_id);

create trigger trg_lesson_questions_updated_at
before update on public.lesson_questions
for each row execute function public.update_updated_at_column();

create table if not exists public.lesson_answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.lesson_questions(id) on delete cascade,
  user_id uuid not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lesson_answers_question_id on public.lesson_answers(question_id);
create index if not exists idx_lesson_answers_user_id on public.lesson_answers(user_id);

create trigger trg_lesson_answers_updated_at
before update on public.lesson_answers
for each row execute function public.update_updated_at_column();

-- 6) Certificates
create table if not exists public.user_course_certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  course_id uuid not null references public.courses(id) on delete cascade,
  issued_at timestamptz not null default now(),
  certificate_code text not null unique,
  created_at timestamptz not null default now(),
  unique(user_id, course_id)
);

create index if not exists idx_user_course_certificates_user_id on public.user_course_certificates(user_id);
create index if not exists idx_user_course_certificates_course_id on public.user_course_certificates(course_id);

-- 7) Enable RLS
alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.lessons enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.user_quiz_attempts enable row level security;
alter table public.lesson_questions enable row level security;
alter table public.lesson_answers enable row level security;
alter table public.user_course_certificates enable row level security;

-- 8) RLS Policies (login required)
-- Content is readable for authenticated users
create policy "Courses readable for authenticated" on public.courses
for select to authenticated
using (is_published = true);

create policy "Modules readable for authenticated" on public.course_modules
for select to authenticated
using (true);

create policy "Lessons readable for authenticated" on public.lessons
for select to authenticated
using (true);

create policy "Quizzes readable for authenticated" on public.quizzes
for select to authenticated
using (true);

create policy "Quiz questions readable for authenticated" on public.quiz_questions
for select to authenticated
using (true);

-- Progress is per-user
create policy "Users can read their lesson progress" on public.user_lesson_progress
for select to authenticated
using (auth.uid() = user_id);

create policy "Users can create their lesson progress" on public.user_lesson_progress
for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their lesson progress" on public.user_lesson_progress
for update to authenticated
using (auth.uid() = user_id);

create policy "Users can delete their lesson progress" on public.user_lesson_progress
for delete to authenticated
using (auth.uid() = user_id);

create policy "Users can read their quiz attempts" on public.user_quiz_attempts
for select to authenticated
using (auth.uid() = user_id);

create policy "Users can upsert their quiz attempts" on public.user_quiz_attempts
for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their quiz attempts" on public.user_quiz_attempts
for update to authenticated
using (auth.uid() = user_id);

create policy "Users can delete their quiz attempts" on public.user_quiz_attempts
for delete to authenticated
using (auth.uid() = user_id);

-- Q&A is community-readable, but only editable by author
create policy "Lesson questions readable for authenticated" on public.lesson_questions
for select to authenticated
using (true);

create policy "Users can ask questions" on public.lesson_questions
for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users can edit their questions" on public.lesson_questions
for update to authenticated
using (auth.uid() = user_id);

create policy "Users can delete their questions" on public.lesson_questions
for delete to authenticated
using (auth.uid() = user_id);

create policy "Lesson answers readable for authenticated" on public.lesson_answers
for select to authenticated
using (true);

create policy "Users can answer" on public.lesson_answers
for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users can edit their answers" on public.lesson_answers
for update to authenticated
using (auth.uid() = user_id);

create policy "Users can delete their answers" on public.lesson_answers
for delete to authenticated
using (auth.uid() = user_id);

-- Certificates are per-user
create policy "Users can read their certificates" on public.user_course_certificates
for select to authenticated
using (auth.uid() = user_id);

create policy "Users can create their certificate" on public.user_course_certificates
for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their certificate" on public.user_course_certificates
for delete to authenticated
using (auth.uid() = user_id);
