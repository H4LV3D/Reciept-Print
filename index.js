import fs from "fs";
import path from "path";
import pdfjsLib from "pdfjs-dist";
import XLSX from "xlsx";
import "web-streams-polyfill"; // Import the polyfill

const directoryPath = "./"; // Replace with the path to your directory

async function extractText(dataBuffer) {
  const loadingTask = pdfjsLib.getDocument(dataBuffer);
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  const pageText = await page.getTextContent();
  const pageStrings = pageText.items.map((item) => item.str);
  return pageStrings.join("\n");
}

export async function returnRawData(file) {
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
  const idMatch = data.match(/Reciept ID : (\d+)/);
  const cardNumberMatch = data.match(/Card Number : (\w+)/);
  const nameMatch = data.match(/Patient Name : (.+?)(?=\n)/);
  const paymentMethodMatch = data.match(/Payment Method : (.+?)(?=\n)/);
  const amountPaidMatch = data.match(/Amount Paid : (\d+)/);
  const outstandingMatch = data.match(/Outstanding : (\d+)/);

  const extractedData = {
    id: idMatch ? idMatch[1] : null,
    cardNumber: cardNumberMatch ? cardNumberMatch[1] : null,
    name: nameMatch ? nameMatch[1] : null,
    paymentMethod: paymentMethodMatch ? paymentMethodMatch[1] : null,
    amountPaid: amountPaidMatch ? amountPaidMatch[1] : null,
    outstanding: outstandingMatch ? outstandingMatch[1] : null,
  };

  return extractedData;
};

// Modified returnJson function
export async function returnJson(file) {
  const text = await returnRawData(file);
  const formattedData = extractInformation(text);
  const jsonData = { data: formattedData };
  return jsonData;
}

export async function returnExcel(file) {
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

export async function processAllFiles() {
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
  fs.writeFileSync("index.json", JSON.stringify(jsonDataArray, null, 2));
  fs.writeFileSync("index.xlsx", JSON.stringify(excelDataArray, null, 2));

  return {
    rawData: rawDataArray,
    jsonData: jsonDataArray,
    excelData: excelDataArray,
  };
}

processAllFiles();

// convert pdf files to excel, raw and json formats and save them in the same directory for further processing and analysis of data.
