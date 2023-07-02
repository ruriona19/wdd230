
/*---------Directory------------*/

const gridbutton = document.getElementById("gridBtn");
const listbutton = document.getElementById("listBtn");
const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {	
	display.classList.add("gridView");
	display.classList.remove("listView");
});

listbutton.addEventListener("click", showList);

function showList() {
	display.classList.add("listView");
	display.classList.remove("gridView");
}

const companiesDataPath = 'json/data.json';

async function getCompaniesData() {
    const response = await fetch(companiesDataPath);
    const companiesData = await response.json();
    displayCompanies(companiesData.companies);
}

getCompaniesData();

const displayCompanies = (companies) => { 
  let index = 0;
  const cards = document.querySelectorAll('article section');
  
  companies.forEach((company) => {
    image = cards[index].querySelector('img');
    companyName = cards[index].querySelector('h3');
    address = cards[index].querySelector('.address');
    phoneNumber = cards[index].querySelector('.phoneNumber');
    email = cards[index].querySelector('a');
    membership = cards[index].querySelector('.membership');

    image.setAttribute('src', company.imagePath);
    companyName.textContent = company.name;
    address.textContent = company.address;
    phoneNumber.textContent = company.phone;
    email.setAttribute('href', company.email);
    email.textContent = company.email;
    membership.textContent = company.membership;

    index = index + 1;
  }) 
}
