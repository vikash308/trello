const express = require('express');
const router = express.Router();
const tc = require('../trelloClient');

router.post('/', async (req, res) => {
    try {
        const { name, defaultLists = true } = req.body;
        const board = await tc.createBoard(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN, name, defaultLists);
        req.app.get('io').emit('board:created', board);
        res.json(board);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Create board failed' });
    }
});

module.exports = router;
