"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
const parseFile_1 = require("./utils/parseFile");
const addCalories = (foodArray) => {
    const caloriesPerElf = {};
    // count the calories per elf
    let currentElfIndex = 0;
    for (let i = 0; i < foodArray.length; i++) {
        let currentFoodItem = foodArray[i];
        if (currentFoodItem !== "") {
            // convert from string to number
            let calories = convertToNum(currentFoodItem);
            if (!caloriesPerElf[currentElfIndex]) {
                caloriesPerElf[currentElfIndex] = calories;
            }
            else {
                caloriesPerElf[currentElfIndex] += calories;
            }
        }
        else {
            currentElfIndex++;
        }
    }
    return caloriesPerElf;
};
const countCalories = (caloriesList) => {
    let elfFirst = "";
    let caloriesFirst = 0;
    let elfSecond = "";
    let caloriesSecond = 0;
    let elfThird = "";
    let caloriesThird = 0;
    for (const elf in caloriesList) {
        if (caloriesList[elf] > caloriesFirst) {
            elfThird = elfSecond;
            caloriesThird = caloriesSecond;
            elfSecond = elfFirst;
            caloriesSecond = caloriesFirst;
            elfFirst = elf;
            caloriesFirst = caloriesList[elf];
        }
        else if (caloriesList[elf] > caloriesSecond) {
            elfThird = elfSecond;
            caloriesThird = caloriesSecond;
            elfSecond = elf;
            caloriesSecond = caloriesList[elf];
        }
        else if (caloriesList[elf] > caloriesThird) {
            elfThird = elf;
            caloriesThird = caloriesList[elf];
        }
    }
    console.log(`leader 1 is elf number ${elfFirst} with ${caloriesFirst} calories`);
    console.log(`leader 2 is elf number ${elfSecond} with ${caloriesSecond} calories`);
    console.log(`leader 3 is elf number ${elfThird}} with ${caloriesThird} calories`);
    console.log(`combined: ${caloriesFirst + caloriesSecond + caloriesThird}`);
};
const convertToNum = (input) => {
    const trimmed = input.trim();
    const numCalories = parseInt(trimmed, 10);
    return numCalories;
};
const run = () => {
    const input = (0, parseFile_1.parseFile)(`inputs/dayOne.txt`);
    const added = addCalories(input);
    countCalories(added);
};
run();
