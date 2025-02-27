import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword,  
    signInWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// ✅ Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD8zCQiEgTh6z32OUMXjl_HLn-SA-Q4cb0",
    authDomain: "login-sample-148b9.firebaseapp.com",
    projectId: "login-sample-148b9",
    storageBucket: "login-sample-148b9.appspot.com",
    messagingSenderId: "997903262498",
    appId: "1:997903262498:web:86039b6666a89e7819fb7b",
    measurementId: "G-VG3Y6H7585"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ✅ Toast Notification Function
function showToast(message, success = false) {
    const toast = document.getElementById("toast");
    if (!toast) return; // Prevent errors if element is missing
    toast.innerText = message;
    toast.style.backgroundColor = success ? "green" : "red";
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// 🚀 Optimized Login Function
window.login = function () {
    console.log("✅ Login function triggered!");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email) {
        showToast("⚠️ Please enter your email.");
        return;
    }
    if (!password) {
        showToast("⚠️ Please enter your password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // ✅ Store user details in localStorage immediately
            localStorage.setItem("userName", user.displayName || "User");
            localStorage.setItem("userEmail", user.email);

            showToast(`✅ Welcome Back ${user.displayName || "User"}!`, true);

            // ✅ Redirect to index.html instead of home.html
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1500);
        })
        .catch((error) => {
            console.error("Login Error:", error);

            let errorMessage;
            if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
                errorMessage = "❌ User not registered. Please sign up.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "❌ Invalid email format.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "❌ Incorrect password.";
            } else {
                errorMessage = "❌ " + error.message;
            }

            showToast(errorMessage);
        });
};

// ✅ Strong password validation regex
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

window.signup = function () {
    console.log("✅ Signup function triggered!");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        showToast("⚠️ All fields are required.");
        return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
        showToast("⚠️ Password must meet the criteria.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("✅ Firebase User Created:", user);

            updateProfile(user, { displayName: name })
                .then(() => {
                    console.log("✅ Profile Updated:", user.displayName);
                    showToast("✅ Account Created Successfully!", true);

                    // Store user details in Firebase Database (optional)
                    localStorage.setItem("userName", name);
                    localStorage.setItem("userEmail", email);

                    // Redirect to home page
                    setTimeout(() => {
                        window.location.href = "home.html";
                    }, 1000);
                })
                .catch((error) => {
                    console.error("❌ Profile Update Failed:", error);
                    showToast("❌ " + error.message);
                });
        })
        .catch((error) => {
            console.error("❌ Signup Error:", error);
            showToast("❌ " + error.message);
        });
};




// ✅ Fixing Password Toggle
window.togglePassword = function(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (!passwordInput) return;
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
};

// 🚀 Logout Function
window.logout = function () {
    signOut(auth).then(() => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        showToast("✅ Logged out successfully!", true);
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000);
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
};

// ✅ Ensure Authentication Status Updates UI
onAuthStateChanged(auth, (user) => {
    const authButton = document.getElementById("auth-button");
    const userInfo = document.getElementById("user-info");
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");

    if (user) {
        authButton.style.display = "none";
        userInfo.style.display = "flex";
        userName.innerText = `Welcome ${user.displayName || "User"}`;
        userEmail.innerText = `${user.email}`;
    } else {
        authButton.style.display = "block";
        userInfo.style.display = "none";
    }
});

window.signup = signup;
window.login = login;
