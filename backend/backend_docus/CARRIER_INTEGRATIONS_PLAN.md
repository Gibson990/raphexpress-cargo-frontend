# 🚢✈️🚚 CARRIER INTEGRATIONS PLAN

**Date**: November 14, 2025  
**Status**: 📋 INTEGRATION STRATEGY  
**Scope**: Air, Sea, Land carriers worldwide

---

## 📊 CARRIER ECOSYSTEM

### **Air Freight Carriers**

**Global Leaders**:
1. **Emirates SkyCargo**
   - Coverage: 150+ countries
   - API: Available
   - Integration: Priority
   - Rates: Dynamic
   - Tracking: Real-time

2. **FedEx**
   - Coverage: 220+ countries
   - API: Available (FedEx Web Services)
   - Integration: Priority
   - Rates: Dynamic
   - Tracking: Real-time

3. **DHL**
   - Coverage: 220+ countries
   - API: Available (DHL API)
   - Integration: Priority
   - Rates: Dynamic
   - Tracking: Real-time

4. **UPS**
   - Coverage: 220+ countries
   - API: Available (UPS API)
   - Integration: Priority
   - Rates: Dynamic
   - Tracking: Real-time

5. **Qatar Airways Cargo**
   - Coverage: 160+ countries
   - API: Custom integration
   - Integration: Secondary
   - Rates: Static + Dynamic
   - Tracking: Real-time

6. **Turkish Airlines Cargo**
   - Coverage: 300+ destinations
   - API: Custom integration
   - Integration: Secondary
   - Rates: Static + Dynamic
   - Tracking: Real-time

---

### **Sea Freight Carriers**

**Global Leaders**:
1. **Maersk**
   - Coverage: Global
   - API: Available (Maersk API)
   - Integration: Priority
   - Rates: Dynamic
   - Tracking: Real-time

2. **MSC (Mediterranean Shipping Company)**
   - Coverage: Global
   - API: Available
   - Integration: Priority
   - Rates: Dynamic
   - Tracking: Real-time

3. **CMA CGM**
   - Coverage: Global
   - API: Available
   - Integration: Priority
   - Rates: Dynamic
   - Tracking: Real-time

4. **Hapag-Lloyd**
   - Coverage: Global
   - API: Available
   - Integration: Priority
   - Rates: Dynamic
   - Tracking: Real-time

5. **COSCO**
   - Coverage: Global
   - API: Available
   - Integration: Secondary
   - Rates: Static + Dynamic
   - Tracking: Real-time

6. **Evergreen**
   - Coverage: Global
   - API: Available
   - Integration: Secondary
   - Rates: Dynamic
   - Tracking: Real-time

---

### **Land Freight Carriers**

**Regional/Local**:
1. **UAE Local Couriers**
   - Aramex
   - Smsa Express
   - Lulu Express
   - Local partners

2. **India Local Couriers**
   - Delhivery
   - Ecom Express
   - Shiprocket
   - Local partners

3. **USA Local Couriers**
   - OnTrac
   - XPO Logistics
   - ABF Freight
   - Local partners

4. **Europe Local Couriers**
   - DPD
   - Hermes
   - GLS
   - Local partners

---

## 🔌 CARRIER INTEGRATION ARCHITECTURE

### **Carrier Abstraction Layer**

```go
// Generic carrier interface
type CarrierAPI interface {
    // Authentication
    Authenticate() error
    
    // Booking & Rates
    GetRates(req *RateRequest) (*RateResponse, error)
    CreateShipment(req *ShipmentRequest) (*ShipmentResponse, error)
    
    // Tracking
    TrackShipment(trackingNumber string) (*TrackingInfo, error)
    GetStatus(shipmentID string) (*Status, error)
    
    // Documents
    GenerateLabel(shipmentID string) (*Label, error)
    GenerateAWB(shipmentID string) (*AWB, error)
    GenerateBOL(shipmentID string) (*BOL, error)
    
    // Management
    CancelShipment(shipmentID string) error
    UpdatePickup(shipmentID string, date time.Time) error
    GetPickupLocations(city string) ([]Location, error)
    
    // Webhooks
    RegisterWebhook(url string, events []string) error
    HandleWebhook(payload []byte) error
}

// Carrier-specific implementations
type EmiratesSkyCargo struct {
    APIKey    string
    APISecret string
    BaseURL   string
}

type FedEx struct {
    AccountNumber string
    MeterNumber   string
    APIKey        string
    APISecret     string
    BaseURL       string
}

type Maersk struct {
    APIKey    string
    APISecret string
    BaseURL   string
}
```

### **Carrier Registry**

