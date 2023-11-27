/* Generate PDF */

// Generate PDF with html2pdf.js
function generateResume() {

    // html2pdf.js options
    let opt = {
        margin: [0, 0, 0, 0],
        filename: 'myResumeCV-light.pdf',
        image: {
            type: 'png',
            quality: 0.98
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            width: 1000,
            dpi: 300,
            letterRendering: true,
        },
        jsPDF: {
            format: 'a4',
            orientation: 'portrait',
            units: 'mm'
        }
    };

    var container = document.getElementById('container');
    html2pdf(container, opt);
}

window.addEventListener("DOMContentLoaded", (event) => {

    const pdfButton = document.getElementById('pdf-button');

    // Action executed by clicking on the button => generation of the final PDF CV CV
    pdfButton.addEventListener("click", () => {
        // Generate the PDF
        generateResume();
    })
});