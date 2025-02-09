import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import cron from 'node-cron';
import connectDB from '../config/database.js';
import goldRoutes from './routes/goldRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import jobScrapers from './scrapers/jobScrapers.js';
import jobServices from './services/jobServices.js';

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// /----------- Crawl data -----------/ //
// Crawl data việc làm
async function crawlAndSaveJobs() {
    console.log('🔄 Starting job scraping...');
    const jobs = await jobScrapers.scrapeJobs();
    console.log('List of jobs:', jobs);
    if (jobs.length > 0) {
        await jobServices.saveJobs(jobs);
    }
}

// Crawl data giá vàng
// async function crawlAndSaveGoldPrices() {
//     console.log('🔄 Starting price scraping...');
//     const golds = await goldScraper.scraperGold();
//     console.log('List of prices:', golds);
//     await goldServices.saveGold(golds);
//     // if (prices.length > 0) {
//     //     await GoldServices.saveGold(golds);
//     // }
// }

// Chạy hàm crawl data sau mỗi 59 phút
cron.schedule('*/5 * * * *', () => {
    console.log('Running a task every 5 minute');
    crawlAndSaveJobs();
    // crawlAndSaveGoldPrices();
});

// Chạy ngay khi khởi động
crawlAndSaveJobs();
// crawlAndSaveGoldPrices();

// Routes
app.get('/', (req, res) => res.send('Hello World! this is duyhayt'));
app.use('/api/v1', jobRoutes);
app.use('/api/v1', goldRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));