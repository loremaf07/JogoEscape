const indicesItens = {
  chaveAgua: 0,
  chaveVerde: 1,
  chavePrata: 2,
  chaveFogo: 3,
  alicate: 4,
  teclado: 5,
  pergaminho: 6,
  ima: 7
};

const capacidadeInventario = 12;

let usou = false;
let imaEstaEmUso = false;
let inventarioEstaAberto = false;

function lerInventario() {
  const dadosSalvos = localStorage.getItem("inventario");
  if (!dadosSalvos) {
    return Array(capacidadeInventario).fill(0);
  }

  let inventarioSalvo;
  try {
    inventarioSalvo = JSON.parse(dadosSalvos);
  } catch (erro) {
    console.warn("O inventário salvo estava inválido e foi reiniciado.", erro);
    return Array(capacidadeInventario).fill(0);
  }

  if (!Array.isArray(inventarioSalvo)) {
    console.warn("O inventário salvo não é um array e foi reiniciado.");
    return Array(capacidadeInventario).fill(0);
  }

  return Array.from({ length: capacidadeInventario }, (_, indice) =>
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

function consumirItem(item) {
  const indice = indicesItens[item];
  if (indice === undefined) {
    throw new Error(`Item desconhecido: ${item}`);
  }

  const inventario = lerInventario();
  if (inventario[indice] !== 1) {
    return false;
  }

  inventario[indice] = 0;
  localStorage.setItem("inventario", JSON.stringify(inventario));
  atualizarInventario();
  return true;
}

function atualizarInventario() {
  const inventario = lerInventario();
  document.querySelectorAll(".inventario-grade .slot").forEach((slot, indice) => {
    const imagem = slot.querySelector("img");
    if (imagem) {
      imagem.style.opacity = inventario[indice] === 1 ? "1" : "0";
      imagem.style.pointerEvents = inventario[indice] === 1 ? "auto" : "none";
    }
  });
}

// Função de desenvolvimento: execute limparInventario() no console.
function limparInventario() {
  localStorage.setItem("inventario", JSON.stringify(Array(capacidadeInventario).fill(0)));
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
          <div class="slot"><img class="item" src="images/alicate.png" onclick="usarAlicate(event)" alt=""></div>
          <div class="slot"><img class="item" src="images/puzzleB2/teclasdica.webp" onclick="ampliar(5)" alt=""></div>
          <div class="slot"><img class="item" src="images/pergaminho.webp" onclick="ampliar(6)" alt=""></div>
          <div class="slot"><img class="item" src="images/ima.webp" onclick="usarIma(event)" alt=""></div>
          <div class="slot"></div>
          <div class="slot"></div>
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

function usarIma(event) {
  const game = document.querySelector(".game");

  if (!imaEstaEmUso) {
    game?.insertAdjacentHTML("afterbegin", `
      <img src="images/ima.webp" alt="ímã" id="ima-cursor" class="ferramenta" oncontextmenu="return false;">
    `);

    if (event) {
      moverIma(event);
    }

    document.addEventListener("mousemove", moverIma);
    imaEstaEmUso = true;
  } else {
    document.getElementById("ima-cursor")?.remove();
    document.removeEventListener("mousemove", moverIma);
    imaEstaEmUso = false;
  }
}

function moverIma(event) {
  const imagemCursor = document.getElementById("ima-cursor");
  if (imagemCursor) {
    imagemCursor.style.left = `${event.clientX}px`;
    imagemCursor.style.top = `${event.clientY}px`;
    atrairChaveFogo(event);
  }
}

function atrairChaveFogo(event) {
  const chave = document.getElementById("chave-fogo-aquario");
  const vidro = document.getElementById("aquario-vidro");
  const jogo = chave?.closest(".game");
  if (!chave || !vidro || !jogo || chave.dataset.coletada === "true") {
    return;
  }

  const chaveBounds = chave.getBoundingClientRect();
  const diferencaX = event.clientX - (chaveBounds.left + chaveBounds.width / 2);
  const diferencaY = event.clientY - (chaveBounds.top + chaveBounds.height / 2);
  const distancia = Math.hypot(diferencaX, diferencaY);
  if (distancia === 0 || distancia > 260) {
    return;
  }

  chave.classList.add("chave-fogo-atraida");
  const passo = Math.min(distancia, Math.max(12, distancia * 0.25));
  const deslocamentoX = (diferencaX / distancia) * passo;
  const deslocamentoY = (diferencaY / distancia) * passo;
  const jogoBounds = jogo.getBoundingClientRect();
  const proximaEsquerda = chaveBounds.left - jogoBounds.left - jogo.clientLeft + deslocamentoX;
  const proximoTopo = chaveBounds.top - jogoBounds.top - jogo.clientTop + deslocamentoY;
  chave.style.left = `${proximaEsquerda}px`;
  chave.style.top = `${proximoTopo}px`;

  const vidroBounds = vidro.getBoundingClientRect();
  const limiteSuperiorVidro = vidroBounds.top + vidroBounds.height * 0.29;
  if (chaveBounds.bottom + deslocamentoY <= limiteSuperiorVidro) {
    chave.dataset.coletada = "true";
    //chave.classList.add("chave-fogo-coletada");
    chave.classList.add("coletar");
    guardarItem("chaveFogo");
    window.setTimeout(() => chave.remove(), 350);
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
  
  if (imagem == 5) {
    game?.insertAdjacentHTML("afterbegin", `
    <div class="ver">
            <img class="objetoampliado" src="images/puzzleB2/teclasdica.webp" onclick="sumir()" alt="papel">
      </div>
    `
    )
  } else if (imagem == 6) {
    game?.insertAdjacentHTML("afterbegin", `
    <div class="ver">
            <img class="objetoampliado" src="images/previa.png" onclick="sumir()" alt="papel">
      </div>
    `
    )
  }
  

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

const chaveFogoAquario = document.getElementById("chave-fogo-aquario");
if (chaveFogoAquario && lerInventario()[indicesItens.chaveFogo] === 1) {
  chaveFogoAquario.remove();
}
