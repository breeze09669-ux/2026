import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertReplySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Config Route
  app.get('/api/config', (req, res) => {
    res.json({
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    });
  });

  // Restaurant Routes
  app.get('/api/restaurants', async (req, res) => {
    try {
      const restaurants = await storage.getAllRestaurants();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
  });

  app.get('/api/restaurants/:id', async (req, res) => {
    try {
      const restaurant = await storage.getRestaurant(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
  });

  // Menu Routes
  app.get('/api/menus/:restaurantId', async (req, res) => {
    try {
      const menus = await storage.getMenusByRestaurant(req.params.restaurantId);
      res.json(menus);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch menus' });
    }
  });

  app.get('/api/all-menus', async (req, res) => {
    try {
      const menus = await storage.getAllMenus();
      res.json(menus);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch all menus' });
    }
  });

  // Facility Routes
  app.get('/api/facilities', async (req, res) => {
    try {
      const facilities = await storage.getAllFacilities();
      res.json(facilities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch facilities' });
    }
  });

  app.get('/api/facilities/:id', async (req, res) => {
    try {
      const facility = await storage.getFacility(req.params.id);
      if (!facility) {
        return res.status(404).json({ error: 'Facility not found' });
      }
      res.json(facility);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch facility' });
    }
  });

  // Guide Routes
  app.get('/api/guides/:facilityId', async (req, res) => {
    try {
      const guides = await storage.getGuidesByFacility(req.params.facilityId);
      res.json(guides);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch guides' });
    }
  });

  // Inquiry Routes
  app.get('/api/inquiries', async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
  });

  app.post('/api/inquiries', async (req, res) => {
    try {
      const parsed = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(parsed);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create inquiry' });
    }
  });

  app.get('/api/inquiries/:id', async (req, res) => {
    try {
      const inquiry = await storage.getInquiry(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ error: 'Inquiry not found' });
      }
      res.json(inquiry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inquiry' });
    }
  });

  // Reply Routes
  app.get('/api/inquiries/:inquiryId/replies', async (req, res) => {
    try {
      const replies = await storage.getRepliesByInquiry(req.params.inquiryId);
      res.json(replies);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch replies' });
    }
  });

  app.post('/api/inquiries/:inquiryId/replies', async (req, res) => {
    try {
      const parsed = insertReplySchema.parse({
        ...req.body,
        inquiryId: req.params.inquiryId,
      });
      const reply = await storage.createReply(parsed);
      res.status(201).json(reply);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create reply' });
    }
  });

  // Menu Like Routes
  app.post('/api/menus/:menuId/like', async (req, res) => {
    try {
      const menu = await storage.likeMenu(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found' });
      }
      res.json(menu);
    } catch (error) {
      res.status(500).json({ error: 'Failed to like menu' });
    }
  });

  app.post('/api/menus/:menuId/unlike', async (req, res) => {
    try {
      const menu = await storage.unlikeMenu(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found' });
      }
      res.json(menu);
    } catch (error) {
      res.status(500).json({ error: 'Failed to unlike menu' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
