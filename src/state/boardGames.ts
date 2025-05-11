import { atom } from "recoil";
import { BoardGame } from "../hooks/useBoardGameStorage";
import { localStorageEffect } from "./localStorageEffect";

const BOARD_GAME_STATE_KEY = "board-games";

export const boardGamesState = atom<Record<string, BoardGame>>({
  key: BOARD_GAME_STATE_KEY,
  default: {},
  effects: [localStorageEffect(BOARD_GAME_STATE_KEY)],
});
