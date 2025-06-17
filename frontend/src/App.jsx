import { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        if (!response.ok) throw new Error('La réponse du réseau n\'était pas ok');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

 const handleNoteCreated = (newNote) => {
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  // NOUVELLE FONCTION : pour gérer la suppression
  const handleNoteDeleted = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la note');
      }

      // Si la suppression a réussi, on met à jour l'état de l'UI
      // en filtrant la note supprimée de la liste.
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));

    } catch (error) {
      // On pourrait afficher une erreur plus visible à l'utilisateur
      console.error("Erreur de suppression:", error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Mon Jardin Numérique</h1>
      </header>
      <main>
        <NoteForm onNoteCreated={handleNoteCreated} />
        <div className="notes-section">
          <h2>Mes Notes</h2>
          {loading && <p>Chargement des notes...</p>}
          {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
          {!loading && !error && (
            <NoteList 
              notes={notes} 
              onNoteDeleted={handleNoteDeleted} // On passe la fonction en prop
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App;
