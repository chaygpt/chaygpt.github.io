window.onload = function() {
  const firstNameInput = document.getElementById("first-name");
  firstNameInput.focus();
};

function validPassword(password) {
  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  
  return hasNumber && hasUpperCase;
}

document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const passwordErrorMessage = document.getElementById('error1-message');
  const confirmErrorMessage = document.getElementById('error2-message');
  const form = document.getElementById('signup-form');
  
  let isPasswordValid = false;
  let doPasswordsMatch = false;

  passwordInput.addEventListener('input', function() {
      const password = passwordInput.value;
      
      isPasswordValid = validPassword(password);
      
      if (isPasswordValid) {
          passwordErrorMessage.textContent = 'The password is valid.✅';
          passwordErrorMessage.style.color = 'green';
      } else {
          passwordErrorMessage.textContent = 'Password must contain at least one number and at least one capital letter.';
          passwordErrorMessage.style.color = 'red';
      }
      
      checkPasswordsMatch();
  });
  
  confirmPasswordInput.addEventListener('input', function() {
      checkPasswordsMatch();
  });
  
  function checkPasswordsMatch() {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      
      if (confirmPassword) {
          doPasswordsMatch = (password === confirmPassword);
          
          if (doPasswordsMatch) {
              confirmErrorMessage.textContent = 'The fields match.✅';
              confirmErrorMessage.style.color = 'green';
          } else {
              confirmErrorMessage.textContent = 'Failed! Fields do not match.❌';
              confirmErrorMessage.style.color = 'red';
          }
      } else {
          confirmErrorMessage.textContent = 'Please confirm your password';
          confirmErrorMessage.style.color = 'orange';
          doPasswordsMatch = false;
      }
  }
  
  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault();
          
          if (!(isPasswordValid && doPasswordsMatch)) {
              if (!isPasswordValid) {
                  passwordErrorMessage.textContent = 'Please enter a valid password with numbers and uppercase letters.';
                  passwordErrorMessage.style.color = 'red';
              }
              
              if (!doPasswordsMatch) {
                  confirmErrorMessage.textContent = 'Password fields must match!';
                  confirmErrorMessage.style.color = 'red';
              }
              return;
          }

          const firstName = document.getElementById('first-name').value;
          const lastName = document.getElementById('last-name').value;
          const email = document.getElementById('email').value;
          const password = passwordInput.value;

          const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
          const userExists = existingUsers.some(user => user.email === email);

          if (userExists) {
              alert('An account with this email already exists!');
              return;
          }

          const newUser = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              createdAt: new Date().toISOString()
          };

          existingUsers.push(newUser);
          localStorage.setItem('users', JSON.stringify(existingUsers));

          alert('Account created successfully! Redirecting to login...');
          window.location.href = '../login/login.html';
      });
  }
});
