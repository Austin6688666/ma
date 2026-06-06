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
        document.querySelector('.service-details-section'),
        document.querySelector('.service-workflow-section'),
        document.querySelector('.service-advantages-section')
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

    // 5. Robust Clipboard Copy Function
    function copyTextToClipboard(text, onSuccess, onFailure) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onSuccess).catch(onFailure);
        } else {
            // Fallback for non-HTTPS or older browsers
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.top = '0';
                textArea.style.left = '0';
                textArea.style.position = 'fixed';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                if (successful) {
                    if (onSuccess) onSuccess();
                } else {
                    if (onFailure) onFailure();
                }
            } catch (err) {
                if (onFailure) onFailure(err);
            }
        }
    }

    // 6. Elegant Success Modal Overlay (Optimized for WeChat)
    function showContactSuccessModal(formattedText, wechatId = 'Austin-love-m') {
        // Create overlay and modal
        const overlay = document.createElement('div');
        overlay.className = 'contact-modal-overlay';
        overlay.innerHTML = `
            <div class="contact-modal">
                <div class="contact-modal-icon-wrap">
                    <i data-lucide="check" style="width: 28px; height: 28px;"></i>
                </div>
                <h3 class="contact-modal-title">预约申请已生成</h3>
                <p class="contact-modal-desc">
                    您的留言/需求已排版完毕。请跟随下方两步指引，添加我的微信并发送：
                </p>
                
                <div class="contact-modal-wechat-card" id="wechatCard" style="cursor: pointer;" title="点击可复制微信号">
                    <span class="contact-modal-wechat-label">微信号（点击可复制）</span>
                    <span class="contact-modal-wechat-id">${wechatId}</span>
                </div>
                
                <div class="contact-modal-steps">
                    <div class="contact-modal-step-item">
                        <span class="contact-modal-step-num">1</span>
                        <span>点击下方 <strong>“1. 复制微信号并跳转微信”</strong>，搜索并添加好友。</span>
                    </div>
                    <div class="contact-modal-step-item">
                        <span class="contact-modal-step-num">2</span>
                        <span>添加成功后，回到此页面点击 <strong>“2. 复制我的预约详情”</strong>。</span>
                    </div>
                    <div class="contact-modal-step-item">
                        <span class="contact-modal-step-num">3</span>
                        <span>在微信聊天框直接 <strong>“粘贴”</strong> 并发送给我即可！</span>
                    </div>
                </div>
                
                <div class="contact-modal-actions" style="flex-direction: column; width: 100%; gap: 12px;">
                    <button class="contact-modal-btn contact-modal-btn-primary" id="modalCopyWechatBtn" style="width: 100%;">
                        <span>1. 复制微信号并跳转微信</span>
                        <i data-lucide="message-circle" style="width: 16px; height: 16px;"></i>
                    </button>
                    <button class="contact-modal-btn" id="modalCopyDataBtn" style="width: 100%; background-color: var(--accent-color); color: var(--bg-color); border-color: var(--accent-color);">
                        <span>2. 复制我的预约详情</span>
                        <i data-lucide="copy" style="width: 16px; height: 16px;"></i>
                    </button>
                    <button class="contact-modal-btn contact-modal-btn-secondary" id="modalCloseBtn" style="width: 100%;">
                        <span>关闭窗口</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Render Lucide icons inside the modal
        if (window.lucide) {
            window.lucide.createIcons({
                attrs: { class: 'lucide' },
                nameAttr: 'data-lucide',
                node: overlay
            });
        }

        // Lock background scroll
        document.body.style.overflow = 'hidden';

        // Animate modal in
        setTimeout(() => {
            overlay.classList.add('active');
        }, 50);

        const copyWechatBtn = overlay.querySelector('#modalCopyWechatBtn');
        const copyDataBtn = overlay.querySelector('#modalCopyDataBtn');
        const wechatCard = overlay.querySelector('#wechatCard');
        const closeBtn = overlay.querySelector('#modalCloseBtn');

        // Copy WeChat ID and jump to WeChat
        function doWeChatCopyAndJump() {
            copyTextToClipboard(wechatId, () => {
                const btnText = copyWechatBtn.querySelector('span');
                const originalText = btnText.textContent;
                btnText.textContent = '微信号已复制！正在跳转微信...';
                
                const label = wechatCard.querySelector('.contact-modal-wechat-label');
                const originalLabel = label.textContent;
                label.textContent = '微信号复制成功！';
                
                // Attempt to open WeChat application
                window.location.href = 'weixin://';
                
                setTimeout(() => {
                    btnText.textContent = originalText;
                    label.textContent = originalLabel;
                }, 2000);
            });
        }

        // Copy Reservation Details
        function doDataCopy() {
            copyTextToClipboard(formattedText, () => {
                const btnText = copyDataBtn.querySelector('span');
                const originalText = btnText.textContent;
                btnText.textContent = '✓ 预约详情已复制到剪贴板！';
                
                setTimeout(() => {
                    btnText.textContent = originalText;
                }, 2500);
            });
        }

        copyWechatBtn.addEventListener('click', doWeChatCopyAndJump);
        copyDataBtn.addEventListener('click', doDataCopy);
        wechatCard.addEventListener('click', () => {
            copyTextToClipboard(wechatId, () => {
                const label = wechatCard.querySelector('.contact-modal-wechat-label');
                const originalLabel = label.textContent;
                label.textContent = '微信号复制成功！';
                setTimeout(() => {
                    label.textContent = originalLabel;
                }, 1500);
            });
        });

        function closeModal() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }

    // 7. U8 Booking Form
    const bookingForm = document.getElementById('bookingForm');
    const bookingStatus = document.getElementById('bookingStatus');

    if (bookingForm && bookingStatus) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('bookingName').value;
            const contact = document.getElementById('bookingContact').value;
            const type = document.getElementById('bookingType').value;
            const deadline = document.getElementById('bookingDeadline').value || '无紧急截止时间';
            const desc = document.getElementById('bookingDesc').value;

            const formattedText = `【用友 U8 预约需求】
客户姓名：${name}
联系方式：${contact}
服务类型：${type}
期望截止时间：${deadline}
报错描述与修改要求：${desc}`;

            const bookingSubmitBtn = bookingForm.querySelector('button[type="submit"]');
            bookingSubmitBtn.disabled = true;
            const btnText = bookingSubmitBtn.querySelector('span');
            const originalText = btnText.textContent;
            btnText.textContent = '正在处理...';

            bookingStatus.className = 'form-status';
            bookingStatus.style.color = 'var(--accent-color)';
            bookingStatus.textContent = '已复制预约信息，正在打开向导...';

            setTimeout(() => {
                showContactSuccessModal(formattedText, 'Austin-love-m');
                bookingForm.reset();
                bookingSubmitBtn.disabled = false;
                btnText.textContent = originalText;
                
                setTimeout(() => {
                    bookingStatus.style.opacity = '0';
                    setTimeout(() => {
                        bookingStatus.textContent = '';
                        bookingStatus.style.opacity = '1';
                    }, 400);
                }, 3000);
            }, 600);
        });
    }
});
