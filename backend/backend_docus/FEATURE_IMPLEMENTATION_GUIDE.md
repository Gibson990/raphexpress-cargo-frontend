# 🎯 Feature Implementation Guide - Step by Step

**Date**: November 14, 2025  
**Approach**: Feature-by-feature, website features first (more complex)

---

## 📋 FEATURE PRIORITY ORDER

### **Website Features (React Frontend)**
1. ✅ Quick Quote Widget
2. ✅ Service Comparison
3. ✅ Shipping Calculator
4. ✅ Create Shipment (5-step)
5. ✅ Payment Processing
6. ✅ Track Shipment
7. ✅ My Shipments
8. ✅ Return Order
9. ✅ Refund Request
10. ✅ Print Label
11. ✅ Schedule Pickup
12. ✅ Delivery Instructions
13. ✅ Address Book
14. ✅ Availability Calendar

### **Backend Implementation Order**
1. Authentication (Firebase)
2. Quotes & Calculator
3. Shipments (Create/List/Get)
4. Payments (Stripe/Razorpay)
5. Tracking (Real-time)
6. Returns & Refunds
7. Labels (PDF generation)
8. Addresses
9. Notifications (Email/SMS)
10. Admin Dashboard

---

## 🔐 FEATURE 1: AUTHENTICATION (Firebase)

### **Frontend Already Has**
- Login page with email/password
- Signup page (Individual/Business/Developer)
- Social login buttons
- Form validation
- Error handling

### **Backend Needs**

**Step 1: Firebase Admin SDK Setup**
```go
// config/firebase.go
import "firebase.google.com/go/v4/auth"

func InitFirebase() (*auth.Client, error) {
    // Initialize from service account JSON
}
```

**Step 2: Auth Middleware**
```go
// middleware/auth.go
func AuthMiddleware(authClient *auth.Client) gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        claims, err := authClient.VerifyIDToken(c, token)
        if err != nil {
            c.JSON(401, gin.H{"error": "unauthorized"})
            c.Abort()
            return
        }
        c.Set("uid", claims.UID)
        c.Next()
    }
}
```

**Step 3: Auth Endpoints**
```go
// POST /api/v1/auth/signup
// POST /api/v1/auth/login
// POST /api/v1/auth/logout
// GET  /api/v1/auth/me
```

**Step 4: User Model**
```go
type User struct {
    ID            uuid.UUID
    FirebaseUID   string
    Email         string
    Name          string
    Phone         string
    AccountType   string // individual, business, developer
    CompanyName   string
    Avatar        string
    CreatedAt     time.Time
}
```

**Testing**:
- Test signup with Firebase
- Test login with Firebase
- Test token verification
- Test protected endpoints

---

## 💰 FEATURE 2: QUOTES & CALCULATOR

### **Frontend Already Has**
- Quick Quote widget (collapsible)
- Shipping Calculator page
- Price breakdown display
- Tax calculation
- Service type selection

### **Backend Needs**

**Step 1: Quote Model**
```go
type Quote struct {
    ID              uuid.UUID
    UserID          uuid.UUID
    FromCity        string
    ToCity          string
    FromCountry     string
    ToCountry       string
    Weight          float64
    GoodsType       string
    BasePrice       float64
    TaxAmount       float64
    TotalPrice      float64
    CustomsClear    bool
    Insurance       bool
    Status          string // active, expired, converted
    CreatedAt       time.Time
    ExpiresAt       time.Time
}
```

**Step 2: Price Calculator Service**
```go
// Calculate base price based on:
// - Origin/Destination
// - Weight/Dimensions
// - Shipping mode (Air/Sea/Land)
// - Service type (Express/Standard/Economy)

func CalculatePrice(req QuoteRequest) (float64, error) {
    basePrice := 0.0
    
    // Air: $8.5/kg
    // Sea: $1500 (20ft), $2500 (40ft)
    // Land: $0.50/CBM
    
    return basePrice, nil
}
```

**Step 3: Tax Calculator**
```go
// Tax rates by country:
// UAE: 5% VAT
// India: 18% GST
// USA: 7% Sales Tax
// UK: 20% VAT
// Singapore: 8% GST

func CalculateTax(country string, amount float64) float64 {
    rates := map[string]float64{
        "AE": 0.05,
        "IN": 0.18,
        "US": 0.07,
        "GB": 0.20,
        "SG": 0.08,
    }
    return amount * rates[country]
}
```

**Step 4: Endpoints**
```
POST   /api/v1/quotes              # Create quote
GET    /api/v1/quotes/:id          # Get quote
GET    /api/v1/quotes              # List quotes
POST   /api/v1/quotes/:id/convert  # Convert to shipment
```

**Testing**:
- Test price calculation for each mode
- Test tax calculation for each country
- Test quote expiration
- Test quote conversion to shipment

---

## 📦 FEATURE 3: SHIPMENTS

### **Frontend Already Has**
- Create Shipment 5-step wizard
- My Shipments list with filters
- Shipment details display
- Status badges
- Download label button

