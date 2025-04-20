// useLocalBoardGames.ts
import { useState, useEffect } from "react";

export interface Session {
  id: string; // Unique identifier
  name: string;
  createdAt: number; // Timestamp
  gameIds: string[];
}

// Schlüssel für localStorage
const STORAGE_KEY = "sessions";

export const useLocalSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  // Beim ersten Rendern laden wir die gespeicherten Spiele
  useEffect(() => {
    loadGames();
  }, []);

  /**
   * Lädt Brettspiele aus dem localStorage
   */
  const loadGames = (): void => {
    try {
      const storedSessions = localStorage.getItem(STORAGE_KEY);
      if (storedSessions) {
        setSessions(JSON.parse(storedSessions));
      }
    } catch (error) {
      console.error("Fehler beim Laden der Brettspiele:", error);
      // Im Fehlerfall setzen wir ein leeres Array
      setSessions([]);
    }
  };

  /**
   * Speichert ein neues Brettspiel im localStorage
   * @param game Das zu speichernde Brettspiel (ohne ID und createdAt)
   * @returns Das gespeicherte Brettspiel mit ID und createdAt
   */
  const saveSession = (game: Omit<Session, "id" | "createdAt">): Session => {
    try {
      // ID und Zeitstempel generieren
      const newSession: Session = {
        ...game,
        id: generateId(),
        createdAt: Date.now(),
      };

      // Neues Spiel zur Liste hinzufügen
      const updatedSessions = [...sessions, newSession];

      // Im localStorage speichern
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));

      // State aktualisieren
      setSessions(updatedSessions);

      return newSession;
    } catch (error) {
      console.error("Fehler beim Speichern der Sessions:", error);
      throw new Error("Die Session konnte nicht gespeichert werden.");
    }
  };

  /**
   * Aktualisiert ein vorhandenes Brettspiel
   * @param updatedGame Das aktualisierte Brettspiel (mit ID)
   * @returns Das aktualisierte Brettspiel
   */
  const updateSession = (updatedGame: Session): Session => {
    try {
      // Spiel in der Liste finden und aktualisieren
      const updatedGames = sessions.map((game) =>
        game.id === updatedGame.id ? updatedGame : game,
      );

      // Im localStorage speichern
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));

      // State aktualisieren
      setSessions(updatedGames);

      return updatedGame;
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Sessions:", error);
      throw new Error("Die Session konnte nicht aktualisiert werden.");
    }
  };

  /**
   * Löscht ein Brettspiel aus dem localStorage
   * @param id ID des zu löschenden Brettspiels
   */
  const deleteSession = (id: string): void => {
    try {
      // Spiel aus der Liste entfernen
      const filteredSessions = sessions.filter((game) => game.id !== id);

      // Im localStorage speichern
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSessions));

      // State aktualisieren
      setSessions(filteredSessions);
    } catch (error) {
      console.error("Fehler beim Löschen der Session:", error);
      throw new Error("Die Session konnte nicht gelöscht werden.");
    }
  };

  /**
   * Gibt ein einzelnes Brettspiel anhand seiner ID zurück
   * @param id ID des gesuchten Brettspiels
   * @returns Das gefundene Brettspiel oder undefined
   */
  const getSessionById = (id: string): Session | undefined => {
    return sessions.find((game) => game.id === id);
  };

  /**
   * Generiert eine eindeutige ID
   * @returns Eindeutige ID als String
   */
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  return {
    sessions, // Liste aller Spiele
    saveSession, // Neues Spiel speichern
    updateSession, // Vorhandenes Spiel aktualisieren
    deleteSession, // Spiel löschen
    getSessionById, // Spiel nach ID suchen
    refreshGames: loadGames, // Spiele neu laden
  };
};
