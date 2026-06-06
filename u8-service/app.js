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
        document.querySelector('.pricing-section'),
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

    // 7. Interactive Lucky Spin Wheel logic
    const wheelPointerBtn = document.getElementById('wheelPointerBtn');
    const wheelPlate = document.getElementById('wheelPlate');
    const drawStatusText = document.getElementById('drawStatusText');
    const bookingDesc = document.getElementById('bookingDesc');

    const prizes = [
        { text: "¥5.00 大额优惠券", value: 5, code: "U8-LUCKY-5RMB", angle: 30 },
        { text: "¥1.00 体验优惠券", value: 1, code: "U8-LUCKY-1RMB", angle: 90 },
        { text: "¥3.00 专享优惠券", value: 3, code: "U8-LUCKY-3RMB", angle: 150 },
        { text: "¥2.00 幸运优惠券", value: 2, code: "U8-LUCKY-2RMB", angle: 210 },
        { text: "¥4.50 惊喜优惠券", value: 4.5, code: "U8-LUCKY-4.5RMB", angle: 270 },
        { text: "¥1.50 体验优惠券", value: 1.5, code: "U8-LUCKY-1.5RMB", angle: 330 }
    ];

    function appendCouponToForm(code, value) {
        if (bookingDesc) {
            const currentVal = bookingDesc.value;
            // Prevent duplicate appending
            if (!currentVal.includes(code)) {
                bookingDesc.value = `[已启用专属优惠券: ${code} (立减${value}元)]\n` + currentVal;
            }
        }
    }

    function showDrawSuccessModal(prizeText, value, code) {
        const overlay = document.createElement('div');
        overlay.className = 'contact-modal-overlay';
        overlay.innerHTML = `
            <div class="contact-modal" style="text-align: center;">
                <div class="contact-modal-icon-wrap" style="background-color: var(--accent-color); color: #ffffff; border-color: var(--accent-color);">
                    <i data-lucide="gift" style="width: 28px; height: 28px;"></i>
                </div>
                <h3 class="contact-modal-title">🎉 恭喜中奖！</h3>
                <p class="contact-modal-desc">
                    恭喜您在幸运转盘抽中 <strong>${prizeText}</strong>！
                </p>
                <div style="background-color: rgba(140, 98, 57, 0.05); border: 1px dashed var(--accent-color); padding: 15px; border-radius: 4px; margin: 20px 0;">
                    <span style="font-size: 0.75rem; color: var(--accent-color); font-weight: 600;">您的优惠券券码：</span>
                    <br>
                    <span style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); letter-spacing: 0.05em;">${code}</span>
                </div>
                <p class="contact-modal-desc" style="font-size: 0.82rem; margin-bottom: 25px;">
                    该券码已<strong>自动追加到下方的预约表单中</strong>。提交预约并将需求发送给微信客服，即可享受立减优惠！
                </p>
                <div class="contact-modal-actions" style="flex-direction: column; width: 100%; gap: 12px;">
                    <button class="contact-modal-btn contact-modal-btn-primary" id="modalCopyCodeBtn" style="width: 100%;">
                        <span>复制券码并去预约</span>
                        <i data-lucide="copy" style="width: 16px; height: 16px;"></i>
                    </button>
                    <button class="contact-modal-btn contact-modal-btn-secondary" id="modalCloseDrawBtn" style="width: 100%;">
                        <span>好的</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        if (window.lucide) {
            window.lucide.createIcons({
                attrs: { class: 'lucide' },
                nameAttr: 'data-lucide',
                node: overlay
            });
        }

        overlay.classList.add('active');

        const copyCodeBtn = overlay.querySelector('#modalCopyCodeBtn');
        const closeDrawBtn = overlay.querySelector('#modalCloseDrawBtn');

        copyCodeBtn.addEventListener('click', () => {
            copyTextToClipboard(code, () => {
                const btnText = copyCodeBtn.querySelector('span');
                btnText.textContent = '✓ 券码已复制！正在跳转预约...';
                setTimeout(() => {
                    overlay.classList.remove('active');
                    overlay.remove();
                    // Scroll to form
                    const bookingSec = document.getElementById('booking');
                    if (bookingSec) {
                        bookingSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 1200);
            });
        });

        closeDrawBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            overlay.remove();
        });
    }

    // Initialize/Check localStorage Coupon state
    if (wheelPointerBtn && drawStatusText) {
        const savedCoupon = localStorage.getItem('u8_coupon_code');
        const savedVal = localStorage.getItem('u8_coupon_value');

        if (savedCoupon && savedVal) {
            wheelPointerBtn.classList.add('disabled');
            wheelPointerBtn.innerHTML = '已抽';
            drawStatusText.style.color = '#10b981';
            drawStatusText.innerHTML = `您已抽过奖，获得：<strong>¥${savedVal} 优惠券</strong><br>代码：<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">${savedCoupon}</code> (已追加至表单)`;
            appendCouponToForm(savedCoupon, savedVal);
        }

        let isSpinning = false;
        wheelPointerBtn.addEventListener('click', () => {
            if (isSpinning || localStorage.getItem('u8_coupon_code')) return;
            
            isSpinning = true;
            wheelPointerBtn.classList.add('disabled');
            
            // Weighted random selector
            const rand = Math.random();
            let selectedIndex = 1; // Default ¥1.00 (10%)
            if (rand < 0.12) selectedIndex = 0; // ¥5.00 (12%)
            else if (rand < 0.24) selectedIndex = 4; // ¥4.50 (12%)
            else if (rand < 0.50) selectedIndex = 2; // ¥3.00 (26%)
            else if (rand < 0.78) selectedIndex = 3; // ¥2.00 (28%)
            else if (rand < 0.90) selectedIndex = 5; // ¥1.50 (12%)
            else selectedIndex = 1; // ¥1.00 (10%)

            const prize = prizes[selectedIndex];
            
            // Spin parameters: rotate 10 circles + stop on specific angle
            const rotations = 10;
            const targetDeg = rotations * 360 - prize.angle;
            
            wheelPlate.style.transform = `rotate(${targetDeg}deg)`;
            drawStatusText.style.color = 'var(--text-secondary)';
            drawStatusText.textContent = '好运降临中，转盘转动中...';

            wheelPlate.addEventListener('transitionend', () => {
                isSpinning = false;
                wheelPointerBtn.innerHTML = '已抽';
                
                // Store results locally
                localStorage.setItem('u8_coupon_code', prize.code);
                localStorage.setItem('u8_coupon_value', prize.value);

                drawStatusText.style.color = '#10b981';
                drawStatusText.innerHTML = `恭喜抽中：<strong>${prize.text}</strong>！<br>代码：<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">${prize.code}</code> (已追加至表单)`;
                
                // Auto inject and show popup
                appendCouponToForm(prize.code, prize.value);
                showDrawSuccessModal(prize.text, prize.value, prize.code);
            }, { once: true });
        });
    }

    // 8. U8 Booking Form
    const bookingForm = document.getElementById('bookingForm');
    const bookingStatus = document.getElementById('bookingStatus');

    if (bookingForm && bookingStatus) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('bookingName').value.trim();
            const contact = document.getElementById('bookingContact').value.trim();
            const type = document.getElementById('bookingType').value;
            const deadline = document.getElementById('bookingDeadline').value.trim() || '无紧急截止时间';
            const desc = document.getElementById('bookingDesc').value.trim();

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
                
                // Re-append coupon from local storage if won
                const savedCoupon = localStorage.getItem('u8_coupon_code');
                const savedVal = localStorage.getItem('u8_coupon_value');
                if (savedCoupon && savedVal) {
                    appendCouponToForm(savedCoupon, savedVal);
                }

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
