function createStaticStar() {
    const star = document.createElement('div');
    star.className = 'static-star';
    
    // Position aléatoire
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Taille aléatoire
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    // Durée d'animation aléatoire pour le scintillement
    const duration = Math.random() * 3 + 2;
    star.style.animationDuration = duration + 's';
    
    return star;
}

function initStaticStars() {
    const container = document.querySelector('.container');
    const numberOfStars = 50; // Nombre d'étoiles statiques
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = createStaticStar();
        container.appendChild(star);
    }
}

// Initialiser les étoiles statiques quand le document est chargé
document.addEventListener('DOMContentLoaded', initStaticStars);