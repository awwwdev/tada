CREATE TYPE "public"."smart_list_id" AS ENUM('all-tasks', 'starred', 'pinned', 'archived', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('to-do', 'done');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "folder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"name" text NOT NULL,
	"emojis" text[],
	"author_id" uuid,
	"show" boolean,
	"order_in_panel" numeric DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"name" text NOT NULL,
	"emojis" text[],
	"author_id" uuid,
	"description" text,
	"folder_id" uuid,
	"show" boolean,
	"order_in_folder" numeric DEFAULT '0',
	"theme" json DEFAULT '{}'::json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list_task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"list_id" uuid NOT NULL,
	"task_id" uuid NOT NULL,
	"order_in_list" numeric DEFAULT '1' NOT NULL,
	CONSTRAINT "Each task can be repeated once in a list" UNIQUE("list_id","task_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "smart_list_task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"smart_list_id" "smart_list_id",
	"task_id" uuid NOT NULL,
	"order_in_list" numeric DEFAULT '1' NOT NULL,
	CONSTRAINT "Each task can be repeated once in a smart list" UNIQUE("smart_list_id","task_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"label" text NOT NULL,
	"emojis" text[],
	"author" uuid,
	"note" json,
	"task_status" "task_status" DEFAULT 'to-do',
	"due_at" timestamp,
	"deleted" boolean DEFAULT false,
	"starred" boolean DEFAULT false,
	"pinned" boolean DEFAULT false,
	"archived" boolean DEFAULT false,
	"step_of" uuid,
	"step_index" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"username" text,
	"email" text NOT NULL,
	"password_hash" "bytea" NOT NULL,
	"salt" "bytea" NOT NULL,
	"settings" json DEFAULT '{"theme":"system","showCompletedTasks":true,"startOfWeek":"sunday"}'::json,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folder" ADD CONSTRAINT "folder_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list" ADD CONSTRAINT "list_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list" ADD CONSTRAINT "list_folder_id_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folder"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_task" ADD CONSTRAINT "list_task_list_id_list_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."list"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_task" ADD CONSTRAINT "list_task_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "smart_list_task" ADD CONSTRAINT "smart_list_task_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_step_of_task_id_fk" FOREIGN KEY ("step_of") REFERENCES "public"."task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
