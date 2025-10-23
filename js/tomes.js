document.addEventListener('DOMContentLoaded', () => {
    const tomeCards = document.querySelectorAll('.tome-card');
    const tomeContents = document.querySelectorAll('.tome-content');
    const backButtons = document.querySelectorAll('.back-to-tomes');
    const tomesGrid = document.querySelector('.tomes-grid');

    // Fonction pour afficher un tome spécifique
    function showTome(tomeId) {
        // Cacher la grille des tomes
        tomesGrid.style.display = 'none';
        
        // Cacher tous les contenus de tome
        tomeContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Afficher le contenu du tome sélectionné
        const selectedTome = document.getElementById(`${tomeId}-content`);
        if (selectedTome) {
            selectedTome.classList.add('active');
        }
    }

    // Fonction pour revenir à la grille des tomes
    function showTomesGrid() {
        // Cacher tous les contenus de tome
        tomeContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Afficher la grille des tomes
        tomesGrid.style.display = 'grid';
    }

    // Ajouter les écouteurs d'événements aux cartes de tome
    tomeCards.forEach(card => {
        card.addEventListener('click', () => {
            const tomeId = card.dataset.tome;
            showTome(tomeId);
        });
    });

    // Ajouter les écouteurs d'événements aux boutons retour
    backButtons.forEach(button => {
        button.addEventListener('click', showTomesGrid);
    });
});