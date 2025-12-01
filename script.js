// Acces the DOM
const themeSwitch = document.getElementById('switch');
const root = document.documentElement;

// 1. Check if there is a saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
  themeSwitch.checked = true;
} else if (savedTheme === 'light') {
  root.setAttribute('data-theme', 'light');
  themeSwitch.checked = false;
} else {
  root.setAttribute('data-theme', 'light');
  themeSwitch.checked = false;
}

// 2. Listen the checkebox of toggle and change the theme
themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});
