// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
import { parseFile } from "./utils/parseFile";

type Tracker = {
  [key: number]: number;
};

const addCalories = (foodArray: any[]): Tracker => {
  const caloriesPerElf: Tracker = {};
  // count the calories per elf
  let currentElfIndex = 0;
  for (let i = 0; i < foodArray.length; i++) {
    let currentFoodItem = foodArray[i];
    if (currentFoodItem !== "") {
      // convert from string to number
      let calories = convertToNum(currentFoodItem);
      if (!caloriesPerElf[currentElfIndex]) {
        caloriesPerElf[currentElfIndex] = calories;
      } else {
        caloriesPerElf[currentElfIndex] += calories;
      }
    } else {
      currentElfIndex++;
    }
  }
  return caloriesPerElf;
};

const countCalories = (caloriesList: Tracker): any => {
  let elfFirst: string = "";
  let caloriesFirst: number = 0;
  let elfSecond: string = "";
  let caloriesSecond: number = 0;
  let elfThird: string = "";
  let caloriesThird: number = 0;
  for (const elf in caloriesList) {
    if (caloriesList[elf] > caloriesFirst) {
      elfThird = elfSecond;
      caloriesThird = caloriesSecond;
      elfSecond = elfFirst;
      caloriesSecond = caloriesFirst;
      elfFirst = elf;
      caloriesFirst = caloriesList[elf];
    } else if (caloriesList[elf] > caloriesSecond) {
      elfThird = elfSecond;
      caloriesThird = caloriesSecond;
      elfSecond = elf;
      caloriesSecond = caloriesList[elf];
    } else if (caloriesList[elf] > caloriesThird) {
      elfThird = elf;
      caloriesThird = caloriesList[elf];
    }
  }

  console.log(
    `leader 1 is elf number ${elfFirst} with ${caloriesFirst} calories`
  );
  console.log(
    `leader 2 is elf number ${elfSecond} with ${caloriesSecond} calories`
  );
  console.log(
    `leader 3 is elf number ${elfThird}} with ${caloriesThird} calories`
  );

  console.log(`combined: ${caloriesFirst + caloriesSecond + caloriesThird}`);
};

const convertToNum = (input: string): number => {
  const trimmed = input.trim();
  const numCalories = parseInt(trimmed, 10);
  return numCalories;
};

const run = () => {
  const input = parseFile(`inputs/dayOne.txt`);
  const added = addCalories(input);
  countCalories(added);
};

run();
