import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';
import DBconnection from './database/db.js';

const app = express();

dotenv.config();

app.use(cors({
  origin: [
    'https://swift-share-rjhwdx0bv-dipsankadariyas-projects.vercel.app',
    'https://swift-share-ecbfw3rz2-dipsankadariyas-projects.vercel.app',
    'https://swift-share.vercel.app'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/uploads', express.static('uploads'));
app.use('/', router);

DBconnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));