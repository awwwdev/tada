ALTER TABLE "task" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "policy" ON "task" AS PERMISSIVE FOR ALL TO "authenticated" USING ((select auth.uid()) = author_id);