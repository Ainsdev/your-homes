'use server'

import { database } from "@repo/database";
import { property } from "@repo/database/schema";
import { auth } from "@repo/auth/server";

export type PropertyFormData = {
  address: string;
  city: string;
  state: string | null;
  zipCode: string | null;
  country: string;
  propertyType: string;
  status: string;
  listingPrice: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  squareFeet: number | null;
  lotSize: number | null;
  yearBuilt: number | null;
  description: string | null;
  features: string | null;
};

export async function addProperty(data: PropertyFormData) {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  const userId = session.userId;

  const result = await database.insert(property).values({
    userId: userId,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    country: data.country,
    propertyType: data.propertyType,
    status: data.status,
    listingPrice: data.listingPrice,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    squareFeet: data.squareFeet,
    lotSize: data.lotSize,
    yearBuilt: data.yearBuilt,
    description: data.description,
    features: data.features,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
  });

  // Return a plain object instead of the database result
  return {
    success: true,
    propertyId: result.lastInsertRowid
  };
}