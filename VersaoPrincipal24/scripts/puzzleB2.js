// Volta para a página anterior
function backGame() {
  window.history.back();
}
const inventarioAtual = lerInventario();



let etapa = 0;
const sequencia = ["a", "g", "x", "n", "o", "y", "c", "k", " "];
let fez = false;

const imas = document.getElementById("ima")
const elemento = document.getElementById("seta");
let angulo = 0;
let velocidade = 0.2; // Começa bem devagar

function girar() {
angulo += velocidade;
velocidade += 0.02; // Aumenta a velocidade aos poucos a cada frame

// Opcional: coloca um limite máximo para não bugar a tela
if (velocidade > 40) velocidade = 40; 



elemento.style.transform = `rotate(${angulo}deg)`;
requestAnimationFrame(girar); // Mantém o loop suave a 60fps
}
// girar()

if (inventarioAtual[indicesItens.ima] === 1) {
    fez = true;
    velocidade = 20;
    fio1.style.transition = "none"
    fio2.style.transition = "none"
    fio3.style.transition = "none"
    fio1.style.clipPath = "inset(0 0 0 0)"
    fio2.style.clipPath = "inset(0 0 0 0)"
    fio3.style.clipPath = "inset(0 0 0 0)"
    girar();
}

document.addEventListener("keydown", function(event) {
    if (!fez) {
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
            girar()
            setTimeout(() => {
                imas.style.opacity = 1;
                imas.classList.add('coletar');
                guardarItem("ima");
            }, 2000);
        }, 600);
    }
}
