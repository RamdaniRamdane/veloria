// auth.js
const USERS_KEY = 'veloria_users';
const CARTS_KEY = 'veloria_carts';
let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;

// Enregistrement utilisateur
function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    
    if(users.some(user => user.email === email.toLowerCase())) {
        throw new Error('Un compte existe déjà avec cet email');
    }
    
    const newUser = {
        email: email.toLowerCase(),
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return loginUser(email, password);
}

// Connexion utilisateur
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find(u => 
        u.email === email.toLowerCase() && 
        u.password === password
    );
    
    if(!user) throw new Error('Identifiants incorrects');
    
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;
    return user;
}

// Déconnexion
function logout() {
    sessionStorage.removeItem('currentUser');
    currentUser = null;
    window.location.href = 'login.html';
}

// Récupération panier utilisateur
function getUserCart() {
    if(!currentUser) return [];
    const carts = JSON.parse(localStorage.getItem(CARTS_KEY)) || {};
    console.log(carts)
    return carts[currentUser.email] || [];
}

// Sauvegarde panier utilisateur
function saveUserCart(cart) {
    if(!currentUser) return;
    const carts = JSON.parse(localStorage.getItem(CARTS_KEY)) || {};
    carts[currentUser.email] = cart;
    localStorage.setItem(CARTS_KEY, JSON.stringify(carts));
}

// Mise à jour UI
function updateAuthUI() {
    const authElements = document.querySelectorAll('[data-auth]');
    const unauthElements = document.querySelectorAll('[data-unauth]');
    
    authElements.forEach(el => el.style.display = currentUser ? 'block' : 'none');
    unauthElements.forEach(el => el.style.display = currentUser ? 'none' : 'block');
    
    if(currentUser) {
        document.querySelectorAll('[data-user-email]').forEach(el => {
            el.textContent = currentUser.email;
        });
    }
}

document.addEventListener('DOMContentLoaded', updateAuthUI);
window.logout = logout;
window.getUserCart = getUserCart;
window.saveUserCart = saveUserCart;
