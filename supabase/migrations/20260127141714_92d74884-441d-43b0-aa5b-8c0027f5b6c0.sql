-- Update the lesson_questions SELECT policy to require authentication
DROP POLICY IF EXISTS "Lesson questions readable for authenticated" ON public.lesson_questions;

CREATE POLICY "Lesson questions readable for authenticated users"
ON public.lesson_questions
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Also update lesson_answers SELECT policy for consistency
DROP POLICY IF EXISTS "Lesson answers readable for authenticated" ON public.lesson_answers;

CREATE POLICY "Lesson answers readable for authenticated users"
ON public.lesson_answers
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);