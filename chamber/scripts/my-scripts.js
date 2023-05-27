let lastUpdated1 = new Date(document.lastModified). toLocaleString();
let lastUpdated2 = new Date(document.lastModified). toLocaleString();
let lastUpdated3 = new Date(document.lastModified). toLocaleString();
document.getElementById("lastUpdatedSmall").innerHTML = lastUpdated1;
document.getElementById("lastUpdatedMedium").innerHTML = lastUpdated2;
document.getElementById("lastUpdatedLarge").innerHTML = lastUpdated3;

let copyrightYear = new Date().getFullYear();
document.getElementById("copyrightYearSmall").innerHTML = copyrightYear;
document.getElementById("copyrightYearMedium").innerHTML = copyrightYear;
document.getElementById("copyrightYearLarge").innerHTML = copyrightYear;

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById('hamburgerBtn');
x.onclick = toggleMenu;


let currentDate = document.getElementById("currentDate");

const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);

currentDate.textContent = fulldate;

// Display the banner to the top of the web site every Monday and Tuesday.
let colors = ['#0077b6', '#00b4d8']
let currentColor = 0
let currentDay = now.getDay();
let bannerTemp = document.querySelector('.banner-text > h1');
let monday = 1;
let tuesday = 2;
let wednesday = 3;
let thursday = 4;
let friday = 5;
let saturday = 6;
let sunday = 0;

// This function is on charge of changing the text color every one second
function changeColor() {
    --currentColor

    if (currentColor < 0) 
        currentColor = colors.length -1
    
    bannerTemp.style.color = colors[(currentColor) % colors.length]    
}

// If the current day is equal to Monday and Tuesday then the banner is displayed
// Change the day inside if clause if you want to see the banner in a different day
if (currentDay == monday || currentDay == thursday) {        
    bannerTemp.style.display = 'block';
}else {    
    bannerTemp.style.display = 'none';
}

setInterval(changeColor, 1000)

// Weather apia connection

const apiKey = "4805fb3c9a3f5182f4b8f3fa6d5faa4d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=cochabamba";

async function checkWeather(){
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json(); 
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}

checkWeather();