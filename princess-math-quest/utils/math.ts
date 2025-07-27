import { Question, Operator } from './types.ts';

function shuffle<T,>(array: T[]): T[] {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const generateQuestion = (): Question => {
  const operator: Operator = Math.random() < 0.6 ? '+' : '-'; // More addition
  let num1 = 0;
  let num2 = 0;

  if (operator === '+') {
    num1 = Math.floor(Math.random() * 50) + 1;
    num2 = Math.floor(Math.random() * 50) + 1;
  } else {
    // For subtraction, use a larger number and subtract a smaller number (1-10)
    num1 = Math.floor(Math.random() * 90) + 10; // num1 is between 10 and 99
    num2 = Math.floor(Math.random() * 10) + 1;  // num2 is between 1 and 10
  }

  const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

  const wrongAnswers = new Set<number>();
  while (wrongAnswers.size < 3) {
    const offset = Math.floor(Math.random() * 10) + 1;
    const direction = Math.random() < 0.5 ? 1 : -1;
    let wrongAnswer = correctAnswer + (offset * direction);
    if(wrongAnswer < 0) wrongAnswer = correctAnswer + offset;

    if (wrongAnswer !== correctAnswer) {
      wrongAnswers.add(wrongAnswer);
    }
  }

  const choices = shuffle([correctAnswer, ...Array.from(wrongAnswers)]);

  return { num1, num2, operator, correctAnswer, choices };
};