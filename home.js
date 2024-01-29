const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});
