import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { TextInput } from "./components/TextInput";
import { useSetRecoilState } from "recoil";
import { boardGamesState } from "./state/boardGames";
import { generateId } from "./utils/generateId";

export const AddGamePopoverButton = () => {
  const setBoardgames = useSetRecoilState(boardGamesState);
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [name, setName] = useState("");

  const onSave = () => {
    setBoardgames((cur) => {
      if (
        Object.values(cur)
          .map(({ name }) => name)
          .includes(name)
      ) {
        return cur;
      }
      const game = {
        id: generateId(),
        name,
        createdAt: Date.now(),
      };
      return { ...cur, [game.id]: game };
    });
    setName("");
  };

  return (
    <div className="justify-around flex">
      <button
        className="text-2xl px-4 py-2 text-black italic underline"
        onClick={() => setIsOpen(true)}
      >
        {" "}
        Spiel hinzufügen ...{" "}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
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
      </Modal>
    </div>
  );
};
