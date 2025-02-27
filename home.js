import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase Config (Same as Before)
const firebaseConfig = {
    apiKey: "AIzaSyD8zCQiEgTh6z32OUMXjl_HLn-SA-Q4cb0",
    authDomain: "login-sample-148b9.firebaseapp.com",
    projectId: "login-sample-148b9",
    storageBucket: "login-sample-148b9.appspot.com",
    messagingSenderId: "997903262498",
    appId: "1:997903262498:web:86039b6666a89e7819fb7b",
    measurementId: "G-VG3Y6H7585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// UI Elements
const authButton = document.getElementById("auth-button");
const userInfo = document.getElementById("user-info");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");

// Check User Authentication Status
onAuthStateChanged(auth, (user) => {
    if (user) {
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");

        // Show user info
        authButton.style.display = "none";
        userInfo.style.display = "flex";

        // If user data is available from Firebase, use it; otherwise, use localStorage
        userName.innerText = storedName || user.displayName || "User";
        userEmail.innerText = storedEmail || user.email;
    } else {
        // Show login/signup button
        authButton.style.display = "block";
        userInfo.style.display = "none";
    }
});

// Redirect to Login/Signup
window.redirectToAuth = function() {
    window.location.href = "login.html";
};

// Logout Function
window.logout = function() {
    signOut(auth).then(() => {
        // Clear localStorage & refresh
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        window.location.href = "home.html"; // Redirect to home
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
};

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const isDarkMode = localStorage.getItem("darkMode") === "enabled";

    // Apply Dark Mode if Previously Enabled
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.innerText = "☀️ Light Mode";
    }

    // Toggle Dark Mode on Button Click
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.innerText = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.innerText = "🌙 Dark Mode";
        }
    });
});
