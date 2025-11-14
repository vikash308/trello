import React, { useState } from "react";
import Card from "./Card";

export default function List({ list, onAddCard, onEditCard, onDeleteCard }) {
  const [newCard, setNewCard] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="list">
      <h3>{list.name}</h3>

      {list.cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onEdit={onEditCard}
          onDelete={onDeleteCard}
        />
      ))}

      {newCard ? (
        <div className="add-card-form">
          <input
            className="add-card-input"
            placeholder="Card title..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="add-card-textarea"
            placeholder="Description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <div className="add-card-buttons">
            <button
              className="add-btn"
              onClick={() => {
                onAddCard(list.id, name, desc);
                setName("");
                setDesc("");
                setNewCard(false);
              }}
            >
              Add
            </button>
            <button className="cancel-btn" onClick={() => setNewCard(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button className="add-btn" onClick={() => setNewCard(true)}>
          + Add Card
        </button>
      )}
    </div>
  );
}
