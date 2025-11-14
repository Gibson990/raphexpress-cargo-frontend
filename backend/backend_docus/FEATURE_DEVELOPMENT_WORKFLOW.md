# 🔄 FEATURE DEVELOPMENT WORKFLOW

**Date**: November 14, 2025  
**Status**: 📋 STEP-BY-STEP GUIDE  
**Scope**: How to develop each feature from start to finish

---

## 📋 FEATURE DEVELOPMENT CHECKLIST

For **EACH FEATURE**, follow these steps in order:

---

## STEP 1: DEFINE CORE LOGIC & ALGORITHM

### **1.1 Understand Business Requirements**
- What does the feature do?
- What are the inputs?
- What are the outputs?
- What are the edge cases?

### **1.2 Design Algorithm**
```
Example: Pricing Calculation

Input: 
  - Origin, Destination
  - Weight, Dimensions
  - Shipping Mode (Air/Sea/Land)
  - Service Type (Express/Standard/Economy)

Algorithm:
  1. Get base rate for shipping mode
  2. Calculate weight-based charge
  3. Calculate distance-based charge
  4. Apply service modifier
  5. Apply country modifier
  6. Add surcharges (fuel, security, etc.)
  7. Calculate tax
  8. Return total price

Output:
  - Base Price
  - Surcharges
  - Tax
  - Total Price
```

### **1.3 Document Logic**
```go
// Example: Pricing algorithm
func CalculatePrice(shipment *Shipment) (*PriceBreakdown, error) {
    // 1. Validate input
    if err := validateShipment(shipment); err != nil {
        return nil, err
    }
    
    // 2. Get rates
    baseRate := getBaseRate(shipment.ShippingMode)
    
    // 3. Calculate charges
    weightCharge := shipment.Weight * baseRate.PerKg
    distanceCharge := shipment.Distance * baseRate.PerKm
    
    // 4. Apply modifiers
    subtotal := baseRate.Base + weightCharge + distanceCharge
    subtotal *= getServiceModifier(shipment.ServiceType)
    subtotal *= getCountryModifier(shipment.ToCountry)
    
    // 5. Add surcharges
    surcharges := calculateSurcharges(shipment)
    
    // 6. Calculate tax
    tax := calculateTax(subtotal + surcharges)
    
    // 7. Return breakdown
    return &PriceBreakdown{
        BasePrice:   baseRate.Base,
        WeightCharge: weightCharge,
        DistanceCharge: distanceCharge,
        Subtotal:    subtotal,
        Surcharges:  surcharges,
        Tax:         tax,
        Total:       subtotal + surcharges + tax,
    }, nil
}
```

---

## STEP 2: CREATE DATABASE TABLES & ATTRIBUTES

### **2.1 Design Database Schema**
```sql
-- Example: Shipments table
CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    tracking_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Addresses
    from_address TEXT NOT NULL,
    from_city VARCHAR(100) NOT NULL,
    from_country VARCHAR(100) NOT NULL,
    to_address TEXT NOT NULL,
    to_city VARCHAR(100) NOT NULL,
    to_country VARCHAR(100) NOT NULL,
    
    -- Cargo
    description TEXT NOT NULL,
    weight DECIMAL(10, 2) NOT NULL,
    dimensions_length DECIMAL(10, 2),
    dimensions_width DECIMAL(10, 2),
    dimensions_height DECIMAL(10, 2),
    
    -- Shipping
    shipping_mode ENUM('air', 'sea', 'land') NOT NULL,
    service_type ENUM('express', 'standard', 'economy') NOT NULL,
    
    -- Pricing
    base_price DECIMAL(12, 2),
    surcharges DECIMAL(10, 2),
    tax DECIMAL(10, 2),
    total_price DECIMAL(12, 2),
    
    -- Status
    status ENUM('pending', 'picked', 'in_transit', 'delivered') DEFAULT 'pending',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_tracking_number (tracking_number),
    INDEX idx_status (status)
);
```

### **2.2 Create Migration File**
```sql
-- migrations/001_create_shipments_table.sql
BEGIN;

CREATE TABLE shipments (
    -- All columns as above
);

CREATE INDEX idx_shipments_user_id ON shipments(user_id);
CREATE INDEX idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX idx_shipments_status ON shipments(status);

COMMIT;
```

