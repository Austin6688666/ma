// ==========================================================================
// SILAN BISTRO - Creative Chinese Dining Application JavaScript (bistro.js)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Language
    initLanguage();
    
    // 2. Setup Menu Tabs Interactivity
    setupMenuTabs();
    
    // 3. Setup Interactive Sourcing Map
    setupSourcingMap();
    
    // 4. Setup Tasting Menu Details drawer
    setupTastingMenuDrawer();
    
    // 5. Setup VIP Booking & Member Integration
    setupVipBooking();
    
    // 6. Setup Scroll Reveal Animations
    setupScrollReveal();

    // Check URL Verification parameter on load
    checkUrlVerification();
});

// ==========================================================================
// 1. i18n Bilingual Language Switch Logic
// ==========================================================================

let currentLang = localStorage.getItem("lang") || "zh";

// Translation dictionary for bistro page specific DOM elements
const BISTRO_I18N = {
    "zh": {
        // Navigation links
        "nav-home": "品牌首页",
        "nav-order": "扫桌点单",
        "nav-club": "海岛会员",
        "nav-booking": "体验预约",
        "nav-hotel": "亚美旅宿",
        "nav-about": "关于我们",
        "nav-reserve-btn": "预约日落席",
        // Shanhai Group Additions
        "group-footer-text": "山海共生美学生活集团旗下品牌",
        "nav-group-brand": '山海集团 <i class="fa-solid fa-chevron-down"></i>',
        "nav-group-home": "集团主页 | GROUP",
        "nav-group-hotel": '亚美旅宿 | YAMEI',
        "nav-group-coffee": '18°D咖啡 | 18°D',
        "nav-group-bistro": '汐澜中餐 | SILAN',
        "nav-group-pass": '山海通行证 | PASS',
        
        // Hero
        "hero-badge": "汐澜旗下风物食肆",
        "hero-title": "风土与火候的<br><span class='gold-glow'>诗意重塑</span>",
        "hero-desc": "以海南在地有机蔬菜与近海野生海鲜为原材，融汇创意川粤火候。在原木清水石的自然主义空间中，为您呈现健康且富烟火气的现代中式美学晚宴。",
        "hero-cta-menu": "探索时令菜单",
        "hero-cta-book": "预约美学晚宴",
        "hero-status-organic": "今日食材 100% 有机采收直送",
        
        // Philosophy
        "philo-badge": "烹饪理念",
        "philo-title": "自然共生 · <span class='italic'>低碳餐桌</span>",
        "philo-desc": "我们不仅追求味觉的极致，更践行与自然的可持续共存。作为山海共生集团的一部分，汐澜与姐妹品牌共同用一条海南地理线索串联起品牌故事：18°D 咖啡产自火山红土，亚美旅宿是山海间安静落脚处，而汐澜中餐则坚持采用海岸线上捕来的今日时令食材。同一片土地，三种体验，一个完整的海南。我们将碳足迹记录融入每一道菜肴。",
        "philo-p1-num": "01",
        "philo-p1-title": "地缘风物寻源",
        "phistro-p1-desc": "澄迈火山红土的富硒蔬菜、万宁近海的鲜活渔获，我们直接与海岛农户与渔民合作，缩短从农田到餐桌的距离。",
        "philo-p2-num": "02",
        "philo-p2-title": "创意川粤火候",
        "phistro-p2-desc": "减去传统中餐的过量油脂，提炼川粤烹饪火候。用现代低温慢煮与炭火炙烤技术，最大程度保留食材的原生营养与风味。",
        "philo-p3-num": "03",
        "philo-p3-title": "碳足迹与零废弃",
        "phistro-p3-desc": "厨房推行有机厨余堆肥计划。时令菜单明确标注每道菜的碳减排量，每一餐都是您与地球的环保对话。",
        
        // Menu Section
        "menu-badge": "时令赏味",
        "menu-title": "汐澜时令 · <span class='italic'>美学菜单</span>",
        "menu-desc": "春华秋实，顺时而食。点击下方标签，探索由主厨团队根据本周在地收成精心定制的创意佳肴。",
        "tab-all": "全部创意菜",
        "tab-sichuan": "创意川风",
        "tab-cantonese": "意境粤海",
        "tab-organic": "低碳绿野",
        "tab-sweet": "极简甜点",
        
        // Sourcing Section
        "source-badge": "食材产地",
        "source-title": "海岛风物 · <span class='italic'>寻源地图</span>",
        "source-desc": "我们坚信，伟大的菜肴始于伟大的风土。点击地图上的标记点，探索我们遍布海南的生态农场与合作基地。",
        "map-tip": "点击地图标记点查看风物细节",
        
        // Tasting Section
        "tasting-badge": "主厨套餐",
        "tasting-title": "主厨定制 · <span class='italic'>赏味套餐</span>",
        "tasting-desc": "专为追求极致仪式感的饕客准备。主厨团队为您编排了一场起承转合的味觉乐章，完整展现海岛的感官印记。",
        "tasting-t1-tag": "时令尝鲜",
        "tasting-t1-name": "【山海风物】尝鲜双人套餐",
        "tasting-t1-price": "¥399",
        "tasting-t1-unit": "/ 套",
        "tasting-t2-tag": "超值推荐",
        "tasting-t2-name": "【林栖深眠】雅致四人套餐",
        "tasting-t2-price": "¥699",
        "tasting-t2-unit": "/ 套",
        "tasting-t3-tag": "尊享奢华",
        "tasting-t3-name": "【汐澜印记】尊享主厨定制套餐",
        "tasting-t3-price": "¥999",
        "tasting-t3-unit": "/ 位",
        "tasting-btn-view": "查看完整菜单",
        
        // Booking Section
        "book-badge": "雅间预约",
        "book-title": "VIP 雅阁 · <span class='italic'>席位预约</span>",
        "book-desc": "汐澜中餐精选设有临水雅座、绿意卡座，以及四间以亚美会籍命名的美学包厢（木邻、竹友、森栖、汐澜阁）。请提前预约您的晚宴席位。",
        "info-time-title": "营业时间",
        "info-time-desc": "午市 11:30 - 14:00<br>晚市 17:30 - 21:30<br>(除夕与特殊节日营业时间请咨询客服)",
        "info-loc-title": "选址定位",
        "info-loc-desc": "海南省三亚市海棠湾椰风路8号 (紧邻亚美旅宿与18°D咖啡馆)",
        "info-phone-title": "贵宾专线",
        "info-phone-desc": "+86 (0898) 8888-6688 // wechat: SilanBistro",
        "rooms-title": "美学包厢预订指南",
        "room-wood": "「木邻」包厢 (4-6人) // 免低消",
        "room-bamboo": "「竹友」包厢 (8-10人) // 自带独立茶台",
        "room-forest": "「森栖」包厢 (12-16人) // 270°竹林水景",
        "room-silan": "「汐澜阁」包厢 (18-24人) // 奢华宴会独立配餐间",
        
        // Form
        "frm-name": "贵宾姓名",
        "frm-phone": "联络电话",
        "frm-phone-ph": "请输入手机号码 (输入会员电话以享受折扣)",
        "frm-date": "预约日期",
        "frm-time": "就餐时间段",
        "frm-guests": "贵宾人数",
        "frm-room": "预订席位类型",
        "frm-room-lobby": "大堂庭院座 (免收包厢费)",
        "frm-room-window": "玻璃幕墙卡座 (免收包厢费)",
        "frm-room-wood": "「木邻」包厢",
        "frm-room-bamboo": "「竹友」包厢",
        "frm-room-forest": "「森栖」包厢",
        "frm-room-silan": "「汐澜阁」包厢",
        "frm-diet": "特殊饮食偏好 (选填)",
        "frm-diet-ph": "例如：海鲜过敏、素食者、减盐减油等...",
        "frm-submit": "确认预约美学晚宴",
        
        // Modal & Toast
        "toast-success-book": "预约成功！已为您生成电子海岛确认单",
        "toast-err-phone": "请输入正确的11位中国手机号码",
        "toast-err-name": "请输入您的贵宾姓名",
        "toast-err-date": "请选择预约就餐日期",
        
        // Voucher
        "vch-title": "汐澜中餐精选 · VIP 预约单",
        "vch-subtitle": "SILAN BISTRO RESERVATION VOUCHER",
        "vch-id": "预约单号",
        "vch-name": "贵宾姓名",
        "vch-phone": "联络电话",
        "vch-guests": "就餐人数",
        "vch-date": "就餐日期",
        "vch-time": "就餐时间",
        "vch-seat": "所订席位",
        "vch-member": "会籍折扣",
        "vch-free": "免收服务费/包厢费",
        "vch-total": "预计尊享",
        "vch-btn-print": "截屏保存或打印此凭证",
        "vch-eco-badge": "低碳就餐环保认证 🌱",
        "vch-member-none": "无折扣 (普通宾客)",
        "vch-member-wood": "亚美「木邻」会员 9.5 折",
        "vch-member-bamboo": "亚美「竹友」会员 9.0 折",
        "vch-member-forest": "亚美「森栖」会员 8.8 折",
        "vch-perks-wood": "赠送欢迎火山绿茶 1 壶",
        "vch-perks-bamboo": "赠送主厨生态手工甜品 1 份",
        "vch-perks-forest": "免收包厢费，赠送配餐火山岩咖啡 1 壶",
        "vch-qr": "扫码核销预约单",
        "footer-copyright": "&copy; 2026 山海共生（海南）美学生活集团旗下品牌 // 18°D COFFEE / YAMEI HOTEL / SILAN BISTRO. All rights reserved.",
        "care-badge": "人文关怀",
        "care-title": "山海共生 · <span class='italic'>社会责任与温情关怀</span>",
        "care-desc": "我们不仅追求美味的火候，更关注人和大地的和谐共生。汐澜中餐作为山海共生美学生活集团的一员，致力于通过有温度的关怀将海岛连接在一起。",
        "care-c1-title": "支持非遗与在地农户",
        "care-c1-desc": "我们与五指山黎村及澄迈火山小农直接对接，采购非遗山兰酒酿与富硒农作物，支持少数民族传统手艺人传承生计，保障农户获得公平交易的阳光收益。",
        "care-c2-title": "零碳绿野餐桌",
        "care-c2-desc": "实行100%零塑料环保就餐、全方位有机湿垃圾堆肥化处理。实时公示每道菜的低碳足迹，把健康的本真风味毫无保留地馈赠给您与地球。",
        "care-c3-title": "社群温暖传递",
        "care-c3-desc": "每周二下午，餐厅设立专属于“乡村教师、医护与公益人”的免费公益赏味席位。通过这份热忱的奉茶与佳肴，向默默奉献的社会微光致敬。",
        "careers-badge": "美学事业招募",
        "careers-title": "加入汐澜 · <span class='italic'>与风物及温度同行</span>",
        "careers-desc": "山海共生集团为员工提供公平、安全且尊重个人价值的人文雇主环境。在汐澜，我们用好食材招待客人，用真心关怀身边的每一位共创伙伴。",
        "job-dept-kitchen": "厨房团队 // KITCHEN",
        "job-dept-service": "前厅服务 // SERVICE",
        "job-dept-eco": "绿色环保 // GREEN",
        "job-j1-title": "风物美学主厨 / Bistro Sous Chef",
        "job-j1-desc": "负责创意川粤菜的设计与烹饪。需要对海南在地食材与低碳烹饪有深刻的热爱，并具备人文审美视野，善于用火候讲好大地故事。",
        "job-j2-title": "美学侍膳茶艺师 / Dining & Tea Sommelier",
        "job-j2-desc": "负责餐茶搭配与桌面美学解说。为贵宾讲述海南风土民俗与食材源头，传递真诚、温暖的款待温度，不需要死板的流程，展现您的真诚个性。",
        "job-j3-title": "零碳餐厅运营官 / Zero-Carbon Steward",
        "job-j3-desc": "负责厨房湿垃圾循环堆肥、零废弃采购与餐食碳足迹的日常计量和宣导。协调集团的环保循环链条，将低碳生活落到实处。",
        "careers-note-txt": "投递意向简历至：<strong style='color: var(--bistro-accent-gold)'>join@shanhai-coexist.com</strong>（主题注明：中餐/咖啡/旅宿 意向岗位）",
        "careers-btn-all": "查看集团全部岗位"
    },
    "en": {
        // Navigation links
        "nav-home": "Home",
        "nav-order": "Table Order",
        "nav-club": "Island Club",
        "nav-booking": "Sunset Booking",
        "nav-hotel": "Yamei Hotel",
        "nav-about": "About Us",
        "nav-reserve-btn": "Reserve Sunset",
        // Shanhai Group Additions
        "group-footer-text": "A Brand of Shanhai Gongsheng Aesthetic Life Group",
        "nav-group-brand": 'Shanhai Group <i class="fa-solid fa-chevron-down"></i>',
        "nav-group-home": "Group Home | GROUP",
        "nav-group-hotel": 'YAMEI Hotel',
        "nav-group-coffee": '18°D Coffee',
        "nav-group-bistro": 'SILAN Bistro',
        "nav-group-pass": 'Shanhai Pass',
        
        // Hero
        "hero-badge": "Affiliated Silan Dining Aesthetics",
        "hero-title": "A Poetic Remaking of<br><span class='gold-glow'>Terroir & Fire</span>",
        "hero-desc": "Using Hainan local organic vegetables and coastal wild seafood, we fuse creative Sichuan & Cantonese fire cookery. In a naturalistic space of raw wood and clean water stones, we present a healthy, aesthetic Chinese dinner experience.",
        "hero-cta-menu": "Explore Menu",
        "hero-cta-book": "Book Dinner Table",
        "hero-status-organic": "Today's Sourcing: 100% Organic Direct Delivery",
        
        // Philosophy
        "philo-badge": "Culinary Philosophy",
        "philo-title": "Coexistence · <span class='italic'>Low-Carbon Dining</span>",
        "philo-desc": "We pursue taste excellence and practice sustainable coexistence with nature. As part of Shanhai Group, Silan shares a geographical soul with sister brands: coffee beans grown in volcanic soils (18°D), a sanctuary between mountains and sea (Yamei Hotel), and daily fresh catches from the coastline (Silan Bistro). Same land, three experiences, one complete Hainan. We log carbon footprint on every plate.",
        "philo-p1-num": "01",
        "philo-p1-title": "Terroir Sourcing",
        "phistro-p1-desc": "Rich-selenium loam crops in Chengmai, wild catches from Wanning sea. We contract directly with island farmers and fishermen to shorten food miles.",
        "philo-p2-num": "02",
        "philo-p2-title": "Sichuan & Cantonese Fire",
        "phistro-p2-desc": "Subtract excess grease from traditional recipes. We apply modern low-temp sous vide and charcoal griddle to seal original nutrients and tastes.",
        "philo-p3-num": "03",
        "philo-p3-title": "Carbon Ledger & Zero Waste",
        "phistro-p3-desc": "Kitchen organic waste undergoes soil compost loop. Menus mark carbon reduced per course. Every dinner is an ecological dialogue.",
        
        // Menu Section
        "menu-badge": "Seasonal Taste",
        "menu-title": "Silan Seasonal · <span class='italic'>Aesthetic Menu</span>",
        "menu-desc": "Eat in harmony with the seasons. Click tabs below to explore organic cuisines tailored weekly by our chef team.",
        "tab-all": "All Creations",
        "tab-sichuan": "Modern Sichuan",
        "tab-cantonese": "Cantonese Seas",
        "tab-organic": "Organic Garden",
        "tab-sweet": "Exquisite Ends",
        
        // Sourcing Section
        "source-badge": "Ingredients Origin",
        "source-title": "Island Terroir · <span class='italic'>Sourcing Map</span>",
        "source-desc": "We believe great food starts with great terroir. Click markers on the map to explore our Hainan ecological farms.",
        "map-tip": "Click map nodes to inspect wind and soil details",
        
        // Tasting Section
        "tasting-badge": "Tasting Cuisines",
        "tasting-title": "Chef Custom · <span class='italic'>Tasting Menu</span>",
        "tasting-desc": "Curated for connoisseurs seeking premium ceremony. The chef team organizes an epicurean concerto reflecting Hainan's island soul.",
        "tasting-t1-tag": "Seasonal Trial",
        "tasting-t1-name": "【Mountain & Sea】Tasting Menu (2 Pax)",
        "tasting-t1-price": "$59",
        "tasting-t1-unit": "/ Set",
        "tasting-t2-tag": "Highly Recommended",
        "tasting-t2-name": "【Forest Dweller】Chic Menu (4 Pax)",
        "tasting-t2-price": "$99",
        "tasting-t2-unit": "/ Set",
        "tasting-t3-tag": "Ultimate Luxury",
        "tasting-t3-name": "【Silan Signature】Tasting Masterpiece",
        "tasting-t3-price": "$139",
        "tasting-t3-unit": "/ Guest",
        "tasting-btn-view": "View Course Details",
        
        // Booking Section
        "book-badge": "VIP Reservation",
        "book-title": "VIP Chambers · <span class='italic'>Table Reservation</span>",
        "book-desc": "Silan Bistro offers poolside dining seats, garden slots, and 4 premium chambers named after Yamei memberships. Reserve your table in advance.",
        "info-time-title": "Opening Hours",
        "info-time-desc": "Lunch 11:30 - 14:00<br>Dinner 17:30 - 21:30<br>(Ask support for Lunar Eve and special holidays)",
        "info-loc-title": "Bistro Location",
        "info-loc-desc": "No.8 Yefeng Road, Haitang Bay, Sanya City, Hainan (Right next to Yamei Hotel)",
        "info-phone-title": "VIP Line",
        "info-phone-desc": "+86 (0898) 8888-6688 // wechat: SilanBistro",
        "rooms-title": "VIP Chambers Reservation Guidelines",
        "room-wood": "「Mulin」Room (4-6 Pax) // No Min Spending",
        "room-bamboo": "「Zhuyou」Room (8-10 Pax) // Built-in Gongfu tea bar",
        "room-forest": "「Senxi」Room (12-16 Pax) // 270° bamboo lake views",
        "room-silan": "「Silan Pavilion」Room (18-24 Pax) // Separate banquet pantry",
        
        // Form
        "frm-name": "Guest Name",
        "frm-phone": "Contact Phone",
        "frm-phone-ph": "Enter phone number (matches member info for discounts)",
        "frm-date": "Reservation Date",
        "frm-time": "Dining Slot",
        "frm-guests": "Guest Count",
        "frm-room": "Preferred Seat Type",
        "frm-room-lobby": "Garden Terrace Seat (Free of Room Fee)",
        "frm-room-window": "Glass-wall Booth Seat (Free of Room Fee)",
        "frm-room-wood": "「Mulin」VIP Room",
        "frm-room-bamboo": "「Zhuyou」VIP Room",
        "frm-room-forest": "「Senxi」VIP Room",
        "frm-room-silan": "「Silan Pavilion」VIP Room",
        "frm-diet": "Dietary Requests (Optional)",
        "frm-diet-ph": "E.g., Seafood allergies, vegetarian, low-salt...",
        "frm-submit": "Confirm Dinner Booking",
        
        // Modal & Toast
        "toast-success-book": "Booking confirmed! Reservation voucher generated",
        "toast-err-phone": "Please enter a valid 11-digit mobile number",
        "toast-err-name": "Please enter your name",
        "toast-err-date": "Please pick your dining date",
        
        // Voucher
        "vch-title": "SILAN BISTRO · VIP BOOKING CONFIRMATION",
        "vch-subtitle": "18°D COFFEE & YAMEI SISTER BRAND",
        "vch-id": "Order Ref",
        "vch-name": "Guest Name",
        "vch-phone": "Contact Phone",
        "vch-guests": "Total Guests",
        "vch-date": "Dining Date",
        "vch-time": "Dining Time",
        "vch-seat": "Booked Seat",
        "vch-member": "Club Discount",
        "vch-free": "Free Chamber/Service Fee Included",
        "vch-total": "Estimated Value",
        "vch-btn-print": "Print or Screenshot Voucher",
        "vch-eco-badge": "Low-Carbon Dining Certified 🌱",
        "vch-member-none": "No Discount (Guest)",
        "vch-member-wood": "Yamei 'Mulin' Member 9.5% off",
        "vch-member-bamboo": "Yamei 'Zhuyou' Member 10% off",
        "vch-member-forest": "Yamei 'Senxi' Member 12% off",
        "vch-perks-wood": "Free Welcome Volcano Green Tea (1 pot)",
        "vch-perks-bamboo": "Free Eco Handcrafted Dessert (1 serving)",
        "vch-perks-forest": "Chamber fee waived, free volcanic single-origin coffee pot",
        "vch-qr": "Scan to Verify Reservation",
        "footer-copyright": "&copy; 2026 Shanhai Coexistence (Hainan) Aesthetic Life Group. Brands // 18°D COFFEE / YAMEI HOTEL / SILAN BISTRO. All rights reserved.",
        "care-badge": "Humanistic Care",
        "care-title": "Shanhai Coexistence · <span class='italic'>Social Responsibility & Warmth</span>",
        "care-desc": "We pursue culinary excellence while caring for the coexistence between humans and nature. As a member of Shanhai Coexistence Aesthetic Life Group, Silan Bistro connects the island through warm, soulful care.",
        "care-c1-title": "Supporting Heritage & Local Farmers",
        "care-c1-desc": "We source directly from Li villages in Wuzhishan and volcanic farmers in Chengmai, purchasing non-heritage Shanlan wine and selenium-rich produce to protect local heritage and ensure fair income.",
        "care-c2-title": "Zero-Carbon Green Table",
        "care-c2-desc": "We implement 100% plastic-free green dining, organic kitchen composting, and real-time carbon footprint disclosure, giving the purest flavors back to you and the Earth.",
        "care-c3-title": "Spreading Community Warmth",
        "care-c3-desc": "Every Tuesday afternoon, we offer free tasting seats for rural teachers, medical workers, and charity volunteers, honoring these quiet lights in our community with hot tea and custom dishes.",
        "careers-badge": "Aesthetic Careers",
        "careers-title": "Join Silan · <span class='italic'>Walk with Terroir & Soul</span>",
        "careers-desc": "Shanhai Coexistence Group provides a fair, safe, and respectful employer environment. At Silan, we welcome guests with real food, and care for our co-creators with genuine warmth.",
        "job-dept-kitchen": "Kitchen Team // KITCHEN",
        "job-dept-service": "Service Team // SERVICE",
        "job-dept-eco": "Green Eco // GREEN",
        "job-j1-title": "Bistro Sous Chef",
        "job-j1-desc": "Responsible for designing and cooking creative Sichuan-Cantonese dishes. Requires a deep love for Hainan terroir and carbon-reduced cooking, using fire to tell the story of the earth.",
        "job-j2-title": "Dining & Tea Sommelier",
        "job-j2-desc": "In charge of food-tea pairings and table aesthetics. Share local Hainan customs and sourcing stories with guests, delivering warmth without rigid guidelines.",
        "job-j3-title": "Zero-Carbon Steward",
        "job-j3-desc": "Responsible for composting kitchen waste, zero-waste sourcing, and tracking food carbon footprint. Coordinate the group's eco-loop to make low-carbon living a reality.",
        "careers-note-txt": "Send resume to: <strong style='color: var(--bistro-accent-gold)'>join@shanhai-coexist.com</strong> (Subject: Bistro/Coffee/Hotel + Position)",
        "careers-btn-all": "View All Group Openings"
    }
};

