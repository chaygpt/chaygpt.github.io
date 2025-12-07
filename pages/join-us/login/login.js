let email = document.getElementById("email");

window.onload = function () {
    email.focus();
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        const user = users.find(u => u.email === enteredEmail && u.password === enteredPassword);

        if (user) {
            sessionStorage.setItem('loggedInUser', JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                loginTime: new Date().toISOString()
            }));

            alert(`Welcome back, ${user.firstName}!`);
            window.location.href = '../../profile/profile.html';
        } else {
            alert('Invalid email or password. Please try again or sign up for a new account.');
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');

    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Google login is not implemented yet. Please use email/password login.');
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            alert('Facebook login is not implemented yet. Please use email/password login.');
        });
    }
});