### **2.3 Add Attributes**
- Identify all required fields
- Add optional fields
- Set appropriate data types
- Add indexes for performance

---

## STEP 3: CREATE ENTITIES & DATA MODELS

### **3.1 Define Entity**
```go
// internal/domain/entities/shipment.go
package entities

import "time"

type Shipment struct {
    ID              string
    UserID          string
    TrackingNumber  string
    
    // Addresses
    FromAddress     string
    FromCity        string
    FromCountry     string
    ToAddress       string
    ToCity          string
    ToCountry       string
    
    // Cargo
    Description     string
    Weight          float64
    DimensionsL     float64
    DimensionsW     float64
    DimensionsH     float64
    
    // Shipping
    ShippingMode    string // air, sea, land
    ServiceType     string // express, standard, economy
    
    // Pricing
    BasePrice       float64
    Surcharges      float64
    Tax             float64
    TotalPrice      float64
    
    // Status
    Status          string // pending, picked, in_transit, delivered
    
    // Timestamps
    CreatedAt       time.Time
    UpdatedAt       time.Time
}

// Validation
func (s *Shipment) Validate() []string {
    var errors []string
    
    if s.FromAddress == "" {
        errors = append(errors, "from_address is required")
    }
    if s.ToAddress == "" {
        errors = append(errors, "to_address is required")
    }
    if s.Weight <= 0 {
        errors = append(errors, "weight must be greater than 0")
    }
    
    return errors
}
```

### **3.2 Create DTOs (Data Transfer Objects)**
```go
// internal/application/dto/shipment_dto.go
package dto

type CreateShipmentRequest struct {
    FromAddress  string  `json:"from_address" binding:"required"`
    FromCity     string  `json:"from_city" binding:"required"`
    FromCountry  string  `json:"from_country" binding:"required"`
    ToAddress    string  `json:"to_address" binding:"required"`
    ToCity       string  `json:"to_city" binding:"required"`
    ToCountry    string  `json:"to_country" binding:"required"`
    Description  string  `json:"description" binding:"required"`
    Weight       float64 `json:"weight" binding:"required,gt=0"`
    ShippingMode string  `json:"shipping_mode" binding:"required,oneof=air sea land"`
    ServiceType  string  `json:"service_type" binding:"required,oneof=express standard economy"`
}

type ShipmentResponse struct {
    ID             string  `json:"id"`
    TrackingNumber string  `json:"tracking_number"`
    Status         string  `json:"status"`
    TotalPrice     float64 `json:"total_price"`
    CreatedAt      string  `json:"created_at"`
}
```

---

## STEP 4: CREATE REPOSITORY INTERFACE

### **4.1 Define Repository Interface**
```go
// internal/domain/interfaces/repository.go
package interfaces

import (
    "context"
    "github.com/raphexpress/backend/internal/domain/entities"
)

type ShipmentRepository interface {
    // Create
    Create(ctx context.Context, shipment *entities.Shipment) error
    
    // Read
    GetByID(ctx context.Context, id string) (*entities.Shipment, error)
    GetByTrackingNumber(ctx context.Context, trackingNumber string) (*entities.Shipment, error)
    GetByUserID(ctx context.Context, userID string) ([]*entities.Shipment, error)
    
    // Update
    Update(ctx context.Context, shipment *entities.Shipment) error
    UpdateStatus(ctx context.Context, id string, status string) error
    
    // Delete
    Delete(ctx context.Context, id string) error
    
    // List
    List(ctx context.Context, filters map[string]interface{}) ([]*entities.Shipment, error)
}
```

---

## STEP 5: IMPLEMENT REPOSITORY

