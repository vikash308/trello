import React from 'react';
import { deleteTask } from '../api';
export default function Card({ card }){
  return (
    <div style={{background:'#fff', padding:8, borderRadius:4, marginBottom:8, boxShadow:'0 1px 2px rgba(0,0,0,0.1)'}}>
      <strong>{card.name}</strong>
      <p>{card.desc}</p>
      <button onClick={deleteTask}>delete</button>
    </div>
  );
}
