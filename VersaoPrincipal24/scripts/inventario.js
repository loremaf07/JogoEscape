const indicesItens = {
  chaveAgua: 0,
  chaveVerde: 1,
  chavePrata: 2,
  chaveFogo: 3,
  alicate: 4,
};

let inventarioEstaAberto = false;

function lerInventario() {
  const dadosSalvos = localStorage.getItem("inventario");
  if (!dadosSalvos) {
    return Array(8).fill(0);
  }

  let inventarioSalvo;
  try {
    inventarioSalvo = JSON.parse(dadosSalvos);
  } catch (erro) {
    console.warn("O inventário salvo estava inválido e foi reiniciado.", erro);
    return Array(8).fill(0);
  }

  if (!Array.isArray(inventarioSalvo)) {
    console.warn("O inventário salvo não é um array e foi reiniciado.");
    return Array(8).fill(0);
  }

  return Array.from({ length: 8 }, (_, indice) =>
    inventarioSalvo[indice] === 1 ? 1 : 0
  );
}

function guardarItem(item) {
  const indice = indicesItens[item];
  if (indice === undefined) {
    throw new Error(`Item desconhecido: ${item}`);
  }

  const inventario = lerInventario();
  inventario[indice] = 1;
  localStorage.setItem("inventario", JSON.stringify(inventario));
  atualizarInventario();
}

function atualizarInventario() {
  const inventario = lerInventario();
  document.querySelectorAll(".inventario-grade .slot").forEach((slot, indice) => {
    const imagem = slot.querySelector("img");
    if (imagem) {
      imagem.style.opacity = inventario[indice] === 1 ? "1" : "0";
    }
  });
}

// Função de desenvolvimento: execute limparInventario() no console.
function limparInventario() {
  localStorage.setItem("inventario", JSON.stringify(Array(8).fill(0)));
  atualizarInventario();
  console.log("Inventário limpo.");
}

// limparInventario()

function inicializarInventario() {
  const game = document.querySelector(".game");
  const painel = document.querySelector(".inventario_aberto");

  if (!painel) {
    game?.insertAdjacentHTML("afterbegin", `
      <div class="inventario_aberto" aria-label="Inventário do jogo">
        <div class="inventario-cabecalho">Inventário</div>
        <div class="inventario-grade">
          <div class="slot"><img class="item" src="images/chaveAgua.png" alt=""></div>
          <div class="slot"><img class="item" src="images/chaveVerde.png" alt=""></div>
          <div class="slot"><img class="item" src="images/chavePrata.png" alt=""></div>
          <div class="slot"><img class="item" src="images/chaveFogo.png" alt=""></div>
          <div class="slot"><img class="item" src="images/alicate.png" alt=""></div>
          <div class="slot"></div>
          <div class="slot"></div>
          <div class="slot"></div>
          </div>
      </div>
    `);
  }

  atualizarInventario();
}

function inventario() {
  if (!inventarioEstaAberto) {
      abrirInventario();
      inventarioEstaAberto = true;
  } else {
      fecharInventario();
      inventarioEstaAberto = false;
  }
}

function abrirInventario() {
    const inventario = document.querySelector(".inventario_aberto");
    inventario.classList.remove("fecharinventario");
    inventario.classList.add("abrindoinventario");
}

function fecharInventario() {
    const inventario = document.querySelector(".inventario_aberto");
    inventario.classList.add("fecharinventario");
    inventario.classList.remove("abrindoinventario");
    
}

inicializarInventario();
