// BoardGameList.tsx
import React from "react";
import { List } from "./components/List";

interface SessionListProps {
  onClickSession: (sessionId: string) => void;
  sessions: Array<{ id: string; summary: string }>;
}

export const SessionList: React.FC<SessionListProps> = ({
  onClickSession,
  sessions,
}) => {
  return (
    <List
      items={[...sessions, { id: "", summary: "Neue Session erstellen ..." }]}
      getId={({ id }) => id}
      onClick={({ id }) => onClickSession(id)}
      itemRenderer={(session) => {
        return (
          <div>
            <h3 className="text-4xl text-gray-800">{session.summary}</h3>
          </div>
        );
      }}
    />
  );
};
