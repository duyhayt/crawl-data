import Job from '../models/Job.js';

class JobServices {
   // Save Jobs
    async saveJobs (jobs) {
        // Xoá dữ liệu trước và đẩy data mới nhất vào
        await Job.deleteMany({});
        console.log("✅ Delete old data"); 
        await Job.insertMany(jobs);
        console.log("✅ Data Crawled & Saved to MongoDB");        
    }

   // Fetch Jobs
    async fetchAllJobs () {
        return await Job.find();
    }
}

export default new JobServices();