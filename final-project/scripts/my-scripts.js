let copyrightYear = new Date().getFullYear();
document.getElementById("copyrightYear").innerHTML = copyrightYear;

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

/*// Display the banner to the top of the web site every Monday and Tuesday.
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

// lazy load*/

const imagesToLoad = document.querySelectorAll("img[data-src]");

const imageOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px 50px 0px",
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    });
    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
  } else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
  }

/*// Get the number of days between visits

// Get the number of milliseconds in one day = 1000 ms/s * 60 s/m * 60 m/h * 24 h/day
const dayToMilliseconds = 86400000;

// initialize display elements
const daysFromLastVisit = document.querySelector(".daysFromLastVisit");

// Get the number of milliseconds elapsed since the epoch
const msElapsedSinceEpoch = Date.now();

// Get the stored VALUE for the msFromLastVisit-ls KEY 
let msFromLastVisit = Number(window.localStorage.getItem("msFromLastVisit-ls")) || msElapsedSinceEpoch;

// Time elapsed in ms between last visit and today
let msElapsed = msElapsedSinceEpoch - msFromLastVisit;

msLastVisit = msElapsedSinceEpoch;

// Get number of days since last visit
let daysElapsed = Math.round(msElapsed / dayToMilliseconds);

// Determine if this is the first visit.
if (daysFromLastVisit !== null) {
  if (msElapsed !== 0) {
    daysFromLastVisit.textContent = daysElapsed;
  } else {
    daysFromLastVisit.textContent = `Welcome! This is your first visit.`;
  }
}

// Store the new msFromLastVisit into localStorage
localStorage.setItem("msFromLastVisit-ls", msLastVisit);*/