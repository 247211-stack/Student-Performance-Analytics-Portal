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

const total=studentTable.rows.length;

const totalCard=document.querySelector(".dashboard-card h2");

if(totalCard){

totalCard.innerText=total;

}

}

updateStudentCount();