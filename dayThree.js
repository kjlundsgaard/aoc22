"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseFile_1 = require("./utils/parseFile");
const lodash_1 = __importDefault(require("lodash"));
const PRIORITY_MAP = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 1 + 26,
    B: 2 + 26,
    C: 3 + 26,
    D: 4 + 26,
    E: 5 + 26,
    F: 6 + 26,
    G: 7 + 26,
    H: 8 + 26,
    I: 9 + 26,
    J: 10 + 26,
    K: 11 + 26,
    L: 12 + 26,
    M: 13 + 26,
    N: 14 + 26,
    O: 15 + 26,
    P: 16 + 26,
    Q: 17 + 26,
    R: 18 + 26,
    S: 19 + 26,
    T: 20 + 26,
    U: 21 + 26,
    V: 22 + 26,
    W: 23 + 26,
    X: 24 + 26,
    Y: 25 + 26,
    Z: 26 + 26,
};
const iterate = (allSacks) => {
    let totalPriority = 0;
    for (let i = 0; i < allSacks.length; i += 3) {
        // const { sackOne, sackTwo } = splitSacks(allSacks[i]);
        const sackOne = allSacks[i];
        const sackTwo = allSacks[i + 1];
        const sackThree = allSacks[i + 2];
        const overlap = findOverlap(sackOne, sackTwo, sackThree);
        const priority = PRIORITY_MAP[overlap];
        totalPriority += priority;
    }
    return totalPriority;
};
const splitSacks = (sacks) => {
    const length = sacks.length;
    const half = Math.floor(length / 2);
    const sackOne = sacks.slice(0, half);
    const sackTwo = sacks.slice(half, sacks.length);
    return {
        sackOne,
        sackTwo,
    };
};
const findOverlap = (sackOne, sackTwo, sackThree) => {
    const intersection = lodash_1.default.intersection(sackOne.split(""), sackTwo.split(""), sackThree.split(""));
    console.log(`sackOne: ${sackOne}, sackTwo: ${sackTwo}, sackThree: ${sackThree}, intersection: ${intersection[0]}`);
    return intersection[0];
};
const run = () => {
    const input = (0, parseFile_1.parseFile)(`inputs/dayThree.txt`);
    const result = iterate(input);
    console.log(`final result: ${result}`);
};
run();
