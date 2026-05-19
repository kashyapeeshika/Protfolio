document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Inject lines into all .sheet elements for stroke reveal animation
    document.querySelectorAll('.sheet').forEach(sheet => {
        ['sheet-top', 'sheet-bottom', 'sheet-left', 'sheet-right'].forEach(cls => {
            const line = document.createElement('div');
            line.className = `sheet-line ${cls}`;
            sheet.appendChild(line);
        });
    });

    // GSAP Animations for "dim-line" elements (stroke reveal effect)
    gsap.registerPlugin(ScrollTrigger);

    // Hero Grid and Mouse Follower Animation
    const heroSection = document.querySelector('.hero-section');
    const ball = document.querySelector('.ball');
    const heroGridLines = document.querySelector('.hero-grid-lines');

    if (heroSection && ball && heroGridLines) {
        // Initial setup for the ball
        gsap.set(ball, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });
        
        let xTo = gsap.quickTo(ball, "x", {duration: 0.4, ease: "power3"}),
            yTo = gsap.quickTo(ball, "y", {duration: 0.4, ease: "power3"});

        // Grid parallax setup
        let gridXTo = gsap.quickTo(heroGridLines, "x", {duration: 0.8, ease: "power2.out"}),
            gridYTo = gsap.quickTo(heroGridLines, "y", {duration: 0.8, ease: "power2.out"});

        heroSection.addEventListener("mousemove", e => {
            const rect = heroSection.getBoundingClientRect();
            // Mouse position relative to the hero section
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            xTo(x);
            yTo(y);

            // Calculate parallax for grid (subtle movement opposite to mouse)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) * -0.05; 
            const moveY = (y - centerY) * -0.05;

            gridXTo(moveX);
            gridYTo(moveY);
        });

        // Show/hide ball when entering/leaving hero section
        heroSection.addEventListener("mouseenter", () => {
            gsap.to(ball, {opacity: 1, scale: 1, duration: 0.3});
        });
        
        heroSection.addEventListener("mouseleave", () => {
            gsap.to(ball, {opacity: 0, scale: 0, duration: 0.3});
            // Reset grid to center
            gridXTo(0);
            gridYTo(0);
        });
    }

    // Animate the main section containers (.sheet)
    gsap.utils.toArray('.sheet').forEach(sheet => {
        const top = sheet.querySelector('.sheet-top');
        const bottom = sheet.querySelector('.sheet-bottom');
        const left = sheet.querySelector('.sheet-left');
        const right = sheet.querySelector('.sheet-right');
        const labels = sheet.querySelectorAll('.sheet-label-top, .sheet-label-bottom');

        if (top && bottom) {
            gsap.from([top, bottom], {
                scrollTrigger: { trigger: sheet, start: "top 85%" },
                scaleX: 0,
                transformOrigin: "center center",
                duration: 1.5,
                ease: "power2.out"
            });
        }

        if (left && right) {
            gsap.from([left, right], {
                scrollTrigger: { trigger: sheet, start: "top 85%" },
                scaleY: 0,
                transformOrigin: "center center",
                duration: 1.5,
                ease: "power2.out"
            });
        }

        if (labels.length) {
            gsap.from(labels, {
                scrollTrigger: { trigger: sheet, start: "top 85%" },
                opacity: 0,
                clipPath: "inset(0% 50% 0% 50%)",
                duration: 1,
                delay: 0.6,
                ease: "power2.out"
            });
        }
    });

    gsap.utils.toArray('.blueprint-box').forEach(box => {
        const topDims = box.querySelectorAll('.top-dim');
        const bottomDims = box.querySelectorAll('.bottom-dim');
        const leftDims = box.querySelectorAll('.left-dim');
        const rightDims = box.querySelectorAll('.right-dim');
        const dimTexts = box.querySelectorAll('.dim-text');

        if (topDims.length) {
            gsap.from(topDims, {
                scrollTrigger: {
                    trigger: box,
                    start: "top 85%",
                },
                scaleX: 0,
                transformOrigin: "center center",
                duration: 1.5,
                ease: "power2.out"
            });
        }
        if (bottomDims.length) {
            gsap.from(bottomDims, {
                scrollTrigger: {
                    trigger: box,
                    start: "top 85%",
                },
                scaleX: 0,
                transformOrigin: "center center",
                duration: 1.5,
                ease: "power2.out"
            });
        }
        if (leftDims.length) {
            gsap.from(leftDims, {
                scrollTrigger: {
                    trigger: box,
                    start: "top 85%",
                },
                scaleY: 0,
                transformOrigin: "center center",
                duration: 1.5,
                ease: "power2.out"
            });
        }
        if (rightDims.length) {
            gsap.from(rightDims, {
                scrollTrigger: {
                    trigger: box,
                    start: "top 85%",
                },
                scaleY: 0,
                transformOrigin: "center center",
                duration: 1.5,
                ease: "power2.out"
            });
        }
        if (dimTexts.length) {
            gsap.from(dimTexts, {
                scrollTrigger: {
                    trigger: box,
                    start: "top 85%",
                },
                opacity: 0,
                clipPath: "inset(0% 50% 0% 50%)",
                duration: 1,
                delay: 0.6,
                ease: "power2.out",
                stagger: 0.2
            });
        }
    });

    // Floating Hover Image Logic
    const hoverImage = document.createElement('img');
    hoverImage.className = 'hover-img-cursor';
    document.body.appendChild(hoverImage);

    let isHovering = false;
    gsap.set(hoverImage, { xPercent: -50, yPercent: -50, scale: 0.5 });

    document.querySelectorAll('.hover-reveal').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const imgSrc = el.getAttribute('data-hover-img');
            if (imgSrc) {
                hoverImage.src = imgSrc;
                gsap.to(hoverImage, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
                isHovering = true;
            }
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(hoverImage, { opacity: 0, scale: 0.5, duration: 0.3, ease: "power2.out" });
            isHovering = false;
        });
    });

    window.addEventListener('mousemove', (e) => {
        if (isHovering) {
            gsap.to(hoverImage, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power3.out" });
        } else {
            gsap.set(hoverImage, { x: e.clientX, y: e.clientY });
        }
    });

    // Radar Diagram Animation
    const radar = document.querySelector('.radar-svg');
    if (radar) {
        gsap.fromTo(radar.querySelectorAll('.ring'),
            { strokeDasharray: 1000, strokeDashoffset: 1000 },
            {
                scrollTrigger: { trigger: radar, start: "top 85%" },
                strokeDashoffset: 0,
                duration: 2,
                stagger: 0.3,
                ease: "power2.out"
            }
        );

        gsap.from(radar.querySelector('.center'), {
            scrollTrigger: { trigger: radar, start: "top 85%" },
            scale: 0,
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            delay: 0.5
        });

        gsap.from(radar.querySelectorAll('.center-text'), {
            scrollTrigger: { trigger: radar, start: "top 85%" },
            opacity: 0,
            duration: 0.5,
            delay: 0.8
        });

        gsap.from(radar.querySelectorAll('.lbl-rect, .lbl-text'), {
            scrollTrigger: { trigger: radar, start: "top 85%" },
            opacity: 0,
            y: 10,
            duration: 0.8,
            stagger: 0.1,
            delay: 1.2
        });

        gsap.to(radar.querySelectorAll('.ring'), {
            rotation: 360,
            transformOrigin: "50% 50%",
            duration: 40,
            repeat: -1,
            ease: "none"
        });
    }

});
