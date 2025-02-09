import axios from "axios";
import * as cheerio from 'cheerio';
class GoldScraper { 
    async scraperGold() { 
        try {
            // Gửi request lấy HTML từ trang web
            const { data: html } = await axios.get('https://www.pnj.com.vn/site/gia-vang', {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.google.com',
                    'Origin': 'https://www.google.com'
                }
            });
    
            // Load HTML vào cheerio
            const $ = cheerio.load(html);
            console.log(html);
            
            // Mảng chứa kết quả
            let goldPrices = [];
    
            // Duyệt từng dòng trong bảng giá vàng
            $('table.w-full.text-left.border-collapse tbody tr').each((index, element) => {
                const type = $(element).find('td:nth-child(1)').text().trim();
                const buyPrice = $(element).find('td:nth-child(2)').text().trim();
                const sellPrice = $(element).find('td:nth-child(3)').text().trim();
    
                goldPrices.push({ type, buyPrice, sellPrice });
            });
    
            console.log(goldPrices); // In dữ liệu ra console
            return goldPrices;
        } catch (error) {
            console.error("❌ Error scraping data:", error);
        }
    }
}

export default new GoldScraper();