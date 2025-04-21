import React, { useState } from "react";
import { GameDuration } from "./types";
import { BoardGame } from "./useBoardGameStorage";
import { Heading } from "./components/Heading";
import { Button } from "./components/Button";
import { TextInput } from "./components/TextInput";
import { SingleSelect } from "./components/SingleSelect";

const gameDuration: GameDuration[] = Object.values(GameDuration);

interface GameCreationFormProps {
  saveGame: (game: Omit<BoardGame, "id" | "createdAt">) => BoardGame;
}

export const GameCreationForm = ({ saveGame }: GameCreationFormProps) => {
  const [name, setName] = useState("");
  const [minPlayer, setMinPalyer] = useState(2);
  const [maxPlayer, setMaxPalyer] = useState(4);
  const [duration, setDuartion] = useState<GameDuration | undefined>();

  const onSave = () => {
    if (!duration) {
      return;
    }
    saveGame({
      name,
      minPlayers: minPlayer,
      maxPlayers: maxPlayer,
      playingTime: duration,
    });
    setName("");
    setMinPalyer(2);
    setMaxPalyer(4);
    setDuartion(undefined);
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
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Min. Spieler*"
            type="number"
            name="minPlayers"
            min="1"
            value={minPlayer}
            onChange={(e) => setMinPalyer(+e.target.value)}
          />
          <TextInput
            label="Max. Spieler*"
            type="number"
            name="maxPlayers"
            min="1"
            value={maxPlayer}
            onChange={(e) => setMaxPalyer(+e.target.value)}
          />
        </div>
        <SingleSelect
          label="Spieldauer*"
          options={gameDuration}
          required
          name="complexity"
          value={duration}
          onChange={(e) => setDuartion(e.target.value as GameDuration)}
        />
        <Button title="Spiel hinzufügen" onClick={onSave} />
      </div>
    </div>
  );
};
