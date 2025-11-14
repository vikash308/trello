const TRELLO_BASE = "https://api.trello.com/1";
const KEY = import.meta.env.VITE_TRELLO_KEY;
const TOKEN = import.meta.env.VITE_TRELLO_TOKEN;
const BOARD_ID = import.meta.env.VITE_BOARD_ID;

function qs(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");
}

export async function fetchLists() {
  const url = `${TRELLO_BASE}/boards/${BOARD_ID}/lists?${qs({
    key: KEY,
    token: TOKEN,
    cards: "none"
  })}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load lists");
  return res.json();
}

export async function fetchCardsForList(listId) {
  const url = `${TRELLO_BASE}/lists/${listId}/cards?${qs({
    key: KEY,
    token: TOKEN
  })}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load cards");
  return res.json();
}

export async function fetchBoardData() {
  const lists = await fetchLists();
  const listWithCards = await Promise.all(
    lists.map(async (l) => ({
      ...l,
      cards: await fetchCardsForList(l.id)
    }))
  );

  return listWithCards;
}
