// script.js
document.getElementById('nav-toggle').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});
