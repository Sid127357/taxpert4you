import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdbh6W1aws-gxwuduqLZpPEJFr4zck1J0",
  authDomain: "taxpert--sign.firebaseapp.com",
  projectId: "taxpert--sign",
  storageBucket: "taxpert--sign.firebasestorage.app",
  messagingSenderId: "975929667452",
  appId: "1:975929667452:web:4edf69f3552376fa567ef9",
  measurementId: "G-KSM6S1MGVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = 'en';

const googleLogin = document.getElementById('google-login-btn');

if (googleLogin) {
  googleLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User logged in:", result.user);
        window.location.href = "https://taxpert4you.vercel.app/my-profile.html";
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  });
} else {
  console.log("Login button not found. Skipping login setup.");
}

function updateProfile(user) {
  let userName, userPhoto, userEmail, userPhone;

  if (user) {
    // User is logged in
    userName = user.displayName || "User";
    userPhoto = user.photoURL || "./assets/img/user-pages/icons/user.png";
    userEmail = user.email || "No email available";
    userPhone = user.phoneNumber || "No phone number";
  } else {
    // Default Guest Profile for non-logged-in users
    userName = "Satish Kumar";
    userPhoto = "../assets/img/user-pages/icons/guest-user.png";
    userEmail = "satishkumar@gmail.com";
    userPhone = "+91 7867567667";
  }

  // Update user details
  document.querySelectorAll('.user-name').forEach(el => el.innerHTML = userName);
  document.querySelectorAll('.user-photo').forEach(el => el.src = userPhoto);
  document.querySelectorAll('.user-email').forEach(el => el.innerHTML = `<i class="fa-regular fa-envelope"></i> ${userEmail}`);
  document.querySelectorAll('.user-phone').forEach(el => el.innerHTML = userPhone);

  // Fetch location info (only if user is logged in)
  if (user) {
    fetch("https://ipinfo.io/json?1a9a43e497627e")
      .then(response => response.json())
      .then(data => {
        const userLocation = `${data.city}, ${data.region}, ${data.country}`;
        document.querySelectorAll('.user-location').forEach(el => el.innerHTML = `<i class="fa-regular fa-location-dot"></i> ${userLocation}`);
      })
      .catch(error => {
        console.error("Error fetching location:", error);
        document.querySelectorAll('.user-location').forEach(el => el.innerHTML = "Location unavailable");
      });
  } else {
    document.querySelectorAll('.user-location').forEach(el => el.innerHTML = "Unknown Location");
  }
}

// Sign-out function
function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      updateProfile(null); // Reset to guest profile
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

// Attach event listener to sign-out button (if available)
const signOutButton = document.getElementById("signout-btn");
if (signOutButton) {
  signOutButton.addEventListener("click", logoutUser);
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
  updateProfile(user);
});
