import { useState, useEffect } from "react";
import NoteList from './components/NoteList';   // Importer NoteList
import NoteForm from './components/NoteForm';   // Importer NoteForm

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        if (!response.ok)
          throw new Error("La réponse du réseau n'était pas ok");
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

  // Cette fonction sera passée en prop à NoteForm
  const handleNoteCreated = (newNote) => {
    // On met à jour l'état des notes en ajoutant la nouvelle au début de la liste
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };


  return (
    <div className="container">
      <header>
        <h1>Mon Jardin Numérique</h1>
      </header>
      <main>
{/* On passe la fonction de mise à jour au formulaire */}
        <NoteForm onNoteCreated={handleNoteCreated} />

        <div className="notes-section">
          <h2>Mes Notes</h2>
          {loading && <p>Chargement des notes...</p>}
          {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
          {!loading && !error && (
            /* On passe la liste des notes à notre composant d'affichage */
            <NoteList notes={notes} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App;
