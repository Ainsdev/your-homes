import { database } from "@repo/database";
import { property, task, client, and, eq, gte, lte, sql } from "@repo/database/schema";
import { auth } from "@repo/auth/server";

export async function getPropertyStats() {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  const userId = session.userId;

  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const startTimestamp = Math.floor(thirtyDaysAgo.getTime() / 1000);
  const endTimestamp = Math.floor(now.getTime() / 1000);

  // Get current period stats for the logged-in user
  const newProperties = await database
    .select({ count: sql<number>`count(*)` })
    .from(property)
    .where(
      and(
        eq(property.userId, userId),
        gte(property.createdAt, startTimestamp),
        lte(property.createdAt, endTimestamp)
      )
    );

  const newClients = await database
    .select({ count: sql<number>`count(*)` })
    .from(client)
    .where(
      and(
        eq(client.userId, userId),
        gte(client.createdAt, startTimestamp),
        lte(client.createdAt, endTimestamp)
      )
    );

  const revenue = await database
    .select({ total: sql<number>`sum(${property.soldPrice})` })
    .from(property)
    .where(
      and(
        eq(property.userId, userId),
        gte(property.soldDate, startTimestamp),
        lte(property.soldDate, endTimestamp)
      )
    );

  const tasks = await database
    .select({ count: sql<number>`count(*)` })
    .from(task)
    .where(
      and(
        eq(task.userId, userId),
        gte(task.createdAt, startTimestamp),
        lte(task.createdAt, endTimestamp)
      )
    );

  return {
    properties: {
      value: newProperties[0].count,
      change: 0,
    },
    clients: {
      value: newClients[0].count,
      change: 0,
    },
    revenue: {
      value: revenue[0].total || 0,
      change: 0,
    },
    tasks: {
      value: tasks[0].count,
      change: 0,
    },
  };
}

export async function getUpcomingTasks() {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  const userId = session.userId;

  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const startTimestamp = Math.floor(now.getTime() / 1000);
  const endTimestamp = Math.floor(thirtyDaysFromNow.getTime() / 1000);

  return await database
    .select({
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      clientId: task.clientId,
      propertyId: task.propertyId,
    })
    .from(task)
    .where(
      and(
        eq(task.userId, userId),
        gte(task.dueDate, startTimestamp),
        lte(task.dueDate, endTimestamp),
        eq(task.status, "Pending")
      )
    )
    .orderBy(task.dueDate)
    .limit(5);
}

export async function getRecentProperties() {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  const userId = session.userId;

  return await database
    .select({
      id: property.id,
      address: property.address,
      city: property.city,
      state: property.state,
      price: property.listingPrice,
      status: property.status,
      type: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.squareFeet,
      createdAt: property.createdAt,
    })
    .from(property)
    .where(eq(property.userId, userId))
    .orderBy(sql`${property.createdAt} DESC`)
    .limit(4);
}

export async function getRecentClients() {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  const userId = session.userId;

  return await database
    .select({
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      status: client.status,
      clientType: client.clientType,
      budget: client.budget,
      lastContactDate: client.lastContactDate,
      createdAt: client.createdAt,
    })
    .from(client)
    .where(eq(client.userId, userId))
    .orderBy(sql`${client.createdAt} DESC`)
    .limit(4);
}

export async function getSalesData() {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  const userId = session.userId;

  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const startTimestamp = Math.floor(thirtyDaysAgo.getTime() / 1000);
  const endTimestamp = Math.floor(now.getTime() / 1000);

  return await database
    .select({
      date: property.soldDate,
      amount: property.soldPrice,
    })
    .from(property)
    .where(
      and(
        eq(property.userId, userId),
        gte(property.soldDate, startTimestamp),
        lte(property.soldDate, endTimestamp)
      )
    )
    .orderBy(property.soldDate);
} 