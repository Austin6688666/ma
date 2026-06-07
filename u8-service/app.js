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

    // 7. Interactive Ticket Stub Coupon Generator
    const btnGenerateCoupon = document.getElementById('btnGenerateCoupon');
    const couponBoxView = document.getElementById('couponBoxView');
    const voucherTicketWrapper = document.getElementById('voucherTicketWrapper');
    const ticketPriceVal = document.getElementById('ticketPriceVal');
    const ticketCodeVal = document.getElementById('ticketCodeVal');
    const ticketDateVal = document.getElementById('ticketDateVal');

    const couponValues = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
    const expDate = "2026-07-06"; // Coupon validity period

    // Show screenshot-friendly modal notice
    function showTicketNoticeModal(value, code) {
        const overlay = document.createElement('div');
        overlay.className = 'contact-modal-overlay';
        overlay.innerHTML = `
            <div class="contact-modal" style="text-align: center;">
                <div class="contact-modal-icon-wrap" style="background-color: var(--accent-color); color: #ffffff; border-color: var(--accent-color);">
                    <i data-lucide="ticket" style="width: 28px; height: 28px;"></i>
                </div>
                <h3 class="contact-modal-title">🎉 优惠券生成成功！</h3>
                <p class="contact-modal-desc">
                    恭喜您成功获取了 <strong>¥${value.toFixed(1)}</strong> 专属无门槛优惠券！
                </p>
                <div style="background-color: rgba(140, 98, 57, 0.05); border: 1px dashed var(--accent-color); padding: 12px; border-radius: 4px; margin: 15px 0;">
                    <span style="font-size: 0.75rem; color: var(--accent-color); font-weight: 600;">优惠券代码：</span>
                    <br>
                    <span style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); font-family: monospace;">${code}</span>
                </div>
                
                <!-- BOLD RED WARNING FOR SCREENSHOT RULE -->
                <p class="contact-modal-desc" style="font-size: 0.82rem; color: #ef4444 !important; font-weight: 700; margin-bottom: 25px;">
                    重要规则：请关闭当前窗口，然后务必【截图保存】页面上显示的电子票券凭证。微信预约时将该截图发送给客服，即可享受立减！
                </p>
                <div class="contact-modal-actions">
                    <button class="contact-modal-btn contact-modal-btn-primary" id="modalOkBtn" style="width: 100%;">
                        <span>好的，我去截图</span>
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

        overlay.querySelector('#modalOkBtn').addEventListener('click', () => {
            overlay.classList.remove('active');
            overlay.remove();
            
            // Scroll down a tiny bit to center the ticket
            if (voucherTicketWrapper) {
                voucherTicketWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Safe localStorage Wrapper to prevent script crash when blocked (e.g., in Incognito mode)
    function safeGetItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn('localStorage is disabled or blocked:', e);
            return null;
        }
    }

    function safeSetItem(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.warn('localStorage is disabled or blocked:', e);
            return false;
        }
    }

    // Initialize/Check localStorage Coupon state
    if (btnGenerateCoupon && couponBoxView && voucherTicketWrapper) {
        const savedCode = safeGetItem('u8_ticket_code');
        const savedVal = safeGetItem('u8_ticket_value');

        if (savedCode && savedVal) {
            // Render previously drawn ticket card
            ticketPriceVal.textContent = parseFloat(savedVal).toFixed(1);
            ticketCodeVal.textContent = savedCode;
            ticketDateVal.textContent = `有效期限：${expDate}`;

            couponBoxView.classList.add('hide');
            voucherTicketWrapper.classList.add('show');
        }

        btnGenerateCoupon.addEventListener('click', () => {
            if (safeGetItem('u8_ticket_code')) return;

            btnGenerateCoupon.disabled = true;
            btnGenerateCoupon.querySelector('span').textContent = '正在计算专属折扣...';

            setTimeout(() => {
                // Generate random value (¥1.0 to ¥5.0)
                const val = couponValues[Math.floor(Math.random() * couponValues.length)];
                // Generate random code
                const randId = Math.floor(Math.random() * 8999 + 1000);
                const code = `U8-TICKET-${randId}`;

                // Update UI elements
                ticketPriceVal.textContent = val.toFixed(1);
                ticketCodeVal.textContent = code;
                ticketDateVal.textContent = `有效期限：${expDate}`;

                // Animate views
                couponBoxView.classList.add('hide');
                voucherTicketWrapper.classList.add('show');

                // Save to localStorage
                safeSetItem('u8_ticket_code', code);
                safeSetItem('u8_ticket_value', val.toFixed(1));

                // Trigger congratulations alert modal with bold screenshot rule
                showTicketNoticeModal(val, code);
                
                btnGenerateCoupon.disabled = false;
                btnGenerateCoupon.querySelector('span').textContent = '获取我的专属优惠券';
            }, 800);
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

    /* ==========================================================================
       9. ONLINE CUSTOMER SERVICE INTERACTIVE CHAT WIDGET (YONYOU U8 STYLE)
       ========================================================================== */
    const chatWidget = document.getElementById('chat-widget');
    const chatTrigger = document.getElementById('chat-trigger');
    const chatPanel = document.getElementById('chat-panel');
    const chatClose = document.getElementById('chat-close');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatBadge = document.getElementById('chat-badge');
    const chatChips = document.querySelectorAll('.chat-chip');

    let chatState = 'idle'; // idle, ask_name, ask_contact, ask_type, ask_desc
    let applicantData = { name: '', contact: '', type: '', desc: '' };
    let hasSentGreeting = false;
    let typingTimeoutId = null;

    // Helper: format current time as hh:mm
    const getFormattedTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Helper: Scroll messages log to bottom
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Helper: Add message bubble to DOM
    const addMessage = (sender, text, isCard = false, cardHtml = '') => {
        const wrapper = document.createElement('div');
        wrapper.className = `chat-bubble-wrapper ${sender}`;

        if (isCard) {
            wrapper.innerHTML = cardHtml;
        } else {
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble';
            bubble.textContent = text;
            
            const timeSpan = document.createElement('span');
            timeSpan.className = 'chat-time';
            timeSpan.textContent = getFormattedTime();

            wrapper.appendChild(bubble);
            wrapper.appendChild(timeSpan);
        }

        chatMessages.appendChild(wrapper);
        scrollToBottom();
    };

    // Helper: Show bouncing dots typing indicator
    const showTypingIndicator = () => {
        hideTypingIndicator();

        const wrapper = document.createElement('div');
        wrapper.className = 'typing-indicator-wrapper';
        wrapper.id = 'typing-indicator-active';

        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';

        wrapper.appendChild(indicator);
        chatMessages.appendChild(wrapper);
        scrollToBottom();
    };

    // Helper: Hide bouncing dots typing indicator
    const hideTypingIndicator = () => {
        const activeIndicator = document.getElementById('typing-indicator-active');
        if (activeIndicator) {
            activeIndicator.remove();
        }
    };

    // Trigger Greeting when opened
    const triggerGreeting = () => {
        if (hasSentGreeting) return;
        hasSentGreeting = true;

        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addMessage('bot', '你好！我是用友 U8 修复与日志维护助理 Austin 🛠️。很高兴为您服务！\n\n我们专为南宁理工学子提供 U8 账套修复、期末试算调平、上机实验日志与机房机器时间匹配修改等一条龙技术保障。\n\n关于服务的收费、时效或技术问题，您可以直接打字问我，或点击下方的快捷标签。如果您想在线预约，可以直接回复【预约】哦！👇');
        }, 800);
    };

    // Toggle Chat Panel visibility
    const openChat = () => {
        chatPanel.classList.add('active');
        chatPanel.setAttribute('aria-hidden', 'false');
        if (chatBadge) {
            chatBadge.style.display = 'none';
        }
        triggerGreeting();
        if (window.innerWidth > 480) {
            chatInput.focus();
        }
    };

    const closeChat = () => {
        chatPanel.classList.remove('active');
        chatPanel.setAttribute('aria-hidden', 'true');
    };

    chatTrigger.addEventListener('click', () => {
        if (chatPanel.classList.contains('active')) {
            closeChat();
        } else {
            openChat();
        }
    });

    chatClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeChat();
    });

    // Handle Quick Reply Chips
    chatChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            handleUserInput(query);
        });
    });

    // Input Height Auto Resize
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = (chatInput.scrollHeight) + 'px';
        if (chatInput.scrollHeight > 80) {
            chatInput.style.overflowY = 'auto';
        } else {
            chatInput.style.overflowY = 'hidden';
        }
    });

    // Send Message on click or Enter
    const handleSendClick = () => {
        const text = chatInput.value.trim();
        if (!text) return;
        
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        handleUserInput(text);
    };

    chatSendBtn.addEventListener('click', handleSendClick);

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendClick();
        }
    });

    // Process Bot Responses & State Machine
    const handleUserInput = (inputText) => {
        // 1. Display user bubble
        addMessage('user', inputText);

        // 2. Clear typing timeout if user replies ahead of time
        if (typingTimeoutId) {
            clearTimeout(typingTimeoutId);
        }

        // 3. Show typing indicator
        showTypingIndicator();

        // 4. Compute response
        let reply = '';
        let nextState = chatState;
        let isSpecialCard = false;
        let cardHtml = '';

        const textClean = inputText.trim();

        // Multistep Booking State Machine
        if (chatState === 'ask_name') {
            applicantData.name = textClean;
            reply = `好的，${applicantData.name}。请问您的微信或者手机号是多少呢？💬\n（方便我稍后加您微信或电联您对接文件）`;
            nextState = 'ask_contact';
        } 
        else if (chatState === 'ask_contact') {
            applicantData.contact = textClean;
            reply = `收到联系方式！请问您需要什么服务呢？请输入数字选择：👇\n\n1️⃣ 上机日志/时间修改（改成学校机器时间）\n2️⃣ 全系统信息无痕修改（学号/姓名）\n3️⃣ 账套备份异常导入修复\n4️⃣ 试算平衡与数据校验\n5️⃣ 实操搭建全周期一条龙\n6️⃣ 其他故障咨询`;
            nextState = 'ask_type';
        } 
        else if (chatState === 'ask_type') {
            const num = parseInt(textClean, 10);
            const types = {
                1: '上机日志/时间修改（改成学校机器时间）',
                2: '全系统信息无痕修改（学号/姓名）',
                3: '账套备份异常导入修复',
                4: '试算平衡与数据校验',
                5: '实操搭建全周期一条龙',
                6: '其他故障咨询'
            };

            if (types[num]) {
                applicantData.type = types[num];
                reply = `您选择了：【${applicantData.type}】。\n最后，请简单描述一下您的具体报错内容或修改要求（例如：要求时间修改为今晚8点，或者导入账套时提示数据库连接失败）：👇`;
                nextState = 'ask_desc';
            } else {
                reply = `唔……输入无效哦。请输入 1 到 6 的数字来选择您的服务类型：\n\n1️⃣ 上机日志/时间修改\n2️⃣ 全系统无痕修改\n3️⃣ 账套备份导入修复\n4️⃣ 试算平衡与数据校验\n5️⃣ 实操搭建一条龙\n6️⃣ 其他故障咨询`;
                nextState = 'ask_type';
            }
        } 
        else if (chatState === 'ask_desc') {
            applicantData.desc = textClean;
            reply = `预约需求已登记！✨\n我已经为您打包好预约单，并已通过后台邮件直接发送给 Austin (maxiaoyu666888@gmail.com)。\n\nAustin 在收到邮件后会第一时间联系您（通过您留下的微信或电话），请保持联系畅通哦！🤝`;
            nextState = 'idle';

            // Send AJAX email submission via FormSubmit
            fetch("https://formsubmit.co/ajax/maxiaoyu666888@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "姓名": applicantData.name,
                    "联系方式": applicantData.contact,
                    "服务类型": applicantData.type,
                    "报错与修改要求": applicantData.desc,
                    "_subject": `用友 U8 修复新预约: ${applicantData.name} - ${applicantData.type}`
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Email submitted successfully via FormSubmit:", data);
            })
            .catch(error => {
                console.error("Error sending email via FormSubmit:", error);
            });

            // Synchronize and Submit with UI inputs in page form (just to keep form state sync)
            const mainName = document.getElementById('bookingName');
            const mainContact = document.getElementById('bookingContact');
            const mainType = document.getElementById('bookingType');
            const mainDesc = document.getElementById('bookingDesc');
            if (mainName) mainName.value = applicantData.name;
            if (mainContact) mainContact.value = applicantData.contact;
            if (mainType) mainType.value = applicantData.type;
            if (mainDesc) mainDesc.value = applicantData.desc;

            // Trigger success invoice display card inside chat
            isSpecialCard = true;
            cardHtml = `
                <div class="chat-apply-success-card">
                    <h5>✅ U8 修复预约已自动发送邮件</h5>
                    <p><strong>服务项目：</strong>${applicantData.type}</p>
                    <p><strong>客户姓名：</strong>${applicantData.name}</p>
                    <p><strong>联系方式：</strong>${applicantData.contact}</p>
                    <p><strong>需求描述：</strong>${applicantData.desc}</p>
                    <p style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--accent-color); font-size: 0.75rem; color: var(--text-secondary);">
                        * 提示：预约详情已通过自动邮件直接发送至 Austin 邮箱（maxiaoyu666888@gmail.com）。请留意您的联系方式，Austin 会尽快联络您！
                    </p>
                </div>
            `;
        } 
        else {
            // Idle State: Keyword Router
            const textLower = textClean.toLowerCase();

            // 1. Booking triggers
            if (/(预约|登记|修改|修复|修复账套|改时间|修改日志|改学号|改姓名|申请|一条龙)/.test(textLower)) {
                reply = `好的！我很乐意为您提供用友 U8 修复与日志时间修改服务。💻\n我来在线帮您快速登记预约需求。\n\n首先请问怎么称呼您呢？（例如：李同学）👇`;
                nextState = 'ask_name';
                // Reset data
                applicantData = { name: '', contact: '', type: '', desc: '' };
            }
            // 2. Salary / Price triggers
            else if (/(价格|收费|多少钱|几块|便宜点|优惠|券|怎么收|代金券|怎么收费)/.test(textLower)) {
                reply = `我们的收费标准公开透明，专为本校学子提供高性价比服务：\n\n1. 🌟 **全系统无痕一条龙服务**（修改姓名、学号、日志对齐机房）：**60元/账套**。\n2. 🛠️ **其他单项技术服务**（备份修复、期末试算平衡调平等）：视具体故障难度与工作量协商，童叟无欺。\n\n💡 提示：在页面上方的【领券中心】可随机抽取专属代金券（最高可减 ¥5.00），微信预约时发送截图即可直接抵扣！💰`;
            }
            // 3. Work hours and location triggers
            else if (/(多久|多长时间|什么时候|几点|来得及吗|急|什么时候做好|多久修好)/.test(textLower)) {
                reply = `一般而言，账套修复与日志修改在 **1 - 2 小时** 内即可快速完成交付 ⚡️。\n如果您有紧急截止需求（如明天上交、今晚截止等），请在登记预约时说明，我会为您排单加急优先处理！`;
            }
            // 4. Requirements / Details triggers
            else if (/(日志|时间|修改日志|修改时间|机房时间|上机日志|时间戳)/.test(textLower)) {
                reply = `没问题！我们可以将用友 U8 账套中的所有系统上机操作日志、凭证时间修改为您所需要的**任何指定时间**，或者直接**匹配修改成您学校机房机器的对应时间**。时间逻辑严密，无痕修改，完全符合学校老师检查标准！⏱️`;
            }
            // 5. Balance triggers
            else if (/(平衡|不平|试算|报表|期末|损益|报错|试算平衡|调平)/.test(textLower)) {
                reply = `这是很多财会学子的心头大恨！期末试算不平衡、资产负债表与利润表勾稽错误等，我们都可以调平。\n我们有专业财务与数据库技术支持，直接通过 SQL Server 数据库底层核对凭证，帮您完成平衡修复，不收多余费用！📊`;
            }
            // 6. Name/ID triggers
            else if (/(学号|姓名|改名字|改学号|改人|换人|无痕)/.test(textLower)) {
                reply = `是的，我们可以修改用友 U8 运行系统以及账套底层的**学生姓名**和**学号**。提供从错误诊断、信息修正到导出交档的全方位『一条龙』服务，保证数据包干干净净，只有您的信息！`;
            }
            // 7. Greetings
            else if (/(你好|哈喽|在吗|有人吗|hello|hi|嗨|austin)/.test(textLower)) {
                reply = `您好！我是用友 U8 修复小助手 Austin 🌸，正在线值班中。\n关于用友 U8 的『收费』、『修复时间』、『修改日志/学号姓名』、『试算平衡』等问题，您都可以问我，或者直接打字发送『预约』开始在线登记需求！`;
            }
            // 8. What is U8
            else if (/(u8|平台|是什么|做什么|什么软件|用友)/.test(textLower)) {
                reply = `用友 U8 是一款广泛应用于企业财务、供应链、生产等管理领域的 ERP 软件，也是高校财会实操课程的核心系统。我们主要为您提供该系统在实验、考核中的账套受损修复、日志和凭证时间戳无痕修改、数据校对等技术保障。`;
            }
            // 9. WeChat contact
            else if (/(微信|联系|加你|好友|怎么联系|微信号|电话|联系方式)/.test(textLower)) {
                reply = `您可以直接复制并添加我的微信：**Austin-love-m**（备注 U8 咨询）。\n或者在聊天框发送『预约』，我将协助您在线生成格式化需求单，方便加微信后一键粘贴发送！💬`;
            }
            // 10. Fallbacks
            else {
                const fallbacks = [
                    `唔……Austin 刚才眨了眨眼睛，好像没有太看明白您的意思 🥺。您可以问我『怎么收费』、『可以改时间吗』、『试算不平衡能调吗』，或者直接点击下方的快捷标签快速提问！`,
                    `抱歉呢，这个问题难倒 Austin 啦 🌸。您可以试试问我关于用友 U8 维护的事情，比如输入『修改日志时间』、『无痕改名学号』。如果您想直接在线预约，发送【预约】就可以啦！`,
                    `Austin 刚才正在帮一位理工的同学调平资产负债表，没太理解这个问题 😅。建议您直接点击下方的快捷引导标签，或者打字关于『价格』、『修复时效』，我会立刻给您最详细的解答！`
                ];
                reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
            }
        }

        const chatDelay = Math.max(700, Math.min(1500, (reply.length / 5) * 200));

        typingTimeoutId = setTimeout(() => {
            hideTypingIndicator();
            chatState = nextState;

            if (isSpecialCard) {
                addMessage('bot', reply);
                setTimeout(() => {
                    addMessage('bot', '', true, cardHtml);
                }, 300);
            } else {
                addMessage('bot', reply);
            }
        }, chatDelay);
    };
});
