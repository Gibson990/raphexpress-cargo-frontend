# 🎨 Raphexpress Cargo - Frontend Development Plan

## 📋 Project Overview
Building a production-ready React frontend for Raphexpress Cargo - a next-generation logistics and shipping platform inspired by Aramex and Shiprocket.

---

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (faster than CRA)
- **Routing**: React Router v6
- **State Management**: Redux Toolkit + RTK Query (for API calls)
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Date Picker**: React Day Picker
- **Maps**: Mapbox GL JS or Google Maps API
- **Charts**: Recharts
- **Animations**: Framer Motion
- **HTTP Client**: Axios (wrapped in RTK Query)

### Additional Libraries
- **QR/Barcode**: react-qr-code, react-barcode
- **PDF Generation**: jsPDF or react-pdf
- **Notifications**: React Hot Toast
- **Calendar**: FullCalendar or React Big Calendar
- **Real-time**: Socket.io-client (for live tracking)
- **Payment**: Stripe/Razorpay SDK integration

---

## 🎨 Design System

### Color Palette (Orange Theme)
```css
Primary Orange: #FF6B35
Secondary Orange: #FF8C42
Dark Orange: #E55525
Light Orange: #FFB88C

Neutral Gray: #F5F5F5
Medium Gray: #9CA3AF
Dark Gray: #374151
Text Dark: #1F2937

White: #FFFFFF
Success Green: #10B981
Warning Yellow: #F59E0B
Error Red: #EF4444
Info Blue: #3B82F6
```

### Typography
- **Primary Font**: Inter or Poppins
- **Monospace**: JetBrains Mono (for tracking IDs)

### Component Design Principles
- Clean, minimal, and functional
- Consistent spacing (4px, 8px, 16px, 24px, 32px)
- Rounded corners (4px, 8px, 12px)
- Subtle shadows and hover effects
- Responsive breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)

---

## 📁 Project Structure

