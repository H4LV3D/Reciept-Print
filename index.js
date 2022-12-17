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
    if (bcrypt.compareSync(password, hashedPassword)) {
      console.log("success");
      res.status(200).json({
        success: `Welcome Home`,
      });
    } else {
      res.status(401).send("Incorrect password");
    }
  } else {
    res.status(401).send("Invalid username");
  }
});

app.get("/reciept", (req, res) => {
  const folderPath = path.join(__dirname, "Reciept");
  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".pdf"));
  console.log(files);

  let fileName = [];
  let fileSize = [];
  let modifiedDate = [];
  let contexts = [];

  files.forEach(async (file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    fileName.push(file.replace(/\.[^/.]+$/, ""));
    fileSize.push(stats.size);
    modifiedDate.push(stats.mtime);

    function getPageText(pageNum, PDFDocumentInstance) {
      return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
          pdfPage.getTextContent().then(function (textContent) {
            var textItems = textContent.items;
            var finalString = "";
            for (var i = 0; i < textItems.length; i++) {
              var item = textItems[i];
              finalString += item.str + " ";
            }
            resolve(finalString);
          });
        });
      });
    }

    let PDF_URL = filePath;

    let text = pdfjs.getDocument(PDF_URL).promise.then(
      function (PDFDocumentInstance) {
        var pageNumber = 1;
        getPageText(pageNumber, PDFDocumentInstance).then(function (textPage) {
          contexts.push(textPage);
        });
      },
      function (reason) {
        console.error(reason);
      }
    );
  });

  setTimeout(() => {
    res.status(200).json({
      fileName,
      fileSize,
      modifiedDate,
      contexts,
    });
  }, 1000);
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
