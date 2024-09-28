import jsPDF from "jspdf";

declare const window: any;

export const convertToPDF = (name: string) => {
  window.print();
  const doc = new jsPDF();

  const imageData = new Image();
  imageData.src = "/logo.png";
  imageData.onload = () => {
    const toPrint = document.getElementById("print");
    if (toPrint !== null) {
      const content = toPrint.innerHTML;
      doc.html(content, {
        callback: function () {
          doc.save(`${name}.pdf`);
        },
        x: 10,
        y: 10,
      });
    } else {
      console.error("Element with ID 'print' not found.");
    }
  };
};
