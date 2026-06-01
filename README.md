# SRPLASTIC MERN Stack Company Website

This repository contains the complete MERN stack source code for the **SRPLASTIC** industrial product showcase website.

## 📁 Directory Structure

- **`backend/`**: Node.js/Express API, MongoDB Schemas, database seeding logic.
- **`frontend/`**: React (Vite) application styled with Tailwind CSS v3, fully responsive product catalogs, details tables, and quote/inquiry builders.
- **`product_images/`**: High-resolution PNG renders extracted page-by-page from the product catalog.

---

## ⚡ Quickstart Guide

### 1. Database Seeding & Setup
1. Open the `backend/` folder.
2. Create a `.env` file based on `.env.example` and insert your **MongoDB Atlas Cloud Connection String**:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/srplastic?retryWrites=true&w=majority
   PORT=5000
   ```
3. Install dependencies and run the seeder to populate all products and technical specs into your Atlas DB:
   ```bash
   cd backend
   npm run seed
   ```

### 2. Start the Backend Server
Run the Express development server (running on port `5000`):
```bash
cd backend
npm run dev
```

### 3. Start the Frontend Application
Run the Vite development server (running on port `3000` with proxies configured to route API calls to the backend on port `5000`):
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the fully interactive site.

---

## 📄 Page Layout Features

1. **Homepage (`/`)**: Hero carousel showcase, product category cards grid, stats counter counters, testimonials, FAQ accordions.
2. **Product Catalogue (`/products`)**: Dynamic search bar, category filter sidebar, product grid, and quote request cart additions.
3. **Product Detail (`/product/:id`)**: High-resolution image zoom, structured technical specifications tables, quantity selectors, add to quote list, and single-item inline enquiry form.
4. **About Us (`/about`)**: Company pillars, quality assurance benefits matrix, mock ISO registration, and business registrations.
5. **Contact Us (`/contact`)**: Plant/office address, emails, phone links, direct WhatsApp click widget, main contact form, and Google Maps location placeholder.
