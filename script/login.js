console.log("Login functionality coming");

document.getElementById("signin-btn").addEventListener("click", function () {
  
 
  const usernameInput = document.getElementById("user-input");
  const username = usernameInput.value;
  console.log(username);


  const passwordInput = document.getElementById("pass-input");
  const password = passwordInput.value;
  console.log(password);

 
  if (username === "admin" && password === "admin123") {
    
   
    window.location.assign("./home.html");

  } else {
   
    alert("Invalid username or password. Please try again.");
    return;
  }
});