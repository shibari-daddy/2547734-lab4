const countryInput = document.getElementByID('country-input')
const searchBtn = document.getElementByID('search-btn')
const loadingSpinner = document.getElementByID('loading-spinner')
const countryInfo = document.getElementByID('country-info')
const error = document.getElementByID('error-message')

/* search-btn.addEventListener('click', function() {

}) */


//goes into async


async function searchCountry(countryName) {

    if(!countryName){
        errorMessage.textContent= "Enter valid country name.";
        return;
    }

    //if there is no country name return an error message

    try {

        countryInfo.innerHTML = "";
        borderGrid.innerHTML = "";
        errorMessage.innerHTML = "";
    
        // Show loading spinner

        function showSpinner() {
        document.getElementById('loading-spinner').classList.remove('hidden');
        }

        showSpinner();


        // Fetch country data
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}`
        );

        if(!response.ok){
            throw new Error("This country is not found!");
        }

        const data = await response.json();
        const country = data[0];

        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        // Update DOM
        // Fetch bordering countries

        if (country.borders && country.borders.length > 0) {
            for(let code of country.borders){
                const borderResponse = await fetch(
                    'https://restcountries.com/v3.1/alpha/${code}'
                );

                const borderData = await borderResponse.json();
                const neighbour = borderData[0];

                borderGrid.innerHTML += `
                    <div>
                        <p>${neighbour.name.common}</p>
                        <img src="${neighbour.flags.svg}"
                            alt="${neighbour.name.common} flag"
                            width="50"
                    </div>
                `;
            }
            } else {
                borderGrid.innerHTML = "<p>No bordering countries found.</p>";

            }
        } catch (error) {

        errorMessage.textContent = "Country not found.";
        // Show error message
    }
 } 

 searchBtn.addEventListener("click", () => {
    searchCountry(countryInput.value.trim());

 });

 countryInput.addEventListener("keydown", (event) =>
{
    if(event.key === "Enter"){
        searchCountry(countryInput.value.trim());
    }

});