const apiKey = '5d7d2b7fe47f9555ee4f7010a70f3dda';

async function getWeatherData() {
    const cityInput = document.getElementById('city-input');
    const cityName = cityInput.value;

    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        console.log('API Response:', data); // Log the API response

        if (response.ok) {
            displayWeatherData(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error:', error.message); // Log any errors
        alert(`Error: ${error.message}`);
    }
}

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weather-data');
    weatherDataDiv.innerHTML = '';

    const weatherDataItems = [
        { label: 'City', value: data.name, icon: 'map-marker-alt' },
        { label: 'Country', value: data.sys.country, icon: 'globe-americas' },
        { label: 'Temperature', value: `${data.main.temp}°C`, icon: 'temperature-low' },
        { label: 'Feels like', value: `${data.main.feels_like}°C`, icon: 'temperature-low' },
        { label: 'Humidity', value: `${data.main.humidity}%`, icon: 'tint' },
        { label: 'Wind speed', value: `${data.wind.speed} m/s`, icon: 'wind' }
    ];

    weatherDataItems.forEach(item => {
        const weatherDataItemDiv = document.createElement('div');
        weatherDataItemDiv.classList.add('weather-data-item');

        const icon = document.createElement('i');
        icon.className = `fa fa-${item.icon}`;
        icon.style.marginRight = '0.5rem';

        const label = document.createElement('span');
        label.textContent = item.label + ':';

        const value = document.createElement('span');
        value.textContent = item.value;

        weatherDataItemDiv.appendChild(icon);
        weatherDataItemDiv.appendChild(label);
        weatherDataItemDiv.appendChild(value);

        weatherDataDiv.appendChild(weatherDataItemDiv);
    });
}