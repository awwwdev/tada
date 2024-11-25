ALTER TABLE "task" RENAME COLUMN "author" TO "author_id";--> statement-breakpoint
ALTER TABLE "task" DROP CONSTRAINT "task_author_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE VIEW "public"."user_view" AS (select "auth"."users"."email", "auth"."users"."phone", "user"."settings", "user"."firstname", "user"."lastname", "auth"."users"."id" from "user" left join "auth"."users" on "user"."auth_user_id" = "auth"."users"."id");