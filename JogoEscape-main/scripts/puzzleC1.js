const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Altura individual das três ondas
    const alturas = [0, 0, 0];

    // Posição horizontal de cada onda
    const centros = [150, 400, 650];

    const largura = 65;
    const linhaBase = 150;

    function desenhar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x++) {
        let y = linhaBase;

        for (let i = 0; i < 3; i++) {
          let distancia = (x - centros[i]) / largura;

          y -= alturas[i] * Math.exp(-distancia * distancia);
          // y += alturas[i] * Math.exp(-distancia * distancia);
          // DIMINUIR O VALE!!!!!!!!!!!!!!!!!!!
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

    function aumentar(indice) {
      alturas[indice] = Math.min(180, alturas[indice] + 20);
      desenhar();
    }

    desenhar();