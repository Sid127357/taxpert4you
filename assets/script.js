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
    const otpInputs = document.querySelectorAll(".otp-input");
    const resendButton = document.querySelector(".resend-button");
    const countdownElement = document.querySelector(".countdown");

    let countdown = 60; // Initial countdown time in seconds
    let timer; // To store the timer reference

    // Disable resend button initially & start countdown
    resendButton.disabled = true;
    startCountdown();

    otpInputs.forEach((input, index, inputs) => {
        input.addEventListener("input", () => {
            if (input.value && index < inputs.length - 1) inputs[index + 1].focus();
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && index > 0) inputs[index - 1].focus();
        });
    });

    function startCountdown() {
        resendButton.disabled = true; // Keep the button disabled
        countdownElement.textContent = `(${countdown}s)`;

        timer = setInterval(() => {
            countdown--;
            countdownElement.textContent = `(${countdown}s)`;

            if (countdown <= 0) {
                clearInterval(timer);
                resendButton.disabled = false; // Enable the button when countdown ends
                countdownElement.textContent = ""; // Clear countdown text
            }
        }, 1000);
    }

    // Restart countdown when resend button is clicked
    resendButton.addEventListener("click", () => {
        if (!resendButton.disabled) {
            clearInterval(timer); // Clear previous timer if exists
            countdown = 60; // Reset countdown
            startCountdown(); // Restart countdown
        }
    });
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

// Verify Number OTP Filed auto Select
document.querySelectorAll(".otp-input").forEach((input, index, inputs) => {
    input.addEventListener("input", () => {
        if (input.value && index < inputs.length - 1) inputs[index + 1].focus();
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) inputs[index - 1].focus();
    });
});





