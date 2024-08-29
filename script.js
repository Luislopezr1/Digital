// Import necessary libraries
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Function to download PDF
function downloadPDF() {
  const element = document.body; // or any specific element you want to capture
  const pdfWidth = 8.5; // Width of legal size paper in inches
  const pdfHeight = 14; // Height of legal size paper in inches
  const scale = 2; // Increase scale for better quality

  html2canvas(element, { scale: scale }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'in', [pdfWidth, pdfHeight]);
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    
    pdf.save('document.pdf');
  });
}

// Add event listener to a button
document.getElementById('downloadBtn').addEventListener('click', downloadPDF);