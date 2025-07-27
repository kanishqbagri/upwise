
export type Operator = '+' | '-';

export interface Question {
  num1: number;
  num2: number;
  operator: Operator;
  correctAnswer: number;
  choices: number[];
}

export type GameState = 'start' | 'playing' | 'answered';

export type MessageType = 'welcome' | 'correct' | 'incorrect' | 'next';
