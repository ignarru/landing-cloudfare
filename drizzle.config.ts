import { defineConfig } from "drizzle-kit";

if (!process.env.SUPABASE_URL) {
  throw new Error("SUPABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPABASE_URL,
  },
});
