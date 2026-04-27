
const content = document.getElementById("content");
const catalogLink = document.getElementById("catalogLink");
const specialsLink = document.getElementById("specialsLink");

catalogLink.addEventListener("click", loadCatalog);
specialsLink.addEventListener("click", loadSpecials);

async function loadCatalog(event) {
  if (event) {
    event.preventDefault();
  }

  const response = await fetch("data/categories.json");
  const categories = await response.json();

  let html = `<h2>Каталог</h2><div class="category-list">`;

  categories.forEach((category) => {
    html += `
      <div class="card">
        <h3>${category.name}</h3>
        <p>${category.notes}</p>
        <button onclick="loadCategory('${category.shortname}')">Відкрити</button>
      </div>
    `;
  });

  html += `</div>`;
  content.innerHTML = html;
}

async function loadCategory(shortname) {
  const response = await fetch(`data/${shortname}.json`);
  const category = await response.json();

  let html = `<h2>${category.categoryName}</h2><div class="items-list">`;

  category.items.forEach((item) => {
    html += `
      <div class="card">
        <img src="https://placehold.co/200x200?text=${item.shortname}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <strong>${item.price}</strong>
      </div>
    `;
  });

  html += `</div>`;
  content.innerHTML = html;
}

async function loadSpecials(event) {
  event.preventDefault();

  const response = await fetch("data/categories.json");
  const categories = await response.json();

  const randomIndex = Math.floor(Math.random() * categories.length);
  const randomCategory = categories[randomIndex];

  loadCategory(randomCategory.shortname);
}