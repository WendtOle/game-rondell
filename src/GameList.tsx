// BoardGameList.tsx
import React from "react";
import { BoardGame } from "./useBoardGameStorage";
import { List } from "./components/List";

interface BoardGameListProps {
  games: BoardGame[];
  selected?: string[];
  onSelectGame?: (id: string) => void;
}

export const BoardGameList: React.FC<BoardGameListProps> = ({
  games,
  selected,
  onSelectGame,
}) => {
  if (games.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Keine Brettspiele vorhanden. Füge ein neues Spiel hinzu!</p>
      </div>
    );
  }

  return (
    <List
      items={games}
      getId={({ id }) => id}
      onClick={onSelectGame ? ({ id }) => onSelectGame(id) : undefined}
      isSelected={selected ? ({ id }) => selected?.includes(id) : undefined}
      itemRenderer={(game) => {
        return (
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-4xl text-gray-800">{game.name}</h3>
              <div className="mt-1 text-xl text-gray-500 flex gap-4">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {game.minPlayers === game.maxPlayers
                    ? `${game.minPlayers} Spieler`
                    : `${game.minPlayers}-${game.maxPlayers} Spieler`}
                </span>

                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {game.playingTime}
                </span>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};
