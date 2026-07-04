// Active Navigation
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

link.addEventListener("click",function(){

links.forEach(item=>item.classList.remove("active"));

this.classList.add("active");

});

});


// Simple Welcome

window.onload=function(){

console.log("Student Performance Analytics Portal Loaded Successfully");

};

const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("name").value.trim();
const email=document.getElementById("email").value.trim();
const message=document.getElementById("message").value.trim();

if(name==="" || email==="" || message===""){

alert("Please fill all required fields.");

return;

}

alert("Message sent successfully!");

contactForm.reset();

});

}
/* ==========================
   ADD • SEARCH • DELETE
========================== */

const studentForm = document.getElementById("studentForm");
const studentTable = document.querySelector("#studentTable tbody");
const searchInput = document.getElementById("searchInput");

if(studentForm){

studentForm.addEventListener("submit",function(e){

e.preventDefault();

const id=document.getElementById("studentID").value;
const name=document.getElementById("studentName").value;
const department=document.getElementById("department").value;
const semester=document.getElementById("semester").value;
const gpa=document.getElementById("gpa").value;
const status=document.getElementById("status").value;

const row=studentTable.insertRow();

row.innerHTML=`
<td>${id}</td>
<td>${name}</td>
<td>${department}</td>
<td>${semester}</td>
<td>${gpa}</td>
<td>${status}</td>
<td><button class="delete-btn">Delete</button></td>
`;

studentForm.reset();

updateDeleteButtons();
updateStudentCount();

});

}

/* SEARCH */

if(searchInput){

searchInput.addEventListener("keyup",function(){

const filter=this.value.toLowerCase();

const rows=studentTable.getElementsByTagName("tr");

for(let i=0;i<rows.length;i++){

const text=rows[i].textContent.toLowerCase();

rows[i].style.display=text.includes(filter)?"":"none";

}

});

}

/* DELETE */

function updateDeleteButtons(){

const buttons=document.querySelectorAll(".delete-btn");

buttons.forEach(button=>{

button.onclick=function(){

this.parentElement.parentElement.remove();

updateStudentCount();

}

});

}

updateDeleteButtons();

/* TOTAL STUDENTS CARD */

function updateStudentCount(){

function updateStudentCount(){

    if(!studentTable) return;

    const total = studentTable.rows.length;

    const totalCard = document.querySelector(".dashboard-card h2");

    if(totalCard){
        totalCard.innerText = total;
    }

}

const totalCard=document.querySelector(".dashboard-card h2");

if(totalCard){

totalCard.innerText=total;

}

}

updateStudentCount();


/* ==========================
   DASHBOARD CARDS
========================== */

const totalStudents = document.getElementById("totalStudents");
const totalCourses = document.getElementById("totalCourses");
const averageGPA = document.getElementById("averageGPA");
const attendance = document.getElementById("attendance");

if (
    totalStudents &&
    totalCourses &&
    averageGPA &&
    attendance &&
    studentTable
) {
    totalStudents.innerHTML = studentTable.rows.length;
    totalCourses.innerHTML = "24";
    averageGPA.innerHTML = "3.54";
    attendance.innerHTML = "92%";
}
/* =====================================
   REGISTER FUNCTION
===================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        const confirm = document.getElementById("confirmPassword").value.trim();

        if (name === "" || email === "" || password === "" || confirm === "") {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirm) {
            alert("Passwords do not match.");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("studentUser", JSON.stringify(user));

        alert("Registration Successful!");

        window.location.href = "login.html";

    });

}


/* =====================================
   LOGIN FUNCTION
===================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const user = JSON.parse(localStorage.getItem("studentUser"));

        if (!user) {

            alert("Please register first.");

            return;

        }

        if (email === user.email && password === user.password) {

            localStorage.setItem("loggedIn", "true");

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid Email or Password.");

        }

    });

}
/* =====================================
   LOGOUT
===================================== */

function logout(){

    localStorage.removeItem("loggedIn");

    alert("Logged Out Successfully.");

    window.location.href = "login.html";

}