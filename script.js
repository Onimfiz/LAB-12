function createStars(rating) {
    let stars = '';
    for (let i = 0; i < Math.floor(rating); i++) {
        stars += '⭐';
    }
    return stars;
}

function createCoffeeCard(coffee) {
    const card = document.createElement('div');
    card.className = 'coffee-card';

    card.innerHTML = `
                <div style="position: relative;">
                    <img src="${coffee.image}" alt="${coffee.name}" class="card-image">
                    ${coffee.popular ? '<div class="popular-badge">Popular</div>' : ''}
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-title">${coffee.name}</h3>
                        <div class="card-price">${coffee.price}</div>
                    </div>
                    <div class="card-rating">
                        ${coffee.rating ? `
                            <span class="stars">${createStars(coffee.rating)}</span>
                            <span class="rating-text">${coffee.rating}</span>
                            <span class="votes">(${coffee.votes} votes)</span>
                        ` : '<span class="no-ratings">✖️ No ratings</span>'}
                        ${!coffee.available ? '<span class="sold-out">Sold out</span>' : ''}
                    </div>
                </div>
            `;

    return card;
}

function loadCoffees() {
    const coffeeGrid = document.getElementById('coffeeGrid');

    fetch('https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(coffee => {
                const card = createCoffeeCard(coffee);
                coffeeGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadCoffees);