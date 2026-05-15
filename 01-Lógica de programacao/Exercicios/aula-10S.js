// Grupo 2: "Painel Meteorológico"
// Open-Meteo — base: api.open-meteo.com/v1/forecast (sem cadastro)
// ex: ?latitude=-29.68&longitude=-53.80&current=temperature_2m,windspeed_10m
// 1. Busque temperatura e vento atual de Santa Maria RS (lat -29.68, lon -53.80).
// 2. Exiba: temperatura (°C), velocidade do vento (km/h) e hora da medição.
// 3. Adicione `daily=temperature_2m_max,temperature_2m_min` para obter máx/mín dos próximos 7 dias.
// 4. Busque Porto Alegre, Caxias do Sul e São Leopoldo em paralelo com `Promise.all`.
// 5. Descubra qual das 3 cidades está mais quente agora.
// 6. Trate erro de rede com try/catch e exiba mensagem amigável.
// 7. **Desafio:** crie uma função genérica `buscarClima(lat, lon, campos)` parametrizável.
 
const baseURL = "https://api.open-meteo.com/v1/forecast" // URL base da API
 
// ========================================
// PART 1, 2, 3 - Santa Maria
// ========================================
 
async function part1_2_3() {
  console.log("------------- PART 1, 2 and 3 (Santa Maria) -------------")
  try {
    const url =
      `${baseURL}?latitude=-29.68&longitude=-53.80` + // latitude e longitude de Santa Maria
      `&current=temperature_2m,windspeed_10m` + // dados atuais (temperatura e vento)
      `&daily=temperature_2m_max,temperature_2m_min` // máximas e mínimas dos próximos dias
    const response = await fetch(url) // faz a requisição para a API
 
    if (!response.ok) throw new Error("API error in Part 1") // verifica se a resposta foi bem-sucedida
 
    const data = await response.json() // converte a resposta para JSON
 
    const temperature = data.current.temperature_2m // pega a temperatura atual
    const windSpeed = data.current.windspeed_10m // pega a velocidade do vento
    const time = data.current.time // pega o horário da medição
 
    console.log("Temperature:", temperature, "°C") // exibe temperatura
    console.log("Wind Speed:", windSpeed, "km/h") // exibe vento
    console.log("Time:", time) // exibe horário
 
    console.log("Max (next days):", data.daily.temperature_2m_max.join(", ")) // exibe máximas formatadas
    console.log("Min (next days):", data.daily.temperature_2m_min.join(", ")) // exibe mínimas formatadas
 
  } catch (error) {
    console.log("Error in Part 1:", error.message) // tratamento de erro
  }
}
 
// ========================================
// PART 4 e 5 - Promise.all + hottest city
// ========================================
 
async function part4_5() {
  console.log("------------- PART 4 and 5 (Compare Cities) -------------")
  try {
    const param = "&current=temperature_2m" // parâmetro para pedir temperatura atual
    const responses = await Promise.all([ // executa várias requisições ao mesmo tempo
      fetch(`${baseURL}?latitude=-30.03&longitude=-51.23${param}`), // Porto Alegre
      fetch(`${baseURL}?latitude=-29.17&longitude=-51.18${param}`), // Caxias do Sul
      fetch(`${baseURL}?latitude=-29.75&longitude=-51.15${param}`)  // São Leopoldo
    ])
 
    responses.forEach(r => { // percorre cada resposta
      if (!r.ok) throw new Error("API error in Part 2") // valida se alguma falhou
    })
 
    const data = await Promise.all(responses.map(r => r.json())) // converte todas para JSON
 
    const cities = [ // array com nome + temperatura
      { name: "Porto Alegre", temp: data[0].current.temperature_2m },
      { name: "Caxias do Sul", temp: data[1].current.temperature_2m },
      { name: "São Leopoldo", temp: data[2].current.temperature_2m }
    ]
 
    let hottest = cities[0] // assume a primeira como mais quente
    for (let city of cities) { // percorre todas as cidades
      if (city.temp > hottest.temp) { // compara temperaturas
        hottest = city // atualiza se encontrar maior
      }
    }
 
    console.log("Temperatures:")
    cities.forEach(city => {
      console.log(city.name + ":", city.temp + "°C") // exibe cada cidade
    })
 
    console.log("Hottest city:", hottest.name, "-", hottest.temp + "°C") // exibe a mais quente
 
  } catch (error) {
    console.log("Error in Part 2:", error.message) // tratamento de erro
  }
}
 
// ========================================
// PART 6 - Error handling example
// ========================================
 
async function part6() {
  console.log("------------- PART 6 (Error Handling) -------------")
  try {
    const response = await fetch("https://api.open-meteo.com/invalid") // URL inválida proposital
 
    if (!response.ok) throw new Error("Invalid endpoint") // força erro se resposta não for ok
 
    const data = await response.json() // tentativa de conversão
    console.log(data)
 
  } catch (error) {
    console.log("Friendly message: Something went wrong. Try again later!") // mensagem amigável
  }
}
 
// ========================================
// PART 7 - Generic function
// ========================================
 
async function getWeather(lat, lon, params) {
  try {
    const url = `${baseURL}?latitude=${lat}&longitude=${lon}${params}` // monta URL dinamicamente
    const response = await fetch(url) // faz a requisição
    if (!response.ok) throw new Error("Request failed") // valida resposta
    const data = await response.json() // converte para JSON
    return data // retorna dados
  } catch (error) {
    console.log("Error in generic function:", error.message) // tratamento de erro
    return null // retorna null em caso de erro
  }
}
 
async function part7() {
  console.log("------------- PART 7 (Generic Function) -------------")
  const data = await getWeather(
    -29.68, // latitude
    -53.80, // longitude
    "&current=temperature_2m" // parâmetros
  )
  if (data) { // verifica se retornou corretamente
    console.log("Santa Maria temperature using generic function:")
    console.log(data.current.temperature_2m + "°C") // exibe temperatura
  }
}
 
// ========================================
// RUN ALL PARTS (executa tudo em sequência)
// ========================================
 
async function runAll() {
  await part1_2_3() 
  await part4_5() 
  await part6() 
  await part7() 
}

runAll()