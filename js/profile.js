const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html";
}

// Show user data in input fields
document.getElementById("profileNameInput").value = loggedInUser.name;
document.getElementById("profileEmailInput").value = loggedInUser.email;
document.getElementById("profileRoleInput").value = loggedInUser.role;
document.getElementById("profilePhone").value = loggedInUser.phone || "";
document.getElementById("profileAddress").value = loggedInUser.address || "";

// Save Changes
document.getElementById("profileForm").addEventListener("submit", function(e){

    e.preventDefault();

    loggedInUser.name = document.getElementById("profileNameInput").value;
    loggedInUser.email = document.getElementById("profileEmailInput").value;
    loggedInUser.phone = document.getElementById("profilePhone").value;
    loggedInUser.address = document.getElementById("profileAddress").value;

    // Update logged in user
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    // Update users array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(function(user){

        if(user.email === loggedInUser.email){
            return loggedInUser;
        }

        return user;

    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Profile Updated Successfully!");
});