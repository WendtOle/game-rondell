import React, { useState } from "react";
import { useLocalBoardGames } from "./useBoardGameStorage";
import { useLocalSessions, Vote } from "./useGameSessionStorage";

interface ResultListProps {
  sessionId: string;
}

interface Result {
  noGo: number;
  favourized: number;
}

export const ResultList: React.FC<ResultListProps> = ({ sessionId }) => {
  const [displayResults, setDisplayResults] = useState(false);
  const { getSessionById } = useLocalSessions();
  const { getGameById } = useLocalBoardGames();

  const session = getSessionById(sessionId);
  const gameIds = () => session?.gameIds ?? [];
  const votes = () => session?.votes ?? [];

  const result = () => {
    return votes().reduce(
      (acc, curr: Vote) => {
        const { noGoGames, heroGames } = curr;
        const empty = { noGo: 0, favourized: 0 };
        const noGoGame = acc[noGoGames] ?? empty;
        const favourizedGame = acc[heroGames] ?? empty;
        return {
          ...acc,
          [noGoGames]: {
            ...noGoGame,
            noGo: noGoGame.noGo + 1,
          },
          [heroGames]: {
            ...favourizedGame,
            favourized: favourizedGame.favourized + 1,
          },
        };
      },
      {} as Record<string, Result>,
    );
  };

  const likabelityValue = (result?: Result) => {
    if (!result) {
      return 0;
    }
    const { noGo, favourized } = result;
    if (noGo > 0) {
      return -100;
    }
    return favourized;
  };

  const sortedGameIds = () => {
    if (!displayResults) {
      return gameIds();
    }
    return [...gameIds()].sort(
      (left, right) =>
        likabelityValue(result()[right]) - likabelityValue(result()[left]),
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-md flex flex-col space-y-2">
      <h2 className="text-2xl font-bold mb-4">Ergebnisse</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {sortedGameIds().map((gameId) => (
            <li
              key={gameId}
              className={`p-4 transition-colors cursor-pointer hover:bg-gray-50 border-l-4 border-transparent`}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-row space-x-2">
                  <h3
                    className={`text-lg font-semibold text-gray-800 ${result()[gameId]?.noGo > 0 && displayResults && "line-through"}`}
                  >
                    {getGameById(gameId)?.name}
                  </h3>
                  {displayResults && (
                    <div className="flex mt-1">
                      {[...Array(result()[gameId]?.favourized || 0)].map(
                        (_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => setDisplayResults((cur) => !cur)}
        >
          Ergebnis anzeigen
        </button>
      </div>
    </div>
  );
};
