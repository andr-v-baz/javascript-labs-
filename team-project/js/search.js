const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", function(event){

  if(event.key === "Enter"){

    const value = searchInput.value.toLowerCase();

    const filtered = allCharacters.filter(character =>
      character.name.toLowerCase().includes(value)
    );

    const container = document.getElementById("characters");

    // режим відображення для пошуку
    container.className = "characters-search";

    if(filtered.length === 0){

      container.innerHTML = "<p>Нічого не знайдено</p>";

    } else {

      displayCharacters(filtered);

    }

    // скрол до персонажів
    document.getElementById("characters-title").scrollIntoView({
      behavior: "smooth"
    });

  }

});