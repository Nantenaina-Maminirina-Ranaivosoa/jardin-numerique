// Importer le framework Express
import express from 'express';

// Définir le port d'écoute. Soit celui défini dans l'environnement, soit 5000 par défaut.
const PORT = process.env.PORT || 5000;

// Créer une instance de l'application Express
const app = express();

// Middleware pour permettre à Express de lire le JSON envoyé dans les requêtes (body-parser)
app.use(express.json());

// Définition d'une route de test sur la racine de l'API
// GET http://localhost:5000/api/
app.get('/api/', (req, res) => {
  // On répond avec un simple message JSON pour confirmer que ça fonctionne
  res.json({ message: "Bienvenue sur l'API de votre Jardin Numérique !" });
});

// Démarrer le serveur et écouter les requêtes sur le port défini
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});