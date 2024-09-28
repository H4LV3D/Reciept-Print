const fs = require("fs");

const cardData = require("./src/data/index.json");

function getDataFromObjects(arr) {
  return arr.map((item) => item.data);
}

const dataToWrite = getDataFromObjects(cardData);

// Write to data.json in the same directory
fs.writeFile("data.json", JSON.stringify(dataToWrite, null, 2), (err) => {
  if (err) {
    console.error("error occured");
  }
});
