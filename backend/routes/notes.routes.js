import { Router } from 'express';

export default function(db) {
  const router = Router();

  // POST /api/notes - Créer une nouvelle note
  router.post('/', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Le titre et le contenu sont requis." });
    }

    try {
      const result = await db.run(
        'INSERT INTO notes (title, content) VALUES (?, ?)',
        [title, content]
      );
      res.status(201).json({ id: result.lastID, title, content });
    } catch (e) {
      res.status(500).json({ message: "Erreur serveur lors de la création de la note.", error: e.message });
    }
  });

  // GET /api/notes - Récupérer toutes les notes
  router.get('/', async (req, res) => {
    try {
      const notes = await db.all('SELECT id, title, created_at, updated_at FROM notes ORDER BY updated_at DESC');
      res.json(notes);
    } catch (e) {
      res.status(500).json({ message: "Erreur serveur lors de la récupération des notes.", error: e.message });
    }
  });

  // GET /api/notes/:id - Récupérer une note spécifique
  router.get('/:id', async (req, res) => {
    try {
      const note = await db.get('SELECT * FROM notes WHERE id = ?', [req.params.id]);
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({ message: "Note non trouvée." });
      }
    } catch (e) {
      res.status(500).json({ message: "Erreur serveur.", error: e.message });
    }
  });

  // PUT /api/notes/:id - Mettre à jour une note
  router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Le titre et le contenu sont requis." });
    }
    try {
      const result = await db.run(
        "UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [title, content, req.params.id]
      );
      if (result.changes > 0) {
        res.json({ message: "Note mise à jour avec succès." });
      } else {
        res.status(404).json({ message: "Note non trouvée." });
      }
    } catch (e) {
      res.status(500).json({ message: "Erreur serveur.", error: e.message });
    }
  });

  // DELETE /api/notes/:id - Supprimer une note
  router.delete('/:id', async (req, res) => {
    try {
      const result = await db.run('DELETE FROM notes WHERE id = ?', [req.params.id]);
      if (result.changes > 0) {
        res.status(204).send(); // 204 No Content - succès, mais pas de contenu à renvoyer
      } else {
        res.status(404).json({ message: "Note non trouvée." });
      }
    } catch (e) {
      res.status(500).json({ message: "Erreur serveur.", error: e.message });
    }
  });

  return router;
}