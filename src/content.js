import yaml from "js-yaml";
import fs from "fs";

const readYamlFile = (filename) => {
  return yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
}

export function readData(collectionName) {
  return readYamlFile(`data/${collectionName}.yml`)
}
