import axios from 'axios';
import * as cheerio from 'cheerio';

class JobScraper {
    async scrapeJobs() {
        try {
            const { data:html } = await axios.get('https://123job.vn/tuyen-dung', {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.google.com',
                    'Origin': 'https://www.google.com'
                }
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
            
            return jobs;
        } catch (err) {
            console.error("❌ Error scraping data:", err);
        }
    }
}

export default new JobScraper();