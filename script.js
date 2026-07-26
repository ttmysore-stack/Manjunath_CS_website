/* ==========================================================================
   CS Manjunath S - Master JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ----------------------------------------------------------------------
    // 1. Mobile Navigation Menu Toggle
    // ----------------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });
    }

    // ----------------------------------------------------------------------
    // 2. Services Page Category Selection & View Controller
    // ----------------------------------------------------------------------
    const initialCategoriesView = document.getElementById('initialCategoriesView');
    const categoryServicesWrapper = document.getElementById('categoryServicesWrapper');
    const categoryNavTop = document.getElementById('categoryNavTop');
    const backToCategoriesBtn = document.getElementById('backToCategoriesBtn');
    const categorySelectCards = document.querySelectorAll('.category-select-card');
    const categoryTabs = document.querySelectorAll('.cat-tab');
    const categoryGroups = document.querySelectorAll('.category-view-group');

    function showAllCategories() {
        if (initialCategoriesView) initialCategoriesView.style.display = 'block';
        if (categoryNavTop) categoryNavTop.style.display = 'none';

        categoryGroups.forEach(group => group.style.display = 'none');
        categoryTabs.forEach(tab => {
            tab.classList.remove('active-subnav');
            if (tab.getAttribute('data-part') === 'all') {
                tab.classList.add('active-subnav');
            }
        });

        // Update URL query string cleanly
        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({path: newUrl}, '', newUrl);
        }
    }

    function showSelectedCategory(partId) {
        if (!partId || partId === 'all') {
            showAllCategories();
            return;
        }

        if (initialCategoriesView) initialCategoriesView.style.display = 'none';
        if (categoryNavTop) categoryNavTop.style.display = 'block';

        // Display ONLY the selected category group
        categoryGroups.forEach(group => {
            if (group.getAttribute('id') === partId) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        });

        // Highlight active category tab
        categoryTabs.forEach(tab => {
            tab.classList.remove('active-subnav');
            if (tab.getAttribute('data-part') === partId) {
                tab.classList.add('active-subnav');
            }
        });

        // Update URL parameter without full page reload
        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?part=' + partId;
            window.history.pushState({path: newUrl}, '', newUrl);
        }

        // Scroll to category header
        const targetSec = document.getElementById(partId);
        if (targetSec) {
            const offsetTop = targetSec.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }

    // Handle clicks on Category Select Cards (Landing view)
    categorySelectCards.forEach(card => {
        card.addEventListener('click', function() {
            const partId = this.getAttribute('data-target-part');
            showSelectedCategory(partId);
        });
    });

    // Handle clicks on Category Tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const partId = this.getAttribute('data-part');
            showSelectedCategory(partId);
        });
    });

    // Back to All Categories button
    if (backToCategoriesBtn) {
        backToCategoriesBtn.addEventListener('click', function() {
            showAllCategories();
            const subnavBar = document.getElementById('subnavBar');
            if (subnavBar) {
                window.scrollTo({ top: subnavBar.offsetTop - 70, behavior: 'smooth' });
            }
        });
    }

    // Check URL query parameters on initial page load (e.g. ?part=part-1)
    const urlParams = new URLSearchParams(window.location.search);
    const initialPart = urlParams.get('part');
    if (initialPart) {
        showSelectedCategory(initialPart);
    }

    // ----------------------------------------------------------------------
    // 3. Service Cards Read More Details Toggle
    // ----------------------------------------------------------------------
    const readMoreServiceBtns = document.querySelectorAll('.read-more-service-btn');
    readMoreServiceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const drawer = document.getElementById(targetId);
            if (drawer) {
                if (drawer.style.display === 'none' || drawer.style.display === '') {
                    drawer.style.display = 'block';
                    this.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Hide Details';
                } else {
                    drawer.style.display = 'none';
                    this.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Read More Details';
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // 4. Updates Page Filtering
    // ----------------------------------------------------------------------
    const updateTabs = document.querySelectorAll('.update-tab');
    const updateCards = document.querySelectorAll('.update-card');

    if (updateTabs.length > 0 && updateCards.length > 0) {
        updateTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                updateTabs.forEach(t => t.classList.remove('active-subnav'));
                this.classList.add('active-subnav');

                updateCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Updates Read More Toggle
    const readMoreUpdateBtns = document.querySelectorAll('.read-more-update-btn');
    readMoreUpdateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const details = document.getElementById(targetId);
            if (details) {
                if (details.style.display === 'none' || details.style.display === '') {
                    details.style.display = 'block';
                    this.innerHTML = '<i class="fa-solid fa-book-open-reader"></i> Show Less';
                } else {
                    details.style.display = 'none';
                    this.innerHTML = '<i class="fa-solid fa-book-open"></i> Read More';
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // 5. Floating Social FAB Toggle
    // ----------------------------------------------------------------------
    const socialFab = document.getElementById('socialFab');
    const fabToggleBtn = document.getElementById('fabToggleBtn');

    if (fabToggleBtn && socialFab) {
        fabToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            socialFab.classList.toggle('fab-open');
        });

        document.addEventListener('click', function(e) {
            if (!socialFab.contains(e.target)) {
                socialFab.classList.remove('fab-open');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. WhatsApp Quick Enquiry Form Modal Engine
    // ----------------------------------------------------------------------
    const whatsappModal = document.getElementById('whatsappModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const whatsappForm = document.getElementById('whatsappForm');

    window.openWhatsAppModal = function(preselectedService) {
        if (whatsappModal) {
            if (preselectedService) {
                const waServiceSelect = document.getElementById('waService');
                if (waServiceSelect) {
                    waServiceSelect.value = preselectedService;
                }
            }
            whatsappModal.classList.add('active-modal');
        }
    };

    if (closeModalBtn && whatsappModal) {
        closeModalBtn.addEventListener('click', function() {
            whatsappModal.classList.remove('active-modal');
        });

        whatsappModal.addEventListener('click', function(e) {
            if (e.target === whatsappModal) {
                whatsappModal.classList.remove('active-modal');
            }
        });
    }

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('waName').value.trim();
            const mobile = document.getElementById('waMobile').value.trim();
            const email = document.getElementById('waEmail').value.trim();
            const service = document.getElementById('waService').value;
            const message = document.getElementById('waMessage').value.trim();

            let fullMsg = `Hello Sir, I visited your website and would like assistance regarding ${service}.\n\n`;
            fullMsg += `*Client Details:*\n`;
            fullMsg += `• Name: ${name}\n`;
            fullMsg += `• Mobile: ${mobile}\n`;
            if (email) fullMsg += `• Email: ${email}\n`;
            if (message) fullMsg += `• Enquiry: ${message}\n`;

            const encodedUrl = `https://wa.me/919964307595?text=${encodeURIComponent(fullMsg)}`;
            window.open(encodedUrl, '_blank');

            whatsappModal.classList.remove('active-modal');
            whatsappForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 7. Back to Top Button
    // ----------------------------------------------------------------------
    const backToTopBtn = document.getElementById('backToTopBtn');
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
});
