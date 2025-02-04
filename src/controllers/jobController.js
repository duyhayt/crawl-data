import jobServices from '../services/jobServices.js';
class JobController {
    async fetchAllJobs(req,res) {
        try {
            const jobs = await jobServices.fetchAllJobs();
            res.json(jobs);
        } catch (err) {
            res.status(500).json({ message: "❌ Error fetching jobs" });
        }
    }
}

export default new JobController();