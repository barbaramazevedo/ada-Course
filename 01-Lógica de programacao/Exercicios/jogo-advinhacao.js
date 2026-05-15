const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const MIN = 1;
const MAX = 10;

const secreto = Math.floor(Math.random() * MAX) + MIN;

let tentativas = 0;

function perguntar() {
  rl.question(`Adivinhe (${MIN}-${MAX}): `, (resposta) => {
    const palpite = Number(resposta);
    tentativas++;

    if (palpite === secreto) {
      console.log(`✓ Acertou em ${tentativas} tentativa(s)!`);
      rl.close();
    } else if (palpite < secreto) {
      console.log("→ Muito baixo! Tente de novo.");
      perguntar();
    } else {
      console.log("→ Muito alto! Tente de novo.");
      perguntar();
    }
  });
}

perguntar();