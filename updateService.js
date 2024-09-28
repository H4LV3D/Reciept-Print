const cron = require("node-cron");
const fs = require("fs");
const { processAllFiles } = require("./updateRecordFiles");

const folderPath = "./Reciept"; // Replace with the path to your folder
let previousFiles = [];
fs.readdir(folderPath, (err, files) => {
  files.forEach((file) => {
    previousFiles.push(file);
  });
});

// Function to handle file changes
const handleFileChanges = () => {
  fs.readdir(folderPath, (err, files) => {
    files.forEach((file) => {
      previousFiles.push(file);
    });
  });
  processAllFiles();
};

// Setting up the cron job to monitor the folder every minute
cron.schedule("* * * * *", () => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
    } else {
      if (files.length === 0) {
        console.log("No new files added.");
      } else {
        const newFiles = files.filter((file) => !previousFiles.includes(file));
        console.log(newFiles);
        console.log(files.length);
        handleFileChanges();
      }
    }
  });
});
