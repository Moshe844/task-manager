document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login_form");
    const usernameInput = document.getElementById("usernameInput");
    const pwShowHide = document.querySelectorAll(".pw_hide");
    const passwordInput = document.getElementById("passwordInput");
    const popup = document.getElementById("popup");
    const popupClose = document.getElementById("popup-close");
    const popupErrorMessage = document.getElementById("popupErrorMessage");

    pwShowHide.forEach(icon => {
        icon.addEventListener("click", () => {
            let getPwInput = icon.parentElement.querySelector("input")
            if(getPwInput.type === "password"){
                getPwInput.type = "text";
                icon.classList.replace("uil-eye-slash", "uil-eye")
            }else {
                getPwInput.type = "password";
                icon.classList.replace("uil-eye", "uil-eye-slash")
            }
        })
        
     })

     loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Get the entered username and password
        const enteredUsername = usernameInput.value;
        const enteredPassword = passwordInput.value; // Add this line

        // List of allowed usernames and their passwords
        const allowedUsers = [
            { username: "sfischer", password: "Solutions12!" },
            { username: "mgrunwald", password: "Solutions12!" },
            { username: "mekstein", password: "Solutions12!" },
            { username: "ykaplan", password: "Solutions12!" }
        ];

        // Check if enteredUsername and enteredPassword match allowed users
        const matchedUser = allowedUsers.find(user => user.username === enteredUsername && user.password === enteredPassword);

        if (matchedUser) {
            // Save the username in localStorage
            localStorage.setItem("enteredUsername", matchedUser.username);
            
            // Redirect to task.html
            window.location.href = "task.html";
        } else {
            popupErrorMessage.textContent = "Invalid username or password. Please enter valid credentials.";
            popup.style.display = "flex";
        }
    });

    popupClose.addEventListener("click", function() {
        popup.style.display = "none";
    });
});