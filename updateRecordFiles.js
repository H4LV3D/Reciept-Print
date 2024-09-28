const fs = require("fs");
const path = require("path");
const pdfjsLib = require("pdfjs-dist");
const XLSX = require("xlsx");
require("web-streams-polyfill");

const directoryPath = "./Reciept"; // Replace with the path to your directory

async function extractText(dataBuffer) {
  const loadingTask = pdfjsLib.getDocument(dataBuffer);
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  const pageText = await page.getTextContent();
  const pageStrings = pageText.items.map((item) => item.str);
  return pageStrings.join("\n");
}

async function returnRawData(file) {
  if (path.extname(file) === ".pdf") {
    const pdfPath = path.join(directoryPath, file);
    const dataBuffer = fs.readFileSync(pdfPath);
    const uint8Array = new Uint8Array(dataBuffer); // Convert Buffer to Uint8Array
    return await extractText(uint8Array);
  } else {
    throw new Error("File format is not supported. Please provide a PDF file.");
  }
}

// Function to extract information from the data
const extractInformation = (data) => {
  const idMatch = data.match(/INV : (\d+)/);
  const dateMatch = data.match(/DATE : (\d{4})-(\d{1,2})-(\d{1,2})/);
  const timeMatch = data.match(/TIME : (\d{1,2}:\d{1,2}:\d{1,2})/);
  const cashierMatch = data.match(/CASHIER\s*:\s*(\w+)/);
  const cardNumberMatch = data.match(/Card Number : (\w+)/);
  const nameMatch = data.match(/Patient Name : (.+?)(?=\n)/);
  const paymentMethodMatch = data.match(/Payment Method : (.+?)(?=\n)/);
  const amountPaidMatch = data.match(/Amount Paid : (\d+)/);
  const outstandingMatch = data.match(/Outstanding : (\d+)/);

  // Format the date to yyyymmdd
  let formattedDate = null;
  if (dateMatch) {
    const [year, month, day] = dateMatch.slice(1, 4);
    formattedDate = `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`;
  }

  const cardName =
    cardNumberMatch[1].slice(0, 2) === "FC"
      ? nameMatch[1].split(" ")[2]
        ? nameMatch[1].split(" ")[2]
        : nameMatch[1].split(" ")[1]
      : nameMatch[1];

  const extractedData = {
    id: idMatch ? idMatch[1] : null,
    date: formattedDate,
    time: timeMatch ? timeMatch[1] : null,
    cashier: cashierMatch ? cashierMatch[1] : null,

    cardType: cardNumberMatch ? cardNumberMatch[1].slice(0, 2) : null,
    cardNumber: cardNumberMatch ? cardNumberMatch[1].slice(2) : null,
    cardName: cardName,
    patientName: nameMatch ? nameMatch[1] : null,

    paymentMethod: paymentMethodMatch ? paymentMethodMatch[1] : null,
    services: [],

    totalAmount:
      Number(amountPaidMatch ? amountPaidMatch[1] : null) +
      Number(outstandingMatch ? outstandingMatch[1] : null),
    amountPaid: Number(amountPaidMatch ? amountPaidMatch[1] : null),
    amountOutstanding: Number(outstandingMatch ? outstandingMatch[1] : null),
  };

  return extractedData;
};

// Modified returnJson function
async function returnJson(file) {
  const text = await returnRawData(file);
  const formattedData = extractInformation(text);
  const jsonData = formattedData;
  return jsonData;
}

async function returnExcel(file) {
  const jsonData = await returnJson(file);

  const worksheet = XLSX.utils.json_to_sheet([jsonData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelOutput = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });
  return excelOutput;
}

async function processAllFiles() {
  const rawDataArray = [];
  const jsonDataArray = [];
  const excelDataArray = [];

  const files = fs.readdirSync(directoryPath);
  for (const file of files) {
    try {
      const rawData = await returnRawData(file);
      const jsonData = await returnJson(file);
      const excelData = await returnExcel(file);

      rawDataArray.push({ file, data: rawData });
      jsonDataArray.push({ file, data: jsonData });
      excelDataArray.push({ file, data: excelData });
    } catch (err) {
      console.error("Error processing the file:", file, err);
    }
  }

  // Writing the entire data to a single file
  fs.writeFileSync("index.raw", JSON.stringify(rawDataArray, null, 2));
  fs.writeFileSync(
    "./src/data/index.json",
    JSON.stringify(jsonDataArray, null, 2)
  );
  // fs.writeFileSync("index.xlsx", JSON.stringify(excelDataArray, null, 2));
  fs.writeFileSync("index.xlsx", Buffer.concat(excelDataArray));

  return {
    rawData: rawDataArray,
    jsonData: jsonDataArray,
    excelData: excelDataArray,
  };
}

module.exports = { processAllFiles };

// processAllFiles();
