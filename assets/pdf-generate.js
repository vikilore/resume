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
            scale: 1.6,
            useCORS: true,
            dpi: 300,
            letterRendering: true,
        },
        jsPDF: {
            format: 'a4',
            orientation: 'portrait',
            unit: 'mm'
        },
        // pagebreak: {
        //     mode: ['avoid-all', 'css', 'legacy']
        // },
        // Add the promise option
        pagebreak: {
            before: '.newPage',
            avoid: ['h1', 'h2', '.field']
        },

        promise: true
    };

    var container = document.getElementById('container');
    container.classList.add("pdf-container");

    try {
        // Use await with the html2pdf function directly
        await html2pdf().from(container).set(opt).save();
        container.classList.remove("pdf-container");
        console.log('PDF generated successfully!');
    } catch (error) {
        container.classList.remove("pdf-container");
        console.error('Error generating PDF:', error);
        throw error; // Rethrow the error to be caught in the calling function
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    const pdfButton = document.getElementById('pdf-button');

    // Action executed by clicking on the button => generation of the final PDF CV CV
    pdfButton.addEventListener("click", async () => {
        try {
            // Generate the PDF
            await generateResume();
            console.log('PDF generation successful!');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    });
});