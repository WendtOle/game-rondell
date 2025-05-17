import React, { useState } from "react";
import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { TextInput } from "./components/TextInput";
import { SingleSelect } from "./components/SingleSelect";
import { MultiSelect } from "./components/MultiSelect";
import { AddGamePopoverButton } from "./AddGamePopoverButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nominatedGamesState, votesState } from "./state/sessions";
import { generateId } from "./utils/generateId";
import { boardGamesState } from "./state/boardGames";

export const VoteCreationForm = () => {
  const games = useRecoilValue(boardGamesState);
  const setVotes = useSetRecoilState(votesState);
  const nominatedGames = useRecoilValue(nominatedGamesState);
  const [participant, setParticipant] = useState("");
  const [blocked, setBlocked] = useState<string | undefined>();
  const [hero, setHero] = useState<string | undefined>(undefined);

  const [selected, setSelected] = useState<string[]>([]);
  const overallSelected = () => [...new Set([...nominatedGames, ...selected])];

  const onSave = () => {
    const newVote = {
      participant,
      noGoGames: blocked,
      heroGames: hero,
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
    <div className="mx-auto p-4">
      <Heading title="Neue Stimme abgeben" />
      <div className="space-y-4">
        <TextInput
          label="Name"
          required
          type="text"
          name="name"
          value={participant}
          onChange={(e) => setParticipant(e.target.value)}
        />
        <div>
          <h3 className="block text-3xl mb-2">Bereits nominierte Spiele</h3>
          <ul>
            {nominatedGames.map((game) => (
              <li>{games[game]?.name}</li>
            ))}
          </ul>
        </div>
        <MultiSelect
          options={Object.values(games)
            .map(({ id }) => id)
            .filter((id) => !nominatedGames.includes(id))}
          label="Weitere Spiele nominieren"
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
        <Button
          title="Stimme abgeben"
          onClick={onSave}
          disabled={isDisabled()}
        />
      </div>
    </div>
  );
};
