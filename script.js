const vegiFilter = document.querySelector("#vegi-filter");
const restaurantKarten = document.querySelectorAll(".restaurant");

vegiFilter.addEventListener("change", function(){
    for (const karte of restaurantKarten){
        const hatVegiGerichte = karte.dataset.vegi === "ja";
        karte.hidden = vegiFilter.checked && !hatVegiGerichte;
    }
});
const anfrageButtons = document.querySelectorAll(".anfrage-button");
const anfrageBereich = document.querySelector("#anfrage-bereich");
const anfrageTitel = document.querySelector("#anfrage-titel");

for(const button of anfrageButtons){
    button.addEventListener("click", function(){
        const karte = button.closest(".restaurant");
        const restaurantName = karte.querySelector("h2").textContent;

        anfrageTitel.textContent = "Tisch anfragen bei " + restaurantName;
        anfrageBereich.hidden = false;
        anfrageBereich.scrollIntoView({ behavior: "smooth"});
    });
}