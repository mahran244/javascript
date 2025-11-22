function showweatherDetails(event) {
    event.preventDefault(); // stop form reload

    const city = document.getElementById('city').value.trim();
    const apiKey = 'ccac5df72beadcff0217b3541a3cbc14';

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById('weatherInfo').innerHTML =
                    `<p>City not found.</p>`;
                return;
            }

            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.log(error);
        });
}

document.getElementById('weatherForm')
        .addEventListener('submit', showweatherDetails);
