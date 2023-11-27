/* Light/Dark mode */

const themeButton = document.getElementById('theme-button');
let darkTheme = 'dark-theme';
let darkMode = localStorage.getItem("dark-mode");

function enableDarkMode() {
    document.body.classList.add(darkTheme);
    themeButton.classList.add('fa-moon');
    themeButton.classList.remove('fa-sun');
    localStorage.setItem("dark-mode", true);
};

function disableDarkMode() {
    document.body.classList.remove(darkTheme);
    themeButton.classList.add('fa-sun');
    themeButton.classList.remove('fa-moon');
    localStorage.setItem("dark-mode", false);
};

if (darkMode) {
    enableDarkMode();
}

themeButton.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode === 'false') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});