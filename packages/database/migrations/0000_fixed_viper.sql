CREATE TABLE `agent` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`licenseNumber` text,
	`phoneNumber` text,
	`address` text,
	`bio` text,
	`specialization` text,
	`website` text,
	`socialMedia` text,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE TABLE `client` (
	`id` text PRIMARY KEY NOT NULL,
	`agentId` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`email` text,
	`phoneNumber` text,
	`address` text,
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
	FOREIGN KEY (`agentId`) REFERENCES `agent`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `clientPropertyInterest` (
	`id` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`propertyId` text NOT NULL,
	`interestLevel` text DEFAULT 'Medium',
	`notes` text,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`propertyId`) REFERENCES `property`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `client_property_unique` ON `clientPropertyInterest` (`clientId`,`propertyId`);--> statement-breakpoint
CREATE TABLE `communicationLog` (
	`id` text PRIMARY KEY NOT NULL,
	`agentId` text NOT NULL,
	`clientId` text,
	`propertyOwnerId` text,
	`communicationType` text NOT NULL,
	`subject` text,
	`content` text,
	`date` integer DEFAULT (unixepoch()) NOT NULL,
	`followUpRequired` integer DEFAULT 0,
	`followUpDate` integer,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`agentId`) REFERENCES `agent`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`propertyOwnerId`) REFERENCES `propertyOwner`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `property` (
	`id` text PRIMARY KEY NOT NULL,
	`agentId` text NOT NULL,
	`ownerId` text,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zipCode` text NOT NULL,
	`country` text DEFAULT 'United States',
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
	FOREIGN KEY (`agentId`) REFERENCES `agent`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ownerId`) REFERENCES `propertyOwner`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `propertyOwner` (
	`id` text PRIMARY KEY NOT NULL,
	`agentId` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`email` text,
	`phoneNumber` text,
	`address` text,
	`notes` text,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`agentId`) REFERENCES `agent`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `propertyShowing` (
	`id` text PRIMARY KEY NOT NULL,
	`propertyId` text NOT NULL,
	`clientId` text NOT NULL,
	`agentId` text NOT NULL,
	`scheduledDate` integer NOT NULL,
	`duration` integer DEFAULT 30,
	`status` text DEFAULT 'Scheduled',
	`feedback` text,
	`notes` text,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`propertyId`) REFERENCES `property`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`agentId`) REFERENCES `agent`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` text PRIMARY KEY NOT NULL,
	`agentId` text NOT NULL,
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
	FOREIGN KEY (`agentId`) REFERENCES `agent`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`propertyId`) REFERENCES `property`(`id`) ON UPDATE no action ON DELETE set null
);
