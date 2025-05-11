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
  createdAt: number;
  votes: Vote[];
  finished: boolean;
}
