# 🚀 COMPREHENSIVE BACKEND PLAN - Complete Ecosystem

**Date**: November 14, 2025  
**Status**: 📋 COMPLETE PLANNING PHASE  
**Scope**: Website + Mobile App + Third-Party APIs + Integrations

---

## 📊 PROJECT SCOPE

### **Clients**
1. ✅ **Website** (React 18 - 30+ pages, 14 user flows)
2. ✅ **Mobile App** (Flutter - iOS/Android)
3. 🔄 **Third-Party APIs** (E-commerce platforms, logistics partners)
4. 🔄 **Admin Dashboard** (Internal operations)

### **Key Features**
- Multi-mode shipping (Air, Sea, Land)
- Real-time tracking
- Dynamic pricing
- Payment processing
- Tax calculation
- Carrier integration
- API marketplace

---

## 🏗️ BACKEND ARCHITECTURE (ENHANCED)

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  Website (React)  │  Mobile (Flutter)  │  Third-Party APIs  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS REST API
┌────────────────────────▼────────────────────────────────────┐
│                  API GATEWAY LAYER                          │
│  - Rate Limiting                                            │
│  - Request Validation                                       │
│  - Authentication                                           │
│  - Versioning (v1, v2, etc.)                               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  GO BACKEND (Microservices)                 │
├────────────────────────────────────────────────────────────┤
│  ├── Auth Service (Firebase)                               │
│  ├── Shipment Service                                      │
│  ├── Pricing Service (Dynamic)                             │
│  ├── Payment Service (Multi-gateway)                       │
│  ├── Tax Service (Multi-country)                           │
│  ├── Tracking Service (Real-time)                          │
│  ├── Carrier Integration Service                           │
│  ├── Notification Service                                  │
│  ├── Document Service (AWB, B/L, CMR)                      │
│  └── Admin Service                                         │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    ┌───▼──┐      ┌─────▼──┐      ┌────▼───┐
    │      │      │        │      │        │
PostgreSQL  Redis   S3      Kafka  Elasticsearch
(Database) (Cache) (Files) (Events) (Logging)
    │      │      │        │      │
    └───┬──┘      └────┬───┘      └───┬────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    ┌───▼──┐      ┌───▼──┐      ┌───▼──┐
    │      │      │      │      │      │
  Stripe Razorpay PayPal  M-Pesa Wallet
 (Payments)
    │      │      │      │      │
    └───┬──┘      └──┬───┘      └───┬──┘
        │            │             │
        └────────────┼─────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
    ┌───▼──┐    ┌───▼──┐    ┌───▼──┐
    │      │    │      │    │      │
SendGrid Twilio Firebase  AWS  TaxJar
(Email) (SMS) (Auth)  (S3) (Tax API)
    │    │    │      │    │
    └────┴────┴──────┴────┘
         │
    ┌────▼────────────────────┐
    │  CARRIER INTEGRATIONS    │
    ├────────────────────────┤
    │  Air Freight:          │
    │  - Emirates SkyCargo   │
    │  - FedEx               │
    │  - DHL                 │
    │  - UPS                 │
    │                        │
    │  Sea Freight:          │
    │  - Maersk              │
    │  - MSC                 │
    │  - CMA CGM             │
    │  - Hapag-Lloyd         │
    │                        │
    │  Land Freight:         │
    │  - Local Couriers      │
    │  - Regional Partners   │
    │  - Custom Carriers     │
    └────────────────────────┘
```

---

## 🔐 AUTHENTICATION & AUTHORIZATION

### **Firebase Authentication**
```
User Types:
├── Individual Shipper
├── Business Account
├── Developer (API Access)
├── Admin
└── Carrier Partner

Roles & Permissions:
├── User
│   ├── Create Shipment
│   ├── Track Shipment
│   ├── Request Return/Refund
│   └── View History
├── Business
│   ├── Bulk Shipments
│   ├── API Access
│   ├── Custom Pricing
│   └── Team Management
├── Developer
│   ├── Full API Access
│   ├── Webhook Support
│   ├── Rate Limit: 10,000 req/day
│   └── Documentation Access
├── Admin
│   ├── All Operations
│   ├── User Management
│   ├── Carrier Management
│   ├── Pricing Control
│   └── Report Generation
└── Carrier
    ├── Shipment Assignment
    ├── Status Updates
    ├── Tracking Updates
    └── Document Generation
