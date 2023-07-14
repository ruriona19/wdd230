// Weather api connection       
const apiKey = "4805fb3c9a3f5182f4b8f3fa6d5faa4d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=carlsbad";
const weatherIcon = document.querySelector('.weather-icon');
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

async function checkWeather(){
  
    let response = await fetch(apiUrl + `&appid=${apiKey}`);
    let weatherData = await response.json(); 
    let temperature = Math.round(weatherData.main.temp);
    let speedWind = weatherData.wind.speed;
    let windChill = 'N/A';
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;    
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
        
    document.querySelector("#city").innerHTML = weatherData.name;
    document.querySelector("#temp").innerHTML = temperature + "°C";
    document.querySelector(".wind").innerHTML = speedWind + " km/h";
    document.querySelector(".wind-chill").innerHTML = windChill + "°C";    
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

checkWeather();