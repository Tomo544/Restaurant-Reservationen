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