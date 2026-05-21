document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const logo = document.getElementById('logoHome');

    // Handle navigation link clicks if nav exists
    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const pageId = this.getAttribute('data-page');
                showPage(pageId);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Handle logo click if logo exists
    if (logo) {
        logo.addEventListener('click', function() {
            showPage('home');
            navLinks.forEach(l => l.classList.remove('active'));
            const homeLink = document.querySelector('[data-page="home"]');
            if (homeLink) homeLink.classList.add('active');
        });
    }

    // Function to show page
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }
});