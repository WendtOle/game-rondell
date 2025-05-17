import React from "react";
import { useSetRecoilState } from "recoil";
import { sessionsState, activeSessionIdState } from "./state/sessions";
import { generateId } from "./utils/generateId";
import { Session } from "./types";
import { Button } from "./components/Button";

export const CreateNewSessionButton = () => {
  const setSessionId = useSetRecoilState(activeSessionIdState);
  const setSessions = useSetRecoilState(sessionsState);

  const handleClick = () => {
    const newSession: Session = {
      id: generateId(),
      createdAt: Date.now(),
      votes: [],
      finished: false,
    };
    setSessions((cur) => ({ ...cur, [newSession.id]: newSession }));
    setSessionId(newSession.id);
    return;
  };
  return <Button title="Neue Abstimmung starten" onClick={handleClick} />;
};
