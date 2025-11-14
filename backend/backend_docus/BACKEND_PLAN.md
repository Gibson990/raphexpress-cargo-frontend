# 🚀 Raphexpress Backend - Go + Firebase Plan

**Status**: 📋 PLANNING PHASE  
**Tech**: Go + Firebase Auth + PostgreSQL  
**Timeline**: 3-4 weeks

---

## 📊 FRONTEND SUMMARY

✅ **Complete**: 30+ pages, 14 user flows, professional UI  
✅ **Features**: Shipments, Tracking, Returns, Refunds, Labels, Quotes  
✅ **Ready**: All data structures defined, API contracts ready

---

## 🏗️ BACKEND ARCHITECTURE

```
Frontend (React)
    ↓ HTTPS
Go API (Gin)
    ├── Firebase Auth (no JWT)
    ├── PostgreSQL (data)
    ├── Redis (cache/sessions)
    └── External APIs (Stripe, SendGrid, Twilio)
```

---

## 🔐 AUTHENTICATION (Firebase)

**No JWT Management** - Firebase handles everything:

1. Frontend: User signs up/logs in with Firebase SDK
2. Firebase returns ID Token
3. Frontend sends ID Token to backend
4. Backend verifies with Firebase Admin SDK
5. Backend creates session in Redis
6. Backend returns custom JWT for API calls

**Endpoints**:
```
POST   /api/v1/auth/signup
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
POST   /api/v1/auth/refresh
```

---

## 📦 DATABASE SCHEMA (PostgreSQL)

**9 Main Tables**:
1. **users** - User accounts (Firebase UID + profile)
2. **shipments** - Shipping records
3. **tracking_events** - Real-time tracking
4. **addresses** - Saved addresses
5. **payments** - Payment records
6. **quotes** - Price quotes
7. **returns** - Return requests
8. **refunds** - Refund requests
9. **labels** - Shipping labels

---

## 🔌 API ENDPOINTS (45+ endpoints)

### **Auth** (5)
```
POST   /api/v1/auth/signup
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
POST   /api/v1/auth/refresh
```

### **Shipments** (6)
```
POST   /api/v1/shipments
GET    /api/v1/shipments
GET    /api/v1/shipments/:id
PUT    /api/v1/shipments/:id
DELETE /api/v1/shipments/:id
GET    /api/v1/shipments/:id/track
```

### **Tracking** (3)
```
GET    /api/v1/tracking/:trackingId
GET    /api/v1/shipments/:id/timeline
POST   /api/v1/tracking/events
```

### **Addresses** (5)
```
GET    /api/v1/addresses
POST   /api/v1/addresses
GET    /api/v1/addresses/:id
PUT    /api/v1/addresses/:id
DELETE /api/v1/addresses/:id
```

### **Payments** (5)
```
POST   /api/v1/payments
GET    /api/v1/payments/:id
GET    /api/v1/payments
POST   /api/v1/payments/:id/verify
POST   /api/v1/payments/:id/refund
```

### **Quotes** (4)
```
POST   /api/v1/quotes
GET    /api/v1/quotes/:id
GET    /api/v1/quotes
POST   /api/v1/quotes/:id/convert
```

### **Returns** (6)
```
POST   /api/v1/returns
GET    /api/v1/returns/:id
GET    /api/v1/returns
PUT    /api/v1/returns/:id
POST   /api/v1/returns/:id/approve
POST   /api/v1/returns/:id/cancel
```

### **Refunds** (6)
```
POST   /api/v1/refunds
GET    /api/v1/refunds/:id
GET    /api/v1/refunds
PUT    /api/v1/refunds/:id
POST   /api/v1/refunds/:id/approve
POST   /api/v1/refunds/:id/process
```

### **Labels** (3)
```
GET    /api/v1/labels/:shipmentId
POST   /api/v1/labels/:shipmentId/generate
GET    /api/v1/labels/:shipmentId/download
```

---

## 📁 PROJECT STRUCTURE

