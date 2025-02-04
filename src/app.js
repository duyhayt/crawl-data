import cron from 'node-cron';
import connectDB from '../config/database.js';
import JobScraper from './scrapers/jobScrapers.js';
import JobServices from './services/jobServices.js';

// Kết nối MongoDB
connectDB();

async function crawlAndSaveJobs() {
    console.log('🔄 Starting job scraping...');
    const jobs = await JobScraper.scrapeJobs();
    console.log('List of jobs:', jobs);
    if (jobs.length > 0) {
        await JobServices.saveJobs(jobs);
    }
}

// Chạy hàm crawl sau mỗi 1 phút
cron.schedule('*/1 * * * *', () => {
    console.log('Running a task every 1 minute');
    crawlAndSaveJobs();
});

// Chạy ngay khi khởi động
crawlAndSaveJobs();