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
    // 2. Services Page - Category & Single Service View Controller
    // ----------------------------------------------------------------------
    const initialCategoriesView = document.getElementById('initialCategoriesView');
    const categoryNavTop = document.getElementById('categoryNavTop');
    const backToCategoriesBtn = document.getElementById('backToCategoriesBtn');
    const categorySelectCards = document.querySelectorAll('.category-select-card[data-target-part]');
    const categoryGroups = document.querySelectorAll('.category-view-group');
    const subServiceDropdowns = document.querySelectorAll('.sub-service-dropdown');

    function showAllCategories() {
        if (initialCategoriesView) initialCategoriesView.style.display = 'block';
        if (categoryNavTop) categoryNavTop.style.display = 'none';
        categoryGroups.forEach(function(group) { group.style.display = 'none'; });

        if (window.history.pushState) {
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({path: newUrl}, '', newUrl);
        }
    }

    function showSelectedCategory(partId, serviceId) {
        if (!partId || partId === 'all') {
            showAllCategories();
            return;
        }

        if (initialCategoriesView) initialCategoriesView.style.display = 'none';
        if (categoryNavTop) categoryNavTop.style.display = 'block';

        // Show only the selected part group
        categoryGroups.forEach(function(group) {
            group.style.display = (group.getAttribute('id') === partId) ? 'block' : 'none';
        });

        // Now handle single service filtering within the active part
        var activeGroup = document.getElementById(partId);
        if (activeGroup) {
            var allCards = activeGroup.querySelectorAll('.single-service-card');
            var selectorBox = activeGroup.querySelector('.sub-service-selector-box');

            if (serviceId && serviceId !== 'all') {
                // HIDE all service cards, show ONLY the selected one
                allCards.forEach(function(card) {
                    card.style.display = (card.getAttribute('id') === serviceId) ? 'block' : 'none';
                });

                // HIDE the dropdown selector since a service is already selected
                if (selectorBox) selectorBox.style.display = 'none';
            } else {
                // Show ALL service cards in this part
                allCards.forEach(function(card) {
                    card.style.display = 'block';
                });

                // Show the dropdown selector for browsing
                if (selectorBox) selectorBox.style.display = 'flex';

                // Reset the dropdown
                var dropdown = activeGroup.querySelector('.sub-service-dropdown');
                if (dropdown) dropdown.value = 'all';
            }
        }

        // Update URL
        if (window.history.pushState) {
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?part=' + partId;
            if (serviceId && serviceId !== 'all') newUrl += '&service=' + serviceId;
            window.history.pushState({path: newUrl}, '', newUrl);
        }

        // Scroll to top of the content
        if (serviceId && serviceId !== 'all') {
            var targetCard = document.getElementById(serviceId);
            if (targetCard) {
                var offsetTop = targetCard.offsetTop - 90;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        } else {
            var targetSec = document.getElementById(partId);
            if (targetSec) {
                var offsetTop = targetSec.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
    }

    // Landing view card clicks
    categorySelectCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var partId = this.getAttribute('data-target-part');
            showSelectedCategory(partId, null);
        });
    });

    if (backToCategoriesBtn) {
        backToCategoriesBtn.addEventListener('click', function() {
            showAllCategories();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Sub-Service Dropdown change - show ONLY the selected service
    subServiceDropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('change', function() {
            var selectedServiceId = this.value;
            var partId = this.getAttribute('data-part');
            showSelectedCategory(partId, selectedServiceId);
        });
    });

    // Check URL query parameters on page load
    var urlParams = new URLSearchParams(window.location.search);
    var initialPart = urlParams.get('part');
    var initialService = urlParams.get('service');

    if (initialPart && categoryGroups.length > 0) {
        showSelectedCategory(initialPart, initialService);
    }

    // ----------------------------------------------------------------------
    // 3. IBC & Valuation Page Selection & View Controller
    // ----------------------------------------------------------------------
    var initialIbcView = document.getElementById('initialIbcView');
    var ibcNavTop = document.getElementById('ibcNavTop');
    var backToIbcCategoriesBtn = document.getElementById('backToIbcCategoriesBtn');
    var ibcSelectCards = document.querySelectorAll('.category-select-card[data-target-ibc]');
    var ibcGroups = document.querySelectorAll('.ibc-view-group');

    function showAllIbcSections() {
        if (initialIbcView) initialIbcView.style.display = 'block';
        if (ibcNavTop) ibcNavTop.style.display = 'none';
        ibcGroups.forEach(function(group) { group.style.display = 'none'; });

        if (window.history.pushState) {
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
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

        ibcGroups.forEach(function(group) {
            group.style.display = (group.getAttribute('id') === secId) ? 'block' : 'none';
        });

        if (window.history.pushState) {
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?sec=' + secId;
            window.history.pushState({path: newUrl}, '', newUrl);
        }

        var targetSec = document.getElementById(secId);
        if (targetSec) {
            var offsetTop = targetSec.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }

    ibcSelectCards.forEach(function(card) {
        card.addEventListener('click', function() {
            showSelectedIbcSection(this.getAttribute('data-target-ibc'));
        });
    });

    if (backToIbcCategoriesBtn) {
        backToIbcCategoriesBtn.addEventListener('click', function() {
            showAllIbcSections();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    var initialSec = urlParams.get('sec');
    if (initialSec && ibcGroups.length > 0) {
        showSelectedIbcSection(initialSec);
    }

    // ----------------------------------------------------------------------
    // 4. Updates Page Selection & View Controller
    // ----------------------------------------------------------------------
    var initialUpdatesView = document.getElementById('initialUpdatesView');
    var updatesNavTop = document.getElementById('updatesNavTop');
    var backToUpdatesCategoriesBtn = document.getElementById('backToUpdatesCategoriesBtn');
    var updateSelectCards = document.querySelectorAll('.category-select-card[data-target-update]');
    var updatesFeed = document.getElementById('updatesFeed');
    var updateCards = document.querySelectorAll('.update-card');

    function showAllUpdatesTopics() {
        if (initialUpdatesView) initialUpdatesView.style.display = 'block';
        if (updatesNavTop) updatesNavTop.style.display = 'none';
        if (updatesFeed) updatesFeed.style.display = 'none';

        if (window.history.pushState) {
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
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

        updateCards.forEach(function(card) {
            card.style.display = (card.getAttribute('data-category') === catId) ? 'flex' : 'none';
        });

        if (window.history.pushState) {
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?cat=' + catId;
            window.history.pushState({path: newUrl}, '', newUrl);
        }

        if (updatesFeed) {
            var offsetTop = updatesFeed.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }

    updateSelectCards.forEach(function(card) {
        card.addEventListener('click', function() {
            showSelectedUpdateTopic(this.getAttribute('data-target-update'));
        });
    });

    if (backToUpdatesCategoriesBtn) {
        backToUpdatesCategoriesBtn.addEventListener('click', function() {
            showAllUpdatesTopics();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    var initialCat = urlParams.get('cat');
    if (initialCat && updateCards.length > 0) {
        showSelectedUpdateTopic(initialCat);
    }

    // Updates Read More Toggle
    var readMoreUpdateBtns = document.querySelectorAll('.read-more-update-btn');
    readMoreUpdateBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            var details = document.getElementById(targetId);
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
    var socialFab = document.getElementById('socialFab');
    var fabToggleBtn = document.getElementById('fabToggleBtn');

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
    var whatsappModal = document.getElementById('whatsappModal');
    var closeModalBtn = document.getElementById('closeModalBtn');
    var whatsappForm = document.getElementById('whatsappForm');

    window.openWhatsAppModal = function(preselectedService) {
        if (whatsappModal) {
            if (preselectedService) {
                var waServiceSelect = document.getElementById('waService');
                if (waServiceSelect) waServiceSelect.value = preselectedService;
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
            var name = document.getElementById('waName').value.trim();
            var mobile = document.getElementById('waMobile').value.trim();
            var email = document.getElementById('waEmail').value.trim();
            var service = document.getElementById('waService').value;
            var message = document.getElementById('waMessage').value.trim();

            var fullMsg = 'Hello Sir, I visited your website and would like assistance regarding ' + service + '.\n\n';
            fullMsg += '*Client Details:*\n';
            fullMsg += '• Name: ' + name + '\n';
            fullMsg += '• Mobile: ' + mobile + '\n';
            if (email) fullMsg += '• Email: ' + email + '\n';
            if (message) fullMsg += '• Enquiry: ' + message + '\n';

            var encodedUrl = 'https://wa.me/919964307595?text=' + encodeURIComponent(fullMsg);
            window.open(encodedUrl, '_blank');

            whatsappModal.classList.remove('active-modal');
            whatsappForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 7. Back to Top Button
    // ----------------------------------------------------------------------
    var backToTopBtn = document.getElementById('backToTopBtn');
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
