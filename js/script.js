// Charger le fichier JSON
async function loadJSON() {
    try {
        const response = await fetch("luxdrive_site_data_full.json"); // Assure-toi que ton JSON est bien placé à la racine du projet
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors du chargement du JSON :", error);
    }
}

// Fonction pour générer la page d'accueil
async function renderAccueil() {
    const data = await loadJSON();
    if (!data) return;

    const hero = data.pagesContent.Accueil.heroBanner;

    // Modifier la bannière héro
    document.getElementById("hero").style.backgroundImage = `url(${hero.image})`;
    document.getElementById("hero-title").textContent = hero.title;
    document.getElementById("hero-subtitle").textContent = hero.subtitle;
    document.getElementById("hero-cta").textContent = hero.cta;

    // Générer les statistiques
    const statsContainer = document.getElementById("stats");
    data.pagesContent.Accueil.stats.forEach(stat => {
        statsContainer.innerHTML += `
            <div class="col-md-4">
                <div class="stat-box p-4 border rounded shadow">
                    <h3 class="fw-bold">${stat.value}</h3>
                    <p class="text-muted">${stat.label}</p>
                </div>
            </div>
        `;
    });

        // Générer les temoignages
        const testimonialsContainer = document.getElementById("testimonials");
       data.testimonials.forEach(testimonials => {
           testimonialsContainer.innerHTML += `
                <div class="col-md-4">
                    <div class="stat-box p-4 border rounded shadow">
                        <h3 class="fw-bold">${testimonials.name}</h3>
                        <p class="text-muted">${testimonials.note}</p>
                         <p class="text-muted">${testimonials.message}</p>
                    </div>
                </div>
            `;
        });
}

// Lancer la fonction lorsque la page est chargée
document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page === "accueil") renderAccueil();
});

