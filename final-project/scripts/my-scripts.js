
/* Get current year */
let copyrightYear = new Date().getFullYear();
document.getElementById("copyrightYear").innerHTML = copyrightYear;

/* Nav toggle menu*/
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById('hamburgerBtn');
x.onclick = toggleMenu;

/* Get current date*/
let currentDate = document.getElementById("currentDate");

const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);

currentDate.textContent = fulldate;

/* Get last updated date */
let lastUpdated1 = new Date(document.lastModified). toLocaleString();
document.getElementById("lastUpdatedSmall").innerHTML = lastUpdated1;

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