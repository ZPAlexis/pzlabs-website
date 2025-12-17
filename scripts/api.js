const SERVER_URL = 'https://api.acoelho.dev';

export async function recordCoinCollected(coinName) {
    const eventData = {
        eventAction: coinName
    };

    try {
        const response = await fetch(`${SERVER_URL}/api/record-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(eventData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Event recorded:', result.message);
        } else {
            console.error('Failed to record event:', result.message);
        }

    } catch (error) {
        console.error('Network or fetch error:', error);
    }
}

async function fetchAndDisplayMetrics() {
    const metricsContainer = document.getElementById('metrics-container');
    const statusMessage = document.querySelector('p');
    
    // 1. Show a loading state
    statusMessage.textContent = 'Fetching the latest data...';
    metricsContainer.style.display = 'none';

    try {
        // 2. Perform the GET request to the API endpoint
        const response = await fetch(`${SERVER_URL}/api/metrics/coins`, {
            method: 'GET',
            headers: {
                // No 'Content-Type': 'application/json' needed for GET unless sending a body,
                // but the header 'Accept: application/json' could be used.
            }
        });

        // Check for HTTP errors (4xx or 5xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        
        // Ensure the API call was successful based on the JSON body
        if (jsonResponse.status !== 'success' || !jsonResponse.data) {
            throw new Error('API reported a non-success status.');
        }

        const data = jsonResponse.data;

        // 3. Update the HTML elements with the received data
        document.getElementById('total-coins').textContent = data.totalCoinsCollected;
        document.getElementById('total-users-min-one').textContent = data.totalUsersWithCoins;
        document.getElementById('total-users-all-three').textContent = data.totalUsersWithAllThreeCoins;

        // 4. Update the display status
        statusMessage.textContent = 'Data successfully loaded.';
        metricsContainer.style.display = 'block';

    } catch (error) {
        // 5. Handle any errors (network, parsing, API failure)
        console.error('Error fetching statistics:', error);
        statusMessage.textContent = 'Error loading statistics. Please try again.';
        metricsContainer.style.display = 'none';
    }
}