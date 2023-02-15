"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFile_1 = require("./utils/parseFile");
// what do we want this to look like?
// {
//  [dirName]: {
//    files: {
//      [fileName]: size
//    },
//    childDirs: ['']
//  }
// }
const directoryMap = {
    "/": { files: {}, childDirs: new Set() },
};
const fileSizeMap = {};
const countFileSize = () => {
    console.log(`DIRMAP: ${JSON.stringify(directoryMap, null, "\t")}`);
    // go through directories and count the filesizes
    for (const dir in directoryMap) {
        fileSizeMap[dir] = countFileSizeForDir(dir);
    }
};
const countFileSizeForDir = (dir) => {
    let total = 0;
    const fileMap = directoryMap[dir].files;
    const childDirs = directoryMap[dir].childDirs;
    console.log(`childDirs: ${childDirs}`);
    if (directoryMap[dir].childDirs.size === 0 &&
        !Object.keys(directoryMap[dir].files).length) {
        console.log(`ok none`);
        return 0;
    }
    for (const fileName in fileMap) {
        console.log("we are counting!");
        total += parseInt(fileMap[fileName], 10);
    }
    childDirs.forEach((childDir) => {
        console.log("we are recursing!");
        total += countFileSizeForDir(childDir);
    });
    return total;
};
const buildLayout = (input) => {
    let currentDir = "/";
    for (let i = 0; i < input.length; i++) {
        // do stuff
        // get a slice of the string, check if chars are unique
        const line = input[i].trim();
        const result = getLineResult(line);
        // console.log(`parsing line: ${line}`);
        // console.log(`result: ${JSON.stringify(result)}`);
        const parentDir = `${currentDir.split("/").slice(0, -2).join("/")}/`;
        switch (result.type) {
            // change into the directory or ls
            case "command":
                if (result.name === "cd") {
                    // going up a directory
                    if (result.target === "/") {
                        currentDir = "/";
                    }
                    else if (result.target === "..") {
                        // go to last slash
                        currentDir = parentDir;
                    }
                    else {
                        currentDir = `${currentDir}${result.target}/`;
                    }
                }
                // TODO: do we need to do anything with ls? no?
                break;
            // set the directory structure in directoryMap
            case "directory":
                const dirName = `${currentDir}${result.name}/`;
                if (!directoryMap[dirName]) {
                    directoryMap[dirName] = { files: {}, childDirs: new Set() };
                }
                directoryMap[currentDir]["childDirs"].add(dirName);
                break;
            case "file":
                if (!directoryMap[currentDir][result.name]) {
                    directoryMap[currentDir]["files"][result.name] = result.size;
                }
                break;
            default:
                throw new Error("wtf");
        }
    }
};
const getLineResult = (line) => {
    const parsed = line.split(" ");
    let result = { type: "", name: parsed[1], target: "", size: 0 };
    switch (parsed[0]) {
        case "$":
            result.type = "command";
            if (parsed[2]) {
                result.target = parsed[2];
            }
            break;
        case "dir":
            result.type = "directory";
            break;
        default:
            result.type = "file";
            result.size = parseInt(parsed[0], 10);
            break;
    }
    return result;
};
const filterFilesBySize = (size) => {
    const fileSizeEntries = Object.entries(fileSizeMap);
    const matchingFiles = fileSizeEntries.filter(([key, value]) => {
        return value > size;
    });
    const matchingFileMap = Object.fromEntries(matchingFiles);
    return matchingFileMap;
};
const calculateTotalSize = (fileMap) => {
    console.log(`fileMap!!!! ${JSON.stringify(fileMap, null, "\t")}`);
    let total = 0;
    for (let fileName in fileMap) {
        total += fileMap[fileName];
    }
    return total;
};
const sortFilesBySpace = (fileMap) => {
    const entries = Object.entries(fileMap);
    const sorted = entries.sort(([keyA, valueA], [keyB, valueB]) => {
        return valueA - valueB;
    });
    console.log(`sorted: ${sorted}`);
};
const run = () => {
    const input = (0, parseFile_1.parseFile)(`inputs/daySeven.txt`);
    buildLayout(input);
    countFileSize();
    const totalUsed = fileSizeMap["/"];
    const spaceFree = 70000000 - totalUsed;
    const spaceNeeded = 30000000 - spaceFree;
    // console.log(`directory map~ ${JSON.stringify(directoryMap, null, "\t")}`);
    const matchingFiles = filterFilesBySize(spaceNeeded);
    sortFilesBySpace(matchingFiles);
    // const result = calculateTotalSize(matchingFiles);
    console.log(`END RESULT: ${JSON.stringify(matchingFiles, null, "\t")}`);
};
run();
// 44359867;
