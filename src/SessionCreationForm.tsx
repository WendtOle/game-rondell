import React, { useState } from "react";
import { GameDuration } from "./types";
import { BoardGame, useLocalBoardGames } from "./useBoardGameStorage";
import { useLocalSessions } from "./useGameSessionStorage";

const gameDuration: GameDuration[] = Object.values(GameDuration);

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
      <h2 className="text-2xl font-bold mb-4">Neue Session anlegen</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Spiele:{" "}
            {(gameIds ?? [])
              .map((gameId) => games.find(({ id }) => gameId === id)?.name)
              .join(", ")}
          </label>
        </div>
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

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={onSave}
          >
            Session anlegen
          </button>
        </div>
      </form>
    </div>
  );
};
