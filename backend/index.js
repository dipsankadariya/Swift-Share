import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';
import DBconnection from './database/db.js';

const app = express();

// Configure dotenv
dotenv.config();

// Single CORS configuration with correct origin
app.use(cors({
  origin: [
    'https://swift-share.vercel.app',
    'https://swift-share-1hi3pqt4k-dipsankadariyas-projects.vercel.app',
    // This will allow all vercel.app subdomains
  ],
  credentials: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Define the port
const PORT = process.env.PORT || 5000;

// Use your routes
app.use('/', router);

DBconnection();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});