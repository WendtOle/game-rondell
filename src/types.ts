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
