import express from 'express';
import { initDb } from './database.js'; // Importer notre initialisateur de DB
import notesRoutes from './routes/notes.routes.js'; // Importer la fonction du routeur

// Définir le port
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware pour le JSON
app.use(express.json());

// Fonction principale pour démarrer le serveur
async function startServer() {
  // Initialiser la base de données et récupérer l'objet de connexion
  const db = await initDb();

  // Route de test
  app.get('/api/', (req, res) => {
    res.json({ message: "Bienvenue sur l'API de votre Jardin Numérique !" });
  });

  // Utiliser le routeur pour les notes
  // Toutes les routes définies dans notes.routes.js seront préfixées par /api/notes
  app.use('/api/notes', notesRoutes(db));

  // Démarrer le serveur
  app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
  });
}

// Lancer le serveur
startServer();