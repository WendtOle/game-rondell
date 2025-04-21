import React, { useState } from "react";
import { useLocalBoardGames } from "./useBoardGameStorage";
import { useLocalSessions } from "./useGameSessionStorage";
import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { TextInput } from "./components/TextInput";
import { SingleSelect } from "./components/SingleSelect";

interface VoteCreationFormProps {
  sessionId: string;
}

export const VoteCreationForm = ({ sessionId }: VoteCreationFormProps) => {
  const [participant, setParticipant] = useState("");
  const { saveVote, getSessionById } = useLocalSessions();
  const { getGameById } = useLocalBoardGames();
  const [blocked, setBlocked] = useState<string | undefined>();
  const [hero, setHero] = useState<string | undefined>();

  const gameIds = () => getSessionById(sessionId)?.gameIds;

  const onSave = () => {
    if (!blocked || !hero) {
      return;
    }
    saveVote(sessionId)({
      participant,
      noGoGames: blocked,
      heroGames: hero,
    });
  };

  return (
    <div className="mx-auto p-4">
      <Heading title="Neue Stimme abgeben" />
      <form className="space-y-4">
        <TextInput
          label="Name*"
          required
          type="text"
          name="name"
          value={participant}
          onChange={(e) => setParticipant(e.target.value)}
        />
        <SingleSelect
          label="No way"
          name="complexity"
          value={blocked}
          onChange={(e) => setBlocked(e.target.value)}
          options={gameIds() ?? []}
          getOptionLabel={(id) => getGameById(id)?.name}
        />
        <SingleSelect
          label="Hero"
          name="complexity"
          value={hero}
          onChange={(e) => setHero(e.target.value)}
          options={gameIds() ?? []}
          getOptionLabel={(id) => getGameById(id)?.name}
        />
        <Button title="Stimme abgeben" onClick={onSave} />
      </form>
    </div>
  );
};
