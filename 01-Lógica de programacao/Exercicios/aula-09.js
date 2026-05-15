// -----------------------------------
// Grupo 2: Encadeamento de Promises
// -----------------------------------
// 1. Escreva buscarPedido(id) que retorna Promise com o pedido após 300ms 
// 2. Escreva validarPedido(p) que rejeita se p.valor < 50 (valor mínimo) 
// 3. Encadeie: buscarPedido(1).then(validarPedido).then(exibir).catch(tratar) 
// 4. Reescreva com async/await e try/catch 
// 5. Use Promise.all para buscar todos os pedidos em paralelo 
// 6. Filtre apenas os válidos usando Promise.allSettled (status === 'fulfilled') 
// 7. **Desafio:** implemente retry — tente até 3 vezes após falha
 
const orders = [
    { 
        id: 1,
        value: 150 
    }, 
    { 
        id: 2, 
        value: 30 
    }
] 
 
// Parte 1: buscarPedido(id) → retorna uma Promise com o pedido após 300ms
// console.log("------------- part 1 ---------------")
function searchOrder(id) {
  return new Promise((resolve, reject) => { 
    setTimeout(() => { 
      const order = orders.find( o => o.id === id)

      if (order) resolve(order) 
      else reject(new Error("Order not found"))
    }, 300)
  })
}

// async function runPart1(id) {
//   try {
//     const order = await searchOrder(id)
//     console.log("Order found:", order)
//   } catch (e) {
//     console.log("Error:", e.message)
//   }
// }
// runPart1(1)
 
// // Parte 2: validarPedido(p) → rejeita se valor < 50
// console.log("------------- part 2 ---------------")
function validateOrder(order) {
  return new Promise((resolve, reject) => {
    if (order.value < 50) {
      reject(new Error("Invalid order: value under 50"))
    } else {
      resolve(order)
    }
  })
}

async function runPart2(id) {
  try {
    const order = await searchOrder(id)
    const validOrder = await validateOrder(order)
    console.log("Valid order:", validOrder)
  } catch (e) {
    console.log("Error:", e.message)
  }
}

// runPart2(1)
// runPart2(2)
 
// Parte 3: funções auxiliares para exibir e tratar erros
console.log("------------- part 3 ---------------")
function showOrder(order) {
  console.log("Order success:", order)
}

function handleError(error) {
  console.log("Error:", error.message)
}

await searchOrder(1)
  .then(validateOrder) 
  .then(showOrder) 
  .catch(handleError) 


// Part 4. Reescreva com async/await e try/catch 
console.log("------------- part 4 ---------------")
async function runPart4(id){
  try {
    const order = await searchOrder(id)
    const validOrder = await validateOrder(order)
    showOrder(validOrder)
  } catch(e) {
    handleError(e)
  }
}

runPart4(1)
runPart4(2)

// Part 5. Use Promise.all para buscar todos os pedidos em paralelo 
// console.log("------------- part 5 ---------------")
// async function runPart5(ids) {
//   try {
//     const promises = ids.map(id => searchOrder(id)) // cria várias promises

//     const orders = await Promise.all(promises) // roda tudo em paralelo

//     console.log("Orders found: ", orders)
//   } catch(e) {
//     console.log("Error: ", e.message)
//   }
// }

// runPart5([1, 2])

// // Part 6. Filtre apenas os válidos usando Promise.allSettled (status === 'fulfilled')
// console.log("------------- part 6 ---------------") 
// async function runPart6(ids) {
//   const results = await Promise.allSettled(
//     ids.map(async (id) => {
//       const order = await searchOrder(id)
//       const validOrder = await validateOrder(order)
//       return validOrder
//     })
//   )

//   // filtra apenas os que deram certo
//   const validOrders = results
//     .filter(result => result.status === "fulfilled")
//     .map(result => result.value)

//   console.log("Valid orders:", validOrders)
// }

// runPart6([1, 2, 99])

// // **Desafio:** implemente retry — tente até 3 vezes após falha
// console.log("------------- Part 7 - Challenge ---------------")
// async function retry(fn, attempts) {
//   for (let i = 0; i < attempts; i++) {
//     try {
//       return await fn()
//     } catch (err) {
//       if (i === attempts - 1) {
//         throw err
//       }
//       console.log(`Retrying... (${i + 1})`)
//     }
//   }
// }

// async function runWithRetry(id) {
//   try {
//     const order = await retry(() => searchOrder(id), 3)
//     const validOrder = await retry(() => validateOrder(order), 3)

//     console.log("Valid order:", validOrder)
//   } catch (e) {
//     console.log("Error:", e.message)
//   }
// }

// runWithRetry(1)
// runWithRetry(2)
// runWithRetry(99)