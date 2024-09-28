const Service = require("node-windows").Service;

// Create a new service object
const svc = new Service({
  name: "RecordsUpdateService",
  description: "Updates the records of the database",
  script: "./updateService.js", // Replace with the path to your Node.js script
});

// Listen for the "install" event, which indicates the service has been installed
svc.on("install", function () {
  svc.start();
});

// Install the service
svc.install();
