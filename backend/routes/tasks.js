const express = require('express');
const router = express.Router();
const tc = require('../trelloClient');

router.post('/', async (req, res) => {
    console.log("BACKEND REQ BODY =", req.body);

    try {
        const { boardId, listId, name, desc } = req.body;

        console.log("listId =>", listId);
        console.log("boardId =>", boardId);

        const card = await tc.createCard(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN, listId, name, desc);
        req.app.get('io').emit('card:created', card);
        res.json(card);
    } catch (err) {
        console.error("TRELLO ERROR =", err.response?.data);
        res.status(500).json({ error: 'Create card failed' });
    }
});


router.put('/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;
        const payload = req.body; // { name, desc, idList }
        const card = await tc.updateCard(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN, cardId, payload);
        req.app.get('io').emit('card:updated', card);
        res.json(card);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Update card failed' });
    }
});

router.delete('/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;
        const closed = await tc.closeCard(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN, cardId);
        req.app.get('io').emit('card:deleted', { id: cardId });
        res.json({ success: true });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Delete card failed' });
    }
});

module.exports = router;
