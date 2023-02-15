import { parseFile } from "./utils/parseFile";

type Choice = "ROCK" | "PAPER" | "SCISSORS";

type Outcome = "WIN" | "LOSE" | "DRAW";

const CHOICE_SCORE_MAP = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const OUTCOME_SCORE_MAP = {
  LOSE: 0,
  WIN: 6,
  DRAW: 3,
};

const LETTER_TO_CHOICE_MAP: { [key: string]: Choice } = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
};

const LETTER_TO_OUTCOME_MAP: { [key: string]: Outcome } = {
  X: "LOSE",
  Y: "DRAW",
  Z: "WIN",
};

const iterate = (games: string[]) => {
  let myScore = 0;
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    let opponentChoice;
    let myChoice;
    [opponentChoice, myChoice] = game.split(" ");
    console.log(`opponentChoice: ${opponentChoice}, mychoice: ${myChoice}`);
    const gameScore = parseChoiceAndScore(
      opponentChoice.trim(),
      myChoice.trim()
    );
    myScore += gameScore;
    console.log(`gameScore: ${gameScore}, myScore: ${myScore}`);
  }
  return myScore;
};

const parseChoiceAndScore = (inputOne: string, inputTwo: string) => {
  const outcome = LETTER_TO_OUTCOME_MAP[inputTwo];
  const myChoice = calculateMyChoice(LETTER_TO_CHOICE_MAP[inputOne], outcome);
  const choiceScore = CHOICE_SCORE_MAP[myChoice];
  const outcomeScore = OUTCOME_SCORE_MAP[outcome];
  console.log(
    `inputOne: ${inputOne}, inputTwo: ${inputTwo}, result: ${
      choiceScore + outcomeScore
    }`
  );
  return choiceScore + outcomeScore;
};

const calculateMyChoice = (opponentInput: Choice, outcome: Outcome): Choice => {
  switch (opponentInput) {
    case "ROCK":
      if (outcome === "WIN") {
        return "PAPER";
      } else if (outcome === "DRAW") {
        return "ROCK";
      } else {
        return "SCISSORS";
      }
    case "PAPER":
      if (outcome === "WIN") {
        return "SCISSORS";
      } else if (outcome === "DRAW") {
        return "PAPER";
      } else {
        return "ROCK";
      }
    case "SCISSORS":
      if (outcome === "WIN") {
        return "ROCK";
      } else if (outcome === "DRAW") {
        return "SCISSORS";
      } else {
        return "PAPER";
      }
    default:
      throw new Error("Unexpected input to calculateMyChoice");
  }
};

const run = () => {
  const input = parseFile(`inputs/dayTwo.txt`);
  const result = iterate(input);
  console.log(`final result: ${result}`);
};

run();
