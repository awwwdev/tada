ALTER TABLE "user" DROP CONSTRAINT "user_phone_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "profiles_phone_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "phone";