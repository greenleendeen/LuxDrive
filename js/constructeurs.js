document.addEventListener("DOMContentLoaded", function () {
    fetch("../luxdrive_site_data_full.json")
        .then(response => response.json())
        .then(data => {
            afficherConstructeurs(data);
        })
        .catch(error => console.error("Erreur lors du chargement du JSON: ", error));
});

// Générer le cartes des logos

function afficherConstructeurs(data) {
    const brandsContainer = document.getElementById("brandsContainer");

    data.brands.forEach(brand => {
        const brandCard = `
       <div class="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
    <div class="card logo-card shadow-lg text-center p-3">
        <div class="logo-container">
            <img src="${brand.logo}" class="logo-img" alt="${brand.name}">
        </div>
        <div class="card-body">
            <h6 class="brand-title text-light">${brand.name}</h6>
        </div>
    </div>
</div>
    `;
        brandsContainer.innerHTML += brandCard;
    });
}