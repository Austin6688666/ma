// ==========================================================================
// YAMEI Hotel - Membership Center Application JavaScript (hotel-club.js)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize State
    initMemberState();
    
    // 2. Setup Interactions
    setupChipSelector();
    setupCard3DVisuals();
    setupCarbonCalculator();
    setupMembershipForm();
    setupDirectPurchase();
    setupPointsMall();
    setupModalBindings();
    
    // 3. Process URL Parameters for Auto-activation
    processUrlParams();
});

// --- Membership State Configuration ---
let memberState = {
    isActivated: false,
    name: "",
    gender: "先生",
    phone: "",
    points: 0,
    tierClass: "card-blank",
    tierName: "未激活 / Guest",
    selectedTags: ["eco"] // Default tag
};

function initMemberState() {
    // Keep reference of initial default values
    memberState.isActivated = false;
    memberState.points = 0;
}

// --- Checkbox Chip Selector Interactivity ---
function setupChipSelector() {
    const chips = document.querySelectorAll(".tag-chips .chip");
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chip.classList.toggle("active");
            
            const val = chip.getAttribute("data-val");
            if (chip.classList.contains("active")) {
                if (!memberState.selectedTags.includes(val)) {
                    memberState.selectedTags.push(val);
                }
            } else {
                memberState.selectedTags = memberState.selectedTags.filter(t => t !== val);
            }
        });
    });
}

