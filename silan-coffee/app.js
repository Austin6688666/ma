/**
 * 18°D COFFEE - App Controller
 * Dynamic menu loading, Sunset seat booking flow, Live parameters, and UI interactions.
 */

// ==========================================
// 1. Specialty Menu Data Definition
// ==========================================
const MENU_DATA = [
    // --- 18° SIGNATURE 特调系列 ---
    {
        id: "sig-1",
        name: "椰澜火山拿铁",
        englishName: "Volcanic Raw Coconut Latte",
        price: 34,
        category: "signature",
        description: "采用澄迈中深焙火山岩咖啡，融入文昌东郊有机冷榨椰乳。前段微甜椰香，中后段火山硬朗的坚果与焦糖风味渐显。",
        tags: ["招牌", "冷榨椰乳", "火山豆基底"],
        accent: true,
        coord: "18.25° N",
        formula: "Temp: 92°C | Ratio: 1:15 | TDS: 1.38% | Volcanic G1"
    },
    {
        id: "sig-2",
        name: "清椰冷萃美式",
        englishName: "Chilled Seabreeze Cold Brew",
        price: 32,
        category: "signature",
        description: "以精选日晒耶加雪菲低温慢速冷萃18小时，注入100%新鲜东郊青椰水。柑橘花香与椰香清爽交织，海岛夏日的终极解暑选。",
        tags: ["清甜椰水", "18h冷萃", "柑橘花香"],
        accent: false,
        coord: "109.51° E",
        formula: "Cold Brew: 18h | Temp: 4°C | Yirgacheffe G1 | Coconut Water"
    },
    {
        id: "sig-3",
        name: "日落海盐橘风",
        englishName: "Sunset Sea Salt Orange Latte",
        price: 36,
        category: "signature",
        description: "灵感来源于海棠湾日落。精选意式浓缩注入烤橘糖浆，覆以细腻微咸海盐奶盖。余味甘甜，宛如一杯可以喝的南海晚霞。",
        tags: ["海盐奶盖", "烤橘香气", "日落特调"],
        accent: true,
        coord: "Sunset Spec",
        formula: "Espresso: 93°C | Pressure: 9bar | Sea Salt Foam | Orange Oil"
    },
    
    // --- SINGLE ORIGIN 手冲单一源 ---
    {
        id: "so-1",
        name: "澄迈火山岩特选 G1",
        englishName: "Hainan Chengmai Volcanic G1",
        price: 42,
        category: "so-pour",
        description: "产自澄迈火山岩红土产地，中度烘焙，手冲慢速萃取。入口呈现饱满坚果、黑巧克力香气，中后段有着极佳的焦糖红糖甘甜。",
        tags: ["手冲精品", "澄迈单品", "火山红土"],
        accent: false,
        coord: "19.23° N",
        formula: "Pour-over: 3 stages | Temp: 90°C | Ratio: 1:15 | Grind: Medium"
    },
    {
        id: "so-2",
        name: "水洗·耶加雪菲 葛德",
        englishName: "Washed Yirgacheffe Gedeo",
        price: 38,
        category: "so-pour",
        description: "埃塞俄比亚高海拔产区，水洗处理，浅度烘焙。明亮的柠檬柑橘酸度，茉莉花香气持久，口感干净清爽，宛如山泉般甘冽。",
        tags: ["浅度烘焙", "柠檬柑橘", "茉莉花香"],
        accent: false,
        coord: "6.13° N",
        formula: "Pour-over: 2 stages | Temp: 92°C | Ratio: 1:16 | Grind: Med-Fine"
    },
    {
        id: "so-3",
        name: "哥伦比亚·粉红波旁",
        englishName: "Colombia Pink Bourbon",
        price: 45,
        category: "so-pour",
        description: "双重厌氧水洗处理，浅中度烘焙。入口有如水蜜桃、草莓般多汁的水果甜感，中段散发幽雅的玫瑰花香，层次极度丰富。",
        tags: ["微发酵", "水蜜桃", "玫瑰花香"],
        accent: false,
        coord: "2.92° N",
        formula: "Pour-over: 3 stages | Temp: 89°C | Ratio: 1:15.5 | Grind: Med-Coarse"
    },
    
    // --- CLASSIC ESPRESSO 经典意式 ---
    {
        id: "esp-1",
        name: "短笛拿铁",
        englishName: "Piccolo Latte",
        price: 26,
        category: "espresso",
        description: "极小巧的意式浓缩牛奶咖啡，保留更浓郁的咖啡油脂感。前段巧克力坚果风味，中段乳脂香甜饱满，收尾干净。",
        tags: ["浓郁油脂", "精巧意式", "极低奶量"],
        accent: false,
        formula: "Espresso: 18g In | 22g Out | Temp: 93°C | Steam Foam: 0.5cm"
    },
    {
        id: "esp-2",
        name: "澳白 (平白)",
        englishName: "Flat White",
        price: 28,
        category: "espresso",
        description: "薄奶泡咖啡，使用精细研磨火山拼配豆。入口奶泡极细腻滑顺，完美融合坚果风味与鲜牛奶清甜。",
        tags: ["细腻薄奶泡", "火山拼配"],
        accent: false,
        formula: "Espresso: 19g In | 38g Out | Temp: 93°C | Steam Foam: 0.2cm"
    },
    {
        id: "esp-3",
        name: "双份浓缩",
        englishName: "Double Espresso",
        price: 20,
        category: "espresso",
        description: "双份浓缩，1:2 科学比例精细萃取，萃取火山豆坚实厚重的前中段风味，余韵可可香气长达数分钟。",
        tags: ["重焙坚果", "浓郁可可", "极简意式"],
        accent: false,
        formula: "Espresso: 20g In | 40g Out | Temp: 93°C | Ratio: 1:2"
    },
    
    // --- ISLAND PASTRY 海岛轻食 ---
    {
        id: "pas-1",
        name: "斑斓椰子慕斯",
        englishName: "Pandan Coconut Mousse",
        price: 30,
        category: "pastry",
        description: "采用新鲜海南斑斓叶榨汁，融合文昌椰浆制成。慕斯口感如云朵般绵密，散发淡淡斑斓与椰奶清香。",
        tags: ["手工甜品", "海南斑斓", "清甜低脂"],
        accent: false,
        formula: "Pandan Juice: 100% | Coconut Cream: 35% | Sugar: 25%"
    },
    {
        id: "pas-2",
        name: "火山灰黑金司康",
        englishName: "Volcanic Ash Charcoal Scone",
        price: 22,
        category: "pastry",
        description: "加入天然食用竹炭粉烘焙成火山岩般的黑金外观。外皮酥脆，内部松软，搭配自制澄迈咖啡花蜜抹酱。",
        tags: ["低糖环保", "竹炭黑金", "手作司康"],
        accent: false,
        formula: "Bake: 185°C | Time: 18min | Charcoal: 1% | Coffee Honey: 10%"
    },
    
    // --- HIDDEN MENU 暖心隐藏款 ---
    {
        id: "hid-1",
        name: "致敬烈日 · 待用椰水",
        englishName: "Sun-Salute Coconut Water",
        price: 0,
        category: "hidden",
        description: "专为环卫工人、快递外卖骑手与海藻清理志愿者提供。使用文昌东郊有机冷榨青椰水，冰镇起沙，快速补充体能水分。由社会待用咖啡基金全额买单，户外工作者可免费出示爱心卡或口头领取。",
        tags: ["爱心免费", "户外劳动者专享", "电解质补充"],
        accent: true,
        coord: "Free Box",
        formula: "Organic Coconut Water | Cold: 2°C | Shared Love: 100%"
    },
    {
        id: "hid-2",
        name: "赶海温暖姜椰乳",
        englishName: "Fisherman Warm Ginger Coconut Milk",
        price: 1,
        category: "hidden",
        description: "为清晨出海的渔民、赶海老人以及突发受凉的清洁工人特制。东郊青椰乳融入澄迈富硒小黄姜汁，微辣驱寒，暖胃热身。温情一元奉赠。",
        tags: ["爱心一元款", "驱寒暖胃", "本地渔民老人"],
        accent: false,
        coord: "¥ 1.00",
        formula: "Coconut Milk: 95% | Ginger Juice: 5% | Temp: 65°C"
    },
    {
        id: "hid-3",
        name: "鹧鸪清热凉茶",
        englishName: "Hainan Partridge Herbal Tea",
        price: 0,
        category: "hidden",
        description: "位于门外木栈道爱心茶桶中，采用海南本地鹧鸪茶与杭白菊精心熬制。清热解暑，去火明目。路过的所有清洁工、行人可免费用自带水杯无限续装。",
        tags: ["完全免费", "清热解暑", "自带杯续装"],
        accent: false,
        coord: "Free Refill",
        formula: "Brew: 45min | Partridge Tea: 70% | Chrysanthemum: 30%"
    }
];

