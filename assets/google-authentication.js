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

// import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// Google Sign-In function
function signInWithGoogle() {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log("User signed in with Google:", result.user);
      // Redirect to my-profile.html after successful sign-in
      window.location.href = "./my-profile.html";
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
    });
}

// Attach event listener to Google sign-in button
const googleLoginButton = document.getElementById("google-login-btn");
if (googleLoginButton) {
  googleLoginButton.addEventListener("click", signInWithGoogle);
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
    userPhoto = "../assets/img/user-pages/icons/user.png";
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
// Sign-out function
function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      // Redirect to home page after sign-out
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

// Attach event listener to sign-out button
const signOutButton = document.getElementById("signout-btn");
if (signOutButton) {
  signOutButton.addEventListener("click", logoutUser);
}


// Check authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    // Update UI for signed-in user (e.g., show profile link)
    updateUIForSignedInUser(user);
  } else {
    console.log("User is signed out.");
    // Update UI for signed-out user (e.g., show sign-in button)
    updateUIForSignedOutUser();
  }
});

// Update UI for signed-in user
function updateUIForSignedInUser(user) {
  const profileLink = document.getElementById("profile-link");
  if (profileLink) {
    profileLink.style.display = "block";
    profileLink.href = "./my-profile.html";
  }
}

// Update UI for signed-out user
function updateUIForSignedOutUser() {
  const profileLink = document.getElementById("profile-link");
  if (profileLink) {
    profileLink.style.display = "none";
  }
}

