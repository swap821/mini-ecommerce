<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/859fb68e-297d-4f16-aff7-bd2bf7c713eb" /># 🛒 Mini E-Commerce Store : https://mini-ecommerce-six-gold.vercel.app


![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

A modern full-stack e-commerce storefront built using the MERN stack, TypeScript, Zustand, and Stripe integration. The project demonstrates advanced frontend state management, secure payment gateway integration, database-driven product management, and responsive UI design.

This application features a dynamic product catalog, slide-out shopping cart, real-time price calculations, and a secure mock checkout flow powered by Stripe Checkout Sessions.

---

# ✨ Key Features

## 🛍️ Dynamic Product Catalog
- Fetches real-time product inventory from MongoDB
- Displays product details dynamically
- Responsive product grid layout

## 🛒 Global Cart State Management
- Add, remove, and update product quantities instantly
- Real-time total price recalculation
- Persistent and scalable cart management using Zustand

## 💳 Secure Stripe Checkout Integration
- Stripe-hosted checkout sessions
- Secure mock payment flow
- Sensitive payment data never touches the local server

## ⚡ Full-Stack Architecture
- RESTful API integration using Express.js
- MongoDB database connectivity with Mongoose ODM
- Scalable backend structure for inventory management

## 🎨 Responsive Modern UI
- Fully responsive mobile-first design
- Built using Tailwind CSS v4
- Smooth user experience across all devices

## 🚨 Error Handling & Optimization
- Loading and error state management
- Optimized asynchronous data fetching
- Clean component-based frontend architecture

---

# 🛠️ Tech Stack

## Frontend (`/client`)
- React.js
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand

## Backend (`/server`)
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- Stripe API
- Dotenv

---

# 📂 Project Structure

```plaintext
mini-ecommerce/
│
├── server/                     # Backend API Server
│   ├── models/                 # MongoDB Schemas
│   ├── routes/                 # API Routes
│   ├── controllers/            # Business Logic
│   ├── server.js               # Express Server Setup
│   └── package.json
│
├── client/                     # Frontend React Application
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   ├── pages/              # Application Pages
│   │   ├── store/              # Zustand Global State
│   │   ├── App.tsx             # Main Application
│   │   └── main.tsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

To run this project locally, ensure Node.js and MongoDB are installed.

---

# 📌 Prerequisites

Install the following:
- Node.js
- npm
- MongoDB Atlas account
- Stripe Test Account

Download Node.js:
https://nodejs.org/

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/swap821/mini-ecommerce.git
cd mini-ecommerce
```

---

# 🔧 Backend Setup

Navigate to the server directory:

```bash
cd server
npm install
```

---

## 🌐 Configure Backend Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_cluster_connection_string
STRIPE_SECRET_KEY=your_stripe_test_secret_key
CLIENT_URL=http://localhost:5173
```

---

## ▶️ Start the Backend Server

```bash
npm run dev
```

---

# 🎨 Frontend Setup

Open a second terminal:

```bash
cd client
npm install
```

---

## ▶️ Start Frontend Development Server

```bash
npm run dev
```

---

# 🌍 Run the Application

Visit:

```bash
http://localhost:5173
```

---

# 🧪 Test Product Data

To populate the store, send mock product data to:

```bash
http://localhost:5000/api/products
```

You can use:
- Postman
- Thunder Client
- Insomnia

---

# 🌐 Deployment

This project can be deployed using:

## Frontend Hosting
- Vercel
- Netlify

## Backend Hosting
- Render
- Railway

## Database
- MongoDB Atlas

---

# 🧠 Concepts & Skills Demonstrated

This project demonstrates strong understanding of:

- Full-Stack MERN Development
- TypeScript Integration
- Global State Management with Zustand
- Stripe Payment Gateway Integration
- REST API Development
- MongoDB Database Architecture
- Responsive UI/UX Design
- Scalable Frontend & Backend Architecture
- Secure Payment Processing
- Modern Software Engineering Practices

---

# 🚀 Future Improvements

- User Authentication & Authorization
- Order History Tracking
- Product Categories & Filters
- Wishlist Functionality
- Admin Dashboard
- Product Reviews & Ratings
- Inventory Management System
- Email Order Confirmation

---

# 👨‍💻 Author

## Swapnil Kumar

- GitHub: https://github.com/swap821
- LinkedIn: https://www.linkedin.com/in/swapnil-kumar-73a68a308

---

# ⭐ Project Goal

This project was built to strengthen and demonstrate:
- Full-Stack Development Skills
- Secure Payment Integration
- Scalable State Management
- Database-Driven Application Design
- Modern Frontend Engineering
- Professional Software Engineering Practices

---

# 📜 License

This project is open-source and available for educational and learning purposes.
