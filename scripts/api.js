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
    try {
        const response = await fetch(`${SERVER_URL}/api/metrics/coins`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const jsonResponse = await response.json();
        if (jsonResponse.status !== 'success' || !jsonResponse.data) return;

        const { totalCoinsCollected, totalUsersWithAllThreeCoins, totalUsersWithCoins } = jsonResponse.data;
        const formattedCoins = new Intl.NumberFormat().format(totalCoinsCollected);

        const numberContainers = document.querySelectorAll('.js-analyics-number');
        const coinDisplays = document.querySelectorAll('.api-total-coins');
        
        coinDisplays.forEach(el => {
            el.textContent = formattedCoins;
        });

        const digitCount = totalCoinsCollected.toString().length;

        numberContainers.forEach(container => {
            container.classList.remove('long-number', 'huge-number');

            if (digitCount >= 7) {
                container.classList.add('huge-number'); // 1,000,000+
            } else if (digitCount >= 4) {
                container.classList.add('long-number'); // 1,000 to 999,999
            }
        });

        const percentageEl = document.getElementById('api-total-users-all-three');
        if (percentageEl && totalUsersWithCoins > 0) {
            const percentage = (totalUsersWithAllThreeCoins / totalUsersWithCoins) * 100;
            percentageEl.textContent = percentage.toFixed(1);
        }

    } catch (error) {
        console.error('Error fetching statistics:', error);
    }
}

//fetchAndDisplayMetrics();