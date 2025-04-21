import React, { useState } from "react";
import { useLocalBoardGames } from "./useBoardGameStorage";
import { useLocalSessions, Vote } from "./useGameSessionStorage";

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
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Neue Stimme abgeben</h2>

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
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium">
            No way
            <select
              name="complexity"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={blocked}
              onChange={(e) => setBlocked(e.target.value)}
            >
              <option value="">Bitte wählen</option>
              {(gameIds() ?? []).map((id) => (
                <option key={id} value={id}>
                  {getGameById(id)?.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Hero
            <select
              name="complexity"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={hero}
              onChange={(e) => setHero(e.target.value)}
            >
              <option value="">Bitte wählen</option>
              {(gameIds() ?? []).map((id) => (
                <option key={id} value={id}>
                  {getGameById(id)?.name}
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
            Stimme abgeben
          </button>
        </div>
      </form>
    </div>
  );
};
