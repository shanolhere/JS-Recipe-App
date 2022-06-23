const main = document.querySelector(".main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

const SEARCH_API = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// getRecipes(API_URL);
getRecipes(API_URL);

async function getRecipes(url) {
  const res = await fetch(url);
  const data = await res.json();
  showRecipesData(data["meals"][0]);
}

function showRecipesData(recipes) {
  // console.log("recipes");
  console.log(recipes);
  main.innerHTML = "";
  const { strMeal, strMealThumb, strCategory, strInstructions } = recipes;
  const recipeEl = document.createElement("div");
  recipeEl.classList.add("recipe");

  recipeEl.innerHTML = `
            <img src="${strMealThumb}" alt="${strMeal}">
            <div class="recipe-info">
               <h3>${strMeal}</h3>
               <p>Category: ${strCategory}</p>
            </div>
            <div class="overview">
          <h3>Instructions:</h3><br/>
          <p>${strInstructions}</p>
        </div>
        `;
  main.appendChild(recipeEl);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getRecipes(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
