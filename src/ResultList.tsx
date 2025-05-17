import React from "react";
import { Vote } from "./types";
import { List } from "./components/List";
import { useRecoilValue } from "recoil";
import {
  isValidSessionState,
  nominatedGamesState,
  sessionState,
  votesState,
} from "./state/sessions";
import { boardGamesState } from "./state/boardGames";
import { SimpleList } from "./components/SimpleList";

export const ResultList: React.FC = () => {
  const boardGames = useRecoilValue(boardGamesState);
  const session = useRecoilValue(sessionState);
  const nominatedGameIds = useRecoilValue(nominatedGamesState);
  const votes = useRecoilValue(votesState);
  const isValidSession = useRecoilValue(isValidSessionState);
  const displayResults = session?.finished;

  if (!displayResults) {
    return null;
  }

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
  const { favoured, noGo } = result;

  const likabelityValue = (gameId: string): number => {
    if (result.noGo.includes(gameId)) {
      return -100;
    }
    return result.favoured[gameId] ?? 0;
  };

  const gamesNotMentioned = Object.keys(boardGames).filter(
    (id) => !noGo.includes(id) && !Object.keys(favoured).includes(id),
  );

  const sortedGameIds = [
    ...Object.keys(favoured).filter((id) => !noGo.includes(id)),
  ].sort((left, right) => likabelityValue(right) - likabelityValue(left));

  const { isValid, errorMessage } = isValidSession;

  return (
    <div className="flex gap-y-4 flex-col bg-white shadow-md p-6 rounded-lg">
      <SimpleList
        label="Stimmen von: "
        items={votes.map(({ participant, id }) => ({
          label: participant,
          id,
        }))}
      />
      {noGo.length === 0 ? (
        <p>Keine Vetos eingelegt</p>
      ) : (
        <SimpleList
          label="Veto eingelegt für:"
          items={noGo.map((id) => ({
            id,
            label: boardGames[id]?.name ?? "",
          }))}
        />
      )}
      {sortedGameIds.length === 0 ? (
        <p>Es wurden keine Spiele favourisiert</p>
      ) : (
        <SimpleList
          label="Favourisiert:"
          items={sortedGameIds.map((id) => ({
            id,
            label: `${boardGames[id]?.name ?? ""} (${favoured[id]} Stimme(n))`,
          }))}
        />
      )}
      {gamesNotMentioned.length > 0 && (
        <SimpleList
          label="Nicht erwähnt:"
          items={gamesNotMentioned.map((id) => ({
            id,
            label: boardGames[id]?.name ?? "",
          }))}
        />
      )}
    </div>
  );
};
