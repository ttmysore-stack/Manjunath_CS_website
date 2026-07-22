document.addEventListener('DOMContentLoaded', function() {
    // Glitch-Free Carousel Transition Engine
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('#sliderDots .dot');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let slideInterval;
    const slideDelay = 4000;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.remove('active-slide');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    function startTimer() {
        stopTimer();
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, slideDelay);
    }

    function stopTimer() {
        if (slideInterval) clearInterval(slideInterval);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            goToSlide(idx);
            startTimer();
        });
    });

    const sliderWrapper = document.querySelector('.hero-slider-wrapper');
    if(sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopTimer);
        sliderWrapper.addEventListener('mouseleave', startTimer);
    }

    startTimer();

    // Direct Home Link and Logo Redirection Scroll to Absolute Top
    const logoLink = document.getElementById('logoLink');
    if(logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile Hamburger Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active-mobile');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.classList.remove('active-mobile');
                if (link.getAttribute('href') === '#top-anchor') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
});
