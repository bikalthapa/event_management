let modal_body = document.getElementById("modal_body");
let portfolioData;
fetch('assets/data/portfolio.json') // Correct relative path from the HTML file
    // ${item.description.map(desc => `<b>${desc}</b><br><br>`).join('')}
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        portfolioData = data.portfolio; // Access the "portfolio" array in the JSON
        if (!Array.isArray(portfolioData)) {
            throw new Error('Invalid data format: Expected an array');
        }

        const container = document.querySelector('.portfolio_section'); // Ensure this element exists in your HTML
        if (!container) {
            throw new Error('Portfolio section element not found in the DOM');
        }

        portfolioData.forEach((item, indx) => {
            // Use template literals to create the card HTML
            const cardHTML = `
                <div class="col">
                `+card_design(item,indx, true)+`
                </div>
            `;


            // Append the card to the container
            container.innerHTML += cardHTML;
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function card_design(item, indx, btnStatus) {
    return `
    <div class="card h-100">
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
            <h3 class="card-title portfolio_title">${item.title}</h3>
            <p class="portfolio_date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>&nbsp;&nbsp; ${item.date}
            </p>
            <p class="portfolio_location">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>&nbsp;&nbsp; ${item.location}
            </p>
            ${btnStatus === false ? `<p class="card-text">${item.description.map(desc => `<b>${desc}</b><br><br>`).join('')}</p`:``}
            ${btnStatus === true ? `<button onclick="read_portfolio(${indx})" class="CTA_solid w-100 mt-3" data-bs-toggle="modal" data-bs-target="#portfolioModal">Read More</button>` : ''}
        </div>
    </div>
`;

}
function read_portfolio(indx) {
    modal_body.innerHTML = card_design(portfolioData[indx],indx,false);
}