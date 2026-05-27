# 🛒 E-Commerce API

A production-ready **RESTful API** for an electronics e-commerce platform built with **Node.js**, **Express**, and **MongoDB**. Features complete authentication (local, GitHub, Google OAuth), product & cart management, Stripe payment processing, real-time chat, email notifications, and comprehensive API documentation.

> **Note:** This project was originally developed as the final project for a Backend Development course and has since been enhanced and polished for production readiness.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Local registration/login with encrypted passwords (bcryptjs)
- OAuth 2.0 via **GitHub** and **Google**
- Session-based authentication with MongoDB session store
- Role-based access control (`user` / `admin`)
- Password reset flow with email tokens

### 📦 Product Management
- Full CRUD operations (admin-protected)
- Pagination, sorting by price, filtering by category
- Mock product generation (Faker.js) for testing

### 🛍️ Shopping Cart & Checkout
- Add/remove/update products in cart
- Stock validation and automatic stock reduction
- Checkout with **Stripe** payment integration
- Purchase ticket generation with email receipt

### 💬 Real-Time Chat
- WebSocket-based live chat using **Socket.IO**
- Persistent message history stored in MongoDB

### 📧 Email Notifications (Nodemailer)
- Purchase confirmation with ticket details
- Password reset instructions
- Account deletion notification
- Product deletion notification

### 📖 API Documentation
- Interactive **Swagger** UI at `/api/docs`
- Documented endpoints for carts, products, tickets, and users

---

## 🧱 Architecture

```
src/
├── config/          # App configuration (DB, Passport, Socket, env)
├── controllers/     # Request handlers
├── dao/
│   ├── models/      # Mongoose schemas (Cart, Product, Ticket, User, Message)
│   └── DTOs/        # Data Transfer Objects
├── docs/            # Swagger YAML specifications
├── middleware/       # Auth guards, error handling
├── public/          # Static assets (CSS, JS, images)
├── routes/          # Route definitions (API + Views)
├── services/        # Business logic layer
├── utils/           # Utilities (bcrypt, multer, token gen)
└── views/           # Handlebars templates
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Runtime** | Node.js (ES Modules) |
| **Framework** | Express.js |
| **Database** | MongoDB + Mongoose ODM |
| **Templating** | Handlebars (Express-Handlebars) |
| **Auth** | Passport.js (Local, GitHub, Google OAuth 2.0) |
| **Payments** | Stripe API |
| **Real-Time** | Socket.IO |
| **Email** | Nodemailer (Gmail SMTP) |
| **Storage** | Multer (file uploads) |
| **API Docs** | Swagger (swagger-jsdoc + swagger-ui-express) |
| **Testing** | Mocha + Chai + Supertest |
| **Security** | Helmet, CORS, bcryptjs, express-session |
| **Logging** | Morgan |
| **Compression** | Compression (Gzip) |

---

## 🐳 Docker

```bash
# Build and start containers
docker compose up -d

# Seed database with 24 sample products
docker compose exec app npm run seed

# View logs
docker compose logs -f app

# Stop
docker compose down

# Rebuild from scratch
docker compose up -d --build
```

The app runs in a containerized environment with:
- **Node.js 18** (Alpine) — non-root user, security hardened
- **MongoDB 7** — persistent volume for data
- Health checks on both services
- Automatic database seeding on first start (via `npm start`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB instance (local or Atlas)
- Stripe account (for payment features)
- GitHub & Google OAuth app credentials (for social login)
- Gmail account (for email notifications)

### Installation

```bash
# Clone the repository
git clone https://github.com/nicob201/backend_API_ecommerce.git

# Install dependencies
npm install

# Set up environment variables (see below)
```

### Environment Variables

Create `.env.development` (for development) or `.env.production` (for production):

```env
# Server
PORT=8080
BASE_URL=http://localhost:8080
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/ecommerce

# Auth Secrets
SESSION_SECRET=your-session-secret-here

# GitHub OAuth
CLIENT_ID=your-github-client-id
CLIENT_SECRET=your-github-client-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email (Gmail App Password)
MAILING_EMAIL=your-email@gmail.com
MAILING_PASSWORD=your-app-password

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_BASE_URL=http://localhost:8080/api
```

### Run

```bash
# Development (with auto-restart)
npm start

# Run tests
npm test
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sessions/register` | Register a new user |
| POST | `/api/sessions/login` | Login |
| POST | `/api/sessions/logout` | Logout |
| GET | `/api/sessions/current` | Get current user |
| GET | `/api/sessions/github` | GitHub OAuth login |
| GET | `/api/sessions/google` | Google OAuth login |
| POST | `/api/sessions/request-reset` | Request password reset |
| POST | `/api/sessions/reset-password` | Reset password |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products (paginated, sortable, filterable) | - |
| GET | `/api/products/:id` | Get product by ID | - |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:pid` | Update product | Admin |
| DELETE | `/api/products/:pid` | Delete product | Admin |

### Carts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/carts` | Get all carts |
| GET | `/api/carts/:cid` | Get cart by ID |
| POST | `/api/carts` | Add product to cart |
| PUT | `/api/carts/:cid/product/:pid` | Update product units |
| DELETE | `/api/carts/:cid` | Delete cart |
| DELETE | `/api/carts/:cid/product/:pid` | Remove product from cart |

### Tickets
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tickets/:cid` | Create purchase ticket from cart |
| GET | `/api/tickets/:tid` | Get ticket by ID |

### Payments (Stripe)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create-checkout-session` | Create Stripe checkout session |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Get all users | - |
| GET | `/api/users/:uid` | Get user by ID | - |
| DELETE | `/api/users/:uid` | Delete user | Admin |
| PUT | `/api/users/admin/:uid` | Change user role | - |
| POST | `/api/users/:uid/documents` | Upload documents | - |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mocking/mockingproducts` | Generate 100 fake products |
| GET | `/api/messages` | Get chat messages |
| POST | `/api/messages` | Send chat message |
| GET | `/api/docs` | Swagger API documentation |
| GET | `/api/stripe-key` | Get Stripe publishable key |

---

## 🧪 Testing

```bash
# Run all tests
npm test
```

The test suite covers:
- **Products**: CRUD operations
- **Sessions**: Registration, login, current user, logout
- **Carts**: Product quantity updates, rendering, deletion

> **Note:** Set `TEST_MODE=true` in your environment to bypass authentication during testing.

---

## 🌐 Deployment

The project is deployed on **Render** (free tier):

| Service | URL |
|---------|-----|
| **Live App** | [https://backend-api-ecommerce-06bk.onrender.com](https://backend-api-ecommerce-06bk.onrender.com) |
| **Swagger Docs** | [https://backend-api-ecommerce-06bk.onrender.com/api/docs](https://backend-api-ecommerce-06bk.onrender.com/api/docs) |
| **API Products** | [https://backend-api-ecommerce-06bk.onrender.com/api/products](https://backend-api-ecommerce-06bk.onrender.com/api/products) |

---

## 🎯 Future Improvements

- [ ] Migrate frontend to React/Vue for a SPA experience
- [ ] Add Redis caching layer
- [ ] Implement WebSocket for real-time stock updates
- [ ] Add admin dashboard with analytics
- [ ] Add unit tests with higher coverage
- [ ] Implement rate limiting and request validation

---

## 📄 License

ISC

---

## 👨‍💻 Author

**Nicolas Boscasso** — [GitHub](https://github.com/nicob201)

---

*Built with ❤️ as a final project for Coderhouse Backend Course. Enhanced for portfolio showcase.*
