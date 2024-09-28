const fs = require("fs");
// import fs from "fs";
const path = require("path");
// import path from "path";

// Read all PDF files in the "receipt" folder
const folderPath = path.join(__dirname, "Receipt");
console.log(folderPath);
const files = fs
  .readdirSync(folderPath)
  .filter((file) => file.endsWith(".pdf"));

// Create an HTML table to display the PDF file details
let table = '<table class="table">';
table +=
  "<thead><tr><th>Name</th><th>Date</th><th>Size</th><th>Content</th></tr></thead>";
table += "<tbody>";

files.forEach((file) => {
  // Get the PDF file details
  const filePath = path.join(folderPath, file);
  const stats = fs.statSync(filePath);
  const fileSize = stats.size;
  const modifiedDate = stats.mtime;

  // Read the PDF file content
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = window.PDFJS.getDocument(data);
  pdf.then((doc) => {
    // Get the first page of the PDF
    doc.getPage(1).then((page) => {
      // Render the page to a canvas element
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext: context, viewport: viewport });

      // Add a row to the table for the PDF file
      table += "<tr>";
      table += `<td>${file}</td>`;
      table += `<td>${modifiedDate}</td>`;
      table += `<td>${fileSize}</td>`;
      table += `<td><canvas width="${viewport.width}" height="${
        viewport.height
      }">${canvas.toDataURL()}</canvas></td>`;
      table += "</tr>";
    });
  });
});

table += "</tbody></table>";

// Append the table to the page
document.body.innerHTML += table;

function getPageText(pageNum, PDFDocumentInstance) {
  // Return a Promise that is solved once the text of the page is retrieven
  return new Promise(function (resolve, reject) {
    PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
      // The main trick to obtain the text of the PDF page, use the getTextContent method
      pdfPage.getTextContent().then(function (textContent) {
        var textItems = textContent.items;
        var finalString = "";

        // Concatenate the string of the item to the final string
        for (var i = 0; i < textItems.length; i++) {
          var item = textItems[i];

          finalString += item.str + " ";
        }

        // Solve promise with the text retrieven from the page
        resolve(finalString);
      });
    });
  });
}

var PDF_URL = "/path/to/example.pdf";
PDFJS.getDocument(PDF_URL).then(
  function (PDFDocumentInstance) {
    var totalPages = PDFDocumentInstance.pdfInfo.numPages;
    var pageNumber = 1;

    getPageText(pageNumber, PDFDocumentInstance).then(function (textPage) {
      // Show the text of the page in the console
      console.log(textPage);
    });
  },
  function (reason) {
    // PDF loading error
    console.error(reason);
  }
);
