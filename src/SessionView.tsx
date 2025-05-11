import React from "react";
import { VoteCreationForm } from "./VoteCreationForm";
import { VoteList } from "./VoteList";
import { ResultList } from "./ResultList";
import { SessionList } from "./SessionList";

export const SessionView = () => {
  return (
    <div className="mx-auto p-4 w-4xl">
      <VoteCreationForm />
      <VoteList />
      <ResultList />
      <SessionList />
    </div>
  );
};
