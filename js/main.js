document.addEventListener('DOMContentLoaded', () => {
    // Loader
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);

    // Header Scroll Effect
    const nav = document.querySelector('.nav-minimal');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuLinks = mobileMenu.querySelectorAll('.mobile-links a');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    };

    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Portfolio Images Data
    const portfolioImages = [
        '04.png', '05.png', '07.png',
        'DSC00025.jpg', 'DSC00034.jpg', 'DSC01964.jpg', 'DSC02315.jpg',
        'DSC03047.jpg', 'DSC03059.jpg', 'DSC03491.jpg', 'DSC03532.jpg', 'DSC03715.jpg', 'DSC03808.jpg',
        'DSC04605.jpg', 'DSC04842.jpg', 'DSC05089.jpg', 'DSC05096.jpg', 'DSC05111.jpg', 'DSC05233.jpg',
        'DSC05551.jpg', 'DSC05891.jpg'
    ];

    const portfolioGrid = document.getElementById('portfolioGrid');
    if (portfolioGrid) {
        portfolioImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'portfolio-item-carousel';
            item.innerHTML = `<img src="assets/images/portfolio/${img}" alt="Auge7 Work ${index + 1}" loading="lazy">`;
            portfolioGrid.appendChild(item);
        });
    }

    // Clients Logos Data
    const clientLogos = [
        'Agrupar 1.png', 'Camada 1.png', 'Gympass.png', 'Logo_Algar.png', 
        'Logo_FGV_1.png', 'Objeto Inteligente de Vetor-01.png',
        'Objeto Inteligente de Vetor-02.png', 'Objeto Inteligente de Vetor-03.png',
        'Objeto Inteligente de Vetor-04.png', 'Objeto Inteligente de Vetor-05.png',
        'Objeto Inteligente de Vetor-06.png', 'Objeto Inteligente de Vetor-07.png',
        'Objeto Inteligente de Vetor-08.png', 'Objeto Inteligente de Vetor-09.png',
        'Objeto Inteligente de Vetor.png', 'V Mais Company Logo.png',
        'cropped-Logo-Be-Clinic.png', 'logo-bm.png', 'logo-branca copiar.png',
        'logo_caderno_virtual_horiz_semfundo.png'
    ];

    const clientsGrid = document.getElementById('clientsGrid');
    if (clientsGrid) {
        // Triplicar logos para garantir que o carrossel contínuo não tenha espaços vazios
        const allLogos = [...clientLogos, ...clientLogos, ...clientLogos];
        allLogos.forEach(logo => {
            const item = document.createElement('div');
            item.className = 'client-logo-item';
            item.innerHTML = `<img src="assets/images/clients/${logo}" alt="Cliente Auge7" loading="lazy">`;
            clientsGrid.appendChild(item);
        });
    }

    // Carousel Navigation Logic
    const setupCarouselNav = (gridId, prevBtnId, nextBtnId, autoScroll = false) => {
        const grid = document.getElementById(gridId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (!grid || !prevBtn || !nextBtn) {
            console.warn(`Carousel elements not found for: ${gridId}`);
            return;
        }

        const getScrollAmount = () => {
            const firstItem = grid.querySelector('div');
            return firstItem ? firstItem.offsetWidth + 20 : 320;
        };

        const scrollNext = () => {
            const maxScroll = grid.scrollWidth - grid.clientWidth;
            if (grid.scrollLeft >= maxScroll - 5) {
                grid.scrollTo({ left: 0, behavior: 'auto' });
            } else {
                grid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        };

        const scrollPrev = () => {
            if (grid.scrollLeft <= 5) {
                const maxScroll = grid.scrollWidth - grid.clientWidth;
                grid.scrollTo({ left: maxScroll, behavior: 'auto' });
            } else {
                grid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            }
        };

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollNext();
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollPrev();
        });

        if (autoScroll) {
            let interval = setInterval(scrollNext, 3000);
            grid.addEventListener('mouseenter', () => clearInterval(interval));
            grid.addEventListener('mouseleave', () => interval = setInterval(scrollNext, 3000));
        }
    };

    setupCarouselNav('portfolioGrid', 'prevGallery', 'nextGallery');
    // Removido setupCarouselNav para clientsGrid pois agora é controlado via CSS Animation continuo

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Hero Line Animation on Scroll
    window.addEventListener('scroll', () => {
        const line = document.querySelector('.hero-line');
        if (line) {
            const scroll = window.scrollY;
            line.style.width = (50 + scroll * 0.5) + 'px';
        }
    });

    // Video Play on Hover (Existing Section)
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => video.play());
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // New Video Gallery Logic
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        
        // Preview on hover/touch
        item.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log("Auto-play prevented"));
        });
        
        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });

        // Fullscreen on click
        item.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }
            
            // Unmute when going fullscreen
            video.muted = false;
            video.play();
        });
    });

    // Listen for fullscreen exit to remute and pause
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            const allVideos = document.querySelectorAll('.video-item video');
            allVideos.forEach(v => {
                v.muted = true;
                v.pause();
            });
        }
    });
    document.addEventListener('webkitfullscreenchange', () => {
        if (!document.webkitIsFullScreen) {
            const allVideos = document.querySelectorAll('.video-item video');
            allVideos.forEach(v => {
                v.muted = true;
                v.pause();
            });
        }
    });

    // Form Submission (Mockup)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Enviando... <i class="fa-solid fa-circle-notch fa-spin"></i>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Mensagem Enviada! <i class="fa-solid fa-check"></i>';
                btn.style.background = '#28a745';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
});
