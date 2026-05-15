if (true) {
  var nome = "Vinicius"; // string
  nome = 10; // boolean
  var altura = 1.7;
}

// console.log("nome: ", nome, " ", typeof nome)
altura = parseInt(altura);
// console.log("altura ", altura, typeof altura)

if (true) {
  let idade = 24;
  idade = 25;
}

const NOME = "SAP";

let usuario = {
  nome: "Vinicius",
  idade: 24,
  altura: 1.7
};

// console.log(usuario.nome)

const CONST_IDADE = "idade";
// console.log(usuario[CONST_IDADE])

console.log("operadores aritmeticos");

var nome = "Vinicius";

// console.log(nome == usuario.nome)

var idade = 24; // numero .
var tamanho = "24"; // string

// console.log("menor que")
// console.log(idade >= 18)

console.log(4 + 5);
console.log(4 - 5);

var nome = "vinicius ";
var sobrenome = "dias";
// console.log(idade + parseInt(tamanho))

// console.log("divisao")
var numero = 28;
// 3 / 2 = 1 ; resto 1
// console.log(numero % 2)

var usuarios = [
  {
    nome: "Vinicius",
    idade: 24
  },
  {
    nome: "Pedro",
    idade: 21
  },
  {
    nome: "Maria",
    idade: 27
  }
];

//console.log(usuarios.length)

// média simples
const nota1 = 6.5;
const nota2 = 8;
const nota3 = 6;
const notas = [nota1, nota2, nota3];

const media = (nota1 + nota2 + nota3) / notas.length;
console.log(media.toFixed(3));

// média ponderada
const peso1 = 2;
const peso2 = 1;
const peso3 = 5;

const soma = nota1 * peso1 + nota2 * peso2 + nota3 * peso3;
const mediaPonderada = soma / (peso1 + peso2 + peso3);
console.log(Math.ceil(mediaPonderada));
