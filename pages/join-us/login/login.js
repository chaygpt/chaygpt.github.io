
const emailField = document.getElementById("email");

window.onload = function () {
    emailField.focus();
};

document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('login-form');


    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const enteredEmail = emailInput.value.trim().toLowerCase();
        const enteredPassword = passwordInput.value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');


        const user = users.find(
            u => u.email.toLowerCase() === enteredEmail && u.password === enteredPassword
        );

        if (user) {

            sessionStorage.setItem('loggedInUser', 'nigga');

            alert(`Welcome back, ${user.firstName}!`);
            window.location.href = '../../profile/profile.html';

        } else {
            alert('Invalid email or password.');
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');

    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Google login is not implemented yet.');
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            alert('Facebook login is not implemented yet.');
        });
    }
});