// ==========================================
// 2. DOM Elements & Initial Setup
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Community Pending Cup Shared State
    let sharedCoconutClaimed = 38;
    let sharedCoconutRemaining = 12;
    let sharedHerbalTeaLiters = 45;

    // Navigation / Header Elements
    const navbar = document.getElementById("main-nav");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileCloseBtn = document.getElementById("mobile-close-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const drawerLinkItems = document.querySelectorAll(".drawer-link-item");

    // Menu Filtering Elements
    const menuTabsContainer = document.getElementById("menu-filter-tabs");
    const menuItemsGrid = document.getElementById("menu-items-grid");

    // Booking Form & Modal Elements
    const bookingForm = document.getElementById("seat-booking-form");
    const voucherModal = document.getElementById("voucher-modal");
    const modalCloseBtns = document.querySelectorAll(".modal-close");
    
    // Voucher fields
    const vOrderId = document.getElementById("voucher-order-id");
    const vName = document.getElementById("voucher-name");
    const vPhone = document.getElementById("voucher-phone");
    const vGuests = document.getElementById("voucher-guests");
    const vDate = document.getElementById("voucher-date");
    const vTime = document.getElementById("voucher-time");
    
    // Toast container
    const toastContainer = document.getElementById("toast-container");

    // Set default booking date to tomorrow
    const bookDateInput = document.getElementById("book-date");
    if (bookDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        bookDateInput.value = tomorrow.toISOString().split('T')[0];
        bookDateInput.min = new Date().toISOString().split('T')[0];
    }

    // Initialize Menu items (render all by default)
    renderMenuItems("all");

    // ==========================================
    // 3. Navbar scroll & Mobile Drawer
    // ==========================================
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.remove("transparent");
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
            navbar.classList.add("transparent");
        }
    });

    // Mobile menu actions
    const openMobileDrawer = () => {
        mobileDrawer.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    };

    const closeMobileDrawer = () => {
        mobileDrawer.classList.add("hidden");
        document.body.style.overflow = "";
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileDrawer);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeMobileDrawer);
    
    // Close mobile drawer when clicking links
    drawerLinkItems.forEach(link => {
        link.addEventListener("click", closeMobileDrawer);
    });

    // ==========================================
    // 4. Dynamic Menu Rendering & Filtering
    // ==========================================
    function renderMenuItems(categoryFilter) {
        if (!menuItemsGrid) return;
        
        // Clear grid
        menuItemsGrid.innerHTML = "";
        
        // Prepend Community Tracker Card if category is hidden
        if (categoryFilter === "hidden") {
            const trackerCard = document.createElement("div");
            trackerCard.className = "menu-item-card community-tracker-card";
            trackerCard.innerHTML = `
                <div class="tracker-header">
                    <h4><i class="fa-solid fa-heart"></i> 社区「暖心待用杯」今日共享实时数据统计</h4>
                    <p>您的每一次随手善意，都在为高温下的环卫工人、骑手与志愿者积攒清凉。</p>
                </div>
                <div class="tracker-grid">
                    <div class="tracker-item">
                        <span class="tracker-label">今日已领待用椰水</span>
                        <strong class="tracker-value" id="tracker-claimed">${sharedCoconutClaimed} 杯</strong>
                    </div>
                    <div class="tracker-item">
                        <span class="tracker-label">剩余待领椰水</span>
                        <strong class="tracker-value accent-color" id="tracker-remaining">${sharedCoconutRemaining} 杯</strong>
                    </div>
                    <div class="tracker-item">
                        <span class="tracker-label">凉茶桶今日已出水</span>
                        <strong class="tracker-value" id="tracker-tea">${sharedHerbalTeaLiters} L</strong>
                    </div>
                </div>
                <button class="donate-btn" id="donate-cup-btn">
                    <i class="fa-solid fa-plus"></i> 我想捐赠一杯待用椰水 (¥0)
                </button>
            `;
            menuItemsGrid.appendChild(trackerCard);
            
            // Add donate button listener
            const donateBtn = trackerCard.querySelector("#donate-cup-btn");
            if (donateBtn) {
                donateBtn.addEventListener("click", (e) => {
                    e.stopPropagation(); // prevent card expand
                    
                    sharedCoconutRemaining += 1;
                    const remainingEl = document.getElementById("tracker-remaining");
                    if (remainingEl) {
                        remainingEl.textContent = `${sharedCoconutRemaining} 杯`;
                        remainingEl.classList.add("pulse-update");
                        setTimeout(() => remainingEl.classList.remove("pulse-update"), 500);
                    }
                    showToast("捐赠成功！感谢您为烈日下的劳动者送去一份海岛清凉 🥥", "success");
                });
            }
        }

        // Filter items
        const filteredItems = categoryFilter === "all" 
            ? MENU_DATA 
            : MENU_DATA.filter(item => item.category === categoryFilter);
            
        // Map elements
        filteredItems.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "menu-item-card";
            card.style.animationDelay = `${index * 0.08}s`;
            
            // Build Tags HTML
            let tagsHtml = "";
            item.tags.forEach(tag => {
                tagsHtml += `<span class="menu-tag">${tag}</span>`;
            });
            
            // Highlight special tags
            if (item.accent) {
                tagsHtml = `<span class="menu-tag accent-tag"><i class="fa-solid fa-fire-flame-simple"></i> 招牌必尝</span>` + tagsHtml;
            }
            if (item.coord) {
                tagsHtml = `<span class="menu-tag coord-tag"><i class="fa-solid fa-location-dot"></i> ${item.coord}</span>` + tagsHtml;
            }
            
            const displayPrice = item.price === 0 ? "免费" : `¥${item.price}`;
            
            card.innerHTML = `
                <div class="menu-item-top">
                    <div class="menu-item-title-box">
                        <h4>${item.name}</h4>
                        <span class="eng-name">${item.englishName}</span>
                    </div>
                    <div class="menu-item-price-box">
                        <span class="menu-item-price">${displayPrice}</span>
                        <i class="fa-solid fa-chevron-down accordion-arrow"></i>
                    </div>
                </div>
                <div class="menu-item-details-wrapper">
                    <div class="menu-item-details">
                        <p class="menu-item-desc">${item.description}</p>
                        ${item.formula ? `<div class="menu-item-formula"><i class="fa-solid fa-flask"></i> 萃取配方: <code>${item.formula}</code></div>` : ''}
                        <div class="menu-item-bottom">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
            `;
            
            // Add click listener for mobile accordion toggle
            card.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    // Prevent toggle when clicking links or button elements
                    if (e.target.closest("a") || e.target.closest("button")) return;
                    
                    const isExpanded = card.classList.contains("expanded");
                    
                    // Collapse all cards first for accordion behavior
                    menuItemsGrid.querySelectorAll(".menu-item-card").forEach(c => {
                        c.classList.remove("expanded");
                    });
                    
                    // Toggle this card
                    if (!isExpanded) {
                        card.classList.add("expanded");
                    }
                }
            });
            
            menuItemsGrid.appendChild(card);
        });
    }

    // Tabs Event Listener
    if (menuTabsContainer) {
        const tabs = menuTabsContainer.querySelectorAll(".menu-tab");
        tabs.forEach(tab => {
            tab.addEventListener("click", (e) => {
                tabs.forEach(t => t.classList.remove("active"));
                e.target.classList.add("active");
                
                const category = e.target.getAttribute("data-filter");
                renderMenuItems(category);
            });
        });
    }

    // ==========================================
    // 5. Booking Flow & Modal Ticket Generation
    // ==========================================
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("book-name").value.trim();
            const phone = document.getElementById("book-phone").value.trim();
            const guestsSelect = document.getElementById("book-guests-count");
            const guests = guestsSelect.options[guestsSelect.selectedIndex].text;
            const date = document.getElementById("book-date").value;
            const timeSelect = document.getElementById("book-time-slot");
            const timeSlot = timeSelect.options[timeSelect.selectedIndex].text;
            const ecoTransit = document.getElementById("book-eco-transit").checked;
            const careNeedSelect = document.getElementById("book-care-need");
            const careNeedVal = careNeedSelect ? careNeedSelect.value : "none";
            
            // Format phone number: mask middle 4 digits
            const maskedPhone = phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
            
            // Generate Random Order ID
            const dateStr = date.replace(/-/g, "");
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const orderId = `18D${dateStr}${randomNum}`;
            
            // Populate Voucher Modal
            if (vOrderId) vOrderId.textContent = orderId;
            if (vName) vName.textContent = name;
            if (vPhone) vPhone.textContent = maskedPhone;
            if (vGuests) vGuests.textContent = guests;
            if (vDate) vDate.textContent = date;
            if (vTime) vTime.textContent = timeSlot;
            
            // Update carbon emission text based on checkbox
            const ecoBadge = document.querySelector(".ticket-eco-badge");
            if (ecoBadge) {
                if (ecoTransit) {
                    ecoBadge.style.display = "flex";
                } else {
                    ecoBadge.style.display = "none";
                }
            }

            // Update humanistic care badge based on selection
            const vCareContainer = document.getElementById("voucher-care-container");
            const vCareText = document.getElementById("voucher-care-text");
            if (vCareContainer && vCareText) {
                if (careNeedVal !== "none") {
                    vCareContainer.style.display = "flex";
                    let desc = "";
                    if (careNeedVal === "stroller") {
                        desc = "已优先安排宽敞靠窗席位，预留婴幼儿车位，并备妥经紫外线消杀的儿童安全餐椅。";
                    } else if (careNeedVal === "wheelchair") {
                        desc = "已为您锁定无障碍清水平台专属桌位（无阶梯阻隔），到店前将有专属咖啡师提前出迎提供坡道引导。";
                    } else if (careNeedVal === "pet") {
                        desc = "宠物友好席位锁合成功。桌下将备有洗净饮水碗与一次性无尘垫纸，到店可领取自制有机冷榨椰肉干宠用饼干。";
                    } else if (careNeedVal === "disability") {
                        desc = "已登记暖心特殊关怀协助。届时我们将指派一名专职店员为您进行语音点单指引，并伴随落日潮汐进行声画导览。";
                    }
                    vCareText.textContent = desc;
                } else {
                    vCareContainer.style.display = "none";
                }
            }
            
            // Show Modal
            if (voucherModal) {
                voucherModal.classList.remove("hidden");
                document.body.style.overflow = "hidden"; // Lock scroll
            }
            
            showToast("预约成功！已为您生成电子海岛确认单", "success");
            bookingForm.reset();
            
            // Keep default dates valid after reset
            if (bookDateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                bookDateInput.value = tomorrow.toISOString().split('T')[0];
            }
        });
    }

    // Close Modal Event Listeners
    modalCloseBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-target") || "voucher-modal";
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add("hidden");
                document.body.style.overflow = ""; // Unlock scroll
            }
        });
    });

    // Close modal when clicking on overlay background
    if (voucherModal) {
        voucherModal.addEventListener("click", (e) => {
            if (e.target === voucherModal) {
                voucherModal.classList.add("hidden");
                document.body.style.overflow = "";
            }
        });
    }

    // ==========================================
    // 6. Toast Notification Helper
    // ==========================================
    function showToast(message, type = "success") {
        if (!toastContainer) return;
        
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        
        const icon = type === "success" 
            ? '<i class="fa-solid fa-circle-check"></i>' 
            : '<i class="fa-solid fa-circle-exclamation"></i>';
            
        toast.innerHTML = `${icon} <span>${message}</span>`;
        toastContainer.appendChild(toast);
        
        // Auto remove toast after 4s
        setTimeout(() => {
            toast.classList.add("fade-out");
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3500);
    }

    // ==========================================
    // 7. Scroll Reveal Animation Logic
    // ==========================================
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add("active");
            }
        });
    };
    
    // Initial run
    revealOnScroll();
    // Scroll listener
    window.addEventListener("scroll", revealOnScroll);

    // ==========================================
    // 8. Sunset Parameters Auto-Fluctuation
    // ==========================================
    // Periodically update environmental logs for realism (temperature, wind, probability)
    const tempField = document.querySelector(".hero-floating-info .info-item:nth-child(1)");
    const windField = document.querySelector(".hero-floating-info .info-item:nth-child(5)");
    const sunsetStatusField = document.querySelector(".coastal-tips .tip-item:nth-child(1) p");
    
    if (tempField && windField) {
        setInterval(() => {
            // Temperature fluctuations between 29.5 and 31.5
            const baseTemp = 30.5;
            const variance = (Math.random() * 2 - 1).toFixed(1);
            const currentTemp = (parseFloat(baseTemp) + parseFloat(variance)).toFixed(1);
            tempField.innerHTML = `<i class="fa-solid fa-temperature-half"></i> 当日温度: ${currentTemp}°C`;
            
            // Wind speed changes between 3.8 and 5.0
            const windSpeed = (3.8 + Math.random() * 1.2).toFixed(1);
            const directions = ["南南西", "西南", "偏南风", "南风"];
            const dir = directions[Math.floor(Math.random() * directions.length)];
            windField.innerHTML = `<i class="fa-solid fa-wind"></i> 海风流向: ${dir} ${windSpeed}m/s`;
        }, 8000);
    }

    // Fluctuate dashboard parameters (Temp, TDS, Flow, Time, BPM, Wave)
    const dashTempField = document.getElementById("dash-temp");
    const dashTdsField = document.getElementById("dash-tds");
    const dashFlowField = document.getElementById("dash-flow");
    const dashTimeField = document.getElementById("dashboard-time");
    const dashBpmField = document.getElementById("dash-bpm");
    const dashWaveField = document.getElementById("dash-wave");

    // Live clock update
    if (dashTimeField) {
        setInterval(() => {
            const now = new Date();
            dashTimeField.textContent = now.toTimeString().split(' ')[0];
        }, 1000);
    }

    if (dashTempField || dashTdsField || dashFlowField || dashBpmField || dashWaveField) {
        setInterval(() => {
            if (dashTempField) {
                const temp = (92.0 + Math.random() * 0.8).toFixed(1);
                dashTempField.textContent = `${temp} °C`;
            }
            if (dashTdsField) {
                const tds = (1.35 + Math.random() * 0.08).toFixed(2);
                dashTdsField.textContent = `${tds} %`;
            }
            if (dashFlowField) {
                const flow = (2.0 + Math.random() * 0.3).toFixed(1);
                dashFlowField.textContent = `${flow} g/s`;
            }
            if (dashWaveField) {
                const waveFreq = (0.09 + Math.random() * 0.05).toFixed(2);
                dashWaveField.textContent = `${waveFreq} Hz`;
                
                if (dashBpmField) {
                    const bpm = Math.round(60 + waveFreq * 110);
                    dashBpmField.textContent = `${bpm} bpm`;
                }
            }
        }, 3000);
    }
});
