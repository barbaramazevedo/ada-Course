console.log('Exercise')
const agenda = [];
let nome;
do {
  nome = prompt('Nome do contato:');
  if (!nome || nome.trim() === '') {
  console.log('⚠ Nome não pode ser vazio!');
}
} while (!nome || nome.trim() === '');
let tel;
do {
  tel = prompt('Telefone (mín. 8 dígitos):');
} while (!tel || tel.trim().length < 8);
  agenda.push({
  nome: nome.trim(),
  tel: tel.trim(),
});
console.log('Contato adicionado:', agenda[0]);


// Grupo 1: “Tabuada interativa”
// Dado `base` e `limite`, imprima a tabuada usando while.
// ex: const base = 7; const limite = 10;
// 1. Use `while` para imprimir `base × i = resultado` de i=1 até `limite`.
// 2. Antes do laço, valide se `base` e `limite` são números positivos (use `if`).
// 3. Adicione um contador de linhas impressas e mostre o total ao final.
// 4. Use `break` se o resultado ultrapassar 100 — pare e avise o usuário.
// 5. Reescreva usando `do-while`: qual é a diferença prática neste caso?
// 6. Quando o `while` nunca executaria aqui? Escreva um exemplo que demonstre isso.
// 7. **Desafio:** peça `base` e `limite` via `prompt` com `do-while`, validando que são inteiros entre 1 e 20.
console.log("########### Group 01 ###########");
const base = 7; 
const limite = 10;
let i = 1
let count = 0;

function multiplication(valor) {
    return base * valor
}

console.log("------- Exercise 01, 02 and 03 ---------")
if(base > 0 && limite > 0) {
    while (i <= limite) {
        console.log(`${base} x ${i} =  ${multiplication(i)}`)
        i++;
        count++;
    }
}
console.log("Total rows: " + count);

console.log("------- Exercise 04 ---------")
if (base > 0 && limite > 0) {
    while (i <= limite) {
        let resultado = multiplication(i);

        if (resultado > 100) {
            console.log("Resultado ultrapassou 100. Parando a tabuada.");
            break;
        }

        console.log(`${base} x ${i} = ${resultado}`);

        i++;
        count++;
    }
}

console.log("Total rows: " + count);

console.log("------- Exercise 05 ---------")
const base2 = 7; 
const limite2 = 10;
let i2 = 1
let count2 = 0;
if (base2 > 0 && limite2 > 0) {
    do {
        let resultado2 = multiplication(i2);

        if (resultado2 > 100) {
            console.log("Resultado ultrapassou 100. Parando a tabuada.");
            break;
        }

        console.log(`${base2} x ${i2} = ${resultado2}`);

        i2++;
        count2++;
    } while (i2 <= limite2);
}

console.log("------- Exercise 06 ---------")
const base3 = 7;
const limite3 = 0;

let i3 = 1;

while (i3 <= limite) {
    console.log(`${base3} x ${i3} = ${base3 * i3}`);
    i3++;
}

console.log("O while nunca executou.");

console.log("------- Challenge 07 ---------")
let baseChallenge; 
let limiteChallenge;

let iChallenge = 1
let countChallenge = 0;
do {
    baseChallenge = Number(prompt("Digite a base da tabuada ( 1 - 20 ): "))
} while (!Number.isInteger(baseChallenge) || baseChallenge < 1 || baseChallenge > 20)  
    
do {
    limiteChallenge = Number(prompt("Digite o limite da base da tabuada ( 1 - 20 ): "))
} while (!Number.isInteger(limiteChallenge) || limiteChallenge < 1 || limiteChallenge > 20)    
    
while (iChallenge <= limiteChallenge) {

    let resultadoChallenge = baseChallenge * iChallenge;

    console.log(`${baseChallenge} x ${iChallenge} = ${resultadoChallenge}`);

    iChallenge++;
    countChallenge++;
}

// Grupo 2: “Validação de senha”
// Implemente um sistema de verificação de senha com limite de tentativas.
// ex:
// const SENHA_CORRETA = "js2025";
// let tentativas = 0;
// const MAX_T = 3;
// let acesso = false;
// // use while aqui...
// // ...
// 1. Use `while` com condição dupla: `tentativas < MAX_T && !acesso`.
// 2. A cada tentativa errada, avise quantas restam: `MAX_T - tentativas`.
// 3. Use `break` para sair imediatamente quando a senha estiver correta.
// 4. Ao final: se `acesso` for true → “Liberado!”; senão → “Conta bloqueada.”
// 5. Reescreva com `do-while`. A lógica muda? Em quê?
// 6. Use `&&` na condição do while — por que ambas as partes são necessárias?
// 7. **Desafio:** registre `Date.now()` antes do laço e calcule o tempo total em segundos.
console.log("----- Group 02 ------");
const correctPassword = "StartCoding"
let tries = 0
const maxTries = 3
let access = false
let answer
 
// Marca o início da operação
const startTime = Date.now()
 
while (tries < maxTries && !access) {
  answer = prompt("You have " + (maxTries - tries) + " tries. Enter password.")
  tries += 1
 
  if (answer == correctPassword) {
    console.log("Password is correct.")
    access = true
    break
  } else if (tries == maxTries) {
    console.log("You have exceeded the maximum number of tries.")
  } else {
    console.log("Incorrect password.")
  }
}
 
// Marca o fim da operação
const endTime = Date.now()
const totalTime = (endTime - startTime) / 1000 // converte para segundos
 
if (access) {
  console.log("The access is permitted.")
} else {
  console.log("The account has been blocked.")
}
 
console.log("Operation time: " + totalTime + " seconds.")



//Grupo 3: “Jogo de adivinhação avançado”
// Expanda o jogo do Estudo de Caso 1 com limite de tentativas e validação de entrada.
// ex:
// const MIN = 1, MAX = 100;
// const secreto = Math.floor(Math.random() * MAX) + MIN;
// let tentativas = 0;
// const MAX_T = 7;
// let acertou = false;
// // use while + do-while interno aqui...
// 1. Sorteie o número com `Math.floor(Math.random() * MAX) + MIN`.
// 2. Use `do-while` interno para validar: palpite deve ser um número entre MIN e MAX.
// 3. Limite a 7 tentativas: `while (tentativas < MAX_T && !acertou)`.
// 4. A cada rodada: imprima “Muito baixo!”, “Muito alto!” ou “Acertou!”.
// 5. Se acabar as tentativas sem acertar, revele o número secreto.
// 6. Mostre o número total de tentativas usadas ao final.
// 7. **Desafio:** classifique o resultado: 1–3 → “Gênio!”, 4–5 → “Ótimo!”, 6–7 → “Quase lá!”
console.log("----- Group 03 ------");
