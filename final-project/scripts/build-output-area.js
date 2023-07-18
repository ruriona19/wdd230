/*https://jsfiddle.net/EZVbj/1/*/
function formatAMPM() {
  var d = new Date(),
      minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
      hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
      ampm = d.getHours() >= 12 ? 'pm' : 'am',
      months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}

async function interactWithLS(){
    const response = await fetch('json/fruit.json');
    const fruitsData = await response.json();

    // Retrieving data from Form
    let fruit1 = document.getElementById("fruit-opt1").value;
    let fruit2 = document.getElementById("fruit-opt2").value;
    let fruit3 = document.getElementById("fruit-opt3").value;
    let fname = document.getElementById("fname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    /*// Retreiving stored data
    let lsFruit1 = localStorage.getItem("fruit1",fruit1);
    let lsFruit2 = localStorage.getItem("fruit2",fruit2);
    let lsFruit3 = localStorage.getItem("fruit3",fruit3);*/

    // Get total amount of fruit nutritions from fruit.json
    let totalCarbs = 0;
    let totalProteins = 0;
    let totalFat = 0;
    let totalCalories = 0;
    let totalSugar = 0;
    let currentCarb;

    fruitsData.forEach(fruit => {
        console.log(fruit.nutritions.carbohydrates)
        if (fruit.name == fruit1 || fruit.name == fruit2 || fruit.name == fruit3) {
            currentCarb = fruit.nutritions.carbohydrates;
            currentProtein = fruit.nutritions.protein;
            currentFat = fruit.nutritions.fat;
            currentCalories = fruit.nutritions.calories;
            currentSugar = fruit.nutritions.sugar;
            totalCarbs += currentCarb;
            totalProteins += currentProtein;
            totalFat += currentFat;
            totalCalories += currentCalories;
            totalSugar += currentSugar;
        }       
    });

    // Get current date
    const orderDate = formatAMPM();
    let drinkData = localStorage.getItem("drinksData", drinksData);
    let drinksData = [];
    localStorage.setItem("drinksData", JSON.stringify(drinksData));
    
    let drink = {
      "fname": fname,
      "email": email,
      "phone": phone,
      "orderDate": orderDate,
      "fruit1": fruit1,
      "fruit2": fruit2,
      "fruit3": fruit3,
      "totalCarbs": totalCarbs,
      "totalProteins": totalProteins,
      "totalFat": totalFat,
      "totalCalories": totalCalories,
      "totalSugar": totalSugar, 
    };

    drinksData.push(drink);

    // Storing data to local storage
    localStorage.setItem("fruit1",fruit1);
    localStorage.setItem("fruit2",fruit2);
    localStorage.setItem("fruit3",fruit3);
    localStorage.setItem("totalCarbs", totalCarbs);
    localStorage.setItem("totalProteins", totalProteins);
    localStorage.setItem("totalFat", totalFat);
    localStorage.setItem("totalCalories", totalCalories);
    localStorage.setItem("totalSugar", totalSugar);
    localStorage.setItem("fname", fname);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("orderDate", orderDate);
    localStorage.setItem("drink", JSON.stringify(drinksData));
}

const fruitsDataPath = 'json/fruit.json';

// Populate fruit option select elements
async function getFruitsData() {
    const response = await fetch(fruitsDataPath);
    const fruitsData = await response.json();
    console.log(fruitsData);

    let selectFruitOpt1 = document.getElementById("fruit-opt1");
    let selectFruitOpt2 = document.getElementById("fruit-opt2");
    let selectFruitOpt3 = document.getElementById("fruit-opt3");

    let selectFruitElements = [selectFruitOpt1,selectFruitOpt2,selectFruitOpt3];


    for (let index = 0; index < selectFruitElements.length; index++) {
        let option1 = document.createElement("option");
        option1.setAttribute("value", "0");
        option1.textContent = "Select fruit option:";

        selectFruitElements[index].appendChild(option1); 

        fruitsData.forEach(fruit => {
            let option = document.createElement("option");
            option.setAttribute("value", fruit.name);
            option.textContent = fruit.name;
            selectFruitElements[index].appendChild(option);
        })
    }
}

getFruitsData().then(() => {
    checkAllSelect();
});


/*--------------Build custom select element-------------------*/

function checkAllSelect(){
    let x1, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x1 = document.getElementsByClassName("custom-select");
    l = x1.length;
    for (i = 0; i < l; i++) {
    selElmnt = x1[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x1[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
            }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x1[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
        });
    }
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

