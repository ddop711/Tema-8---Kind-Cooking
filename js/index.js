const container = document.getElementById("recipes-container");

fetch("https://dummyjson.com/recipes")
  .then((res) => res.json())
  .then((data) => {
    data.recipes.forEach((recipe) => {
      const card = document.createElement("div");
      card.classList.add("card");

      // 🔹 Indsæt billede, navn og cuisine
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" />
        <h3>${recipe.name}</h3>
        <p>${recipe.cuisine}</p>
      `;

      // 👉 Klik → gå til recipe.html med id
      card.addEventListener("click", () => {
        window.location.href = `recipe.html?id=${recipe.id}`;
      });

      container.appendChild(card);
    });
  })
  .catch((err) => console.error("Fejl ved hentning af opskrifter:", err));
