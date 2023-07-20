
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

  // Retrieve the object from the storage
  let drink = JSON.parse(localStorage.getItem("drink"));
  if (drink == null || drink === 'undefined') {
   
    document.querySelector(`#special-drinks`).innerHTML = `<h2>Your Specialitty Drink</h2>
                                                          <p>Go to Fresh page to build your speciality drink!<\p>`
  }else{
    document.querySelector(`#special-drinks`).innerHTML = `<h2>Your Specialitty Drink</h2>
                                                          <p><strong>Name</strong>: ${drink[0].fname}</p>
                                                                <p><strong>Email</strong>: ${drink[0].email}</p>
                                                                <p><strong>Phone</strong>: ${drink[0].phone}</p>
                                                                <p><strong>Fruit 1</strong>: ${drink[0].fruit1}</p>
                                                                <p><strong>Fruit 2</strong>: ${drink[0].fruit2}</p>
                                                                <p><strong>Fruit 3</strong>: ${drink[0].fruit3}</p>
                                                                <p><strong>Calories</strong>: ${drink[0].totalCalories}</p>
                                                                <p><strong>Carbs</strong>: ${drink[0].totalCarbs}</p>
                                                                <p><strong>Fat</strong>: ${drink[0].totalFat}</p>
                                                                <p><strong>Proteins</strong>: ${drink[0].totalProteins}</p>
                                                                <p><strong>Sugar</strong>: ${drink[0].totalSugar}</p>
                                                                <p><strong>Instructions</strong>: ${drink[0].instructions}</p>
                                                                <p><strong>Order Date</strong>: ${drink[0].orderDate}</p>`
  }
  
