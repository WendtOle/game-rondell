// BoardGameList.tsx
import React, { useState } from "react";
import { BoardGame } from "./useBoardGameStorage";

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
  const onDeleteGame = undefined;
  if (games.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Keine Brettspiele vorhanden. Füge ein neues Spiel hinzu!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {games.map((game) => (
            <li
              key={game.id}
              className={`p-4 transition-colors cursor-pointer ${
                (selected ?? []).includes(game.id)
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "hover:bg-gray-50 border-l-4 border-transparent"
              }`}
              onClick={() => onSelectGame?.(game.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {game.name}
                  </h3>
                  <div className="mt-1 text-sm text-gray-500 flex gap-4">
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

                {onDeleteGame && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteGame(game.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Löschen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
