import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server | null> {
  // put application routes here
  // prefix all routes with /api

  // Waitlist signup route
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistEntrySchema.parse(req.body);

      // Check if email already exists
      const existingEntry = await storage.getWaitlistEntryByEmail(
        validatedData.email,
      );
      if (existingEntry) {
        return res
          .status(400)
          .json({ message: "Email already registered for early access" });
      }

      // Create new waitlist entry
      const newEntry = await storage.createWaitlistEntry(validatedData);

      return res.status(201).json({
        message: "Successfully added to early access waitlist",
        data: { id: newEntry.id, email: newEntry.email },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof ZodError) {
          // It's a zod error
          const validationError = fromZodError(error);
          return res.status(400).json({ message: validationError.message });
        }
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  });

  // Get waitlist entries - admin only in a real app, but included for demo
  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getWaitlistEntries();
      return res.status(200).json({
        data: entries,
        count: entries.length,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve waitlist entries" });
    }
  });

  // Only create an HTTP server in Node.js environment
  // In Cloudflare Workers, we'll handle requests differently
  if (typeof process !== "undefined" && process.env.NODE_ENV) {
    const httpServer = createServer(app);
    return httpServer;
  }

  return null;
}
