// useLocalBoardGames.ts
import { useState, useEffect } from "react";
import { GameDuration } from "../types";

export interface BoardGame {
  id: string; // Unique identifier
  name: string;
  minPlayers: number;
  maxPlayers: number;
  playingTime: GameDuration;
  createdAt: number; // Timestamp
}

// Schlüssel für localStorage
const STORAGE_KEY = "boardGamesCollection";

export const useLocalBoardGames = () => {
  // State für die Brettspiele
  const [boardGames, setBoardGames] = useState<BoardGame[]>([]);

  // Beim ersten Rendern laden wir die gespeicherten Spiele
  useEffect(() => {
    loadGames();
  }, []);

  /**
   * Lädt Brettspiele aus dem localStorage
   */
  const loadGames = (): void => {
    try {
      const storedGames = localStorage.getItem(STORAGE_KEY);
      if (storedGames) {
        setBoardGames(JSON.parse(storedGames));
      }
    } catch (error) {
      console.error("Fehler beim Laden der Brettspiele:", error);
      // Im Fehlerfall setzen wir ein leeres Array
      setBoardGames([]);
    }
  };

  /**
   * Speichert ein neues Brettspiel im localStorage
   * @param game Das zu speichernde Brettspiel (ohne ID und createdAt)
   * @returns Das gespeicherte Brettspiel mit ID und createdAt
   */
  const saveGame = (game: Omit<BoardGame, "id" | "createdAt">): BoardGame => {
    try {
      // ID und Zeitstempel generieren
      const newGame: BoardGame = {
        ...game,
        id: generateId(),
        createdAt: Date.now(),
      };

      // Neues Spiel zur Liste hinzufügen
      const updatedGames = [...boardGames, newGame];

      // Im localStorage speichern
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));

      // State aktualisieren
      setBoardGames(updatedGames);

      return newGame;
    } catch (error) {
      console.error("Fehler beim Speichern des Brettspiels:", error);
      throw new Error("Das Spiel konnte nicht gespeichert werden.");
    }
  };

  /**
   * Aktualisiert ein vorhandenes Brettspiel
   * @param updatedGame Das aktualisierte Brettspiel (mit ID)
   * @returns Das aktualisierte Brettspiel
   */
  const updateGame = (updatedGame: BoardGame): BoardGame => {
    try {
      // Spiel in der Liste finden und aktualisieren
      const updatedGames = boardGames.map((game) =>
        game.id === updatedGame.id ? updatedGame : game,
      );

      // Im localStorage speichern
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));

      // State aktualisieren
      setBoardGames(updatedGames);

      return updatedGame;
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Brettspiels:", error);
      throw new Error("Das Spiel konnte nicht aktualisiert werden.");
    }
  };

  const deleteGame = (id: string): void => {
    try {
      const filteredGames = boardGames.filter((game) => game.id !== id);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredGames));

      setBoardGames(filteredGames);
    } catch (error) {
      console.error("Fehler beim Löschen des Brettspiels:", error);
      throw new Error("Das Spiel konnte nicht gelöscht werden.");
    }
  };

  const getGameById = (id: string): BoardGame | undefined => {
    return boardGames.find((game) => game.id === id);
  };

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  return {
    games: boardGames, // Liste aller Spiele
    saveGame, // Neues Spiel speichern
    updateGame, // Vorhandenes Spiel aktualisieren
    deleteGame, // Spiel löschen
    getGameById, // Spiel nach ID suchen
    refreshGames: loadGames, // Spiele neu laden
  };
};
