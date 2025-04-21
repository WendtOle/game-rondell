export enum GameDuration {
  FILLER = "Filler",
  NORMAL = "Normal",
  BRECHER = "Brecher",
}

export interface Game {
  name: string;
  minPlayer: number;
  maxPlayer: number;
  duration: GameDuration;
}

export interface Vote {
  participant: string;
  noGoGames?: string;
  heroGames?: string;
  id: string;
  createdAt: number;
  nominatedGames: string[];
}

export interface Session {
  id: string;
  name: string;
  createdAt: number;
  gameIds: string[];
  votes: Vote[];
}