```

---

## 💰 PRICING SERVICE (Dynamic)

### **Pricing Engine**

```go
type PricingEngine struct {
    BaseRates       map[string]float64  // Air, Sea, Land
    DistanceRates   map[string]float64  // Per km/mile
    WeightRates     map[string]float64  // Per kg
    DimensionRates  map[string]float64  // Per CBM
    ServiceModifiers map[string]float64 // Express, Standard, Economy
    CountryModifiers map[string]float64 // Country-specific
    CarrierRates    map[string]float64  // Carrier-specific
    Surcharges      []Surcharge         // Fuel, Security, etc.
}

// Pricing Calculation
func CalculatePrice(shipment *Shipment) (*PriceBreakdown, error) {
    basePrice := calculateBase(shipment)
    surcharges := calculateSurcharges(shipment)
    discounts := calculateDiscounts(shipment)
    tax := calculateTax(shipment)
    
    return &PriceBreakdown{
        BasePrice:    basePrice,
        Surcharges:   surcharges,
        Discounts:    discounts,
        Subtotal:     basePrice + surcharges - discounts,
        Tax:          tax,
        Total:        basePrice + surcharges - discounts + tax,
    }, nil
}
```

### **Pricing Factors**

**Air Freight**:
- Base rate: $8.50/kg
- Minimum charge: $50
- Express surcharge: +30%
- Dangerous goods: +50%
- Fuel surcharge: +5-15% (dynamic)

**Sea Freight**:
- 20ft Container: $1,500 base
- 40ft Container: $2,500 base
- Reefer surcharge: +20%
- Dangerous goods: +50%
- Port charges: +10-15%

**Land Freight**:
- Base rate: $0.50/km
- Weight surcharge: +$0.10/kg
- Minimum charge: $25
- Temperature control: +$50
- Dangerous goods: +$100

---

## 🌍 TAX SERVICE (Multi-Country)

### **Tax Calculation Engine**

```go
type TaxService struct {
    Rates       map[string]TaxRate
    Rules       map[string]TaxRule
    Exemptions  map[string][]string
    Thresholds  map[string]float64
}

type TaxRate struct {
    Country      string
    VAT          float64 // 0-25%
    GST          float64 // 0-18%
    SalesTax     float64 // 0-10%
    ImportDuty   float64 // 0-50%
    EffectiveDate time.Time
}

// Tax Calculation
func CalculateTax(shipment *Shipment, amount float64) (*TaxBreakdown, error) {
    country := shipment.ToCountry
    rate := getTaxRate(country)
    
    vat := amount * rate.VAT
    gst := amount * rate.GST
    salesTax := amount * rate.SalesTax
    importDuty := calculateImportDuty(shipment, amount)
    
    return &TaxBreakdown{
        VAT:        vat,
        GST:        gst,
        SalesTax:   salesTax,
        ImportDuty: importDuty,
        Total:      vat + gst + salesTax + importDuty,
    }, nil
}
```

### **Tax Rates by Country**

```json
{
  "AE": { "VAT": 0.05, "ImportDuty": 0.05 },
  "IN": { "GST": 0.18, "ImportDuty": 0.10 },
  "US": { "SalesTax": 0.07, "ImportDuty": 0.05 },
  "GB": { "VAT": 0.20, "ImportDuty": 0.05 },
  "SG": { "GST": 0.08, "ImportDuty": 0.00 },
  "AU": { "GST": 0.10, "ImportDuty": 0.05 },
  "CA": { "GST": 0.05, "ImportDuty": 0.05 },
  "JP": { "ConsumptionTax": 0.10, "ImportDuty": 0.05 }
}
```

---

## 💳 PAYMENT SERVICE (Multi-Gateway)

### **Payment Gateway Integration**

```go
type PaymentGateway interface {
    CreatePayment(amount float64, currency string) (*Payment, error)
    VerifyPayment(transactionID string) (*PaymentStatus, error)
    RefundPayment(transactionID string, amount float64) (*Refund, error)
    GetBalance() (float64, error)
}

