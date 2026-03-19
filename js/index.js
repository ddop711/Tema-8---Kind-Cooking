const container = document.getElementById("recipes-container");
let allRecipes = [];

// Hent opskrifter
fetch("https://dummyjson.com/recipes")
  .then((res) => res.json())
  .then((data) => {
    allRecipes = data.recipes;
    createFilterOptions(allRecipes);
    displayRecipes(allRecipes);
  });

// Vis opskrifter
function displayRecipes(list) {
  container.innerHTML = "";
  list.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <h3>${recipe.name}</h3>
      <p>${recipe.cuisine}</p>
    `;
    card.addEventListener("click", () => {
      window.location.href = `recipe.html?id=${recipe.id}`;
    });
    container.appendChild(card);
  });
}

// Opret filtre - simpel version
function createFilterOptions(recipes) {
  const difficultyContainer = document.getElementById("difficulty-filters");
  const cuisineContainer = document.getElementById("cuisine-filters");

  let difficulties = [];
  let cuisines = [];

  // Lav unikke lister
  recipes.forEach((r) => {
    if (!difficulties.includes(r.difficulty)) difficulties.push(r.difficulty);
    if (!cuisines.includes(r.cuisine)) cuisines.push(r.cuisine);
  });

  // Lav HTML for difficulty
  difficultyContainer.innerHTML = difficulties.map((d) => `<label><input type="checkbox" value="${d}" class="filter-difficulty"> ${d}</label>`).join("");

  // Lav HTML for cuisine
  cuisineContainer.innerHTML = cuisines.map((c) => `<label><input type="checkbox" value="${c}" class="filter-cuisine"> ${c}</label>`).join("");

  // Tilføj event listeners
  document.querySelectorAll(".filter-difficulty, .filter-cuisine").forEach((cb) => cb.addEventListener("change", updateFilters));
}

// Filtrering
function updateFilters() {
  const selectedDifficulties = [...document.querySelectorAll(".filter-difficulty:checked")].map((cb) => cb.value);
  const selectedCuisines = [...document.querySelectorAll(".filter-cuisine:checked")].map((cb) => cb.value);

  let filtered = allRecipes;

  if (selectedDifficulties.length) filtered = filtered.filter((r) => selectedDifficulties.includes(r.difficulty));
  if (selectedCuisines.length) filtered = filtered.filter((r) => selectedCuisines.includes(r.cuisine));

  displayRecipes(filtered);
}

// Dropdown
const filterButton = document.getElementById("filter-button");
const filterDropdown = document.getElementById("filter-dropdown");
filterButton.addEventListener("click", () => {
  filterDropdown.style.display = filterDropdown.style.display === "block" ? "none" : "block";
});
