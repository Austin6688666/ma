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

    // 3. Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(250, 249, 246, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.03)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'rgba(250, 249, 246, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = [
        document.querySelector('.about-section'),
        document.querySelector('.skills-section'),
        document.querySelector('.experience-section'),
        document.querySelector('.contact-section')
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
    const navItems = document.querySelectorAll('.nav-link:not(.contact-btn)');

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
            // Add custom active styling
            if (item.getAttribute('href') === `#${current}`) {
                item.style.color = 'var(--text-primary)';
                item.style.fontWeight = '600';
            } else {
                item.style.color = '';
                item.style.fontWeight = '';
            }
        });
    });

    // 6. Contact Form (Method B - mailto)
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
