import axios from 'axios';
import * as cheerio from 'cheerio';
import 'dotenv/config';
import cron from 'node-cron';
import connectDB from './config/database.js';
import Job from './src/models/Job.js';

// Connect mongoose
connectDB();

// Crawler function
async function scrapeJobs() {
    try {
        const { data:html } = await axios.get('https://123job.vn/tuyen-dung', {
            headers: { 'User-Agent': 'Mozilla/5.0'}
        });

        const $ = cheerio.load(html);
        let jobs = [];

        $('.job__list-item').each((index, el) => {
            const job = $(el).find('.job__list-item-title a').text().trim();
            const company = $(el).find('.job__list-item-company span').text().trim();
            const address = $(el).find('.job__list-item-info .address').text().trim();
            const salary = $(el).find('.job__list-item-info .salary').text().trim();

            jobs.push({ job, company, address, salary });
        });
        console.log(jobs);
        
        // Xoá dữ liệu trước và đẩy data mới nhất vào
        await Job.deleteMany({});
        await Job.insertMany(jobs);
        console.log("✅ Data Crawled & Saved to MongoDB");

        // mongoose.connection.close();
    } catch (err) {
        console.error("❌ Error scraping data:", err);
    }
}

// Running a task every 1 minute
cron.schedule('*/1 * * * *', () => {
    console.log('Running a task every 1 minute');
    scrapeJobs();
});

// Chạy hàm crawl
scrapeJobs();