// Supported Gateways
type PaymentService struct {
    Stripe    PaymentGateway
    Razorpay  PaymentGateway
    PayPal    PaymentGateway
    MPesa     PaymentGateway
    Wallet    PaymentGateway
}
```

### **Payment Methods**

**International**:
- ✅ Stripe (Card, ACH, iDEAL, Bancontact, etc.)
- ✅ PayPal (Global)
- ✅ Razorpay (India, Southeast Asia)

**Regional**:
- ✅ M-Pesa (Kenya, Tanzania, Uganda)
- ✅ GCash (Philippines)
- ✅ Alipay (China)
- ✅ WeChat Pay (China)

**Local**:
- ✅ Bank Transfer
- ✅ Wallet (In-app)
- ✅ Cash on Delivery (COD)

---

## 📦 CARRIER INTEGRATION SERVICE

### **Carrier API Abstraction**

```go
type CarrierAPI interface {
    // Booking
    CreateShipment(shipment *Shipment) (*CarrierShipment, error)
    GetRates(origin, destination string, weight float64) (*Rates, error)
    
    // Tracking
    TrackShipment(trackingNumber string) (*TrackingInfo, error)
    GetStatus(shipmentID string) (*Status, error)
    
    // Documents
    GenerateLabel(shipmentID string) (*Label, error)
    GenerateAWB(shipmentID string) (*AWB, error)
    
    // Management
    CancelShipment(shipmentID string) error
    UpdatePickup(shipmentID string, date time.Time) error
}

// Carrier Implementations
type EmiratesSkyCargo struct { /* ... */ }
type FedEx struct { /* ... */ }
type Maersk struct { /* ... */ }
type LocalCourier struct { /* ... */ }
```

### **Supported Carriers**

**Air Freight**:
- Emirates SkyCargo
- FedEx
- DHL
- UPS
- Qatar Airways Cargo
- Turkish Airlines Cargo

**Sea Freight**:
- Maersk
- MSC (Mediterranean Shipping Company)
- CMA CGM
- Hapag-Lloyd
- COSCO
- Evergreen

**Land Freight**:
- Local couriers (country-specific)
- Regional partners
- Custom carriers

---

## 🔌 THIRD-PARTY API MARKETPLACE

### **API Endpoints for E-Commerce Integration**

```
POST   /api/v1/integrations/shipments/create
GET    /api/v1/integrations/shipments/:id
GET    /api/v1/integrations/shipments/track/:trackingId
GET    /api/v1/integrations/rates
POST   /api/v1/integrations/labels/generate
GET    /api/v1/integrations/carriers
POST   /api/v1/integrations/webhooks/register
```

### **API Request Example (E-Commerce)**

```json
POST /api/v1/integrations/shipments/create

{
  "apiKey": "sk_live_xxx",
  "shipment": {
    "orderNumber": "ORDER123",
    "shipper": {
      "name": "E-Commerce Store",
      "address": "123 Business St",
      "city": "Dubai",
      "country": "AE"
    },
    "consignee": {
      "name": "Customer Name",
      "address": "456 Home St",
      "city": "New York",
      "country": "US"
    },
    "cargo": {
      "description": "Electronics",
      "weight": 2.5,
      "value": 500
    },
    "shippingMode": "air",
    "serviceType": "express"
  }
}
```

### **Webhook Events**

```
shipment.created
shipment.picked_up
shipment.in_transit
shipment.customs_cleared
shipment.out_for_delivery
shipment.delivered
shipment.exception
payment.completed
payment.failed
refund.initiated
refund.completed
```

---

## 📱 MOBILE APP INTEGRATION (Flutter)

### **Flutter App Features** (from pubspec.yaml analysis)

**Existing Modules**:
- ✅ Authentication
- ✅ Home Dashboard
- ✅ Add Shipping Order
- ✅ Order Tracking
- ✅ Payment
- ✅ Barcode Scanner
- ✅ Cargo Schedule
- ✅ Chat
- ✅ Profile
- ✅ Tax Calculator
- ✅ Shipping Calculator
- ✅ User Management

**Backend Support Needed**:
- ✅ All core APIs (same as website)
- ✅ Push notifications
- ✅ Offline sync
- ✅ Mobile-optimized endpoints
- ✅ Barcode/QR code validation

### **Mobile-Specific Endpoints**

```
GET    /api/v1/mobile/dashboard
POST   /api/v1/mobile/shipments/quick-create
GET    /api/v1/mobile/shipments/nearby
POST   /api/v1/mobile/barcode/validate
GET    /api/v1/mobile/notifications
POST   /api/v1/mobile/sync
```

---

## 📊 DATABASE SCHEMA ADDITIONS

### **New Tables for Ecosystem**

```sql
-- Carrier Management
CREATE TABLE carriers (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('air', 'sea', 'land') NOT NULL,
    api_endpoint VARCHAR(255),
    api_key VARCHAR(255) ENCRYPTED,
    is_active BOOLEAN DEFAULT true,
    supported_routes JSONB,
    rates JSONB,
    created_at TIMESTAMP
);

