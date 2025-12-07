const footerHTML = `
    <div class="footer-container">
        <div class="footer-section">
            <h3>About Us</h3>
            <p>ChayGPT - The best coffee shop in Helwan.</p>
        </div>
        <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="../../index.html">Home</a></li>
                <li><a href="../menu/menu.html">Menu</a></li>
                <li><a href="../contact/contact.html">Contact</a></li>
                <li><a href="../menu/menu.html">Order Now</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Legal</h3>
            <ul>
                <li><a href="../legal/privacy-policy/privacy.html">Privacy Policy</a></li>
                <li><a href="../legal/terms-of-service/terms.html">Terms of Service</a></li>
                <li><a href="../legal/refund-policy/refund.html">Refund Policy</a></li>
            </ul>
        </div>
    </div>
    <p class="copyright">© 2025 ChayGPT Coffee. All Rights Reserved.</p>
`;

document.addEventListener('DOMContentLoaded', () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) footerElement.innerHTML = footerHTML;

    checkAuthentication();
    loadUserProfile();
    setupUpdateButton();
    setupLogout();
});

function checkAuthentication() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        alert('Please log in to view your profile.');
        window.location.href = '../join-us/login/login.html';
    }
}

function loadUserProfile() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('username').value =
            `${loggedInUser.firstName} ${loggedInUser.lastName}`;
        document.getElementById('email').value = loggedInUser.email;

        const profileContainer = document.querySelector('.profile-container');
        const welcomeMsg = document.createElement('h2');

        welcomeMsg.textContent = `Welcome, ${loggedInUser.firstName}!`;
        welcomeMsg.style.color = '#50613b';
        welcomeMsg.style.marginBottom = '20px';

        profileContainer.insertBefore(welcomeMsg, profileContainer.firstChild);
    }
}

function setupUpdateButton() {
    const updateBtn = document.querySelector('.update-btn');
    const usernameInput = document.getElementById('username');

    updateBtn.addEventListener('click', function() {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        const userIndex = users.findIndex(u => u.email === loggedInUser.email);

        if (userIndex !== -1) {
            const parts = usernameInput.value.trim().split(' ');

            users[userIndex].firstName = parts[0];
            users[userIndex].lastName = parts.slice(1).join(' ');

            localStorage.setItem('users', JSON.stringify(users));

            loggedInUser.firstName = users[userIndex].firstName;
            loggedInUser.lastName = users[userIndex].lastName;

            sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            alert('Profile updated!');
            location.reload();
        }
    });
}

function setupLogout() {
    const container = document.querySelector('.profile-container');
    const button = document.createElement('button');

    button.textContent = 'Logout';
    button.className = 'update-btn';
    button.style.backgroundColor = '#d9534f';
    button.style.marginTop = '10px';

    button.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        alert('Logged out.');
        window.location.href = '../join-us/login/login.html';
    });

    container.appendChild(button);
}
