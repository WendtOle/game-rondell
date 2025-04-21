import React from "react";
import { useQuery } from "./useQuery";
import { useLocalSessions } from "./useGameSessionStorage";
import { VoteCreationForm } from "./VoteCreationForm";
import { VoteList } from "./VoteList";
import { ResultList } from "./ResultList";
import { Heading } from "./components/Heading";

export const SessionView = () => {
  const { params } = useQuery();
  const { getSessionById } = useLocalSessions();

  const session = getSessionById(params.session);

  if (!session) {
    return <div>No session with this ID found!</div>;
  }

  return (
    <div className="mx-auto p-4 w-4xl">
      <Heading title={`Session: ${session?.name}`} />
      <VoteCreationForm sessionId={session.id} />
      <VoteList votes={session.votes} />
      <ResultList sessionId={session.id} />
    </div>
  );
};
