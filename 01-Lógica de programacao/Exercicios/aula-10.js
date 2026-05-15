// Grupo 2: “Painel Meteorológico”
// Open-Meteo — base: api.open-meteo.com/v1/forecast (sem cadastro)
// ex:
// // ?latitude=-29.68&longitude=-53.80&current=temperature_2m,windspeed_10m
// 1. Busque temperatura e vento atual de Santa Maria RS (lat -29.68, lon -53.80).
// 2. Exiba: temperatura (°C), velocidade do vento (km/h) e hora da medição.
// 3. Adicione `&daily=temperature_2m_max,temperature_2m_min` para obter máx/mín dos próximos
// 7 dias.
// 4. Busque Porto Alegre, Caxias do Sul e São Leopoldo em paralelo com `Promise.all`.
// 5. Descubra qual das 3 cidades está mais quente agora.
// 6. Trate erro de rede com try/catch e exiba mensagem amigável.
// 7. **Desafio:** crie uma função genérica `buscarClima(lat, lon, campos)` parametrizável.

async function main() {
    // Parte 1: Busque temperatura e vento atual de Santa Maria RS (lat -29.68, lon -53.80).
    console.log("------------- part 1 ---------------")
    async function getWeather() {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=-29.68&longitude=-53.80&current=temperature_2m,windspeed_10m";

        const response = await fetch(url)
        const data = await response.json() //lê o conteudo JSON e converte em um objeto JavaScript

        console.log("Current temperature: ", data.current.temperature_2m, "°C")
        console.log("Current wind: ", data.current.windspeed_10m, "km/h")
    }

    await getWeather()

    // Parte 2: Exiba: temperatura (°C), velocidade do vento (km/h) e hora da medição.
    console.log("------------- part 2 ---------------")
    async function getTimeWeather() {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=-29.68&longitude=-53.80&current=temperature_2m,windspeed_10m";

        const response = await fetch(url)
        const data = await response.json()

        console.log("Current weather time: ", data.current.time)
    }

    await getTimeWeather()

    //Part 3. Adicione `&daily=temperature_2m_max,temperature_2m_min` para obter máx/mín dos próximos
    console.log("------------- part 3 ---------------")
    async function getDailyWeather() {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=-29.68&longitude=-53.80&current=temperature_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto";

        const response = await fetch(url)
        const data = await response.json()

        const dates = data.daily.time
        const maxTemps = data.daily.temperature_2m_max
        const minTemps = data.daily.temperature_2m_min

        console.log(`Max and min temperatures in the next 7 days: `)
        for (let i = 0; i < dates.length; i++) {
            console.log(
                `${dates[i]} → Max: ${maxTemps[i]}°C | Min: ${minTemps[i]}°C`
            )
        }
    }

    await getDailyWeather()

    //Part 4. Busque Porto Alegre, Caxias do Sul e São Leopoldo em paralelo com `Promise.all`.
    console.log("------------- part 4 ---------------")
    const cities = [
        { name: "Porto Alegre", lat: -30.03, lon: -51.23 },
        { name: "Caxias do Sul", lat: -29.17, lon: -51.18 },
        { name: "São Leopoldo", lat: -29.76, lon: -51.15 }
    ];

    async function getCitiesWeather(cities) {
        const baseUrl = "https://api.open-meteo.com/v1/forecast?current=temperature_2m";

        const promises = cities.map(city => {
            const url = `${baseUrl}&latitude=${city.lat}&longitude=${city.lon}`;
            return fetch(url)
                .then(res => res.json())
                .then(data => ({
                    name: city.name,
                    temp: data.current.temperature_2m
                }));
        });

        const results = await Promise.all(promises);

        return results
    }

    const resultsCitiesWeather = await getCitiesWeather(cities);
    resultsCitiesWeather.forEach(city => {
        console.log(`${city.name}: ${city.temp} °C`);
    });

    //Part 5 Descubra qual das 3 cidades está mais quente agora.
    console.log("------------- part 5 ---------------")
    const hottestCity = resultsCitiesWeather.reduce((max, city) => {
        return city.temp > max.temp ? city : max
    })

    console.log(`Hottest city: ${hottestCity.name} ${hottestCity.temp} °C`)

    //Part 6 Trate erro de rede com try/catch e exiba mensagem amigável.
    console.log("------------- part 6 ---------------")
    async function getWeatherPart6() {
        try {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=-29.68&longitude=-53.80&current=temperature_2m,windspeed_10m";
    
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Error");
            }

            const data = await response.json();
    
            console.log("Current temperature:", data.current.temperature_2m, "°C");
            console.log("Current wind:", data.current.windspeed_10m, "km/h");
        } catch (e) {
            console.log("Error retrieving weather data. Please try again.", e.message);
        }
    }

    await getWeatherPart6()

    //Part 7 crie uma função genérica `buscarClima(lat, lon, campos)` parametrizável.
    console.log("------------- Challenge - part 7 ---------------")
    async function searchWeather(lat, lon, fields) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=${fields}`;

            const response = await fetch(url);
            const data = await response.json();

            const fieldsArray = fields.split(",");

            fieldsArray.forEach(field => {
                console.log(`${field}:`, data.current[field]);
            });
        } catch (e) {
            console.log("Error retrieving weather data. Please try again.", e.message);
        }
    }

    await searchWeather(-29.68, -53.80, "temperature_2m,windspeed_10m")
}

main()    