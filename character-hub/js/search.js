const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function(){
  const value = searchInput.value.toLowerCase().trim();
  const container = document.getElementById("characters");
  const section = document.getElementById("characters-section");
  const title = document.getElementById("characters-title");

  if(value === ""){
    container.innerHTML = "";
    title.textContent = "Characters";
    return;
  }

  const filtered = allCharacters.filter(character =>
    character.name.toLowerCase().includes(value)
  );

  container.className = "characters-search";
  title.textContent = "Search Results";

  if(filtered.length === 0){
    container.innerHTML = `
      <p class="not-found">Nothing found</p>
    `;
  } else {
    displayCharacters(filtered);
  }

  requestAnimationFrame(() => {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});