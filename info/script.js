document.addEventListener('DOMContentLoaded', () => {
    // === ELEMEN DOM ===
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = navLinks.querySelectorAll('a');
    const sections = document.querySelectorAll('section');

    // === FUNGSI MENU MOBILE ===
    const toggleMobileMenu = () => {
        const isMenuOpen = navLinks.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', isMenuOpen);
        mobileMenuToggle.setAttribute('aria-label', isMenuOpen ? 'Tutup Menu' : 'Buka Menu');
    };

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Menutup menu mobile setelah link diklik
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // === EFEK NAVBAR SAAT SCROLL ===
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);

    // === PENANDA NAVIGASI AKTIF (MENGGUNAKAN INTERSECTION OBSERVER) ===
    // PERBAIKAN: Jauh lebih efisien daripada event 'scroll'
    const observerOptions = {
        root: null, // relative to viewport
        rootMargin: '0px',
        threshold: 0.6 // 60% dari section harus terlihat
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === currentSectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
