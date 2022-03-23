const usernameField = document.getElementById('usernameField');
const feedbackField = document.querySelector('.invalid-feedback');
const emailField = document.getElementById('emailField');
const feedbackFieldEmail = document.querySelector('.invalid-feedback-email');
const usernameCheck = document.querySelector('.usernameCheck');
const showPassword = document.querySelector('.showPassword');
const passwordField = document.getElementById('passwordField');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.setAttribute('disabled', 'disabled');


usernameField.addEventListener('keyup', (event) => {
    let usernameValue = event.target.value;  // every event (everything typed) in field is logged to this const, changes 

    usernameField.classList.remove('is-invalid'); // look below for details, removing here enables error messages to refreash
    feedbackField.style.display='none';
    usernameCheck.textContent = `Checking ${usernameValue}`
    usernameCheck.style.display='none';
    
    if(usernameValue.length > 0) {
        fetch('/authentication/validate-username', {  // run function from views
            body: JSON.stringify({username: usernameValue}), 
            method: 'POST',
        }).then((res) => res.json()).then((data) => {  // parse to json and then take data and validate
            console.log(data);
            usernameCheck.style.display='none'  // tell user that username is being validated against db (only for slow internet) this stops prompt
            if(data.username_error) {  // if this error ever pops up
                submitBtn.setAttribute('disabled','disabled');
                usernameField.classList.add('is-invalid'); // bootstrap class to enable red block when invalid 
                feedbackField.style.display='block';
                feedbackField.innerHTML=`<p> ${data.username_error}</p>`;
            } else{
                submitBtn.removeAttribute('disabled');
            }
        });
    } 
});

emailField.addEventListener('keyup', (event) => {
    let emailValue = event.target.value;
    
    emailField.classList.remove('is-invalid');
    feedbackFieldEmail.style.display = 'none';

    if(emailValue.length > 0) {
        fetch('/authentication/validate-email', {
            body: JSON.stringify({email:emailValue}),
            method: 'POST',
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            if(data.email_error) {
                submitBtn.setAttribute('disabled','disabled');
                emailField.classList.add('is-invalid');
                feedbackFieldEmail.style.display='block';
                feedbackFieldEmail.innerHTML = `<p> ${data.email_error}</p>`;
            }else{
                submitBtn.removeAttribute('disabled');
            }
        });
    }
});

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