// Importer les bibliothèques nécessaires
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Cette fonction va initialiser la connexion à la base de données
// et créer la table 'notes' si elle n'existe pas encore.
export async function initDb() {
  try {
    const db = await open({
      filename: './garden.sqlite3', // Nom du fichier de la base de données
      driver: sqlite3.Database
    });

    // Activer les contraintes de clés étrangères
    await db.exec('PRAGMA foreign_keys = ON;');

    // Définition du schéma de la table 'notes'
    const schema = `
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Exécuter la requête de création de table
    await db.exec(schema);

    console.log("✅ Base de données connectée et schéma vérifié.");
    return db;

  } catch (e) {
    console.error("❌ Erreur lors de l'initialisation de la base de données", e);
    // Si la connexion échoue, on arrête l'application
    process.exit(1);
  }
}