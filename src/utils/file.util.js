const fs = require("fs");
const path = require("path");

function getFilePath(fileName) {
  return path.join(__dirname, `../../data/${fileName}`);
}

// function readData(fileName) {
//   const filePath = getFilePath(fileName);

//   if (!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, "[]");
//   }

//   const data = fs.readFileSync(filePath, "utf-8");
//   return JSON.parse(data);
// }

function readData(fileName) {
  const filePath = getFilePath(fileName);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  const data = fs.readFileSync(filePath, "utf-8");

  if (!data) return [];

  return JSON.parse(data);
}

function writeData(fileName, data) {
  const filePath = getFilePath(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  readData,
  writeData
};