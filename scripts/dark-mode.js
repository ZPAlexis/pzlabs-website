let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

const body = document.body;
const toggleBtn = document.getElementById('dark-mode-toggle');

applyMode();

toggleBtn.addEventListener('click', () => {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
  applyMode();
});

function applyMode() {
  if (darkMode) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}