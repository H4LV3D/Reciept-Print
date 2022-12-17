const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const app = express();
app.use(
  cors({
    methods: ["GET", "POST"],
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "https://cabifyapp.up.railway.app/",
    ],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// Use body-parser middleware to parse request bodies
app.use(express.json());
app.use(bodyParser.json());

const database = {
  user1: {
    username: "gift",
    password: "$2b$10$0NCgdZBNZJzhNk8WCH2FyepGe2oQJp.XiBvIbJGC6LQxrHHi0UPgu",
  },
  user2: {
    username: "gifted",
    password: "$2b$10$YkWKvC4YjxUEAn7M1n3h7ecLtX6bBflKO.IJpevndL.MpzTH5L7ei",
  },
};

// Define a route for logging in
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "gift" || username === "gifted") {
    let passcode =
      username === "gift" ? database.user1.password : database.user2.password;

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Compare the hashed password to the original password
    if (bcrypt.compareSync(password, hashedPassword)) {
      console.log("success");
      res.status(200).json({
        success: `Welcome Home`,
      });
    } else {
      // The password is incorrect
      res.status(401).send("Incorrect password");
    }
  } else {
    // The username is invalid
    res.status(401).send("Invalid username");
  }
});

app.get("/reciept", (req, res) => {
  const folderPath = path.join(__dirname, "Reciept");
  console.log(folderPath);
  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".pdf"));

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    const modifiedDate = stats.mtime;

    const data = new Uint8Array(fs.readFileSync(filePath));
    global.document = new JSDOM().window.document;
    let context;
    pdfjs.getDocument(data).promise.then(function (pdf) {
      var numPages = pdf.numPages;
      for (var i = 1; i <= numPages; i++) {
        pdf.getPage(i).then(function (page) {
          var scale = 1.5;
          var viewport = page.getViewport({ scale: scale });
          var container = document.getElementById("pdf-container");
          var canvas = document.createElement("canvas");
          context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          page.render({ canvasContext: context, viewport: viewport });
          return context;
        });
      }
    });
    res.status(200).json({
      fileSize,
      modifiedDate,
      context,
    });
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
