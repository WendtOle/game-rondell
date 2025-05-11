// BoardGameList.tsx
import React from "react";
import { List } from "./components/List";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeSessionIdState,
  sessionsState,
  sessionSummariesState,
} from "./state/sessions";
import { Session } from "./types";
import { generateId } from "./utils/generateId";

const DUMMY_KEY = "new-session";

export const SessionList: React.FC = () => {
  const setSessionId = useSetRecoilState(activeSessionIdState);
  const setSessions = useSetRecoilState(sessionsState);
  const summaries = useRecoilValue(sessionSummariesState);

  const handleClick = (id: string) => {
    if (id === DUMMY_KEY) {
      const newSession: Session = {
        id: generateId(),
        createdAt: Date.now(),
        votes: [],
        finished: false,
      };
      setSessions((cur) => ({ ...cur, [newSession.id]: newSession }));
      setSessionId(newSession.id);
      return;
    }
    setSessionId(id);
  };
  return (
    <List
      items={[
        ...summaries,
        { id: DUMMY_KEY, summary: "Neue Session erstellen ..." },
      ]}
      getId={({ id }) => id}
      onClick={({ id }) => handleClick(id)}
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
