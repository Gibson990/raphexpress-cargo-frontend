# 📋 Shipping Modes - Complete Field Requirements Analysis

**Date**: November 14, 2025  
**Status**: ✅ RESEARCH COMPLETE  
**Sources**: JSON Cargo API, IATA Regulations, International Standards

---

## 🎯 RESEARCH SUMMARY

Analyzed three major shipping modes:
1. **Air Freight** - IATA Air Waybill (AWB) standards
2. **Sea Freight** - Bill of Lading (B/L) standards
3. **Land Freight** - CMR Consignment Note standards

---

## ✈️ AIR FREIGHT - IATA AIR WAYBILL (AWB) FIELDS

### **Required Fields (IATA Standard)**

**Shipper Information**:
- [x] Shipper name (full legal name)
- [x] Shipper address (street, city, state, country, zip)
- [x] Shipper phone number
- [x] Shipper email
- [x] Shipper account number (optional)

**Consignee Information**:
- [x] Consignee name (full legal name)
- [x] Consignee address (street, city, state, country, zip)
- [x] Consignee phone number
- [x] Consignee email

**Shipment Details**:
- [x] AWB number (11-digit IATA format)
- [x] Origin airport code (3-letter IATA code, e.g., DXB)
- [x] Destination airport code (3-letter IATA code, e.g., JFK)
- [x] Airline name and code
- [x] Flight number (optional - not specified on AWB)
- [x] Scheduled departure date
- [x] Scheduled arrival date

**Cargo Description**:
- [x] Number of pieces
- [x] Gross weight (kg)
- [x] Chargeable weight (kg)
- [x] Cargo description (detailed)
- [x] HS Code (Harmonized System code)
- [x] Commodity code
- [x] Declared value (USD)
- [x] Currency code

**Special Handling**:
- [x] Dangerous goods declaration (if applicable)
- [x] Special instructions
- [x] Handling codes (e.g., fragile, keep dry)
- [x] Insurance required (yes/no)
- [x] Insurance amount (if applicable)

**Charges**:
- [x] Freight charges
- [x] Fuel surcharge
- [x] Security surcharge
- [x] Handling charges
- [x] Other charges
- [x] Total charges
- [x] Currency

**Customs & Compliance**:
- [x] Certificate of origin required
- [x] Commercial invoice number
- [x] Shipper's declaration for dangerous goods (if applicable)
- [x] Customs declaration
- [x] Export license number (if required)

**Signatures**:
- [x] Shipper signature
- [x] Carrier signature
- [x] Date

### **Air Freight - Additional IATA Requirements**

**Dangerous Goods (if applicable)**:
- [x] UN Class
- [x] Proper shipping name
- [x] Technical name (if required)
- [x] Packing group
- [x] Packing instruction code
- [x] Emergency contact number (24-hour)
- [x] Shipper's declaration form (DGD)

**Perishable Goods (if applicable)**:
- [x] Temperature range (min/max)
- [x] Humidity range (if required)
- [x] Expiration date
- [x] Storage instructions

**Live Animals (if applicable)**:
- [x] Health certificate
- [x] Veterinary clearance
- [x] Species and quantity
- [x] Feeding instructions
- [x] Special container requirements

---

## 🚢 SEA FREIGHT - BILL OF LADING (B/L) FIELDS

### **Required Fields (International Standard)**

**Shipper Information**:
- [x] Shipper name (full legal name)
- [x] Shipper address (street, city, state, country, zip)
- [x] Shipper phone number
- [x] Shipper email
- [x] Shipper reference number

**Consignee Information**:
- [x] Consignee name (full legal name)
- [x] Consignee address (street, city, state, country, zip)
- [x] Consignee phone number
- [x] Consignee email

**Notify Party**:
- [x] Notify party name
- [x] Notify party address
- [x] Notify party phone/email

**Vessel Information**:
- [x] Vessel name
- [x] Vessel IMO number
- [x] Voyage number
- [x] Booking reference
- [x] Container numbers (if containerized)
- [x] Container types (20ft, 40ft, HC, Reefer, etc.)

