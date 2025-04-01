document.addEventListener("DOMContentLoaded", function () {
    const boutonsDetails = document.querySelectorAll(".voir-details");
    //console.log("coucou");

    boutonsDetails.forEach(button => {
        button.addEventListener("click", function () {
            const carId = this.getAttribute("data-id");
            afficherDetails(carId);
        });
    });
});

function afficherDetails(carId) {
    console.log("Détails demandés pour la voiture ID :", carId); // Debugging

    fetch("../luxdrive_site_data_full.json")
        .then(response => response.json())
        .then(data => {
            const car = data.cars.find(c => c.id == carId);
            if (!car) {
                console.error("Voiture non trouvée !");
                return;
            }
            const cars = data.cars;
            const brands = data.brands;
     // Trouver la marque correspondante
     const brand = brands.find(b => b.id === car.brandId);
     const brandName = brand ? brand.name : "Marque inconnue";
     const brandLogo = brand ? brand.logo : "";

            document.getElementById("modalTitle").innerText = car.name;
            document.getElementById("modalBody").innerHTML = `
                <img src="${car.image}" class="img-fluid mb-3" alt="${car.name}">
                  <p class="card-text"><strong>Marque :</strong> ${brandName}<img src="${brandLogo}" style="height:30px;"></p>
                <p><strong>Prix :</strong> ${car.price.toLocaleString()} €</p>
                <p>${car.description}</p>
            `;

            // Debug : Vérifier si Bootstrap ouvre la modal
            console.log("Tentative d'ouverture de la modal...");
            const modal = new bootstrap.Modal(document.getElementById("detailsModal"));
            modal.show();
        })
        .catch(error => console.error("Erreur lors du chargement des détails:", error));
}