import {
  atom,
  DefaultValue,
  selector,
} from "recoil";
import { localStorageEffect } from "./localStorageEffect";
import { Session, Vote } from "../types";
import { newSession } from "./sessionUtils";

const SESSIONS_STATE_KEY = "sessions";
const SESSSION_ID_STATE_KEY = "sessionId";

export const sessionsState = atom<Record<string, Session>>({
  key: SESSIONS_STATE_KEY,
  default: {},
  effects: [localStorageEffect(SESSIONS_STATE_KEY)],
});

export const activeSessionIdState = atom<string | undefined>({
  key: SESSSION_ID_STATE_KEY,
  default: undefined,
  effects: [localStorageEffect(SESSSION_ID_STATE_KEY)],
});

export const sessionState = selector({
  key: "session",
  get: ({ get }) => {
    const sessionId = get(activeSessionIdState);
    if (!sessionId) {
      const sessions = Object.values(get(sessionsState));
      return sessions.length > 0 ? sessions[0] : undefined;
    }
    const session = get(sessionsState)[sessionId];
    if (!session) {
      return undefined;
    }
    return session;
  },
  set: ({ set, get }, inputSession) => {
    const sessions = get(sessionsState);
    const sessionId = get(activeSessionIdState);
    if (!sessionId) {
      const session =
        !inputSession || inputSession instanceof DefaultValue
          ? newSession()
          : inputSession;
      set(sessionsState, { ...sessions, [session.id]: session });
      set(activeSessionIdState, session.id);
      return;
    }
    if (!inputSession || inputSession instanceof DefaultValue) {
      return;
    }
    set(sessionsState, { ...sessions, [sessionId]: inputSession });
  },
});

export const votesState = selector({
  key: "votes",
  get: ({ get }) => {
    const session = get(sessionState);
    return session?.votes ?? [];
  },
  set: ({ get, set }, newVotesList) => {
    if (!newVotesList || newVotesList instanceof DefaultValue) {
      return;
    }
    const session = get(sessionState) ?? newSession();
    set(sessionState, { ...session, votes: newVotesList });
  },
});

export const nominatedGamesState = selector({
  key: "nominatedGames",
  get: ({ get }) => {
    const votes = get(votesState);
    return votes.reduce((acc, vote: Vote) => {
      return [...new Set([...acc, ...vote.nominatedGames])];
    }, [] as string[]);
  },
});

export const isValidSessionState = selector({
  key: "isValidSession",
  get: ({ get }) => {
    const votes = get(votesState);
    if (votes.length === 0) {
      return { isValid: false };
    }

    if (votes.length < 2) {
      return {
        isValid: false,
        errorMessage: "Es sollten mindestens zwei Stimmen abgegeben werden!",
      };
    }
    if (
      votes.some(
        (vote) =>
          vote.nominatedGames.length !== get(nominatedGamesState).length,
      )
    ) {
      return {
        isValid: false,
        errorMessage: "Stimmen müssen geupdated werden!",
      };
    }
    return { isValid: true };
  },
});

export const sessionSummariesState = selector({
  key: "sessionSummaries",
  get: ({ get }) => {
    const sessions = get(sessionsState);
    return Object.values(sessions).map((session) => ({
      id: session.id,
      summary: `Session - ${new Date(session.createdAt).toLocaleString(
        undefined,
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        },
      )} ${session.finished ? "- abgeschlossen" : "- offen"}`,
    }));
  },
});
