/**
 * ============================================================
 * SCRIPT.JS — Personal Portfolio Landing Page
 * Premium interactions, animations, and performance optimizations
 * Versi perbaikan: loading screen anti-mentok, semua fitur lengkap
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initScrollReveal();
    initRippleEffect();
    initSmoothScroll();
    initPerformanceOptimizations();
});

/**
 * Loading Screen
 * - Tidak bergantung sepenuhnya pada window.load
 * - Fallback timeout 2,5 detik
 * - Transisi CSS yang halus
 */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    const hideLoader = () => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
        }
    };

    // Jika DOM sudah complete (semua resource sudah dimuat) → langsung sembunyikan
    if (document.readyState === 'complete') {
        // Delay kecil agar animasi spinner sempat terlihat
        setTimeout(hideLoader, 300);
    } else {
        // Cadangan: event load untuk kasus normal
        window.addEventListener('load', () => {
            setTimeout(hideLoader, 200);
        });
    }

    // Fallback timeout 2,5 detik – lebih cepat, anti-mentok
    setTimeout(hideLoader, 2500);
}

/**
 * Scroll Reveal Animation
 * Menggunakan Intersection Observer untuk animasi fade-up / scale
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.hero-profile, .section-header, .about-content, .project-card, .contact-card, .footer-content'
    );

    // Tambahkan class reveal atau reveal-scale
    revealElements.forEach((el) => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-scale')) {
            if (el.classList.contains('project-card') || el.classList.contains('contact-card')) {
                el.classList.add('reveal-scale');
            } else {
                el.classList.add('reveal');
            }
        }
    });

    // Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe semua elemen dengan class reveal
    document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
        observer.observe(el);
    });
}

/**
 * Ripple Effect on Buttons
 * Efek ripple emas saat tombol diklik
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach((button) => {
        button.addEventListener('click', function (e) {
            // Hapus ripple yang sudah ada
            const existingRipple = this.querySelector('.btn-ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            // Buat elemen ripple baru
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.setAttribute('aria-hidden', 'true');

            // Hitung posisi dan ukuran
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            // Terapkan style
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            // Hapus setelah animasi selesai
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
}

/**
 * Smooth Scroll untuk navigasi anchor link
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 20; // sedikit offset dari atas
                const targetPosition =
                    targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL hash tanpa lompatan
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Performance Optimizations
 * - Lazy loading gambar
 * - DNS prefetch untuk Google Fonts
 */
function initPerformanceOptimizations() {
    // Tambahkan lazy loading ke semua gambar yang belum memilikinya
    document.querySelectorAll('img:not([loading])').forEach((img) => {
        img.setAttribute('loading', 'lazy');
    });

    // DNS prefetch untuk mempercepat koneksi font
    const prefetchDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    prefetchDomains.forEach((url) => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
}

/**
 * Debounced resize handler (placeholder untuk kebutuhan responsif di masa depan)
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Misalnya, bisa digunakan untuk menyesuaikan ulang posisi ripple jika diperlukan
    }, 250);
});

/**
 * Keyboard navigation visual hint
 * Menambahkan class pada body saat navigasi menggunakan Tab
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

console.log('✨ Cecep Saripudin — syarif.inc | Portfolio loaded successfully.');