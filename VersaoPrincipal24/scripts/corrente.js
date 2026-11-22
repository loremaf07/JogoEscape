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

function pegarPergaminho() {
    const perga = document.getElementById("pergaminho");

    perga.classList.add("coletar");
    guardarItem("pergaminho");
}

function liberarPapel() {
    const botao = document.getElementById("btnvoa");
    botao.classList.add("botaogirador")

    botao.style.top = "47%";
    botao.style.lef = "59%";

    setTimeout(() => {
        botao.style.rotate = "720deg"
        botao.style.left = "-200%"
        botao.style.top = "200%"
        
    }, 1500);
}

// Volta para o jogo
function backGame() {
    window.location.href = "game.html";
}
