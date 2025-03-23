ALTER TABLE `client` RENAME COLUMN "agentId" TO "userId";--> statement-breakpoint
ALTER TABLE `property` RENAME COLUMN "agentId" TO "userId";--> statement-breakpoint
ALTER TABLE `propertyOwner` RENAME COLUMN "agentId" TO "userId";--> statement-breakpoint
ALTER TABLE `task` RENAME COLUMN "agentId" TO "userId";--> statement-breakpoint
DROP TABLE `clientPropertyInterest`;--> statement-breakpoint
DROP TABLE `communicationLog`;--> statement-breakpoint
DROP TABLE `propertyShowing`;--> statement-breakpoint
ALTER TABLE `client` ADD `propertyId` text REFERENCES property(id);--> statement-breakpoint
ALTER TABLE `client` ADD `interestLevel` text DEFAULT 'Medium';--> statement-breakpoint
ALTER TABLE `property` ALTER COLUMN "state" TO "state" text;--> statement-breakpoint
ALTER TABLE `property` ALTER COLUMN "zipCode" TO "zipCode" text;--> statement-breakpoint
ALTER TABLE `property` ALTER COLUMN "country" TO "country" text DEFAULT 'Chile';--> statement-breakpoint
ALTER TABLE `agent` DROP COLUMN `licenseNumber`;--> statement-breakpoint
ALTER TABLE `agent` DROP COLUMN `address`;