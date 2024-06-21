document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city-select');
    const weatherInfoBottom = document.getElementById('weather-bottom');
    const madeBy = document.getElementById('made-by'); // New

    const apiKey = 'e28008f10b626068fd9bebf8245b98ec';  // Your OpenWeatherMap API key

    citySelect.addEventListener('change', async () => {
        const city = citySelect.value;
        const weather = await getWeather(city);
        if (weather) {
            weatherInfoBottom.innerHTML = `The current temperature in ${city} is <strong>${Math.round(weather.temp)}°C</strong> with ${weather.description}.`;
            updateBackground(weather.description);
            madeBy.style.display = 'block'; // Show "Made by" element
        } else {
            weatherInfoBottom.textContent = `Unable to fetch weather data for ${city}.`;
            madeBy.style.display = 'none'; // Hide "Made by" element
        }
    });

    async function getWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},PK&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            if (data.cod !== 200) {
                throw new Error(`API error: ${data.message}`);
            }
            return {
                temp: data.main.temp,
                description: data.weather[0].description
            };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }

    function updateBackground(description) {
        const body = document.body;
        body.classList.remove('sunny', 'cloudy', 'rainy'); // Remove existing weather classes

        if (description.includes('rain')) {
            body.classList.add('rainy');
        } else if (description.includes('cloud')) {
            body.classList.add('cloudy');
        } else if (description.includes('sun') || description.includes('clear')) {
            body.classList.add('sunny');
        }
    }
});