function initLanguage() {
    // Check localStorage, default to 'zh' if not set
    currentLang = localStorage.getItem("lang") || "zh";
    updateLanguage(currentLang);
    
    // Setup listeners for translation button triggers
    const desktopLangBtn = document.getElementById("lang-switch-btn");
    const drawerLangBtn = document.getElementById("drawer-lang-btn");
    
    if (desktopLangBtn) {
        desktopLangBtn.addEventListener("click", () => {
            const nextLang = currentLang === "zh" ? "en" : "zh";
            updateLanguage(nextLang);
        });
    }
    
    if (drawerLangBtn) {
        drawerLangBtn.addEventListener("click", () => {
            const nextLang = currentLang === "zh" ? "en" : "zh";
            updateLanguage(nextLang);
        });
    }
}

function updateLanguage(lang) {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    localStorage.setItem("lang", lang);
    currentLang = lang;
    
    // Translate text contents by data-key
    const elements = document.querySelectorAll("[data-key]");
    elements.forEach(el => {
        const key = el.getAttribute("data-key");
        if (BISTRO_I18N[lang] && BISTRO_I18N[lang][key] !== undefined) {
            el.innerHTML = BISTRO_I18N[lang][key];
        }
    });
    
    // Translate placeholders by data-key-placeholder
    const inputElements = document.querySelectorAll("[data-key-ph]");
    inputElements.forEach(el => {
        const key = el.getAttribute("data-key-ph");
        if (BISTRO_I18N[lang] && BISTRO_I18N[lang][key] !== undefined) {
            el.setAttribute("placeholder", BISTRO_I18N[lang][key]);
        }
    });
    
    // Toggle lang switcher buttons display text
    const langBtns = document.querySelectorAll(".lang-switch-btn");
    langBtns.forEach(btn => {
        btn.textContent = lang === "zh" ? "EN" : "中文";
    });
    
    // Re-trigger category menu render and map descriptions if needed
    filterCategoryMenu(currentActiveCategory);
    updateSourcingDetail(currentActiveSourceNodeId);
}

