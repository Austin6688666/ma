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

    // 6. VIP Invitation Code Verification
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const meetCodeInput = document.getElementById('meetCode');
    const verifyMessage = document.getElementById('verifyMessage');
    let isVipVerified = false;

    if (verifyCodeBtn && meetCodeInput && verifyMessage) {
        verifyCodeBtn.addEventListener('click', () => {
            const code = meetCodeInput.value.trim();
            
            if (!code) {
                verifyMessage.style.color = '#ef4444';
                verifyMessage.textContent = '请输入邀约码后进行校验。';
                return;
            }

            verifyCodeBtn.disabled = true;
            verifyCodeBtn.textContent = '校验中...';
            verifyMessage.style.color = 'var(--meet-text-secondary)';
            verifyMessage.textContent = '正在连接机要室请求验证...';

            setTimeout(() => {
                verifyCodeBtn.disabled = false;
                verifyCodeBtn.textContent = '校验邀请码';

                if (code.toUpperCase() === 'VIP888' || code.toUpperCase() === 'LEADER2026') {
                    isVipVerified = true;
                    verifyMessage.style.color = '#10b981';
                    verifyMessage.innerHTML = '<span style="font-weight: 700;">✓ 校验成功！</span>已开启【主管特邀信道】，申请优先级调至【特急/最优先接见】。';
                    meetCodeInput.style.borderColor = '#10b981';
                    meetCodeInput.disabled = true;
                    verifyCodeBtn.disabled = true;
                } else {
                    isVipVerified = false;
                    verifyMessage.style.color = '#ef4444';
                    verifyMessage.textContent = '✗ 验证码无效或已被使用。您仍可使用普通通道呈报。';
                    meetCodeInput.style.borderColor = '#ef4444';
                }
            }, 1000);
        });
    }

    // 7. Simulated Progress Tracker Query
    const trackerSearchBtn = document.getElementById('trackerSearchBtn');
    const trackerInput = document.getElementById('trackerInput');
    const trackerResult = document.getElementById('trackerResult');
    
    if (trackerSearchBtn && trackerInput && trackerResult) {
        trackerSearchBtn.addEventListener('click', () => {
            const queryVal = trackerInput.value.trim();
            if (!queryVal) {
                alert('请先输入微信号/手机号或呈批文号再行查询。');
                return;
            }

            trackerSearchBtn.disabled = true;
            trackerSearchBtn.textContent = '调档中...';
            
            setTimeout(() => {
                trackerSearchBtn.disabled = false;
                trackerSearchBtn.innerHTML = '立即查询 <i data-lucide="search" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-left:4px;"></i>';
                if (window.lucide) window.lucide.createIcons();

                // Show result container
                trackerResult.classList.remove('hide');
                trackerResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // UI Elements in Tracker result
                const resultApptId = document.getElementById('resultApptId');
                const resultStatusTag = document.getElementById('resultStatusTag');
                const step2 = document.getElementById('trackerStep2');
                const step3 = document.getElementById('trackerStep3');
                const step4 = document.getElementById('trackerStep4');

                // Dynamic simulation based on search keyword
                if (queryVal.toUpperCase().includes('VIP888') || queryVal.includes('888') || queryVal.toUpperCase().includes('X809')) {
                    // VIP Approved case
                    resultApptId.textContent = '骁字〔2026〕特第088号 (特急件)';
                    resultStatusTag.textContent = '准予接见';
                    resultStatusTag.className = 'result-status-tag approved';
                    
                    // Update steps to Approved
                    step2.className = 'tracker-timeline-step step-done';
                    step2.querySelector('.step-icon').innerHTML = '<i data-lucide="check" style="width:10px;height:10px;"></i>';
                    
                    step3.className = 'tracker-timeline-step step-done';
                    step3.querySelector('.step-icon').innerHTML = '<i data-lucide="check" style="width:10px;height:10px;"></i>';
                    step3.querySelector('.step-time').textContent = '2026-06-06 21:20';
                    step3.querySelector('.step-desc').textContent = '主管马骁煜阁下已亲批呈批件，准予本次接见。拟定接见书已下发。';
                    
                    step4.className = 'tracker-timeline-step step-done';
                    step4.querySelector('.step-icon').innerHTML = '<i data-lucide="check" style="width:10px;height:10px;"></i>';
                    step4.querySelector('.step-time').textContent = '2026-06-06 21:35';
                    step4.querySelector('.step-desc').textContent = '日程已核定，正式接见复函已签发。秘书处已调配席位。';
                } else {
                    // Regular Reviewing case
                    const randomNum = Math.floor(Math.random() * 80 + 100);
                    resultApptId.textContent = `骁字〔2026〕第${randomNum}号`;
                    resultStatusTag.textContent = '机要处审查中';
                    resultStatusTag.className = 'result-status-tag';

                    // Reset steps back to standard processing
                    step2.className = 'tracker-timeline-step step-done';
                    step2.querySelector('.step-icon').innerHTML = '<i data-lucide="check" style="width:10px;height:10px;"></i>';
                    
                    step3.className = 'tracker-timeline-step step-active';
                    step3.querySelector('.step-icon').innerHTML = '<i data-lucide="loader-2" style="width:10px;height:10px;animation:spin 2s linear infinite;"></i>';
                    step3.querySelector('.step-time').textContent = '批阅中...';
                    step3.querySelector('.step-desc').textContent = '正在呈送主管马骁煜阁下进行日程排期批复与会面议题审查。';
                    
                    step4.className = 'tracker-timeline-step step-pending';
                    step4.querySelector('.step-icon').innerHTML = '<i data-lucide="user-check" style="width:10px;height:10px;"></i>';
                    step4.querySelector('.step-time').textContent = '待签发';
                    step4.querySelector('.step-desc').textContent = '最终准予接见复函发给，秘书处协调具体接见座次。';
                }

                if (window.lucide) window.lucide.createIcons();
            }, 600);
        });
    }

    // 8. Elegant Official Resolution Modal Overlay
    function showOfficialResolutionModal(formattedText, docNo, isVip, wechatId = 'Austin-love-m') {
        const overlay = document.createElement('div');
        overlay.className = 'contact-modal-overlay';
        overlay.innerHTML = `
            <div class="contact-modal">
                <!-- Official Red Header Banner -->
                <div class="official-header-line">
                    <h2 class="official-dept-title">马骁煜主管办公室呈批复函</h2>
                    <div class="official-doc-no">呈批字号：${docNo}</div>
                </div>
                
                <h3 class="contact-modal-title">接见预约申请已初步受理</h3>
                <p class="contact-modal-desc">
                    经秘书处合规审查完毕，系统已为您套打并生成正式的<strong>“日程接见呈批复函”</strong>，请跟随下方指引，完成席位锁定：
                </p>
                
                <div class="contact-modal-wechat-card" id="wechatCard" style="cursor: pointer;" title="点击可复制微信号">
                    <span class="contact-modal-wechat-label">联络微信号 (点击可复制)</span>
                    <br>
                    <span class="contact-modal-wechat-id">${wechatId}</span>
                </div>
                
                <div class="contact-modal-steps">
                    <div class="contact-modal-step-item">
                        <span class="contact-modal-step-num">1</span>
                        <span>点击下方 <strong>“1. 复制官方复函文本”</strong>，系统会自动将完整的呈批批复公文复制至您的剪贴板。</span>
                    </div>
                    <div class="contact-modal-step-item">
                        <span class="contact-modal-step-num">2</span>
                        <span>点击 <strong>“2. 复制微信并跳转”</strong>，搜索添加主管微信号。</span>
                    </div>
                    <div class="contact-modal-step-item">
                        <span class="contact-modal-step-num">3</span>
                        <span>在微信对话框中直接 <strong>“粘贴”</strong> 并发送此复函公文，秘书处核对后即刻发放确切座席。</span>
                    </div>
                </div>
                
                <div class="contact-modal-actions" style="flex-direction: column; width: 100%; gap: 12px; position: relative; z-index: 15;">
                    <button class="contact-modal-btn" id="modalCopyDataBtn" style="width: 100%;">
                        <span>1. 复制官方复函文本</span>
                        <i data-lucide="copy" style="width: 16px; height: 16px;"></i>
                    </button>
                    <button class="contact-modal-btn contact-modal-btn-primary" id="modalCopyWechatBtn" style="width: 100%;">
                        <span>2. 复制微信并跳转</span>
                        <i data-lucide="message-circle" style="width: 16px; height: 16px;"></i>
                    </button>
                    <button class="contact-modal-btn contact-modal-btn-secondary" id="modalCloseBtn" style="width: 100%;">
                        <span>关闭窗口</span>
                    </button>
                </div>

                <!-- Simulated Red Official Star Seal -->
                <div class="official-seal-wrap">
                    <div class="official-seal">
                        <span class="official-seal-star">★</span>
                        <div class="official-seal-text">
                            用友U8维护处<br>
                            技术呈批专用章<br>
                            MA XIAOYU
                        </div>
                    </div>
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
                btnText.textContent = '✓ 复函公文已成功复制！';
                
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

    // 9. Personal Meeting Form Submission
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

            const randomDocNum = Math.floor(Math.random() * 880 + 110);
            const docNo = isVipVerified 
                ? `骁字〔2026〕特第088号` 
                : `骁字〔2026〕第${randomDocNum}号`;

            const formattedText = `【马骁煜特约接见与日程预约呈批系统 · 日程呈批复函】
呈批字号：${docNo}
安全密级：${isVipVerified ? '特急 · 第一顺位 (特邀信道)' : '常备 · 普通件'}

用友U8校内专属维护处与主管办公室已初步受理您的接见申请。批复详情如下：
---------------------------------------------
【呈报人/单位】 ${name}
【联络微信号】 ${contact}
【呈报事项类】 ${type}
【拟定接见地】 ${location}
【拟定接见时】 ${time}
【呈批事由备】 ${desc}
---------------------------------------------
批复指示：
一、本复函已自动录入马骁煜主管日程排期总表。
二、请复制本公函文本，并添加主管微信：Austin-love-m 发送本公函。
三、秘书处核对密级及文号无误后，将在收到信息后即刻发放确切座席安排。

马骁煜主管办公室·机要秘书处（签发）
二零二六年六月六日`;

            const meetSubmitBtn = meetForm.querySelector('button[type="submit"]');
            meetSubmitBtn.disabled = true;
            const btnText = meetSubmitBtn.querySelector('span');
            const originalText = btnText.textContent;
            btnText.textContent = '正在核对申报要素...';

            meetStatus.className = 'form-status';
            meetStatus.style.color = 'var(--meet-accent)';
            meetStatus.style.opacity = '1';
            meetStatus.textContent = '安全及规避检查通过，正在套打呈批件...';

            setTimeout(() => {
                showOfficialResolutionModal(formattedText, docNo, isVipVerified, 'Austin-love-m');
                meetForm.reset();
                
                // If code input was disabled, reset it
                if (meetCodeInput) {
                    meetCodeInput.disabled = false;
                    meetCodeInput.style.borderColor = '';
                }
                if (verifyCodeBtn) {
                    verifyCodeBtn.disabled = false;
                }
                if (verifyMessage) {
                    verifyMessage.textContent = '';
                }
                isVipVerified = false;

                meetSubmitBtn.disabled = false;
                btnText.textContent = originalText;
                
                setTimeout(() => {
                    meetStatus.style.opacity = '0';
                    setTimeout(() => {
                        meetStatus.textContent = '';
                        meetStatus.style.opacity = '1';
                    }, 400);
                }, 3000);
            }, 800);
        });
    }
});
