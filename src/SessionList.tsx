// BoardGameList.tsx
import React, { useState } from "react";
import { BoardGame, useLocalBoardGames } from "./useBoardGameStorage";
import { Session, useLocalSessions } from "./useGameSessionStorage";
import { List } from "./components/List";

interface SessionListProps {
  onClickSession: (sessionId: string) => void;
}

export const SessionList: React.FC<SessionListProps> = ({ onClickSession }) => {
  const { sessions } = useLocalSessions();
  const { games } = useLocalBoardGames();
  if (sessions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Keine Sessions vorhanden. Füge eine neue Sessions hinzu!</p>
      </div>
    );
  }

  return (
    <List
      items={sessions}
      getId={({ id }) => id}
      onClick={({ id }) => onClickSession(id)}
      itemRenderer={(session) => {
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {session.name}
            </h3>
            <div className="mt-1 text-sm text-gray-500 flex gap-4">
              <span className="flex items-center">
                Spiele:{" "}
                {(session.gameIds ?? [])
                  .map((gameId) => games.find(({ id }) => gameId === id)?.name)
                  .join(", ")}
              </span>
            </div>
          </div>
        );
      }}
    />
  );
};
