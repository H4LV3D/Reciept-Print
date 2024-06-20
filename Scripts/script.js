var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
document.getElementById("date").value = date;
document.getElementById("today").innerText = date;

localStorage.setItem("patientNo", "01");

function convertToUppercaseAndRemoveSpaces(str) {
  return str.toUpperCase().replace(/ /g, "");
}

function clickme() {
  let cardno = document.getElementById("cardno");
  let p_name = document.getElementById("p_name");
  let p_method = document.getElementById("drop");
  let p_total = document.getElementById("p_total");
  let p_paid = document.getElementById("p_paid");
  let outstand = document.getElementById("p_outstanding");
  let r_cardno = document.getElementById("r_cardno");
  let r_name = document.getElementById("r_name");
  let r_paid = document.getElementById("r_paid");
  let r_pay = document.getElementById("r_pay");
  let r_out = document.getElementById("r_out");
  let r_date = document.getElementById("r_date");

  p_outstanding = p_total.value - p_paid.value;
  outstand.value = p_outstanding;
  r_cardno.innerText = convertToUppercaseAndRemoveSpaces(cardno.value);
  r_name.innerText = p_name.value;
  r_paid.innerText = p_paid.value;
  r_out.innerText = p_outstanding;
  r_pay.innerText = p_method.innerText;
  let dates =
    today.getFullYear() +
    "0" +
    (today.getMonth() + 1) +
    today.getDate() +
    `${localStorage.getItem("patientNo")}`;
  r_date = dates;
}

let r_date = document.getElementById("r_date");
let dates =
  today.getFullYear() +
  "0" +
  (today.getMonth() + 1) +
  today.getDate() +
  `${localStorage.getItem("patientNo")}`;
r_date.innerText = dates;
let patient = localStorage.getItem("patientNo");

function onChange(e) {
  let text = document.getElementById(e).innerText;
  document.getElementById("drop").innerText = text;
  document.getElementById("r_pay").innerText = text;
  return text;
}

let checkboxValues = [];
function newed(id) {
  let paymentReason = document.getElementById(id);
  if (paymentReason.checked) {
    checkboxValues.push(paymentReason.value);
  } else {
    const index = checkboxValues.indexOf(paymentReason.value);
    if (index > -1) {
      checkboxValues.splice(index, 1);
    }
  }
}

function printme() {
  // if (cardno.value === "" || p_name.value === "" || p_paid.value === "") {
  //   alert("Enter card Number or patient Name or Amount Paid");
  //   return 0;
  // } else {
  window.print();
  patient++;
  localStorage.setItem("patientNo", patient);
  let r_date = document.getElementById("r_date");
  let dates =
    today.getFullYear() +
    "0" +
    (today.getMonth() + 1) +
    today.getDate() +
    `${localStorage.getItem("patientNo")}`;
  r_date.innerText = dates;
  let cardno = document.getElementById("cardno");

  //   var doc = new jsPDF();
  //   function saveDiv() {
  //     let imageData = new Image();
  //     imageData.src = "./logo.png";
  //     imageData.onload = () => {
  //       // doc.addImage(imageData, "PNG", 0, 0, 60, 60);
  //       let toPrint = document.getElementById("print");
  //       doc.fromHTML(
  //         toPrint,
  //         0,
  //         0,
  //         {
  //           width: 100,
  //         },
  //         function () {
  //           doc.save(`${cardno.value}.pdf`);
  //         }
  //       );
  //     };
  //   }
  // }
  // saveDiv();
  var doc = new jsPDF();
  function saveDiv(title) {
    doc.fromHTML(
      `<html><head><title>${title}</title></head><body>` +
        document.getElementById("print").innerHTML +
        `</body></html>`
    );
    doc.save(`${cardno.value}.pdf`);
  }
  let Reciept = "reciept";
  saveDiv(Reciept);
}
// }

// TIME
function currentTime() {
  const date = new Date();
  let hh = date.getHours();
  let session = "AM";

  if (hh === 0) {
    hh = 12;
  } else if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  const formattedHour = hh < 10 ? `0${hh}` : hh;
  const formattedMinute = date.getMinutes().toString().padStart(2, "0");
  const formattedSecond = date.getSeconds().toString().padStart(2, "0");

  const time = `${formattedHour}:${formattedMinute}:${formattedSecond} ${session}`;

  document.getElementById("clock").value = time;
  document.getElementById("time").innerText = time;

  setTimeout(currentTime, 1000);
}

currentTime();
