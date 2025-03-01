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

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 500);
});

// Handle Coming Soon Cards
document.querySelectorAll('[data-coming-soon]').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Content coming soon! Stay tuned for updates.');
    });
});

// Toast Notification System
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast animate-fade-up';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.zIndex = '2000';
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 20px)';
        toast.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

// Smooth Scroll Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-fade-up').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// Background Animation
function updateBackground() {
    const bubbles = document.querySelectorAll('.bg-animation div');
    bubbles.forEach(bubble => {
        const rect = bubble.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            bubble.style.transform = 'translateY(-100vh)';
        }
    });
}

// Update background on scroll
window.addEventListener('scroll', updateBackground);

// Handle video loading
const videoContainer = document.querySelector('.video-container');
const iframe = videoContainer.querySelector('iframe');

iframe.addEventListener('load', () => {
    videoContainer.classList.add('loaded');
});

// Add hover effect for resource links
document.querySelectorAll('.resource-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(10px)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
    });
});


// Function to show login popup
function showLoginPopup() {
    document.getElementById("loginPopup").style.display = "flex";
}

// Function to handle authentication check and redirect
function handleAuthRedirect(url) {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    if (isLoggedIn) {
        window.location.href = url; // Redirect if logged in
    } else {
        showLoginPopup(); // Show the popup instead of alert
    }
}

// Add event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mcqButton").addEventListener("click", () => {
        handleAuthRedirect("https://rahulpattadi.github.io/simplifiedmindsSSLC/Physics/All_Light_MCQ_PYQ.html");
    });

    document.getElementById("qaButton").addEventListener("click", () => {
        handleAuthRedirect("https://rahulpattadi.github.io/simplifiedmindsSSLC/Physics/All_Light_PYQ.html");
    });

    // Close popup on button click
    document.getElementById("loginPopupClose").addEventListener("click", () => {
        document.getElementById("loginPopup").style.display = "none";
    });

    // Redirect to login page when clicking the "Login Now" button
    document.getElementById("loginNowBtn").addEventListener("click", () => {
        window.location.href = "login.html";
    });
});

// ✅ Ensure Authentication Status Updates
onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem("userLoggedIn", "true");
    } else {
        localStorage.setItem("userLoggedIn", "false");
    }
});