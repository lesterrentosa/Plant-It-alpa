"use strict";
const parentElement = document.querySelector(".plants");

const API_URL_LIST = "https://perenual.com/api/species-list";
// const API_URL_DETAILS = "https://perenual.com/api/species/details";
// const PLANT_ID = 791;
const API_KEY = "sk-exWv64ef434e8f8d22030";
const searchParentEl = document.querySelector(".search");
const plantParentEl = document.querySelector(".plants");

//FOR API_URL_LIST
async function PlantSearch(query) {
  try {
    const response = await fetch(`${API_URL_LIST}?key=${API_KEY}&q=${query}`);
    const result = await response.json();
    const markup = _generateMarkup(result.data);
    plantParentEl.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    console.error(error);
  }
}

searchParentEl.addEventListener("submit", function (e) {
  const query = document.querySelector(".search__field").value;
  console.log(query);
  e.preventDefault();
  plantParentEl.innerHTML = "";
  PlantSearch(query);
  searchParentEl.querySelector(".search__field").innerHTML = "";
});

const _generateMarkup = function (data) {
  return data.map(_generateMarkupPreview).join("");
};
const _generateMarkupPreview = function (result) {
  console.log(result.edible);
  return `
  <div class="plant-container">
    <div class="image-container">
      <img class="plant-pic" src="${result?.default_image?.thumbnail}">
    </div>
    <div class="content-container">
      <p class="plant-name">${result.common_name}</p>
      <p class="sci-name">${result.scientific_name}</p>
      <p class="details">See more...</p>
    </div>
  </div>`;

  
};

//FOR API_URL_DETAILS
// (async function asd() {
//   try {
//     const response = await fetch(
//       `${API_URL_DETAILS}/${PLANT_ID}?key=${API_KEY}`
//     );
//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// })();

//ids: 791, 183, 1002
