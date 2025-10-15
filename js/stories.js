document.addEventListener('DOMContentLoaded', () => {
    const storyCards = document.querySelectorAll('.story-card');
    const modals = document.querySelectorAll('.story-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Gestion de l'ouverture des modals
    storyCards.forEach(card => {
        card.addEventListener('click', () => {
            const storyId = card.dataset.story;
            const modal = document.getElementById(`modal-${storyId}`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Empêche le défilement de la page derrière
            }
        });
    });

    // Gestion de la fermeture des modals
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = button.closest('.story-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Réactive le défilement de la page
            }
        });
    });

    // Fermeture en cliquant en dehors de la modal
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fermeture avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.story-modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});