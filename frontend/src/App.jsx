import { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect pour récupérer les données au chargement du composant
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Grâce au proxy, on peut appeler notre API directement
        const response = await fetch('/api/notes');
        
        if (!response.ok) {
          throw new Error('La réponse du réseau n\'était pas ok');
        }

        const data = await response.json();
        setNotes(data); // On met à jour l'état avec les notes reçues
      } catch (error) {
        setError(error.message); // On stocke le message d'erreur
      } finally {
        setLoading(false); // On arrête le chargement dans tous les cas
      }
    };

    fetchNotes();
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une seule fois

  return (
    <div>
      <header>
        <h1>Mon Jardin Numérique</h1>
      </header>
      <main>
        {loading && <p>Chargement des notes...</p>}
        {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
        {!loading && !error && (
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                <h2>{note.title}</h2>
                <small>Créé le: {new Date(note.created_at).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default App