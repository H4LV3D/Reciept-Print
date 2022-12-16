var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
document.getElementById("date").value = date;
document.getElementById("today").innerText = date;

localStorage.setItem("patientNo", 01);

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
  r_cardno.innerText = cardno.value;
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

let checkboxes = document.getElementsByName("check");
let checked = [];
function newed(id) {
  let me = document.getElementById(id);
  if (me.checked) {
    checked.push(me.value);
  }
}

function printme() {
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
  var doc = new jsPDF();
  function saveDiv(title) {
    doc.fromHTML(
      `<html><head><title>${title}</title></head><body>` +
        document.getElementById("print").innerHTML +
        `${checked}` +
        `</body></html>`
    );
    doc.save(`${cardno.value}.pdf`);
  }
  let Reciept = "reciept";
  saveDiv(Reciept);
}

// TIME
function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh === 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("clock").value = time;
  document.getElementById("time").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

currentTime();
