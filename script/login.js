console.log("Login functionality coming");

document.getElementById("signin-btn").addEventListener("click", function () {
  
  // 1- get the username input
  const usernameInput = document.getElementById("user-input");
  const username = usernameInput.value;
  console.log(username);

  // 2- get the password input
  const passwordInput = document.getElementById("pass-input");
  const password = passwordInput.value;
  console.log(password);

  // 3- match username & password
  if (username === "admin" && password === "admin123") {
    
    // 3-1 true:::>> alert > homepage
    // alert("Login Successful!");

    // Teacher-er style-e redirection
    window.location.assign("./home.html");

  } else {
    
    // 3-2 false:::>> Professional alert > return
    alert("Invalid username or password. Please try again.");
    return;
  }
});