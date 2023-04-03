const cardList = document.querySelector(".card__list");
const loader_container = document.querySelector(".loader__container");
const loader = document.createElement("div");
loader_container.append(loader);
loader.classList.add("loader");
const searchInput = document.querySelector(".searchInput");

async function fetchData() {
  if (!searchInput.value) {
    url = "https://restcountries.com/v3.1/all";
  } else {
    const value = searchInput.value.toLowerCase();
    url = `https://restcountries.com/v3.1/name/${value}`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    cardList.innerHTML = "";
    data.map((elements) => {
      const cardItem = document.createElement("li");
      cardList.append(cardItem);
      cardItem.classList.add("card__item");
      const cardImg = document.createElement("img");
      cardItem.append(cardImg);
      cardImg.classList.add("card__img");
      cardImg.src = elements.flags.png;
      cardImg.alt = elements.flags.alt;
      const cardTitle = document.createElement("h1");
      cardItem.append(cardTitle);
      cardTitle.classList.add("card__title");
      cardTitle.textContent = elements.name.common;
      const cardCapital = document.createElement("h2");
      cardItem.append(cardCapital);
      cardCapital.classList.add("card__capital");
      cardCapital.innerHTML = `Capital: ${elements.capital}`;
      const population = document.createElement("p");
      cardItem.append(population);
      population.classList.add("card__population");
      const populationString = String(elements.population);
      if (populationString.length === 4) {
        population.textContent = `Population: ${populationString.slice(
          0,
          1
        )} ming`;
      } else if (populationString.length === 5) {
        population.textContent = `Population: ${populationString.slice(
          0,
          2
        )} ming`;
      } else if (populationString.length === 6) {
        population.textContent = `Population: ${populationString.slice(
          0,
          3
        )} ming`;
      } else if (populationString.length === 7) {
        population.textContent = `Population: ${populationString.slice(
          0,
          1
        )} mln`;
      } else if (populationString.length === 8) {
        population.textContent = `Population: ${populationString.slice(
          0,
          2
        )} mln`;
      } else if (populationString.length === 9) {
        population.textContent = `Population: ${populationString.slice(
          0,
          3
        )} mln`;
      } else if (populationString.length === 10) {
        population.textContent = `Population: ${populationString.slice(
          0,
          1
        )} mlrd`;
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}
setTimeout(() => {
  fetchData();
}, 777);
const searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchData();
  searchInput.value = "";
});
