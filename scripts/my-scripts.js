let lastUpdated = new Date(document.lastModified);
document.getElementById("lastUpdated").innerHTML = lastUpdated;

let copyrightYear = new Date().getFullYear();
document.querySelector("#copyrightYear").innerHTML = copyrightYear;