// Volta para a página anterior
function backGame() {
    window.history.back();
}

function abrirGaveta() {
    const gaveta = document.querySelector('.gaveta');
    gaveta.style.top = "65%"; // Ajuste a posição da gaveta para simular a abertura
    //gaveta.classList.toggle('aberta');
}

function pegarPapel() {
    const papel = document.getElementById("dicasteclado");

    papel.style.zIndex = 3
    papel.classList.add("coletar");
}