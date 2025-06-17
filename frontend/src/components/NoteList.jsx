import React from 'react';
import NoteItem from './NoteItem'; // On importe le nouveau composant

// NoteList devient un simple "passe-plat"
function NoteList({ notes, onNoteDeleted, onNoteUpdated }) {
  if (notes.length === 0) {
    return <p>Aucune note pour le moment. Créez-en une !</p>;
  }

  return (
    <ul className="note-list">
      {notes.map(note => (
        <NoteItem 
          key={note.id}
          note={note}
          onNoteDeleted={onNoteDeleted}
          onNoteUpdated={onNoteUpdated}
        />
      ))}
    </ul>
  );
}

export default NoteList;