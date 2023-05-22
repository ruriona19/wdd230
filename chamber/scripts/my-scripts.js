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


//const showBanner = (day) => {
    debugger
    //if (day == 0) {
        debugger
        const banner = document.querySelector('.banner-text');
        banner.setAttribute('display','none');
    //}
//}    

//let currentDay = now.getDay();
//showBanner(currentDay);