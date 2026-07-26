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
    // 2. Services Page Selection & View Controller
    // ----------------------------------------------------------------------
    const initialCategoriesView = document.getElementById('initialCategoriesView');
    const categoryNavTop = document.getElementById('categoryNavTop');
    const backToCategoriesBtn = document.getElementById('backToCategoriesBtn');
    const categorySelectCards = document.querySelectorAll('.category-select-card[data-target-part]');
    const categoryGroups = document.querySelectorAll('.category-view-group');

    function showAllCategories() {
        if (initialCategoriesView) initialCategoriesView.style.display = 'block';
        if (categoryNavTop) categoryNavTop.style.display = 'none';

        categoryGroups.forEach(group => group.style.display = 'none');

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

        // Update URL parameter without page reload
        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?part=' + partId;
            window.history.pushState({path: newUrl}, '', newUrl);
        }

        // Scroll to active category section top
        const targetSec = document.getElementById(partId);
        if (targetSec) {
            const offsetTop = targetSec.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }

    // Landing view card clicks
    categorySelectCards.forEach(card => {
        card.addEventListener('click', function() {
            const partId = this.getAttribute('data-target-part');
            showSelectedCategory(partId);
        });
    });

    if (backToCategoriesBtn) {
        backToCategoriesBtn.addEventListener('click', function() {
            showAllCategories();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Check URL query parameters for Services page (?part=part-1)
    const urlParams = new URLSearchParams(window.location.search);
    const initialPart = urlParams.get('part');
    if (initialPart && categoryGroups.length > 0) {
        showSelectedCategory(initialPart);
    }

    // ----------------------------------------------------------------------
    // 3. IBC & Valuation Page Selection & View Controller
    // ----------------------------------------------------------------------
    const initialIbcView = document.getElementById('initialIbcView');
    const ibcNavTop = document.getElementById('ibcNavTop');
    const backToIbcCategoriesBtn = document.getElementById('backToIbcCategoriesBtn');
    const ibcSelectCards = document.querySelectorAll('.category-select-card[data-target-ibc]');
    const ibcGroups = document.querySelectorAll('.ibc-view-group');

    function showAllIbcSections() {
        if (initialIbcView) initialIbcView.style.display = 'block';
        if (ibcNavTop) ibcNavTop.style.display = 'none';

        ibcGroups.forEach(group => group.style.display = 'none');

        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({path: newUrl}, '', newUrl);
        }
    }

    function showSelectedIbcSection(secId) {
        if (!secId || secId === 'all') {
            showAllIbcSections();
            return;
        }

        if (initialIbcView) initialIbcView.style.display = 'none';
        if (ibcNavTop) ibcNavTop.style.display = 'block';

        // Display ONLY the selected IBC section
        ibcGroups.forEach(group => {
            if (group.getAttribute('id') === secId) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        });

        // Update URL parameter without page reload
        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?sec=' + secId;
            window.history.pushState({path: newUrl}, '', newUrl);
        }

        // Scroll to active section top
        const targetSec = document.getElementById(secId);
        if (targetSec) {
            const offsetTop = targetSec.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }

    // Landing view card clicks for IBC
    ibcSelectCards.forEach(card => {
        card.addEventListener('click', function() {
            const secId = this.getAttribute('data-target-ibc');
            showSelectedIbcSection(secId);
        });
    });

    if (backToIbcCategoriesBtn) {
        backToIbcCategoriesBtn.addEventListener('click', function() {
            showAllIbcSections();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Check URL query parameters for IBC page (?sec=voluntary-liquidation)
    const initialSec = urlParams.get('sec');
    if (initialSec && ibcGroups.length > 0) {
        showSelectedIbcSection(initialSec);
    }

    // ----------------------------------------------------------------------
    // 4. Updates Page Selection & View Controller
    // ----------------------------------------------------------------------
    const initialUpdatesView = document.getElementById('initialUpdatesView');
    const updatesNavTop = document.getElementById('updatesNavTop');
    const backToUpdatesCategoriesBtn = document.getElementById('backToUpdatesCategoriesBtn');
    const updateSelectCards = document.querySelectorAll('.category-select-card[data-target-update]');
    const updatesFeed = document.getElementById('updatesFeed');
    const updateCards = document.querySelectorAll('.update-card');

    function showAllUpdatesTopics() {
        if (initialUpdatesView) initialUpdatesView.style.display = 'block';
        if (updatesNavTop) updatesNavTop.style.display = 'none';
        if (updatesFeed) updatesFeed.style.display = 'none';

        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({path: newUrl}, '', newUrl);
        }
    }

    function showSelectedUpdateTopic(catId) {
        if (!catId || catId === 'all') {
            showAllUpdatesTopics();
            return;
        }

        if (initialUpdatesView) initialUpdatesView.style.display = 'none';
        if (updatesNavTop) updatesNavTop.style.display = 'block';
        if (updatesFeed) updatesFeed.style.display = 'grid';

        updateCards.forEach(card => {
            if (card.getAttribute('data-category') === catId) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?cat=' + catId;
            window.history.pushState({path: newUrl}, '', newUrl);
        }

        if (updatesFeed) {
            const offsetTop = updatesFeed.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }

    updateSelectCards.forEach(card => {
        card.addEventListener('click', function() {
            const catId = this.getAttribute('data-target-update');
            showSelectedUpdateTopic(catId);
        });
    });

    if (backToUpdatesCategoriesBtn) {
        backToUpdatesCategoriesBtn.addEventListener('click', function() {
            showAllUpdatesTopics();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Check URL query parameters for Updates page (?cat=mca)
    const initialCat = urlParams.get('cat');
    if (initialCat && updateCards.length > 0) {
        showSelectedUpdateTopic(initialCat);
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
    // 5. Service Cards Read More Details Toggle
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
    // 6. Floating Social FAB Toggle
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
    // 7. WhatsApp Quick Enquiry Form Modal Engine
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
    // 8. Back to Top Button
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
