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
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(17, 45, 78, 0.05)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
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

    // 4. Robust Clipboard Copy Function
    function copyTextToClipboard(text, onSuccess, onFailure) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onSuccess).catch(onFailure);
        } else {
            // Fallback for non-HTTPS or older browsers
            try {
                const textSpace = document.createElement('textarea');
                textSpace.value = text;
                textSpace.style.top = '0';
                textSpace.style.left = '0';
                textSpace.style.position = 'fixed';
                document.body.appendChild(textSpace);
                textSpace.focus();
                textSpace.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textSpace);
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

    // 5. Interactive Schedule Slots Click Behavior
    const availSlots = document.querySelectorAll('.slot-avail');
    const meetTimeInput = document.getElementById('meetTime');
    const meetStatus = document.getElementById('meetStatus');

    availSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            const selectedTime = slot.getAttribute('data-time');
            if (meetTimeInput && selectedTime) {
                meetTimeInput.value = selectedTime;
                
                // Visual highlight effect on input
                meetTimeInput.style.borderColor = 'var(--meet-accent-gold)';
                meetTimeInput.style.backgroundColor = 'rgba(184, 151, 90, 0.05)';
                
                setTimeout(() => {
                    meetTimeInput.style.borderColor = '';
                    meetTimeInput.style.backgroundColor = '';
                }, 1500);

                // Smooth scroll to the form section
                const bookingSection = document.getElementById('booking');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                // Show notification in form status
                if (meetStatus) {
                    meetStatus.className = 'form-status';
                    meetStatus.style.color = 'var(--meet-accent-gold)';
                    meetStatus.style.opacity = '1';
                    meetStatus.textContent = `已自动选定日程时段：${selectedTime}`;
                    
                    setTimeout(() => {
                        meetStatus.style.opacity = '0';
                    }, 4000);
                }
            }
        });
    });

    // 6. Simple Success Copy Modal Overlay (Optimized for WeChat)
    function showContactSuccessModal(formattedText, wechatId = 'Austin-love-m') {
        const overlay = document.createElement('div');
        overlay.className = 'contact-modal-overlay';
        overlay.innerHTML = `
            <div class="contact-modal">
                <div class="contact-modal-icon-wrap">
                    <i data-lucide="check" style="width: 28px; height: 28px;"></i>
                </div>
                <h3 class="contact-modal-title">预约信息已生成</h3>
                <p class="contact-modal-desc">
                    您的预约信息排版已就绪。请跟随下方引导，复制我的微信号并添加我发送即可：
                </p>
                
                <div class="contact-modal-wechat-card" id="wechatCard" style="cursor: pointer;" title="点击可复制微信号">
                    <span class="contact-modal-wechat-label">微信号（点击可复制）</span>
                    <br>
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
                    <button class="contact-modal-btn" id="modalCopyDataBtn" style="width: 100%;">
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

    // 7. Personal Meeting Form Submission
    const meetForm = document.getElementById('meetForm');
    
    if (meetForm && meetStatus) {
        meetForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('meetName').value.trim();
            const contact = document.getElementById('meetContact').value.trim();
            const type = document.getElementById('meetType').value;
            const location = document.getElementById('meetLocation').value;
            const time = document.getElementById('meetTime').value.trim();
            const desc = document.getElementById('meetDesc').value.trim();

            const formattedText = `【会面与日程预约申请】
预约人/单位：${name}
联系方式：${contact}
会面主题：${type}
期望地点：${location}
期望时间：${time}
事由与备忘：${desc}`;

            const meetSubmitBtn = meetForm.querySelector('button[type="submit"]');
            meetSubmitBtn.disabled = true;
            const btnText = meetSubmitBtn.querySelector('span');
            const originalText = btnText.textContent;
            btnText.textContent = '正在处理...';

            meetStatus.className = 'form-status';
            meetStatus.style.color = 'var(--meet-accent)';
            meetStatus.style.opacity = '1';
            meetStatus.textContent = '正在生成预约卡片...';

            setTimeout(() => {
                showContactSuccessModal(formattedText, 'Austin-love-m');
                meetForm.reset();
                
                meetSubmitBtn.disabled = false;
                btnText.textContent = originalText;
                
                setTimeout(() => {
                    meetStatus.style.opacity = '0';
                    setTimeout(() => {
                        meetStatus.textContent = '';
                        meetStatus.style.opacity = '1';
                    }, 400);
                }, 3000);
            }, 600);
        });
    }
});
