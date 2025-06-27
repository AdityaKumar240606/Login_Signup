document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("signupMessage");

  const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com","icloud.com"];

  if (!name || !email || !password || !confirmPassword) {
    message.innerText = "Please fill all fields.";
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const match = email.match(emailRegex);

  if (!match) {
    message.innerText = "Invalid email address!";
    return;
  }

  const domain = match[1].toLowerCase();
  if (!allowedDomains.includes(domain)) {
    message.innerText = "Invalid email address!";
    return;
  }

  if (password.length < 6) {
    message.innerText = "Password must be at least 6 characters!";
    return;
  }

  if (password !== confirmPassword) {
    message.innerText = "Passwords do not match.";
    return;
  }

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  message.style.color = "green";
  message.innerText = "Signup successful! Redirecting to login...";
  setTimeout(() => (window.location.href = "index.html"), 1500);
});




//Login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const remember = document.getElementById("rememberMe").checked;
  const message = document.getElementById("loginMessage");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser || email !== storedUser.email || password !== storedUser.password) {
    message.innerText = "Invalid credentials.";
    return;
  }

  if (remember) {
    localStorage.setItem("currentUser", JSON.stringify(storedUser));
  } else {
    sessionStorage.setItem("currentUser", JSON.stringify(storedUser));
  }

  message.style.color = "green";
  message.innerText = "Login successful! Redirecting...";
  setTimeout(() => (window.location.href = "welcome.html"), 1500);
});

function togglePassword(inputId, toggleElement) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  toggleElement.textContent = isPassword ? "🙈" : "👁️";
}
