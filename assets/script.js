// Auth Mobile number private data masking
function maskPhoneNumber(phoneNumber) {
    const maskedPart = "*****";
    const visiblePart = phoneNumber.slice(-5); 

    return `${maskedPart}<span class="visible-digits">${visiblePart}</span>`;
}
// Replace with a real phone number dynamically
document.querySelector(".masked-phone").innerHTML = maskPhoneNumber("9876587654");

//Countdown for otp resend 
document.addEventListener("DOMContentLoaded", function () {
    let countdownElement = document.querySelector(".countdown");
    let resendButton = document.querySelector(".resend-button");
    let timeLeft = 37; // Initial countdown time

    function updateCountdown() {
        countdownElement.textContent = `(${timeLeft}s)`;
        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateCountdown, 1000);
        } else {
            resendButton.removeAttribute("disabled");
            countdownElement.textContent = ""; // Hide countdown when expired
        }
    }

    updateCountdown(); // Start countdown
});

// Setup password strength
function togglePassword(fieldId, iconId) {
    let passwordField = document.getElementById(fieldId);
    let icon = document.getElementById(iconId);

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}