**Port Information**:
- [x] Loading port (UNLOCODE)
- [x] Discharge port (UNLOCODE)
- [x] Final destination port (if different)
- [x] Transshipment ports (if applicable)

**Cargo Details**:
- [x] Bill of Lading number
- [x] Number of B/L copies
- [x] Number of packages/containers
- [x] Cargo description (detailed)
- [x] HS Code (Harmonized System code)
- [x] Gross weight (kg)
- [x] Net weight (kg)
- [x] Volume/CBM (cubic meters)
- [x] Marks and numbers
- [x] Declared value (USD)

**Shipping Terms**:
- [x] Incoterms (FOB, CIF, DDP, etc.)
- [x] Freight prepaid/collect
- [x] Freight amount
- [x] Currency

**Dates**:
- [x] Date of issue
- [x] Date of shipment
- [x] Estimated time of arrival (ETA)
- [x] Expected delivery date

**Customs & Compliance**:
- [x] Certificate of origin
- [x] Commercial invoice number
- [x] Customs declaration
- [x] Export license number (if required)
- [x] Import license number (if required)
- [x] Dangerous goods declaration (if applicable)
- [x] Shipper's declaration

**Special Handling**:
- [x] Handling codes (fragile, keep dry, etc.)
- [x] Stowage requirements
- [x] Special instructions
- [x] Insurance required (yes/no)
- [x] Insurance amount (if applicable)

**Signatures**:
- [x] Shipper signature
- [x] Carrier signature
- [x] Date

### **Sea Freight - Additional Requirements**

**Dangerous Goods (if applicable)**:
- [x] IMO Class
- [x] Proper shipping name
- [x] Technical name (if required)
- [x] Packing group
- [x] Emergency contact number
- [x] Shipper's declaration form

**Reefer Cargo (if applicable)**:
- [x] Temperature range (min/max)
- [x] Humidity range
- [x] Ventilation requirements
- [x] Ethylene control (if required)
- [x] Pre-cooling requirements

**Breakbulk Cargo (if applicable)**:
- [x] Stowage plan
- [x] Lashing requirements
- [x] Weight distribution
- [x] Special equipment needed

---

## 🚚 LAND FREIGHT - CMR CONSIGNMENT NOTE FIELDS

### **Mandatory Fields (CMR Convention Standard)**

**Consignor (Shipper) Information**:
- [x] Consignor name (full legal name)
- [x] Consignor address (street, city, state, country, zip)
- [x] Consignor phone number
- [x] Consignor signature
- [x] Date of issue
- [x] Location of issue

**Carrier Information**:
- [x] Carrier name (full legal name)
- [x] Carrier address
- [x] Carrier phone number
- [x] Carrier license number
- [x] Insurance company name
- [x] Insurance policy number

**Consignee Information**:
- [x] Consignee name (full legal name)
- [x] Consignee address (street, city, state, country, zip)
- [x] Consignee phone number

**Delivery Location**:
- [x] Delivery address (may differ from consignee address)
- [x] Delivery location type (warehouse, factory, distribution center, etc.)

**Cargo Details**:
- [x] Number of packages/boxes/cartons
- [x] Cargo description (general description of contents)
- [x] Dimensions (length, width, height per item)
- [x] Weight per item (kg)
- [x] Total weight (kg)
- [x] Marks and numbers on packages
- [x] HS Code (Harmonized System code)
- [x] Commodity type

**Transportation Details**:
- [x] Pickup date
- [x] Delivery date (expected)
- [x] Time frame for delivery
- [x] Route information (if specified)
- [x] Number of vehicles (if multiple)

**Charges**:
- [x] Freight charges
- [x] Additional charges (tolls, customs, etc.)
- [x] Total amount due
- [x] Currency
- [x] Payment terms (prepaid/collect)
- [x] Payer (consignor/consignee)

**Special Conditions**:
- [x] Handling instructions
- [x] Special instructions
- [x] Dangerous goods declaration (if applicable)
- [x] Fragile goods indicator
- [x] Temperature control requirements (if applicable)
- [x] Hazmat classification (if applicable)

