-- Create a view that excludes correct_answer column
CREATE VIEW public.quiz_questions_public 
WITH (security_invoker = on) AS
SELECT id, quiz_id, question, options, explanation, order_index, created_at
FROM public.quiz_questions;

-- Grant SELECT on the view to authenticated users
GRANT SELECT ON public.quiz_questions_public TO authenticated;

-- Drop the existing policy that exposes correct_answer
DROP POLICY IF EXISTS "Quiz questions readable for authenticated" ON public.quiz_questions;

-- Block direct access to quiz_questions table (only service role can access)
CREATE POLICY "Quiz questions direct access blocked" ON public.quiz_questions
FOR SELECT TO authenticated
USING (false);

-- Drop the policies that allow direct INSERT/UPDATE to quiz attempts
DROP POLICY IF EXISTS "Users can upsert their quiz attempts" ON public.user_quiz_attempts;
DROP POLICY IF EXISTS "Users can update their quiz attempts" ON public.user_quiz_attempts;

-- Keep SELECT and DELETE policies for user_quiz_attempts (users can see their attempts)
-- INSERT and UPDATE will only work via service role (edge function)