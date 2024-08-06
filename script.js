document.getElementById('generatePDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.getElementById('content'), { scale: 3 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('formato_inspeccion.pdf');
    });
});