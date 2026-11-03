const stickerElements = document.querySelectorAll('.sticker');
let sticks = Array(stickerElements.length).fill(0);


window.addEventListener('load', () => {
    const dadosSalvos = localStorage.getItem('progressoStickers');
    if (!dadosSalvos) {
        return;
    }

    try {
        const progressoSalvo = JSON.parse(dadosSalvos);
        if (!Array.isArray(progressoSalvo)) {
            throw new TypeError('O progresso salvo dos stickers não é um array.');
        }
        sticks = sticks.map((_, index) => progressoSalvo[index] === 1 ? 1 : 0);
    } catch (erro) {
        console.warn('O progresso dos stickers estava inválido e foi reiniciado.', erro);
        localStorage.removeItem('progressoStickers');
    }

    // Se quiser reiniciar o progresso dos stickers, descomente a linha abaixo
    //localStorage.setItem('progressoStickers', "");

    sticks.forEach((valor, index) => {
        if (valor === 1) {
            const stickerParaRemover = document.getElementById(`sticker${index + 1}`);
            if (stickerParaRemover) {
                stickerParaRemover.remove();
            }
        }
    });
});

function cairSticker(elementoSticker) {
    if (!elementoSticker) {
        return;
    }

    elementoSticker.classList.add('cair');
    
    const numeroId = parseInt(elementoSticker.id.replace('sticker', ''));
    
    if (!isNaN(numeroId) && numeroId > 0) {
        sticks[numeroId - 1] = 1;
    }
    
    localStorage.setItem('progressoStickers', JSON.stringify(sticks));
}


document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('click', function() {
        cairSticker(this);
    });
});

function backGame() {
    //window.location.href = "game.html"
    window.history.back(); 
}