// form-validation.js
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 6 && /\d/.test(password);
}

function handleSignup(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const errorContainer = document.getElementById('error-message');
    
    errorContainer.textContent = '';
    
    try {
        if(!validateEmail(email)) throw new Error('Email invalide');
        if(!validatePassword(password.value)) {
            throw new Error('Le mot de passe doit contenir au moins 6 caractères dont un chiffre');
        }
        if(password.value !== confirmPassword.value) {
            throw new Error('Les mots de passe ne correspondent pas');
        }
        
        registerUser(email, password.value);
        window.location.href = 'products.html';
    } catch(error) {
        errorContainer.textContent = error.message;
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorContainer = document.getElementById('error-message');
    
    errorContainer.textContent = '';
    
    try {
        loginUser(email, password);
        window.location.href = 'products.html';
    } catch(error) {
        errorContainer.textContent = error.message;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signup-form')?.addEventListener('submit', handleSignup);
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
});
