import React from "react";
import { useQuery } from "./useQuery";
import { useLocalSessions } from "./useGameSessionStorage";
import { VoteCreationForm } from "./VoteCreationForm";
import { VoteList } from "./VoteList";
import { ResultList } from "./ResultList";

export const SessionView = () => {
  const { params } = useQuery();
  const { getSessionById } = useLocalSessions();

  const session = getSessionById(params.session);

  if (!session) {
    return <div>No session with this ID found!</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Session: {session?.name}</h2>
      <VoteCreationForm sessionId={session.id} />
      <VoteList votes={session.votes} />
      <ResultList sessionId={session.id} />
    </div>
  );
};
