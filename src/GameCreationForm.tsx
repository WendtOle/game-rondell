import React from "react";

type GameDuration = "Filler" | "Normal" | "Brecher";

export const GameCreationForm = () => {
  const gameDuration: GameDuration[] = ["Filler", "Normal", "Brecher"];

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Neues Brettspiel hinzufügen</h2>

      <form className="space-y-4">
        {/* Name (Pflichtfeld) */}
        <div>
          <label className="block text-sm font-medium">
            Name*
            <input
              type="text"
              name="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          {/* Fehleranzeige würde hier erscheinen */}
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
              name="complexity"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Zurücksetzen
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Spiel hinzufügen
          </button>
        </div>
      </form>
    </div>
  );
};
