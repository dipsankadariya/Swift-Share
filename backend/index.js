import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';
import DBconnection from './database/db.js';

const app = express();

// Configure dotenv
dotenv.config();

// Use CORS with default settings (allows all origins)
app.use(cors());
app.use(cors({
  origin: 'https://swift-share.vercel.app/',
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
