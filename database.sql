
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"username" varchar(80) UNIQUE NOT NULL,
	"password" varchar(255) NOT NULL,
);

CREATE TABLE "message" (
	"id" serial PRIMARY KEY,
	"time_stamp" TIMESTAMPTZ,
	"category" varchar(25) NOT NULL,
	"message" varchar(500) NOT NULL,
	"profile_id" int NOT NULL,
	"recipient_id" int NOT NULL
);
-- putting this will set the time zone for where you want the time stamp to be 
-- and the SHOW TIMEZONE lets you see which time zone you are in.
SHOW TIMEZONE;
SET timezone = 'America/Chicago';




