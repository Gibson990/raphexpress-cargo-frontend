// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// Shipping Modes
export const SHIPPING_MODES = {
  AIR: 'air',
  SEA: 'sea',
  EXPRESS: 'express',
} as const;

export const SHIPPING_MODE_LABELS = {
  [SHIPPING_MODES.AIR]: 'Air Freight',
  [SHIPPING_MODES.SEA]: 'Sea Freight',
  [SHIPPING_MODES.EXPRESS]: 'Express Delivery',
};

// Shipment Status
export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PICKED: 'picked',
  IN_TRANSIT: 'in_transit',
  CUSTOMS: 'customs',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const SHIPMENT_STATUS_LABELS = {
  [SHIPMENT_STATUS.PENDING]: 'Pending Pickup',
  [SHIPMENT_STATUS.PICKED]: 'Picked Up',
  [SHIPMENT_STATUS.IN_TRANSIT]: 'In Transit',
  [SHIPMENT_STATUS.CUSTOMS]: 'Customs Clearance',
  [SHIPMENT_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [SHIPMENT_STATUS.DELIVERED]: 'Delivered',
  [SHIPMENT_STATUS.CANCELLED]: 'Cancelled',
};

export const SHIPMENT_STATUS_COLORS = {
  [SHIPMENT_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [SHIPMENT_STATUS.PICKED]: 'bg-blue-100 text-blue-800',
  [SHIPMENT_STATUS.IN_TRANSIT]: 'bg-purple-100 text-purple-800',
  [SHIPMENT_STATUS.CUSTOMS]: 'bg-orange-100 text-orange-800',
  [SHIPMENT_STATUS.OUT_FOR_DELIVERY]: 'bg-indigo-100 text-indigo-800',
  [SHIPMENT_STATUS.DELIVERED]: 'bg-green-100 text-green-800',
  [SHIPMENT_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
};

// User Roles
export const USER_ROLES = {
  INDIVIDUAL: 'individual',
  BUSINESS: 'business',
  ADMIN: 'admin',
} as const;

// Customs Options
export const CUSTOMS_OPTIONS = {
  HAVE_CLEARANCE: 'have_clearance',
  NEED_ASSISTANCE: 'need_assistance',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  UPI: 'upi',
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
  WALLET: 'wallet',
  MPESA: 'mpesa',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  CREATE_SHIPMENT: '/shipments/create',
  MY_SHIPMENTS: '/shipments',
  RETURN_ORDER: '/returns/create',
  REFUND_REQUEST: '/refunds/create',
  PAYMENT: '/payment',
  TRACK: '/track',
  TRACK_ID: '/track/:id',
  AVAILABILITY: '/availability',
  BILLING: '/billing',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  SUPPORT: '/support',
  JOIN_US: '/join-us',
  API_DOCS: '/api',
  CALCULATOR: '/calculator',
  
  // Company
  ABOUT: '/about',
  CONTACT: '/contact',
  CAREERS: '/careers',
  BLOG: '/blog',
  
  // Services
  SERVICE_AIR: '/services/air',
  SERVICE_SEA: '/services/sea',
  SERVICE_EXPRESS: '/services/express',
  
  // Legal
  PRIVACY: '/privacy',
  TERMS: '/terms',
  COOKIES: '/cookies',
  COMPLIANCE: '/compliance',
} as const;

// Image Placeholders (Using Unsplash for high-quality images)
export const IMAGES = {
  HERO_BG: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80',
  CARGO_PLANE: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80',
  CARGO_SHIP: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
  DELIVERY_TRUCK: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80',
  WAREHOUSE: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
  PACKAGE: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=800&q=80',
  TRACKING: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80',
  GLOBE: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80',
  LOGISTICS: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
  CUSTOMS: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
};

// Feature Icons (for landing page)
export const FEATURES = [
  {
    title: 'Global Shipping',
    description: 'Ship to over 200+ countries with our extensive network',
    icon: 'Globe',
  },
  {
    title: 'Real-time Tracking',
    description: 'Track your shipments in real-time with live updates',
    icon: 'MapPin',
  },
  {
    title: 'Smart Customs',
    description: 'Automated customs handling and documentation',
    icon: 'FileCheck',
  },
  {
    title: 'Flexible Shipping',
    description: 'Choose from Air, Sea, or Express delivery options',
    icon: 'Plane',
  },
  {
    title: 'API Integration',
    description: 'Seamlessly integrate with your e-commerce platform',
    icon: 'Code',
  },
  {
    title: 'Secure Payments',
    description: 'Multiple payment options with secure transactions',
    icon: 'CreditCard',
  },
];
