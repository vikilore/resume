/* Generate PDF */

// Generate PDF with html2pdf.js
function generateResume() {
    let opt = {
        margin: [-10, -2, 0, -2],
        filename: 'myResumeCV-light.pdf',
        image: {
            type: 'png',
            quality: 0.98
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            dpi: 300,
            letterRendering: true,
            // media: 'print'
        },
        jsPDF: {
            format: 'a4',
            orientation: 'portrait',
            unit: 'mm'
        },
        // pagebreak: {
        //     mode: 'avoid-all'
        // }, // Avoid page breaks inside elements
        // html2pdf: {
        //     media: 'print', // Use the print media type
        // },
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