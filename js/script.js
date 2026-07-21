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
id:"101",
name:"Ali Khan",
department:"BSCS",
semester:"4",
gpa:"3.82",
status:"Excellent"
},

{
id:"102",
name:"Ayesha Noor",
department:"BSIT",
semester:"3",
gpa:"3.56",
status:"Good"
},

{
id:"103",
name:"Hamza Ali",
department:"BSSE",
semester:"5",
gpa:"3.91",
status:"Excellent"
},

{
id:"104",
name:"Fatima Ahmed",
department:"BSAI",
semester:"2",
gpa:"3.74",
status:"Very Good"
},

{
id:"105",
name:"Usman Tariq",
department:"BSCS",
semester:"6",
gpa:"3.96",
status:"Outstanding"
},

{
id:"106",
name:"Bilal Ahmed",
department:"BSIT",
semester:"4",
gpa:"3.43",
status:"Good"
},

{
id:"107",
name:"Sara Khan",
department:"BSSE",
semester:"6",
gpa:"3.88",
status:"Excellent"
},

{
id:"108",
name:"Zain Ali",
department:"BSAI",
semester:"5",
gpa:"3.61",
status:"Very Good"
},

{
id:"109",
name:"Hina Noor",
department:"BSCS",
semester:"2",
gpa:"3.27",
status:"Good"
},

{
id:"110",
name:"Ahmed Raza",
department:"BSIT",
semester:"7",
gpa:"3.99",
status:"Outstanding"
},

{
id:"111",
name:"Areeba Fatima",
department:"BSCS",
semester:"1",
gpa:"3.31",
status:"Good"
},

{
id:"112",
name:"Talha Aslam",
department:"BSSE",
semester:"8",
gpa:"3.79",
status:"Excellent"
},

{
id:"113",
name:"Maham Yousaf",
department:"BSAI",
semester:"4",
gpa:"3.58",
status:"Very Good"
},

{
id:"114",
name:"Abdullah Khan",
department:"BSCS",
semester:"5",
gpa:"3.92",
status:"Outstanding"
},

