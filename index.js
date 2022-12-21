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
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
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
    name: "Nwabudo",
    password: "$2b$10$s703D.RXt/vp5bAWtKBNNeGvYXMzqO2SSHYQo2vC/HJEPL5HaHJcK",
  },
  user2: {
    username: "gifted",
    name: "Mrs gift",
    password: "$2b$10$Ef/pz1kYgJf9X1/GRsO0Ce1vTQArq.3muVagNTvxIbgpZLaIVlOZ2",
  },
};

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "gift" || username === "gifted") {
    let user = username === "gift" ? database.user1 : database.user2;
    const hashedPassword = bcrypt.hash(password, 10);
    console.log(user);
    console.log(await hashedPassword);
    bcrypt.compare(password, user.password, (err, response) => {
      if (response) {
        res.status(200).json({
          success: `Welcome Home`,
          name: user.name,
        });
      } else {
        res.status(401).json({
          failed: "Invalid Username or Password",
        });
      }
    });
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
  let contexts = [];

  files.forEach(async (file) => {
    const filePath = path.join(folderPath, file);

    fileName.push(file.replace(/\.[^/.]+$/, ""));

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
          function extractInformation(text) {
            const info = {};
            // Extract the receipt ID
            const receiptIdRegex = /Reciept ID : (\d+)/;
            const receiptIdMatch = text.match(receiptIdRegex);
            if (receiptIdMatch) {
              info.receiptId = receiptIdMatch[1];
            }

            // Extract the card number
            const cardNumberRegex = /Card Number : (\w+)/;
            const cardNumberMatch = text.match(cardNumberRegex);
            if (cardNumberMatch) {
              info.cardNumber = cardNumberMatch[1];
            }

            // Extract the patient name
            const patientNameRegex = /Patient Name : (\w+ \w+)/;
            const patientNameMatch = text.match(patientNameRegex);
            if (patientNameMatch) {
              info.patientName = patientNameMatch[1];
            }

            // Extract the payment method
            const paymentMethodRegex = /Payment Method : (\w+)/;
            const paymentMethodMatch = text.match(paymentMethodRegex);
            if (paymentMethodMatch) {
              info.paymentMethod = paymentMethodMatch[1];
            }

            // Extract the amount paid using a regular expression
            const amountPaidRegex = /Amount Paid : (\d+)/;
            const amountPaidMatch = amountPaidRegex.exec(text);
            if (amountPaidMatch) {
              info.amountPaid = amountPaidMatch[1];
            }

            // Extract the outstanding amount using a regular expression
            const outstandingRegex = /Outstanding : (\d+)/;
            const outstandingMatch = outstandingRegex.exec(text);
            if (outstandingMatch) {
              info.outstanding = outstandingMatch[1];
            }

            return info;
          }
          let details = extractInformation(textPage);
          contexts.push(details);
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
      contexts,
    });
  }, 1500);
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
