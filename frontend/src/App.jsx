import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import { fetchBoardData } from "./trelloClientFrontend";
import { createTask, updateTask, deleteTask } from "./api";
import List from "./components/List";

export default function App() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBoard = async () => {
    setLoading(true);
    try {
      const data = await fetchBoardData();
      setLists(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBoard();
  }, []);

  // SOCKET.IO events
  useEffect(() => {
    socket.on("card:created", () => loadBoard());
    socket.on("card:updated", () => loadBoard());
    socket.on("card:deleted", () => loadBoard());
    return () => socket.off();
  }, []);

  const addCard = async (listId, name, desc) => {
    await createTask({
      boardId: import.meta.env.VITE_BOARD_ID,
      listId,
      name,
      desc,
    });
    loadBoard();
  };

  const editCard = async (id, payload) => {
    await updateTask(id, payload);
    loadBoard();
  };

  const removeCard = async (id) => {
    await deleteTask(id);
    loadBoard();
  };

  if (loading) return <h2>Loading board...</h2>;

  return (
    <div className="app">
      <h1>Realtime Trello Board</h1>

      <div className="board">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            onAddCard={addCard}
            onEditCard={editCard}
            onDeleteCard={removeCard}
          />
        ))}
      </div>
    </div>
  );
}
