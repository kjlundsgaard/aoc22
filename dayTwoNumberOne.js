"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFile_1 = require("./utils/parseFile");
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
const LETTER_TO_CHOICE_MAP = {
    A: "ROCK",
    B: "PAPER",
    C: "SCISSORS",
};
const LETTER_TO_OUTCOME_MAP = {
    X: "LOSE",
    Y: "DRAW",
    Z: "WIN",
};
const iterate = (games) => {
    let myScore = 0;
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        let opponentChoice;
        let myChoice;
        [opponentChoice, myChoice] = game.split(" ");
        console.log(`opponentChoice: ${opponentChoice}, mychoice: ${myChoice}`);
        const gameScore = parseChoiceAndScore(opponentChoice.trim(), myChoice.trim());
        myScore += gameScore;
        console.log(`gameScore: ${gameScore}, myScore: ${myScore}`);
    }
    return myScore;
};
const parseChoiceAndScore = (inputOne, inputTwo) => {
    const outcome = LETTER_TO_OUTCOME_MAP[inputTwo];
    const myChoice = calculateMyChoice(LETTER_TO_CHOICE_MAP[inputOne], outcome);
    const choiceScore = CHOICE_SCORE_MAP[myChoice];
    const outcomeScore = OUTCOME_SCORE_MAP[outcome];
    console.log(`inputOne: ${inputOne}, inputTwo: ${inputTwo}, result: ${choiceScore + outcomeScore}`);
    return choiceScore + outcomeScore;
};
const calculateMyChoice = (opponentInput, outcome) => {
    switch (opponentInput) {
        case "ROCK":
            if (outcome === "WIN") {
                return "PAPER";
            }
            else if (outcome === "DRAW") {
                return "ROCK";
            }
            else {
                return "SCISSORS";
            }
        case "PAPER":
            if (outcome === "WIN") {
                return "SCISSORS";
            }
            else if (outcome === "DRAW") {
                return "PAPER";
            }
            else {
                return "ROCK";
            }
        case "SCISSORS":
            if (outcome === "WIN") {
                return "ROCK";
            }
            else if (outcome === "DRAW") {
                return "SCISSORS";
            }
            else {
                return "PAPER";
            }
        default:
            throw new Error("Unexpected input to calculateMyChoice");
    }
};
const run = () => {
    const input = (0, parseFile_1.parseFile)(`inputs/dayTwo.txt`);
    const result = iterate(input);
    console.log(`final result: ${result}`);
};
run();