// ==========================================================================
// 2. Interactive Menu Tabs Filtering
// ==========================================================================

// Menu raw JSON data structure
const DISH_DATA = [
    // Sichuan Modern Fusion
    {
        id: "sichuan-1",
        category: "sichuan",
        name: "火山玄武岩椒麻和牛卷",
        englishName: "Volcano Spicy Wagyu Beef Roll",
        price: 158,
        desc: "选用富硒饲料精育和牛，包裹本地微辣泡椒与鲜藤椒，置于火山玄武岩盘文火炙烧。麻香细腻，汁水丰沛。",
        desc_en: "Premium selenium-enriched wagyu beef wrapped with fresh green Sichuan peppercorns, flame-seared on local volcanic stone. Numbing, aromatic, and juicy.",
        organic: true,
        lowCarbon: true,
        co2: 0.8,
        spicy: 2,
        origin: "海南澄迈 / 牧业合作社",
        origin_en: "Chengmai / Organic Pasture",
        img: "bistro_dish_sichuan.webp"
    },
    {
        id: "sichuan-2",
        category: "sichuan",
        name: "百香果酸辣近海野石斑",
        englishName: "Passion Fruit Hot Sour Seabass",
        price: 188,
        desc: "野生石斑鱼片鲜切，搭配文昌野生百香果与糟粕醋小火吊汤，融汇川式红油酸汤。果香清甜，辣气酸爽。",
        desc_en: "Coastal wild sea bass fillets cooked in Wenchang passion fruit & local vinasse broth, drizzled with Sichuan chili oil. Fruity and tangy.",
        organic: false,
        lowCarbon: true,
        co2: 0.3,
        spicy: 1,
        origin: "海南万宁 / 近海野生捕捞",
        origin_en: "Wanning / Coastal Wild Catch",
        img: "bistro_dish_cantonese.webp"
    },
    // Cantonese Modern Fusion
    {
        id: "cantonese-1",
        category: "cantonese",
        name: "清泉清水石浸深海斑鱼柳",
        englishName: "Stone-Seared Sea Grouper Fillet",
        price: 168,
        desc: "南海近海野生红条斑，辅以澄迈火山口矿泉水蒸煮。起锅淋以秘制淡酱油，鲜嫩原味，体现本初本色。",
        desc_en: "Wild coral grouper fillet steamed with mineral water from Chengmai volcano. Finished with light soy sauce and scallions. Delicate and fresh.",
        organic: false,
        lowCarbon: true,
        co2: 0.4,
        spicy: 0,
        origin: "海南临高 / 深水网箱养殖",
        origin_en: "Lingao / Deepsea Mesh Farm",
        img: "bistro_dish_cantonese.webp"
    },
    {
        id: "cantonese-2",
        category: "cantonese",
        name: "黄金纬度椰乳文昌走地鸡",
        englishName: "18°D Coconut Milk Wenchang Chicken",
        price: 128,
        desc: "集团旗下品牌18°D咖啡特选文昌东郊有机椰乳做底，加入三亚海棠湾地缘香草慢火浸煮走地鸡。奶香醇滑，骨软肉香。",
        desc_en: "Wenchang organic free-range chicken simmered in East郊 fresh coconut milk (shared with sister brand 18°D Coffee under Shanhai Coexistence Group) and wild lemongrass. Rich and tender.",
        organic: true,
        lowCarbon: true,
        co2: 0.5,
        spicy: 0,
        origin: "海南文昌 / 椰林散养基地",
        origin_en: "Wenchang / Coconut Grove Farm",
        img: "bistro_dish_chicken.webp"
    },
    // Organic Garden (Low Carbon)
    {
        id: "organic-1",
        category: "organic",
        name: "火山红土富硒生菜拌黑豆腐",
        englishName: "Volcanic Selenium Lettuce & Tofu",
        price: 68,
        desc: "每日清晨采收的澄迈火山灰红土生菜，清爽脆嫩；搭配石磨手工黑豆腐与白沙有机绿茶碎。碳足迹近乎为零的低碳之选。",
        desc_en: "Fresh organic lettuce harvested from volcanic ashes, tossed with hand-pressed black tofu and Baisha organic tea powder. Near-zero carbon footprint.",
        organic: true,
        lowCarbon: true,
        co2: 0.1,
        spicy: 0,
        origin: "海南澄迈 / 灰烬有机农场",
        origin_en: "Chengmai / Volcanic Ashes Farm",
        img: "bistro_dish_salad.webp"
    },
    {
        id: "organic-2",
        category: "organic",
        name: "林下松露香浸火山有机小南瓜",
        englishName: "Truffle Infused Organic Pumpkin",
        price: 78,
        desc: "在生态密林下自然生长的富硒小南瓜，配合黑松露酱与初榨椰子油慢烤。瓜肉软糯起沙，野性菌香四溢。",
        desc_en: "Loam pumpkin slow-roasted with wild truffle sauce and virgin coconut oil. Rich texture and earthy aroma.",
        organic: true,
        lowCarbon: true,
        co2: 0.2,
        spicy: 0,
        origin: "海南澄迈 / 火山岩风物果园",
        origin_en: "Chengmai / Basalt Loam Orchard",
        img: "bistro_dish_pumpkin.webp"
    },
    // Exquisite Ends (Desserts)
    {
        id: "sweet-1",
        category: "sweet",
        name: "18°D冰滴咖啡椰香慕斯",
        englishName: "18°D Cold Brew Coffee Coconut Mousse",
        price: 48,
        desc: "采用集团旗下18°D咖啡实验室招牌火山岩冷萃冰滴原液，交融香兰叶汁与文昌椰肉椰奶。微苦深邃，海风清甜。",
        desc_en: "Mousse made with 18°D signature volcanic cold brew coffee (sister brand under Shanhai Coexistence Group), layered with local pandan leaf jelly and coconut cream. Bittersweet and refreshing.",
        organic: true,
        lowCarbon: true,
        co2: 0.2,
        spicy: 0,
        origin: "旗下18°D精品咖啡实验室",
        origin_en: "18°D Coffee Roastery Lab",
        img: "bistro_dish_mousse.webp"
    },
    {
        id: "sweet-2",
        category: "sweet",
        name: "五指山野生山兰酒酿奶冻",
        englishName: "Shanlan Rice Wine Panna Cotta",
        price: 52,
        desc: "选用五指山黎族村寨非遗手作山兰玉液酿制的香酒酿（支持少数民族手艺人生计），融入新鲜羊奶中温火凝成奶冻。醇厚微醺，黎乡风情温婉展现。",
        desc_en: "Silky panna cotta infused with Shanlan sweet rice wine handcrafted by Li ethnic artisans (supporting indigenous craft and livelihoods). Mildly sweet and boozy.",
        organic: true,
        lowCarbon: false,
        co2: 0.3,
        spicy: 0,
        origin: "海南五指山 / 黎村老灶酒坊",
        origin_en: "Wuzhishan / Li Village Distillery",
        img: "bistro_dish_pannacotta.webp"
    }
];

