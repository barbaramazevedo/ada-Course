// Grupo 1: “Calculadora segura”
// Adicione tratamento de erros a uma calculadora de operações básicas.
// ex: function calcular(a, op, b) { /* sua implementação */ }
// 1. Escreva `calcular(a, op, b)` que suporta `+`, `-`, `*`, `/`.
// 2. Lance `TypeError` se `a` ou `b` não forem números.
// 3. Lance `Error` se `op` não for um dos 4 operadores válidos.
// 4. Lance `RangeError` se tentar dividir por zero.
// 5. Use try/catch para chamar `calcular` e exibir o resultado ou o erro.
// 6. Use `instanceof` no catch para diferenciar os tipos de erro e dar mensagens
// distintas.
// 7. **Desafio:** adicione `finally` que exibe sempre: `"Operação concluída."` — erro ou não.

console.log("############### GROUP 1 ###############")
console.log("------------- part 1 ---------------")
function calcular(a, op, b) {

    if (typeof a !== "number" || typeof b !== "number" || Number.isNaN(a) || Number.isNaN(b)) {
        throw new TypeError("First and second values must be numbers")
    }

    if (op !== "+" && op !== "-" && op !== "*" && op !== "/") {
        throw new Error("Invalid operator")
    }

    if (op === "/" && b === 0) {
        throw new RangeError("Division by zero is not allowed")
    }

    if ( op === "+") {
        return a + b
    } else if ( op === "-") {
        return a - b
    } else if ( op === "/") {
        return a / b
    } else if ( op === "*"){
        return a * b
    }
}

const prompt = require("prompt-sync")()

try {

    const a = Number(prompt("Enter the first number: "))
    const op = prompt("Enter the operator (+, -, *, /): ")
    const b = Number(prompt("Enter the second number: "))

    const result = calcular(a, op, b)

    console.log("Result:", result)
} catch (e) {
    if (e instanceof TypeError) {
        console.log("Type error:", e.message)

    } else if (e instanceof RangeError) {
        console.log("Range error:", e.message)

    } else if (e instanceof Error) {
        console.log("General error:", e.message)

    } else {
        console.log("Unknown error:", e)
    }
} finally {
    console.log("Operation completed.")
}
 

console.log("------------- part 2 ---------------")


console.log("############### GROUP 2 ###############")
// Grupo 2: “Parser de dados”
// Trate erros ao processar dados externos em JSON.
// ex:
// const entradas = ['{"nome":"Ana"}', '{RUIM}', '{"nome":123}'];
// 1. Para cada string: tente `JSON.parse` e exiba o resultado ou o tipo do erro.
// 2. Use `instanceof SyntaxError` para detectar JSON malformado.
// 3. Lance `TypeError` se `nome` não for uma string.
// 4. Use `finally` para exibir sempre: `"Processado: [valor ou ERRO]"`.
// 5. Escreva `parseSafe(str)` que retorna `null` em vez de lançar erro.
// 6. Acumule os erros em um array e exiba todos ao final.
// 7. **Desafio:** diferencie erros de parse de erros de validação e exiba contagens
// separadas.

const input = [
    '{"name":"Ana"}',
    '{RUIM}',
    '{"name":123}'
];

// 1. Para cada string: tente `JSON.parse` e exiba o resultado ou o tipo do erro.
console.log("------------- part 1 ---------------")
input.forEach(string => {
    try {
        const result = JSON.parse(string)
        console.log(result)
    } catch (error) {
        console.log("Error: " + error.message)
    }
})

// 2. Use `instanceof SyntaxError` para detectar JSON malformado.
console.log("------------- part 2 ---------------")
input.forEach (string => {
    try {
        const result = JSON.parse(string)
        console.log(result)
    } catch (error) {
        if(error instanceof SyntaxError) {
            console.log("JSON malformado", string)
        } else {
            console.log("Other error " + error.message)
        } 
    }
})

// 3. Lance `TypeError` se `nome` não for uma string.
console.log("------------- part 3 ---------------")
input.forEach(string => {
    try {
        const result = JSON.parse(string)
        
        if(typeof result.name !== "string") {
            throw new TypeError("The name field must be a string.")
        } 

        console.log("Valid name: ", result.name)
    } catch (error) {
        console.log("Error: " + error.message)
    }
})

// 4. Use `finally` para exibir sempre: `"Processado: [valor ou ERRO]"`.
console.log("------------- part 4 ---------------")
input.forEach(string => {

    let result 

    try {
        result = JSON.parse(string)
        
        if(typeof result.name !== "string") {
            throw new TypeError("The name field must be a string.")
        } 

        console.log("Valid name: ", result.message)

    } catch (error) {
        console.log("Error: " + error.message)
    } finally {
        console.log("Loaded: " + result ?? "ERROR")
    }
})

// 5. Escreva `parseSafe(str)` que retorna `null` em vez de lançar erro.
// A função parseSafe nunca lanca erro, ela retorna null
console.log("------------- part 5 ---------------")
function parseSafe(string) {
    try {
        return JSON.parse(string)
    } catch {
        return null
    }
}

input.forEach(string => {
    console.log(parseSafe(string))
})

// 6. Acumule os erros em um array e exiba todos ao final.
console.log("------------- part 6 ---------------")
const errors = []

input.forEach (string => {
    try {
        const result = JSON.parse(string)

        if(typeof result.name !== "string") {
            throw new TypeError("Invalid name!")
        }
    } catch (error) {
        errors.push(error.message);
    }
})

console.log("Erros find: " + errors)

// 7. **Desafio:** diferencie erros de parse de erros de validação e exiba contagens
console.log("------- part 7 - Challenge ---------")
let parseErrors = 0;
let validationErrors = 0;

input.forEach(string => {
  try {
    const result = JSON.parse(string);

    if (typeof result.name !== "string") {
      throw new TypeError("Invalid name");
    }

  } catch (error) {

    if (error instanceof SyntaxError) {
      parseErrors++;
    }

    if (error instanceof TypeError) {
      validationErrors++;
    }

  }
});

console.log("Parsing errors: ", parseErrors);
console.log("Validation Errors: ", validationErrors);