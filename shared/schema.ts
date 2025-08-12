import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  message: text("message").notNull(),
  receivedAt: timestamp("received_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts, {
  email: z.string().email({ message: "Email inválido" }),
  company: z.string().min(1, { message: "Empresa es requerida" }),
  phone: z.string().min(1, { message: "Teléfono es requerido" }),
}).omit({
  id: true,
  receivedAt: true,
});
export type InsertContact = z.infer<typeof insertContactSchema>;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
