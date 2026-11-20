// Volta para a página anterior
function backGame() {
  window.history.back();
}

let etapa = 0;
const sequencia = ["a", "g", "x", "n", "p", "y", "c", "k", " "];

document.addEventListener("keydown", function(event) {
    if (event.repeat) return;
    const tecla = event.key.toLowerCase();

    if (tecla === " ") event.preventDefault(); // Evita rolar a página

    // Verifica se apertou a tecla exata da etapa atual
    if (tecla === sequencia[etapa]) {
        etapa++;
        atualizarFios(etapa);
    } else {
        // Se apertar qualquer tecla fora de ordem, reseta tudo
        etapa = 0;
        atualizarFios(0);
    }
});

function atualizarFios(nivel) {
    const cortesFio1 = ["100%", "84%", "70%", "53%", "33%", "14%", "1%"];
    const cortesFio2 = ["100%", "66%", "36%", "0%"];

    if (nivel <= 6) {
        fio1.style.clipPath = `inset(0 ${cortesFio1[nivel]} 0 0)`;
        fio2.style.clipPath = "inset(0 100% 0 0)";
    } else {
        fio1.style.clipPath = "inset(0 1% 0 0)";
        fio2.style.clipPath = `inset(0 ${cortesFio2[nivel - 6]} 0 0)`;
    }
    if (etapa === sequencia.length) {
          setTimeout(() => {
            fio3.style.clipPath = "inset(0 0 0 0)";
        }, 600);
    }
}
