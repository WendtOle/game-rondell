import React from "react";
import { VoteCreationForm } from "./VoteCreationForm";
import { VoteList } from "./VoteList";
import { ResultList } from "./ResultList";
import { SessionList } from "./SessionList";
import { useRecoilValue } from "recoil";
import { sessionState } from "./state/sessions";

export const SessionView = () => {
  const session = useRecoilValue(sessionState)
  return (
    <div className="mx-auto p-4 w-4xl">
      {!session?.finished && <VoteCreationForm />}
      <VoteList />
      <ResultList />
      <SessionList />
    </div>
  );
};
