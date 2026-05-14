document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    // --- Vanilla JS SPA Routing ---
    const pages = document.querySelectorAll('.page-section');
    
    function navigateTo(targetId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Remove active class from nav items
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        } else {
            // Default to home if not found
            document.getElementById('home').classList.add('active');
            targetId = 'home';
        }

        // Set active class on corresponding nav item
        const activeNavs = document.querySelectorAll(`.nav-item[data-target="${targetId}"]`);
        activeNavs.forEach(nav => nav.classList.add('active'));

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }

        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update URL hash without jumping
        history.pushState(null, null, `#${targetId}`);
    }

    // Handle clicks on internal links
    document.querySelectorAll('a[data-target]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            navigateTo(targetId);
        });
    });

    // Handle back/forward browser buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'home';
        navigateTo(hash);
    });

    // Initial load check
    const initialHash = window.location.hash.substring(1) || 'home';
    navigateTo(initialHash);


    // --- Certificate Modal ---
    const modal = document.getElementById('cert-modal');
    const closeBtn = document.querySelector('.close-modal');
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');
    const modalTitle = document.getElementById('modal-title');

    viewCertBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certName = btn.getAttribute('data-cert');
            modalTitle.textContent = `${certName} Certificate`;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});
