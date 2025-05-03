const portfolioModal = new CustomModal('portfolioModal');
var servicesData;




// Define a custom render function for services
const renderServices = (services) => {
    const container = document.getElementById('servicesContainer');
    servicesData = services;
    container.innerHTML = "";
    services.forEach((service, indx) => {
        servicesData[indx].id = indx;
        const serviceCard = `
            <div class="col">
                <div class="image-box">
                    <img src="${service.imgSrc}" class="img-fluid" loading="lazy" alt="${service.title}">
                    <div class="overlay" data-bs-toggle="modal" data-bs-target="#portfolioModal" onclick="openModal(${service.id})">
                        <h3>${service.title}</h3>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += serviceCard;
    });
};

// Function to open modal and populate it with service data
function openModal(serviceId) {
    portfolioModal.setTitle(servicesData[serviceId].title);
    portfolioModal.setBody(`<img src="${servicesData[serviceId].imgSrc}" style="width:100%;"><br><br>`+servicesData[serviceId].shortDescription);
    portfolioModal.setFooter('');
    portfolioModal.show();
}


// Create an instance of DataFetcher for services
const serviceFetcher = new DataFetcher('assets/data/service.json', 'servicesContainer');
// Fetch the data with success and error handling
serviceFetcher.fetchData(
    renderServices,  // This function will render the services after data is fetched
    (error) => {
        console.error('Error loading services:', error);
    }
);
