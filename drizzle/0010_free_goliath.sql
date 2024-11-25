ALTER TABLE "list" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "owner-has-full-access" ON "list" AS PERMISSIVE FOR ALL TO "authenticated" USING ((select auth.uid()) = author_id);