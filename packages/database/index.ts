import "server-only";

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from "@libsql/client";
import { keys } from './keys';

const client = createClient({ 
  url: keys().DATABASE_URL,
  authToken: keys().DATABASE_AUTH_TOKEN
});

export const database = drizzle(client);






