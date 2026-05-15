// Crie um objeto Produto com nome, preço e estoque. Adicione um método
// aplicarDesconto(p) que reduz o preço e funções para adicionar produto, buscar por nome e
// listar todos os produtos.
console.log("----- Group 01 ------");
const products = [];

function addProduct(name, price, stock) {
    const product = {
        name,
        price,
        stock,
        applyDiscount(percentage) {
          this.price = this.price - this.price * percentage ;
        }
    };

    products.push(product);
}

function searchForName(name) {
    return products.find( product => product.name === name)
}

function listProducts() {
    products.forEach(product => {
        console.log(`${product.name} - R$${product.price} - estoque: ${product.stock}`);
    });   
}

addProduct("Abacate", 10, 20);
addProduct("Banana", 5, 30);

listProducts();

const prod = searchForName("Abacate");
prod.applyDiscount(0.2);
console.log("Apply 20% of discount: ")
listProducts();


// grupo 2: Crie um dicionário de capitais usando Map: país → capital. Implemente busca
// (função que ache a capital pelo nome do país), função que lista as capitais em ordem
// alfabética e listagem (retorne todos os dados).
console.log("----- Group 02 ------");
const capital = new Map([
    ["Brasil", "Brasília"],
    ["Argentina", "Buenos Aires"],
    ["Peru", "Lima"],
    ["Uruguai", "Montevideu"],
    ["Colombia", "Bogota"]
  ])
   
  function searchCapital(country) {
    if (capital.has(country)){
        return capital.get(country) //
    }
    return ("Capital not found!")
  }
   
  function alphabeticalCapital(){
    return [...capital.values()].sort() //cria um array das capitais e arruma em ordem alfabética
  }
   
  function allCapital(){
    return [...capital.entries()] //cria um array das capitais e e pega todos os dados
  }
   
  console.log(searchCapital("Nrasil"))
  console.log(alphabeticalCapital())
  console.log(allCapital())



// ∙ Grupo 3: Crie um objeto usuário com nome, idade, cidade e habilidades (array). Imprima
// “Olá, NOME! Você mora em CIDADE.” Depois adicione uma habilidade nova, atualize a cidade
// e mostre no console se é “Menor de idade” ou “Maior de idade”. Crie também a função
// resumoUsuario(usuario) que retorna uma string com um resumo do perfil.
console.log("----- Group 03 ------");
const user = {
    name: "Barbara",
    age: 31,
    city: "Porto Alegre",
    habilities : [
        "comunicative",
        "programming"
    ],
    major: ""
    
};

console.log(`Hello ${user.name}, you live in ${user.city}.`)
user.habilities = "easy learning"
user.city = "Barcelona"

if(user.age > 18){
    user.major = "of legal age"
} else {
    user.major = "under age"
}

function userResume(newUser){
    console.log("----- Updated data: -----")
    console.log(`Hello, ${newUser.name}!`)
    console.log(`You live in ${newUser.city} and you are ${newUser.major}, you're ${newUser.age}.`)
    console.log(`You have this habilities: ${newUser.habilities}`)
} 

userResume(user);

