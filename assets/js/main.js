AOS.init();

let theme_toggler = document.getElementById("theme_toggler");
let img = document.getElementById("theme_icon");
let curr_theme = "dark";

theme_toggler.addEventListener("click", () => {
    if (curr_theme == "dark") {
        curr_theme = "light";
        img.src = "assets/icons/dark_mode.svg";
        document.body.classList.add("light-mode");
    } else {
        curr_theme = "dark";
        img.src = "assets/icons/light_mode.svg";
        document.body.classList.remove("light-mode");
    }
});