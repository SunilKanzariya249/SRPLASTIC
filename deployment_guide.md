# SRPLASTIC Render Deployment Guide

This guide details the step-by-step procedure to deploy the MERN stack application (both Backend and Frontend) on [Render.com](https://render.com) from a single GitHub monorepo.

---

## 🌐 Part 1: Deploying the Backend Web Service

1. **Log in to Render**: Go to [dashboard.render.com](https://dashboard.render.com) and log in using your GitHub account.
2. **Create New Web Service**:
   - Click **New +** and select **Web Service**.
   - Connect your GitHub repository: `SRPLASTIC`.
3. **Configure the Service**:
   - **Name**: `srplastic-backend`
   - **Language**: `Node`
   - **Root Directory**: `backend` *(CRITICAL: This tells Render to only build the backend folder)*
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Configure Environment Variables**:
   - Scroll down to the **Environment Variables** section.
   - Add the following keys:
     - `MONGODB_URI`: *Your MongoDB Atlas connection string*
     - `PORT`: `10000` (Render will override this automatically, but setting this guarantees standard web bindings)
5. **Deploy**:
   - Click **Deploy Web Service**.
   - Once deployed, copy the generated backend URL (e.g. `https://srplastic-backend.onrender.com`).

---

## 🎨 Part 2: Deploying the Frontend Static Site

1. **Create New Static Site**:
   - In Render Dashboard, click **New +** and select **Static Site**.
   - Connect your GitHub repository: `SRPLASTIC`.
2. **Configure the Service**:
   - **Name**: `srplastic-frontend` (or your company name)
   - **Root Directory**: `frontend` *(CRITICAL: This tells Render to compile from the frontend folder)*
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist` *(This is Vite's production build output folder)*
3. **Configure Redirects & Rewrites (CRITICAL for Routing & APIs)**:
   - Once the static site is created, click **Redirects/Rewrites** in the service menu.
   - Add the following two rules **in this exact order**:
     
     #### Rule 1: API Router
     - **Source**: `/api/*`
     - **Destination**: `https://your-backend-url.onrender.com/api/*` *(Replace with your actual backend Render URL)*
     - **Action**: `Rewrite`
     
     #### Rule 2: Single Page Application (SPA) Router
     - **Source**: `/*`
     - **Destination**: `/index.html`
     - **Action**: `Rewrite`
     
4. **Deploy**:
   - Render will build your static site. Once complete, you can access your live website via the frontend Render URL!
