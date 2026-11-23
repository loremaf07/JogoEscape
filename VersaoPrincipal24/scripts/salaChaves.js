const progressoChavesStorageKey = "fechadurasAbertas";
const chavesDaSala = ["chaveVerde", "chavePrata", "chaveFogo", "chaveAgua"];
let timerMensagemChaves;

function lerFechadurasAbertas() {
  const progressoSalvo = localStorage.getItem(progressoChavesStorageKey);
  if (!progressoSalvo) {
    return [];
  }

  try {
    const progresso = JSON.parse(progressoSalvo);
    if (!Array.isArray(progresso)) {
      console.warn("O progresso das fechaduras não é um array e foi reiniciado.");
      return [];
    }

    return chavesDaSala.filter((chave) => progresso.includes(chave));
  } catch (erro) {
    console.warn("O progresso das fechaduras estava inválido e foi reiniciado.", erro);
    return [];
  }
}

function mostrarMensagemChaves(mensagem) {
  const elemento = document.getElementById("mensagem-chaves");
  elemento.textContent = mensagem;
  elemento.classList.add("mensagem-chaves-visivel");
  window.clearTimeout(timerMensagemChaves);
  timerMensagemChaves = window.setTimeout(() => {
    elemento.classList.remove("mensagem-chaves-visivel");
  }, 2600);
}

function abrirFechadura(botao) {
  const chave = botao.dataset.chave;
  if (botao.disabled) {
    return;
  }

  if (lerInventario()[indicesItens[chave]] !== 1) {
    const nomesChaves = {
      chaveVerde: "verde",
      chavePrata: "prata",
      chaveFogo: "de fogo",
      chaveAgua: "de água",
    };
    mostrarMensagemChaves(`Você precisa da chave ${nomesChaves[chave]}.`);
    return;
  }

  if (!consumirItem(chave)) {
    mostrarMensagemChaves("Não foi possível usar essa chave. Confira seu inventário.");
    return;
  }

  const fechadurasAbertas = lerFechadurasAbertas();
  fechadurasAbertas.push(chave);
  localStorage.setItem(progressoChavesStorageKey, JSON.stringify(fechadurasAbertas));

  botao.disabled = true;
  botao.classList.add("fechadura-destravando");
  const imagemChave = document.createElement("img");
  imagemChave.className = "chave-encaixando";
  imagemChave.src = `images/${chave}.png`;
  imagemChave.alt = "";
  botao.append(imagemChave);

  window.setTimeout(() => {
    imagemChave.remove();
    botao.classList.remove("fechadura-destravando");
    botao.classList.add("fechadura-aberta");
    mostrarMensagemChaves("Fechadura aberta!");

    if (fechadurasAbertas.length === chavesDaSala.length) {
      document.getElementById("vitoria-chaves").hidden = false;
    }
  }, 900);
}

function atualizarFechaduras() {
  const fechadurasAbertas = lerFechadurasAbertas();
  document.querySelectorAll(".fechadura").forEach((botao) => {
    if (fechadurasAbertas.includes(botao.dataset.chave)) {
      botao.disabled = true;
      botao.classList.add("fechadura-aberta");
    }
  });

  if (fechadurasAbertas.length === chavesDaSala.length) {
    document.getElementById("vitoria-chaves").hidden = false;
  }
}

document.querySelectorAll(".fechadura").forEach((botao) => {
  botao.addEventListener("click", () => abrirFechadura(botao));
});
atualizarFechaduras();

// Volta para a página anterior
function backGame() {
  window.history.back();
}