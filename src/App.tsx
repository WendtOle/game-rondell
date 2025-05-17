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
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto p-4 flex flex-col gap-y-4">
        {!session?.finished && <VoteCreationForm />}
        {!session?.finished && (session?.votes.length ?? 0) > 0 && (
          <div className="flex gap-y-4 flex-col bg-white shadow-md p-6 rounded-lg">
            <VoteList />
            <FinishSessionButton />
          </div>
        )}
        <ResultList />
        <CreateNewSessionButton />
      </div>
    </div>
  );
};