-- Tax Rates (Multi-Country)
CREATE TABLE tax_rates (
    id UUID PRIMARY KEY,
    country_code VARCHAR(2) NOT NULL,
    vat_rate DECIMAL(5, 2),
    gst_rate DECIMAL(5, 2),
    sales_tax_rate DECIMAL(5, 2),
    import_duty_rate DECIMAL(5, 2),
    effective_date DATE,
    created_at TIMESTAMP
);

-- Payment Gateways
CREATE TABLE payment_gateways (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('stripe', 'razorpay', 'paypal', 'mpesa', 'wallet') NOT NULL,
    api_key VARCHAR(255) ENCRYPTED,
    api_secret VARCHAR(255) ENCRYPTED,
    is_active BOOLEAN DEFAULT true,
    supported_currencies TEXT,
    created_at TIMESTAMP
);

-- API Keys (Third-Party)
CREATE TABLE api_keys (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    key_name VARCHAR(100) NOT NULL,
    key_value VARCHAR(255) UNIQUE NOT NULL ENCRYPTED,
    permissions TEXT,
    rate_limit INTEGER DEFAULT 10000,
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP,
    created_at TIMESTAMP
);

-- Webhooks
CREATE TABLE webhooks (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    event_type VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMP
);

-- Pricing Rules
CREATE TABLE pricing_rules (
    id UUID PRIMARY KEY,
    shipping_mode ENUM('air', 'sea', 'land') NOT NULL,
    origin_country VARCHAR(2),
    destination_country VARCHAR(2),
    min_weight DECIMAL(10, 2),
    max_weight DECIMAL(10, 2),
    base_price DECIMAL(12, 2),
    price_per_kg DECIMAL(10, 2),
    service_type ENUM('express', 'standard', 'economy'),
    effective_date DATE,
    created_at TIMESTAMP
);

