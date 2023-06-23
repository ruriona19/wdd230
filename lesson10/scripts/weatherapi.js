// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const currentMaxTemp = document.querySelector('#current-max-temp');
const currentMinTemp = document.querySelector('#current-min-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const apiKey = "4805fb3c9a3f5182f4b8f3fa6d5faa4d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=Fairbanks";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
    currentMaxTemp.innerHTML = `<strong>${weatherData.main.temp_max.toFixed(0)}</strong>`;
    currentMinTemp.innerHTML = `<strong>${weatherData.main.temp_min.toFixed(0)}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    let desc = weatherData.weather[0].description;
    const descWords = desc.split(/[ ]+/);
    console.log(descWords);    
    desc = `${capitalizeFirstLetter(descWords[0])} ${capitalizeFirstLetter(descWords[1])}`;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = capitalizeFirstLetter(desc);
}  

async function apiFetch() {
    try {        
      const response = await fetch(apiUrl + `&appid=${apiKey}`);
      if (response.ok) {        
        const data = await response.json();
        console.log(data); 
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}
  
apiFetch();