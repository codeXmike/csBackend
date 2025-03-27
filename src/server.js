import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import materialRoutes from './routes/material.js';
import courseRoutes from './routes/courseRoutes.js'
import connectDB from './config/db.js';
import cors from 'cors'


dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'https://cs-class.vercel.app',
  credentials: true,
}));

app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/courses', courseRoutes);


app.get('/', (req, res) => {
  res.send('Course Material API is running');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
