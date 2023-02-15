"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFile_1 = require("./utils/parseFile");
const iterate = (sections) => {
    let numOverlap = 0;
    for (let i = 0; i < sections.length; i++) {
        // do stuff
        // get sections, find overlap
        const [sectionOne, sectionTwo] = sections[i].split(",");
        const doesOverlap = findOverlap(sectionOne, sectionTwo);
        if (doesOverlap) {
            numOverlap++;
        }
    }
    return numOverlap;
};
// 5-7,7-9 overlaps in a single section, 7. => assOneBounds.start < assTwoBounds.start and assOneBounds.end < assTwoBounds.end
// One boundary's start is greater or equal to anothers, but less than or equal to the other's end
// 2-8,3-7 overlaps all of the sections 3 through 7.
// 6-6,4-6 overlaps in a single section, 6.
// 2-6,4-8 overlaps in sections 4, 5, and 6.
const findOverlap = (assignmentOne, assignmentTwo) => {
    let doesOverlap = false;
    const assOneBounds = getBounds(assignmentOne);
    const assTwoBounds = getBounds(assignmentTwo);
    if ((assOneBounds.start >= assTwoBounds.start &&
        assOneBounds.start <= assTwoBounds.end) ||
        (assTwoBounds.start >= assOneBounds.start &&
            assTwoBounds.start <= assOneBounds.end)) {
        doesOverlap = true;
    }
    console.log(`sections: ${assignmentOne} and ${assignmentTwo}`);
    console.log(`overlap? ${doesOverlap}`);
    return doesOverlap;
};
const getBounds = (section) => {
    const [start, end] = section.trim().split("-");
    return {
        start: parseInt(start),
        end: parseInt(end),
    };
};
const run = () => {
    const input = (0, parseFile_1.parseFile)(`inputs/dayFour.txt`);
    const result = iterate(input);
    console.log(`final result: ${result}`);
};
run();
