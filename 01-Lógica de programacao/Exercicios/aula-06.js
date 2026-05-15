console.log("############### Group 01 ###############");


// Grupo 2: “Inventário”
// Percorra um array de objetos e um dicionário de preços.
// Exemplo:
// const itens = [
//   { nome: 'Espada', qtd: 3 },
//   { nome: 'Poção', qtd: 10 },
//   { nome: 'Escudo', qtd: 1 },
// ];
// const precos = { Espada: 50, Pocão: 15, Escudo: 80 };
// 1. Use ‘for-of’ para imprimir cada item: "Espada x3 = R$ 150".
// 2. Use ‘for-in’ em `precos` para listar todos os produtos e seus preços.
// 3. Calcule o valor total do inventário (for-of + precos[item.nome]).
// 4. Use ‘for’ clássico para imprimir os itens em ordem inversa.
// 5. Encontre o item mais caro usando ‘for-in’ em `precos`.
// 6. Use ‘continue’ para pular itens com `qtd === 0`.
// 7. **Desafio:** crie um novo array só com itens com qtd > 1 usando ‘for-of’ + push
console.log("############### Group 02 ###############");
const items = [
    { name: 'Sword', qty: 3 },
    { name: 'Potion', qty: 10 },
    { name: 'Shield', qty: 1 },
];

const price = { Sword: 50, Potion: 15, Shield: 80 }

//parte 1 Use ‘for-of’ para imprimir cada item: "Espada x3 = R$ 150".
console.log("------- Exercise 01 ---------")
for (const item of items) {
    const total = item.qty * price[item.name]
    console.log(`${item.name} x${item.qty} = R$${total}`)
}

//parte 2 Use ‘for-in’ em `precos` para listar todos os produtos e seus preços.
console.log("------- Exercise 02 ---------")
for (const product in price) {
    console.log(`${product} costs R$${price[product]}`)
}

//parte 3 Calcule o valor total do inventário (for-of + precos[item.nome]).
console.log("------- Exercise 03 ---------")
let totalPrice = 0
for (const item of items) {
    totalPrice += item.qty * price[item.name]
}
console.log(`Total price = R$${totalPrice}`)

//parte 4 Use ‘for’ clássico para imprimir os itens em ordem inversa.
console.log("------- Exercise 04 ---------")
for (let i = items.length - 1; i >= 0; i--) {
    console.log(items[i].name)
}

//parte 5 Encontre o item mais caro usando ‘for-in’ em `precos`.
console.log("------- Exercise 05 ---------")
let higherPrice = 0
let mostExpensiveProduct = ""

for (const product in price){
    if (price[product] > higherPrice){ 
        higherPrice = price[product]
        mostExpensiveProduct = product
    }
}
console.log(`The most expensive product is ${mostExpensiveProduct} = R$${higherPrice}`)

//parte 6 Use ‘continue’ para pular itens com `qtd === 0`.
console.log("------- Exercise 06 ---------")
for (const item of items){
    if (item.qty === 0) continue
    console.log(`Item with at least 1 quantity ${item.name}`)
}

//Challenge crie um novo array só com itens com qtd > 1 usando ‘for-of’ + push
const newArray = []
console.log("------- Challenge ---------")
for (const item of items) {
    if (item.qty > 1) {
        newArray.push(item)
    }
}
console.log(newArray)


console.log("############### Group 03 ###############");