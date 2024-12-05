// Show Login Modal on Button Click
document.getElementById("loginBtn").addEventListener("click", function () {
    $('#loginModal').modal('show');
});

// Register user data and login validation
const users = [];

document.getElementById("registerBtn").addEventListener("click", function () {
    const username = prompt("Enter a username for registration:");
    const password = prompt("Enter a password for registration:");
    users.push({ username, password });
    alert("Registration Successful! Please log in.");
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert("Login Successful!");
        // Display username, hide login/register buttons
        document.getElementById("userName").textContent = "Hello, " + user.username;
        document.getElementById("userName").classList.remove("d-none");
        document.getElementById("loginBtn").classList.add("d-none");
        document.getElementById("registerBtn").classList.add("d-none");

        // Hide main content and show dashboard
        document.getElementById("mainContent").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        $('#loginModal').modal('hide');
    } else {
        alert("Invalid credentials. Please try again.");
    }
});
