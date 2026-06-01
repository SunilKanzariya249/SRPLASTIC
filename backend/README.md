# SRPLASTIC Company Website - Backend

This folder contains the Node.js / Express backend with Mongoose schemas and REST API endpoints.

## 🚀 Setup Instructions

1. **Configure Environment Variables**:
   - Create a `.env` file in this directory (`D:\SRPLASTIC\backend\.env`) based on the `.env.example` template:
     ```env
     MONGODB_URI=your_mongodb_atlas_connection_string
     PORT=5000
     ```

2. **MongoDB Atlas Cloud Connection Setup**:
   To obtain your connection string:
   - Log in to your account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a new Database Cluster (if you don't have one) using the free tier.
   - Click **Connect** on your cluster.
   - Select **Drivers** (Node.js).
   - Copy the connection string. It will look like:
     `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/srplastic?retryWrites=true&w=majority`
   - Replace `<username>` and `<password>` with your database user credentials (created under Security -> Database Access).
   - Paste this full URI into your `.env` file as `MONGODB_URI`.

3. **Seeding the Database**:
   - The seeder automatically parses the product text and connects them to the high-resolution images.
   - Run the seeder to populate the MongoDB collections:
     ```bash
     npm run seed
     ```
     *(Add `"seed": "node seed.js"` to scripts in `package.json` if needed).*

4. **Running the Server**:
   - For development (with hot reload):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```
