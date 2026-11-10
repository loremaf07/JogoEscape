const seguidor = document.querySelector('.cursor-seguidor');
const engrena = document.getElementById('roleta');
const engrenagem1 = document.getElementById('engrenagem1');
const engrenagem2 = document.getElementById('engrenagem2');
const roda = document.getElementById('roda');

const placar1 = document.getElementById('placar_1');
const placar2 = document.getElementById('placar_2');
const placar3 = document.getElementById('placar_3');
const placar4 = document.getElementById('placar_4');

const chaveVerde = document.querySelector('.chaveVerde');

const area = document.getElementById('areaacessavel');
let arrastando = false;
let ultimoAngulo = 0;
let rotacao = 0;
let digito = 0;
let senha = [0, 0, 0, 0];
let cont = 0;

if (seguidor) {
  window.addEventListener('pointermove', (event) => {
    seguidor.style.setProperty('--mouse-x', `${event.clientX}px`);
    seguidor.style.setProperty('--mouse-y', `${event.clientY}px`);
  });
}

if (engrena && area) {
  area.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    arrastando = true;
    ultimoAngulo = obterAngulo(event);
    rotacao = 0;
    engrena.style.rotate = '0deg';
    area.setPointerCapture(event.pointerId);
  });

  area.addEventListener('pointermove', (event) => {
    if (!arrastando) {
      return;
    }

    const anguloAtual = obterAngulo(event);
    let diferenca = anguloAtual - ultimoAngulo;

    if (diferenca > 180) {
      diferenca -= 360;
    } else if (diferenca < -180) {
      diferenca += 360;
    }

    rotacao += diferenca;
    ultimoAngulo = anguloAtual;
    console.log(`Rotação atual: ${rotacao.toFixed(2)} graus`);
    engrena.style.rotate = `${rotacao}deg`;
    engrenagem1.style.rotate = `${rotacao}deg`;
    engrenagem2.style.rotate = `${-rotacao}deg`;
    roda.style.rotate = `${-rotacao}deg`;
  });

  const pararArrasto = () => {
    arrastando = false;
    
    
    if (rotacao <= 19. && rotacao >= -19.) {
        digito = 0;
    } else if (rotacao <= -20. && rotacao >= -52.) {
        digito = 1;
    } else if (rotacao <= -53. && rotacao >= -89.) {
        digito = 2;
    }   else if (rotacao <= -90. && rotacao >= -123.) {
        digito = 3;
    } else if (rotacao <= -124. && rotacao >= -157.) {
        digito = 4;
    } else if (rotacao <= -158. && rotacao >= -199.) {
        digito = 5;
    } else if (rotacao <= -200. && rotacao >= -234.) {
        digito = 6;
    } else if (rotacao <= -235. && rotacao >= -265.) {
        digito = 7;
    } else if (rotacao <= -266. && rotacao >= -307.) {
        digito = 8;
    } else if (rotacao <= -308. && rotacao >= -341.) {
        digito = 9;
    }

    if (rotacao >= 20. && rotacao <= 52.) {
        digito = 9;
    } else if (rotacao >= 53. && rotacao <= 89.) {
        digito = 8;
    } else if (rotacao >= 90. && rotacao <= 123.) {
        digito = 7;
    }   else if (rotacao >= 124. && rotacao <= 157.) {
        digito = 6;
    } else if (rotacao >= 158. && rotacao <= 199.) {
        digito = 5;
    } else if (rotacao >= 200. && rotacao <= 234.) {
        digito = 4;
    } else if (rotacao >= 235. && rotacao <= 265.) {
        digito = 3;
    } else if (rotacao >= 266. && rotacao <= 307.) {
        digito = 2;
    } else if (rotacao >= 308. && rotacao <= 341.) {
        digito = 1;
    } else if (rotacao >= 342. && rotacao <= 360.) {
        digito = 0;
    }
    senha.push(digito);
    if (senha.length > 4) {     
        senha.shift();
    }

    cont++;
    placar1.textContent = senha[0] || '0';
    placar2.textContent = senha[1] || '0';
    placar3.textContent = senha[2] || '0';
    placar4.textContent = senha[3] || '0';
    if (cont >= 4) {
        //alert(`Senha digitada: ${senha.join('')}`);
        cont = 0;
        if (senha.join('') === '6742') {
            chaveVerde.style.opacity = '1';
            chaveVerde.classList.add('coletar');
            
            //alert('Senha correta! Parabéns!');
        }
        senha = [];
    }
    rotacao = 0;
    engrenagem1.style.rotate = '0deg';
    engrenagem2.style.rotate = '0deg';
    roda.style.rotate = '0deg';
    engrena.style.rotate = '0deg';
  };

/*
0 ---            19.50 -- -19.50
1 ---  		 -20 --- -52
2 ---  		 -53 --- -89
3 ---  		 -90 --- -123
4 ---  		-124 --- -157
5 ---  		-158 -- -199
6 ---           -200 --- -234
7 ---            -235 --- -265
8 ---            -266 --- -307
9 ---           -308 ----     -341
*/



  area.addEventListener('pointerup', pararArrasto);
  area.addEventListener('pointercancel', pararArrasto);

  function obterAngulo(event) {
    const rect = area.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;
    return Math.atan2(event.clientY - centroY, event.clientX - centroX) * (180 / Math.PI);
  }
}

// Volta para a página anterior
function backGame() {
  window.history.back();
}