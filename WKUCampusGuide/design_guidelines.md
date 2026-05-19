# Design Guidelines: Campus Tour (캠퍼스 투어) - Wonkwang University

## Design Approach

**Selected Approach**: Hybrid - Material Design System + Food Discovery Apps Reference

**Justification**: This utility app serves international students who need quick, clear access to campus information. Material Design provides excellent internationalization support and clear information hierarchy. We'll draw inspiration from food discovery apps (DoorDash, Uber Eats) for restaurant browsing patterns while maintaining clean, accessible design for non-native Korean speakers.

**Key Principles**:
- Visual clarity over decoration
- Icon-driven communication to transcend language barriers
- Consistent, learnable patterns
- Mobile-first responsive design

---

## Typography

**Font Families**:
- Primary: 'Noto Sans KR' (excellent multi-script support for Korean/Chinese/Vietnamese)
- Secondary: 'Noto Sans' (for English/Uzbek)
- Both via Google Fonts CDN

**Hierarchy**:
- Hero/Page Titles: text-4xl font-bold (36px)
- Section Headings: text-2xl font-semibold (24px)
- Card Titles: text-lg font-medium (18px)
- Body Text: text-base font-normal (16px)
- Captions/Labels: text-sm font-normal (14px)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 8, 12, 16**
- Component padding: p-4, p-8
- Section spacing: py-12, py-16
- Card gaps: gap-4, gap-8
- Icon spacing: w-8 h-8, w-12 h-12

**Container Widths**:
- Max content width: max-w-7xl mx-auto
- Card grids: max-w-6xl
- Form content: max-w-2xl

**Grid System**:
- Restaurant cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Facility cards: grid-cols-1 lg:grid-cols-2
- Menu items: grid-cols-1 md:grid-cols-2

---

## Component Library

### Navigation
- **Top Navigation Bar**: Fixed header with language selector (flag icons), search icon, favorites icon
- Language selector dropdown in top-right corner
- Hamburger menu for mobile navigation
- Breadcrumb trail for deep navigation (Facility > Bookstore > Ordering Guide)

### Hero Section
- **Full-width banner** featuring Wonkwang University campus photo
- Centered heading: "캠퍼스 투어 / Campus Tour" with translated subtitle
- Two prominent CTA buttons: "Search Restaurant" and "Search Facility"
- Height: 60vh on desktop, 50vh on mobile

### Restaurant Cards
- **Card Structure**:
  - Restaurant thumbnail image (aspect-ratio-16/9)
  - Restaurant name (bilingual if needed)
  - Operating hours with clock icon
  - Quick info badges: Distance, Rating (if available)
  - Dietary indicator icons row (pork, spicy, halal-friendly)
- Shadow: shadow-md, hover:shadow-lg transition
- Rounded corners: rounded-lg

### Menu Display
- **Menu Item Card**:
  - Food photo (square aspect-ratio-1/1)
  - Menu name (primary language + English subtitle)
  - Price tag with currency symbol
  - Dietary icons prominently displayed
  - Heart icon for favorites (outline when not favorited)
- Grid layout with generous spacing

### Map Integration
- **Interactive Campus Map**:
  - Full-width container with min-height of 500px
  - Pin markers for restaurants (red) and facilities (blue)
  - Info popup on pin click showing name, hours, quick link
  - Zoom controls, current location button

### Facility Information
- **Detail Page Layout**:
  - Image gallery carousel (3-5 interior/exterior photos)
  - Information cards: Location, Hours, Contact
  - Step-by-step guide sections (for bookstore orders, health center forms)
  - Visual timeline for multi-step processes

### Forms & Guides
- **Application Form Tutorial**:
  - Split layout: Form image on left, instructions on right (desktop)
  - Stacked on mobile
  - Numbered steps with circle badges
  - Highlighted form fields corresponding to each step
  - Download button for blank form PDF

### Favorite List
- **Saved Items Page**:
  - Similar card layout to main restaurant browse
  - "Remove from favorites" action
  - Empty state illustration with prompt to explore restaurants

### Icons & Indicators
- **Dietary Restriction Icons** (use Heroicons or Font Awesome):
  - Pork: Pig icon with red circle
  - Spicy: Flame icon with orange indicator
  - Vegetarian-friendly: Leaf icon in green
  - Halal: Crescent icon
- **Facility Icons**: Book (bookstore), Medical cross (health center), Coffee cup (cafes)
- Size: w-6 h-6 for inline, w-8 h-8 for prominent display

---

## Interactive Elements

### Buttons
- **Primary CTA**: Rounded-full, px-8 py-3, font-medium, shadow-md
- **Secondary**: Rounded-lg, px-6 py-2, border-2
- **Icon buttons**: Circular, p-3, for favorites/share actions
- **Blur background for image overlays**: backdrop-blur-sm bg-white/90

### Cards
- Hover state: Subtle lift with shadow-lg transition
- Clickable areas: Entire card surface
- Cursor: pointer on hover

### Language Selector
- Dropdown with flag icons + language names
- Persistent selection (localStorage)
- Smooth content transition (no page reload)

---

## Images

**Hero Section**: Wide banner image of Wonkwang University campus - iconic building or scenic campus view (1920x800px recommended)

**Restaurant Photos**: Real food photos for each menu item - close-up, well-lit, appetizing (600x600px minimum)

**Facility Photos**: Interior shots of bookstore, health center, other facilities - show actual spaces students will visit (800x600px)

**Icons**: Use CDN-based icon library (Heroicons recommended) for all UI icons, dietary indicators, facility markers

---

## Accessibility & Internationalization

- All text labels have translation keys
- Icon meanings reinforced with tooltips (in selected language)
- High contrast ratios for text (WCAG AA minimum)
- Touch targets minimum 44x44px
- Focus indicators on all interactive elements
- Screen reader labels for icon-only buttons
- RTL layout consideration (future Arabic support)

---

## Special Considerations

**Multi-language Content Strategy**:
- UI labels/buttons: Full translation
- Menu names: Korean primary + English/native subtitle
- Instructions/guides: Full translation with visual aids
- Form guides: Side-by-side comparison preferred

**Mobile Optimization**:
- Bottom navigation bar for quick access to Home, Favorites, Map, Language
- Larger touch targets for map pins on mobile
- Simplified card layouts (single column)
- Sticky language selector for easy switching

**Performance**:
- Lazy load menu images
- Progressive enhancement for map features
- Cached translations for offline access