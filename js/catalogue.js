document.addEventListener("DOMContentLoaded", function () {
    fetch("../luxdrive_site_data_full.json") // Chemin du fichier JSON
        .then(response => response.json())
        .then(data => {
            afficherCatalogue(data); // Générer les cartes
            ajouterEcouteursModals(); // Ajouter les écouteurs d'événements après le rendu
        })
        .catch(error => console.error("Erreur lors du chargement du JSON:", error));
});

function afficherCatalogue(data) {
    const carsContainer = document.getElementById("carsContainer");
    const brands = data.brands; // Liste des marques
    const cars = data.cars; // Liste des voitures

    cars.forEach(car => {
        // Trouver la marque correspondant au brandId
        const brand = brands.find(b => b.id === car.brandId);
        const brandName = brand ? brand.name : "Marque inconnue";

        // Création du HTML de chaque carte de voiture
        const carCard = document.createElement("div");
        carCard.className = "col-md-4 mb-4"; // Bootstrap: grille 3 colonnes

        carCard.innerHTML = `
            <div class="card h-100 shadow-sm d-flex flex-column">
               <img src="${car.image}" class="card-img-top img-fluid" alt="${car.name}" style="height:200px; padding:10px; object-fit: cover; ">

                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${car.name}</h5>
                    <p class="card-text"><strong>Marque :</strong> ${brandName}</p>
                    <p class="card-text"><strong>Prix :</strong> ${car.price.toLocaleString()} €</p>
                    <button class="btn btn-primary text-light voir-details" data-id="${car.id}">Voir le détail</button>
                </div>
            </div>
        `;

        // Ajouter la carte au container
        carsContainer.appendChild(carCard);
    });
}


/*la modal*/ 
function ajouterEcouteursModals() {
    const boutonsDetails = document.querySelectorAll(".voir-details");

    boutonsDetails.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Bouton cliqué, ID :", this.getAttribute("data-id"));
            const carId = this.getAttribute("data-id");
            afficherDetails(carId);
        });
    });
}

// Fonction pour afficher les détails dans la modal
function afficherDetails(carId) {
    fetch("../luxdrive_site_data_full.json")
        .then(response => response.json())
        .then(data => {
            const car = data.cars.find(c => c.id == carId);
            if (!car) {
                console.error("Voiture non trouvée !");
                return;
            }

            document.getElementById("modalTitle").innerText = car.name;
            document.getElementById("modalBody").innerHTML = `
                <img src="${car.image}" class="img-fluid mb-3" alt="${car.name}">
                <p><strong>Marque :</strong> ${car.brandId}</p>
                <p><strong>Prix :</strong> ${car.price.toLocaleString()} €</p>
                <p>${car.description}</p>
            `;

            // Ouvrir la modal avec Bootstrap
            console.log("Ouverture de la modal...");
            const modal = new bootstrap.Modal(document.getElementById("detailsModal"));
            modal.show();
        })
        .catch(error => console.error("Erreur lors du chargement des détails:", error));
}