const detail = document.getElementById("recipe-detail");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://dummyjson.com/recipes/${id}`)
  .then((res) => res.json())
  .then((recipe) => {
    detail.innerHTML = `
      <h1>${recipe.name}</h1>
      <img src="${recipe.image}" />

      <div class="recipe-content">
        <div class="ingredients">
          <div class="section-title">Ingredients</div>
          <ul>
            ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </div>

        <div class="instructions">
          <div class="section-title">Instructions</div>
          <p>${recipe.instructions.join("<br><br>")}</p>
        </div>
      </div>

      <div class="section-title">Tags</div>
      <p>
        Meal type: ${recipe.mealType} <br>
        Difficulty: ${recipe.difficulty} <br>
        Cuisine: ${recipe.cuisine}
      </p>
    `;
  });
