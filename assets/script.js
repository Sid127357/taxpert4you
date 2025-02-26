// Auth Mobile number private data masking
function maskPhoneNumber(phoneNumber) {
    const maskedPart = "*****";
    const visiblePart = phoneNumber.slice(-5);

    return `${maskedPart}<span class="visible-digits">${visiblePart}</span>`;
}
// Replace with a real phone number dynamically
// document.addEventListener("DOMContentLoaded", function () {
//     const phoneElement = document.querySelector(".masked-phone");

//     if (phoneElement) {
//         phoneElement.innerHTML = maskPhoneNumber("9876587654");
//     }
// });

//Countdown for otp resend 
document.addEventListener("DOMContentLoaded", function () {
    const otpInputs = document.querySelectorAll(".otp-input");
    const resendButton = document.querySelector(".resend-button");
    const countdownElement = document.querySelector(".countdown");

    if (!resendButton || !countdownElement) return; // Exit if elements are not found

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


// Function to set up password toggle functionality for all password fields
document.addEventListener("DOMContentLoaded", function () {
    // Select all password toggle elements
    document.querySelectorAll(".toggle-password").forEach(function (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        let passwordInput = this.previousElementSibling; // Get the input field
        let icon = this.querySelector("i"); // Get the icon inside span
        
        // Toggle password visibility
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          passwordInput.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      });
    });
  });
// Password Strength Meter
document.addEventListener("DOMContentLoaded", function() {
    const strengthClasses = ['weak', 'fair', 'good', 'strong'];
    const passwordChecks = [
        pwd => pwd.length >= 8,
        pwd => /[a-zA-Z]/.test(pwd),
        pwd => /\d/.test(pwd),
        pwd => /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    ];

    document.querySelector(".password-input").addEventListener("input", function() {
        const strength = passwordChecks.filter(check => check(this.value)).length;
        
        document.querySelectorAll(".strength-bar").forEach((bar, index) => {
            bar.className = 'strength-bar' + (index < strength ? ` ${strengthClasses[index]}` : '');
        });
    });
});

// Verify Number OTP Filed auto Select
document.querySelectorAll(".otp-input").forEach((input, index, inputs) => {
    input.addEventListener("input", () => {
        if (input.value && index < inputs.length - 1) inputs[index + 1].focus();
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) inputs[index - 1].focus();
    });
});

// Navigation bar toggle
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const closeSidebarBtn = document.querySelector(".close-btn"); // Selecting the close button inside the sidebar
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function toggleSidebar() {
        if (isMobile()) {
            sidebar.classList.toggle("active");
            sidebarOverlay.classList.toggle("active");
        }
    }

    function closeSidebarMenu() {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
    }

    // Toggle Sidebar on Button Click
    sidebarToggle?.addEventListener("click", toggleSidebar);

    // Close Sidebar on Close Button Click
    closeSidebarBtn?.addEventListener("click", closeSidebarMenu);

    // Close Sidebar When Clicking Outside (Overlay)
    sidebarOverlay?.addEventListener("click", closeSidebarMenu);

    // Auto-close Sidebar When Resizing to Desktop View
    window.addEventListener("resize", function () {
        if (!isMobile()) {
            closeSidebarMenu();
        }
    });
});

// Star Rating System
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".star-rating").forEach(starContainer => {
        const stars = starContainer.querySelectorAll("i");
        
        stars.forEach((star, index) => {
            star.addEventListener("click", () => {
                stars.forEach((s, i) => {
                    s.classList.toggle("active", i <= index);
                });
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let removedFiles = [];

    document.querySelectorAll(".remove-file").forEach(button => {
        button.addEventListener("click", function () {
            let fileName = this.getAttribute("data-file");
            removedFiles.push(fileName);
            document.getElementById("removedAttachments").value = JSON.stringify(removedFiles);
            this.parentElement.remove();
        });
    });
});