// --- 3D Mousemove Hover Tilt Visuals ---
function setupCard3DVisuals() {
    const cardWrapper = document.getElementById("card-3d-wrapper");
    const card = document.getElementById("virtual-card-element");
    const shine = card.querySelector(".card-glass-shine");
    
    if (!cardWrapper || !card) return;

    cardWrapper.addEventListener("mousemove", (e) => {
        const rect = cardWrapper.getBoundingClientRect();
        
        // Mouse coordinate relative to the card wrapper box center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Calculate tilt angles (max 15 degrees)
        const rotX = -(y / (rect.height / 2)) * 15;
        const rotY = (x / (rect.width / 2)) * 15;
        
        cardWrapper.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
        
        // Tilt dynamic shine background gradient
        if (shine) {
            const pctX = (e.clientX - rect.left) / rect.width * 100;
            const pctY = (e.clientY - rect.top) / rect.height * 100;
            shine.style.background = `linear-gradient(${135 + (x/10)}deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.12) 100%)`;
        }
    });

    cardWrapper.addEventListener("mouseleave", () => {
        cardWrapper.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        if (shine) {
            shine.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.1) 100%)`;
        }
    });
}

// --- Carbon Footprint Calculator Logics ---
function setupCarbonCalculator() {
    const nightsSlider = document.getElementById("calc-nights");
    const nightsValText = document.getElementById("calc-nights-val");
    
    const cbToiletries = document.getElementById("calc-toiletries");
    const cbLinen = document.getElementById("calc-linen");
    const cbTransit = document.getElementById("calc-transit");

    if (!nightsSlider) return;

    const runCalculation = () => {
        const nights = parseInt(nightsSlider.value, 10);
        nightsValText.innerText = nights;

        // Base values per night
        let carbon = 0; // Starts at 0
        let water = 20 * nights; // Base water saving baseline per night (e.g. smart water aerators)
        let plastic = 0;

        if (cbToiletries.checked) {
            carbon += 1.2 * nights;
            plastic += 2 * nights;
        }
        if (cbLinen.checked) {
            carbon += 0.8 * nights;
            water += 50 * nights;
        }
        if (cbTransit.checked) {
            carbon += 1.5; // One-time travel transit saving
        }

        // Points logic
        let pointsEarned = 0;
        if (cbToiletries.checked) pointsEarned += 50 * nights;
        if (cbLinen.checked) pointsEarned += 80 * nights;
        if (cbTransit.checked) pointsEarned += 100;

        // Update DOM
        document.getElementById("calc-res-carbon").innerText = carbon.toFixed(1);
        document.getElementById("calc-res-water").innerText = water;
        document.getElementById("calc-res-plastic").innerText = plastic;
        document.getElementById("calc-res-points").innerText = pointsEarned;
    };

    // Listeners
    nightsSlider.addEventListener("input", runCalculation);
    cbToiletries.addEventListener("change", runCalculation);
    cbLinen.addEventListener("change", runCalculation);
    cbTransit.addEventListener("change", runCalculation);

    // Initial calculation
    runCalculation();
}

// --- Membership Registration Form ---
function setupMembershipForm() {
    const form = document.getElementById("membership-active-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("member-reg-name").value.trim();
        const gender = document.getElementById("member-reg-gender").value;
        const phone = document.getElementById("member-reg-phone").value.trim();

        activateMemberCard(name, gender, phone);
    });
}

// --- Main Activation Routine (Card Flip & Update) ---
function activateMemberCard(name, gender, phone) {
    const cardEl = document.getElementById("virtual-card-element");
    if (!cardEl) return;

    // Determine card level by last digit of phone number (aligns with hotel.js)
    const lastDigit = parseInt(phone.slice(-1), 10);
    let tierClass = "tier-wood";
    let tierName = "木邻 Neighbor";
    let discountText = "订房享 9.5 折 // 迎宾茶礼 // 24h书阁借阅";
    
    if (lastDigit % 3 === 0) {
        tierClass = "tier-forest";
        tierName = "森栖 Dweller";
        discountText = "尊享 8.5 折 // 24小时随心住 // 免费红树种植";
    } else if (lastDigit % 2 === 0) {
        tierClass = "tier-bamboo";
        tierName = "竹友 Friend";
        discountText = "专享 9.0 折 // 枕头自选 // 免宠物清洁费";
    }

    // Set Member State
    memberState.isActivated = true;
    memberState.name = name;
    memberState.gender = gender;
    memberState.phone = phone;
    memberState.points = 1200; // Starting bonus points
    memberState.tierClass = tierClass;
    memberState.tierName = tierName;

    // 3D flip animation trigger
    cardEl.style.transform = "rotateY(90deg) scale(0.95)";
    cardEl.style.opacity = "0.3";

    setTimeout(() => {
        // Remove blank and old tier classes
        cardEl.className = `virtual-member-card ${tierClass}`;
        
        // Update texts
        document.getElementById("card-display-tier").innerText = tierName;
        document.getElementById("card-display-name").innerText = `${name} ${gender}`;
        document.getElementById("card-display-id").innerText = `ID: YM-${String(phone).slice(7)}${String(Date.now()).slice(-4)}`;
        document.getElementById("card-display-points").innerText = `当前积分: ${memberState.points.toLocaleString()} points`;

        // Restore card transform
        cardEl.style.transform = "rotateY(0deg) scale(1)";
        cardEl.style.opacity = "1";

        // Enable all points mall exchange buttons
        const exchangeButtons = document.querySelectorAll(".exchange-btn");
        exchangeButtons.forEach(btn => {
            btn.removeAttribute("disabled");
            btn.innerText = "立即兑换";
        });

        showToast(`恭喜！您的绿意邻里【${tierName.split(" ")[0]}】电子卡已成功激活！`, "success");
        showToast("获得迎宾首刷礼：系统已赠送 1,200 环保积分奖励。", "info");
        
        // Scroll slightly down to make card more prominent
        document.getElementById("card-3d-wrapper").scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 450);
}

// --- Points Mall Redemption Flow ---
function setupPointsMall() {
    const container = document.getElementById("mall-products-container");
    if (!container) return;

    container.addEventListener("click", (e) => {
        const btn = e.target.closest(".exchange-btn");
        if (!btn || btn.hasAttribute("disabled")) return;

        if (!memberState.isActivated) {
            showToast("请先在上方填写姓名和电话，免费申请并激活您的会籍卡！", "warning");
            return;
        }

        const productCard = btn.closest(".mall-card-item");
        if (!productCard) return;

        const cost = parseInt(productCard.getAttribute("data-cost"), 10);
        const name = productCard.getAttribute("data-name");

        if (memberState.points >= cost) {
            // Deduct Points
            memberState.points -= cost;
            
            // Update Card points display text
            document.getElementById("card-display-points").innerText = `当前积分: ${memberState.points.toLocaleString()} points`;

            // Generate unique voucher code
            let prefix = "YM-COFFEE-";
            if (name.includes("免清洁")) prefix = "YM-PET-";
            if (name.includes("升级")) prefix = "YM-ROOM-";
            if (name.includes("植树")) prefix = "YM-ECO-";

            const randCode = prefix + String(Math.floor(1000 + Math.random() * 9000)) + "-" + String(Math.floor(10 + Math.random() * 90));
            
            // Trigger voucher modal display
            document.getElementById("exchange-title-display").innerText = name;
            document.getElementById("exchange-code-display").innerText = randCode;
            
            openModal("exchange-modal");
            showToast(`兑换成功！成功扣除 ${cost} 环保积分。`, "success");
        } else {
            showToast(`余额不足！兑换该礼品需要 ${cost} 积分，您当前仅有 ${memberState.points} 积分。`, "error");
        }
    });
}

// --- Parse URL Parameters ---
function processUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const phone = params.get("phone");

    if (name && phone && phone.length === 11) {
        // Autofill registration forms
        document.getElementById("member-reg-name").value = name;
        document.getElementById("member-reg-phone").value = phone;

        // Auto activate card after a short visual delay to let user see transition
        setTimeout(() => {
            showToast("已检测到您的预订手机号，正在为您自动办理/查询会员卡...", "info");
            activateMemberCard(name, "先生", phone);
        }, 800);
    }
}

// --- Modal Helper and Bindings ---
function setupModalBindings() {
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => {
            closeModal(btn.getAttribute("data-target"));
        });
    });

    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    }
}

// --- Toast Feedback Helper ---
function showToast(message, type = 'info') {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = '<i class="fa-solid fa-circle-check"></i>';
    if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation"></i>';
    if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    if (type === 'info') icon = '<i class="fa-solid fa-circle-info"></i>';
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("fade-out");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 3500);
}

// --- Direct Paid Membership Purchase (Cashier) ---
let pendingPurchase = null;

function setupDirectPurchase() {
    const buyGrid = document.getElementById("tiers-buy-section");
    if (!buyGrid) return;

    // 1. Handle Tier Card button clicks
    buyGrid.addEventListener("click", (e) => {
        const btn = e.target.closest(".buy-tier-btn");
        if (!btn) return;

        const tierId = btn.getAttribute("data-tier-id");
        
        // Retrieve name and phone values from registration form
        const inputName = document.getElementById("member-reg-name").value.trim();
        const inputPhone = document.getElementById("member-reg-phone").value.trim();
        const gender = document.getElementById("member-reg-gender").value;

        if (!inputName || !inputPhone || inputPhone.length !== 11) {
            showToast("请先在上方输入栏填写您的姓名和 11 位手机号码！", "warning");
            document.getElementById("member-reg-name").focus();
            document.getElementById("member-reg-name").scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        if (tierId === "wood") {
            // Wood Tier is ¥0, activate directly without checkout!
            showToast("正在为您激活木邻会籍卡...", "info");
            setTimeout(() => {
                activateMemberCard(inputName, gender, inputPhone);
            }, 500);
        } else {
            // Paid Tier checkout flow
            let tierName = "竹友会籍 · 深度舒适";
            let price = "99";
            let points = 2500;
            
            if (tierId === "forest") {
                tierName = "森栖会籍 · 至尊共生";
                price = "299";
                points = 5000;
            }

            // Set Cashier details
            document.getElementById("cashier-tier-name").innerText = tierName;
            document.getElementById("cashier-price-display").innerText = `￥${price}`;
            document.getElementById("cashier-user-name").innerText = `${inputName} ${gender}`;
            document.getElementById("cashier-user-phone").innerText = inputPhone;

            // Set pending purchase state
            pendingPurchase = {
                name: inputName,
                gender: gender,
                phone: inputPhone,
                tierId: tierId,
                points: points
            };

            openModal("cashier-modal");
        }
    });

    // 2. Handle Payment Method switching
    const payOptions = document.querySelectorAll(".pay-option");
    payOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            payOptions.forEach(o => {
                o.classList.remove("active");
                o.style.borderWidth = "1.5px";
                o.style.borderColor = "var(--border-color)";
                o.style.backgroundColor = "var(--bg-card)";
                o.style.color = "var(--text-muted)";
            });
            opt.classList.add("active");
            opt.style.borderWidth = "2px";
            opt.style.borderColor = "var(--primary)";
            opt.style.backgroundColor = "var(--primary-glow)";
            opt.style.color = "var(--primary)";
            
            const payType = opt.getAttribute("data-pay");
            const qrText = payType === "wechat" ? "微信扫码模拟支付" : "支付宝扫码模拟支付";
            const qrBorderColor = payType === "wechat" ? "var(--primary)" : "#027AFF";
            
            document.querySelector(".mock-qr-payment").style.borderColor = qrBorderColor;
            document.querySelector(".qr-pay-section p").innerHTML = `<i class="fa-solid fa-mobile-screen-button"></i> ${qrText}，或点击下方按钮直接模拟支付成功`;
        });
    });

    // 3. Handle Simulated payment success click
    const successBtn = document.getElementById("simulate-pay-success-btn");
    if (successBtn) {
        successBtn.addEventListener("click", () => {
            if (!pendingPurchase) return;

            const { name, gender, phone, tierId, points } = pendingPurchase;
            
            closeModal("cashier-modal");
            activatePurchasedMemberCard(name, gender, phone, tierId, points);
            pendingPurchase = null;
        });
    }
}

// Function to activate purchased card (bypassing tail-digit math)
function activatePurchasedMemberCard(name, gender, phone, tierId, points) {
    const cardEl = document.getElementById("virtual-card-element");
    if (!cardEl) return;

    let tierClass = "tier-wood";
    let tierName = "木邻 Neighbor";
    let discountText = "订房享 9.5 折 // 迎宾茶礼 // 24h书阁借阅";
    
    if (tierId === "forest") {
        tierClass = "tier-forest";
        tierName = "森栖 Dweller";
        discountText = "尊享 8.5 折 // 24小时随心住 // 免费红树种植";
    } else if (tierId === "bamboo") {
        tierClass = "tier-bamboo";
        tierName = "竹友 Friend";
        discountText = "专享 9.0 折 // 枕头自选 // 免宠物清洁费";
    }

    // Set Member State
    memberState.isActivated = true;
    memberState.name = name;
    memberState.gender = gender;
    memberState.phone = phone;
    memberState.points = points; 
    memberState.tierClass = tierClass;
    memberState.tierName = tierName;

    // 3D flip animation trigger
    cardEl.style.transform = "rotateY(90deg) scale(0.95)";
    cardEl.style.opacity = "0.3";

    setTimeout(() => {
        // Remove blank and old tier classes
        cardEl.className = `virtual-member-card ${tierClass}`;
        
        // Update texts
        document.getElementById("card-display-tier").innerText = tierName;
        document.getElementById("card-display-name").innerText = `${name} ${gender}`;
        document.getElementById("card-display-id").innerText = `ID: YM-${String(phone).slice(7)}${String(Date.now()).slice(-4)}`;
        document.getElementById("card-display-points").innerText = `当前积分: ${memberState.points.toLocaleString()} points`;

        // Restore card transform
        cardEl.style.transform = "rotateY(0deg) scale(1)";
        cardEl.style.opacity = "1";

        // Enable all points mall exchange buttons
        const exchangeButtons = document.querySelectorAll(".exchange-btn");
        exchangeButtons.forEach(btn => {
            btn.removeAttribute("disabled");
            btn.innerText = "立即兑换";
        });

        showToast(`恭喜！您的绿意邻里尊贵【${tierName.split(" ")[0]}】电子卡已购买成功并激活！`, "success");
        showToast(`获得特权初始礼包：已赠送 ${points.toLocaleString()} 环保积分奖励！`, "info");
        
        // Scroll to card
        document.getElementById("card-3d-wrapper").scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 450);
}

