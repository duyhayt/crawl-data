import express from 'express';
import jobController from '../controllers/jobController.js';

const router = express.Router();

router.get('/jobs', jobController.fetchAllJobs);

export default router;
