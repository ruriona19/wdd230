const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
}
  
getProphetData();

const displayProphets = (prophets) => { 
    const cards = document.querySelector('div.cards'); // select the output container element
  
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let birthDate = document.createElement("p");
        let birthPlace = document.createElement("p");
        let deathDate = document.createElement("p");
        let portrait = document.createElement('img');

        // Adding prophetCard class to card section
        card.classList.add("prophetCard");
    
        // Adding prophetPortrait class to card section
        portrait.classList.add("prophetPortrait");

        // Build the h2 content out to show the prophet's full name - finish the template string
        h2.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        deathDate.textContent = `Date of Death: ${prophet.death}`;

        // Build the image portrait by setting all the relevant attribute
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
    
        // Append the section(card) with the created elements
        cards.appendChild(card);
        card.appendChild(h2);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(deathDate);
        card.appendChild(portrait);
        
        
      }) // end of forEach loop
}



