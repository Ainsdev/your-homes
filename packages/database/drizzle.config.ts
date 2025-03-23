import { defineConfig } from 'drizzle-kit';
import { keys } from './keys';


export default defineConfig({
  schema: './schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: keys().DATABASE_URL,
    authToken: keys().DATABASE_AUTH_TOKEN,
  },
});