let currentActiveCategory = "all";

function setupMenuTabs() {
    const tabs = document.querySelectorAll(".menu-filters .filter-tab");
    
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const category = tab.getAttribute("data-filter");
            filterCategoryMenu(category);
        });
    });
    
    // Initial load
    filterCategoryMenu("all");
}

function filterCategoryMenu(category) {
    currentActiveCategory = category;
    const grid = document.getElementById("menu-grid-items");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    const filtered = category === "all" 
        ? DISH_DATA 
        : DISH_DATA.filter(dish => dish.category === category);
        
    filtered.forEach((dish, idx) => {
        const card = document.createElement("div");
        card.className = "dish-card fade-in-up-anim";
        card.style.animationDelay = `${idx * 0.08}s`;
        
        // Build Badges
        let badgesHtml = "";
        if (dish.organic) {
            badgesHtml += `<span class="tag-badge tag-badge-organic">${currentLang === 'en' ? 'Organic' : '有机农产'}</span>`;
        }
        if (dish.lowCarbon) {
            badgesHtml += `<span class="tag-badge tag-badge-lowcarbon">${currentLang === 'en' ? 'Low-Carbon' : '低碳'} -${dish.co2}kg</span>`;
        }
        if (dish.spicy > 0) {
            const spicyStars = "🌶️".repeat(dish.spicy);
            badgesHtml += `<span class="tag-badge tag-badge-spicy">${spicyStars}</span>`;
        }
        
        const nameText = currentLang === "en" ? dish.englishName : dish.name;
        const descText = currentLang === "en" ? dish.desc_en : dish.desc;
        const originText = currentLang === "en" ? dish.origin_en : dish.origin;
        const moreBtnLabel = currentLang === "en" ? "Story" : "风物故事";
        
        card.innerHTML = `
            <div class="dish-img-wrap">
                <img class="dish-img" src="${dish.img}" alt="${nameText}">
                <div class="dish-tags">${badgesHtml}</div>
            </div>
            <div class="dish-content">
                <div class="dish-header">
                    <h4 class="dish-title">${nameText}</h4>
                    <span class="dish-price">¥${dish.price}</span>
                </div>
                <p class="dish-desc">${descText}</p>
                <div class="dish-footer">
                    <span class="dish-origin"><i class="fa-solid fa-location-dot"></i> ${originText}</span>
                    <button class="dish-more-btn" data-id="${dish.id}">${moreBtnLabel} <i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Bind click events to "Story" buttons
    const storyButtons = grid.querySelectorAll(".dish-more-btn");
    storyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const dishId = btn.getAttribute("data-id");
            showDishDetailModal(dishId);
        });
    });
}

// Open Detail Modal for dishes
function showDishDetailModal(dishId) {
    const dish = DISH_DATA.find(d => d.id === dishId);
    if (!dish) return;
    
    const overlay = document.getElementById("dish-detail-modal-overlay");
    const nameText = currentLang === "en" ? dish.englishName : dish.name;
    const descText = currentLang === "en" ? dish.desc_en : dish.desc;
    
    if (!overlay) return;
    
    overlay.querySelector(".modal-dish-img").src = dish.img;
    overlay.querySelector(".modal-dish-title").textContent = nameText;
    overlay.querySelector(".modal-dish-price").textContent = `¥${dish.price}`;
    overlay.querySelector(".modal-dish-story").textContent = descText;
    
    // Extra details based on language
    const footerHtml = currentLang === "en" 
        ? `<p><strong style="color:var(--bistro-accent-gold)">Sourcing:</strong> ${dish.origin_en}</p>
           <p style="margin-top: 8px"><strong style="color:#5bb374">Eco-Contribution:</strong> Solved locally, reducing carbon emission by ${dish.co2} kg compared to import logistics.</p>`
        : `<p><strong style="color:var(--bistro-accent-gold)">风物产地:</strong> ${dish.origin}</p>
           <p style="margin-top: 8px"><strong style="color:#5bb374">环保贡献:</strong> 在海南本岛直采，运输物流大幅缩短，对比进口渠道单份减排二酸化碳约 ${dish.co2} 公斤。</p>`;
           
    overlay.querySelector(".modal-dish-extra").innerHTML = footerHtml;
    
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // lock page scroll
    
    // Bind close
    const closeBtn = overlay.querySelector(".modal-close-btn");
    const closeHandler = () => {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        closeBtn.removeEventListener("click", closeHandler);
        overlay.removeEventListener("click", backdropHandler);
    };
    const backdropHandler = (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
            closeBtn.removeEventListener("click", closeHandler);
            overlay.removeEventListener("click", backdropHandler);
        }
    };
    closeBtn.addEventListener("click", closeHandler);
    overlay.addEventListener("click", backdropHandler);
}

// ==========================================================================
// 3. Interactive Sourcing Map
// ==========================================================================

const SOURCING_NODES = {
    "node-chengmai": {
        name: "澄迈火山红土基地",
        name_en: "Chengmai Volcanic Loam Farm",
        location: "海南澄迈 (Basalt Soil, 19.7° N)",
        location_en: "Chengmai, Hainan (Basalt Soil)",
        desc: "灰烬红土富含硒、铁等数十种稀有矿物质，土质松软保水。我们签约的120亩生态合作农庄在此种植有机叶菜与黄金小南瓜，每日清晨5点采收，上午9点前运抵餐厅厨房。",
        desc_en: "Rich volcanic soil, packed with selenium and basalt minerals. Our 20-acre organic farm harvests leafy garden greens and gold loam pumpkins daily at 5:00 AM, arriving at the kitchen by 9:00 AM.",
        dishId: "organic-1"
    },
    "node-wenchang": {
        name: "文昌走地鸡林下饲育园",
        name_en: "Wenchang Poultry Coconut Grove",
        location: "海南文昌 (Coconut forest, 19.6° N)",
        location_en: "Wenchang, Hainan (Coconut Forest)",
        desc: "文昌散养走地鸡，白天啄食椰子肉碎与草籽，晚间栖息于椰子树下，活动量充裕。肉质紧实多汁，融入椰子清乳焖煮，是不可多得的海岛代表味道。",
        desc_en: "Wenchang free-range chickens raised under tall palm trees. Feed includes shredded organic coconut flesh and forest herbs, yielding premium tender meat ideal for slow coconut broth braising.",
        dishId: "cantonese-2"
    },
    "node-wanning": {
        name: "万宁港口野生海鲜采收站",
        name_en: "Wanning Wild Catch Sea Station",
        location: "海南万宁 (Wild Sea Catch, 18.8° N)",
        location_en: "Wanning, Hainan (Coastal Sea Catch)",
        desc: "紧靠东南部大陆架急流，近海渔业资源丰富。我们与万宁生态小木船渔民合作，获取每日捕捞的野生红条斑、东星斑与深海角虾，海鲜出水至入锅不超过6小时，鲜甜逼人。",
        desc_en: "Situated right next to deep warm ocean streams, boasting abundant marine ecosystems. We buy daily catches directly from artisanal wooden fishing boats. Time from ocean to kitchen table is under 6 hours.",
        dishId: "sichuan-2"
    },
    "node-baisha": {
        name: "白沙高山有机绿茶园",
        name_en: "Baisha High-altitude Tea Ridge",
        location: "海南白沙 (High-altitude Cloud, 19.2° N)",
        location_en: "Baisha, Hainan (Highland Cloud Mist)",
        desc: "位于白沙陨石坑边缘的千米高山之上，常年云雾缭绕。有机茶树不施农药，茶叶含有独特的矿质蜜香，茶汤翠绿清澈，我们用其磨粉配餐，提鲜解腻效果绝佳。",
        desc_en: "Grown in the high-elevation ring of the Baisha prehistoric meteor crater. Moist mist and intense UV produce mineral-rich tea leaves. We grind organic green tea into fine powder for table seasoning.",
        dishId: "organic-1"
    }
};

let currentActiveSourceNodeId = "node-chengmai";

function setupSourcingMap() {
    const nodes = document.querySelectorAll(".hainan-svg .map-node");
    
    nodes.forEach(node => {
        node.addEventListener("click", () => {
            nodes.forEach(n => n.classList.remove("active"));
            node.classList.add("active");
            
            const nodeId = node.id;
            updateSourcingDetail(nodeId);
        });
    });
    
    // Trigger initial node display
    updateSourcingDetail("node-chengmai");
}

function updateSourcingDetail(nodeId) {
    currentActiveSourceNodeId = nodeId;
    const data = SOURCING_NODES[nodeId];
    if (!data) return;
    
    const card = document.getElementById("sourcing-detail-card-el");
    if (!card) return;
    
    // Add flashing animation
    card.classList.remove("highlight-flash");
    void card.offsetWidth; // trigger reflow
    card.classList.add("highlight-flash");
    
    // Lookup associated dish
    const dish = DISH_DATA.find(d => d.id === data.dishId);
    
    const locTitle = currentLang === "en" ? data.location_en : data.location;
    const nameTitle = currentLang === "en" ? data.name_en : data.name;
    const descText = currentLang === "en" ? data.desc_en : data.desc;
    
    const labelSourcing = currentLang === "en" ? "Wind & Soil Sourcing" : "地缘风物寻源";
    const labelDish = currentLang === "en" ? "Associated Cuisine" : "主推风物菜肴";
    const dishNameText = dish ? (currentLang === "en" ? dish.englishName : dish.name) : "";
    const dishTagText = dish ? (currentLang === "en" ? "Explore Menu Below" : "时令推荐菜") : "";
    const dishImgSrc = dish ? dish.img : "";
    
    card.innerHTML = `
        <div class="source-header">
            <span class="source-location"><i class="fa-solid fa-location-dot"></i> ${locTitle}</span>
            <h4 class="source-name">${nameTitle}</h4>
        </div>
        <p class="source-desc">${descText}</p>
        ${dish ? `
            <div class="source-dish-link">
                <img class="source-dish-thumb" src="${dishImgSrc}" alt="${dishNameText}">
                <div class="source-dish-info">
                    <span class="source-dish-tag">${labelDish}</span>
                    <span class="source-dish-name">${dishNameText}</span>
                </div>
            </div>
        ` : ''}
    `;
}

// ==========================================================================
// 4. Chef's Tasting Menu Drawers
// ==========================================================================

const TASTING_COURSES_DETAILS = {
    "tasting-399": {
        title: "【山海风物】尝鲜双人套餐 Course Details",
        courses: [
            { course: "迎宾茶礼 / Welcome Tea", name: "火山灰有机绿茶 / Volcanic Ash Organic Green Tea" },
            { course: "前菜双拼 / Cold Appetizers", name: "海南藤椒黑豆腐 & 酸辣拌野生木耳 / Tengjiao Tofu & Wild Woodear Salad" },
            { course: "暖胃汤品 / Soup", name: "澄迈地瓜富硒排骨清汤 / Sweet Potato & Pork Rib Broth" },
            { course: "美学主菜 / Mains", name: "黄金纬度椰乳文昌走地鸡 & 糟粕醋焖大虾 / Wenchang Coconut Chicken & Vinasse Shrimp" },
            { course: "时令田野 / Greens", name: "蒜蓉火山红土生菜 / Garlic Loam Selenium Lettuce" },
            { course: "极简甜点 / Dessert", name: "传统清补凉配香兰叶冰霜 / Hainan Ching Bo Leung & Pandan Sorbet" }
        ]
    },
    "tasting-699": {
        title: "【林栖深眠】雅致四人套餐 Course Details",
        courses: [
            { course: "迎宾茶礼 / Welcome Tea", name: "五指山蜜香红茶 / Wuzhishan Honey Aroma Black Tea" },
            { course: "精致前菜 / Cold Dishes", name: "黑松露火山小南瓜 & 凉拌澄迈贡笋 / Truffle Pumpkin & Seasoned Bamboo Shoots" },
            { course: "清润汤品 / Soup", name: "五指山野生灵芝野菌炖鸡汤 / Wild Mushroom & Ginseng Chicken Soup" },
            { course: "意境主厨菜 / Mains", name: "火山玄武岩椒麻和牛卷 (大份) & 清蒸深海斑鱼柳 & 白沙绿茶虾仁 / Volcanic Wagyu Beef & Steamed Grouper Fillet & Tea Shrimps" },
            { course: "时令田野 / Greens", name: "清炒火山灰富硒时令绿蔬 / Stir-fried Seasonal Loam Organic Greens" },
            { course: "极简甜点 / Dessert", name: "18°D冰滴咖啡椰香慕斯 (四份) / 18°D Cold Brew Coffee Coconut Mousse" }
        ]
    },
    "tasting-999": {
        title: "【汐澜印记】尊享主厨定制套餐 Course Details",
        courses: [
            { course: "奉茶奉酒 / Sips", name: "火山手工特选绿茶 / 黎族五指山山兰玉液酒 / Aged Shanlan Rice Wine" },
            { course: "主厨序曲 / Pre-Appetizer", name: "火山温泉黑米酥脆豆腐配鱼子酱 / Crispy Black Rice Tofu with Caviar" },
            { course: "前菜三部曲 / Appetizers", name: "椒麻和牛塔塔 & 百香果近海带子 & 醋汁海葡萄 / Wagyu Tartare & Passionfruit Scallop & Sea Grapes" },
            { course: "功夫汤品 / Soup", name: "文昌鸡骨架陈皮慢炖深海花胶汤 / Fish Maw & Aged Tangerine Peel Chicken Consomme" },
            { course: "深海风物 / Seafood Main", name: "清泉清水石浸南海野生红条斑柳 / Volcano Mineral Water Steamed Red Coral Grouper Fillet" },
            { course: "陆地珍馐 / Land Main", name: "极品火山红土火山石板炙烧和牛配山兰酒酱 / Basalt-Grilled Wagyu Tenderloin with Shanlan Wine Reduction" },
            { course: "主厨主食 / Staple", name: "海南近海野生海胆滑蛋黑金炒饭 / Wild Sea Urchin & Egg Black Gold Fried Rice" },
            { course: "甜蜜谢幕 / Dessert", name: "18°D咖啡冰滴椰奶露配五指山山兰酒酿奶冻 / Double Layered Coffee Panna Cotta with Shanlan Wine" }
        ]
    }
};

function setupTastingMenuDrawer() {
    const buttons = document.querySelectorAll(".tasting-card .btn-tasting-order");
    
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const packId = btn.getAttribute("data-id");
            showTastingMenuModal(packId);
        });
    });
}

function showTastingMenuModal(packId) {
    const data = TASTING_COURSES_DETAILS[packId];
    if (!data) return;
    
    const overlay = document.getElementById("tasting-drawer-overlay");
    if (!overlay) return;
    
    overlay.querySelector(".drawer-title").textContent = currentLang === "en" ? data.title.replace("Course Details", "Courses") : data.title.replace("Course Details", "完整菜单");
    
    const listContainer = overlay.querySelector(".drawer-courses-list");
    listContainer.innerHTML = "";
    
    data.courses.forEach((c, idx) => {
        const item = document.createElement("div");
        item.className = "drawer-course-item fade-in-up-anim";
        item.style.animationDelay = `${idx * 0.05}s`;
        item.style.display = "flex";
        item.style.justifyContent = "space-between";
        item.style.padding = "14px 0";
        item.style.borderBottom = "1px solid rgba(197, 168, 128, 0.1)";
        
        item.innerHTML = `
            <span style="color:var(--bistro-accent-gold); font-size: 0.85rem; font-weight:600">${c.course}</span>
            <span style="color:var(--bistro-text); font-weight:700; font-size: 0.95rem">${c.name}</span>
        `;
        listContainer.appendChild(item);
    });
    
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    
    const closeBtn = overlay.querySelector(".modal-close-btn");
    const closeHandler = () => {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        closeBtn.removeEventListener("click", closeHandler);
        overlay.removeEventListener("click", backdropHandler);
    };
    const backdropHandler = (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
            document.body.style.overflow = "";
            closeBtn.removeEventListener("click", closeHandler);
            overlay.removeEventListener("click", backdropHandler);
        }
    };
    closeBtn.addEventListener("click", closeHandler);
    overlay.addEventListener("click", backdropHandler);
}

// ==========================================================================
// 5. VIP Booking & Member System Integration
// ==========================================================================

let activeMemberData = null; // Caches matched member profile

function setupVipBooking() {
    const phoneInput = document.getElementById("book-phone");
    const memberPanel = document.getElementById("booking-member-panel");
    const form = document.getElementById("bistro-booking-form");
    
    if (phoneInput && memberPanel) {
        phoneInput.addEventListener("input", () => {
            const phoneVal = phoneInput.value.trim();
            
            // Check if phone matches any saved loyalty profiles in localStorage
            // Supports both yamei_member_phone and coff_member_phone
            const savedYameiPhone = localStorage.getItem("yamei_member_phone");
            const savedCoffPhone = localStorage.getItem("coff_member_phone");
            
            if (phoneVal.length === 11) {
                if (phoneVal === savedYameiPhone) {
                    // Yamei Hotel Member match
                    activeMemberData = {
                        name: localStorage.getItem("yamei_member_name"),
                        gender: localStorage.getItem("yamei_member_gender") || "贵宾",
                        phone: phoneVal,
                        tierClass: localStorage.getItem("yamei_member_tierClass"),
                        tierName: localStorage.getItem("yamei_member_tierName"),
                        origin: "yamei"
                    };
                    showMemberPanel(activeMemberData);
                } else if (phoneVal === savedCoffPhone) {
                    // Coffee Member match
                    let tier = localStorage.getItem("coff_member_tier") || "wanderer";
                    let tierClass = "tier-wood";
                    let tierName = "木邻 Neighbor";
                    if (tier === "host") {
                        tierClass = "tier-forest";
                        tierName = "森栖 Dweller";
                    } else if (tier === "curator") {
                        tierClass = "tier-bamboo";
                        tierName = "竹友 Friend";
                    }
                    
                    activeMemberData = {
                        name: localStorage.getItem("coff_member_name"),
                        gender: "贵宾",
                        phone: phoneVal,
                        tierClass: tierClass,
                        tierName: tierName,
                        origin: "coffee"
                    };
                    showMemberPanel(activeMemberData);
                } else {
                    // Not matches localStorage, fallback simulated rules by phone digit (for testing / demo convenience)
                    const lastDigit = parseInt(phoneVal.slice(-1), 10);
                    if (!isNaN(lastDigit)) {
                        let tierClass = "tier-wood";
                        let tierName = currentLang === "en" ? "Mulin Member" : "木邻会员";
                        if (lastDigit % 3 === 0) {
                            tierClass = "tier-forest";
                            tierName = currentLang === "en" ? "Senxi Member" : "森栖会员";
                        } else if (lastDigit % 2 === 0) {
                            tierClass = "tier-bamboo";
                            tierName = currentLang === "en" ? "Zhuyou Member" : "竹友会员";
                        }
                        
                        activeMemberData = {
                            name: currentLang === "en" ? "MEMBER GUEST" : "尊贵会员",
                            gender: "",
                            phone: phoneVal,
                            tierClass: tierClass,
                            tierName: tierName,
                            origin: "simulated"
                        };
                        showMemberPanel(activeMemberData);
                    }
                }
            } else {
                activeMemberData = null;
                memberPanel.style.display = "none";
            }
        });
    }
    
    // Booking Form Submission Handler
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("book-name").value.trim();
            const phone = document.getElementById("book-phone").value.trim();
            const date = document.getElementById("book-date").value;
            const timeSlot = document.getElementById("book-time-slot").value;
            const guests = document.getElementById("book-guests-count").value;
            const roomEl = document.getElementById("book-room-type");
            const roomVal = roomEl.options[roomEl.selectedIndex].text;
            
            // Basic Validaions
            if (!name) {
                showToastNotification(BISTRO_I18N[currentLang]["toast-err-name"], "error");
                return;
            }
            if (phone.length !== 11 || isNaN(phone)) {
                showToastNotification(BISTRO_I18N[currentLang]["toast-err-phone"], "error");
                return;
            }
            if (!date) {
                showToastNotification(BISTRO_I18N[currentLang]["toast-err-date"], "error");
                return;
            }
            
            // Build Reservation Voucher ticket
            const overlay = document.getElementById("booking-voucher-modal-overlay");
            if (!overlay) return;
            
            // Generate Random ID
            const dateStr = date.replace(/-/g, "");
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const refId = `SL${dateStr}${randomNum}`;
            
            // Determine discount & perks based on member tier
            let discountText = BISTRO_I18N[currentLang]["vch-member-none"];
            let perksText = currentLang === "en" ? "Free Organic Herbal Tea on Arrival" : "入店即奉欢迎火山有机茶";
            let discountValue = 1.0;
            
            if (activeMemberData) {
                if (activeMemberData.tierClass === "tier-forest") {
                    discountText = BISTRO_I18N[currentLang]["vch-member-forest"];
                    perksText = BISTRO_I18N[currentLang]["vch-perks-forest"];
                    discountValue = 0.88;
                } else if (activeMemberData.tierClass === "tier-bamboo") {
                    discountText = BISTRO_I18N[currentLang]["vch-member-bamboo"];
                    perksText = BISTRO_I18N[currentLang]["vch-perks-bamboo"];
                    discountValue = 0.90;
                } else {
                    discountText = BISTRO_I18N[currentLang]["vch-member-wood"];
                    perksText = BISTRO_I18N[currentLang]["vch-perks-wood"];
                    discountValue = 0.95;
                }
            }
            
            // Calculate mock average cost based on seating
            let averageBase = 200; // regular terrace
            if (roomEl.value.includes("silan")) averageBase = 500;
            else if (roomEl.value.includes("forest") || roomEl.value.includes("bamboo")) averageBase = 350;
            
            const totalBase = averageBase * parseInt(guests, 10);
            const finalTotal = Math.round(totalBase * discountValue);
            
            // Fill voucher fields
            overlay.querySelector("#vch-val-id").textContent = refId;
            overlay.querySelector("#vch-val-name").textContent = name;
            overlay.querySelector("#vch-val-phone").textContent = phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
            overlay.querySelector("#vch-val-guests").textContent = `${guests} ${currentLang === 'en' ? 'Guests' : '位'}`;
            overlay.querySelector("#vch-val-date").textContent = date;
            overlay.querySelector("#vch-val-time").textContent = timeSlot;
            overlay.querySelector("#vch-val-seat").textContent = roomVal;
            overlay.querySelector("#vch-val-member").textContent = discountText;
            overlay.querySelector("#vch-val-perks").textContent = perksText;
            
            // Set price label
            const priceLabel = currentLang === "en" ? `Est. ¥${finalTotal} (Eco-Tasting)` : `合计 ¥${finalTotal} (主厨套餐预估)`;
            overlay.querySelector("#vch-val-total").textContent = priceLabel;
            
            // Toggle discount text styling
            if (activeMemberData) {
                overlay.querySelector("#vch-val-member").className = "voucher-value discounted";
            } else {
                overlay.querySelector("#vch-val-member").className = "voucher-value";
            }
            
            // Generate real QR code offline
            const qrBox = overlay.querySelector(".voucher-qrcode-placeholder");
            if (qrBox) {
                qrBox.innerHTML = "";
                qrBox.classList.add("real-qr");
                const verifyUrl = `https://austin6688666.github.io/ma/bistro.html?verify=bistro&id=${refId}&name=${encodeURIComponent(name)}&date=${date}&time=${encodeURIComponent(timeSlot)}&guests=${guests}`;
                new QRCode(qrBox, {
                    text: verifyUrl,
                    width: 80,
                    height: 80,
                    colorDark: "#1c1a17",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.M
                });
            }

            // Open Modal
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
            
            // Toast Success
            showToastNotification(BISTRO_I18N[currentLang]["toast-success-book"], "success");
            
            // Reset form
            form.reset();
            if (memberPanel) memberPanel.style.display = "none";
            activeMemberData = null;
            
            // Re-set default tomorrow date
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById("book-date").value = tomorrow.toISOString().split('T')[0];
            
            // Close Voucher modal binding
            const closeBtn = overlay.querySelector(".modal-close-btn");
            const closeHandler = () => {
                overlay.classList.remove("active");
                document.body.style.overflow = "";
                closeBtn.removeEventListener("click", closeHandler);
                overlay.removeEventListener("click", backdropHandler);
            };
            const backdropHandler = (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove("active");
                    document.body.style.overflow = "";
                    closeBtn.removeEventListener("click", closeHandler);
                    overlay.removeEventListener("click", backdropHandler);
                }
            };
            closeBtn.addEventListener("click", closeHandler);
            overlay.addEventListener("click", backdropHandler);

            // Auto-close success voucher modal after 6 seconds
            setTimeout(() => {
                if (overlay.classList.contains("active")) {
                    overlay.classList.remove("active");
                    document.body.style.overflow = "";
                    closeBtn.removeEventListener("click", closeHandler);
                    overlay.removeEventListener("click", backdropHandler);
                }
            }, 6000);
        });
    }
    
    // Set tomorrow's date as default in booking form date input
    const dateInput = document.getElementById("book-date");
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
        dateInput.min = tomorrow.toISOString().split('T')[0]; // Can't book past dates
    }
}

