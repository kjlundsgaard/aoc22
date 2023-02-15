import { parseFile } from "./utils/parseFile";
import _ from "lodash";

type Instruction = {
  numItems: number;
  fromRow: number;
  toRow: number;
};

const iterate = (instructions: string[]) => {
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i].trim();
    // do stuff
    // parseInstruction, execute moveCrate
    const parsedInstruction = parseInstruction(instruction);
    moveCratesNineThousandAndOne(parsedInstruction);
  }
  return crateLayout;
};

// parse the line of instructions
// e.g. move 3 from 4 to 3
const parseInstruction = (instruction: string): Instruction => {
  const split = instruction.split(" from ");
  const firstPart = split[0].trim();
  const secondPart = split[1].trim();
  const secondPartSplit = secondPart.split(" to ");
  const firstPartSplit = firstPart.split("move ");
  const numItems = parseInt(firstPartSplit[1].trim(), 10);
  const fromRow = parseInt(secondPartSplit[0].trim(), 10);
  const toRow = parseInt(secondPartSplit[1].trim(), 10);
  return {
    numItems,
    fromRow,
    toRow,
  };
};

// do the crate move
const moveCratesNineThousandAndOne = (instruction: Instruction) => {
  const { numItems, fromRow, toRow } = instruction;
  console.log(`executing instructions: ${JSON.stringify(instruction)}`);
  const crates = crateLayout[fromRow].splice(-numItems, numItems);
  console.log(`moving crate ${crates} from ${fromRow} to ${toRow}`);
  crateLayout[toRow].push(...crates);
  console.log(`crateLayout: ${JSON.stringify(crateLayout)}`);
};

// do the crate move
const moveCratesSingle = (instruction: Instruction) => {
  const { numItems, fromRow, toRow } = instruction;
  console.log(`executing instructions: ${JSON.stringify(instruction)}`);
  for (let i = 1; i <= numItems; i++) {
    const crate = crateLayout[fromRow].pop();
    console.log(`moving crate ${crate} from ${fromRow} to ${toRow}`);
    if (crate) {
      crateLayout[toRow].push(crate);
    }
  }
  console.log(`crateLayout: ${JSON.stringify(crateLayout)}`);
};

// keep track of crates per stack
// e.g.
// {
//  1: ['A', 'B', 'C'],
//  2: ['D', 'E', 'G'],
//  3: ['M', 'Z']
// }
// where index 0 of stack array is bottom of stack and index -1 (last) is top
const crateLayout: { [crate: string]: string[] } = {};

// initialize the create layout
const parseInitialCrateLayout = (stackData: string[]) => {
  for (let i = stackData.length - 2; i >= 0; i--) {
    console.log(`row: ${stackData[i]}`);
    const crateRow = readCrateRow(stackData[i]);
    for (let j = 0; j < crateRow.length; j++) {
      const crate = crateRow[j].trim();
      if (!crateLayout[j + 1]) {
        if (crate) {
          crateLayout[j + 1] = [crate];
        } else {
          crateLayout[j + 1] = [];
        }
      } else {
        if (crate) {
          crateLayout[j + 1].push(crate);
        }
      }
    }
  }
};

const readCrateRow = (row: string): string[] => {
  let chunks = [];
  for (var i = 0, charsLength = row.length; i < charsLength; i += 4) {
    const rawCrateValue = row.substring(i, i + 3);
    const parsedCrateValue = rawCrateValue[1];
    chunks.push(parsedCrateValue);
  }
  return chunks;
};

// given the file input lines as an array,
// grab just the first few lines
const getStackData = (input: string[], breakIndex: number) => {
  const stackData = input.slice(0, breakIndex);
  return stackData;
};

// given the file input lines as an array,
// grab just the last lines
const getInstructionData = (input: string[], breakIndex: number) => {
  const instructiondata = input.slice(breakIndex + 1);
  return instructiondata;
};

// given the file input lines as an array,
// grab just the last lines
const getNumStacks = (input: string[], breakIndex: number) => {
  const stackInfoRow = input.slice(breakIndex - 1, breakIndex)[0];
  const stackNumbers = stackInfoRow.trim().split("  ");
  return stackNumbers.length;
};

const getInputBreakIndex = (input: string[]): number => {
  let breakIndex = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i].trim() === "") {
      breakIndex = i;
      break;
    }
  }
  return breakIndex;
};

const getTopCrates = (numStacks: number) => {
  let result = [];
  for (let i = 1; i < numStacks + 1; i++) {
    const stack = crateLayout[i];
    const stackHeight = stack.length;
    result.push(stack[stackHeight - 1]);
  }
  return result.join("");
};

const run = () => {
  const input = parseFile(`inputs/dayFive.txt`);
  const breakIndex = getInputBreakIndex(input);
  const stackData = getStackData(input, breakIndex);
  parseInitialCrateLayout(stackData);
  const instructionData = getInstructionData(input, breakIndex);
  const finalLayout = iterate(instructionData);
  console.log(`final result: ${JSON.stringify(finalLayout)}`);
  const numStacks = getNumStacks(input, breakIndex);
  const resultingString = getTopCrates(numStacks);
  console.log(`result! ${resultingString}`);
};

run();