### **5.1 Create Repository Implementation**
```go
// internal/infrastructure/repositories/shipment_repository.go
package repositories

import (
    "context"
    "database/sql"
    "fmt"
    "github.com/raphexpress/backend/internal/domain/entities"
    "github.com/raphexpress/backend/pkg/errors"
)

type shipmentRepository struct {
    db *sql.DB
}

// Create
func (r *shipmentRepository) Create(ctx context.Context, shipment *entities.Shipment) error {
    query := `
        INSERT INTO shipments (
            user_id, tracking_number, from_address, from_city, from_country,
            to_address, to_city, to_country, description, weight,
            dimensions_length, dimensions_width, dimensions_height,
            shipping_mode, service_type, base_price, surcharges, tax, total_price, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        RETURNING id, created_at, updated_at
    `
    
    err := r.db.QueryRowContext(ctx, query,
        shipment.UserID, shipment.TrackingNumber, shipment.FromAddress, shipment.FromCity, shipment.FromCountry,
        shipment.ToAddress, shipment.ToCity, shipment.ToCountry, shipment.Description, shipment.Weight,
        shipment.DimensionsL, shipment.DimensionsW, shipment.DimensionsH,
        shipment.ShippingMode, shipment.ServiceType, shipment.BasePrice, shipment.Surcharges, shipment.Tax, shipment.TotalPrice, shipment.Status,
    ).Scan(&shipment.ID, &shipment.CreatedAt, &shipment.UpdatedAt)
    
    if err != nil {
        return fmt.Errorf("failed to create shipment: %w", err)
    }
    
    return nil
}

// Read
func (r *shipmentRepository) GetByID(ctx context.Context, id string) (*entities.Shipment, error) {
    query := `
        SELECT id, user_id, tracking_number, from_address, from_city, from_country,
               to_address, to_city, to_country, description, weight,
               dimensions_length, dimensions_width, dimensions_height,
               shipping_mode, service_type, base_price, surcharges, tax, total_price, status,
               created_at, updated_at
        FROM shipments WHERE id = $1
    `
    
    shipment := &entities.Shipment{}
    err := r.db.QueryRowContext(ctx, query, id).Scan(
        &shipment.ID, &shipment.UserID, &shipment.TrackingNumber, &shipment.FromAddress, &shipment.FromCity, &shipment.FromCountry,
        &shipment.ToAddress, &shipment.ToCity, &shipment.ToCountry, &shipment.Description, &shipment.Weight,
        &shipment.DimensionsL, &shipment.DimensionsW, &shipment.DimensionsH,
        &shipment.ShippingMode, &shipment.ServiceType, &shipment.BasePrice, &shipment.Surcharges, &shipment.Tax, &shipment.TotalPrice, &shipment.Status,
        &shipment.CreatedAt, &shipment.UpdatedAt,
    )
    
    if err == sql.ErrNoRows {
        return nil, errors.NewError("NOT_FOUND", "Shipment not found", 404)
    }
    if err != nil {
        return nil, fmt.Errorf("failed to get shipment: %w", err)
    }
    
    return shipment, nil
}

// Update
func (r *shipmentRepository) Update(ctx context.Context, shipment *entities.Shipment) error {
    query := `
        UPDATE shipments SET
            from_address = $1, from_city = $2, from_country = $3,
            to_address = $4, to_city = $5, to_country = $6,
            description = $7, weight = $8, shipping_mode = $9, service_type = $10,
            base_price = $11, surcharges = $12, tax = $13, total_price = $14, status = $15,
            updated_at = NOW()
        WHERE id = $16
    `
    
    result, err := r.db.ExecContext(ctx, query,
        shipment.FromAddress, shipment.FromCity, shipment.FromCountry,
        shipment.ToAddress, shipment.ToCity, shipment.ToCountry,
        shipment.Description, shipment.Weight, shipment.ShippingMode, shipment.ServiceType,
        shipment.BasePrice, shipment.Surcharges, shipment.Tax, shipment.TotalPrice, shipment.Status,
        shipment.ID,
    )
    
    if err != nil {
        return fmt.Errorf("failed to update shipment: %w", err)
    }
    
    rows, err := result.RowsAffected()
    if err != nil {
        return fmt.Errorf("failed to get rows affected: %w", err)
    }
    
    if rows == 0 {
        return errors.NewError("NOT_FOUND", "Shipment not found", 404)
    }
    
    return nil
}

// Delete
func (r *shipmentRepository) Delete(ctx context.Context, id string) error {
    query := `DELETE FROM shipments WHERE id = $1`
    
    result, err := r.db.ExecContext(ctx, query, id)
    if err != nil {
        return fmt.Errorf("failed to delete shipment: %w", err)
    }
    
    rows, err := result.RowsAffected()
    if err != nil {
        return fmt.Errorf("failed to get rows affected: %w", err)
    }
    
    if rows == 0 {
        return errors.NewError("NOT_FOUND", "Shipment not found", 404)
    }
    
    return nil
}
```

---

## STEP 6: CREATE SERVICE INTERFACE & IMPLEMENTATION

### **6.1 Define Service Interface**
```go
// internal/domain/interfaces/service.go
package interfaces

import (
    "context"
    "github.com/raphexpress/backend/internal/application/dto"
    "github.com/raphexpress/backend/internal/domain/entities"
)

type ShipmentService interface {
    CreateShipment(ctx context.Context, req *dto.CreateShipmentRequest, userID string) (*dto.ShipmentResponse, error)
    GetShipment(ctx context.Context, id string) (*dto.ShipmentResponse, error)
    UpdateShipment(ctx context.Context, id string, req *dto.UpdateShipmentRequest) (*dto.ShipmentResponse, error)
    DeleteShipment(ctx context.Context, id string) error
    ListShipments(ctx context.Context, userID string) ([]*dto.ShipmentResponse, error)
}
```

### **6.2 Implement Service**
```go
// internal/application/services/shipment_service.go
package services

import (
    "context"
    "fmt"
    "github.com/raphexpress/backend/internal/application/dto"
    "github.com/raphexpress/backend/internal/domain/entities"
    "github.com/raphexpress/backend/internal/domain/interfaces"
    "github.com/raphexpress/backend/pkg/errors"
    "github.com/raphexpress/backend/pkg/logger"
    "github.com/google/uuid"
)

type shipmentService struct {
    shipmentRepo interfaces.ShipmentRepository
    pricingService interfaces.PricingService
    logger       logger.Logger
}

func NewShipmentService(
    shipmentRepo interfaces.ShipmentRepository,
    pricingService interfaces.PricingService,
    logger logger.Logger,
) interfaces.ShipmentService {
    return &shipmentService{
        shipmentRepo:   shipmentRepo,
        pricingService: pricingService,
        logger:         logger,
    }
}

func (s *shipmentService) CreateShipment(ctx context.Context, req *dto.CreateShipmentRequest, userID string) (*dto.ShipmentResponse, error) {
    // 1. Validate input
    shipment := &entities.Shipment{
        UserID:       userID,
        FromAddress:  req.FromAddress,
        FromCity:     req.FromCity,
        FromCountry:  req.FromCountry,
        ToAddress:    req.ToAddress,
        ToCity:       req.ToCity,
        ToCountry:    req.ToCountry,
        Description:  req.Description,
        Weight:       req.Weight,
        ShippingMode: req.ShippingMode,
        ServiceType:  req.ServiceType,
        Status:       "pending",
    }
    
    if errs := shipment.Validate(); len(errs) > 0 {
        return nil, errors.NewError("VALIDATION_ERROR", fmt.Sprintf("Validation failed: %v", errs), 400)
    }
    
    // 2. Calculate pricing
    priceBreakdown, err := s.pricingService.CalculatePrice(ctx, shipment)
    if err != nil {
        s.logger.Error("Failed to calculate price", err)
        return nil, errors.NewError("PRICING_ERROR", "Failed to calculate price", 500)
    }
    
    shipment.BasePrice = priceBreakdown.BasePrice
    shipment.Surcharges = priceBreakdown.Surcharges
    shipment.Tax = priceBreakdown.Tax
    shipment.TotalPrice = priceBreakdown.Total
    
    // 3. Generate tracking number
    shipment.TrackingNumber = fmt.Sprintf("RPHX%s", uuid.New().String()[:12])
    
    // 4. Save to database
    err = s.shipmentRepo.Create(ctx, shipment)
    if err != nil {
        s.logger.Error("Failed to create shipment", err)
        return nil, errors.NewError("DB_ERROR", "Failed to create shipment", 500)
    }
    
    s.logger.Info("Shipment created successfully", "shipment_id", shipment.ID)
    
    // 5. Return response
    return &dto.ShipmentResponse{
        ID:             shipment.ID,
        TrackingNumber: shipment.TrackingNumber,
        Status:         shipment.Status,
        TotalPrice:     shipment.TotalPrice,
        CreatedAt:      shipment.CreatedAt.String(),
    }, nil
}

func (s *shipmentService) GetShipment(ctx context.Context, id string) (*dto.ShipmentResponse, error) {
    shipment, err := s.shipmentRepo.GetByID(ctx, id)
    if err != nil {
        return nil, err
    }
    
    return &dto.ShipmentResponse{
        ID:             shipment.ID,
        TrackingNumber: shipment.TrackingNumber,
        Status:         shipment.Status,
        TotalPrice:     shipment.TotalPrice,
        CreatedAt:      shipment.CreatedAt.String(),
    }, nil
}

func (s *shipmentService) DeleteShipment(ctx context.Context, id string) error {
    return s.shipmentRepo.Delete(ctx, id)
}

func (s *shipmentService) ListShipments(ctx context.Context, userID string) ([]*dto.ShipmentResponse, error) {
    shipments, err := s.shipmentRepo.GetByUserID(ctx, userID)
    if err != nil {
        return nil, err
    }
    
    var responses []*dto.ShipmentResponse
    for _, shipment := range shipments {
        responses = append(responses, &dto.ShipmentResponse{
            ID:             shipment.ID,
            TrackingNumber: shipment.TrackingNumber,
            Status:         shipment.Status,
            TotalPrice:     shipment.TotalPrice,
            CreatedAt:      shipment.CreatedAt.String(),
        })
    }
    
    return responses, nil
}
```

---

## STEP 7: CREATE API HANDLERS

### **7.1 Create Handlers**
```go
// internal/interfaces/handlers/shipment_handler.go
package handlers

import (
    "github.com/gin-gonic/gin"
    "github.com/raphexpress/backend/internal/application/dto"
    "github.com/raphexpress/backend/internal/domain/interfaces"
    "github.com/raphexpress/backend/pkg/response"
)

type ShipmentHandler struct {
    shipmentService interfaces.ShipmentService
}

func NewShipmentHandler(shipmentService interfaces.ShipmentService) *ShipmentHandler {
    return &ShipmentHandler{shipmentService: shipmentService}
}

// POST /api/v1/shipments
func (h *ShipmentHandler) CreateShipment(c *gin.Context) {
    var req dto.CreateShipmentRequest
    
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, response.Error("VALIDATION_ERROR", err.Error()))
        return
    }
    
    userID := c.GetString("user_id")
    
    shipmentResp, err := h.shipmentService.CreateShipment(c.Request.Context(), &req, userID)
    if err != nil {
        appErr := err.(*errors.AppError)
        c.JSON(appErr.Status, response.Error(appErr.Code, appErr.Message))
        return
    }
    
    c.JSON(200, response.Success(shipmentResp))
}

// GET /api/v1/shipments/:id
func (h *ShipmentHandler) GetShipment(c *gin.Context) {
    id := c.Param("id")
    
    shipmentResp, err := h.shipmentService.GetShipment(c.Request.Context(), id)
    if err != nil {
        c.JSON(500, response.Error("ERROR", err.Error()))
        return
    }
    
    c.JSON(200, response.Success(shipmentResp))
}

// GET /api/v1/shipments
func (h *ShipmentHandler) ListShipments(c *gin.Context) {
    userID := c.GetString("user_id")
    
    shipments, err := h.shipmentService.ListShipments(c.Request.Context(), userID)
    if err != nil {
        c.JSON(500, response.Error("ERROR", err.Error()))
        return
    }
    
    c.JSON(200, response.Success(shipments))
}

// DELETE /api/v1/shipments/:id
func (h *ShipmentHandler) DeleteShipment(c *gin.Context) {
    id := c.Param("id")
    
    err := h.shipmentService.DeleteShipment(c.Request.Context(), id)
    if err != nil {
        c.JSON(500, response.Error("ERROR", err.Error()))
        return
    }
    
    c.JSON(200, response.Success(map[string]string{"message": "Shipment deleted"}))
}
```

---

## STEP 8: WRITE UNIT TESTS

```go
// tests/unit/shipment_service_test.go
package unit

import (
    "context"
    "testing"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/mock"
    "github.com/raphexpress/backend/internal/application/dto"
    "github.com/raphexpress/backend/internal/application/services"
    "github.com/raphexpress/backend/internal/domain/entities"
)

type MockShipmentRepository struct {
    mock.Mock
}

func (m *MockShipmentRepository) Create(ctx context.Context, shipment *entities.Shipment) error {
    args := m.Called(ctx, shipment)
    return args.Error(0)
}

func TestCreateShipment(t *testing.T) {
    mockRepo := new(MockShipmentRepository)
    mockRepo.On("Create", mock.Anything, mock.Anything).Return(nil)
    
    service := services.NewShipmentService(mockRepo, nil, nil)
    
    req := &dto.CreateShipmentRequest{
        FromAddress:  "123 Main St",
        FromCity:     "New York",
        FromCountry:  "US",
        ToAddress:    "456 Oak Ave",
        ToCity:       "Dubai",
        ToCountry:    "AE",
        Description:  "Electronics",
        Weight:       50,
        ShippingMode: "air",
        ServiceType:  "express",
    }
    
    resp, err := service.CreateShipment(context.Background(), req, "user123")
    
    assert.NoError(t, err)
    assert.NotNil(t, resp)
    assert.NotEmpty(t, resp.TrackingNumber)
}
```

---

## STEP 9: MOCK API TESTING

```bash
# Test endpoint
curl -X POST http://localhost:8080/api/v1/shipments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{
    "from_address": "123 Main St",
    "from_city": "New York",
    "from_country": "US",
    "to_address": "456 Oak Ave",
    "to_city": "Dubai",
    "to_country": "AE",
    "description": "Electronics",
    "weight": 50,
    "shipping_mode": "air",
    "service_type": "express"
  }'

# Expected response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "tracking_number": "RPHX123456789",
    "status": "pending",
    "total_price": 456.25,
    "created_at": "2025-11-14T10:00:00Z"
  }
}
```

---

## STEP 10: FRONTEND INTEGRATION

### **10.1 Web App (React)**
```typescript
// src/services/shipmentService.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createShipment = async (data: CreateShipmentRequest) => {
    const response = await axios.post(`${API_URL}/api/v1/shipments`, data, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    return response.data;
};

export const getShipment = async (id: string) => {
    const response = await axios.get(`${API_URL}/api/v1/shipments/${id}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    return response.data;
};

