'use server'

import { database } from "@repo/database";
import { client, property, eq, sql } from "@repo/database/schema";
import { auth } from "@repo/auth/server";
import { randomUUID } from "crypto";

export type PropertySearchResult = {
  id: string;
  address: string;
  city: string;
  propertyType: string;
  bedrooms: number | null;
  bathrooms: number | null;
  squareFeet: number | null;
  listingPrice: number | null;
};

export type ClientFormData = {
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  propertyId: string | null;
  interestLevel: "Low" | "Medium" | "High";
  notes: string | null;
  clientType: "buyer" | "seller" | "both";
  status: "Active" | "Inactive" | "Lead";
  budget: number | null;
  preferredLocation: string | null;
  propertyRequirements: string | null;
  leadSource: string | null;
  minBedrooms?: number | null;
  minBathrooms?: number | null;
  minSquareFeet?: number | null;
  desiredPropertyType?: string | null;
};

// Buscar propiedades del usuario para mostrar en el selector del formulario de clientes
export async function searchProperties(searchTerm: string): Promise<PropertySearchResult[]> {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  const userId = session.userId;

  // Si el término de búsqueda está vacío, devuelve las propiedades más recientes
  if (!searchTerm || searchTerm.trim() === "") {
    return await database
      .select({
        id: sql<string>`CAST(${property.id} AS TEXT)`,
        address: property.address,
        city: property.city,
        propertyType: property.propertyType,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        squareFeet: property.squareFeet,
        listingPrice: property.listingPrice,
      })
      .from(property)
      .where(eq(property.userId, userId))
      .orderBy(sql`${property.createdAt} DESC`)
      .limit(10);
  }

  // Si hay un término de búsqueda, filtra por coincidencias en dirección, ciudad o tipo
  const term = `%${searchTerm.toLowerCase()}%`;
return await database
    .select({
      id: sql<string>`CAST(${property.id} AS TEXT)`,
      address: property.address,
      city: property.city,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.squareFeet,
      listingPrice: property.listingPrice,
    })
    .from(property)
    .where(
      sql`(${property.userId} = ${userId} AND (
        LOWER(${property.address}) LIKE ${term} OR 
        LOWER(${property.city}) LIKE ${term} OR 
        LOWER(${property.propertyType}) LIKE ${term}
      ))`
    )
    .limit(20);
}

// Agregar un nuevo cliente a la base de datos
export async function addClient(data: ClientFormData) {
  const session = await auth();
  if (!session?.userId) throw new Error("Unauthorized");
  const userId = session.userId;

  // Procesar los datos adicionales si el cliente es comprador
  let propertyRequirements = data.propertyRequirements;
  
  // Si hay datos de requisitos adicionales como dormitorios, baños, metros cuadrados, 
  // o tipo de propiedad deseada, guárdalos en formato JSON
  if (data.clientType === "buyer" || data.clientType === "both") {
    const requirementsData: Record<string, any> = {};
    
    if (data.minBedrooms) requirementsData.minBedrooms = data.minBedrooms;
    if (data.minBathrooms) requirementsData.minBathrooms = data.minBathrooms;
    if (data.minSquareFeet) requirementsData.minSquareFeet = data.minSquareFeet;
    if (data.desiredPropertyType) requirementsData.propertyType = data.desiredPropertyType;

    // Si hay datos en el objeto y también hay texto en propertyRequirements, combínalos
    if (Object.keys(requirementsData).length > 0) {
      const existingReqs = data.propertyRequirements ? JSON.parse(data.propertyRequirements) : {};
      propertyRequirements = JSON.stringify({...existingReqs, ...requirementsData});
    } else if (data.propertyRequirements) {
      // Si solo hay texto en propertyRequirements, asegúrate de que sea JSON válido
      try {
        JSON.parse(data.propertyRequirements);
      } catch (e) {
        // Si no es JSON válido, conviértelo en un objeto con una propiedad "notes"
        propertyRequirements = JSON.stringify({notes: data.propertyRequirements});
      }
    }
  }

  // Crear un nuevo registro de cliente
  const result = await database.insert(client).values({
    id: undefined, // Let SQLite auto-generate the integer ID
    userId: userId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    address: data.address,
    propertyId: data.propertyId,
    interestLevel: data.interestLevel,
    notes: data.notes,
    clientType: data.clientType,
    status: data.status,
    budget: data.clientType === "buyer" || data.clientType === "both" ? data.budget : null,
    preferredLocation: data.clientType === "buyer" || data.clientType === "both" ? data.preferredLocation : null,
    propertyRequirements: propertyRequirements,
    leadSource: data.leadSource,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
    lastContactDate: Math.floor(Date.now() / 1000), // Asumimos que el momento de creación es el último contacto
  });

  // Return a plain object instead of the database result
  return {
    success: true,
    clientId: result.lastInsertRowid // Use the inserted ID
  };
}