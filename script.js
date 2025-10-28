const apiKey = "1ec0fa1162084e8a895155528252810";
        const apiUrl = "http://api.weatherapi.com/v1/current.json?aqi=no&q=";

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function weatherDetails(city) {
            const response = await fetch(apiUrl+city+`$&key=${apiKey}`);

            if(response.status == 400 || response.status == 404) {
                document.querySelector(".weather").style.display = "none";
                document.querySelector(".error").style.display = "block";
            }

            else {
            const data = await response.json();
            document.querySelector(".temp").innerHTML = data.current.temp_c + "°C";
            document.querySelector(".city").innerHTML = data.location.name;
            document.querySelector(".humidity").innerHTML = Math.round(data.current.humidity) + "%";
            document.querySelector(".wind").innerHTML = data.current.wind_kph + " kmph";

            if(data.current.condition.text == "Sunny") {
                weatherIcon.src = "images/clear.png";
            } else if(data.current.condition.text == "Partly cloudy") {
                weatherIcon.src = "images/clouds.png";
            } else if(data.current.condition.text == "Rainy") {
                weatherIcon.src = "images/rain.png";
            } else {
                weatherIcon.src = "images/drizzle.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
            }
           
        }
        searchBtn.addEventListener("click", () => {
            weatherDetails(searchBox.value);
        });