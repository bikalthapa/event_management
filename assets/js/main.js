class CustomModal {
    constructor(modalId) {
        this.modalElement = document.getElementById(modalId);
        this.modal = new bootstrap.Modal(this.modalElement);
        this.titleElement = this.modalElement.querySelector('#modal_title');
        this.bodyElement = this.modalElement.querySelector('#modal_body');
    }

    setTitle(title) {
        this.titleElement.innerHTML = title;
    }

    setBody(content) {
        this.bodyElement.innerHTML = content;
    }

    setFooter(content) {
        // Remove existing footer if present
        const oldFooter = this.modalElement.querySelector('.modal-footer');
        if (oldFooter) oldFooter.remove();

        if (content && content.trim() !== '') {
            const footer = document.createElement('div');
            footer.classList.add('modal-footer');
            footer.innerHTML = content;
            this.modalElement.querySelector('.modal-content').appendChild(footer);
        }
    }

    show() {
        this.modal.show();
    }

    hide() {
        this.modal.hide();
    }
}

class DataFetcher {
    constructor(url, containerId) {
        this.url = url;
        this.container = document.getElementById(containerId);
    }

    // Method to set the lazy loading template (spinner, etc.)
    setLazy(lazyLoadingTemplate) {
        this.container.innerHTML = lazyLoadingTemplate;
    }

    // Method to fetch data and load it with a custom lazy loading design
    fetchData(onSuccess, onError) {
        // Fetch the data from the provided URL
        fetch(this.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Call the success callback with the fetched data
                if (typeof onSuccess === 'function') {
                    onSuccess(data);
                }
            })
            .catch(error => {
                // In case of an error, show a failure message
                this.container.innerHTML = `<p class="text-danger text-center">Failed to load content.</p>`;
                if (typeof onError === 'function') {
                    onError(error);
                }
            });
    }
}



// Animate On Scroll initialization
AOS.init();

// Toggling between dark and light mode
document.addEventListener("DOMContentLoaded", () => {
    let theme_toggler = document.getElementById("theme_toggler");
    let img = document.getElementById("theme_icon");

    // Detect user's preferred scheme on first load
    let userPref = localStorage.getItem("theme");
    if (!userPref) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        userPref = prefersDark ? "dark" : "light";
    }

    applyTheme(userPref);

    theme_toggler.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        if (theme === "light") {
            img.src = "assets/icons/dark_mode.svg";
            document.body.classList.add("light-mode");
        } else {
            img.src = "assets/icons/light_mode.svg";
            document.body.classList.remove("light-mode");
        }
    }
});




// Footer data
let company_data = {
    name: "Something",
    phone: 9808166785,
    email: "bijayashani939393@gmail.com",
    address: "Pathri, Morang Nepal",
    links: [
        {
            logo_path : "./assets/icons/facebook.png",
            link_path : "https://www.facebook.com/bijay.sahani.1272"
        },
        {
            logo_path : "./assets/icons/insta.png",
            link_path : ""
        },
        {
            logo_path : "./assets/icons/twitter.png",
            link_path : ""
        },
        {
            logo_path : "./assets/icons/whatsapp.png",
            link_path : ""
        }
    ]
}
document.getElementById("phoneNumber").innerHTML = company_data.phone;
document.getElementById("email").innerHTML = company_data.email;
document.getElementById("address").innerHTML = company_data.address;
let social_div = document.getElementById("social_links");
social_div.innerHTML = "";
company_data.links.forEach((val, indx)=>{
    if(val.link_path!=""){
        social_div.innerHTML += `
                        <a href="${val.link_path}" target="_blank">
                            <img src="${val.logo_path}" alt="social_media">
                        </a>`;
    }else{
        social_div.innerHTML += `
        <a>
            <img src="${val.logo_path}" alt="social_media">
        </a>`;
    }
})

