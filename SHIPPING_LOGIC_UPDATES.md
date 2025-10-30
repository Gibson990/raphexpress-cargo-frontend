# ✅ Shipping Logic Updates

**Date**: October 23, 2025

## 🎯 Changes Made

### **1. Local Shipping - No Sea Freight** ⭐

**Updated Pages:**
- ✅ Create Shipment (`/shipments/create`)
- ✅ Shipping Calculator (`/calculator`)

**Changes:**
- **Local shipping** now shows only **2 modes**: Air & Land
- **Sea freight** is hidden for local shipments
- **International shipping** shows all **3 modes**: Air, Sea & Land
- Grid layout adjusts automatically (2-column for local, 3-column for international)
- Info message: "ℹ️ Sea freight is only available for international shipments"

**Delivery Times:**
- **Local Air**: 1-3 days (faster than international)
- **Local Land**: 2-5 days (faster than international)
- **International Air**: 3-7 days
- **International Sea**: 15-30 days
- **International Land**: 5-10 days

---

### **2. Declared Value - Tax Calculation** ⭐

**Updated Field:**
```
Label: "Declared Value (USD)"
Helper Text: "Used to calculate taxes and duties for international shipments"
```

**Purpose:**
- ✅ Used to calculate import taxes/duties for international shipments
- ✅ Required for all shipments (local & international)
- ✅ Helps determine customs fees
- ✅ Used for insurance purposes

**How It Works:**
1. User enters the value of goods
2. System calculates taxes based on destination country
3. Taxes are added to final price (international only)
4. Local shipments don't have taxes

---

### **3. Customs Clearance - Improved Explanation** ⭐

**New Explanation:**
```
Title: "Customs Clearance Assistance"
Description: "Do you need help clearing your goods at the port and paying customs taxes/duties?"
```

**Two Options:**

#### **Option 1: Yes, Help Me** 🤝
```
Title: "Yes, Help Me"
Description: "We'll clear your goods at the port and handle all customs taxes"
Fee: Service Fee: +$250
```

**What This Means:**
- ✅ Raphexpress will handle customs clearance
- ✅ We'll pay the customs taxes/duties on your behalf
- ✅ We'll handle all paperwork at the port
- ✅ You just receive your goods
- ✅ Service fee: $250

#### **Option 2: No, I'll Handle It** 🙋
```
Title: "No, I'll Handle It"
Description: "I'll clear the goods and pay customs taxes myself"
Fee: No Fee
```

**What This Means:**
- ✅ Customer handles customs clearance themselves
- ✅ Customer pays customs taxes/duties directly
- ✅ Customer handles paperwork at the port
- ✅ No service fee
- ✅ More control but more work

---

## 📊 Complete Shipping Logic

### **Local Shipping**
```
Available Modes:
  ✅ Air Freight (1-3 days)
  ✅ Land Freight (2-5 days)
  ❌ Sea Freight (not available)

Pricing:
  - Base price only
  - No taxes
  - No customs clearance needed
  - Insurance optional

Required Fields:
  - Origin (city only)
  - Destination (city only)
  - Goods type
  - Weight/Dimensions
  - Declared value
```

### **International Shipping**
```
Available Modes:
  ✅ Air Freight (3-7 days)
  ✅ Sea Freight (15-30 days)
  ✅ Land Freight (5-10 days)

Pricing:
  - Base price
  + Taxes (based on destination)
  + Customs clearance (optional, +$250)
  + Insurance (optional)

Required Fields:
  - Origin (city + country)
  - Destination (city + country)
  - Goods type
  - Weight/Dimensions/Container
  - Declared value (for tax calculation)
  - Customs clearance preference
```

---

## 🎨 UI Improvements

### **Create Shipment Page**

**Step 1: Shipment Type**
```
┌─────────────┬─────────────┐  or  ┌─────────┬─────────┬─────────┐
│  🚚 Air     │  🚛 Land    │      │  ✈️ Air │  🚢 Sea │  🚛 Land│
│  1-3 days   │  2-5 days   │      │ 3-7 days│ 15-30 d │ 5-10 d  │
└─────────────┴─────────────┘      └─────────┴─────────┴─────────┘
     LOCAL SHIPPING                  INTERNATIONAL SHIPPING

ℹ️ Sea freight is only available for international shipments
```

