import React from 'react';

// Le composant reçoit maintenant une deuxième fonction via ses props : onNoteDeleted
function NoteList({ notes, onNoteDeleted }) {
  if (notes.length === 0) {
    return <p>Aucune note pour le moment. Créez-en une !</p>;
  }

  return (
    <ul className="note-list">
      {notes.map(note => (
        <li key={note.id} className="note-item">
          <div className="note-content">
            <h2>{note.title}</h2>
            <p>Créé le: {new Date(note.created_at).toLocaleDateString('fr-FR')}</p>
          </div>
          {/* On ajoute le bouton de suppression */}
          <button 
            className="delete-button"
            onClick={() => onNoteDeleted(note.id)}
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;