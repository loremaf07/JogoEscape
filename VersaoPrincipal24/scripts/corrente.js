function cortarCorrente() {
    const correntedireita = document.getElementById("correntedireita")
    const correnteesquerda = document.getElementById("correnteesquerda")

    if (usou) {
        /*
        correnteesquerda.style.transform = "rotate(55deg)";
        correntedireita.style.transform = "rotate(-55deg)";*/

        correnteesquerda.classList.add("cair-esquerda");
        correntedireita.classList.add("cair-direita");
        document.getElementById("alicate").remove()
    }
    
}

// Volta para a página anterior
function backGame() {
    window.history.back();
}
