// Grupo 1: “Acesso do usuário”
// Receba um objeto `user` (pode vir incompleto) com `user?.nome`, `user?.plano` e
// `user?.ativo`.
// ex: const usuario = { nome: "Ana", plano: "pro", ativo: true };
// 1. Use `?.` para ler os campos sem erro.
// 2. Use `??` para definir `nome = nome ?? "visitante"`.
// 3. Use `if/else if/else` para validar: se não existe usuário → “negado”; se não está
// ativo → “negado”; senão → “liberado”.
// 4. Use `switch` no `plano` ("free", "pro", "enterprise") para gerar uma mensagem.
// 5. Use ternário para `status = ... ? "OK" : "BLOQUEADO"`.
// 6. Mostre um exemplo de Truthy/Falsy: `if (nome)` e explique rapidamente a pegadinha
// com `""`.
// 7. Use `&&` e `||` em pelo menos uma regra (ex.: ativo && plano).
console.log("----- Group 01 ------");



// Grupo 2: “Checkout rápido”
// Receba um objeto `pedido` com `pedido.itens`, `pedido.total`, `pedido.cliente?.vip`,
// `pedido.cupom`.
// ex:
// const pedido = {
// itens: [{ nome: "Teclado", preco: 100 }],
// total: 100,
// vip: false,
// cep: "12345678",
// };
// 1. Use `?.` para ler `vip` e `cep`.
// 2. Use `if/else if/else`: carrinho vazio, total inválido, ou ok.
// 3. Use ternário para frete: vip ? 0 : 15.
// 4. Use `??` para `cupomFinal = cupom ?? "SEM_CUPOM"`.
// 5. Use `switch` no cupom ("FRETE", "DESC10", default).
// 6. Use `&&` e `||` numa validação (ex.: itens && itens.length).
// 7. Mostre onde Truthy/Falsy pode enganar (ex.: total 0, cupom "").
console.log("----- Group 02 ------");
const pedido = {
    itens: [{ nome: "Teclado", preco: 100 }],
    total: 100,
    vip: false,
    cep: "12345678",
    cupom: "DESC10" 
};

// optional chaining para pegar vip e cep
// evita erro caso o objeto pedido não exista
// exemplo: se pedido fosse undefined, pedido.vip quebraria o código
// com ?. o JS retorna undefined sem lançar erro
const vip = pedido?.vip
const cep = pedido?.cep

// verifica se o carrinho tem itens
// primeiro verifica se itens existe e depois se o tamanho é maior que 0
// usamos && porque se pedido.itens for undefined
// o JS nem tenta acessar .length (short-circuit)
const carrinhoItens = pedido.itens && pedido.itens.length > 0

if (!carrinhoItens) {
    console.log("Carrinho vazio")
} 

// verifica se o total é inválido (0, negativo, null ou undefined)
// usamos || (OU lógico) porque qualquer condição inválida já reprova
// == null aqui pega dois casos ao mesmo tempo:
// null e undefined
// se passou nas validações então o pedido está ok
else if (pedido.total <= 0 || pedido.total == null){
    console.log("Total invalido")
} else {
    console.log("Pedido OK");
}


// operador ternário para definir o frete
// sintaxe: condição ? valorSeTrue : valorSeFalse
// se o cliente for vip o frete é 0, se não for é 15
let frete = vip ? 0 : 15

// se o cupom for null ou undefined ele assume "Sem cupom"
// operador ?? chama-se Nullish Coalescing
// ele só usa o valor da direita se o da esquerda for:
// null ou undefined
const cupomFinal = pedido.cupom ?? "Sem cupom"

// uso switch para verificar qual cupom foi usado
// switch compara o valor de cupomFinal com cada case
switch (cupomFinal){
    case "frete":
        frete = 0
        console.log("Cupom de frete gratis")
        break
case "DESC10":
    pedido.total *= 0.9
    console.log("Cupom de 10% aplicado")
    break
default:
    console.log("Cupom não reconhecido")
}

// exemplo de uso de && e || para validação adicional
// && exige que todas as condições sejam verdadeiras
// || permite que uma alternativa seja verdadeira
// (itens válidos E total válido) OU cliente VIP
const podeFinalizar = pedido.itens && pedido.itens.length > 0 && pedido.total > 0 || vip

const cupomTeste = ""
if (cupomTeste) {
    console.log("Cupom existe")
}

// esse console nunca aparece
// porque "" (string vazia) é falsy
// console logs para testar o resultado final

console.log("VIP:", vip)
console.log("CEP:", cep)
console.log("Total final:", pedido.total)
console.log("Frete:", frete)
console.log("Cupom usado:", cupomFinal)
console.log("Pode finalizar pedido:", podeFinalizar)

// exemplo de uso de && e || para validação adicional
// && exige que todas as condições sejam verdadeiras
// || permite que uma alternativa seja verdadeira

constpodeFinalizar = pedido.itens &&pedido.itens.length >0&&pedido.total >0||vip

constcupomTeste=""

if (cupomTeste) {
    console.log("Cupom existe")
}


// Grupo 3: “Aluno passou ou não”
// Receba um objeto `aluno` com `aluno.nome`, `aluno.notas` (3 notas), `aluno.presenca`,
// `aluno.contato?.email`.
// ex:
// const pedido = {
// itens: [{ nome: "Teclado", preco: 100 }],
// total: 100,
// vip: false,
// cep: "12345678",
// };
// 1. Use `?.` para pegar email.
// 2. Use `??` para `nome = nome ?? "sem nome"`.
// 3. Use `if/else if/else` para validar se notas existem e se presença foi informada.
// 4. Use ternário para `passou = (media >= 6 && presenca >= 75) ? "passou" : "não passou"`.
// 5. Use `switch(true)` para classificar a média (>=9, >=7, >=6, default).
// 6. Use `&&` e `||` pelo menos uma vez.
// 7. Mostre um caso Truthy/Falsy com email (ex.: `if (email)`), comentando string vazia vs null.
console.log("----- Group 03 ------");