import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Restaurant schema
export const restaurants = pgTable("restaurants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  category: text("category").notNull(), // "student_cafeteria" | "cafe" | "restaurant"
  location: text("location").notNull(),
  locationEn: text("location_en").notNull(),
  hours: text("hours").notNull(),
  mapLat: text("map_lat").notNull(),
  mapLng: text("map_lng").notNull(),
  imageUrl: text("image_url").notNull(),
  status: text("status").notNull().default("open"), // "open" | "closed" | "busy"
  crowdingLevel: integer("crowding_level").notNull().default(2), // 1-5: empty to very crowded
});

export const insertRestaurantSchema = createInsertSchema(restaurants).omit({
  id: true,
});

export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type Restaurant = typeof restaurants.$inferSelect;

// Menu schema
export const menus = pgTable("menus", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: varchar("restaurant_id").notNull(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
  hasPork: boolean("has_pork").notNull().default(false),
  isSpicy: boolean("is_spicy").notNull().default(false),
  isVegetarian: boolean("is_vegetarian").notNull().default(false),
  dayOfWeek: text("day_of_week"), // for student cafeteria: "monday", "tuesday", etc. null for regular restaurants
  likeCount: integer("like_count").notNull().default(0), // Total likes for this menu item
});

export const insertMenuSchema = createInsertSchema(menus).omit({
  id: true,
}).extend({
  hasPork: z.boolean().default(false),
  isSpicy: z.boolean().default(false),
  isVegetarian: z.boolean().default(false),
  dayOfWeek: z.string().nullable(),
});

export type InsertMenu = z.infer<typeof insertMenuSchema>;
export type Menu = typeof menus.$inferSelect;

// Facility schema
export const facilities = pgTable("facilities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  type: text("type").notNull(), // "bookstore" | "health_center" | "other"
  location: text("location").notNull(),
  locationEn: text("location_en").notNull(),
  hours: text("hours").notNull(),
  mapLat: text("map_lat").notNull(),
  mapLng: text("map_lng").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  descriptionEn: text("description_en").notNull(),
});

export const insertFacilitySchema = createInsertSchema(facilities).omit({
  id: true,
});

export type InsertFacility = z.infer<typeof insertFacilitySchema>;
export type Facility = typeof facilities.$inferSelect;

// Guide schema (for bookstore ordering, health center forms, etc.)
export const guides = pgTable("guides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  facilityId: varchar("facility_id").notNull(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  content: text("content").notNull(), // JSON stringified array of steps
  contentEn: text("content_en").notNull(),
});

export const insertGuideSchema = createInsertSchema(guides).omit({
  id: true,
});

export type InsertGuide = z.infer<typeof insertGuideSchema>;
export type Guide = typeof guides.$inferSelect;

// Inquiry schema
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull().default("question"), // "question" | "request"
  createdAt: text("created_at").notNull(),
  // Translations for multi-language support
  titleKo: text("title_ko"),
  titleEn: text("title_en"),
  titleUz: text("title_uz"),
  titleVi: text("title_vi"),
  titleZh: text("title_zh"),
  contentKo: text("content_ko"),
  contentEn: text("content_en"),
  contentUz: text("content_uz"),
  contentVi: text("content_vi"),
  contentZh: text("content_zh"),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
}).extend({
  type: z.enum(["question", "request"]).default("question"),
  titleKo: z.string().nullable().optional(),
  titleEn: z.string().nullable().optional(),
  titleUz: z.string().nullable().optional(),
  titleVi: z.string().nullable().optional(),
  titleZh: z.string().nullable().optional(),
  contentKo: z.string().nullable().optional(),
  contentEn: z.string().nullable().optional(),
  contentUz: z.string().nullable().optional(),
  contentVi: z.string().nullable().optional(),
  contentZh: z.string().nullable().optional(),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

// Reply schema for inquiry responses
export const replies = pgTable("replies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  inquiryId: varchar("inquiry_id").notNull(),
  content: text("content").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: text("created_at").notNull(),
  // Translations
  contentKo: text("content_ko"),
  contentEn: text("content_en"),
  contentUz: text("content_uz"),
  contentVi: text("content_vi"),
  contentZh: text("content_zh"),
});

export const insertReplySchema = createInsertSchema(replies).omit({
  id: true,
}).extend({
  isAdmin: z.boolean().default(false),
  contentKo: z.string().nullable().optional(),
  contentEn: z.string().nullable().optional(),
  contentUz: z.string().nullable().optional(),
  contentVi: z.string().nullable().optional(),
  contentZh: z.string().nullable().optional(),
});

export type InsertReply = z.infer<typeof insertReplySchema>;
export type Reply = typeof replies.$inferSelect;

// Favorite schema (stored in localStorage for MVP)
export type Favorite = {
  id: string;
  menuId: string;
  restaurantId: string;
  timestamp: number;
};