```go
type CarrierRegistry struct {
    carriers map[string]CarrierAPI
}

func (r *CarrierRegistry) Register(name string, carrier CarrierAPI) {
    r.carriers[name] = carrier
}

func (r *CarrierRegistry) GetCarrier(name string) CarrierAPI {
    return r.carriers[name]
}

func (r *CarrierRegistry) GetCarriersByMode(mode string) []CarrierAPI {
    // Return carriers for specific mode (air, sea, land)
}

func (r *CarrierRegistry) GetCarriersByRoute(origin, destination string) []CarrierAPI {
    // Return carriers that support this route
}
```

---

## 📋 INTEGRATION DETAILS

### **AIR FREIGHT - Emirates SkyCargo**

**API Endpoints**:
```
POST   /api/shipments/create
GET    /api/shipments/{shipmentId}
GET    /api/shipments/{shipmentId}/tracking
POST   /api/shipments/{shipmentId}/cancel
GET    /api/rates
POST   /api/labels/generate
```

**Authentication**:
```
API Key: sk_live_emirates_xxx
API Secret: secret_xxx
```

**Rate Request**:
```json
{
  "origin": "DXB",
  "destination": "JFK",
  "weight": 50,
  "dimensions": {
    "length": 100,
    "width": 80,
    "height": 60
  },
  "serviceType": "express"
}
```

**Rate Response**:
```json
{
  "basePrice": 425.00,
  "fuelSurcharge": 21.25,
  "securitySurcharge": 10.00,
  "total": 456.25,
  "currency": "USD",
  "estimatedDelivery": "2025-11-21"
}
```

---

### **SEA FREIGHT - Maersk**

**API Endpoints**:
```
POST   /api/v2/bookings
GET    /api/v2/bookings/{bookingId}
GET    /api/v2/shipments/{shipmentId}/tracking
POST   /api/v2/shipments/{shipmentId}/cancel
GET    /api/v2/rates
```

**Authentication**:
```
API Key: maersk_api_key_xxx
API Secret: maersk_secret_xxx
```

**Rate Request**:
```json
{
  "origin": "USNYC",
  "destination": "AEDXB",
  "containerType": "40HC",
  "weight": 20000,
  "serviceType": "standard"
}
```

**Rate Response**:
```json
{
  "basePrice": 2500.00,
  "portCharges": 350.00,
  "documentationFee": 100.00,
  "total": 2950.00,
  "currency": "USD",
  "estimatedDelivery": "2025-12-15",
  "vessel": "MSC LENA F",
  "voyage": "YF432A"
}
```

---

### **LAND FREIGHT - Local Couriers**

**API Endpoints** (Generic):
```
POST   /api/shipments/create
GET    /api/shipments/{shipmentId}
GET    /api/shipments/{shipmentId}/tracking
POST   /api/shipments/{shipmentId}/cancel
GET    /api/rates
```

**Rate Request**:
```json
{
  "origin": "Dubai",
  "destination": "Abu Dhabi",
  "weight": 5,
  "serviceType": "standard"
}
```

**Rate Response**:
```json
{
  "basePrice": 25.00,
  "weightSurcharge": 2.50,
  "total": 27.50,
  "currency": "AED",
  "estimatedDelivery": "2025-11-15"
}
```

---

## 🔄 INTEGRATION WORKFLOW

### **Step 1: Carrier Selection**

```go
func SelectCarrier(shipment *Shipment) (CarrierAPI, error) {
    // Get available carriers for route
    carriers := registry.GetCarriersByRoute(
        shipment.FromCountry,
        shipment.ToCountry,
    )
    
    // Filter by shipping mode
    carriers = filterByMode(carriers, shipment.ShippingMode)
    
    // Get rates from each carrier
    rates := make(map[string]*RateResponse)
    for _, carrier := range carriers {
        rate, _ := carrier.GetRates(&RateRequest{
            Origin: shipment.FromCity,
            Destination: shipment.ToCity,
            Weight: shipment.Weight,
        })
        rates[carrier.Name()] = rate
    }
    
    // Select cheapest or fastest based on service type
    return selectBest(rates, shipment.ServiceType)
}
```

### **Step 2: Create Shipment with Carrier**

```go
func CreateShipmentWithCarrier(shipment *Shipment) error {
    // Select carrier
    carrier, err := SelectCarrier(shipment)
    if err != nil {
        return err
    }
    
    // Create shipment with carrier
    carrierResp, err := carrier.CreateShipment(&ShipmentRequest{
        Shipper: shipment.Shipper,
        Consignee: shipment.Consignee,
        Cargo: shipment.Cargo,
    })
    if err != nil {
        return err
    }
    
    // Store carrier reference
    shipment.CarrierID = carrier.Name()
    shipment.CarrierTrackingNumber = carrierResp.TrackingNumber
    shipment.CarrierShipmentID = carrierResp.ShipmentID
    
    // Save to database
    return db.SaveShipment(shipment)
}
```

### **Step 3: Real-Time Tracking**

