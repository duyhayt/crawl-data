import cron from 'node-cron';
import connectDB from '../config/database.js';
import GoldScraper from './scrapers/goldScraper.js';
import JobScraper from './scrapers/jobScrapers.js';
import GoldServices from './services/goldServices.js';
import JobServices from './services/jobServices.js';

// Kết nối MongoDB
connectDB();

// Crawl việc làm
async function crawlAndSaveJobs() {
    console.log('🔄 Starting job scraping...');
    const jobs = await JobScraper.scrapeJobs();
    console.log('List of jobs:', jobs);
    if (jobs.length > 0) {
        await JobServices.saveJobs(jobs);
    }
}

// Crawl giá vàng
async function crawlAndSavePrices() {
    console.log('🔄 Starting price scraping...');
    const golds = await GoldScraper.scraperGold();
    console.log('List of prices:', golds);
    await GoldServices.saveGold(golds);
    // if (prices.length > 0) {
    //     await GoldServices.saveGold(golds);
    // }
}

// Chạy hàm crawl sau mỗi 59 phút
cron.schedule('*/59 * * * *', () => {
    console.log('Running a task every 1 minute');
    crawlAndSaveJobs();
    crawlAndSavePrices();
});

// Chạy ngay khi khởi động
crawlAndSaveJobs();
crawlAndSavePrices();