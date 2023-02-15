"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFile_1 = require("./utils/parseFile");
const process = (stream, lengthMarker) => {
    // stream = abcd
    for (let i = 0; i < stream.length - lengthMarker - 1; i++) {
        // do stuff
        // get a slice of the string, check if chars are unique
        const lastCharacterIndex = i + lengthMarker;
        const slice = stream.slice(i, lastCharacterIndex);
        if (isSliceUnique(slice)) {
            return {
                firstMarkerChar: stream[lastCharacterIndex],
                lastCharacterIndex,
            };
        }
    }
};
const isSliceUnique = (slice) => {
    const charCount = {};
    let isUnique = true;
    console.log(`slice: ${slice}`);
    for (let i = 0; i < slice.length; i++) {
        const char = slice[i];
        if (!charCount[char]) {
            charCount[char] = 1;
        }
        else {
            isUnique = false;
            break;
        }
    }
    console.log(`isUnique: ${isUnique}`);
    return isUnique;
};
const run = () => {
    const input = (0, parseFile_1.parseFile)(`inputs/daySix.txt`);
    const stream = input[0].trim();
    const result = process(stream, 14);
    console.log(`final result: ${JSON.stringify(result)}`);
};
run();
