/* =====================================
   STUDENT PERFORMANCE ANALYTICS PORTAL
   WEEK 3
===================================== */

/* ==========================
   ACTIVE NAVIGATION
========================== */

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", function () {

        links.forEach(item => item.classList.remove("active"));

        this.classList.add("active");

    });

});


/* ==========================
   PAGE LOADED
========================== */

window.onload = function () {

    console.log("Student Performance Analytics Portal Loaded Successfully");

};


/* ==========================
   CONTACT FORM
========================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {

            alert("Please fill all required fields.");

            return;

        }

        alert("Message Sent Successfully!");

        contactForm.reset();

    });

}


/* ==========================
   STUDENT DATA
========================== */

let students = [];

if (localStorage.getItem("students")) {

    students = JSON.parse(localStorage.getItem("students"));

} else {

    students = [

        {
            id: "101",
            name: "Ali Khan",
            department: "BSCS",
            semester: "4",
            gpa: "3.82",
            status: "Excellent"
        },

        {
            id: "102",
            name: "Ayesha Noor",
            department: "BSIT",
            semester: "3",
            gpa: "3.56",
            status: "Good"
        },

        {
            id: "103",
            name: "Hamza Ali",
            department: "BSSE",
            semester: "5",
            gpa: "3.91",
            status: "Excellent"
        },

        {
            id: "104",
            name: "Fatima Ahmed",
            department: "BSAI",
            semester: "2",
            gpa: "3.74",
            status: "Very Good"
        },

        {
            id: "105",
            name: "Usman Tariq",
            department: "BSCS",
            semester: "6",
            gpa: "3.96",
            status: "Outstanding"
        }

    ];

    localStorage.setItem("students", JSON.stringify(students));

}


/* ==========================
   DASHBOARD ELEMENTS
========================== */

const studentForm = document.getElementById("studentForm");

const studentTable = document.querySelector("#studentTable tbody");

const searchInput = document.getElementById("searchInput");

const totalStudents = document.getElementById("totalStudents");

const totalCourses = document.getElementById("totalCourses");

const averageGPA = document.getElementById("averageGPA");

const attendance = document.getElementById("attendance");

/* ==========================
   SHOW STUDENTS
========================== */

function displayStudents() {

    if (!studentTable) return;

    studentTable.innerHTML = "";

    students.forEach(student => {

        studentTable.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.semester}</td>

            <td>${student.gpa}</td>

            <td>${student.status}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteStudent('${student.id}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateDashboardCards();

}


/* ==========================
   ADD STUDENT
========================== */

if (studentForm) {

    studentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const student = {

            id: document.getElementById("studentID").value.trim(),

            name: document.getElementById("studentName").value.trim(),

            department: document.getElementById("department").value.trim(),

            semester: document.getElementById("semester").value.trim(),

            gpa: document.getElementById("gpa").value.trim(),

            status: document.getElementById("status").value.trim()

        };

        students.push(student);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();

        studentForm.reset();

    });

}


/* ==========================
   DELETE STUDENT
========================== */

function deleteStudent(id) {

    students = students.filter(student => student.id !== id);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

}


/* ==========================
   DASHBOARD CARDS
========================== */

function updateDashboardCards() {

    if (!totalStudents) return;

    totalStudents.innerHTML = students.length;

    totalCourses.innerHTML = "24";

    attendance.innerHTML = "92%";

    let total = 0;

    students.forEach(student => {

        total += parseFloat(student.gpa);

    });

    averageGPA.innerHTML = (total / students.length).toFixed(2);

}


/* ==========================
   INITIAL LOAD
========================== */

displayStudents();
/* ==========================
   ADVANCED SEARCH
========================== */

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = studentTable.querySelectorAll("tr");

        rows.forEach(row => {

            if (row.innerText.toLowerCase().includes(value)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}


/* ==========================
   SORT BY NAME
========================== */

const sortName = document.getElementById("sortName");

if (sortName) {

    sortName.addEventListener("click", function () {

        students.sort(function (a, b) {

            return a.name.localeCompare(b.name);

        });

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();

    });

}


/* ==========================
   SORT BY GPA
========================== */

const sortGPA = document.getElementById("sortGPA");

if (sortGPA) {

    sortGPA.addEventListener("click", function () {

        students.sort(function (a, b) {

            return parseFloat(b.gpa) - parseFloat(a.gpa);

        });

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();

    });

}


/* ==========================
   RESET STUDENT DATA
========================== */

const resetData = document.getElementById("resetData");

if (resetData) {

    resetData.addEventListener("click", function () {

        if (confirm("Are you sure you want to reset all student data?")) {

            localStorage.removeItem("students");

            location.reload();

        }

    });

}
/* =====================================
   WELCOME LOGGED IN USER
===================================== */

const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedUser) {

    const welcomeUser = document.getElementById("welcomeUser");

    if (welcomeUser) {

        welcomeUser.textContent = loggedUser.name;

    }

}


/* =====================================
   STUDENT PROFILE
===================================== */

if (loggedUser) {

    const profileName = document.getElementById("profileName");

    const profileEmail = document.getElementById("profileEmail");

    if (profileName) {

        profileName.textContent = loggedUser.name;

    }

    if (profileEmail) {

        profileEmail.textContent = loggedUser.email;

    }

}


/* =====================================
   LOGOUT
===================================== */

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully.");

    window.location.href = "login.html";

}


/* =====================================
   SIMPLE ANIMATION
===================================== */

const cards = document.querySelectorAll(
    ".dashboard-card, .action-card, .progress-card, .activity-card"
);

cards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", function () {

        card.style.transform = "translateY(0px)";

    });

});


/* =====================================
   END OF SCRIPT
===================================== */

console.log("Week 3 Script Loaded Successfully");