export const listShipments = async () => {
    const response = await axios.get(`${API_URL}/api/v1/shipments`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    return response.data;
};
```

### **10.2 Mobile App (Flutter)**
```dart
// lib/services/shipment_service.dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ShipmentService {
  final String apiUrl = 'https://api.raphexpress.com';
  
  Future<ShipmentResponse> createShipment(CreateShipmentRequest request) async {
    final response = await http.post(
      Uri.parse('$apiUrl/api/v1/shipments'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${getToken()}',
      },
      body: jsonEncode(request.toJson()),
    );
    
    if (response.statusCode == 200) {
      return ShipmentResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to create shipment');
    }
  }
  
  Future<ShipmentResponse> getShipment(String id) async {
    final response = await http.get(
      Uri.parse('$apiUrl/api/v1/shipments/$id'),
      headers: {
        'Authorization': 'Bearer ${getToken()}',
      },
    );
    
    if (response.statusCode == 200) {
      return ShipmentResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to get shipment');
    }
  }
}
```

### **10.3 Clear Static Data**
- Remove hardcoded mock shipments
- Remove mock pricing
- Remove mock tracking data
- Use API responses only

---

## STEP 11: USER TESTING & APPROVAL

### **11.1 Test Checklist**
- [ ] Create shipment with valid data
- [ ] Create shipment with invalid data (should fail)
- [ ] Get shipment by ID
- [ ] List all shipments
- [ ] Update shipment
- [ ] Delete shipment
- [ ] Verify pricing calculation
- [ ] Verify tracking number generation
- [ ] Test error scenarios
- [ ] Test edge cases

### **11.2 User Approval**
- [ ] User tests complete flow
- [ ] User verifies data accuracy
- [ ] User approves feature
- [ ] Document any issues
- [ ] Move to next feature

---

## FEATURE COMPLETION CHECKLIST

For each feature, ensure:
- [x] Core logic defined
- [x] Algorithm documented
- [x] Database tables created
- [x] Entities defined
- [x] DTOs created
- [x] Repository interface created
- [x] Repository implemented
- [x] Service interface created
- [x] Service implemented
- [x] Handlers created
- [x] Unit tests written
- [x] Mock API tested
- [x] Response validation passing
- [x] Frontend integrated (Web)
- [x] Frontend integrated (Mobile)
- [x] Static data cleared
- [x] User testing passed
- [x] User approval received

---

**Status**: 📋 **FEATURE DEVELOPMENT WORKFLOW READY**

Use this workflow for each feature to ensure consistency and quality.

