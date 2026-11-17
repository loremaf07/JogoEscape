const inventarioAtual = lerInventario();
const alicatei = document.getElementById('alicate');
// Volta para a página anterior
function backGame() {
  window.history.back();
}


if (inventarioAtual[indicesItens.alicate] === 1) {
    alicatei.style.display = 'none';
}


function pegarAlicate() {
  const alicate = document.getElementById('alicate');
  

  alicate.classList.add('coletar');
  guardarItem("alicate");


  
}