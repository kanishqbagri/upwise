
export enum GameState {
  Start,
  Playing,
  Finished,
}

export interface TriviaQuestion {
  description: string;
  options: string[];
  correctAnswer: string;
}
