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