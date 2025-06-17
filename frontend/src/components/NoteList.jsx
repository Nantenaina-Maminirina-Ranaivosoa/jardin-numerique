import React from 'react';

// Ce composant ne fait qu'une seule chose : afficher une liste de notes.
// Il reçoit les notes via ses "props".
function NoteList({ notes }) {
  // Si la liste est vide, on affiche un message.
  if (notes.length === 0) {
    return <p>Aucune note pour le moment. Créez-en une !</p>;
  }

  return (
    <ul className="note-list">
      {notes.map(note => (
        <li key={note.id} className="note-item">
          <h2>{note.title}</h2>
          <p>Créé le: {new Date(note.created_at).toLocaleDateString('fr-FR')}</p>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;