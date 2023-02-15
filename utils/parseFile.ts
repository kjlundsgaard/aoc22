const fs = require("fs");

export const parseFile = (filename: string): string[] => {
  // read file
  const contents = fs.readFileSync(filename, { encoding: "utf8" });
  const splitContents = contents.split("\n");
  return splitContents;
};
