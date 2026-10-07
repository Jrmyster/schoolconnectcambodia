CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"school_id" integer,
	"province" text,
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

CREATE TABLE "conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" integer NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "saved_careers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"major_key" text NOT NULL,
	"career_key" text NOT NULL,
	"saved_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "space_leaderboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"nickname" text NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"completion_time_ms" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "user_badges" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"badge_type" text NOT NULL,
	"awarded_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "skeptic_completions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"challenge_id" text NOT NULL,
	"completed_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "book_likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"recommended_by" text NOT NULL,
	"review" text NOT NULL,
	"user_id" integer NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"category" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "author_of_month" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"initials" text NOT NULL,
	"lifespan" text NOT NULL,
	"bio_en" text NOT NULL,
	"bio_kh" text NOT NULL,
	"works" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"challenge_title_en" text,
	"challenge_title_kh" text,
	"challenge_body_en" text,
	"challenge_body_kh" text,
	"challenge_id" text,
	"challenge_badge" text,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"is_current" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "challenge_completions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"challenge_id" text NOT NULL,
	"completed_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "quiz_completions" (
	"id" serial PRIMARY KEY NOT NULL,
	"curiosity" text NOT NULL,
	"level" text NOT NULL,
	"goal" text NOT NULL,
	"completed_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "stem_sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" json NOT NULL,
	"expire" timestamp (6) NOT NULL
);

ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "saved_careers" ADD CONSTRAINT "saved_careers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "skeptic_completions" ADD CONSTRAINT "skeptic_completions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "challenge_completions" ADD CONSTRAINT "challenge_completions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
CREATE UNIQUE INDEX "saved_careers_user_major_career_idx" ON "saved_careers" USING btree ("user_id","major_key","career_key");
CREATE UNIQUE INDEX "user_badges_user_id_badge_type_uniq" ON "user_badges" USING btree ("user_id","badge_type");
CREATE UNIQUE INDEX "book_likes_unique" ON "book_likes" USING btree ("book_id","user_id");
CREATE INDEX "stem_sessions_expire_idx" ON "stem_sessions" USING btree ("expire");