### **Backend Needs**

**Step 1: Shipment Model**
```go
type Shipment struct {
    ID              uuid.UUID
    UserID          uuid.UUID
    TrackingNumber  string
    OrderType       string // local, international
    ShippingMode    string // air, sea, land
    ServiceType     string // express, standard, economy
    
    // From Address
    FromName        string
    FromAddress     string
    FromCity        string
    FromCountry     string
    
    // To Address
    ToName          string
    ToAddress       string
    ToCity          string
    ToCountry       string
    
    // Package
    GoodsType       string
    Weight          float64
    Length          float64
    Width           float64
    Height          float64
    DeclaredValue   float64
    
    // Options
    CustomsClear    bool
    Insurance       bool
    
    // Pricing
    BasePrice       float64
    TaxAmount       float64
    TotalPrice      float64
    
    // Status
    Status          string // pending, picked, in_transit, etc
    PickupDate      time.Time
    EstimatedDelivery time.Time
    CreatedAt       time.Time
}
```

**Step 2: Shipment Endpoints**
```go
// POST /api/v1/shipments
// - Validate all fields
// - Generate tracking number (RPHX + random)
// - Calculate price
// - Create shipment
// - Return shipment with tracking number

// GET /api/v1/shipments
// - List user shipments
// - Support filtering by status
// - Support search by tracking ID

// GET /api/v1/shipments/:id
// - Return full shipment details

// PUT /api/v1/shipments/:id
// - Update shipment (before pickup)

// DELETE /api/v1/shipments/:id
// - Cancel shipment
```

**Step 3: Tracking Number Generation**
```go
func GenerateTrackingNumber() string {
    // Format: RPHX + 12 random alphanumeric
    // Example: RPHX123456789ABC
}
```

**Step 4: Validation**
```go
func ValidateShipment(s *Shipment) error {
    // Validate required fields
    // Validate address format
    // Validate weight/dimensions
    // Validate dates
    // Return errors
}
```

**Testing**:
- Test shipment creation
- Test tracking number generation
- Test shipment listing
- Test shipment filtering
- Test shipment updates
- Test shipment cancellation

---

## 💳 FEATURE 4: PAYMENTS

### **Frontend Already Has**
- Payment method selection (Card, Bank, M-Pesa)
- Order summary display
- Payment processing UI
- Success/error handling

### **Backend Needs**

**Step 1: Payment Model**
```go
type Payment struct {
    ID                  uuid.UUID
    ShipmentID          uuid.UUID
    UserID              uuid.UUID
    Amount              float64
    Currency            string
    PaymentMethod       string // card, bank_transfer, wallet, mpesa
    Provider            string // stripe, razorpay, paypal
    ProviderTxnID       string
    Status              string // pending, processing, completed, failed
    CreatedAt           time.Time
}
```

**Step 2: Stripe Integration**
```go
// Initialize Stripe
import "github.com/stripe/stripe-go/v72"

func InitStripe(apiKey string) {
    stripe.Key = apiKey
}

// Create payment
func CreateStripePayment(amount int64, token string) (string, error) {
    params := &charge.NewParams{
        Amount:      stripe.Int64(amount),
        Currency:    stripe.String(string(currency.USD)),
        Source:      &source.SourceParams{Token: stripe.String(token)},
    }
    ch, _ := charge.New(params)
    return ch.ID, nil
}
```

**Step 3: Razorpay Integration**
```go
// Initialize Razorpay
import "github.com/razorpay/razorpay-go"

// Create payment order
func CreateRazorpayOrder(amount int64) (string, error) {
    // Create order in Razorpay
    // Return order ID
}

// Verify payment
func VerifyRazorpayPayment(orderId, paymentId, signature string) bool {
    // Verify signature
    // Return true/false
}
```

**Step 4: Payment Endpoints**
```
POST   /api/v1/payments              # Create payment
GET    /api/v1/payments/:id          # Get payment
POST   /api/v1/payments/:id/verify   # Verify payment
POST   /api/v1/payments/:id/refund   # Refund payment
```

**Testing**:
- Test Stripe payment creation
- Test Razorpay payment creation
- Test payment verification
- Test payment refund
- Test error handling

---

## 📍 FEATURE 5: TRACKING

### **Frontend Already Has**
- Track Shipment page
- Tracking timeline display
- Status badges
- Location display
- Real-time updates (placeholder)

### **Backend Needs**

**Step 1: Tracking Event Model**
```go
type TrackingEvent struct {
    ID          uuid.UUID
    ShipmentID  uuid.UUID
    EventType   string // picked, in_transit, customs, out_for_delivery, delivered
    Status      string
    Description string
    Location    string
    Latitude    float64
    Longitude   float64
    EventTime   time.Time
    CreatedAt   time.Time
}
```