function showMemberPanel(data) {
    const memberPanel = document.getElementById("booking-member-panel");
    if (!memberPanel) return;
    
    const titleEl = memberPanel.querySelector(".member-title-txt");
    const descEl = memberPanel.querySelector(".member-desc-txt");
    
    let displayTitle = "";
    let displayDesc = "";
    
    if (currentLang === "en") {
        displayTitle = `Recognized: ${data.tierName} ✨`;
        if (data.tierClass === "tier-forest") {
            displayDesc = "12% Off dinner table booking, VIP chamber fee waived, and free single-origin coffee pot.";
        } else if (data.tierClass === "tier-bamboo") {
            displayDesc = "10% Off dinner booking, and free handcrafted seasonal dessert.";
        } else {
            displayDesc = "5% Off dinner booking, and free volcanic green tea pot.";
        }
    } else {
        displayTitle = `已识别：${data.tierName} ✨`;
        if (data.tierClass === "tier-forest") {
            displayDesc = "享 8.8 折优惠，免包厢费，现场赠送主厨定制配餐手冲咖啡 1 壶。";
        } else if (data.tierClass === "tier-bamboo") {
            displayDesc = "享 9.0 折优惠，现场获赠主厨手工定制甜品 1 份。";
        } else {
            displayDesc = "享 9.5 折优惠，现场获赠欢迎火山绿茶 1 壶。";
        }
    }
    
    titleEl.textContent = displayTitle;
    descEl.textContent = displayDesc;
    
    memberPanel.style.display = "flex";
}

