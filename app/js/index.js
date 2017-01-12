const themeButtons = document.querySelectorAll('.bx--theme-switcher svg');
const lightIcon = document.querySelector('[data-theme="light"]');
const darkIcon = document.querySelector('[data-theme="dark"]');
const body = document.querySelector('body');

function toggleTheme(e) {
  const icon = e.currentTarget;
  const theme = e.currentTarget.dataset.theme;

  if (theme === 'light') {
    darkIcon.classList.remove('bx--theme-switcher__icon--active');
    icon.classList.add('bx--theme-switcher__icon--active');
    body.classList.add('bx--global-light-ui');
  } else {
    lightIcon.classList.remove('bx--theme-switcher__icon--active');
    icon.classList.add('bx--theme-switcher__icon--active');
    body.classList.remove('bx--global-light-ui');
  }
}

if (themeButtons.length > 0) {
  themeButtons.forEach(icon => {
    icon.addEventListener('click', toggleTheme);
  })
}
