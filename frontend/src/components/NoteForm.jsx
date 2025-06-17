import React, { useState } from 'react';

// Le composant reçoit une fonction `onNoteCreated` via ses props.
// Il appellera cette fonction quand une note sera créée avec succès.
function NoteForm({ onNoteCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    setError(null); // Réinitialise les erreurs

    if (!title || !content) {
      setError('Le titre et le contenu sont requis.');
      return;
    }

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la note');
      }

      const newNote = await response.json();
      
      // On appelle la fonction passée en props avec la nouvelle note
      onNoteCreated(newNote);

      // On vide les champs du formulaire
      setTitle('');
      setContent('');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>Créer une nouvelle note</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Titre de la note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenu de la note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
      ></textarea>
      <button type="submit">Créer la note</button>
    </form>
  );
}

export default NoteForm;