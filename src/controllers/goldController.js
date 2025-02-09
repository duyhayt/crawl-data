import goldServices from '../services/goldServices.js';
class GoldController {
    async fetchGolds(req,res) {
        try {
            const golds = await goldServices.fetchGold();
            res.json(golds);
        } catch (err) {
            res.status(500).json({ message: "❌ Error fetching jobs" });
        }
    }
}

export default new GoldController();