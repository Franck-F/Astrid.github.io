document.addEventListener('DOMContentLoaded', () => {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('click', () => {
            // Si la carte est déjà active
            if (card.classList.contains('active')) {
                card.classList.remove('active');
            } else {
                // Ferme toutes les autres cartes
                storyCards.forEach(otherCard => {
                    otherCard.classList.remove('active');
                });
                // Ouvre la carte cliquée
                card.classList.add('active');
            }
        });
    });
});