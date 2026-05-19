# Campus Tour - Wonkwang University

## Overview

Campus Tour is a web application designed to help international students at Wonkwang University navigate campus dining facilities and student services. The app provides multilingual support (Korean, English, Uzbek, Vietnamese, Chinese) to help students find restaurants, view menus, check dietary restrictions, and access information about campus facilities like bookstores and health centers.

The application serves as a utility tool focused on accessibility and clarity, using icon-driven communication to transcend language barriers and provide quick access to essential campus information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React with TypeScript for type safety and component-based architecture
- Vite as the build tool and development server
- Wouter for lightweight client-side routing

**UI Component System:**
- shadcn/ui component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theme customization supporting university brand colors
- Material Design principles for internationalization and visual clarity

**State Management:**
- TanStack Query (React Query) for server state management and data fetching
- React Context API for global state (language preferences)
- Local Storage for client-side persistence (favorites functionality)

**Internationalization:**
- Custom i18n implementation with language context provider
- Support for 5 languages: Korean (ko), English (en), Uzbek (uz), Vietnamese (vi), Chinese (zh)
- Google Fonts integration (Noto Sans KR, Noto Sans) for multi-script support

**Design System:**
- Typography hierarchy with consistent font sizing (text-4xl for heroes down to text-sm for captions)
- Spacing system based on Tailwind units (2, 4, 8, 12, 16)
- Responsive grid layouts (mobile-first approach)
- Custom elevation effects (hover-elevate, active-elevate-2 classes)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for the HTTP server
- RESTful API design pattern

**Data Layer:**
- In-memory storage implementation (MemStorage class) for development
- Drizzle ORM configured for PostgreSQL (production-ready schema defined)
- Database schema supports restaurants, menus, facilities, and guides with UUID primary keys

**API Endpoints:**
- `/api/restaurants` - List all restaurants
- `/api/restaurants/:id` - Get restaurant details
- `/api/menus/:restaurantId` - Get menus for a specific restaurant
- `/api/all-menus` - Get all menus across restaurants
- `/api/menus/:menuId/like` - POST to increment like count for a menu item
- `/api/menus/:menuId/unlike` - POST to decrement like count for a menu item
- `/api/facilities` - List all campus facilities
- `/api/facilities/:id` - Get facility details
- `/api/guides/:facilityId` - Get usage guides for facilities

**Request/Response Pattern:**
- JSON payload handling with body parsing
- Error handling with appropriate HTTP status codes
- Request logging middleware for API routes

### Data Models

**Restaurant Entity:**
- Categorized as student_cafeteria, cafe, or restaurant
- Multilingual fields (name, nameEn, location, locationEn)
- Geographic data (mapLat, mapLng) for mapping integration
- Operating hours and image URLs

**Menu Entity:**
- Linked to restaurants via restaurantId
- Dietary metadata (hasPork, isSpicy, isVegetarian)
- Day-of-week field for student cafeteria weekly menus
- Price and multilingual naming
- `likeCount` field for total likes (server-side persistence)

**Facility Entity:**
- Types include bookstore and health_center
- Similar multilingual structure to restaurants
- Operating hours and location data

**Guide Entity:**
- Instructional content for facilities
- Multilingual step-by-step guides
- Linked to facilities via facilityId

**Favorites (Client-side):**
- localStorage-based persistence for user's personal favorites
- Menu items can be favorited with heart icon
- Custom event system for cross-component reactivity
- Like counts are stored server-side and displayed next to favorites button
- Like/unlike API called when toggling favorites to update global like count

### Routing Strategy

**Client-side Routes:**
- `/` - Home page with hero section
- `/restaurants` - Restaurant listing
- `/restaurant/:id` - Restaurant detail with menu tabs
- `/facilities` - Facility listing
- `/facility/:id` - Facility detail with guides
- `/favorites` - User's saved favorite menu items

**Development vs Production:**
- Vite dev server in middleware mode during development
- Static file serving for production builds
- Replit-specific plugins for development experience

## External Dependencies

**UI & Styling:**
- Radix UI primitives (@radix-ui/*) - Accessible component foundations
- Tailwind CSS - Utility-first CSS framework
- class-variance-authority - Component variant management
- Noto Sans fonts (Google Fonts CDN) - Multi-language typography

**Data & State:**
- TanStack Query - Server state management
- Drizzle ORM - Type-safe database toolkit
- drizzle-zod - Schema validation
- @neondatabase/serverless - PostgreSQL driver for Neon

**Development Tools:**
- Vite - Frontend build tool and dev server
- TypeScript - Type safety
- ESBuild - Production bundling
- tsx - TypeScript execution for development

**Utilities:**
- wouter - Lightweight routing
- date-fns - Date manipulation
- react-hook-form - Form handling
- zod - Runtime type validation

**Planned Integrations:**
- Google Maps or Naver Maps API for campus navigation (referenced in design docs but not yet implemented)

**Asset Management:**
- Static assets served from `/attached_assets` directory
- AI-generated placeholder images for restaurants and facilities
- Vite alias configuration for asset imports

**Database:**
- PostgreSQL configured via Drizzle
- Connection via DATABASE_URL environment variable
- Migration system via drizzle-kit