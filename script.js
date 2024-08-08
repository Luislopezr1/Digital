document.getElementById('generatePDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.getElementById('content'), { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', [216, 356]); 

        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        let imgHeight = (canvas.height * pdfWidth) / canvas.width;
        let position = 0;

        
        while (position < canvas.height) {
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = Math.min(canvas.height - position, pdfHeight * canvas.width / pdfWidth);

            const ctx = pageCanvas.getContext('2d');
            ctx.drawImage(canvas, 0, position, pageCanvas.width, pageCanvas.height, 0, 0, pageCanvas.width, pageCanvas.height);
            const pageImgData = pageCanvas.toDataURL('image/png');

            pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, (pageCanvas.height * pdfWidth) / pageCanvas.width);

            position += pageCanvas.height;

            if (position < canvas.height) {
                pdf.addPage();
            }
        }

        pdf.save('formato_inspeccion.pdf');
    });
});