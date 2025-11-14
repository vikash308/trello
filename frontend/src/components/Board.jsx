import React from "react";
import List from "./List";
import "./board.css";

export default function Board() {
  const lists = [
    { id: "list-1", title: "To Do", cards: [] },
    { id: "list-2", title: "Doing", cards: [] },
    { id: "list-3", title: "Done", cards: [] },
  ];

  return (
    <div className="board">
      {lists.map((l) => (
        <List key={l.id} list={l} />
      ))}
    </div>
  );
}
