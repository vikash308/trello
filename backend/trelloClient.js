const axios = require("axios");

const TRELLO_BASE = "https://api.trello.com/1";

function auth(key, token) {
    return { key, token };
}

module.exports = {
    // ✔ Create Card
    createCard: async (key, token, idList, name, desc = "") => {
        const url = `${TRELLO_BASE}/cards`;

        const res = await axios.post(url, null, {
            params: {
                ...auth(key, token),
                idList,
                name,
                desc
            }
        });

        return res.data;
    },

    // ✔ Update Card
    updateCard: async (key, token, cardId, payload) => {
        const url = `${TRELLO_BASE}/cards/${cardId}`;

        const res = await axios.put(url, null, {
            params: {
                ...auth(key, token),
                ...payload
            }
        });

        return res.data;
    },

    // ✔ Close Card
    closeCard: async (key, token, cardId) => {
        const url = `${TRELLO_BASE}/cards/${cardId}`;

        const res = await axios.put(url, null, {
            params: {
                ...auth(key, token),
                closed: true
            }
        });

        return res.data;
    },

    // ✔ Create Board
    createBoard: async (key, token, name, defaultLists = true) => {
        const url = `${TRELLO_BASE}/boards/`;

        const res = await axios.post(url, null, {
            params: {
                ...auth(key, token),
                name,
                defaultLists
            }
        });

        return res.data;
    },

};
