const body = document.querySelector('body');
        const cityState = document.querySelector('.city-state');
        const temp = document.querySelector('.temp');
        const forcast = document.querySelector('.forcast');
        const realFeel = document.querySelector('.real-feel');
        const highTemp = document.querySelector('.high-temp');
        const lowTemp = document.querySelector('.low-temp');
 
        
        if(window.navigator.geolocation){
            function getCityState(data){
                let apiCity = data.results[0].components.city;
                let apiState =  data.results[0].components.state;
                cityState.textContent = `${apiCity}, ${apiState}`;
                return;
            }
            function getTempurature(data){
                let apiForcast = data.weather[0].main;
                let apiTemp = data.main.temp.toFixed(0);
                let apiMaxTemp = data.main.temp_max.toFixed(0);
                let apiMinTemp = data.main.temp_min.toFixed(0);
                let apiRealFeel = data.main.feels_like.toFixed(0);
                setBackground(apiForcast);

                forcast.append(apiForcast);
                temp.append(` ${apiTemp}°F`);
                realFeel.append(` ${apiRealFeel}°F`);
                lowTemp.append(` ${apiMinTemp}°`);
                highTemp.append(` ${apiMaxTemp}°/`);

            }
            function setBackground(forcast){
                console.log(forcast);
                switch(forcast){
                    case "Clear":
                    case "Clouds":
                        body.style.backgroundImage = "url('images/sky-1441936_1920.jpg')";
                        break;
                    case "Rain":
                    case "Drizzle":
                        body.style.backgroundImage = "url('images/rain-874041_1920.jpg')";
                        break;
                    case "Snow":
                        body.style.backgroundImage= "url('images/snowflake-1245748_1920.jpg')";
                        break;
                    case "Thunderstorm":
                        body.style.backgroundImage= "url('images/lightning-768801_1920.jpg')";
                        break;
                    default:
                        body.style.backgroundImage = "url('images/sky-1441936_1920.jpg')";

                }
                
            }
            const successfullLookup = (position) => {
                const {latitude, longitude} = position.coords;
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=cd07f8fb9b314f83b3a4ff22730356af`)
                    .then(response => response.json())
                    .then(data => getCityState(data));

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=272c035aa592e8c7dc033411411ed5b6`)
                    .then(response => response.json())
                    .then(data => getTempurature(data));
                
            }

            window.navigator.geolocation.getCurrentPosition(successfullLookup, console.log);
        }