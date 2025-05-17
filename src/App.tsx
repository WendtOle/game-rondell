import React from "react";
import { VoteCreationForm } from "./VoteCreationForm";
import { VoteList } from "./VoteList";
import { ResultList } from "./ResultList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  sessionState,
  sessionsState,
  activeSessionIdState,
} from "./state/sessions";
import { generateId } from "./utils/generateId";
import { Session } from "./types";
import { Button } from "./components/Button";
import { FinishSessionButton } from "./FinishSessionButton";

export const App = () => {
  const session = useRecoilValue(sessionState);
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
  return (
    <div className="mx-auto p-4 w-4xl">
      {!session?.finished && <VoteCreationForm />}
      <VoteList />
      <ResultList />
      <FinishSessionButton />
      <Button title="Neue Abstimmung starten" onClick={handleClick} />
    </div>
  );
};
