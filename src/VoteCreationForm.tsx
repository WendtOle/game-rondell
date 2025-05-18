import React, { useState } from "react";
import { Button } from "./components/Button";
import { TextInput } from "./components/TextInput";
import { SingleSelect } from "./components/SingleSelect";
import { MultiSelect } from "./components/MultiSelect";
import { AddGamePopoverButton } from "./AddGamePopoverButton";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { nominatedGamesState, votesState } from "./state/sessions";
import { generateId } from "./utils/generateId";
import { boardGamesState } from "./state/boardGames";
import { SimpleList } from "./components/SimpleList";
import { voteParticipantNameState } from "./state/voteName";

export const VoteCreationForm = () => {
  const games = useRecoilValue(boardGamesState);
  const setVotes = useSetRecoilState(votesState);
  const nominatedGames = useRecoilValue(nominatedGamesState);
  const [participant, setParticipant] = useRecoilState(
    voteParticipantNameState,
  );
  const [blocked, setBlocked] = useState<string | undefined>();
  const [hero, setHero] = useState<string | undefined>(undefined);

  const [selected, setSelected] = useState<string[]>([]);
  const overallSelected = () => [...new Set([...nominatedGames, ...selected])];

  const onSave = () => {
    const newVote = {
      participant: participant ?? "",
      noGoGames: blocked === "Bitte wählen" ? undefined : blocked,
      heroGames: hero === "Bitte wählen" ? undefined : hero,
      nominatedGames: overallSelected(),
      id: generateId(),
      createdAt: Date.now(),
    };
    setVotes((cur) => [...cur, newVote]);
    setParticipant("");
    setBlocked("Bitte wählen");
    setHero("Bitte wählen");
  };

  const isDisabled = () => {
    if (!participant) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex gap-y-4 flex-col bg-white shadow-md p-6 rounded-lg">
      <TextInput
        label="Name"
        required
        type="text"
        name="name"
        value={participant}
        onChange={(e) => setParticipant(e.target.value)}
      />
      {nominatedGames.length > 0 && (
        <SimpleList
          label="Nominierte Spiele"
          items={nominatedGames.map((id) => (
            <li className="list-disc list-inside">{games[id]?.name}</li>
          ))}
        />
      )}
      <MultiSelect
        options={Object.values(games)
          .map(({ id }) => id)
          .filter((id) => !nominatedGames.includes(id))}
        label={`${nominatedGames.length > 0 ? "Weitere " : ""}Spiele nominieren`}
        selected={overallSelected()}
        onChange={(selected) => setSelected(selected)}
        getOptionLabel={(id) => games[id]?.name}
        disabled={nominatedGames}
      />
      <AddGamePopoverButton />
      <SingleSelect
        label="Bevorzugtes Spiel"
        value={hero}
        onChange={(e) => setHero(e.target.value)}
        options={overallSelected()}
        getOptionLabel={(id) => games[id]?.name}
      />
      <SingleSelect
        label="Absolutes No-Go-Spiel"
        value={blocked}
        onChange={(e) => setBlocked(e.target.value)}
        options={overallSelected()}
        getOptionLabel={(id) => games[id]?.name}
      />
      <div className="w-full flex flex-col items-center">
        <Button
          title="Stimme abgeben"
          onClick={onSave}
          disabled={isDisabled()}
        />
      </div>
    </div>
  );
};
