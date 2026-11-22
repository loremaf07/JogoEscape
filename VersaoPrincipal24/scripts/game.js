const gameContent = document.querySelector(".game-content");
const scenarios = Array.from(gameContent.querySelectorAll(".scenario-slide"));
const scenarioImages = scenarios.map((scenario) => scenario.querySelector("img"));
const previousButton = document.querySelector(".scenario-previous");
const nextButton = document.querySelector(".scenario-next");
let currentScenario = 0;
const zoomReturnStorageKey = "scenarioZoomReturn";
//let abrir = true;



function showScenario(index, behavior = "smooth") {
    currentScenario = Math.max(0, Math.min(index, scenarios.length - 1));
    const previousScrollBehavior = gameContent.style.scrollBehavior;
    if (behavior === "auto") {
        gameContent.style.scrollBehavior = "auto";
    }
    gameContent.scrollTo({
        left: currentScenario * gameContent.clientWidth,
        behavior,
    });
    gameContent.style.scrollBehavior = previousScrollBehavior;
    previousButton.disabled = currentScenario === 0;
    nextButton.disabled = currentScenario === scenarios.length - 1;
}

function getZoomReturnState() {
  const savedState = sessionStorage.getItem(zoomReturnStorageKey);
  if (!savedState) {
    return null;
  }

  sessionStorage.removeItem(zoomReturnStorageKey);

  try {
    const state = JSON.parse(savedState);
    if (
      Number.isInteger(state.scenarioIndex) &&
      state.scenarioIndex >= 0 &&
      state.scenarioIndex < scenarioImages.length &&
      typeof state.transformOrigin === "string"
    ) {
      return state;
    }
  } catch (error) {
    console.error("Não foi possível restaurar o zoom do cenário.", error);
  }

  return null;
}

function animateZoomOut(state) {
  const image = scenarioImages[state.scenarioIndex];
  showScenario(state.scenarioIndex, "auto");

  image.style.transition = "none";
  image.style.transformOrigin = state.transformOrigin;
  image.style.transform = "scale(2.5)";
  image.getBoundingClientRect();

  requestAnimationFrame(() => {
    image.style.transition = "transform 0.4s ease";
    image.style.transform = "scale(1)";
  });

  image.addEventListener("transitionend", (event) => {
    if (event.propertyName === "transform") {
      image.style.transition = "";
      image.style.transformOrigin = "center center";
    }
  }, { once: true });
}

function voltarIndex() {
  window.location.href = "index.html";
}

function derrubar() {
    const element = document.getElementById('flores');
    element.classList.add('cair');
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
  let endere = "puzzleA1.html";
  

  if (c == 1) {
    alf = "B";
  } else if (c == 2) {
    alf = "C";
  } else if (c == 3) {
    alf = "D";
  } 

  if (c < 4) {
    endere = "puzzle" + alf + "1.html";
  } else if (c == 4) {
    endere = "salaChaves.html";
    c=3;
  } else if (c == 5) {
    endere = "cadeiraampliada.html";
    c=0;
  } else if (c == 6) {
    endere = "comoda.html";
    c=2;
  } else if (c == 7) {
    endere = "puzzleB2.html";
    c=1;
  } else if (c == 8) {
    endere = "caixametal.html";
    c=0;
  }

  sessionStorage.setItem(zoomReturnStorageKey, JSON.stringify({
    scenarioIndex: c,
    transformOrigin: `${x} ${y}`,
  }));
  
    // Define o ponto focal do zoom nas coordenadas exatas passadas pelo botão
  scenarioImages[c].style.transformOrigin = `${x} ${y}`;
  
  // Aplica o zoom (mude para 3 ou 4 se quiser aproximar ainda mais)
  scenarioImages[c].style.transform = "scale(2.5)";
  
  // 2. Espera 200 milissegundos (0.2 segundos) antes de dar o zoom físico
  setTimeout(function() {
    window.location.href = endere;
  }, 1000);
}

function ativarPuzzle() {
    alert("Funcionou!");
}
const zoomReturnState = getZoomReturnState();
showScenario(zoomReturnState ? zoomReturnState.scenarioIndex : 0, "auto");
if (zoomReturnState) {
  animateZoomOut(zoomReturnState);
}
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    const restoredState = getZoomReturnState();
    if (restoredState) {
      animateZoomOut(restoredState);
    }
  }
});
atualizarInventario();