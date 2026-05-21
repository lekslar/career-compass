const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('professions')
            .select('*');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;