**Step 4: Package Info**
```
Declared Value (USD)
[1000]
ℹ️ Used to calculate taxes and duties for international shipments

--- For International Only ---

Customs Clearance Assistance
Do you need help clearing your goods at the port and paying customs taxes/duties?

┌─────────────────────────────┬─────────────────────────────┐
│  Yes, Help Me               │  No, I'll Handle It         │
│  We'll clear your goods at  │  I'll clear the goods and   │
│  the port and handle all    │  pay customs taxes myself   │
│  customs taxes              │                             │
│  Service Fee: +$250         │  No Fee                     │
└─────────────────────────────┴─────────────────────────────┘
```

### **Shipping Calculator**

**Same improvements:**
- ✅ 2-column grid for local (Air & Land)
- ✅ 3-column grid for international (Air, Sea & Land)
- ✅ Better customs clearance explanation
- ✅ Info message for local shipping

---

## 💡 Business Logic Summary

### **Why No Sea Freight for Local?**
- Sea freight is for international cargo shipping
- Local shipping uses air or land transport only
- Faster delivery times for domestic shipments
- More cost-effective for local routes

### **Declared Value Purpose**
1. **Tax Calculation**: Used to calculate import taxes/duties
2. **Insurance**: Determines insurance coverage amount
3. **Customs**: Required for customs declaration
4. **Compliance**: Legal requirement for international shipping

### **Customs Clearance Options**

**Option 1: Raphexpress Handles It (+$250)**
- ✅ Full service
- ✅ We pay taxes upfront
- ✅ We handle paperwork
- ✅ Customer receives goods directly
- ✅ Convenience fee: $250

**Option 2: Customer Handles It (Free)**
- ✅ No service fee
- ✅ Customer pays taxes directly
- ✅ Customer handles paperwork
- ✅ More control
- ✅ Requires customs knowledge

---

## 🎯 What's Working

**Create Shipment:**
- ✅ Local shipping shows Air & Land only
- ✅ International shows Air, Sea & Land
- ✅ Declared value with tax explanation
- ✅ Customs clearance with detailed explanation
- ✅ Dynamic grid layout (2 or 3 columns)
- ✅ Info message for local shipping

**Shipping Calculator:**
- ✅ Same logic as Create Shipment
- ✅ Local shipping shows Air & Land only
- ✅ International shows all 3 modes
- ✅ Better customs clearance explanation
- ✅ Declared value for tax calculation

**Both Pages:**
- ✅ Consistent logic
- ✅ Clear explanations
- ✅ User-friendly UI
- ✅ Responsive design

---

## 📋 Pricing Breakdown

### **Local Shipment Example**
```
Air Freight (100 kg):
  Base Price: $850 (100 kg × $8.5/kg)
  Taxes: $0 (local shipping)
  Customs: $0 (not applicable)
  ─────────────────────────────
  Total: $850
```

### **International Shipment Example**
```
Air Freight (100 kg) to UAE:
  Base Price: $850 (100 kg × $8.5/kg)
  Taxes (5% VAT): $42.50
  Customs Clearance: $250 (if selected)
  ─────────────────────────────
  Total: $1,142.50
```

---

## ✅ Summary

**Updates Complete:**
1. ✅ Local shipping has no sea freight option
2. ✅ Declared value explanation updated (tax calculation)
3. ✅ Customs clearance explanation improved
4. ✅ Dynamic grid layout (2 or 3 columns)
5. ✅ Info messages added
6. ✅ Consistent across both pages

**Key Points:**
- **Local**: Air & Land only (faster, no taxes)
- **International**: Air, Sea & Land (slower, with taxes)
- **Declared Value**: Used for tax calculation
- **Customs Clearance**: Optional service (+$250) or self-handled (free)

---

**All changes are live and ready to test!** 🚀
