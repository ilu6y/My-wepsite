document.addEventListener('DOMContentLoaded', () => {
    // Reset any stale localStorage from previous visits
    if (localStorage.getItem('site_v') !== '8.0') {
        localStorage.removeItem('theme');
        localStorage.removeItem('language');
        localStorage.setItem('site_v', '8.0');
    }

    const translations = {
        ar: {
            page_title: "محمد فؤاد | مصمم جرافيك",
            nav_about: "من أنا",
            nav_services: "خبراتي",
            nav_work: "أعمالي",
            nav_contact: "تواصل معي",
            lang_btn: "EN",
            hero_badge: "مصمم جرافيك محترف",
            hero_title_pre: "مرحباً، أنا ",
            hero_title_name: "محمد فؤاد",
            hero_desc: "مصمم جرافيك بخبرة أكثر من 5 سنوات في صناعة الهويات البصرية، تصاميم السوشيال ميديا المبتكرة، والفيديوهات الإعلانية القصيرة. أدمج بين الحس الفني وأدوات الذكاء الاصطناعي الحديثة لتقديم حلول بصرية فريدة تزيد من مبيعاتك وتبرز هويتك التجارية.",
            hero_btn_work: "عرض أعمالي",
            hero_btn_contact: "تواصل سريع",
            badge_years: "سنوات خبرة",
            badge_creative: "تصميم إبداعي",
            services_subtitle: "ماذا أقدم؟",
            services_title: "خبراتي وخدماتي",
            service1_title: "الهويات البصرية",
            service1_desc: "تصميم شعارات مبتكرة وكتيبات هوية كاملة (Brand Guidelines) تعزز حضور علامتك التجارية وتثبت في الأذهان.",
            service2_title: "تصاميم السوشيال ميديا",
            service2_desc: "إنشاء تصاميم لافتة لمنصات التواصل الاجتماعي تتناسب مع هوية شركتك وتساهم في زيادة التفاعل والمبيعات.",
            service3_title: "الموشن جرافيك والمونتاج",
            service3_desc: "صناعة فيديوهات إعلانية قصيرة (Reels & Shorts) جذابة باستخدام أحدث تقنيات تحرير الفيديو وتأثيرات الحركة المميزة.",
            work_subtitle: "معرض الأعمال",
            work_title: "رؤية فنية تتحول لحقيقة",
            filter_all: "الكل",
            filter_branding: "هويات بصرية",
            filter_social: "سوشيال ميديا",
            filter_advertising: "تصاميم إعلانية",
            filter_print: "مطبوعات وإبداع",
            work_hint: "اضغط على أي عمل لتكبيره وتصفحه بدقة عالية",
            load_more: "عرض المزيد من الأعمال",
            show_less: "عرض أقل",
            item_prefix: "عمل إبداعي",
            contact_subtitle: "هل لديك مشروع؟",
            contact_title: "دعنا نعمل معاً",
            contact_desc: "أنا جاهز دائماً لتحويل أفكارك ورؤيتك إلى تصاميم ملموسة وناجحة. تواصل معي عبر أي من المنصات التالية:",
            whatsapp_title: "واتساب",
            whatsapp_action: "راسلني الآن",
            behance_title: "بيهانس",
            behance_action: "مشاهدة المزيد",
            email_title: "البريد الإلكتروني",
            email_action: "أرسل رسالة",
            footer_text: "جميع الحقوق محفوظة © 2026 محمد فؤاد | تصميم وتطوير إبداعي"
        },
        en: {
            page_title: "Mohamed Fouad | Graphic Designer",
            nav_about: "About",
            nav_services: "Services",
            nav_work: "Portfolio",
            nav_contact: "Contact",
            lang_btn: "عربي",
            hero_badge: "Professional Graphic Designer",
            hero_title_pre: "Hi, I'm ",
            hero_title_name: "Mohamed Fouad",
            hero_desc: "Graphic designer with 5+ years of expertise in crafting compelling brand identities, innovative social media creatives, and high-impact short promotional videos. Combining artistic intuition with modern AI tools to elevate your brand presence and drive real results.",
            hero_btn_work: "Explore Works",
            hero_btn_contact: "Quick Contact",
            badge_years: "Years Experience",
            badge_creative: "Creative Design",
            services_subtitle: "What I Offer",
            services_title: "Services & Expertise",
            service1_title: "Brand Identity",
            service1_desc: "Crafting distinctive logos and comprehensive brand guidelines that establish an iconic market presence and leave a lasting impression.",
            service2_title: "Social Media Design",
            service2_desc: "Designing high-converting, striking visual assets tailored to your brand voice to boost audience engagement and drive sales.",
            service3_title: "Motion Graphics & Video",
            service3_desc: "Producing engaging promotional short videos (Reels & Shorts) utilizing modern motion graphics and dynamic video editing.",
            work_subtitle: "Selected Works",
            work_title: "Artistic Vision Brought to Reality",
            filter_all: "All Works",
            filter_branding: "Branding",
            filter_social: "Social Media",
            filter_advertising: "Advertising",
            filter_print: "Print & Creative",
            work_hint: "Click any project to view in high definition",
            load_more: "Load More Projects",
            show_less: "Show Less",
            item_prefix: "Creative Project",
            contact_subtitle: "Have a Project?",
            contact_title: "Let's Build Something Great",
            contact_desc: "Ready to turn your concepts and visions into impactful, high-standard designs. Connect with me directly on any of these platforms:",
            whatsapp_title: "WhatsApp",
            whatsapp_action: "Start Chat",
            behance_title: "Behance",
            behance_action: "View Full Profile",
            email_title: "Email",
            email_action: "Send an Email",
            footer_text: "All Rights Reserved © 2026 Mohamed Fouad | Creative Design & Development"
        }
    };

    let currentLang = localStorage.getItem('language') || 'en';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);

        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        const langBtnText = document.getElementById('lang-btn-text');
        if (langBtnText) {
            langBtnText.textContent = translations[lang].lang_btn;
        }

        updateGalleryLabels();
    }

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(nextLang);
        });
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    } else {
        document.body.removeAttribute('data-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.body.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.textContent = '🌙';
            } else {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.textContent = '☀️';
            }
        });
    }

    const galleryGrid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    const totalImages = 43;
    const initialVisibleCount = 12;
    let visibleCount = initialVisibleCount;
    let currentFilter = 'all';

    const categories = ['branding', 'social', 'advertising', 'print'];
    function getItemCategory(index) {
        return categories[(index - 1) % categories.length];
    }

    function getCategoryName(categoryKey, lang) {
        const map = {
            ar: {
                branding: "هوية بصرية",
                social: "سوشيال ميديا",
                advertising: "إعلان تجاري",
                print: "مطبوعات وإبداع"
            },
            en: {
                branding: "Brand Identity",
                social: "Social Media",
                advertising: "Advertising",
                print: "Print & Creative"
            }
        };
        return map[lang][categoryKey] || categoryKey;
    }

    function renderGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';

        const fragment = document.createDocumentFragment();

        for (let i = 1; i <= totalImages; i++) {
            const category = getItemCategory(i);
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.dataset.index = i;
            item.dataset.category = category;

            const img = document.createElement('img');
            img.src = `assets/work/${i}.png`;
            img.alt = `${translations[currentLang].item_prefix} ${i}`;
            img.loading = 'lazy';

            const overlay = document.createElement('div');
            overlay.className = 'gallery-item-overlay';

            const tag = document.createElement('span');
            tag.className = 'gallery-item-tag';
            tag.textContent = getCategoryName(category, currentLang);

            const title = document.createElement('h4');
            title.className = 'gallery-item-title';
            title.textContent = `${translations[currentLang].item_prefix} #${i}`;

            overlay.appendChild(tag);
            overlay.appendChild(title);

            const zoomBtn = document.createElement('div');
            zoomBtn.className = 'gallery-item-btn';
            zoomBtn.innerHTML = '<i class="fas fa-search-plus"></i>';

            item.appendChild(img);
            item.appendChild(overlay);
            item.appendChild(zoomBtn);

            item.addEventListener('click', () => {
                openLightbox(i);
            });

            fragment.appendChild(item);
        }

        galleryGrid.appendChild(fragment);
        applyFilterAndPagination();
    }

    function updateGalleryLabels() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            const index = item.dataset.index;
            const category = item.dataset.category;
            const tag = item.querySelector('.gallery-item-tag');
            const title = item.querySelector('.gallery-item-title');
            const img = item.querySelector('img');

            if (tag) tag.textContent = getCategoryName(category, currentLang);
            if (title) title.textContent = `${translations[currentLang].item_prefix} #${index}`;
            if (img) img.alt = `${translations[currentLang].item_prefix} ${index}`;
        });
    }

    function applyFilterAndPagination() {
        const items = document.querySelectorAll('.gallery-item');
        let matchedCount = 0;

        items.forEach(item => {
            const matchesFilter = currentFilter === 'all' || item.dataset.category === currentFilter;
            
            if (matchesFilter) {
                matchedCount++;
                if (matchedCount <= visibleCount) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            } else {
                item.classList.add('hidden');
            }
        });

        if (loadMoreBtn) {
            if (matchedCount <= visibleCount) {
                if (visibleCount > initialVisibleCount) {
                    loadMoreBtn.innerHTML = `<span>${translations[currentLang].show_less}</span> <i class="fas fa-arrow-up"></i>`;
                    loadMoreBtn.style.display = 'inline-flex';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            } else {
                loadMoreBtn.innerHTML = `<span>${translations[currentLang].load_more} (${visibleCount} / ${matchedCount})</span> <i class="fas fa-arrow-down"></i>`;
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            visibleCount = initialVisibleCount;
            applyFilterAndPagination();
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const items = document.querySelectorAll('.gallery-item');
            const matchedTotal = Array.from(items).filter(item => currentFilter === 'all' || item.dataset.category === currentFilter).length;

            if (visibleCount >= matchedTotal) {
                visibleCount = initialVisibleCount;
                document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
            } else {
                visibleCount += 12;
            }
            applyFilterAndPagination();
        });
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    let currentLightboxIndex = 1;

    function openLightbox(index) {
        currentLightboxIndex = index;
        if (lightbox) lightbox.classList.add('active');
        updateLightbox(currentLightboxIndex);
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightbox(index) {
        if (!lightboxImg) return;
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';

        setTimeout(() => {
            lightboxImg.src = `assets/work/${index}.png`;
            if (lightboxCounter) {
                lightboxCounter.textContent = `${index} / ${totalImages}`;
            }
            lightboxImg.onload = () => {
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            };
        }, 120);
    }

    function showNextImage() {
        currentLightboxIndex = currentLightboxIndex >= totalImages ? 1 : currentLightboxIndex + 1;
        updateLightbox(currentLightboxIndex);
    }

    function showPrevImage() {
        currentLightboxIndex = currentLightboxIndex <= 1 ? totalImages : currentLightboxIndex - 1;
        updateLightbox(currentLightboxIndex);
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') {
            if (currentLang === 'ar') showNextImage();
            else showPrevImage();
        } else if (e.key === 'ArrowRight') {
            if (currentLang === 'ar') showPrevImage();
            else showNextImage();
        }
    });

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

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
    }, { threshold: 0.3 });

    sections.forEach(section => {
        if (section.id) spyObserver.observe(section);
    });

    const revealElements = document.querySelectorAll(
        '.service-card, .contact-card, .section-title, .sub-title, .hero-content, .hero-visual, .portfolio-filters'
    );
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    renderGallery();
    setLanguage(currentLang);
});
