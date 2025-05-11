import { useState, useEffect } from "react";
import { useSessionId } from "./useSessionId";
import { Session, Vote } from "../types";
import { generateId } from "../utils/generateId";

const STORAGE_KEY = "sessions";

export const useLocalSessions = () => {
  const { sessionId } = useSessionId();
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    window.addEventListener("storage", loadSessions);
    loadSessions();
  }, []);

  const loadSessions = (): void => {
    try {
      const storedSessions = localStorage.getItem(STORAGE_KEY);
      if (storedSessions) {
        setSessions(JSON.parse(storedSessions));
      }
    } catch (error) {
      console.error("Fehler beim Laden der Brettspiele:", error);
      setSessions([]);
    }
  };

  const saveSession = (game: Omit<Session, "id" | "createdAt">): Session => {
    try {
      const newSession: Session = {
        ...game,
        id: generateId(),
        createdAt: Date.now(),
      };

      const updatedSessions = [...sessions, newSession];

      set(updatedSessions);

      setSessions(updatedSessions);

      return newSession;
    } catch (error) {
      console.error("Fehler beim Speichern der Sessions:", error);
      throw new Error("Die Session konnte nicht gespeichert werden.");
    }
  };

  const saveVote = (vote: Omit<Vote, "id" | "createdAt">): Session => {
    const fullVote = {
      ...vote,
      createdAt: Date.now(),
      id: generateId(),
    };
    if (!getSessionById()) {
      return saveSession({
        name: "new-sessions",
        votes: [fullVote],
        finished: false,
      });
    }
    const session = getSessionById();
    if (!session) {
      throw new Error();
    }
    const updatedSession = {
      ...session,
      votes: [...session.votes, fullVote],
    };
    updateSession(updatedSession);
    return updatedSession;
  };

  const removeVote = (voteId: string) => {
    const session = getSessionById();
    if (!session) {
      throw new Error();
    }
    const updatedSession = {
      ...session,
      votes: session.votes.filter(({ id }) => id !== voteId),
    };
    updateSession(updatedSession);
    return updatedSession;
  };

  const finishSession = () => {
    const session = getSessionById();
    if (!session) {
      return;
    }
    updateSession({ ...session, finished: true });
  };

  const getPreviouslyNominatedGames = (): string[] => {
    const session = getSessionById();
    if (!session) {
      return [];
    }
    const { votes } = session;
    const nominatedGames = votes.reduce((acc, vote: Vote) => {
      return [...new Set([...acc, ...vote.nominatedGames])];
    }, [] as string[]);
    return nominatedGames;
  };

  const updateSession = (updatedGame: Session): Session => {
    try {
      // Spiel in der Liste finden und aktualisieren
      const updatedGames = sessions.map((game) =>
        game.id === updatedGame.id ? updatedGame : game,
      );

      set(updatedGames);
      setSessions(updatedGames);
      return updatedGame;
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Sessions:", error);
      throw new Error("Die Session konnte nicht aktualisiert werden.");
    }
  };

  const set = (sessions: Session[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    window.dispatchEvent(new StorageEvent("storage"));
  };

  const deleteSession = (id: string): void => {
    try {
      const filteredSessions = sessions.filter((game) => game.id !== id);

      set(filteredSessions);

      setSessions(filteredSessions);
    } catch (error) {
      console.error("Fehler beim Löschen der Session:", error);
      throw new Error("Die Session konnte nicht gelöscht werden.");
    }
  };

  const getSessionById = (): Session | undefined =>
    sessions.find(({ id }) => id === sessionId);

  const nominatedGamesChangedSinceVote = (voteId: string) => {
    const vote = (getSessionById()?.votes ?? []).find(
      ({ id }) => id === voteId,
    );
    if (!vote) {
      return false;
    }
    return vote.nominatedGames.length !== getPreviouslyNominatedGames().length;
  };

  const isValidSession = (): { isValid: boolean; errorMessage?: string } => {
    const session = getSessionById();
    if (!session) {
      return { isValid: false };
    }
    if (session.votes.length < 2) {
      return {
        isValid: false,
        errorMessage: "Es sollten mindestens zwei Stimmen abgegeben werden!",
      };
    }
    if (session.votes.some((vote) => nominatedGamesChangedSinceVote(vote.id))) {
      return {
        isValid: false,
        errorMessage: "Stimmen müssen geupdated werden!",
      };
    }
    return { isValid: true };
  };

  const sessionSummaryList = sessions.map((session) => ({
    id: session.id,
    summary: `Session - ${new Date(session.createdAt).toLocaleString(
      undefined,
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      },
    )} ${session.finished ? "- abgeschlossen" : "- offen"}`,
  }));

  return {
    sessions,
    saveSession,
    updateSession,
    saveVote,
    deleteSession,
    getSessionById,
    refreshGames: loadSessions,
    getPreviouslyNominatedGames,
    sessionSummaryList,
    removeVote,
    isValidSession,
    finishSession,
  };
};
