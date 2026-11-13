const indicesItens = {
  chaveAgua: 0,
  chaveVerde: 1,
  chavePrata: 2,
  chaveFogo: 3
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

function inicializarInventario() {
  const game = document.querySelector(".game");
  let painel = document.querySelector(".inventario_aberto");

  if (!painel) {
    painel = document.createElement("div");
    painel.className = "inventario_aberto";
    painel.setAttribute("aria-label", "Inventário do jogo");

    const cabecalho = document.createElement("div");
    cabecalho.className = "inventario-cabecalho";
    cabecalho.textContent = "Inventário";
    painel.appendChild(cabecalho);

    const grade = document.createElement("div");
    grade.className = "inventario-grade";
    const imagens = [
      "images/chaveAgua.png",
      "images/chaveVerde.png",
      "images/chavePrata.png",
      "images/chaveFogo.png"
    ];

    for (let indice = 0; indice < 8; indice++) {
      const slot = document.createElement("div");
      slot.className = "slot";

      if (imagens[indice]) {
        const imagem = document.createElement("img");
        imagem.className = "item";
        imagem.src = imagens[indice];
        imagem.alt = "";
        slot.appendChild(imagem);
      }

      grade.appendChild(slot);
    }

    painel.appendChild(grade);
    game.prepend(painel);
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