```
raphexpress-frontend/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── assets/
├── src/
│   ├── app/
│   │   ├── store.ts              # Redux store configuration
│   │   └── hooks.ts              # Typed Redux hooks
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/
│   │   ├── common/               # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── shipment/
│   │   │   ├── ShipmentCard.tsx
│   │   │   ├── TrackingTimeline.tsx
│   │   │   ├── ShipmentForm.tsx
│   │   │   └── RateCalculator.tsx
│   │   ├── availability/
│   │   │   ├── FlightSchedule.tsx
│   │   │   ├── ShipSchedule.tsx
│   │   │   └── AvailabilityCalendar.tsx
│   │   ├── tracking/
│   │   │   ├── LiveMap.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   └── TrackingDetails.tsx
│   │   └── dashboard/
│   │       ├── StatsCard.tsx
│   │       ├── RecentShipments.tsx
│   │       └── AnalyticsChart.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.ts
│   │   │   ├── authAPI.ts
│   │   │   └── authTypes.ts
│   │   ├── shipments/
│   │   │   ├── shipmentsSlice.ts
│   │   │   ├── shipmentsAPI.ts
│   │   │   └── shipmentsTypes.ts
│   │   ├── tracking/
│   │   │   ├── trackingSlice.ts
│   │   │   └── trackingAPI.ts
│   │   └── availability/
│   │       ├── availabilitySlice.ts
│   │       └── availabilityAPI.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CreateShipment.tsx
│   │   ├── TrackShipment.tsx
│   │   ├── Availability.tsx
│   │   ├── MyShipments.tsx
│   │   ├── Profile.tsx
│   │   ├── Billing.tsx
│   │   ├── Support.tsx
│   │   └── NotFound.tsx
│   ├── services/
│   │   ├── api.ts                # Axios instance
│   │   ├── socket.ts             # Socket.io setup
│   │   └── storage.ts            # LocalStorage helpers
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useShipment.ts
│   │   ├── useTracking.ts
│   │   └── useGeolocation.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── shipment.ts
│   │   ├── user.ts
│   │   └── api.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🖥️ Page Breakdown

### 1. **Landing Page** (`/`)
**Purpose**: First impression, quick tracking, and CTA

**Sections**:
- Hero section with animated background
- Quick track order search bar (prominent)
- Key features showcase (3-4 cards)
- How it works (step-by-step visual)
- Testimonials/Stats
- CTA buttons (Get Started, Track Shipment)
- Footer with links

**Components**:
- `<Hero />`
- `<QuickTrack />`
- `<FeatureCards />`
- `<HowItWorks />`
- `<Stats />`
- `<Footer />`

---

### 2. **Authentication Pages**

#### Login (`/login`)
- Email/Phone + Password
- Remember me checkbox
- Forgot password link
- Social login options (optional)
- Sign up redirect

#### Signup (`/signup`)
- User type selection (Individual/Business)
- Name, Email, Phone, Password
- Terms & conditions checkbox
- Email verification flow

#### Forgot Password (`/forgot-password`)
- Email input
- OTP verification
- New password setup

**Components**:
- `<AuthForm />`
- `<OTPInput />`
- `<PasswordStrength />`

---

### 3. **User Dashboard** (`/dashboard`)
**Purpose**: Central hub for all user activities

**Layout**: Sidebar + Main Content

**Sections**:
- **Overview Stats**
  - Active shipments count
  - Pending deliveries
  - Total spent this month
  - Quick actions (Create Shipment, Track Order)

- **Recent Shipments Table**
  - Tracking ID, Destination, Status, ETA
  - Quick actions (View, Track, Download Label)

- **Upcoming Flights/Ships** (if any bookings)
- **Notifications Panel**

**Components**:
- `<DashboardStats />`
- `<ShipmentsTable />`
- `<NotificationBell />`
- `<QuickActions />`

---

### 4. **Create Shipment** (`/shipments/create`)
**Purpose**: Multi-step shipment creation wizard

**Steps**:
1. **Shipment Type**
   - Local or International
   - Document or Parcel

2. **Pickup & Delivery Details**
   - From address (with map picker)
   - To address (with map picker)
   - Contact details

3. **Package Details**
   - Weight, Dimensions
   - Quantity
   - Content description
   - Declared value

4. **Shipping Mode Selection**
   - Air Freight (fast, expensive)
   - Sea Freight (slow, cheap)
   - Show estimated cost and delivery time for each

5. **Schedule Selection** (Availability)
   - Show available flights/ships
   - Calendar view with available dates
   - Time slot selection

6. **Customs & Insurance**
   - "I have clearance" / "Need assistance"
   - Insurance options
   - Special handling requirements

7. **Review & Payment**
   - Summary of all details
   - Cost breakdown
   - Payment method selection
   - Confirm booking

**Components**:
- `<StepWizard />`
- `<AddressForm />`
- `<MapPicker />`
- `<PackageForm />`
- `<ShippingModeSelector />`
- `<AvailabilityCalendar />`
- `<CustomsForm />`
- `<PaymentForm />`
- `<OrderSummary />`

---

### 5. **Track Shipment** (`/track` or `/track/:id`)
**Purpose**: Real-time shipment tracking

**Features**:
- Search by tracking ID
- Visual timeline (Picked → In Transit → Customs → Out for Delivery → Delivered)
- Live map showing current location
- Estimated delivery date/time
- Shipment details card
- Download label/invoice buttons
- Contact support button

**Components**:
- `<TrackingSearch />`
- `<TrackingTimeline />`
- `<LiveMap />`
- `<ShipmentDetails />`
- `<DocumentDownload />`

---

### 6. **Availability Page** (`/availability`)
**Purpose**: Browse available cargo flights and ships

**Features**:
- **Search Filters**
  - Origin location (auto-detect or manual)
  - Destination
  - Date range (calendar)
  - Shipping mode (Air/Sea)
  - Cargo size

- **Results Display**
  - List/Grid view toggle
  - Flight/Ship cards showing:
    - Departure/Arrival times
    - Route
    - Available capacity
    - Estimated cost
    - Book now button

- **Calendar View**
  - Monthly calendar with available dates highlighted
  - Click date to see all options

**Components**:
- `<AvailabilityFilters />`
- `<FlightCard />`
- `<ShipCard />`
- `<CalendarView />`
- `<LocationPicker />`

---

### 7. **My Shipments** (`/shipments`)
**Purpose**: View and manage all shipments

**Features**:
- Filterable table (All, Active, Delivered, Cancelled)
- Search by tracking ID
- Sort by date, status, destination
- Bulk actions (Download labels, Export CSV)
- Pagination

**Components**:
- `<ShipmentsTable />`
- `<FilterTabs />`
- `<SearchBar />`
- `<BulkActions />`

---

### 8. **Billing & Payments** (`/billing`)
**Purpose**: Manage payments and invoices

**Features**:
- Wallet balance (for business users)
- Payment history table
- Download invoices
- Add payment method
- Auto-recharge settings

**Components**:
- `<WalletCard />`
- `<PaymentHistory />`
- `<InvoiceDownload />`
- `<PaymentMethods />`

---

### 9. **Profile** (`/profile`)
**Purpose**: User account management

**Sections**:
- Personal information
- Address book (saved addresses)
- Security settings (Change password, 2FA)
- Notification preferences
- API keys (for business users)

**Components**:
- `<ProfileForm />`
- `<AddressBook />`
- `<SecuritySettings />`
- `<APIKeyManager />`

---

### 10. **Support** (`/support`)
**Purpose**: Help center and live chat

**Features**:
- FAQ accordion
- Live chat widget
- Submit ticket form
- Knowledge base search

**Components**:
- `<FAQAccordion />`
- `<LiveChat />`
- `<TicketForm />`

---

## 🔄 Key Features Implementation

### 1. **Real-time Tracking**
- Use Socket.io for live updates
- Update Redux store when shipment status changes
- Show toast notifications for status updates
- Animate map markers

### 2. **Interactive Map**
- Mapbox GL JS or Google Maps
- Show route from origin to destination
- Animate current location marker
- Display waypoints (pickup, customs, delivery)

### 3. **Availability Calendar**
- React Big Calendar or custom implementation
- Highlight available dates
- Show capacity indicators (green = available, yellow = limited, red = full)
- Click date to see flight/ship options

### 4. **Barcode/QR Generation**
- Generate unique tracking ID
- Create QR code for mobile scanning
- Generate barcode for label printing
- Download as PDF

### 5. **Multi-step Forms**
- Use React Hook Form for validation
- Save progress in localStorage
- Show progress indicator
- Allow back/forward navigation

### 6. **Payment Integration**
- Stripe or Razorpay
- Support UPI, cards, wallets
- Show payment status
- Generate invoice after payment

### 7. **Responsive Design**
- Mobile-first approach
- Hamburger menu for mobile
- Touch-friendly buttons
- Optimized images

---

## 🚀 Development Phases

### Phase 1: Setup & Foundation (Week 1)
- [ ] Initialize Vite + React + TypeScript project
- [ ] Setup Tailwind CSS + shadcn/ui
- [ ] Configure Redux Toolkit + RTK Query
- [ ] Setup React Router
- [ ] Create folder structure
- [ ] Design system (colors, typography, spacing)
- [ ] Create base components (Button, Input, Card, Modal)
- [ ] Setup ESLint + Prettier

### Phase 2: Core Pages (Week 2-3)
- [ ] Landing page with hero and features
- [ ] Authentication pages (Login, Signup, Forgot Password)
- [ ] Main layout with Navbar and Footer
- [ ] Dashboard layout with Sidebar
- [ ] User dashboard with stats

### Phase 3: Shipment Features (Week 4-5)
- [ ] Create shipment wizard (all 7 steps)
- [ ] Address picker with map integration
- [ ] Shipping mode selector with pricing
- [ ] Availability calendar integration
- [ ] Payment integration
- [ ] Shipment confirmation page

### Phase 4: Tracking & Availability (Week 6)
- [ ] Track shipment page with timeline
- [ ] Live map integration
- [ ] Real-time updates with Socket.io
- [ ] Availability page with filters
- [ ] Flight/Ship schedule cards
- [ ] Calendar view for availability

### Phase 5: Management Pages (Week 7)
- [ ] My Shipments page with table
- [ ] Billing & payments page
- [ ] Profile page with settings
- [ ] Address book management
- [ ] API key management (for business)

### Phase 6: Additional Features (Week 8)
- [ ] Support page with live chat
- [ ] Notification system
- [ ] PDF generation for labels/invoices
- [ ] QR/Barcode generation
- [ ] Export to CSV/PDF
- [ ] Email templates

### Phase 7: Polish & Optimization (Week 9-10)
- [ ] Animations with Framer Motion
- [ ] Loading states and skeletons
- [ ] Error handling and fallbacks
- [ ] Performance optimization (code splitting, lazy loading)
- [ ] SEO optimization
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

### Phase 8: Testing & Deployment (Week 11-12)
- [ ] Unit tests (Jest + React Testing Library)
- [ ] Integration tests
- [ ] E2E tests (Playwright or Cypress)
- [ ] Build optimization
- [ ] Environment configuration
- [ ] Deploy to Vercel/Netlify
- [ ] Setup CI/CD pipeline

---

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.6.0",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.16.0",
    "react-hot-toast": "^2.4.0",
    "recharts": "^2.10.0",
    "mapbox-gl": "^3.0.0",
    "react-map-gl": "^7.1.0",
    "react-big-calendar": "^1.8.0",
    "react-qr-code": "^2.0.0",
    "react-barcode": "^1.4.0",
    "jspdf": "^2.5.0",
    "date-fns": "^3.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

---

## 🎯 Success Metrics

- **Performance**: Lighthouse score > 90
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile**: Fully responsive on all devices
- **Load Time**: First contentful paint < 1.5s
- **Bundle Size**: < 500KB gzipped
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest 2 versions)

---

## 📝 Notes

- Use TypeScript strictly (no `any` types)
- Follow React best practices (hooks, composition)
- Implement proper error boundaries
- Use lazy loading for routes
- Optimize images (WebP format, lazy loading)
- Implement proper SEO (meta tags, Open Graph)
- Add loading skeletons for better UX
- Use optimistic updates for better perceived performance
- Implement proper form validation with helpful error messages
- Add keyboard shortcuts for power users
- Implement dark mode (optional, future enhancement)

---

## 🔗 API Integration Points

Based on the documentation, the frontend will integrate with these API endpoints:

- `POST /api/v1/create-shipment` - Create new shipment
- `GET /api/v1/track/:id` - Track shipment
- `POST /api/v1/rates` - Calculate shipping rates
- `GET /api/v1/availability` - Get flight/ship availability
- `POST /api/v1/webhook` - Receive real-time updates
- `GET /api/v1/returns/:id` - Manage returns

---

## 🎨 UI/UX Inspiration

- **Aramex**: Clean layout, orange theme, professional feel
- **Shiprocket**: Modern dashboard, intuitive shipment creation
- **DHL**: Excellent tracking visualization, clear status updates

---

This plan provides a complete roadmap for building a production-ready frontend for Raphexpress Cargo. Ready to start implementation! 🚀
