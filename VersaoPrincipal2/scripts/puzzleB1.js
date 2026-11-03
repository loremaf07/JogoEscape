
let quadrados = [
    ["peca1", "peca2", "peca3", "peca4"],
    ["peca5", "peca6", "peca7", "peca8"],
    ["peca9", "peca10", "peca11", "peca12"],
    ["peca13", "peca14", "peca15", "peca16"]
];

// Volta para a página anterior
function backGame() {
    window.history.back();
}

// Encontra a posição de uma peça na matriz
function encontrarPosicao(matriz, itemProcurado) {
    for (let linha = 0; linha < matriz.length; linha++) {
        for (let coluna = 0; coluna < matriz.length; coluna++) {
            if (matriz[linha][coluna] === itemProcurado) {
                return { linha, coluna };
            }
        }
    }

    return null;
}

// Troca duas peças na matriz e no HTML
function trocarPecas(id1, id2) {
    const peca1 = document.getElementById(id1);
    const peca2 = document.getElementById(id2);

    if (!peca1 || !peca2 || id1 === id2) {
        return;
    }

    // Localiza as posições atuais na matriz
    const pos1 = encontrarPosicao(quadrados, id1);
    const pos2 = encontrarPosicao(quadrados, id2);

    if (!pos1 || !pos2) {
        return;
    }

    // Troca as posições na matriz
    const temporaria = quadrados[pos1.linha][pos1.coluna];

    quadrados[pos1.linha][pos1.coluna] =
        quadrados[pos2.linha][pos2.coluna];

    quadrados[pos2.linha][pos2.coluna] = temporaria;

    // Guarda as margens da primeira peça
    const top1 = peca1.style.marginTop;
    const left1 = peca1.style.marginLeft;

    // Troca as posições visuais
    peca1.style.marginTop = peca2.style.marginTop;
    peca1.style.marginLeft = peca2.style.marginLeft;

    peca2.style.marginTop = top1;
    peca2.style.marginLeft = left1;
}

// Embaralha as peças
function embaralharPecas() {
    const pecas = [];

    // Reúne todas as peças da matriz
    for (let linha = 0; linha < quadrados.length; linha++) {
        for (let coluna = 0; coluna < quadrados[linha].length; coluna++) {
            pecas.push(quadrados[linha][coluna]);
        }
    }

    // Fisher-Yates: embaralha a lista
    for (let i = pecas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [pecas[i], pecas[j]] = [pecas[j], pecas[i]];
    }

    // Reorganiza a matriz com a nova ordem
    let indice = 0;

    for (let linha = 0; linha < quadrados.length; linha++) {
        for (let coluna = 0; coluna < quadrados[linha].length; coluna++) {
            quadrados[linha][coluna] = pecas[indice];
            indice++;
        }
    }

    // Posiciona visualmente cada peça conforme a matriz
    const todasPecas = [];

    for (let linha = 0; linha < quadrados.length; linha++) {
        for (let coluna = 0; coluna < quadrados[linha].length; coluna++) {
            const id = quadrados[linha][coluna];
            const peca = document.getElementById(id);

            if (peca) {
                todasPecas.push({
                    elemento: peca,
                    linha: linha,
                    coluna: coluna
                });
            }
        }
    }

    // Usa as posições originais das peças como referência.
    // Cada peça recebe a posição visual correspondente à sua
    // posição na matriz embaralhada.
    const posicoesOriginais = {};

    todasPecas.forEach(item => {
        posicoesOriginais[item.elemento.id] = {
            top: item.elemento.style.marginTop,
            left: item.elemento.style.marginLeft
        };
    });

    // Este trecho pressupõe que as posições iniciais das peças
    // correspondem à ordem original peca1, peca2, ..., peca16.
    const posicoes = {};

    for (let i = 1; i <= 16; i++) {
        const peca = document.getElementById("peca" + i);

        if (peca) {
            posicoes["peca" + i] = {
                top: peca.style.marginTop,
                left: peca.style.marginLeft
            };
        }
    }

    for (let linha = 0; linha < quadrados.length; linha++) {
        for (let coluna = 0; coluna < quadrados[linha].length; coluna++) {
            const id = quadrados[linha][coluna];
            const peca = document.getElementById(id);

            // A posição visual é determinada pela célula
            // correspondente à posição original daquela célula.
            const numeroDaPosicao = linha * 4 + coluna + 1;
            const posicao = posicoes["peca" + numeroDaPosicao];

            if (peca && posicao) {
                peca.style.marginTop = posicao.top;
                peca.style.marginLeft = posicao.left;
            }
        }
    }

    console.table(quadrados);
}

// Inicialização
window.addEventListener("load", () => {
    embaralharPecas();
});

function verifyPos(peca) {
    let peca16 = encontrarPosicao(quadrados, "peca16")
    let posicao = encontrarPosicao(quadrados, peca.id)
    let afirma = false;

    /*alert(
                    `Peça: ${peca.id}\n` +
                    `Linha: ${posicao.linha}\n` +
                    `Coluna: ${posicao.coluna}`
                );
    alert(
                    `Peça: ${"peca16"}\n` +
                    `Linha: ${peca16.linha}\n` +
                    `Coluna: ${peca16.coluna}`
                );*/
    

    if (posicao.linha == peca16.linha) {
        if (posicao.coluna == peca16.coluna+1 || posicao.coluna == peca16.coluna-1) {
            afirma = true
        }
    }

    if (posicao.coluna == peca16.coluna) {
        if (posicao.linha == peca16.linha+1 || posicao.linha == peca16.linha-1) {
            afirma = true
        }
    }

    return afirma;
}

// Eventos de clique
document.querySelectorAll(".pecas-container").forEach(peca => {
    peca.addEventListener("click", () => {
        if (verifyPos(peca)) { 
            //verifyPos(peca)
            trocarPecas(peca.id, "peca16");

            console.log("Matriz atualizada:");
            console.table(quadrados);

            const posicao = encontrarPosicao(quadrados, peca.id);
            
            /*if (posicao) {
                alert(
                    `Peça: ${peca.id}\n` +
                    `Linha: ${posicao.linha}\n` +
                    `Coluna: ${posicao.coluna}`
                );
            }*/
        }
        

    });
});
