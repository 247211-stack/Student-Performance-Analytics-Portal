// ===============================
// Student Performance Analytics Portal
// Authentication Script
// Week 3 - Part 1
// ===============================

// Show / Hide Password
function togglePassword(inputId, icon) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";
        icon.textContent = "🙈";

    } else {

        input.type = "password";
        icon.textContent = "👁";

    }

}

// ===============================
// Register
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        if (password !== confirmPassword) {

            message.style.color = "red";
            message.textContent = "Passwords do not match.";
            return;

        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const emailExists = users.find(user => user.email === email);

        if (emailExists) {

            message.style.color = "red";
            message.textContent = "Email already registered.";
            return;

        }

        users.push({

            name: name,
            email: email,
            password: password

        });

        localStorage.setItem("users", JSON.stringify(users));

        message.style.color = "green";
        message.textContent = "Registration Successful.";

        registerForm.reset();

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });

}

// ===============================
// Login
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(user =>
            user.email === email &&
            user.password === password
        );

        if (!validUser) {

            message.style.color = "red";
            message.textContent = "Invalid Email or Password.";

            return;

        }

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(validUser)
        );

        message.style.color = "green";
        message.textContent = "Login Successful.";

        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 1000);

    });

}
// ===============================
// Forgot Password
// ===============================

const forgotPasswordForm = document.getElementById("forgotPasswordForm");

if (forgotPasswordForm) {

    forgotPasswordForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("forgotEmail").value.trim();
        const message = document.getElementById("forgotMessage");

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(user => user.email === email);

        if (!user) {

            message.style.color = "red";
            message.textContent = "Email not found.";

            return;

        }

        localStorage.setItem("resetEmail", email);

        message.style.color = "green";
        message.textContent = "Email verified.";

        setTimeout(function () {

            window.location.href = "reset-password.html";

        }, 1000);

    });

}

// ===============================
// Reset Password
// ===============================

const resetPasswordForm = document.getElementById("resetPasswordForm");

if (resetPasswordForm) {

    resetPasswordForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmNewPassword").value;

        const message = document.getElementById("resetMessage");

        if (newPassword !== confirmPassword) {

            message.style.color = "red";
            message.textContent = "Passwords do not match.";

            return;

        }

        const email = localStorage.getItem("resetEmail");

        let users = JSON.parse(localStorage.getItem("users")) || [];

        users = users.map(function (user) {

            if (user.email === email) {

                user.password = newPassword;

            }

            return user;

        });

        localStorage.setItem("users", JSON.stringify(users));

        localStorage.removeItem("resetEmail");

        message.style.color = "green";
        message.textContent = "Password Reset Successfully.";

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });

}

// ===============================
// Dashboard Security
// ===============================

if (window.location.pathname.includes("dashboard.html")) {

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {

        window.location.href = "login.html";

    }

}

// ===============================
// Logout Function
// ===============================

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";

}

// ===============================
// Remember Me (Simple Simulation)
// ===============================

const rememberMe = document.getElementById("rememberMe");

if (rememberMe) {

    rememberMe.addEventListener("change", function () {

        if (this.checked) {

            localStorage.setItem("rememberMe", "true");

        } else {

            localStorage.removeItem("rememberMe");

        }

    });

}