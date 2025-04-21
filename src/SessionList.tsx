// BoardGameList.tsx
import React from "react";
import { useLocalBoardGames } from "./useBoardGameStorage";
import { useLocalSessions } from "./useGameSessionStorage";
import { List } from "./components/List";

interface SessionListProps {
  onClickSession: (sessionId: string) => void;
}

export const SessionList: React.FC<SessionListProps> = ({ onClickSession }) => {
  const { sessions } = useLocalSessions();
  const { games } = useLocalBoardGames();
  if (sessions.length === 0) {
    return (
      <div className="p-4 text-2xl text-center text-gray-500">
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
            <h3 className="text-4xl text-gray-800">{session.name}</h3>
            <div className="mt-1 text-xl text-gray-500 flex gap-4">
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
