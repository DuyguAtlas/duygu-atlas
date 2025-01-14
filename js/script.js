// Add event listeners to all anchor tags inside .pdf-link divs
document.querySelectorAll(".pdf-link a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default link action

        // Get the PDF file from the clicked link's data-pdf attribute
        const pdfFile = this.getAttribute("data-pdf");

        if (pdfFile) {
            // Set the PDF file in the iframe
            const pdfViewer = document.getElementById("pdfViewer");
            pdfViewer.src = pdfFile;

            // Show the PDF container
            document.getElementById("pdfContainer").classList.add("open");
        } else {
            console.error("No data-pdf attribute found on the clicked link.");
        }
    });
});

// Close the PDF viewer when clicking the close button
document.getElementById("closePdf").addEventListener("click", function() {
    document.getElementById("pdfContainer").classList.remove("open");
});

// Close the PDF viewer when clicking outside the PDF container
document.addEventListener("click", function(event) {
    const pdfContainer = document.getElementById("pdfContainer");

    // Check if the click happened outside the container and not on any .pdf-link elements
    if (!pdfContainer.contains(event.target) && !event.target.closest(".pdf-link")) {
        pdfContainer.classList.remove("open");
    }
});



// Create an IntersectionObserver to observe the hidden elements
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        // If the element is in view, add the 'show' class
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Unobserve the element after it has entered the viewport
            observer.unobserve(entry.target);
        }
    });
}, {
    // The observer will trigger the callback only once per element
    threshold: 0.1 // Start observing when 10% of the element is in view
});

// Select all elements with the 'hidden' class
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

console.log("Clicked element:", event.target);
console.log("PDF file:", this.getAttribute("data-pdf"));
