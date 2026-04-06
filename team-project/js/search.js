const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function(){

  const value = searchInput.value.toLowerCase().trim();

  const container = document.getElementById("characters");

  // якщо поле пусте — нічого не показуємо
  if(value === ""){
    container.innerHTML = "";
    return;
  }

  const filtered = allCharacters.filter(character =>
    character.name.toLowerCase().includes(value)
  );

  container.className = "characters-search";

  if(filtered.length === 0){
    container.innerHTML = `
      <p class="not-found">Нічого не знайдено</p>
    `;
  } else {
    displayCharacters(filtered);
  }

  document.getElementById("characters-title").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

});
