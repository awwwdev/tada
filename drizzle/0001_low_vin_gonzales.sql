ALTER TABLE "user" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "auth_user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "username";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "password_hash";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "salt";