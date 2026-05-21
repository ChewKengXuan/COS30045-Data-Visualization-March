document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const logo = document.getElementById('logoHome');

    // Function to show page
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }
});