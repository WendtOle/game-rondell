import { Session } from "../types";
import { generateId } from "../utils/generateId";

export const newSession = (id?: string): Session => ({
  finished: false,
  id: id ?? generateId(),
  createdAt: Date.now(),
  votes: [],
});
