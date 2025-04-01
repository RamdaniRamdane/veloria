function getCurrentPage() {
    const pathSegments = window.location.pathname.split('/').filter(segment => segment);
    const isLocalhost = window.location.href.includes('localhost');
    
    // Handle case when on the root path (/)
    if (pathSegments.length === 0) {
        return 'index.html';
    }
    
    return isLocalhost ? pathSegments.pop() || 'index.html' : pathSegments.slice(-1)[0] || 'index.html';
}

function createNavigation() {
    const currentPath = getCurrentPage();
    console.log('Current page:', currentPath);
    
    const navHTML = `
    <nav>
        <div class="nav-container">
            <a href="index.html" class="logo-link">
                <img src="images/logo.png" alt="VÉLORIA" class="logo">
            </a>
            <div class="menu-toggle" id="mobile-menu" aria-label="Menu" role="button" tabindex="0">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Accueil</a></li>
                <li><a href="products.html" class="${currentPath === 'products.html' ? 'active' : ''}">Produits</a></li>
                <li><a href="blog.html" class="${currentPath === 'blog.html' ? 'active' : ''}">Blog</a></li>
                <li data-unauth><a href="signup.html" class="${currentPath === 'signup.html' ? 'active' : ''}">Inscription</a></li>
                <li data-unauth><a href="login.html" class="${currentPath === 'login.html' ? 'active' : ''}">Connexion</a></li>
                <li data-auth><a href="cart.html" class="${currentPath === 'cart.html' ? 'active' : ''}">Panier</a></li>
                <li data-auth class="auth-section">
                    <span data-user-email class="user-email"></span>
                    <button class="logout-btn" onclick="logout()">Déconnexion</button>
                </li>
                <li>
                    <button class="theme-btn" id="dark-mode-toggle" aria-label="Toggle dark mode"></button>
                </li>
            </ul>
        </div>
    </nav>
    `;
    
    // Insertion dans le body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    // Toggle menu when clicking the hamburger icon
    menuToggle?.addEventListener('click', toggleMenu);
    
    // Also allow keyboard navigation (for accessibility)
    menuToggle?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.menu-toggle')) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    function toggleMenu() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Mise à jour de l'état d'authentification
    updateAuthUI();
    
    // Add a class to the body when scrolling for potential style changes
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            document.querySelector('nav').classList.add('scrolled');
        } else {
            document.querySelector('nav').classList.remove('scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', createNavigation);
