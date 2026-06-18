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
    clone.querySelector(".pet-description").textContent = pet.description;

    //3//=> THIS "wrapper" MUST BE LAST LINE 
    wrapper.appendChild(clone);
  });
  //4// add wrapper inside the empty div "list-of-pets" 
  document.querySelector(".list-of-pets").appendChild(wrapper);
}

// call function
showPetsData();