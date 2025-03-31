
function getCurrentPage() {
    const pathSegments = window.location.pathname.split('/').filter(segment => segment);
    const isLocalhost = window.location.href.includes('localhost');
    return isLocalhost ? pathSegments.pop() : pathSegments.slice(-1)[0];
}

function createNavigation() {
    const currentPath = getCurrentPage();
    console.log(currentPath)
    const navHTML = `
    <nav>
        <div class="nav-container">
            <a href="index.html" class="logo-link">
                <img src="images/logo.png" alt="VÉLORIA" class="logo">
            </a>
            <div class="menu-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Accueil</a></li>
                <li><a href="products.html" class="${currentPath === 'products.html' ? 'active' : ''}">Produits</a></li>
                <li><a href="#" class="${currentPath === 'blog.html' ? 'active' : ''}">Blog</a></li>
                <li data-unauth><a href="signup.html" class="${currentPath === 'signup.html' ? 'active' : ''}">Inscription</a></li>
                <li data-unauth><a href="login.html" class="${currentPath === 'login.html' ? 'active' : ''}">Connexion</a></li>
                <li data-auth><a href="cart.html" class="${currentPath === 'cart.html' ? 'active' : ''}">Panier</a></li>
                <li data-auth class="auth-section">
                    <span data-user-email class="user-email"></span>
                    <button class="logout-btn" onclick="logout()">Déconnexion</button>
                </li>
                <li>
                    <button class="theme-btn" id="dark-mode-toggle"></button>
                </li>
            </ul>
        </div>
    </nav>
    `;

    // Insertion dans le body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.offsetHeight;
   console.log(document.styleSheets); 
    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Mise à jour de l'état d'authentification
    updateAuthUI();
}

document.addEventListener('DOMContentLoaded', createNavigation);
