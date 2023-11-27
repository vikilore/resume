/* Generate PDF */

// Generate PDF with html2pdf.js
async function generateResume() {
    let opt = {
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
        },
        jsPDF: {
            format: 'a4',
            orientation: 'portrait',
            unit: 'mm'
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy']
        }
    };

    var container = document.getElementById('container');
    container.classList.add("pdf-container");

    // Wrap the html2pdf call in a Promise
    return new Promise((resolve, reject) => {
        html2pdf(container, opt, () => {
            container.classList.remove("pdf-container");
            resolve();
        }, (error) => {
            container.classList.remove("pdf-container");
            reject(error);
        });
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    const pdfButton = document.getElementById('pdf-button');

    // Action executed by clicking on the button => generation of the final PDF CV CV
    pdfButton.addEventListener("click", async () => {
        try {
            // Generate the PDF
            await generateResume();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    });
});