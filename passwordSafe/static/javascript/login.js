const usernameField = document.getElementById('usernameField');
const feedbackField = document.querySelector('.invalid-feedback');
const emailField = document.getElementById('emailField');
const feedbackFieldEmail = document.querySelector('.invalid-feedback-email');
const usernameCheck = document.querySelector('.usernameCheck');
const showPassword = document.querySelector('.showPassword');
const passwordField = document.getElementById('passwordField');
const submitBtn = document.querySelector('.submit-btn');


// SHOW/HIDE password functionality
showPassword.addEventListener('click', (event) => {
    if(showPassword.textContent == 'SHOW'){
        showPassword.textContent = 'HIDE';
        passwordField.setAttribute('type', 'text');  // change password to plain text
    } else {
        showPassword.textContent = 'SHOW';
        passwordField.setAttribute('type', 'password');  // change back 
    }
})