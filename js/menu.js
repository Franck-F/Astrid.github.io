document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('#nav-menu');
    const body = document.body;

    // Créer l'overlay
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    body.appendChild(overlay);

    function toggleMenu() {
        const isOpen = navToggle.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        navToggle.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
            body.style.overflow = 'hidden'; // Empêcher le défilement
        } else {
            body.style.overflow = ''; // Réactiver le défilement
        }
    }

    navToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Gérer la fermeture du menu avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Fermer le menu lors du clic sur un lien
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});