// ==========================================================================
// Helper: Toast Notifications
// ==========================================================================

function showToastNotification(message, type = "success") {
    // Shared container
    let container = document.getElementById("toast-container-bistro");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container-bistro";
        container.style.position = "fixed";
        container.style.bottom = "30px";
        container.style.right = "30px";
        container.style.zIndex = "10001";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "10px";
        document.body.appendChild(container);
    }
    
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.style.background = "#1c1f1d";
    toast.style.color = "#fdfcf7";
    toast.style.border = type === "success" ? "1px solid #3c5c43" : "1px solid #e2583e";
    toast.style.padding = "16px 24px";
    toast.style.borderRadius = "4px";
    toast.style.boxShadow = "0 8px 30px rgba(0,0,0,0.5)";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "12px";
    toast.style.fontSize = "0.9rem";
    toast.style.fontFamily = "var(--font-sans)";
    toast.style.animation = "slideDown 0.3s ease";
    
    const iconColor = type === "success" ? "#5bb374" : "#e2583e";
    const icon = type === "success" 
        ? `<i class="fa-solid fa-circle-check" style="color:${iconColor}"></i>` 
        : `<i class="fa-solid fa-circle-exclamation" style="color:${iconColor}"></i>`;
        
    toast.innerHTML = `${icon} <span style="font-weight:500">${message}</span>`;
    container.appendChild(toast);
    
    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ==========================================================================
