import React, { useState } from "react";
import { Game, GameDuration } from "./types";
import { useLocalBoardGames } from "./useBoardGameStorage";

const gameDuration: GameDuration[] = Object.values(GameDuration);

export const GameCreationForm = () => {
  const [name, setName] = useState("");
  const [minPlayer, setMinPalyer] = useState(2);
  const [maxPlayer, setMaxPalyer] = useState(4);
  const [duration, setDuartion] = useState<GameDuration | undefined>();
  const { saveGame } = useLocalBoardGames();

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
  };

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Neues Brettspiel hinzufügen</h2>
      <form className="space-y-4">
        {/* Name (Pflichtfeld) */}
        <div>
          <label className="block text-sm font-medium">
            Name*
            <input
              required
              type="text"
              name="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        {/* Spieleranzahl (Pflichtfeld) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Min. Spieler*
              <input
                type="number"
                name="minPlayers"
                min="1"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={minPlayer}
                onChange={(e) => setMinPalyer(+e.target.value)}
              />
            </label>
            {/* Fehleranzeige würde hier erscheinen */}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Max. Spieler*
              <input
                type="number"
                name="maxPlayers"
                min="1"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={maxPlayer}
                onChange={(e) => setMaxPalyer(+e.target.value)}
              />
            </label>
            {/* Fehleranzeige würde hier erscheinen */}
          </div>
        </div>

        {/* Spieldauer (Pflichtfeld) */}
        <div>
          <label className="block text-sm font-medium">
            Spieldauer*
            <select
              required
              name="complexity"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={duration}
              onChange={(e) => setDuartion(e.target.value as GameDuration)}
            >
              <option value="">Bitte wählen</option>
              {gameDuration.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={onSave}
          >
            Spiel hinzufügen
          </button>
        </div>
      </form>
    </div>
  );
};
