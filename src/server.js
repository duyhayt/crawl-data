import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from '../config/database.js';
import jobRoutes from './routes/jobRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Routes
app.use('/api/v1', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
