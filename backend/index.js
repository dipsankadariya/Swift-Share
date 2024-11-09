import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';
import DBconnection from './database/db.js';

const app = express();

dotenv.config();

// Minimal CORS config
app.use(cors({
  origin: [
    'https://swift-share.vercel.app',
    'https://swift-share-1hi3pqt4k-dipsankadariyas-projects.vercel.app',
    'https://swift-share-backend-dipsankadariyas-projects.vercel.app'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use('/', router);

// Connect to DB
DBconnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));