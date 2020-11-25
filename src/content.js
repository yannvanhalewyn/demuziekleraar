import fs from "fs";

const readJsonFile = (filename) => {
  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename));
  }
  return null;
}

export function readData(collectionName) {
  return readJsonFile(`data/${collectionName}.json`)
}
