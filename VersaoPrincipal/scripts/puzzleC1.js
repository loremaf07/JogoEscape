const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const botoes = [
  document.getElementById("btn1"),
  document.getElementById("btn2"),
  document.getElementById("btn3")
];

const imagensBotoes = [
  document.getElementById("btn1img"),
  document.getElementById("btn2img"),
  document.getElementById("btn3img")
];

const alturas = [0, 0, 0];
const centros = [150, 400, 650];
const largura = 65;
const linhaBase = 150;

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  for (let x = 0; x <= canvas.width; x++) {
    let y = linhaBase;

    for (let i = 0; i < alturas.length; i++) {
      const distancia = (x - centros[i]) / largura;
      y -= alturas[i] * Math.exp(-distancia * distancia);
    }

    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.strokeStyle = "#bcf8c2";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function ajustarOnda(indice, direcao) {
  alturas[indice] = Math.max(0, Math.min(180, alturas[indice] + direcao * 20));
  desenhar();
}

function lidarComClique(indice, event) {
  const botao = botoes[indice];
  const imagem = imagensBotoes[indice];
  const cliqueY = event.clientY - botao.getBoundingClientRect().top;
  const alturaBotao = botao.getBoundingClientRect().height;
  const posicaoAtual = parseInt(imagem.style.top, 10);

  if (cliqueY < alturaBotao / 3) {
    if (imagem.style.top != "405px") {
      imagem.style.top = `${Math.max(405, posicaoAtual - 25)}px`;
      ajustarOnda(indice, 1);
    }
    
  } else if (cliqueY >= (alturaBotao / 3) * 2) {
    if (imagem.style.top != "505px") {
      imagem.style.top = `${Math.min(505, posicaoAtual + 25)}px`;
      ajustarOnda(indice, -1);
    }
    
  }
}

botoes.forEach((botao, indice) => {
  botao.addEventListener("click", event => lidarComClique(indice, event));
});

// Volta para a página anterior
function backGame() {
    window.history.back();
}


desenhar();
