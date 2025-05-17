import { atom } from "recoil";

const VOTE_PARTICIPANT_NAME_STATE_KEY = "vote-participant-name";

export const voteParticipantNameState = atom<string | undefined>({
  key: VOTE_PARTICIPANT_NAME_STATE_KEY,
  default: undefined,
});
