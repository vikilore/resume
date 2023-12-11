/* Generate PDF */

// Generate PDF with html2pdf.js
async function generateResume(filename) {
    var opt = {
        filename: filename,
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
            format: 'letter',
            orientation: 'portrait',
            unit: 'in',
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
            // mode: {
            //     before: '.experience_company',
            // },
        },
        promise: true
    };

    var container = document.getElementById('container');
    container.classList.add("pdf-container");

    try {
        // Use await with the html2pdf function directly
        await html2pdf().set(opt).from(container).save();
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
            const isDarkTheme = document.body.classList.contains(darkTheme);
            const ending = isDarkTheme ? "-dark" : "-light";
            const filename = document.getElementById('contact_title').textContent.split(' ').join('-').toLowerCase() + '-cv' + ending + '.pdf';
            // Generate the PDF
            console.log('Generating PDF...' + filename);
            await generateResume(filename);
            console.log('PDF generation successful!');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    });
});