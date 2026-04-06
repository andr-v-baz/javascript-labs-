let allCharacters = [];

async function loadAnimeData() {
  try {
    const response = await fetch("data/anime.json");
    const data = await response.json();

    allCharacters = [];
    displayCategories(data.categories);
  } catch (error) {
    console.error("Помилка завантаження JSON:", error);
  }
}

function displayCategories(categories) {
  const container = document.getElementById("categories");
  container.innerHTML = "";

  categories.forEach(category => {
    category.characters.forEach(character => {
      allCharacters.push(character);
    });

    const card = document.createElement("div");
    card.classList.add("category-card");

    card.innerHTML = `
      <img src="${category.image}" alt="${category.name}">
      <h2>${category.name}</h2>
    `;

    card.addEventListener("click", () => {
      const charactersContainer = document.getElementById("characters");
      charactersContainer.className = "characters-full";

      displayCharacters(category.characters);

      document.getElementById("characters-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    container.appendChild(card);
  });
}

function displayCharacters(characters) {
  const container = document.getElementById("characters");
  container.innerHTML = "";

  if (!characters.length) {
    container.innerHTML = `<p class="not-found">Нічого не знайдено</p>`;
    return;
  }

  characters.forEach(character => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>${character.description}</p>
      <p><strong>Сила:</strong> ${character.power}</p>
    `;

    container.appendChild(card);
  });
}

loadAnimeData();
