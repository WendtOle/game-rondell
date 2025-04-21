import React, { useState } from "react";
import { useLocalBoardGames } from "./useBoardGameStorage";
import { useLocalSessions } from "./useGameSessionStorage";
import { Heading } from "./components/Heading";
import { Button } from "./components/Button";
import { TextInput } from "./components/TextInput";

interface SessionCreationFormProps {
  gameIds: string[];
}

export const SessionCreationForm = ({ gameIds }: SessionCreationFormProps) => {
  const { games } = useLocalBoardGames();
  const { saveSession } = useLocalSessions();
  const [name, setName] = useState("");

  const onSave = () => {
    if (gameIds.length === 0 || !name) {
      return;
    }
    saveSession({ name, gameIds });
  };

  return (
    <div className="mx-auto p-4">
      <Heading title="Neue Session anlegen" />
      <form className="space-y-4">
        <div>
          <label className="block text-4xl font-medium">
            Spiele:{" "}
            {(gameIds ?? [])
              .map((gameId) => games.find(({ id }) => gameId === id)?.name)
              .join(", ")}
          </label>
        </div>
        <TextInput
          label="Name*"
          required
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button title="Session anlegen" onClick={onSave} />
      </form>
    </div>
  );
};
