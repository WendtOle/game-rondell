import React from "react";
import { VoteCreationForm } from "./VoteCreationForm";
import { VoteList } from "./VoteList";
import { ResultList } from "./ResultList";
import { useRecoilValue } from "recoil";
import { sessionState } from "./state/sessions";
import { FinishSessionButton } from "./FinishSessionButton";
import { CreateNewSessionButton } from "./CreateNewSession";

export const App = () => {
  const session = useRecoilValue(sessionState);

  return (
    <div className="mx-auto p-4 w-4xl">
      {!session?.finished && <VoteCreationForm />}
      <VoteList />
      <ResultList />
      <FinishSessionButton />
      <CreateNewSessionButton />
    </div>
  );
};
