document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate Form Inputs (optional for modern browsers with 'required')
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (firstName && lastName && email && message) {
        // Show confirmation message
        document.getElementById("confirmation-message").style.display = "block";

        // Optional: Clear the form
        document.getElementById("contact-form").reset();
    } else {
        alert("Please fill in all fields.");
    }
});
