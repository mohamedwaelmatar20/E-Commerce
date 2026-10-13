var loginForm = document.getElementById("loginForm");

if (loginForm) {

    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var formMessage = document.getElementById("formMessage");

    if(sessionStorage.getItem('signupSuccess')){
        formMessage.textContent = 'Signup successful! Please log in.';
        formMessage.classList.add('success');
        sessionStorage.removeItem('signupSuccess');
    }

    loginForm.addEventListener("submit",  (event) => {
        event.preventDefault();
        formMessage.innerHTML = "";
        formMessage.className = "form_message";

        var isValid = true;

        if(!REGEX.email.test(emailInput.value.trim())){
            setFieldError(emailInput, emailError, "Please enter a valid email address.");
            isValid = false;
        }else{
            setFieldError(emailInput, emailError, "");
        }

        if(passwordInput.value.length == 0){
            setFieldError(passwordInput, passwordError, "Password cannot be empty.");
            isValid = false;
        }else{
            setFieldError(passwordInput, passwordError, "");
        }

        if(!isValid) return;

        var email = emailInput.value.trim().toLowerCase();
        var users = getUsers();
        var user = users.find(u => u.email.toLowerCase() == email);

        if(!user){
            formMessage.innerHTML = "No account found with this email. Please sign up first.";
            formMessage.classList.add("error");
            return;
        }

        hashText(passwordInput.value).then(enteredHash => {
            if (enteredHash != user.passwordHash) {
                formMessage.innerHTML = "Incorrect password. Please try again.";
                formMessage.classList.add("error");
                return;
            }

            setCurrentUser({ id: user.id, name: user.name, email: user.email })
            window.location.href = "index.html"
        });
    });
}