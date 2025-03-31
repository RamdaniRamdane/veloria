document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle hamburger menu animation
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target) || mobileMenu.contains(event.target);
        
        if (!isClickInsideMenu) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});
