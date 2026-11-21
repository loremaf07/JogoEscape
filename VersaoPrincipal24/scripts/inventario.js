const indicesItens = {
  chaveAgua: 0,
  chaveVerde: 1,
  chavePrata: 2,
  chaveFogo: 3,
  alicate: 4,
  teclado: 5
};

let usou = false;
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
          <div class="slot"><img class="item" src="images/alicate.png" onclick="usarAlicate()" alt=""></div>
          <div class="slot"><img class="item" src="images/puzzleB2/teclasdica.webp" onclick="ampliar(5)" alt=""></div>
          <div class="slot"></div>
          <div class="slot"></div>
          </div>
      </div>
    `);
  }

  atualizarInventario();
}

function moverAlicate(event) {
  const imagemCursor = document.getElementById("alicate");
  if (imagemCursor) {
    imagemCursor.style.left = `${event.clientX}px`;
    imagemCursor.style.top = `${event.clientY}px`;
  }
}

function usarAlicate(event) {
  const game = document.querySelector(".game");

  if (!usou) {
    // 1. Cria a imagem APENAS se ainda não estiver em uso
    game?.insertAdjacentHTML("afterbegin", `
      <img src="images/alicate.png" alt="alicate" id="alicate" class="ferramenta" oncontextmenu="return false;">
    `);

    // 2. Já posiciona no local exato do clique (se 'event' existir) para não piscar no canto da tela
    if (event) {
      moverAlicate(event);
    }

    // 3. Conecta a função moverAlicate que você já tinha criado
    document.addEventListener("mousemove", moverAlicate);
    usou = true;

  } else {
    // 4. Remove a imagem e desliga o rastreamento do mouse
    const imagemCursor = document.getElementById("alicate");
    imagemCursor?.remove();
    
    document.removeEventListener("mousemove", moverAlicate);
    usou = false;
  }
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

function ampliar(imagem) {
  const game = document.querySelector(".game");
  //const painel = document.querySelector(".inventario_aberto");
  
  game?.insertAdjacentHTML("afterbegin", `
    <div class="ver">
            <img class="objetoampliado" src="images/puzzleB2/teclasdica.webp" onclick="sumir()" alt="papel">
      </div>
    `
  )

}

function sumir() {
    const imagem = document.querySelector(".ver");

    imagem.remove()
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
