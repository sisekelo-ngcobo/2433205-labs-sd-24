const submitBtn = document.getElementById("submit");
const countryNameInput = document.getElementById("countryNameInput");
const countryName = document.getElementById("country-name");
const countryCapital = document.getElementById("capital");
const population = document.getElementById("population");
const region = document.getElementById("region");
const countryFlag = document.getElementById("country-flag");
const capitalText = "Capital: ";
const regionText = "Region: ";
const populationText = "Population: ";

function getCountryByName(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then((response) => response.json())
    .then((data) => {
      
      const info = data[0];

      region.innerHTML = regionText + info.region;
      population.innerHTML = populationText + info.population;
      countryName.innerHTML = info.name.common;
      countryCapital.innerHTML = capitalText + info.capital;
      countryFlag.src = info.flags.png;

      info.borders.forEach((bc) => {
        getCountryByCode(bc);
      });
      
  const countryInfoSection = document.querySelector(".country-info");
  countryInfoSection.style.display = "flex";
    })
    .catch((error) => {
      console.error('Failed to fetch country data:', error);
    });
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const countryName = countryNameInput.value;
  getCountryByName(countryName);
});

function findCountry() {
  const inputElement = document.getElementById("countryNameInput");
  const countryName = inputElement.value;

  getCountryByName(countryName);

  inputElement.value = "";
}

function getCountryByCode(code) {
  fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    .then((response) => response.json())
    .then((data) => {
      const borderingCountryName = document.createElement("p");
      const borderingCountryFlag = document.createElement("img");
      const container = document.createElement("article");

      container.id = "bs";

      container.appendChild(borderingCountryName);
      container.appendChild(borderingCountryFlag);

      document.getElementById("b-c").appendChild(container);
      borderingCountryFlag.className = "borderingCountryFlag";
      borderingCountryName.className = "borderingCountry";

      borderingCountryFlag.src = data[0].flags.png;
      borderingCountryName.innerHTML = data[0].name.official;
    })
    .catch((error) => {
      alert(error.message)
      console.error('Failed to fetch bordering country data:', error);
    });
}
