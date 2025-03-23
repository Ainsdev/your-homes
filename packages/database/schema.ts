import { sqliteTable, AnySQLiteColumn, foreignKey, primaryKey, text, integer, uniqueIndex, real } from "drizzle-orm/sqlite-core"
import { and, eq, gte, lte, sql } from "drizzle-orm";


// Agent table - extends user with real estate specific information
export const agent = sqliteTable("agent", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	phoneNumber: text(),
	bio: text(),
	specialization: text(), // e.g., "Residential", "Commercial", "Luxury"
	website: text(),
	socialMedia: text(), // JSON string containing social media links
	createdAt: integer().default(sql`(unixepoch())`),
	updatedAt: integer().default(sql`(unixepoch())`),
});

// Client table
export const client = sqliteTable("client", {
	id: integer().primaryKey().notNull(),
	userId: text().notNull(), // User ID from auth clerk
	firstName: text().notNull(),
	lastName: text().notNull(),
	email: text(),
	phoneNumber: text(),
	address: text(),
	propertyId: text().references(() => property.id, { onDelete: "set null" }),
	interestLevel: text().default("Medium"), // "Low", "Medium", "High"
	notes: text(),
	clientType: text(), // "Buyer", "Seller", "Both"
	status: text().default("Active"), // "Active", "Inactive", "Lead"
	budget: real(), // For buyers
	preferredLocation: text(), // For buyers, Number of communes (e.g: "12847")
	propertyRequirements: text(), // For buyers, JSON string
	leadSource: text(), // How the client was acquired
	createdAt: integer().default(sql`(unixepoch())`),
	updatedAt: integer().default(sql`(unixepoch())`),
	lastContactDate: integer(),
});

// Task table
export const task = sqliteTable("task", {
	id: integer().primaryKey({autoIncrement: true }).notNull(),
	userId: text().notNull(), // User ID creator from auth clerk
	clientId: text().references(() => client.id, { onDelete: "set null" }),
	propertyId: text().references(() => property.id, { onDelete: "set null" }),
	title: text().notNull(),
	description: text(),
	dueDate: integer(),
	priority: text().default("Medium"), // "Low", "Medium", "High"
	status: text().default("Pending"), // "Pending", "In Progress", "Completed", "Cancelled"
	taskType: text(), // "Showing", "Follow-up", "Paperwork", "Meeting", etc.
	reminderDate: integer(),
	completedAt: integer(),
	createdAt: integer().default(sql`(unixepoch())`),
	updatedAt: integer().default(sql`(unixepoch())`),
});

// Property Owner table
export const propertyOwner = sqliteTable("propertyOwner", {
	id: integer().primaryKey({autoIncrement: true }).notNull(),
	userId: text().notNull(), // User ID from auth clerk
	firstName: text().notNull(),
	lastName: text().notNull(),
	email: text(),
	phoneNumber: text(),
	address: text(),
	notes: text(),
	createdAt: integer().default(sql`(unixepoch())`),
	updatedAt: integer().default(sql`(unixepoch())`),
});

// Property table
export const property = sqliteTable("property", {
	id: integer().primaryKey().notNull(),
	userId: text().notNull(), // User ID from auth clerk
	ownerId: text().references(() => propertyOwner.id, { onDelete: "set null" }),
	address: text().notNull(),
	city: text().notNull(),
	state: text(),
	zipCode: text(),
	country: text().default("Chile"),
	propertyType: text().notNull(), // "Single Family", "Condo", "Apartment", "Commercial", etc.
	status: text().default("Available"), // "Available", "Under Contract", "Sold", "Off Market"
	listingPrice: real(),
	bedrooms: integer(),
	bathrooms: real(),
	squareFeet: real(),
	lotSize: real(),
	yearBuilt: integer(),
	description: text(),
	features: text(), // JSON string of features
	images: text(), // JSON string of image URLs
	documents: text(), // JSON string of document URLs
	listingDate: integer(),
	soldDate: integer(),
	soldPrice: real(),
	createdAt: integer().default(sql`(unixepoch())`),
	updatedAt: integer().default(sql`(unixepoch())`),
});

// // Client-Property relationship (for tracking client interest in properties)
// export const clientPropertyInterest = sqliteTable("clientPropertyInterest", {
// 	id: text().primaryKey().notNull(),
// 	clientId: text().notNull().references(() => client.id, { onDelete: "cascade" }),
// 	propertyId: text().notNull().references(() => property.id, { onDelete: "cascade" }),
// 	interestLevel: text().default("Medium"), // "Low", "Medium", "High"
// 	notes: text(),
// 	createdAt: integer().default(sql`(unixepoch())`),
// 	updatedAt: integer().default(sql`(unixepoch())`),
// },
// (table) => [
// 	uniqueIndex("client_property_unique").on(table.clientId, table.propertyId),
// ]);

// Showing/Viewing appointments
// export const propertyShowing = sqliteTable("propertyShowing", {
// 	id: text().primaryKey().notNull(),
// 	propertyId: text().notNull().references(() => property.id, { onDelete: "cascade" }),
// 	clientId: text().notNull().references(() => client.id, { onDelete: "cascade" }),
// 	agentId: text().notNull().references(() => agent.id, { onDelete: "cascade" }),
// 	scheduledDate: integer().notNull(),
// 	duration: integer().default(30), // in minutes
// 	status: text().default("Scheduled"), // "Scheduled", "Completed", "Cancelled", "Rescheduled"
// 	feedback: text(),
// 	notes: text(),
// 	createdAt: integer().default(sql`(unixepoch())`),
// 	updatedAt: integer().default(sql`(unixepoch())`),
// });


//export types
export type Agent = typeof agent.$inferSelect;
export type Client = typeof client.$inferSelect;
export type Property = typeof property.$inferSelect;
export type Task = typeof task.$inferSelect;
// export type PropertyShowing = typeof propertyShowing.$inferSelect;

//export queriesDrizzle
export { and, eq, gte, lte, sql };