
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



INSERT INTO "message" ("category", "message", "profile_id", "recipient_id")
VALUES ('family', 'thinking of you', 1, 1),('friend','you owe me money',7 , 8),('family','pick up some milk on your way home from work',7,6);


SELECT "message".id, "message".time_stamp, "message".category, "message".message, "message".profile_id, "message".recipient_id, "user".username FROM "message" 
JOIN "user"
ON "message".profile_id = "user".id
WHERE recipient_id = 13; 

SELECT * from "user"  JOIN "message"
  ON "message".profile_id = "user".id
  WHERE profile_id = 12;
  
  SELECT "message".id, "message".time_stamp, "message".category, "message".message, "message".profile_id, "message".recipient_id, sender.username AS sender_username, recipient.username AS recipient_username
	FROM "message"
		JOIN "user" AS sender
			ON "message".profile_id = sender.id
		JOIN "user" AS recipient
			ON "message".recipient_id = recipient.id
	WHERE "message".profile_id = 12;




