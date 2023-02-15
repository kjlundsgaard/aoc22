"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFile = void 0;
const fs = require("fs");
const parseFile = (filename) => {
    // read file
    const contents = fs.readFileSync(filename, { encoding: "utf8" });
    const splitContents = contents.split("\n");
    return splitContents;
};
exports.parseFile = parseFile;
