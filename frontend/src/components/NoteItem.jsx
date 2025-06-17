import React, { useState } from 'react';

// Ce composant reçoit la note, et toutes les fonctions pour interagir avec elle.
function NoteItem({ note, onNoteDeleted, onNoteUpdated }) {
  // `isEditing` va déterminer si on affiche la note ou le formulaire d'édition.
  const [isEditing, setIsEditing] = useState(false);
  
  // On crée des états locaux pour les champs du formulaire d'édition.
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = async () => {
    // On appelle la fonction de mise à jour passée par App.jsx
    await onNoteUpdated(note.id, { title, content });
    // Une fois la sauvegarde terminée, on quitte le mode édition.
    setIsEditing(false);
  };

  const handleCancel = () => {
    // On annule les changements en restaurant les valeurs initiales
    setTitle(note.title);
    setContent(note.content);
    // Et on quitte le mode édition
    setIsEditing(false);
  };
  
  // Si nous sommes en mode édition, on affiche le formulaire.
  if (isEditing) {
    return (
      <li className="note-item editing">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
        ></textarea>
        <div className="note-actions">
          <button onClick={handleSave} className="save-button">Enregistrer</button>
          <button onClick={handleCancel} className="cancel-button">Annuler</button>
        </div>
      </li>
    );
  }

  // Sinon, on affiche la note normalement.
  return (
    <li className="note-item">
      <div className="note-content">
        <h2>{note.title}</h2>
        <p>{note.content}</p> {/* On affiche maintenant le contenu aussi */}
        <small>Dernière modif.: {new Date(note.updated_at).toLocaleString('fr-FR')}</small>
      </div>
      <div className="note-actions">
        <button onClick={() => setIsEditing(true)} className="edit-button">Modifier</button>
        <button onClick={() => onNoteDeleted(note.id)} className="delete-button">Supprimer</button>
      </div>
    </li>
  );
}

export default NoteItem;