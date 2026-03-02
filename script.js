const countryInput = document.getElementById('country-input');
const searchBtn = document.getElementById('search-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const countryInfo = document.getElementById('country-info');
const borderGrid = document.getElementById('bordering-countries');
const errorMessage = document.getElementById('error-message');

async function searchCountry(countryName) {

    if (!countryName) {
        errorMessage.textContent = "Enter a valid country name.";
        return;
    }

    try {

        // Clear previous results
        countryInfo.innerHTML = "";
        borderGrid.innerHTML = "";
        errorMessage.textContent = "";

        // Show spinner
        loadingSpinner.classList.remove("hidden");

        const response = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}`
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();
        const country = data[0];

        // Display main country info
        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        // Fetch bordering countries
        if (country.borders && country.borders.length > 0) {

            for (const code of country.borders) {

                const borderResponse = await fetch(
                    `https://restcountries.com/v3.1/alpha/${code}`
                );

                const borderData = await borderResponse.json();
                const neighbour = borderData[0];

                borderGrid.innerHTML += `
                    <div>
                        <p>${neighbour.name.common}</p>
                        <img src="${neighbour.flags.svg}"
                             alt="${neighbour.name.common} flag"
                             width="50">
                    </div>
                `;
            }

        } else {
            borderGrid.innerHTML = "<p>No bordering countries.</p>";
        }

    } catch (err) {

        errorMessage.textContent = "Country not found.";

    } finally {

        // Hide spinner
        loadingSpinner.classList.add("hidden");

    }
}


// Button search
searchBtn.addEventListener("click", () => {
    searchCountry(countryInput.value.trim());
});


// Enter key search
countryInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchCountry(countryInput.value.trim());
    }
});