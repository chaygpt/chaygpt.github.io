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
        <div class="footer-section">
            <h3>Follow Us</h3>
            <div class="social-links">
                <a href="https://github.com/ADHAM-KHAIRY/chaygpt.github.io" target="_blank"> <img src="../../images/github-icon.png" alt="Github"> </a>
                <a href="https://www.facebook.com/" target="_blank"> <img src="../../images/facebook-icon.png" alt="Facebook"> </a>
                <a href="https://www.instagram.com/" target="_blank"> <img src="../../images/instagram-icon.png" alt="Instagram"> </a>
            </div>
        </div>
    </div>
    <p class="copyright">© 2025 ChayGPT Coffee. All Rights Reserved.</p>
`;

document.addEventListener('DOMContentLoaded', () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
    
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
        document.getElementById('username').value = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
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
            const nameParts = usernameInput.value.trim().split(' ');
            users[userIndex].firstName = nameParts[0] || users[userIndex].firstName;
            users[userIndex].lastName = nameParts.slice(1).join(' ') || users[userIndex].lastName;
            
            localStorage.setItem('users', JSON.stringify(users));
            
            loggedInUser.firstName = users[userIndex].firstName;
            loggedInUser.lastName = users[userIndex].lastName;
            sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            alert('Profile updated successfully!');
            location.reload();
        }
    });
}

function setupLogout() {
    const profileContainer = document.querySelector('.profile-container');
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.className = 'update-btn';
    logoutBtn.style.backgroundColor = '#d9534f';
    logoutBtn.style.marginTop = '10px';
    
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('loggedInUser');
            alert('You have been logged out successfully.');
            window.location.href = '../join-us/login/login.html';
        }
    });

    profileContainer.appendChild(logoutBtn);
}
