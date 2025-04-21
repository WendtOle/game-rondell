import React, { useState } from "react";
import { BoardGame } from "./hooks/useBoardGameStorage";
import { Heading } from "./components/Heading";
import { Button } from "./components/Button";
import { TextInput } from "./components/TextInput";

interface GameCreationFormProps {
  saveGame: (game: Omit<BoardGame, "id" | "createdAt">) => BoardGame;
}

export const GameCreationForm = ({ saveGame }: GameCreationFormProps) => {
  const [name, setName] = useState("");

  const onSave = () => {
    saveGame({
      name,
    });
    setName("");
  };

  return (
    <div className="mx-auto p-4">
      <Heading title="Neues Brettspiel hinzufügen" />
      <div className="space-y-4">
        <TextInput
          label="Name*"
          required
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button title="Spiel hinzufügen" onClick={onSave} />
      </div>
    </div>
  );
};
