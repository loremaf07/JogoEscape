const inventarioAtual = lerInventario();
const papel = document.getElementById("dicasteclado");

// Volta para a página anterior
function backGame() {
    window.history.back();
}

if (inventarioAtual[indicesItens.teclado] === 1) {
    papel.style.display = 'none';
}

function abrirGaveta() {
    const gaveta = document.querySelector('.gaveta');
    gaveta.style.top = "65%"; // Ajuste a posição da gaveta para simular a abertura
    //gaveta.classList.toggle('aberta');
}

function pegarPapel() {
    papel.style.zIndex = 3
    papel.classList.add("coletar");
    guardarItem("teclado");
}