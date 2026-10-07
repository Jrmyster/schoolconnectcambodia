CREATE TYPE "public"."need_category" AS ENUM('Stationery', 'Electronics', 'Infrastructure', 'Books', 'Sports', 'Other', 'Furniture', 'WASH', 'Teacher Training');
CREATE TYPE "public"."need_kind" AS ENUM('request', 'surplus');
CREATE TYPE "public"."need_status" AS ENUM('active', 'funded', 'completed');
CREATE TYPE "public"."notification_category" AS ENUM('emergency', 'surplus', 'training', 'general');
CREATE TYPE "public"."notification_type" AS ENUM('new_message', 'surplus_alert');
CREATE TYPE "public"."story_status" AS ENUM('pending', 'approved', 'rejected');
CREATE TABLE "schools" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_kh" text NOT NULL,
	"province" text NOT NULL,
	"district" text NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"photo_url" text,
	"contact_email" text,
	"contact_phone" text,
	"description" text,
	"student_count" integer,
	"pin" text,
	"hide_from_map" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "needs" (
	"id" serial PRIMARY KEY NOT NULL,
	"school_id" integer NOT NULL,
	"title_en" text NOT NULL,
	"title_kh" text NOT NULL,
	"description_en" text NOT NULL,
	"description_kh" text NOT NULL,
	"category" "need_category" NOT NULL,
	"photo_url" text,
	"goal_amount" real NOT NULL,
	"funded_amount" real DEFAULT 0 NOT NULL,
	"status" "need_status" DEFAULT 'active' NOT NULL,
	"kind" "need_kind" DEFAULT 'request' NOT NULL,
	"contact_email" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "completed_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"need_id" integer,
	"school_id" integer NOT NULL,
	"title_en" text NOT NULL,
	"title_kh" text NOT NULL,
	"description_en" text NOT NULL,
	"description_kh" text NOT NULL,
	"thank_you_photo_url" text,
	"category" "need_category" NOT NULL,
	"completed_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "school_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_school_id" integer NOT NULL,
	"to_school_id" integer NOT NULL,
	"sender_user_id" integer NOT NULL,
	"subject" text NOT NULL,
	"body" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipient_id" integer NOT NULL,
	"type" "notification_type" NOT NULL,
	"category" "notification_category" DEFAULT 'general' NOT NULL,
	"title_en" text NOT NULL,
	"title_kh" text NOT NULL,
	"body_en" text NOT NULL,
	"body_kh" text NOT NULL,
	"link" text,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"graduation_year" integer NOT NULL,
	"profession" text NOT NULL,
	"story" text NOT NULL,
	"photo_url" text,
	"status" "story_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"school_id" integer,
	"role" text DEFAULT 'student' NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"exp_points" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

CREATE TABLE "password_reset_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "password_reset_tokens_token_unique" UNIQUE("token")
);

CREATE TABLE "map_sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" json NOT NULL,
	"expire" timestamp (6) NOT NULL
);

ALTER TABLE "needs" ADD CONSTRAINT "needs_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "completed_projects" ADD CONSTRAINT "completed_projects_need_id_needs_id_fk" FOREIGN KEY ("need_id") REFERENCES "public"."needs"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "completed_projects" ADD CONSTRAINT "completed_projects_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "school_messages" ADD CONSTRAINT "school_messages_from_school_id_schools_id_fk" FOREIGN KEY ("from_school_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "school_messages" ADD CONSTRAINT "school_messages_to_school_id_schools_id_fk" FOREIGN KEY ("to_school_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "school_messages" ADD CONSTRAINT "school_messages_sender_user_id_users_id_fk" FOREIGN KEY ("sender_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_id_users_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "users" ADD CONSTRAINT "users_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "school_messages_to_idx" ON "school_messages" USING btree ("to_school_id","created_at");
CREATE INDEX "notifications_recipient_idx" ON "notifications" USING btree ("recipient_id","is_read");
CREATE INDEX "map_sessions_expire_idx" ON "map_sessions" USING btree ("expire");
