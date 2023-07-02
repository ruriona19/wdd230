const dataJSON = "json/data.json";

async function getCompaniesData() {
  const response = await fetch(dataJSON);
  const data = await response.json();
  showCompanies(data.companies);
}

getCompaniesData();

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const showCompanies = (companies) => {
  const cards = document.querySelector("section#spotLights");  
  companies = shuffleArray(companies);
  let spotlightIndex = 1;

  let filtered = companies.filter(
    (company) =>
      company.membership === "Gold Membership" ||
      company.membership === "Silver Membership"
  );
  filtered = shuffleArray(filtered);
  filtered = filtered.slice(0, 3);

  filtered.forEach((company) => {
    currentSpotLightId = `spotLight${spotlightIndex}`;
    
    let box = document.createElement("section");
    let name = document.createElement("h2");
    let logo = document.createElement("img");
    let address = document.createElement("p");
    let phone = document.createElement("p");
    let membership = document.createElement("h4");
    let url = document.createElement("a");
    

    name.textContent = `${company.name}`;
    address.textContent = `${company.address}`;
    phone.textContent = `${company.phone}`;
    membership.textContent = `${company.membership}`;
    url.textContent = 'Learn More';
    
    logo.setAttribute("src", company.imagePath);    
    logo.setAttribute("alt", `${company.name}`);
    box.setAttribute("id", currentSpotLightId);
    url.setAttribute("href", `${company.email}`);
    

    cards.appendChild(box);
    box.appendChild(name);
    box.appendChild(logo);
    box.appendChild(address);
    box.appendChild(phone);
    box.appendChild(membership);
    box.appendChild(url);

    spotlightIndex = spotlightIndex + 1;
  });
};
