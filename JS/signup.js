var signupForm = document.getElementById("signupForm");
if(signupForm) {
    var nameInput = document.getElementById("name")
    var emailInput = document.getElementById("email")
    var phoneInput = document.getElementById("phone")
    var passwordInput = document.getElementById("password")
    var confirmInput = document.getElementById("confirmPassword")
    var termsInput = document.getElementById("terms")

    var nameError = document.getElementById("nameError")
    var emailError = document.getElementById("emailError")
    var phoneError = document.getElementById("phoneError")
    var passwordError = document.getElementById("passwordError")
    var confirmError = document.getElementById("confirmError")
    var formMessage = document.getElementById("formMessage")

    function Open_Categ_list() {
    const categoryNavList = document.querySelector(".category_nav_list");

    if (categoryNavList) {
        categoryNavList.classList.toggle("active");
    }
}

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        formMessage.innerHTML="";
        formMessage.className="form_message";

        var isValid = true;

        if (!REGEX.name.test(nameInput.value.trim())) {
            setFieldError(nameInput, nameError, "2-50 letters only (spaces,-,' allowed).");
            isValid = false;
        } else {
            setFieldError(nameInput, nameError, "");
        }
        
        if (!REGEX.email.test(emailInput.value.trim())) {
            setFieldError(emailInput, emailError, "Please enter a valid email address.");
            isValid = false;
        } else {
            setFieldError(emailInput, emailError, "");
        }

        if (phoneInput.value.trim() !== "" && !REGEX.phone.test(phoneInput.value.trim())) {
            setFieldError(phoneInput, phoneError, "Please enter a valid egyptian number.");
            isValid = false;
        } else {
            setFieldError(phoneInput, phoneError, "");
        }

        if (!REGEX.password.test(passwordInput.value)){
            setFieldError(passwordInput, passwordError, "Min 8 characters, with an uppercase letter, a lowercase letter and a number.");
            isValid = false;
        } else {
            setFieldError(passwordInput, passwordError, "");
        }

        if (confirmInput.value !== passwordInput.value) {
            setFieldError(confirmInput, confirmError, "Passwords do not match.");
            isValid = false;
        } else {
            setFieldError(confirmInput, confirmError, "");
        }

        if(termsInput && !termsInput.checked) {
            formMessage.innerHTML = "You must agree to the terms and conditions.";
            formMessage.classList.add("error");
            isValid = false;
        }

        if (!isValid) return;

        var email = emailInput.value.trim().toLowerCase();
        var users = getUsers();
        if (users.some(u => u.email.toLowerCase() === email)) {
            formMessage.innerHTML = "Email already exists.";
            formMessage.classList.add("error");
            return;
        }

  hashText(passwordInput.value).then(passwordHash => {

    var newUser = {
        id: Date.now(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        phone: phoneInput.value.trim(),
        passwordHash: passwordHash
    };

    users.push(newUser);
    saveUsers(users);

    formMessage.innerHTML = "User registered successfully.";
    formMessage.classList.add("success");

    sessionStorage.setItem("signupSuccess", "1");

    window.location.href = "Login.html";
    });
    });
    }