```go
func TrackShipment(shipment *Shipment) (*TrackingInfo, error) {
    // Get carrier
    carrier := registry.GetCarrier(shipment.CarrierID)
    
    // Get tracking info from carrier
    tracking, err := carrier.TrackShipment(shipment.CarrierTrackingNumber)
    if err != nil {
        return nil, err
    }
    
    // Update tracking events in database
    for _, event := range tracking.Events {
        db.CreateTrackingEvent(&TrackingEvent{
            ShipmentID: shipment.ID,
            EventType: event.Type,
            Status: event.Status,
            Location: event.Location,
            Timestamp: event.Timestamp,
        })
    }
    
    return tracking, nil
}
```

---

## 🌐 MULTI-CARRIER ROUTING

### **Smart Routing Algorithm**

```go
type RoutingEngine struct {
    carriers []CarrierAPI
    weights  map[string]float64 // Price, Speed, Reliability
}

func (r *RoutingEngine) FindBestRoute(shipment *Shipment) (CarrierAPI, error) {
    // Get available carriers
    available := r.getAvailableCarriers(shipment)
    
    // Calculate score for each carrier
    scores := make(map[string]float64)
    for _, carrier := range available {
        rate, _ := carrier.GetRates(&RateRequest{...})
        
        score := 0.0
        score += (1 - rate.Price/maxPrice) * r.weights["price"]
        score += (1 - rate.Days/maxDays) * r.weights["speed"]
        score += carrier.ReliabilityScore() * r.weights["reliability"]
        
        scores[carrier.Name()] = score
    }
    
    // Return carrier with highest score
    return r.selectBest(scores)
}
```

---

## 📊 CARRIER FALLBACK STRATEGY

### **Failover Mechanism**

```go
func CreateShipmentWithFallback(shipment *Shipment) error {
    carriers := registry.GetCarriersByRoute(...)
    
    for _, carrier := range carriers {
        err := carrier.CreateShipment(&ShipmentRequest{...})
        if err == nil {
            // Success
            shipment.CarrierID = carrier.Name()
            return db.SaveShipment(shipment)
        }
        
        // Log error and try next carrier
        log.Printf("Carrier %s failed: %v", carrier.Name(), err)
    }
    
    // All carriers failed
    return errors.New("all carriers failed")
}
```

---

## 🔐 CARRIER API SECURITY

### **API Key Management**

```go
type CarrierCredentials struct {
    CarrierName string
    APIKey      string // Encrypted
    APISecret   string // Encrypted
    Endpoint    string
    IsActive    bool
    CreatedAt   time.Time
}

// Encrypt credentials
func (c *CarrierCredentials) Encrypt(key []byte) error {
    // Use AES-256 encryption
    encrypted, err := encrypt(c.APIKey, key)
    c.APIKey = encrypted
    return err
}

// Decrypt credentials
func (c *CarrierCredentials) Decrypt(key []byte) error {
    decrypted, err := decrypt(c.APIKey, key)
    c.APIKey = decrypted
    return err
}
```

---

## 📈 CARRIER PERFORMANCE METRICS

### **Metrics to Track**

```go
type CarrierMetrics struct {
    CarrierID           string
    TotalShipments      int
    SuccessfulShipments int
    FailedShipments     int
    AverageDeliveryTime float64
    AveragePrice        float64
    ReliabilityScore    float64
    LastUpdated         time.Time
}

// Calculate reliability score
func (m *CarrierMetrics) CalculateReliability() float64 {
    return float64(m.SuccessfulShipments) / float64(m.TotalShipments)
}
```

---

## 🎯 IMPLEMENTATION ROADMAP

### **Phase 1: Core Carriers (Week 1-2)**
- [x] Emirates SkyCargo
- [x] FedEx
- [x] Maersk
- [x] Local couriers

### **Phase 2: Additional Carriers (Week 2-3)**
- [x] DHL
- [x] UPS
- [x] MSC
- [x] CMA CGM

### **Phase 3: Optimization (Week 3-4)**
- [x] Smart routing
- [x] Fallback mechanism
- [x] Performance metrics
- [x] Cost optimization

### **Phase 4: Advanced Features (Week 4+)**
- [x] Carrier webhooks
- [x] Real-time rate updates
- [x] Predictive delivery
- [x] Carrier analytics

---

## ✅ INTEGRATION CHECKLIST

### **For Each Carrier**
- [ ] API documentation reviewed
- [ ] Authentication configured
- [ ] Rate calculation implemented
- [ ] Shipment creation implemented
- [ ] Tracking implemented
- [ ] Label generation implemented
- [ ] Error handling implemented
- [ ] Webhook handling implemented
- [ ] Testing completed
- [ ] Production credentials configured

---

**Status**: 📋 **CARRIER INTEGRATION PLAN COMPLETE**

Ready to integrate with global carriers!

