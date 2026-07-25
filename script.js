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

/* ==========================================================================
   Services Page Interactive Engine (Search, Filter Tabs, Back to Top)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // Category Tabs Filter Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const partSections = document.querySelectorAll('.part-section');
    const serviceCards = document.querySelectorAll('.service-card');
    const searchInput = document.getElementById('serviceSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const noResultsMsg = document.getElementById('noResultsMsg');
    const backToTopBtn = document.getElementById('backToTopBtn');

    let activeCategory = 'all';

    function filterServices() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        let totalVisible = 0;

        if (clearSearchBtn) {
            clearSearchBtn.style.display = query.length > 0 ? 'flex' : 'none';
        }

        partSections.forEach(section => {
            const sectionPartId = section.getAttribute('id');
            const matchesCategory = (activeCategory === 'all' || activeCategory === sectionPartId);
            let visibleInSection = 0;

            const cards = section.querySelectorAll('.service-card');
            cards.forEach(card => {
                const cardContent = card.textContent.toLowerCase();
                const matchesSearch = query === '' || cardContent.includes(query);

                if (matchesCategory && matchesSearch) {
                    card.style.display = 'flex';
                    visibleInSection++;
                    totalVisible++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (matchesCategory && (visibleInSection > 0 || query === '')) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        if (noResultsMsg) {
            noResultsMsg.style.display = totalVisible === 0 ? 'block' : 'none';
        }
    }

    // Tab Button Event Listeners
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active-tab'));
                this.classList.add('active-tab');
                activeCategory = this.getAttribute('data-target');
                filterServices();
            });
        });
    }

    // Search Input Event Listener
    if (searchInput) {
        searchInput.addEventListener('input', filterServices);
    }

    // Clear Search Button
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            filterServices();
            if (searchInput) searchInput.focus();
        });
    }

    // Global reset search function
    window.resetSearch = function() {
        if (searchInput) searchInput.value = '';
        activeCategory = 'all';
        tabBtns.forEach(b => {
            b.classList.toggle('active-tab', b.getAttribute('data-target') === 'all');
        });
        filterServices();
    };

    // Back to Top Button Toggle
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show-top-btn');
            } else {
                backToTopBtn.classList.remove('show-top-btn');
            }
        });

        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Check for hash in URL on page load (e.g. services.html#part-2)
    if (window.location.hash) {
        const targetHash = window.location.hash.substring(1);
        if (['part-1', 'part-2', 'part-3', 'part-5'].includes(targetHash)) {
            const targetTab = document.querySelector(`.tab-btn[data-target="${targetHash}"]`);
            if (targetTab) {
                targetTab.click();
                const targetElement = document.getElementById(targetHash);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                }
            }
        }
    }
});

/* ==========================================================================
   Social Media Floating Action Button (FAB) Toggle Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    const socialFab = document.getElementById('socialFab');
    const fabToggleBtn = document.getElementById('fabToggleBtn');

    if (fabToggleBtn && socialFab) {
        fabToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            socialFab.classList.toggle('fab-open');
        });

        // Close FAB when clicking outside
        document.addEventListener('click', function(e) {
            if (!socialFab.contains(e.target)) {
                socialFab.classList.remove('fab-open');
            }
        });
    }
});