**Compliance**:
- [x] Trans-shipment clause (yes/no)
- [x] Certificate of origin (if required)
- [x] Commercial invoice number
- [x] Customs declaration
- [x] Export/Import license numbers (if required)

**Documents**:
- [x] List of attached documents
- [x] Commercial invoice
- [x] Packing list
- [x] Certificates (origin, health, etc.)

**Signatures**:
- [x] Consignor signature
- [x] Carrier signature
- [x] Consignee signature (on delivery)
- [x] Date

### **CMR - Optional but Recommended Fields**

- [x] Driver name and license number
- [x] Vehicle registration number
- [x] Trailer number (if applicable)
- [x] Seal numbers
- [x] Customs reference numbers
- [x] Tracking reference

---

## 📊 COMPARATIVE FIELD MATRIX

| Field Category | Air (AWB) | Sea (B/L) | Land (CMR) |
|---|---|---|---|
| **Shipper Info** | ✅ | ✅ | ✅ |
| **Consignee Info** | ✅ | ✅ | ✅ |
| **Cargo Description** | ✅ | ✅ | ✅ |
| **Weight/Dimensions** | ✅ | ✅ | ✅ |
| **HS Code** | ✅ | ✅ | ✅ |
| **Declared Value** | ✅ | ✅ | ❌ |
| **Insurance** | ✅ | ✅ | ✅ |
| **Dangerous Goods** | ✅ | ✅ | ✅ |
| **Customs Docs** | ✅ | ✅ | ✅ |
| **Signatures** | ✅ | ✅ | ✅ |
| **Vessel/Vehicle Info** | ❌ | ✅ | ✅ |
| **Port/Airport Codes** | ✅ | ✅ | ❌ |
| **Charges** | ✅ | ✅ | ✅ |
| **Dates** | ✅ | ✅ | ✅ |

---

## 🗄️ UPDATED DATABASE SCHEMA

### **Enhanced Shipments Table**

