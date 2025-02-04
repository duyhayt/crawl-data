import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/database.js';
import Job from './src/models/Job.js';

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// API lấy danh sách công việc
app.get('/api/v1/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "❌ Error fetching jobs" });
    }
});

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
