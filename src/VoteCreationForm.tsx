import React, { useState } from "react";
import { BoardGame } from "./hooks/useBoardGameStorage";
import { Session, Vote } from "./types";
import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { TextInput } from "./components/TextInput";
import { SingleSelect } from "./components/SingleSelect";
import { MultiSelect } from "./components/MultiSelect";
import { AddGamePopoverButton } from "./AddGamePopoverButton";

interface VoteCreationFormProps {
  sessionId?: string;
  games: BoardGame[];
  getGameById: (id: string) => BoardGame | undefined;
  getPreviouslyNominatedGames: (sessionId?: string) => string[];
  saveVote: (vote: Omit<Vote, "id" | "createdAt">) => Session;
  setSession: (sessionId: string) => void;
  saveGame: (game: Omit<BoardGame, "id" | "createdAt">) => BoardGame;
}

export const VoteCreationForm = ({
  sessionId,
  games,
  getGameById,
  getPreviouslyNominatedGames,
  saveVote,
  setSession,
  saveGame,
}: VoteCreationFormProps) => {
  const [participant, setParticipant] = useState("");
  const [blocked, setBlocked] = useState<string | undefined>();
  const [hero, setHero] = useState<string | undefined>(undefined);

  const [selected, setSelected] = useState<string[]>([]);
  const overallSelected = () => [
    ...new Set([...getPreviouslyNominatedGames(sessionId), ...selected]),
  ];

  const onSave = () => {
    const session = saveVote({
      participant,
      noGoGames: blocked,
      heroGames: hero,
      nominatedGames: overallSelected(),
    });
    setSession(session.id);
    setParticipant("");
    setBlocked(undefined);
    setHero(undefined);
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
        <MultiSelect
          options={games.map(({ id }) => id)}
          label="Nominierte Spiele"
          selected={overallSelected()}
          onChange={(selected) => setSelected(selected)}
          getOptionLabel={(id) => getGameById(id)?.name}
          disabled={getPreviouslyNominatedGames(sessionId)}
        />
        <AddGamePopoverButton saveGame={saveGame} />
        <SingleSelect
          label="Bevorzugtes Spiel"
          name="complexity"
          value={hero}
          onChange={(e) => setHero(e.target.value)}
          options={overallSelected()}
          getOptionLabel={(id) => getGameById(id)?.name}
        />
        <SingleSelect
          label="Absolutes No-Go-Spiel"
          name="complexity"
          value={blocked}
          onChange={(e) => setBlocked(e.target.value)}
          options={overallSelected()}
          getOptionLabel={(id) => getGameById(id)?.name}
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
