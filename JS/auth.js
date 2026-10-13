var USERS_KEY = 'ecommerce_users'
var SESSION_KEY = 'ecommerce_current_user'

var REGEX = {
    name: /^[A-Za-z\u0600-\u06FF]+(?:[ '-][A-Za-z\u0600-\u06FF]+){0,4}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^01[0125][0-9]{8}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
}

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
}

function setCurrentUser(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
}

function hashText(text) {
    const encoder = new TextEncoder().encode(text);

    return crypto.subtle.digest("SHA-256", encoder).then(hashBuffer => {
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join("");
    });
}

function setFieldError(inputE1,errorE1,message){
    if(!inputE1 || !errorE1) return;

    if(message){
        inputE1.classList.add('invalid');
        errorE1.textContent = message;
    } else {
        inputE1.classList.remove('invalid');
        errorE1.innerHTML = '';
    }
}

function renderAuthState(){
    var box = document.querySelector('.login_signup');
    if(!box) return;

    var user = getCurrentUser();
    if(!user) return;

    box.innerHTML = `
        <span class="btn" style="cursor:default;">
            <i class="fa-solid fa-circle-user"></i> Hi, ${user.name.split(" ")[0]}
        </span>
        <a href="#" id="logoutBtn" class="btn">
            Logout <i class="fa-solid fa-right-from-bracket"></i>
        </a>
    `

    document.getElementById('logoutBtn').addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
}

renderAuthState();

var page = document.body.getAttribute('data-page');
if((page === 'login' || page === 'signup') && getCurrentUser()){
    window.location.href = 'index.html';
}
