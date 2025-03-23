PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_client` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`email` text,
	`phoneNumber` text,
	`address` text,
	`propertyId` text,
	`interestLevel` text DEFAULT 'Medium',
	`notes` text,
	`clientType` text,
	`status` text DEFAULT 'Active',
	`budget` real,
	`preferredLocation` text,
	`propertyRequirements` text,
	`leadSource` text,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	`lastContactDate` integer,
	FOREIGN KEY (`propertyId`) REFERENCES `property`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_client`("id", "userId", "firstName", "lastName", "email", "phoneNumber", "address", "propertyId", "interestLevel", "notes", "clientType", "status", "budget", "preferredLocation", "propertyRequirements", "leadSource", "createdAt", "updatedAt", "lastContactDate") SELECT "id", "userId", "firstName", "lastName", "email", "phoneNumber", "address", "propertyId", "interestLevel", "notes", "clientType", "status", "budget", "preferredLocation", "propertyRequirements", "leadSource", "createdAt", "updatedAt", "lastContactDate" FROM `client`;--> statement-breakpoint
DROP TABLE `client`;--> statement-breakpoint
ALTER TABLE `__new_client` RENAME TO `client`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_property` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`ownerId` text,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text,
	`zipCode` text,
	`country` text DEFAULT 'Chile',
	`propertyType` text NOT NULL,
	`status` text DEFAULT 'Available',
	`listingPrice` real,
	`bedrooms` integer,
	`bathrooms` real,
	`squareFeet` real,
	`lotSize` real,
	`yearBuilt` integer,
	`description` text,
	`features` text,
	`images` text,
	`documents` text,
	`listingDate` integer,
	`soldDate` integer,
	`soldPrice` real,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`ownerId`) REFERENCES `propertyOwner`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_property`("id", "userId", "ownerId", "address", "city", "state", "zipCode", "country", "propertyType", "status", "listingPrice", "bedrooms", "bathrooms", "squareFeet", "lotSize", "yearBuilt", "description", "features", "images", "documents", "listingDate", "soldDate", "soldPrice", "createdAt", "updatedAt") SELECT "id", "userId", "ownerId", "address", "city", "state", "zipCode", "country", "propertyType", "status", "listingPrice", "bedrooms", "bathrooms", "squareFeet", "lotSize", "yearBuilt", "description", "features", "images", "documents", "listingDate", "soldDate", "soldPrice", "createdAt", "updatedAt" FROM `property`;--> statement-breakpoint
DROP TABLE `property`;--> statement-breakpoint
ALTER TABLE `__new_property` RENAME TO `property`;--> statement-breakpoint
CREATE TABLE `__new_propertyOwner` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`email` text,
	`phoneNumber` text,
	`address` text,
	`notes` text,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
INSERT INTO `__new_propertyOwner`("id", "userId", "firstName", "lastName", "email", "phoneNumber", "address", "notes", "createdAt", "updatedAt") SELECT "id", "userId", "firstName", "lastName", "email", "phoneNumber", "address", "notes", "createdAt", "updatedAt" FROM `propertyOwner`;--> statement-breakpoint
DROP TABLE `propertyOwner`;--> statement-breakpoint
ALTER TABLE `__new_propertyOwner` RENAME TO `propertyOwner`;--> statement-breakpoint
CREATE TABLE `__new_task` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`clientId` text,
	`propertyId` text,
	`title` text NOT NULL,
	`description` text,
	`dueDate` integer,
	`priority` text DEFAULT 'Medium',
	`status` text DEFAULT 'Pending',
	`taskType` text,
	`reminderDate` integer,
	`completedAt` integer,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`propertyId`) REFERENCES `property`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_task`("id", "userId", "clientId", "propertyId", "title", "description", "dueDate", "priority", "status", "taskType", "reminderDate", "completedAt", "createdAt", "updatedAt") SELECT "id", "userId", "clientId", "propertyId", "title", "description", "dueDate", "priority", "status", "taskType", "reminderDate", "completedAt", "createdAt", "updatedAt" FROM `task`;--> statement-breakpoint
DROP TABLE `task`;--> statement-breakpoint
ALTER TABLE `__new_task` RENAME TO `task`;