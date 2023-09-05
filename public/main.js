document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login_form");
    const usernameInput = document.getElementById("usernameInput");
    // const pwShowHide = document.querySelectorAll(".pw_hide");
    // const passwordInput = document.getElementById("passwordInput");
    const popup = document.getElementById("popup");
    const popupClose = document.getElementById("popup-close");
    const popupErrorMessage = document.getElementById("popupErrorMessage");

    // pwShowHide.forEach(icon => {
    //     icon.addEventListener("click", () => {
    //         let getPwInput = icon.parentElement.querySelector("input")
    //         if(getPwInput.type === "password"){
    //             getPwInput.type = "text";
    //             icon.classList.replace("uil-eye-slash", "uil-eye")
    //         }else {
    //             getPwInput.type = "password";
    //             icon.classList.replace("uil-eye", "uil-eye-slash")
    //         }
    //     })
        
    //  })

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
      
        // Get the entered username
        const enteredUsername = usernameInput.value;
      
        // Send a POST request to the login endpoint on the server
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: enteredUsername }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.username) {
              // Redirect to task.html and pass the username as a query parameter
              window.location.href = `task?username=${data.username}`;
            } else {
              popupErrorMessage.textContent = "Invalid username. Please enter valid credentials.";
              popup.style.display = "flex";
            }
          })
          .catch(error => {
            console.error('Error during login:', error);
          });
      });
      
      popupClose.addEventListener("click", function () {
        popup.style.display = "none";
      });
    })