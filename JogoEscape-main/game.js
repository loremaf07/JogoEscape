const gameContent = document.querySelector(".game-content");
const scenarios = Array.from(gameContent.querySelectorAll("img"));
const previousButton = document.querySelector(".scenario-previous");
const nextButton = document.querySelector(".scenario-next");
let currentScenario = 0;

function showScenario(index) {
    currentScenario = Math.max(0, Math.min(index, scenarios.length - 1));
    gameContent.scrollTo({
        left: currentScenario * gameContent.clientWidth,
        behavior: "smooth",
    });
    previousButton.disabled = currentScenario === 0;
    nextButton.disabled = currentScenario === scenarios.length - 1;
}

previousButton.addEventListener("click", () => showScenario(currentScenario - 1));
nextButton.addEventListener("click", () => showScenario(currentScenario + 1));

window.addEventListener("resize", () => {
    gameContent.scrollTo({
        left: currentScenario * gameContent.clientWidth,
        behavior: "auto",
    });
});

// Mecanica de Scroll das cenas

const puzeA1 = document.querySelector("puzzle_A1")
const puzeB1 = document.querySelector("puzzle_B1")
const puzeC1 = document.querySelector("puzzle_C1")
const puzeD1 = document.querySelector("puzzle_D1")

function darZoomNoObjeto(x, y, c) {
  let alf = "A";

  if (c == 1) {
    alf = "B";
  } else if (c == 2) {
    alf = "C";
  } else if (c == 3) {
    alf = "D";
  }
    // Define o ponto focal do zoom nas coordenadas exatas passadas pelo botão
  scenarios[c].style.transformOrigin = `${x} ${y}`;
  
  // Aplica o zoom (mude para 3 ou 4 se quiser aproximar ainda mais)
  scenarios[c].style.transform = "scale(2.5)";
  
  // 2. Espera 200 milissegundos (0.2 segundos) antes de dar o zoom físico
  setTimeout(function() {
    window.location.href = "puzzle" + alf + "1.html";
    //scenarios[c].style.transform = "scale(1)";
    //scenarios[c].style.transformOrigin = "center center";
  }, 1000);
  setTimeout(function() {
    scenarios[c].style.transform = "scale(1)";
    scenarios[c].style.transformOrigin = "center center";
  }, 1500);
  // Retorna a imagem ao tamanho normal centralizado
  
  
}

function ativarPuzzle() {
    alert("Funcionou!");
}

showScenario(0);