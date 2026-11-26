const restaurants = [
    {
        id: 1,
        name: "Bistro am See",
        ort: "Luzern",
        kueche: "Mediterrane Küche",
        hatVegiGerichte: true,
        bild: "bilder/bistro-am-see.png",
        bildAlt:"Gedeckte Tische auf einer Terrasse am See"
    },
    {
        id: 2,
        name: "Grillstube",
        ort: "Rotkreuz",
        kueche: "Grillspezialität",
        hatVegiGerichte: false,
        bild: "bilder/grillstube.png",
        bildAlt: "Gastraum mit Holztischen und offenem Grill"
    }
];

const restaurantListe = document.querySelector(".restaurant-liste");
const vorlage = document.querySelector("#restaurant-vorlage");

for (const restaurant of restaurants) {
    const kopie = vorlage.content.cloneNode(true);
    const karte = kopie.querySelector(".restaurant");

    karte.dataset.id = restaurant.id;
    karte.dataset.ort = restaurant.ort;
    karte.dataset.vegi = restaurant.hatVegiGerichte ? "ja" : "nein";

    const bild = karte.querySelector(".restaurant-bild");
    bild.src = restaurant.bild;
    bild.alt = restaurant.bildAlt;

    karte.querySelector("h2").textContent = restaurant.name;
    karte.querySelector(".ort-kueche").textContent =
        restaurant.ort + " · " + restaurant.kueche;
    karte.querySelector(".vegi-hinweis").hidden = !restaurant.hatVegiGerichte;

    restaurantListe.append(kopie);
}    

const vegiFilter = document.querySelector("#vegi-filter");
const ortFilter = document.querySelector("#ort-filter");
const restaurantKarten = document.querySelectorAll(".restaurant");

function restaurantsFiltern() {
    for (const karte of restaurantKarten) {
        const ortPasst = ortFilter.value === "" || karte.dataset.ort === ortFilter.value;
        const vegiPasst = !vegiFilter.checked || karte.dataset.vegi === "ja";

        karte.hidden = !(ortPasst && vegiPasst);
    }
}

ortFilter.addEventListener("change", restaurantsFiltern);
vegiFilter.addEventListener("change", restaurantsFiltern);
restaurantsFiltern();

const anfrageButtons = document.querySelectorAll(".anfrage-button");
const anfrageBereich = document.querySelector("#anfrage-bereich");
const anfrageTitel = document.querySelector("#anfrage-titel");

for(const button of anfrageButtons){
    button.addEventListener("click", function(){
        const karte = button.closest(".restaurant");
        document.querySelector("#restaurant-id").value = karte.dataset.id;
        const restaurantName = karte.querySelector("h2").textContent;

        anfrageTitel.textContent = "Tisch anfragen bei " + restaurantName;
        anfrageBereich.hidden = false;
        anfrageBereich.scrollIntoView({ behavior: "smooth"});
    });
}

const anfrageFormular = document.querySelector("#anfrage-formular");

anfrageFormular.addEventListener("submit", function(event){
    event.preventDefault();
    const daten = new FormData(anfrageFormular);
    const anfrage = Object.fromEntries(daten);
    anfrage.restaurantId = Number(anfrage.restaurantId);
    anfrage.anzahlGaeste = Number(anfrage.anzahlGaeste);
    console.table(anfrage);
    alert("Die Pflichfelder sind ausgefüllt. Dies ist ein Test - deine Anfrage wurde noch nicht versendet.");
});