```sql
CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    tracking_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Shipment Type
    order_type ENUM('local', 'international') NOT NULL,
    shipping_mode ENUM('air', 'sea', 'land') NOT NULL,
    service_type ENUM('express', 'standard', 'economy') NOT NULL,
    
    -- From Address
    from_name VARCHAR(255) NOT NULL,
    from_email VARCHAR(255),
    from_phone VARCHAR(20),
    from_address TEXT NOT NULL,
    from_city VARCHAR(100) NOT NULL,
    from_state VARCHAR(100),
    from_country VARCHAR(100) NOT NULL,
    from_zip VARCHAR(20),
    from_reference_number VARCHAR(100),
    
    -- To Address
    to_name VARCHAR(255) NOT NULL,
    to_email VARCHAR(255),
    to_phone VARCHAR(20),
    to_address TEXT NOT NULL,
    to_city VARCHAR(100) NOT NULL,
    to_state VARCHAR(100),
    to_country VARCHAR(100) NOT NULL,
    to_zip VARCHAR(20),
    
    -- Notify Party (for sea freight)
    notify_party_name VARCHAR(255),
    notify_party_address TEXT,
    notify_party_phone VARCHAR(20),
    notify_party_email VARCHAR(255),
    
    -- Package Details
    goods_type VARCHAR(255),
    description TEXT,
    hs_code VARCHAR(10),
    commodity_code VARCHAR(50),
    weight DECIMAL(10, 2),
    net_weight DECIMAL(10, 2),
    chargeable_weight DECIMAL(10, 2),
    length DECIMAL(10, 2),
    width DECIMAL(10, 2),
    height DECIMAL(10, 2),
    volume_cbm DECIMAL(10, 4),
    number_of_pieces INTEGER,
    marks_and_numbers TEXT,
    declared_value DECIMAL(12, 2),
    
    -- Air Freight Specific
    origin_airport_code VARCHAR(3),
    destination_airport_code VARCHAR(3),
    airline_name VARCHAR(100),
    airline_code VARCHAR(2),
    flight_number VARCHAR(10),
    
    -- Sea Freight Specific
    vessel_name VARCHAR(100),
    vessel_imo_number VARCHAR(20),
    voyage_number VARCHAR(50),
    booking_reference VARCHAR(100),
    loading_port_code VARCHAR(5),
    discharge_port_code VARCHAR(5),
    final_destination_port_code VARCHAR(5),
    container_numbers TEXT,
    container_types TEXT,
    bill_of_lading_number VARCHAR(50),
    incoterms VARCHAR(10),
    
    -- Land Freight Specific
    delivery_location_type VARCHAR(50),
    vehicle_registration VARCHAR(50),
    driver_name VARCHAR(100),
    driver_license VARCHAR(50),
    seal_numbers TEXT,
    
    -- Shipping Options
    customs_clearance BOOLEAN DEFAULT false,
    customs_fee DECIMAL(10, 2),
    customs_reference VARCHAR(100),
    insurance BOOLEAN DEFAULT false,
    insurance_amount DECIMAL(10, 2),
    insurance_company VARCHAR(100),
    insurance_policy_number VARCHAR(100),
    
    -- Dangerous Goods (if applicable)
    is_dangerous_goods BOOLEAN DEFAULT false,
    dangerous_goods_class VARCHAR(10),
    dangerous_goods_proper_name VARCHAR(255),
    dangerous_goods_technical_name VARCHAR(255),
    dangerous_goods_packing_group VARCHAR(10),
    dangerous_goods_un_number VARCHAR(10),
    emergency_contact_number VARCHAR(20),
    
    -- Special Handling
    handling_codes TEXT,
    special_instructions TEXT,
    fragile BOOLEAN DEFAULT false,
    keep_dry BOOLEAN DEFAULT false,
    temperature_min DECIMAL(5, 2),
    temperature_max DECIMAL(5, 2),
    humidity_min DECIMAL(5, 2),
    humidity_max DECIMAL(5, 2),
    
    -- Pricing
    base_price DECIMAL(12, 2),
    fuel_surcharge DECIMAL(10, 2),
    security_surcharge DECIMAL(10, 2),
    handling_charges DECIMAL(10, 2),
    other_charges DECIMAL(10, 2),
    tax_amount DECIMAL(10, 2),
    total_price DECIMAL(12, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Compliance Documents
    certificate_of_origin BOOLEAN DEFAULT false,
    commercial_invoice_number VARCHAR(100),
    export_license_number VARCHAR(100),
    import_license_number VARCHAR(100),
    
    -- Status
    status ENUM('pending', 'picked', 'in_transit', 'customs', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'pending',
    
    -- Dates
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pickup_date DATE,
    scheduled_departure DATE,
    scheduled_arrival DATE,
    estimated_delivery DATE,
    actual_delivery DATE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_tracking_number (tracking_number),
    INDEX idx_status (status),
    INDEX idx_shipping_mode (shipping_mode)
);
```

---

## 🔌 UPDATED API ENDPOINTS

### **Create Shipment - Enhanced Request Body**

