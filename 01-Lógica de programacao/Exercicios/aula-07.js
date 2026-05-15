// Grupo 2: “Pipeline de texto”
// Construa um pipeline de transformações sobre strings.
// ex:
// const frase = ' Olá Mundo! como vai você? ';
// 1. Escreva `limpar(s)` que remove espaços extras (trim).
// 2. Escreva `capitalizar(s)` que coloca a primeira letra de cada palavra em maiúscula.
// 3. Escreva `removerExclamacao(s)` que remove todos os `!`.
// 4. Componha as 3 funções: `removerExclamacao(capitalizar(limpar(frase)))`.
// 5. Reescreva cada função como arrow function de 1 linha.
// 6. Escreva `contarPalavras(s)` que retorna o número de palavras.
// 7. **Desafio:** crie um array de funções e aplique com `reduce`.

const phrase = ' Hello world! How are you doing? ';

//parte 1
console.log("------------- part 1 ---------------")
function clean(text){
    return text.trim()
}
console.log(clean(phrase))

//parte 2
//slip() vai separar as palavras
//chartAt() atribui a primeira letra da palavra
//toUpperCase() coloca a primeira letra em maiuscula
//slice() tira a primeira letra da palavra pra somar com a letra maiuscula
//join() transforma tudo em uma string
console.log("------------- part 2 ---------------")
function capsLock(text){
    return text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}
console.log(capsLock(phrase))

//parte 3
console.log("------------- part 3 ---------------")
function removeExclamation(text) {
    return text.replaceAll("!", "")
}
console.log(removeExclamation(phrase))

//parte 4
console.log("------------- part 4 ---------------")
console.log(removeExclamation(capsLock(clean(phrase))))

//parte 5
console.log("------------- part 5 ---------------")
const cleanOneRow = text => text.trim()
const capsLockOneRow = text => text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
const removeExclamationOneRow = text => text.replaceAll("!", "")

console.log(removeExclamationOneRow(capsLockOneRow(cleanOneRow(phrase))))

//part 6
console.log("------------- part 6 ---------------")
function countingWords(text) {
    words = text.trim().split(" ").length;
    return console.log(`Total words: ${words}.`)
}

countingWords(phrase)
//part 7 - Challenge
console.log("------- part 7 - Challenge ---------")
const allFunctions = [
    clean,
    capsLock,
    removeExclamation
];

const result = allFunctions.reduce((accumulator, currentElement) => currentElement(accumulator), phrase);
console.log(result)