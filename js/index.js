const container = document.getElementById("recipes-container");
let allRecipes = [];

fetch("https://dummyjson.com/recipes")
  .then((res) => res.json())
  .then((data) => {
    allRecipes = data.recipes;
    createFilterOptions(allRecipes);
    displayRecipes(allRecipes);
  });

function displayRecipes(list) {
  container.innerHTML = "";

  list.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const difficultyIcon = recipe.difficulty === "Easy" ? `<img src="logo_and_icons/Group 11.webp" class="difficulty-icon" alt="Easy">` : recipe.difficulty === "Medium" ? `<img src="logo_and_icons/Group 12.webp" class="difficulty-icon" alt="Medium">` : "";

    card.innerHTML = `
      <div class="card-img">
        ${difficultyIcon}
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-img"/>
      </div>
      <h3>${recipe.name}</h3>
      <p>${recipe.cuisine}</p>
    `;

    card.addEventListener("click", () => {
      window.location.href = `recipe.html?id=${recipe.id}`;
    });

    container.appendChild(card);
  });
}

function createFilterOptions(recipes) {
  const difficultyContainer = document.getElementById("difficulty-filters");
  const cuisineContainer = document.getElementById("cuisine-filters");

  let difficulties = [];
  let cuisines = [];

  recipes.forEach((r) => {
    if (!difficulties.includes(r.difficulty)) difficulties.push(r.difficulty);
    if (!cuisines.includes(r.cuisine)) cuisines.push(r.cuisine);
  });

  difficultyContainer.innerHTML = difficulties.map((d) => `<label><input type="checkbox" value="${d}" class="filter-difficulty"> ${d}</label>`).join("");

  cuisineContainer.innerHTML = cuisines.map((c) => `<label><input type="checkbox" value="${c}" class="filter-cuisine"> ${c}</label>`).join("");

  document.querySelectorAll(".filter-difficulty, .filter-cuisine").forEach((cb) => cb.addEventListener("change", updateFilters));
}

function updateFilters() {
  const selectedDifficulties = [...document.querySelectorAll(".filter-difficulty:checked")].map((cb) => cb.value);
  const selectedCuisines = [...document.querySelectorAll(".filter-cuisine:checked")].map((cb) => cb.value);

  let filtered = allRecipes;

  if (selectedDifficulties.length) filtered = filtered.filter((r) => selectedDifficulties.includes(r.difficulty));
  if (selectedCuisines.length) filtered = filtered.filter((r) => selectedCuisines.includes(r.cuisine));

  displayRecipes(filtered);
}

const filterButton = document.getElementById("filter-button");
const filterDropdown = document.getElementById("filter-dropdown");
filterButton.addEventListener("click", () => {
  filterDropdown.style.display = filterDropdown.style.display === "block" ? "none" : "block";
});

// BURGER MENU
const burger = document.getElementById("burger");
const navMenu = document.getElementById("nav-menu");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
