import express from 'express';
import goldController from '../controllers/goldController.js';

const router = express.Router();

router.get('/golds', goldController.fetchGolds);

export default router;