-- Surcharges
CREATE TABLE surcharges (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('fuel', 'security', 'handling', 'customs', 'dangerous_goods') NOT NULL,
    percentage DECIMAL(5, 2),
    fixed_amount DECIMAL(12, 2),
    effective_date DATE,
    created_at TIMESTAMP
);
```

---

## 🔌 ENHANCED API ENDPOINTS

### **Pricing API**

```
POST   /api/v1/pricing/calculate
GET    /api/v1/pricing/rates
GET    /api/v1/pricing/surcharges
GET    /api/v1/pricing/rules
```

### **Tax API**

```
POST   /api/v1/tax/calculate
GET    /api/v1/tax/rates/:country
GET    /api/v1/tax/rules/:country
```

### **Carrier API**

```
GET    /api/v1/carriers
GET    /api/v1/carriers/:id/rates
POST   /api/v1/carriers/:id/shipments
GET    /api/v1/carriers/:id/tracking/:trackingId
```

### **Payment API**

```
POST   /api/v1/payments/gateways
GET    /api/v1/payments/methods
POST   /api/v1/payments/process
POST   /api/v1/payments/verify
POST   /api/v1/payments/refund
```

### **Integration API**

```
POST   /api/v1/integrations/register
GET    /api/v1/integrations/shipments
POST   /api/v1/integrations/webhooks
GET    /api/v1/integrations/api-keys
```

---

## 🎯 IMPLEMENTATION PHASES

### **Phase 1: Core Backend (Week 1-2)**
- [x] Database schema
- [x] Authentication
- [x] Basic shipment CRUD
- [x] Firebase setup

### **Phase 2: Pricing & Tax (Week 2-3)**
- [x] Pricing engine
- [x] Tax calculation
- [x] Dynamic rates
- [x] Surcharges

### **Phase 3: Payments (Week 3-4)**
- [x] Stripe integration
- [x] Razorpay integration
- [x] PayPal integration
- [x] M-Pesa integration

### **Phase 4: Carriers (Week 4-5)**
- [x] Carrier abstraction layer
- [x] Emirates integration
- [x] FedEx integration
- [x] Maersk integration

### **Phase 5: Third-Party APIs (Week 5-6)**
- [x] API marketplace
- [x] API key management
- [x] Webhook system
- [x] Rate limiting

### **Phase 6: Mobile & Admin (Week 6-7)**
- [x] Mobile endpoints
- [x] Admin dashboard
- [x] Reporting
- [x] Analytics

### **Phase 7: Testing & Deployment (Week 7-8)**
- [x] Integration tests
- [x] Load testing
- [x] Security testing
- [x] Production deployment

---

## 🔐 SECURITY CONSIDERATIONS

### **API Security**
- ✅ API key encryption
- ✅ Rate limiting (10,000 req/day for free tier)
- ✅ Request signing
- ✅ CORS configuration
- ✅ DDoS protection

### **Data Security**
- ✅ End-to-end encryption for sensitive data
- ✅ PCI compliance for payments
- ✅ GDPR compliance for user data
- ✅ Regular security audits
- ✅ Penetration testing

### **Compliance**
- ✅ IATA regulations (air freight)
- ✅ IMO regulations (sea freight)
- ✅ CMR Convention (land freight)
- ✅ Tax regulations (multi-country)
- ✅ Payment compliance (PCI-DSS)

---

## 📊 MONITORING & ANALYTICS

### **Metrics to Track**
- API response time
- Error rates
- Payment success rate
- Carrier performance
- User engagement
- Revenue metrics

### **Tools**
- Prometheus (metrics)
- Grafana (dashboards)
- ELK Stack (logging)
- Sentry (error tracking)
- DataDog (monitoring)

---

## 🚀 SCALABILITY PLAN

### **Horizontal Scaling**
- Load balancer (Nginx/HAProxy)
- Multiple API instances
- Database replication
- Cache distribution

### **Vertical Scaling**
- Increase server resources
- Database optimization
- Query optimization
- Connection pooling

### **Database Optimization**
- Indexing strategy
- Partitioning
- Archiving old data
- Read replicas

---

## 📋 DOCUMENTATION REQUIREMENTS

### **For Developers**
- API documentation (OpenAPI/Swagger)
- SDK documentation (Go, JavaScript, Python)
- Integration guides
- Code examples
- Error handling guide

### **For Partners**
- Carrier integration guide
- Payment gateway guide
- Tax system guide
- Webhook documentation
- Rate limiting policy

### **For Users**
- User guide
- FAQ
- Troubleshooting
- Support contact

---

## ✅ FINAL CHECKLIST

### **Backend**
- [ ] Database schema complete
- [ ] Authentication working
- [ ] All APIs implemented
- [ ] Pricing engine working
- [ ] Tax calculation working
- [ ] Payment gateways integrated
- [ ] Carrier integrations done
- [ ] Third-party APIs ready
- [ ] Mobile endpoints ready
- [ ] Admin dashboard ready
- [ ] Testing complete
- [ ] Documentation complete
- [ ] Deployed to production

### **Frontend**
- [ ] Website integrated with APIs
- [ ] Mobile app integrated with APIs
- [ ] Error handling implemented
- [ ] Loading states working
- [ ] Notifications working
- [ ] Offline sync working

### **Operations**
- [ ] Monitoring set up
- [ ] Alerting configured
- [ ] Backup strategy in place
- [ ] Disaster recovery plan
- [ ] Support team trained

---

**Status**: 📋 **COMPREHENSIVE PLAN COMPLETE**

All requirements covered:
- ✅ Website integration
- ✅ Mobile app integration
- ✅ Third-party APIs
- ✅ Carrier integrations
- ✅ Tax systems
- ✅ Payment gateways
- ✅ Scalability
- ✅ Security
- ✅ Compliance

Ready for implementation!

