CREATE TABLE IF NOT EXISTS "lifesheet_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lifesheet" ADD COLUMN "question_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lifesheet" ADD CONSTRAINT "lifesheet_question_id_lifesheet_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "lifesheet_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "lifesheet" DROP COLUMN IF EXISTS "question";