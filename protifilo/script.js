document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Mohamed Fouad's Modern Portfolio");

    // Elements
    const body = document.body;
    const header = document.querySelector('header');
    const toggleBtn = document.getElementById('theme-toggle');
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    const totalImages = 43;
    let currentImageIndex = 1;

    /* 1. Dynamic Gallery Loading */
    if (galleryGrid) {
        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= totalImages; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.dataset.index = i;

            const img = document.createElement('img');
            img.src = `work/${i}.png`;
            img.alt = `عمل إبداعي ${i}`;
            img.loading = 'lazy';
            
            item.appendChild(img);
            fragment.appendChild(item);

            // Click Event to open Lightbox
            item.addEventListener('click', () => {
                openLightbox(i);
            });
        }
        galleryGrid.appendChild(fragment);
    }

    /* 2. Lightbox Interactive Logic */
    function openLightbox(index) {
        currentImageIndex = index;
        lightbox.classList.add('active');
        updateLightbox(currentImageIndex);
        body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        body.style.overflow = ''; // Restore background scrolling
    }

    function updateLightbox(index) {
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            lightboxImg.src = `work/${index}.png`;
            lightboxCounter.textContent = `${index} / ${totalImages}`;
            
            lightboxImg.onload = () => {
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            };
        }, 150);
    }

    function showNext() {
        // Since it's RTL Arabic layout:
        // Next image means index+1, but visually it moves left.
        currentImageIndex = currentImageIndex >= totalImages ? 1 : currentImageIndex + 1;
        updateLightbox(currentImageIndex);
    }

    function showPrev() {
        currentImageIndex = currentImageIndex <= 1 ? totalImages : currentImageIndex - 1;
        updateLightbox(currentImageIndex);
    }

    // Lightbox Event Listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrev);
    }

    // Close on clicking backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            // Under RTL, ArrowLeft visually goes to next page, let's match natural feel
            showNext();
        } else if (e.key === 'ArrowRight') {
            showPrev();
        }
    });


    /* 3. Theme Toggle Setup */
    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.setAttribute('data-theme', 'dark');
        toggleBtn.textContent = '☀️';
    } else {
        body.removeAttribute('data-theme');
        toggleBtn.textContent = '🌙';
    }

    toggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggleBtn.textContent = '🌙';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleBtn.textContent = '☀️';
        }
    });


    /* 4. Sticky Header Effect */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    /* 5. Scroll Spy & Active Nav Highlight */
    const observerOptions = {
        threshold: 0.25,
        rootMargin: '-80px 0px -50% 0px'
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) spyObserver.observe(section);
    });

    // Smooth Scroll Click handling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80; // height of sticky header
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    /* 6. Dynamic Reveal Animations on Scroll */
    const animElements = document.querySelectorAll(
        '.service-card, .contact-card, .section-title, .sub-title, .hero-content, .hero-visual'
    );
    
    // Add transition styling helper class
    animElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // stop observing once animate state is loaded
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animElements.forEach(el => revealObserver.observe(el));
});
