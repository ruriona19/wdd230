// Weather api connection       
const apiKey = "4805fb3c9a3f5182f4b8f3fa6d5faa4d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=carlsbad";
const apiUrlForecast5 = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=carlsbad";
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#temp-desc');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function buildWindChill(speed, temp){
    // Compute the windchill
    let wc = 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed,0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    // Display the windchill
    console.log(wc);    

    return wc;
}

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'short' });        
}

function getIconSrc(icon)
{
    return `https://openweathermap.org/img/w/${icon}.png`
}

async function checkWeather(){
  
    let response = await fetch(apiUrl + `&appid=${apiKey}`);
    let weatherData = await response.json(); 
    
    let temperature = Math.round(weatherData.main.temp);
    let speedWind = weatherData.wind.speed;
    let humidity = weatherData.main.humidity;

    let iconsrc = getIconSrc(weatherData.weather[0].icon);    
    let desc = weatherData.weather[0].description;
    const descWords = desc.split(/[ ]+/); 
    if (descWords.length > 1) {
        desc = `${capitalizeFirstLetter(descWords[0])} ${capitalizeFirstLetter(descWords[1])}`;   
    } else {
        desc = `${capitalizeFirstLetter(descWords[0])}`;
    }       

    if (temperature <= 10 && speedWind > 4.8) {
      windChill = buildWindChill(speedWind, temperature);
    }

    document.querySelector("#temp").innerHTML = temperature;
    document.querySelector("#humidity").innerHTML = "Humidity: " + humidity + "%";
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
    let responseForecast5 = await fetch(apiUrlForecast5 + `&appid=${apiKey}`);
    let forecast5days = await responseForecast5.json();
    for (let index = 0; index < 5; index++) {
        let weatherIcon = document.querySelector(`#weather-icon${index + 1}`);
        let forecastDay = forecast5days.list[index*8 + 3];

        // Display short day name
        let dt_txt = forecastDay.dt_txt;
        let day = getDayName(dt_txt, "en-EN");
        document.querySelector(`#day-of-week${index + 1}`).innerHTML = day;
        
        // Display Weather Icon
        let icon = forecastDay.weather[0].icon;
        let iconSrc = getIconSrc(icon);
        weatherIcon.setAttribute('src', iconSrc);

        // Display Max Temp
        let maxTemp = forecastDay.main.temp_max;
        let maxTemperature = Math.round(maxTemp);
        document.querySelector(`#max-temp${index + 1}`).innerHTML = `Max: ${maxTemperature}&deg;`;
    }

    
}

checkWeather();