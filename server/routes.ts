import type { Express } from "express";
import { createServer, type Server } from "http";
import { supabase, supabaseConfigured } from "./supabase";
import { insertContactSchema, type InsertContact } from "@shared/schema";

// basic in-memory throttle map keyed by IP address
const lastSubmission: Record<string, number> = {};
export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/contact - receive contact form submissions
  app.post("/api/contact", async (req, res, next) => {
    try {
      const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
      const last = lastSubmission[ip as string] ?? 0;
      if (Date.now() - last < 60_000) {
        return res.status(429).json({ message: "Too many requests" });
      }

      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data" });
      }

      if (!supabaseConfigured) {
        return res.status(503).json({ message: "Service unavailable" });
      }
      
      const contact: InsertContact = parsed.data;
      const { error } = await supabase.from("contacts").insert(contact);
      if (error) {
        throw error;
      }

  lastSubmission[ip as string] = Date.now();
      res.status(201).json({ message: "ok" });
    } catch (err) {
      next(err);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