{
id:"115",
name:"Iqra Javed",
department:"BSIT",
semester:"3",
gpa:"3.47",
status:"Good"
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
const departmentFilter = document.getElementById("departmentFilter");
const semesterFilter = document.getElementById("semesterFilter");
const statusFilter = document.getElementById("statusFilter");

const totalStudents = document.getElementById("totalStudents");

const totalCourses = document.getElementById("totalCourses");

const averageGPA = document.getElementById("averageGPA");

const attendance = document.getElementById("attendance");

/* ==========================
   SHOW STUDENTS
========================== */
let currentPage = 1;

const rowsPerPage = 5;
function displayStudents() {

    if (!studentTable) return;

    studentTable.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;

     const end = start + rowsPerPage;

const pageStudents = students.slice(start, end);

pageStudents.forEach(student => {

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
    const pageInfo = document.getElementById("pageInfo");

if(pageInfo){

    const totalPages = Math.ceil(students.length / rowsPerPage);

    pageInfo.innerHTML = `Page ${currentPage} of ${totalPages}`;

}

}


/* ==========================
   ADD STUDENT
========================== */

if (studentForm) {

    studentForm.addEventListener("submit", function (e) {

        e.preventDefault();
        
        const formMessage = document.getElementById("formMessage");

const id=document.getElementById("studentID").value.trim();

const name=document.getElementById("studentName").value.trim();

const department=document.getElementById("department").value.trim();

const semester=document.getElementById("semester").value.trim();

const gpa=document.getElementById("gpa").value.trim();

const status=document.getElementById("status").value.trim();
const student = {

id,

name,

department,

semester,

gpa,

status

};
if(id==="" || name==="" || department==="" || semester==="" || gpa==="" || status===""){

formMessage.className="error-message";

formMessage.innerHTML="Please fill all fields.";

return;

}

if(isNaN(gpa) || gpa<0 || gpa>4){

formMessage.className="error-message";

formMessage.innerHTML="GPA must be between 0 and 4.";

return;

}

if(semester<1 || semester>8){

formMessage.className="error-message";

formMessage.innerHTML="Semester must be between 1 and 8.";

return;

}

if(students.some(s=>s.id===id)){

formMessage.className="error-message";

formMessage.innerHTML="Student ID already exists.";

return;

} 

        students.push(student);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();
        loadCharts();

        studentForm.reset();
        formMessage.className="success-message";

formMessage.innerHTML="Student added successfully.";

setTimeout(function(){

formMessage.style.display="none";

},3000);

    });

}


/* ==========================
   DELETE STUDENT
========================== */

function deleteStudent(id) {

    students = students.filter(student => student.id !== id);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    loadCharts();

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

function filterStudents(){

    const search = searchInput.value.toLowerCase();

    const department = departmentFilter.value;

    const semester = semesterFilter.value;

    const status = statusFilter.value;

    const rows = studentTable.querySelectorAll("tr");

    rows.forEach(row=>{

        const id=row.cells[0].innerText.toLowerCase();

        const name=row.cells[1].innerText.toLowerCase();

        const dep=row.cells[2].innerText;

        const sem=row.cells[3].innerText;

        const stat=row.cells[5].innerText;

        const matchSearch=id.includes(search) || name.includes(search);

        const matchDepartment=!department || dep===department;

        const matchSemester=!semester || sem===semester;

        const matchStatus=!status || stat===status;

        if(matchSearch && matchDepartment && matchSemester && matchStatus){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }

    });

}
searchInput.addEventListener("keyup",filterStudents);

departmentFilter.addEventListener("change",filterStudents);

semesterFilter.addEventListener("change",filterStudents);

statusFilter.addEventListener("change",filterStudents);

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
        loadCharts();

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
        loadCharts();

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
/* ==========================
   DARK MODE
========================== */

const themeBtn = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-mode");

    if(themeBtn){
        themeBtn.innerHTML="☀️ Light Mode";
    }

}

if(themeBtn){

    themeBtn.addEventListener("click",function(){

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){

            localStorage.setItem("theme","dark");

            this.innerHTML="☀️ Light Mode";

        }

        else{

            localStorage.setItem("theme","light");

            this.innerHTML="🌙 Dark Mode";

        }

    });

}
/* ==========================
   ROLE BASED SIDEBAR
========================== */

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {

    const roleText = document.getElementById("userRole");

    if (roleText) {
        roleText.textContent = loggedInUser.role;
    }

    const menu = document.getElementById("sidebarMenu");

    if (menu) {

        if (loggedInUser.role === "Administrator") {

            menu.innerHTML = `
                <li class="active"><a href="dashboard.html"><i class="fa-solid fa-house"></i> Dashboard</a></li>
                <li><a href="#"><i class="fa-solid fa-users"></i> Manage Users</a></li>
                <li><a href="report.html"><i class="fa-solid fa-file-lines"></i> Reports</a></li>
                <li><a href="profile.html"><i class="fa-solid fa-user"></i> Profile</a></li>
                <li><a href="#" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
            `;

        }

        else if (loggedInUser.role === "Teacher") {

            menu.innerHTML = `
                <li class="active"><a href="dashboard.html"><i class="fa-solid fa-house"></i> Dashboard</a></li>
                <li><a href="#"><i class="fa-solid fa-book"></i> Courses</a></li>
                <li><a href="#"><i class="fa-solid fa-user-graduate"></i> Students</a></li>
                <li><a href="profile.html"><i class="fa-solid fa-user"></i> Profile</a></li>
                <li><a href="#" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
            `;

        }

        else {

            menu.innerHTML = `
                <li class="active"><a href="dashboard.html"><i class="fa-solid fa-house"></i> Dashboard</a></li>
                <li><a href="#"><i class="fa-solid fa-book-open"></i> My Courses</a></li>
                <li><a href="report.html"><i class="fa-solid fa-chart-line"></i> Results</a></li>
                <li><a href="profile.html"><i class="fa-solid fa-user"></i> Profile</a></li>
                <li><a href="#" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
            `;

        }

    }

}
/* ==========================
NOTIFICATION PANEL
========================== */

const bell=document.getElementById("bellIcon");

const box=document.getElementById("notificationBox");

if(bell){
bell.addEventListener("click",function(){

box.classList.toggle("show");

});


}
/* ==========================
SIDEBAR TOGGLE
========================== */

const menuToggle = document.getElementById("menuToggle");

const sidebar = document.querySelector(".sidebar");

if(menuToggle){

menuToggle.addEventListener("click",function(){

sidebar.classList.toggle("active");

});

}
/* ==========================
PROFILE DROPDOWN
========================== */

const profileMenu=document.getElementById("profileMenu");

const profileDropdown=document.getElementById("profileDropdown");

if(profileMenu){

profileMenu.addEventListener("click",function(){

profileDropdown.classList.toggle("showProfile");

});

}
/* ==========================
LIVE DATE & TIME
========================== */

function updateClock(){

const now=new Date();

const time=now.toLocaleTimeString();

const date=now.toDateString();

const liveTime=document.getElementById("liveTime");

const liveDate=document.getElementById("liveDate");

if(liveTime){

liveTime.innerHTML=time;

}

if(liveDate){

liveDate.innerHTML=date;

}

}

setInterval(updateClock,1000);

updateClock();
/* ==========================
PERFORMANCE CHART
========================== */
/* ==========================
   CHARTS
========================== */

const performanceChart=document.getElementById("performanceChart");

if(performanceChart){

new Chart(performanceChart,{

type:"bar",

data:{

labels:["Programming","Database","Web","AI","SE"],

datasets:[{

label:"Marks",

data:[95,88,97,91,85]

}]

},

options:{
responsive:true
}

});

}

const departmentChart=document.getElementById("departmentChart");

if(departmentChart){

new Chart(departmentChart,{

type:"pie",

data:{

labels:["BSCS","BSIT","BSSE","BSAI"],

datasets:[{

data:[6,4,3,2]

}]

},

options:{
responsive:true
}

});

}

const gpaChart=document.getElementById("gpaChart");

if(gpaChart){

new Chart(gpaChart,{

type:"line",

data:{

labels:["Semester 1","Semester 2","Semester 3","Semester 4","Semester 5","Semester 6","Semester 7","Semester 8"],

datasets:[{

label:"Average GPA",

data:[3.1,3.3,3.4,3.6,3.7,3.8,3.9,4.0],

fill:false,

tension:0.4

}]

},

options:{
responsive:true
}

});

}
/*=========================
PAGINATION
=========================*/

const prevPage = document.getElementById("prevPage");

const nextPage = document.getElementById("nextPage");

if(prevPage){

prevPage.addEventListener("click",function(){

if(currentPage>1){

currentPage--;

displayStudents();

}

});

}

if(nextPage){

nextPage.addEventListener("click",function(){

const totalPages=Math.ceil(students.length/rowsPerPage);

if(currentPage<totalPages){

currentPage++;

displayStudents();

}

});

}
/* ==========================
   EXPORT CSV
========================== */

const exportCSV = document.getElementById("exportCSV");

if(exportCSV){

exportCSV.addEventListener("click",function(){

const csv = Papa.unparse(students);

const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});

const link = document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = "Students.csv";

link.click();

});

}

/* ==========================
   EXPORT PDF
========================== */

const exportPDF = document.getElementById("exportPDF");

if(exportPDF){

exportPDF.addEventListener("click",function(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF();

doc.setFontSize(18);

doc.text("Student Performance Report",20,20);

let y = 35;

students.forEach(student=>{

doc.text(

`${student.id} | ${student.name} | ${student.department} | GPA: ${student.gpa}`,

20,

y

);

y += 10;

});

doc.save("Students_Report.pdf");

});

}