import Gold from '../models/Gold.js';

class GoldServices {
   // Save gold
    async saveGold (golds) {
        // Xoá dữ liệu trước và đẩy data mới nhất vào
        await Gold.deleteMany({});
        console.log("✅ Delete old data"); 
        await Gold.insertMany(golds);
        console.log("✅ Data Crawled & Saved to MongoDB");        
    }

   // Fetch Jobs
    async fetchGold () {
        return await Gold.find();
    }
}

export default new GoldServices();