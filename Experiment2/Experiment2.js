const themeToggler = document.querySelector('.theme-toggler');
const dashboardContainer = document.querySelector('.dashboard-container');

// Function to set the theme on the container, in localStorage, and update the icon
const setTheme = (theme) => {
    dashboardContainer.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    
    const lightIcon = themeToggler.querySelector('span:first-child');
    const darkIcon = themeToggler.querySelector('span:last-child');

    if (theme === 'dark') {
        darkIcon.classList.add('active');
        lightIcon.classList.remove('active');
    } else {
        lightIcon.classList.add('active');
        darkIcon.classList.remove('active');
    }
};

// Event listener for the theme toggler button
themeToggler.addEventListener('click', () => {
    const currentTheme = dashboardContainer.dataset.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Load the saved theme from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});