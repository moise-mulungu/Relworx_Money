const userName = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login');

loginBtn.addEventListener('click',(e) => {
    e.preventDefault();
    const user = userName.value;
    const pass = password.value;
    
    if (user && pass) {
        localStorage.setItem(user, pass);
        location.reload();
    }
    
}
);