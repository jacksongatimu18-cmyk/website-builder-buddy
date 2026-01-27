-- Add INSERT policy for user_quiz_attempts as defense-in-depth
-- This complements the edge function which uses service role for inserts
CREATE POLICY "Users can create their quiz attempts"
ON public.user_quiz_attempts
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);