**Step 2: Tracking Endpoints**
```go
// GET /api/v1/tracking/:trackingId
// - Public endpoint (no auth)
// - Return shipment + all tracking events
// - Return timeline

// GET /api/v1/shipments/:id/timeline
// - Authenticated endpoint
// - Return tracking events for shipment

// POST /api/v1/tracking/events (internal)
// - Create tracking event
// - Update shipment status
// - Send notifications
```

**Step 3: Real-time Updates (WebSocket)**
```go
// Optional: WebSocket for real-time tracking
// ws://api.raphexpress.com/ws/tracking/:trackingId
```

**Testing**:
- Test public tracking
- Test timeline retrieval
- Test tracking event creation
- Test status updates
- Test real-time updates

---

## 🔄 FEATURE 6: RETURNS & REFUNDS

### **Frontend Already Has**
- Return Order 5-step wizard
- Refund Request 5-step wizard
- File upload for evidence
- Status tracking

### **Backend Needs**

**Step 1: Return Model**
```go
type Return struct {
    ID              uuid.UUID
    ShipmentID      uuid.UUID
    UserID          uuid.UUID
    Reason          string
    Items           string
    PickupAddress   string
    PickupDate      time.Time
    PickupTimeSlot  string
    ReturnMethod    string // ground, express
    Status          string // pending, approved, shipped, received
    CreatedAt       time.Time
}
```

**Step 2: Refund Model**
```go
type Refund struct {
    ID              uuid.UUID
    ShipmentID      uuid.UUID
    UserID          uuid.UUID
    Reason          string
    Amount          float64
    EvidenceFiles   []string
    RefundMethod    string // original, wallet, bank
    BankAccount     string
    Status          string // pending, approved, processing, completed
    CreatedAt       time.Time
}
```

**Step 3: Endpoints**
```
POST   /api/v1/returns              # Create return
GET    /api/v1/returns/:id          # Get return
POST   /api/v1/returns/:id/approve  # Approve return

POST   /api/v1/refunds              # Create refund
GET    /api/v1/refunds/:id          # Get refund
POST   /api/v1/refunds/:id/approve  # Approve refund
POST   /api/v1/refunds/:id/process  # Process refund
```

**Step 4: File Upload**
```go
// Handle file upload for evidence
// Store in S3
// Return file URL
```

**Testing**:
- Test return creation
- Test return approval workflow
- Test refund creation
- Test refund processing
- Test file upload

---

## 🏷️ FEATURE 7: LABELS

### **Frontend Already Has**
- Print Label button
- PDF generation (jsPDF)
- Professional label design
- Download functionality

### **Backend Needs**

**Step 1: Label Model**
```go
type Label struct {
    ID              uuid.UUID
    ShipmentID      uuid.UUID
    TrackingNumber  string
    PDFURL          string
    BarcodeURL      string
    QRCodeURL       string
    IsPrinted       bool
    PrintCount      int
    CreatedAt       time.Time
}
```

**Step 2: PDF Generation**
```go
// Use go-pdf library
// Generate professional label
// Include tracking number
// Include barcode
// Include QR code
// Store in S3
```

**Step 3: Barcode & QR Code**
```go
// Generate barcode from tracking number
// Generate QR code with tracking URL
// Embed in PDF
```

**Step 4: Endpoints**
```
GET    /api/v1/labels/:shipmentId           # Get label
POST   /api/v1/labels/:shipmentId/generate  # Generate label
GET    /api/v1/labels/:shipmentId/download  # Download PDF
```

**Testing**:
- Test label generation
- Test PDF creation
- Test barcode generation
- Test QR code generation
- Test file download

---

## 📧 FEATURE 8: NOTIFICATIONS

### **Frontend Already Has**
- Toast notifications
- Error messages
- Success messages

### **Backend Needs**

**Step 1: Email Service (SendGrid)**
```go
import "github.com/sendgrid/sendgrid-go"

func SendEmail(to, subject, body string) error {
    // Send email via SendGrid
}
```

**Step 2: SMS Service (Twilio)**
```go
import "github.com/twilio/twilio-go"

func SendSMS(phone, message string) error {
    // Send SMS via Twilio
}
```

**Step 3: Email Templates**
```
- Shipment created
- Payment received
- Shipment picked up
- In transit
- Out for delivery
- Delivered
- Return approved
- Refund processed
```

**Step 4: Notification Triggers**
```
- Shipment created → Email + SMS
- Payment received → Email
- Status update → Email + SMS
- Return approved → Email
- Refund processed → Email
```

**Testing**:
- Test email sending
- Test SMS sending
- Test template rendering
- Test notification triggers

---

## 🎯 IMPLEMENTATION CHECKLIST

### **Week 1**
- [ ] Go project setup
- [ ] Database schema
- [ ] Firebase auth
- [ ] User model

### **Week 2**
- [ ] Quotes & calculator
- [ ] Shipments CRUD
- [ ] Payment integration

### **Week 3**
- [ ] Tracking system
- [ ] Returns & refunds
- [ ] Label generation

### **Week 4**
- [ ] Notifications
- [ ] Testing
- [ ] Deployment

---

**Next**: Start with Feature 1 (Authentication)

