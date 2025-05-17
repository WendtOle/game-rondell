import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  sessionsState,
  activeSessionIdState,
  sessionState,
} from "./state/sessions";
import { generateId } from "./utils/generateId";
import { Session } from "./types";
import { Button } from "./components/Button";

export const CreateNewSessionButton = () => {
  const setSessionId = useSetRecoilState(activeSessionIdState);
  const setSessions = useSetRecoilState(sessionsState);
  const session = useRecoilValue(sessionState);

  const isSessionFinished = session?.finished;

  if (!isSessionFinished) {
    return null;
  }

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
  return (
    <div className="w-full flex justify-center">
      <Button title="Neue Abstimmung starten" onClick={handleClick} />
    </div>
  );
};