```
backend/
├── cmd/api/main.go
├── internal/
│   ├── auth/
│   │   ├── handler.go
│   │   ├── service.go
│   │   ├── firebase.go
│   │   └── middleware.go
│   ├── shipments/
│   │   ├── handler.go
│   │   ├── service.go
│   │   ├── model.go
│   │   └── repository.go
│   ├── tracking/
│   ├── addresses/
│   ├── payments/
│   ├── quotes/
│   ├── returns/
│   ├── refunds/
│   ├── labels/
│   ├── notifications/
│   ├── config/
│   ├── middleware/
│   ├── utils/
│   └── models/
├── migrations/
├── tests/
├── docker/
├── scripts/
├── .env.example
├── go.mod
└── README.md
```

---

## 🎯 IMPLEMENTATION ROADMAP

### **Week 1: Core Setup**
- Day 1-2: Go project setup, Gin framework, Docker
- Day 3-4: PostgreSQL schema, migrations, GORM models
- Day 5-7: Firebase Auth integration, auth middleware

### **Week 2: Core Features**
- Day 1-2: Shipments CRUD + validation
- Day 3-4: Tracking events + real-time
- Day 5-7: Addresses CRUD

### **Week 3: Advanced Features**
- Day 1-2: Stripe + Razorpay integration
- Day 3-4: Quote calculator + pricing
- Day 5-7: Returns & Refunds workflows

### **Week 4: Finalization**
- Day 1-2: Label generation (PDF + barcode)
- Day 3-4: Email/SMS notifications
- Day 5-7: Testing, deployment, documentation

---

## 🔧 TECH STACK

| Component | Technology |
|-----------|-----------|
| Language | Go 1.21+ |
| Framework | Gin Web Framework |
| Database | PostgreSQL 14+ |
| ORM | GORM |
| Auth | Firebase Admin SDK |
| Cache | Redis |
| File Storage | AWS S3 |
| Payment | Stripe + Razorpay |
| Email | SendGrid |
| SMS | Twilio |
| Deployment | Docker + Kubernetes |

---

## 📊 KEY FEATURES

### **1. Authentication (Firebase)**
- No JWT management needed
- Firebase handles security
- Custom JWT for API calls
- Session management in Redis

### **2. Shipments**
- Create/Read/Update/Delete
- International & local
- Air/Sea/Land modes
- Real-time tracking
- Status management

### **3. Tracking**
- Real-time location updates
- Timeline visualization
- Event history
- Public tracking (no auth)

### **4. Payments**
- Stripe integration
- Razorpay integration
- Multiple payment methods
- Refund processing

### **5. Quotes**
- Dynamic pricing
- Tax calculation
- Currency conversion
- Expiration management

### **6. Returns & Refunds**
- Return request workflow
- Refund processing
- Evidence file upload
- Status tracking

### **7. Labels**
- PDF generation
- Barcode generation
- QR code generation
- Print management

### **8. Notifications**
- Email notifications
- SMS notifications
- Push notifications
- Email templates

---

## 🚀 DEPLOYMENT

**Docker Setup**:
```
docker-compose up -d
```

**Environment Variables**:
```
DATABASE_URL=postgres://user:pass@localhost/raphexpress
FIREBASE_CREDENTIALS=path/to/firebase.json
STRIPE_KEY=sk_live_...
REDIS_URL=redis://localhost:6379
```

**Kubernetes**:
```
kubectl apply -f k8s/
```

---

## ✅ READINESS CHECKLIST

Frontend:
- [x] 30+ pages complete
- [x] 14 user flows working
- [x] All UI/UX done
- [x] Data structures defined
- [x] API contracts ready

Backend:
- [ ] Go project initialized
- [ ] Database schema created
- [ ] Firebase auth integrated
- [ ] Core endpoints implemented
- [ ] Testing complete
- [ ] Deployed to production

---

## 📞 NEXT STEPS

1. **Initialize Go Project**
   ```bash
   mkdir backend
   cd backend
   go mod init github.com/raphexpress/backend
   ```

2. **Install Dependencies**
   ```bash
   go get github.com/gin-gonic/gin
   go get gorm.io/gorm
   go get firebase.google.com/go/v4
   ```

3. **Create Database**
   ```bash
   createdb raphexpress
   psql raphexpress < migrations/schema.sql
   ```

4. **Set up Firebase**
   - Create Firebase project
   - Download service account key
   - Set FIREBASE_CREDENTIALS env var

5. **Start Development**
   ```bash
   go run cmd/api/main.go
   ```

---

**Status**: 📋 Ready for backend development  
**Timeline**: 3-4 weeks to production  
**Team**: 1-2 backend engineers recommended

