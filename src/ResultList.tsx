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
import { Stars } from "./Stars";

export const ResultList: React.FC = () => {
  const boardGames = useRecoilValue(boardGamesState);
  const session = useRecoilValue(sessionState);
  const nominatedGameIds = useRecoilValue(nominatedGamesState);
  const votes = useRecoilValue(votesState);
  const displayResults = session?.finished;

  if (!displayResults) {
    return null;
  }

  const result = votes.reduce(
    (acc, curr: Vote) => {
      const { noGoGames, heroGames } = curr;
      return {
        noGo: [...new Set([...acc.noGo, ...(noGoGames ? [noGoGames] : [])])],
        favoured: {
          ...acc.favoured,
          ...(heroGames
            ? {
                [heroGames]: (acc.favoured[heroGames] ?? 0) + 1,
              }
            : {}),
        },
      };
    },
    { noGo: [], favoured: {} } as {
      noGo: string[];
      favoured: Record<string, number>;
    },
  );
  const { favoured, noGo } = result;

  const favouredWithoutNoGo = Object.keys(favoured).reduce((acc, curr) => {
    if (noGo.includes(curr)) {
      return acc;
    }
    return [...acc, curr];
  }, [] as string[]);

  const gamesNotMentioned = nominatedGameIds.filter(
    (id) => !noGo.includes(id) && !Object.keys(favoured).includes(id),
  );

  const possibleToPlay = [
    ...favouredWithoutNoGo.sort(
      (left, right) => favoured[right] - favoured[left],
    ),
    ...gamesNotMentioned,
  ];

  return (
    <div className="flex gap-y-4 flex-col bg-white shadow-md p-6 rounded-lg">
      {possibleToPlay.length === 0 ? (
        <p>Kein Ergebnis gefunden</p>
      ) : (
        <SimpleList
          label={
            favouredWithoutNoGo.length > 0 ? "Favouriten:" : "Unentschieden"
          }
          items={possibleToPlay.map((id) => (
            <li
              className="flex items-center gap-x-4 list-disc list-inside"
              key={id}
            >
              {boardGames[id]?.name ?? ""}
              {favoured[id] && <Stars amount={favoured[id]} />}
            </li>
          ))}
        />
      )}
      {noGo.length > 0 && (
        <SimpleList
          label="Ausgeschlossen:"
          items={noGo.map((id) => (
            <li key={id}>{boardGames[id]?.name ?? ""}</li>
          ))}
        />
      )}
      <SimpleList
        label="Stimmen von: "
        items={votes.map(({ id, participant }) => (
          <li key={id}>{participant}</li>
        ))}
      />
    </div>
  );
};
