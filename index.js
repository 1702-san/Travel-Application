// Fetch recommendations from the JSON file
async function fetchRecommendations() {
    try {
        const response = await fetch('api.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Filter results based on the search term
function search() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    fetchRecommendations().then(data => {
        if (!data) {
            console.error('No data fetched');
            return;
        }

        const results = [];

        // Check each category
        ['countries', 'temples', 'beaches'].forEach(category => {
            if (category in data) {
                data[category].forEach(item => {
                    if (category === 'countries') {
                        // If the category is countries, check within the cities
                        item.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(searchTerm) ||
                                item.name.toLowerCase().includes(searchTerm)) {
                                results.push(city);
                            }
                        });
                    } else {
                        // Otherwise, check the name of the item
                        if (item.name.toLowerCase().includes(searchTerm)) {
                            results.push(item);
                        }
                    }
                });
            }
        });

        displayResults(results);
    });
}

// Reset the search results
function reset() {
    document.getElementById('search').value = '';
    displayResults([]);
}

// Display the filtered results on the page
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.imageUrl}" alt="${item.name}">
            <p>${item.description}</p>
        `;
        resultsContainer.appendChild(resultItem);
    });
}

// Optional: Display current time in a specific time zone
function displayTimeZone(timeZone) {
    const options = { timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const time = new Date().toLocaleTimeString('en-US', options);

}