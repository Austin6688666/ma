document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.site-header');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
            
            // Toggle icon between menu and close
            const icon = menuToggle.querySelector('i');
            if (icon) {
                const isOpened = navMenu.classList.contains('mobile-open');
                icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
                window.lucide.createIcons();
            }
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    window.lucide.createIcons();
                }
            });
        });
    }

    // 3. Header Scroll Effect & Scroll Progress Bar
    window.addEventListener('scroll', () => {
        // Header padding / shadow transition
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(250, 249, 246, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.03)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'rgba(250, 249, 246, 0.85)';
            header.style.boxShadow = 'none';
        }

        // Scroll progress indicator width calculation
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = [
        document.querySelector('.about-section'),
        document.querySelector('.skills-section'),
        document.querySelector('.experience-section'),
        document.querySelector('.contact-section'),
        document.querySelector('.service-details-section'),
        document.querySelector('.service-workflow-section'),
        document.querySelector('.service-advantages-section'),
        document.querySelector('.cta-section')
    ];

    // Add reveal class to sections
    revealElements.forEach(el => {
        if (el) {
            el.classList.add('reveal');
        }
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        if (el) revealObserver.observe(el);
    });

    // 5. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link:not(.contact-btn):not(.tour-link)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active-nav-link');
            if (item.getAttribute('href') === `#${current}`) {
                item.style.color = 'var(--text-primary)';
                item.style.fontWeight = '600';
            } else {
                item.style.color = '';
                item.style.fontWeight = '';
            }
        });
    });

    // 6. Interactive Site Tour (系统导览)
    const tourSteps = [
        {
            element: document.querySelector('.hero-section'),
            title: '第一站：欢迎探索',
            text: '我是马骁煜，这里是我的个人主页起点。这里能让您快速了解我作为一名会计学在读学生的财务信念：“精准记录过去，理性预见未来”。'
        },
        {
            element: document.querySelector('.about-section'),
            title: '第二站：关于我',
            text: '在此版块中，我阐述了自己的学业背景与逻辑思维方式，以及我对于将传统财务与数字化技术结合的深刻热情。'
        },
        {
            element: document.querySelector('.skills-section'),
            title: '第三站：专业技能',
            text: '这里展示了我所掌握的财务核算、管理分析等核心专业能力，同时包括高级 Excel 财务建模与 Python 数据分析工具的探索。'
        },
        {
            element: document.querySelector('.experience-section'),
            title: '第四站：校园经历',
            text: '记录了我的日常课程学习、财务模拟实训以及课外技能自主拓展等多维轨迹，是我大学生活的见证。'
        },
        {
            element: document.querySelector('.contact-section'),
            title: '终点站：与我联络',
            text: '如果您有合作探讨意向或学业疑问，可通过此表单填写留言，提交后会直接自动唤起您的邮件客户端，给我发送邮件！'
        }
    ];

    let currentTourStep = 0;
    const tourOverlay = document.getElementById('tourOverlay');
    const tourCard = document.getElementById('tourCard');
    const tourStepIndicator = document.getElementById('tourStepIndicator');
    const tourCardTitle = document.getElementById('tourCardTitle');
    const tourCardText = document.getElementById('tourCardText');
    const tourPrevBtn = document.getElementById('tourPrevBtn');
    const tourNextBtn = document.getElementById('tourNextBtn');
    const tourCloseBtn = document.getElementById('tourCloseBtn');
    const navTourBtn = document.getElementById('navTourBtn');
    const heroTourBtn = document.getElementById('heroTourBtn');

    function startTour() {
        currentTourStep = 0;
        tourOverlay.classList.add('active');
        tourCard.classList.add('active');
        showTourStep(0);
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }

    function endTour() {
        tourOverlay.classList.remove('active');
        tourCard.classList.remove('active');
        
        // Remove highlighting from all elements
        tourSteps.forEach(step => {
            if (step.element) {
                step.element.classList.remove('tour-highlighted');
            }
        });
        document.body.style.overflow = ''; // Unlock scrolling
    }

    function showTourStep(index) {
        // Remove previous highlight
        tourSteps.forEach(step => {
            if (step.element) {
                step.element.classList.remove('tour-highlighted');
            }
        });

        const step = tourSteps[index];
        if (!step) return;

        // Highlight current element
        if (step.element) {
            step.element.classList.add('tour-highlighted');
            // Smooth scroll to the highlighted element
            step.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Update card content
        tourStepIndicator.textContent = `步骤 ${index + 1}/${tourSteps.length}`;
        tourCardTitle.textContent = step.title;
        tourCardText.textContent = step.text;

        // Update buttons state
        tourPrevBtn.disabled = index === 0;
        tourNextBtn.textContent = index === tourSteps.length - 1 ? '完成' : '下一步';
    }

    if (navTourBtn) navTourBtn.addEventListener('click', (e) => { e.preventDefault(); startTour(); });
    if (heroTourBtn) heroTourBtn.addEventListener('click', (e) => { e.preventDefault(); startTour(); });
    if (tourCloseBtn) tourCloseBtn.addEventListener('click', endTour);
    if (tourOverlay) tourOverlay.addEventListener('click', endTour);

    if (tourPrevBtn) {
        tourPrevBtn.addEventListener('click', () => {
            if (currentTourStep > 0) {
                currentTourStep--;
                showTourStep(currentTourStep);
            }
        });
    }

    if (tourNextBtn) {
        tourNextBtn.addEventListener('click', () => {
            if (currentTourStep < tourSteps.length - 1) {
                currentTourStep++;
                showTourStep(currentTourStep);
            } else {
                endTour();
            }
        });
    }

    // 7. Contact Form (Method B - mailto)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && formStatus && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value || '来自个人网站的留言';
            const message = document.getElementById('message').value;

            // Construct mailto link
            const emailReceiver = 'maxiaoyu666888@gmail.com';
            const mailtoBody = `发件人姓名: ${name}\n发件人邮箱: ${email}\n\n内容:\n${message}`;
            const mailtoUrl = `mailto:${emailReceiver}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

            // Set loading and feedback
            submitBtn.disabled = true;
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.textContent;
            btnText.textContent = '正在唤起邮件...';

            formStatus.className = 'form-status success';
            formStatus.textContent = '正在唤起您的本地邮箱客户端发送邮件...';

            // Open mail client
            window.location.href = mailtoUrl;

            // Reset UI after short delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                btnText.textContent = originalText;
                
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.style.opacity = '1';
                    }, 400);
                }, 5000);
            }, 1000);
        });
    }
});
