import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';
import DBconnection from './database/db.js';

const app = express();

dotenv.config();

// Minimal CORS config
app.use(cors({
  origin:'*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],

}));

app.use('/', router);

// Connect to DB
DBconnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));