// 6. Scroll Reveal Observer
// ==========================================================================
function setupScrollReveal() {
    const elementsToReveal = document.querySelectorAll(".scroll-reveal");
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(el => observer.observe(el));
}

// Dynamic premium verification modal
function checkUrlVerification() {
    const params = new URLSearchParams(window.location.search);
    const verifyType = params.get("verify");
    if (!verifyType) return;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(11, 13, 12, 0.9)";
    overlay.style.backdropFilter = "blur(12px)";
    overlay.style.webkitBackdropFilter = "blur(12px)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "20000";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.5s ease";

    const card = document.createElement("div");
    card.style.background = "#FDFCF7";
    card.style.border = "2px solid #C5A880";
    card.style.borderRadius = "12px";
    card.style.padding = "40px";
    card.style.maxWidth = "450px";
    card.style.width = "90%";
    card.style.boxShadow = "0 20px 50px rgba(0,0,0,0.3)";
    card.style.textAlign = "center";
    card.style.color = "#111312";
    card.style.fontFamily = "system-ui, -apple-system, sans-serif";
    card.style.transform = "translateY(30px)";
    card.style.transition = "transform 0.5s ease";

    // Green/gold checkmark circle
    const iconContainer = document.createElement("div");
    iconContainer.style.width = "70px";
    iconContainer.style.height = "70px";
    iconContainer.style.borderRadius = "50%";
    iconContainer.style.background = "#3C5C43";
    iconContainer.style.color = "#fff";
    iconContainer.style.display = "flex";
    iconContainer.style.alignItems = "center";
    iconContainer.style.justifyContent = "center";
    iconContainer.style.fontSize = "2rem";
    iconContainer.style.margin = "0 auto 20px auto";
    iconContainer.style.boxShadow = "0 0 20px rgba(60, 92, 67, 0.4)";
    iconContainer.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    card.appendChild(iconContainer);

    const title = document.createElement("h3");
    title.style.margin = "0 0 10px 0";
    title.style.fontFamily = "Georgia, serif";
    title.style.fontSize = "1.5rem";
    title.style.color = "#3C5C43";
    
    const subtitle = document.createElement("p");
    subtitle.style.fontSize = "0.75rem";
    subtitle.style.textTransform = "uppercase";
    subtitle.style.letterSpacing = "2px";
    subtitle.style.color = "#7C7D7C";
    subtitle.style.margin = "0 0 25px 0";

    const infoBox = document.createElement("div");
    infoBox.style.background = "rgba(197, 168, 128, 0.08)";
    infoBox.style.border = "1px solid rgba(197, 168, 128, 0.2)";
    infoBox.style.borderRadius = "8px";
    infoBox.style.padding = "20px";
    infoBox.style.marginBottom = "30px";
    infoBox.style.textAlign = "left";
    infoBox.style.fontSize = "0.9rem";
    infoBox.style.lineHeight = "1.8";

    let titleText = "";
    let subtitleText = "";
    let htmlContent = "";

    if (verifyType === "bistro") {
        titleText = "汐澜中餐预约核销成功";
        subtitleText = "SILAN BISTRO RESERVATION VERIFIED";
        const id = params.get("id") || "N/A";
        const name = params.get("name") || "N/A";
        const date = params.get("date") || "N/A";
        const time = params.get("time") || "N/A";
        const guests = params.get("guests") || "N/A";
        htmlContent = `
            <div><strong>预约订单号:</strong> <span style="font-family:monospace">${id}</span></div>
            <div><strong>贵宾姓名:</strong> <span style="font-weight:700">${name}</span></div>
            <div><strong>预订日期:</strong> <span>${date}</span></div>
            <div><strong>就餐时间:</strong> <span>${time}</span></div>
            <div><strong>座席人数:</strong> <span>${guests}</span></div>
            <div style="border-top:1px dashed #d4c5b3; margin-top:10px; padding-top:10px; color:#3C5C43; font-weight:bold; text-align:center">
                🍱 慢磨火山物候，山海风味共赏
            </div>
        `;
    }

    title.textContent = titleText;
    subtitle.textContent = subtitleText;
    infoBox.innerHTML = htmlContent;

    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(infoBox);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "确认核销 / Confirm";
    closeBtn.style.width = "100%";
    closeBtn.style.padding = "14px";
    closeBtn.style.background = "#3C5C43";
    closeBtn.style.color = "#fff";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "6px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.fontSize = "0.95rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.transition = "background-color 0.3s ease";
    closeBtn.onmouseover = () => closeBtn.style.backgroundColor = "#2b4c30";
    closeBtn.onmouseout = () => closeBtn.style.backgroundColor = "#3C5C43";
    closeBtn.onclick = () => {
        overlay.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        setTimeout(() => overlay.remove(), 500);
        window.history.replaceState({}, document.title, window.location.pathname);
    };
    card.appendChild(closeBtn);

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, 50);
}