```json
{
  "orderType": "international",
  "shippingMode": "air",
  "serviceType": "express",
  
  "shipper": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "US",
    "zip": "10001",
    "referenceNumber": "REF123"
  },
  
  "consignee": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+9876543210",
    "address": "456 Oak Ave",
    "city": "Dubai",
    "state": "DU",
    "country": "AE",
    "zip": "00000"
  },
  
  "notifyParty": {
    "name": "Notify Company",
    "address": "789 Pine St",
    "phone": "+1111111111",
    "email": "notify@example.com"
  },
  
  "cargo": {
    "description": "Electronics",
    "hsCode": "8471.30",
    "commodityCode": "ELEC001",
    "numberOfPieces": 5,
    "weight": 50.5,
    "netWeight": 48.0,
    "chargeableWeight": 52.0,
    "length": 100,
    "width": 80,
    "height": 60,
    "volumeCbm": 0.48,
    "marksAndNumbers": "BOX001-005",
    "declaredValue": 5000,
    "isDangerousGoods": false
  },
  
  "airFreightSpecific": {
    "originAirportCode": "JFK",
    "destinationAirportCode": "DXB",
    "airlineName": "Emirates",
    "airlineCode": "EK",
    "scheduledDeparture": "2025-11-20",
    "scheduledArrival": "2025-11-21"
  },
  
  "seaFreightSpecific": {
    "vesselName": "MSC LENA F",
    "vesselImoNumber": "9123456",
    "voyageNumber": "YF432A",
    "bookingReference": "BOOKING123",
    "loadingPortCode": "USNYC",
    "dischargePortCode": "AEDXB",
    "containerNumbers": ["MEDU9091004"],
    "containerTypes": ["40HC"],
    "incoterms": "CIF"
  },
  
  "landFreightSpecific": {
    "deliveryLocationType": "warehouse",
    "vehicleRegistration": "ABC123",
    "driverName": "Ahmed",
    "driverLicense": "DL123456",
    "sealNumbers": "SEAL001"
  },
  
  "specialHandling": {
    "fragile": true,
    "keepDry": true,
    "temperatureMin": 15,
    "temperatureMax": 25,
    "handlingCodes": ["FRAGILE", "KEEP_DRY"],
    "specialInstructions": "Handle with care"
  },
  
  "compliance": {
    "customsClearance": true,
    "insurance": true,
    "insuranceAmount": 500,
    "certificateOfOrigin": true,
    "commercialInvoiceNumber": "INV123",
    "exportLicenseNumber": "EXP123"
  }
}
```

---

## ✅ VALIDATION CHECKLIST

### **Air Freight (AWB)**
- [x] Origin/Destination airport codes (3-letter IATA)
- [x] Airline information
- [x] Dangerous goods declaration (if needed)
- [x] Shipper/Consignee details
- [x] Cargo description with HS code
- [x] Weight and dimensions
- [x] Declared value
- [x] Insurance information
- [x] Special handling codes

### **Sea Freight (B/L)**
- [x] Vessel information (name, IMO, voyage)
- [x] Port codes (UNLOCODE format)
- [x] Container information
- [x] Notify party details
- [x] Incoterms
- [x] Cargo marks and numbers
- [x] Volume in CBM
- [x] Dangerous goods declaration (if needed)
- [x] Customs documents

### **Land Freight (CMR)**
- [x] Delivery location type
- [x] Vehicle/Driver information
- [x] Seal numbers
- [x] Cargo marks and numbers
- [x] Handling instructions
- [x] Temperature/Humidity (if applicable)
- [x] Dangerous goods declaration (if needed)
- [x] Customs reference numbers

---

## 🎯 IMPLEMENTATION NOTES

### **For Backend Team**

1. **Shipment Creation**
   - Validate fields based on shipping mode
   - Air: Require airport codes, airline info
   - Sea: Require vessel, port, container info
   - Land: Require vehicle, driver, delivery location

2. **Data Validation**
   - HS codes: Validate against official HS code database
   - Airport codes: Validate against IATA database
   - Port codes: Validate against UNLOCODE database
   - Dangerous goods: Validate against IATA/IMO regulations

3. **Document Generation**
   - Air: Generate AWB in IATA format
   - Sea: Generate B/L in standard format
   - Land: Generate CMR in CMR Convention format

4. **Compliance**
   - Store all required fields for regulatory compliance
   - Maintain audit trail for all changes
   - Support dangerous goods declarations
   - Support customs documentation

5. **Integration Points**
   - Validate with carrier APIs (if available)
   - Generate proper document formats
   - Support e-documents (e-AWB, e-B/L, eCMR)

---

## 📚 REFERENCES

**Sources Used**:
1. IATA Air Waybill Standards (Investopedia)
2. International Bill of Lading Standards
3. CMR Consignment Note Convention
4. IATA Dangerous Goods Regulations
5. JSON Cargo API Documentation
6. International shipping standards

---

## 🚀 NEXT STEPS

1. Update database schema with new fields
2. Update API endpoints with enhanced request/response
3. Add field validation logic
4. Implement document generation
5. Add compliance checks
6. Test with real shipping scenarios

---

**Status**: ✅ **RESEARCH COMPLETE & DOCUMENTED**

All required fields for Air, Sea, and Land freight have been identified and documented. Backend team can now implement with full compliance to international standards.

