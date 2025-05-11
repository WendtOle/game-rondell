import React from "react";
import { BoardGame } from "./hooks/useBoardGameStorage";
import { Vote } from "./types";
import { Button } from "./components/Button";
import { List } from "./components/List";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isValidSessionState,
  nominatedGamesState,
  sessionState,
  votesState,
} from "./state/sessions";

interface ResultListProps {
  getGameById: (id: string) => BoardGame | undefined;
}

export const ResultList: React.FC<ResultListProps> = ({ getGameById }) => {
  const [session, setSession] = useRecoilState(sessionState);
  const nominatedGameIds = useRecoilValue(nominatedGamesState);
  const votes = useRecoilValue(votesState);
  const isValidSession = useRecoilValue(isValidSessionState);
  const displayResults = session?.finished;

  const result = votes.reduce(
    (acc, curr: Vote) => {
      const { noGoGames, heroGames } = curr;
      return {
        noGo: [...(acc.noGo ?? []), ...(noGoGames ? [noGoGames] : [])],
        favoured: {
          ...acc.favoured,
          ...(heroGames
            ? {
                [heroGames]: (acc[heroGames] ?? 0) + 1,
              }
            : {}),
        },
      };
    },
    {} as { noGo: string[]; favoured: Record<string, number> },
  );

  const likabelityValue = (gameId: string): number => {
    if (result.noGo.includes(gameId)) {
      return -100;
    }
    return result.favoured[gameId] ?? 0;
  };

  const sortedGameIds = [...nominatedGameIds].sort(
    (left, right) => likabelityValue(right) - likabelityValue(left),
  );

  const { isValid, errorMessage } = isValidSession;

  return (
    <div className="mx-auto p-4 flex flex-col space-y-2">
      {displayResults && (
        <div>
          <h1>Abstimmungsergbenissen: </h1>
          <List
            items={sortedGameIds}
            getId={(id) => id}
            itemRenderer={(id) => {
              if (!displayResults) {
                return <></>;
              }
              const isNoGo = result.noGo.includes(id);
              const amountOfStars = !isNoGo ? result.favoured[id] || 0 : 0;
              return (
                <div className="flex flex-row space-x-2">
                  <h3
                    className={`text-3xl text-gray-800 ${isNoGo && "line-through"}`}
                  >
                    {getGameById(id)?.name}
                  </h3>
                  {displayResults && (
                    <div className="flex mt-1">
                      {[...Array(amountOfStars)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>
      )}
      {errorMessage && (
        <h2 className="text-2xl text-red-400">{errorMessage}</h2>
      )}
      {!displayResults && (
        <Button
          disabled={!isValid}
          title="Session beenden und Ergebnisse anzeigen"
          onClick={() =>
            setSession((cur) =>
              cur === undefined ? cur : { ...cur, finished: true },
            )
          }
        />
      )}
    </div>
  );
};
