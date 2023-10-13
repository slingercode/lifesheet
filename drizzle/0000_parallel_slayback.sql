CREATE TABLE IF NOT EXISTS "lifesheet" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"question" text NOT NULL,
	"response_string" text,
	"response_boolean" boolean,
	"response_number" numeric,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
