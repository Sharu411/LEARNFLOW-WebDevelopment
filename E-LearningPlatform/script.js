// Dynamic Search for Courses
const searchCourses = () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const courses = document.querySelectorAll('.course-card');
  
    courses.forEach(course => {
      const title = course.querySelector('.card-title').textContent.toLowerCase();
      if (title.includes(searchInput)) {
        course.style.display = 'block';
      } else {
        course.style.display = 'none';
      }
    });
  };
  

// Enroll Button Functionality
  document.querySelectorAll('.enroll-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const courseName = event.target.dataset.courseName;
      alert(`You have enrolled in the ${courseName} course!`);
    });
  });


// Handle Feedback Form Submission
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from refreshing page
  const name = document.getElementById('feedbackName').value;
  const message = document.getElementById('feedbackMessage').value;

  alert(`Thank you, ${name}, for your feedback: "${message}"`);
  event.target.reset();
});


// Handle Registration
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  // Retrieve existing users or initialize
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if email is already registered
  if (users.some(user => user.email === email)) {
    alert("This email is already registered!");
    return;
  }

  // Save new user
  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert("Registration successful! You can now log in.");
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  // Retrieve registered users
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Validate login credentials
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    alert("Login successful! Redirecting to courses...");
    const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
    modal.hide();
    window.location.href = "#course";
  } else {
    alert("Invalid email or password. Please try again.");
  }
});
