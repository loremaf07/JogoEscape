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

showScenario(0);