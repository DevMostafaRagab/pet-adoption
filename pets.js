//* Tuesday, 16/6/2026


// Defines a URL for the API
const petsURI = "https://learnwebcode.github.io/bootcamp-pet-data/pets.json";

// Get the template element
const template = document.querySelector("#pet-template");
const wrapper = document.createDocumentFragment();

// Fetching dynamic pet data from a remote JSON file
async function showPetsData() {
  // Initiates an API request
  const promiseResponse = await fetch(petsURI);
  // Parses the response data
  const petsData = await promiseResponse.json();

  petsData.forEach(pet => {
    //1// "clone" will be used to injected dynamic data into html tags
    const clone = template.content.cloneNode(true);

    //!=>#2<=// to use dataset.species in filtring
    clone.querySelector(".pet-card").dataset.species = pet.species;

    //2// display pets data
    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".pet-card-description").textContent = pet.description;
    // call formatAge function to calculates pet's age (in years)
    clone.querySelector(".pet-card-age").textContent = formatAge(pet.birthYear);

    // if there no photo (images failing to load), display a fallback image
    if (!pet.photo) pet.photo = "./images/fallback.jpg";

    // display pets photo
    clone.querySelector(".pet-card-photo img").src = pet.photo;
    clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}.`;



    //3//=> THIS "wrapper" MUST BE LAST LINE 
    wrapper.appendChild(clone);
  });
  //4// add wrapper inside the empty div "list-of-pets" 
  document.querySelector(".list-of-pets").appendChild(wrapper);
}

// call function
showPetsData();

// calculates pet's age (in years) from birth year and returns it as a human-readable age string
function formatAge(birthYear) {
  // Get the current year from the system clock
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  if (age == 1) return "1 year old";
  if (age == 0) return "Less than a year old";
  return `${age} years old`;
}

// pet filter button
/* (code for) Add horizontal line (underline) beneath the first button and shift it when other buttons are clicked  */

// get and select all three filter buttons
const allButtons = document.querySelectorAll(".pet-filter button");

// add a pet filter handler to all buttons
allButtons.forEach((el) => {
  el.addEventListener("click", petFilterHandler);
});

// filter pets
function petFilterHandler(e) {
  //1// remove active class from all buttons
  allButtons.forEach((el) => el.classList.remove("active"));

  //2// then add active class to the specific button that just got clicked
  e.target.classList.add("active");

  //3// which button being clicked
  // Accessing (data-* attributes) HTML custom data attributes using the element's built-in "dataset" property
  const currentFilter = e.target.dataset.filter;
  // console.log(currentFilter); // (TEST) print the selected pet being clicked
  document.querySelectorAll(".pet-card").forEach((el) => {
    //!=>#2<=// to use dataset.species in filtring
    if (currentFilter == el.dataset.species || currentFilter == "allpets") {
      el.style.display = "grid";
    } else {
      el.style.display = "none";
    }
  });
}