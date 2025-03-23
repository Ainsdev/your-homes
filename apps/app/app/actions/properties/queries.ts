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
  try {
    const session = await auth();
    if (!session?.userId) throw new Error("Unauthorized");
    const userId = session.userId;

    const propertyData = {
      userId,
      ...data,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
      images: null,
      documents: null,
      soldDate: null,
      soldPrice: null,
      listingDate: Math.floor(Date.now() / 1000),
      ownerId: null,
    };

    const result = await database.insert(property).values(propertyData);

    return {
      success: true,
      propertyId: result.lastInsertRowid
    };
  } catch (error) {
    console.error('Error adding property:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}