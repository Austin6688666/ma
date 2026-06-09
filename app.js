/**
 * 18°D COFFEE - App Controller
 * Dynamic menu loading, Sunset seat booking flow, Member registration, Live parameters, and UI interactions with i18n support.
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
        description_en: "Crafted with medium-dark roasted coffee beans grown in Chengmai volcanic soil, blended with cold-pressed organic coconut milk from Wenchang. Features sweet coconut aromas followed by robust nutty and caramel notes.",
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
        description_en: "18-hour cold brew specialty Yirgacheffe, blended with 100% fresh Wenchang coconut water. A refreshing harmony of citrus blossom and sweet coconut notes, the ultimate summer escape.",
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
        description_en: "Inspired by Haitang Bay sunsets. Double espresso infused with roasted orange syrup, topped with sea salt milk foam. A drinkable coastal sunset glow.",
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
        description_en: "Grown in iron-rich volcanic soils in Chengmai. Hand-dripped slowly to yield rich roasted hazelnuts and dark chocolate aromas with a sweet, lingering brown sugar finish.",
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
        description_en: "Grown in Ethiopia's high elevation. Light roasted and washed. Presents clean citrus acidity and elegant jasmine aromas with a refreshing finish like mountain springs.",
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
        description_en: "Double anaerobic washed processing, light-medium roast. Succulent notes of ripe peach and strawberry fruitiness with sophisticated rose fragrance.",
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
        description_en: "A miniature espresso-milk cup with dense crema. Delivers a bold nutty cocoa punch followed by velvety milk sweetness.",
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
        description_en: "A thin-foam latte crafted with finely ground volcanic espresso. Extremely silky texture harmonized with roasted nuts and sweet fresh milk.",
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
        description_en: "Double espresso shot extracted at a scientific 1:2 ratio. Intense volcanic bean core notes of dark cocoa and long-lasting aroma.",
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
        description_en: "Made with freshly squeezed Hainan pandan juice and Wenchang coconut milk. The cloud-like mousse yields refreshing herbal and sweet coconut aromas.",
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
        description_en: "Baked with natural edible bamboo charcoal for a raw volcanic stone aesthetic. Crispy exterior, soft inside, served with organic coffee blossom honey spread.",
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
        description_en: "Dedicated to Sanya sanitation workers, riders, and beach volunteers. Pure cold-pressed coconut water served chilled. 100% sponsored by the community pending cup fund. Free for outdoor workers.",
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
        description_en: "Brewed for early morning fishermen and street workers. Fresh coconut milk blended with Chengmai warm ginger juice. Gently spicy and stomach-warming. Provided at only ¥1.",
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
        description_en: "Brewed with local Hainan partridge tea leaves and white chrysanthemums in the deck barrels. Fully free refills using your own cups for any passersby seeking relief from Sanya's heat.",
        tags: ["完全免费", "清热解暑", "自带杯续装"],
        accent: false,
        coord: "Free Refill",
        formula: "Brew: 45min | Partridge Tea: 70% | Chrysanthemum: 30%"
    }
];

// Tag translations mapping
const TAG_MAP = {
    "招牌": { zh: "招牌", en: "Signature" },
    "冷榨椰乳": { zh: "冷榨椰乳", en: "Cold Pressed Coconut" },
    "火山豆基底": { zh: "火山豆基底", en: "Volcanic Base" },
    "清甜椰水": { zh: "清甜椰水", en: "Fresh Coconut Water" },
    "18h冷萃": { zh: "18h冷萃", en: "18h Cold Brew" },
    "柑橘花香": { zh: "柑橘花香", en: "Citrus Blossom" },
    "海盐奶盖": { zh: "海盐奶盖", en: "Sea Salt Foam" },
    "烤橘香气": { zh: "烤橘香气", en: "Roasted Orange" },
    "日落特调": { zh: "日落特调", en: "Sunset Blend" },
    "手冲精品": { zh: "手冲精品", en: "Specialty Pour" },
    "澄迈单品": { zh: "澄迈单品", en: "Chengmai SO" },
    "火山红土": { zh: "火山红土", en: "Volcanic Soil" },
    "浅度烘焙": { zh: "浅度烘焙", en: "Light Roast" },
    "柠檬柑橘": { zh: "柠檬柑橘", en: "Citrus Notes" },
    "茉莉花香": { zh: "茉莉花香", en: "Jasmine Aroma" },
    "微发酵": { zh: "微发酵", en: "Micro-fermented" },
    "水蜜桃": { zh: "水蜜桃", en: "Peach Notes" },
    "玫瑰花香": { zh: "玫瑰花香", en: "Rose Fragrance" },
    "浓郁油脂": { zh: "浓郁油脂", en: "Rich Crema" },
    "精巧意式": { zh: "精巧意式", en: "Compact Espresso" },
    "极低奶量": { zh: "极低奶量", en: "Low Milk Volume" },
    "细腻薄奶泡": { zh: "细腻薄奶泡", en: "Fine Microfoam" },
    "火山拼配": { zh: "火山拼配", en: "Volcanic Blend" },
    "重焙坚果": { zh: "重焙坚果", en: "Dark Roasted Nuts" },
    "浓郁可可": { zh: "浓郁可可", en: "Intense Cocoa" },
    "极简意式": { zh: "极简意式", en: "Minimalist Espresso" },
    "手工甜品": { zh: "手工甜品", en: "Handcrafted Dessert" },
    "海南斑斓": { zh: "海南斑斓", en: "Hainan Pandan" },
    "清甜低脂": { zh: "清甜低脂", en: "Low Fat Sweet" },
    "低糖环保": { zh: "低糖环保", en: "Low Sugar Eco" },
    "竹炭黑金": { zh: "竹炭黑金", en: "Charcoal Black-Gold" },
    "手作司康": { zh: "手作司康", en: "Handmade Scone" },
    "爱心免费": { zh: "爱心免费", en: "Charity Free" },
    "户外劳动者专享": { zh: "户外劳动者专享", en: "Outdoor Workers Only" },
    "电解质补充": { zh: "电解质补充", en: "Electrolytes" },
    "爱心一元款": { zh: "爱心一元款", en: "¥1 Charity" },
    "驱寒暖胃": { zh: "驱寒暖胃", en: "Stomach Warming" },
    "本地渔民老人": { zh: "本地渔民老人", en: "Local Fisherman / Elders" },
    "完全免费": { zh: "完全免费", en: "100% Free" },
    "清热解暑": { zh: "清热解暑", en: "Heat Relief" },
    "自带杯续装": { zh: "自带杯续装", en: "Bring Your Own Cup" }
};

// Selection options multilingual dictionary
const SELECT_I18N = {
    "book-guests-count": {
        zh: [
            { value: "1", text: "1 人自享" },
            { value: "2", text: "2 人临海座", selected: true },
            { value: "3", text: "3-4 人家庭座" },
            { value: "5", text: "5-6 人沙龙座" }
        ],
        en: [
            { value: "1", text: "1 Person (Solo)" },
            { value: "2", text: "2 Persons (Sea View)", selected: true },
            { value: "3", text: "3-4 Persons (Family)" },
            { value: "5", text: "5-6 Persons (Salon)" }
        ]
    },
    "book-time-slot": {
        zh: [
            { value: "晨光初启 (08:30 - 11:30)", text: "晨光初启 (08:30 - 11:30)" },
            { value: "椰影午后 (12:00 - 16:30)", text: "椰影午后 (12:00 - 16:30)" },
            { value: "极佳落日时分 (17:00 - 19:30)", text: "极佳落日时分 (17:00 - 19:30)", selected: true },
            { value: "潮汐晚风 (20:00 - 22:00)", text: "潮汐晚风 (20:00 - 22:00)" }
        ],
        en: [
            { value: "晨光初启 (08:30 - 11:30)", text: "Morning Breeze (08:30 - 11:30)" },
            { value: "椰影午后 (12:00 - 16:30)", text: "Coconut Shadow (12:00 - 16:30)" },
            { value: "极佳落日时分 (17:00 - 19:30)", text: "Sunset Golden Hour (17:00 - 19:30)", selected: true },
            { value: "潮汐晚风 (20:00 - 22:00)", text: "Tidal Night Breeze (20:00 - 22:00)" }
        ]
    },
    "book-care-need": {
        zh: [
            { value: "none", text: "无特殊安排需求", selected: true },
            { value: "stroller", text: "携婴幼儿同行（需婴儿车停放位/儿童椅）" },
            { value: "wheelchair", text: "行动不便/携长辈（需要无障碍斜坡引导与平地卡座）" },
            { value: "pet", text: "携带爱宠（需要宠物水碗及免费自制椰子犬类零食）" },
            { value: "disability", text: "视力/听力障碍人士暖心助览服务" }
        ],
        en: [
            { value: "none", text: "No Special Arrangements Needed", selected: true },
            { value: "stroller", text: "Infants/Stroller (Need stroller space & high chair)" },
            { value: "wheelchair", text: "Senior/Wheelchair (Need ramp guidance & flat access)" },
            { value: "pet", text: "Pets Welcomed (Need water bowl & homemade dog treats)" },
            { value: "disability", text: "Visual/Hearing Impairment assistance service" }
        ]
    }
};

// ==========================================
// 2. Global i18n Translation Dictionary
// ==========================================
const I18N_DICTS = {
    zh: {
        // Shanhai Group Additions
        "group-footer-text": "山海共生美学生活集团旗下品牌",
        "nav-group-brand": '山海集团 <i class="fa-solid fa-chevron-down"></i>',
        "nav-group-home": "集团主页 | GROUP",
        "nav-group-hotel": '亚美旅宿 | YAMEI',
        "nav-group-coffee": '18°D咖啡 | 18°D',
        "nav-group-bistro": '汐澜中餐 | SILAN',
        "nav-group-pass": '山海通行证 | PASS',
        "shanhai-hero-title": "山海共生，万物有灵",
        "shanhai-hero-sub": "山与海之间，三种日常美学的温度联结",
        "shanhai-hero-desc": "我们坚信，无论是18°D咖啡专注的澄迈火山玄武岩红土豆，汐澜中餐执守的近海时令食材，还是亚美旅宿秉持的暖极简静谧居所，都是在用日常美学向风土致敬。同一片土地，三种体验，一个完整的海南。",
        "scroll-tip": "向下滚动探索集团美学 / Scroll to explore",
        "shanhai-matrix-title": "集团旗下美学品牌",
        "shanhai-matrix-subtitle": "探索泥土、海风与森林的风物联结",
        "shanhai-coffee-title": "18°D咖啡 | 18°D",
        "shanhai-coffee-desc": "澄迈玄武岩火山红土孕育的精品豆。携手听障咖啡师，以实时天气参数萃取今天独有的海岛风味。",
        "shanhai-bistro-title": "汐澜中餐 | SILAN",
        "shanhai-bistro-desc": "万宁海棠湾近海捕捞与小农直供食材。创意中餐美学，坚持低碳零废弃厨房，呈献有温度的餐桌。",
        "shanhai-hotel-title": "亚美旅宿 | YAMEI",
        "shanhai-hotel-desc": "山与海之间最安静的落脚处。融合 Atour 般暖极简设计与环保零废弃运营，提供质朴温情的居所体验。",
        "cp-promo-title": "全链路暖心无障碍服务",
        "cp-promo-desc": "我们在咖啡、中餐与酒店的每一个服务环节中织就了人文温度。无论是由听障咖啡师主导的手语培训与无声沟通、针对气候湿度定制的温和膳食微调，还是采用循环咖啡渣制成的宠物便溺包，都是为了让每一位来到这里的旅人，不论长幼、特殊障碍或携宠同行，都能感受到宾至如归的无缝关怀。",
        "cp-promo-btn": "了解暖心人文计划细节",
        "shanhai-pass-title": "山海一码通行证",
        "shanhai-pass-desc": "激活您的专属通行卡，出示二维码即可享受18°D咖啡免费升杯、汐澜主厨赠前菜及亚美旅宿消费送早餐等联动特权。",
        "shanhai-pass-btn": "立即激活通行证",
        "shanhai-day-title": "「山海一日」联合行程",
        "shanhai-day-desc": "一次预订，三处体验。清晨品味火山手冲，正午品鉴创意中餐，傍晚独享日落晚宴，深夜枕入静谧竹影。",
        "shanhai-day-btn": "前往一键预约",
        "shanhai-founder-name": "马骁煜 Austin Paris",
        "shanhai-founder-title": "山海共生（海南）美学生活集团创始人",
        "shanhai-founder-section-title": "创始人与品牌视界",
        "shanhai-founder-bio": "山海共生（海南）美学生活集团创始人。马骁煜（Austin Paris）倡导用日常美学、低碳环保与人文善意致敬海南风土。在集团发展的蓝图中，他将亚美旅宿的暖极简静谧居住、18°D咖啡的无声咖啡师专业萃取、以及汐澜中餐的低碳零废弃生态餐桌有机联结，开创了属于海南独特的山海生活美学范式。",
        "shanhai-founder-quote": "“同一片土地，三种体验，一个完整的海南。我们用日常美学的微光，温暖每一个来到岛屿的旅人。”",
        "shanhai-philosophy-divider-title": "创始人核心理念 / PHILOSOPHY",
        "founder-p1-title": "风土共生",
        "founder-p1-desc": "从澄迈火山红土咖啡，到海岸线时令食材，让每次体验有根可寻。",
        "founder-p2-title": "人文温度",
        "founder-p2-desc": "以尊重让每位伙伴与宾客被平等看待，让社会微光在这里汇聚。",
        "founder-p3-title": "绿色生态",
        "founder-p3-desc": "从咖啡渣循环到贝壳环保杯，实现大自然无痕低碳运转。",
        "book-joint-title": "山海一日联合预约",
        "book-joint-subtitle": "早咖啡、午推荐、晚私房、夜美宿，一键预约三处体验",
        "book-timeline-title": "「山海一日」行程规划",
        "joint-n1-desc": "晨光手冲 & 潮汐风味日历",
        "joint-n2-desc": "午市主厨时令推荐菜",
        "joint-n3-desc": "低碳美学私房晚餐",
        "joint-n4-desc": "静谧竹影雅居客房1晚",
        "book-joint-submit-btn": "一键预约山海一日行程",
        "care-opt-stroller": "婴幼儿专属关怀（备妥温奶器、消杀儿童椅及客房儿童礼包）",
        "care-opt-wheelchair": "长辈与行动不便无障碍（锁定平地卡座、全程坡道引导及无障碍客房）",
        "care-opt-pet": "宠物友好伴侣（自制椰奶零食、饮水盆、一次性尿垫及海滩救生衣）",
        "care-opt-disability": "视力障碍暖心助览（配备盲文菜单、专职导览店员、客房声音）",
        "care-opt-silent": "无声手语与安静协助（听障咖啡师手语、中餐手语菜单、无打扰配送）",
        "care-opt-elder-diet": "长辈膳食与温情关怀（低盐膳食定制、客房备妥艾草草本热水袋）",
        "ticket-care-detail-title": "山海联动暖心服务执行清单",
        "careers-philo-title": "山海共生 · 集团品牌理念",
        "careers-philo-text": "“同一片土地，三种体验，一个完整的海南。”<br>我们坚信，无论是18°D咖啡所专注的“澄迈火山玄武岩红土豆”、汐澜中餐所坚守的“海岸线时令食材”，还是亚美旅宿所秉持的“山海间的安静落脚处”，都在以各自的日常美学，致敬脚下这片富饶的风土。在集团的大家庭里，我们用人文善意搭建起全链路的暖心无障碍通道与关怀。我们招募的不是雇员，而是与自然和谐共生、对邻里满怀温暖的同路旅人。",
        "careers-philo-b1": '<i class="fa-solid fa-seedling"></i> 火山红土风土敬畏',
        "careers-philo-b2": '<i class="fa-solid fa-hands-holding"></i> 全链路无障碍关怀',
        "careers-philo-b3": '<i class="fa-solid fa-recycle"></i> 废弃咖啡渣生态循环',

        // Nav Menu
        "nav-latitude": "黄金纬度",
        "nav-materials": "原料溯源",
        "nav-menu": "风味菜单",
        "nav-community": "社区温情",
        "nav-services": "门店服务",
        "nav-careers": "加入我们",
        "nav-branches": "旗下分店",
        "nav-club": "海岛会员",
        "nav-booking": "卡座预约",
        "nav-reserve-btn": "预约日落席",
        "nav-brand": "品牌故事",
        "nav-story-sub": "山海故事",
        "nav-details-sub": "风物细节",
        "nav-flavor": "探索风味",
        "nav-menu-sub": "汐澜菜单",
        "nav-dash-sub": "实时数据",
        "nav-tiers-sub": "会员权益",
        "nav-activate-sub": "专属激活",
        "nav-booking-nav": "体验预约",
        "nav-reserve-sub": "卡座预约",
        "nav-services-sub": "极致服务",
        "nav-community-sub": "社区关怀",
        "nav-about-sub": "关于我们",
        "nav-branches-sub": "旗下分店",
        "nav-bistro-sub": "汐澜中餐",
        "nav-careers-sub": "加入我们",
        "nav-home-link": "首页",
        "nav-menu-home": "风味页面",
        "nav-club-home": "会员中心",
        "nav-booking-home": "预约页面",
        "nav-about-home": "关于亚美/汐澜",
        "hero-bar-temp": "当日温度",
        "hero-bar-beans": "本季豆选",
        "hero-bar-wind": "海风流向",
        
        // Hero
        "hero-title": "黄金纬度 · <span class=\"highlight\">风味重塑</span>",
        "hero-desc": "在北纬18°的温暖海风中，我们以对自然的敬畏，重塑海岛的味觉基因。让每一杯咖啡的温度，都连接起火山岩红土与椰林的耕作双手。",
        
        // Brand Latitude
        "lat-badge": "LATITUDE 18°N",
        "lat-title": "为什么是<br><span class=\"italic\">北纬 18°？</span>",
        "lat-lead": "“地理的科学只能定义生长的边界，而唯有手心的温度，才能重塑风味的灵魂。”",
        "lat-para1": "海南三亚，位于北纬 18.25°N。这里拥有富含矿物质的火山岩红土土壤、充沛的阳光和湿润的太平洋海风，提供了咖啡豆生长所需的一切苛刻条件。18°D 咖啡 (18°Degree Coffee) 致力于探究这道地理线条背后的风味奥秘，并向世代耕作的当地咖啡农人致以最诚挚的谢意。",
        "lat-para2": "我们坚持“科学金杯萃取”与“人情侍奉”的融合。恒温 92°C 水流、1:15 的科学粉水比与慢速慢热的耐心萃取，只为提取出火山土壤特有的可可坚果后味。这不仅是一杯咖啡，更是一场关于自然风物与人文温度的感官共鸣。",
        "lat-map-txt": "18.25° N (三亚)",
        "lat-belt-txt": "COFFEE BELT 咖啡腰带",
        "lat-altitude": "海拔高度",
        "lat-sunshine": "日照时长",
        "lat-rainfall": "降水量",
        
        // Brand Story
        "story-badge": "Brand Story & Journal",
        "story-title": "山海有度，<br>万物皆有<span class=\"italic\">它的故事</span>",
        "story-lead": "“我们不单是在制作一杯流体，更是在拼凑一首关于泥土、海浪、手心温度的叙事诗。”",
        "story-caption-label": "摄影纪实",
        "story-caption-desc": "放置在海岸玄武岩上的18°D可循环砂岩杯，杯体由海滩清理中回收的贝壳细砂与天然树脂复合制成。",
        "story-body1": "18°D 咖啡的起点，源自一次看似偶然的野外地质勘测。2024年秋，几位咖啡主理人与澄迈火山地质专家同行，站在富含矿物质的玄武岩红土上，手里握着当地咖啡农捧出的一把生豆。地质学者的一句话点醒了我们：这片土地沉淀了数万年的火山微量元素，海棠湾潮汐海风又源源不断地送来盐分与水分，这就是大自然的风味配方。",
        "story-body2": "回到三亚后，我们创立了 18°D。作为山海共生集团的一部分，我们与其他子品牌拥有共同的地理灵魂：从火山红土里长出的咖啡豆 (18°D)，到海岸线上捕来的今日食材 (汐澜中餐)，再到山与海之间最安静的落脚处 (亚美酒店)。同一片土地，三种体验，一个完整的海南。我们在咖啡中坚持单一源火山豆，并与无声咖啡师携手，向这片山海敬畏礼赞。",
        
        // Origins
        "origins-badge": "GEOGRAPHIC TRACING",
        "origins-title": "原料地理溯源 · <span class=\"italic\">风味之源</span>",
        "origins-desc": "我们不远百里，在海南寻觅那些得天独厚的本土原材。正是因为对风土地理的敬畏，才让 18°D 拥有无可比拟的海岛滋味。",
        "origins-bean-title": "澄迈玄武岩火山豆",
        "origins-bean-desc": "生长在海南澄迈富含铁、镁等矿物质的火山玄武岩红土土壤中。火山岩的高排水性使咖啡树根系更深，充分汲取矿物养分。中深度烘焙，前段散发出浓郁的坚果黑巧香气，尾段呈现极其圆润饱满的红糖甘甜，极低果酸，非常温和。",
        "origins-bean-bar1": "坚果可可香度",
        "origins-bean-bar2": "风味醇厚度",
        "origins-bean-bar3": "清新果酸度",
        "origins-coco-title": "文昌东郊有机青椰",
        "origins-coco-desc": "文昌东郊椰林毗邻太平洋海岸线，海风吹拂下的砂质土壤赋予了青椰极其纯净且高微量元素的椰水。每一颗椰子都是每日清晨由当地椰农手工采摘、运送至门店。椰水清甜解暑，物理冷榨出乳，保留了极其纯粹的乳脂香气，是特调最佳伴侣。",
        "origins-coco-bar1": "天然清甜度",
        "origins-coco-bar2": "乳脂椰香度",
        "origins-coco-bar3": "矿物质电解质",
        
        // Menu & Dashboard
        "menu-badge": "18°D FLAVOR MENU",
        "menu-title": "汐澜风味菜单",
        "menu-desc": "每一款出品皆是物理浓度（TDS）和风味科学比对的产物，拒绝庸俗的调味，只保留天然的碰撞。",
        "dash-title": "18°D LAB 实时萃取数据监测",
        "dash-label-temp": "萃取水温 (Temp)",
        "dash-label-tds": "金杯浓度 (TDS)",
        "dash-label-flow": "萃取流速 (Flow)",
        "dash-label-hardness": "水质硬度 (Hardness)",
        "dash-label-grind": "磨粉粒径 (Grind)",
        "dash-label-bpm": "声学音乐节拍 (BPM)",
        "dash-label-wave": "海浪潮汐频率 (Freq)",
        
        // Community
        "comm-badge": "Humanistic Care",
        "comm-title": "一杯咖啡的善意 · <span class=\"italic\">社区关怀</span>",
        "comm-desc": "我们相信，咖啡馆不只是售卖饮品的空间，更是连接人与人、人与自然的温情纽带。在 18°D，每一杯咖啡都承载着善意的温度。",
        "comm-c1-title": "「暖心一杯」待用计划",
        "comm-c1-desc": "在烈日炎炎的三亚，我们常年为环卫工人、外卖骑手及避暑的清洁义工提供免费的冰镇椰水与防暑凉茶。您也可以在进店消费时参与“待用咖啡”计划，将善意传递给下一个需要清凉的陌生人。",
        "comm-c2-title": "海岛宠物友好空间",
        "comm-c2-desc": "我们非常欢迎您的毛孩子同行。门店内外设有专门的宠物憩息区，并免费提供新鲜过滤水与脱水烘干的自制有机椰肉犬用零食，让您与爱宠共同舒适地享受南海海风的吹拂。",
        "comm-c3-title": "无障碍日落通道",
        "comm-c3-desc": "让落日的美景平等地属于每一个人。18°D 门店全面覆盖无障碍清水坡道，配备宽敞的可活动桌椅，并提供听力与视觉助览引导服务，确保老年人、轮椅使用者与母婴家庭都能安全、尊严地享受日落。",
        
        // Services
        "serv-badge": "Hospitality & Services",
        "serv-title": "海岸侍奉之礼 · <span class=\"italic\">极致门店服务</span>",
        "serv-desc": "在 18°D，我们秉持以人为本、专注倾听的“敬畏侍奉”理念。咖啡不仅是风味的提炼，更是服务细节中眼神交互、理解与尊重的艺术。",
        "serv-c1-title": "专注倾听，风味共创",
        "serv-c1-desc": "我们的咖啡师不满足于只做机器的冰冷输出。当您点单时，我们会认真倾听您对酸甜、苦感及浓度的细腻偏好，为您动态调整萃取水温（92°C 或更柔滑的 88°C）、研磨细度与奶泡厚度，做出您心目中期待的味道。",
        "serv-c2-title": "「无声咖啡师」尊严支持",
        "serv-c2-desc": "为履行社区平等责任，我们的团队包含听障咖啡师。我们设计了直观的图形化手势点单单页、液晶手写板以及振动提示牌。尊重与善意流动在每一次静默却饱含热忱的眼神交汇与躬身致意中。",
        "serv-c3-title": "海岸气象应急备品",
        "serv-c3-desc": "临海多变的气候不应破坏您的惬意。门店前台常备洁净海滩拖鞋（供沾满细沙的宾客免费替换）、速干沙滩毛巾、突发海风骤冷时的温热椰水，以及防雨伞与环保防晒霜，以主动服务的态度防患于未然。",
        "serv-c4-title": "「十秒原则」与适度留白",
        "serv-c4-desc": "每一位踏入空间的宾客，都会在10秒内得到咖啡师真诚的点头和微笑注视。我们推崇“体贴而不打扰，关注而不紧跟”的服务距离，在您远眺南海时提供充裕的宁静留白，在您需要时随时躬身效劳。",
        
        // Details
        "pion-badge": "18°D Details",
        "pion-title": "18°D 的海岛温度与 <span class=\"italic\">风物细节</span>",
        "pion-desc": "我们不用高不可攀的奢侈包装，而是将对自然的敬畏与对您的体贴，融入这四个温暖的小细节里。",
        "pion-c1-title": "听风听海的伴奏",
        "pion-c1-desc": "我们在露台外静候海风。店内的轻柔 Lo-Fi 音乐节奏，会随着海浪的涨落声响自然起落。退潮时音量柔和安静，涨潮时旋律轻快。不需要繁杂的科学设备，只为让您喝咖啡时，耳边能与南海的呼吸同频。",
        "pion-c2-title": "火山岩红土慢滤",
        "pion-c2-desc": "我们用澄迈火山区纯净的玄武岩粗砂，来净化泡制咖啡的过滤水。火山砂岩自带丰富的矿物质，能天然软化水质，让冲出来的每一杯咖啡更加顺滑、不苦涩，带有一丝大自然的微甜。普通的水，因为这一道纯净慢滤，也有了火山的温度。",
        "pion-c3-title": "小木牌无声点单",
        "pion-c3-desc": "为了让您和我们的听障咖啡师沟通更方便、更暖心，我们做了一批代表风味偏好的小木牌（如“火山”、“海浪”、“微甜”）。您只需指一指或递给咖啡师对应的小木牌，就能轻松完成定制。一个简单的手势与微笑，就是我们之间最美的默契。",
        "pion-c4-title": "沙滩贝壳砂环保杯",
        "pion-c4-desc": "我们在海滩漫步时，会把海滩上的碎贝壳和粗沙收集起来，与竹纤维融合制成可以重复使用的‘沙滩粗砂杯’。杯子拿在手里有沙滩的粗粝质感。它百分之百来自自然，即使旧了丢弃，也能在海水里自然融为沙子。您可以带它去沙滩走走，让环保变成随手的习惯。",

        // Membership
        "member-badge": "18°D Club",
        "member-title": "海岛旅人计划 · <span class=\"italic\">加入会员</span>",
        "member-desc": "每一杯咖啡，都是一次关于风土与善意的探索。加入 18°D 会员，解锁您的专属海岛特权。",
        "member-t1-title": "浪迹旅人",
        "member-free-tag": "/ 免费加入",
        "member-t1-b1": "<i class=\"fa-solid fa-check\"></i> 消费积攒低碳绿意积分",
        "member-t1-b2": "<i class=\"fa-solid fa-check\"></i> 首杯特调立减 ¥5 体验券",
        "member-t1-b3": "<i class=\"fa-solid fa-check\"></i> 生日免单咖啡 1 杯",
        "member-join-btn1": "免费加入",
        "member-popular-tag": "推荐首选",
        "member-t2-title": "火山风物师",
        "member-year-tag": "/ 年",
        "member-t2-b1": "<i class=\"fa-solid fa-check\"></i> 全年手冲与特调咖啡享 8.8 折",
        "member-t2-b2": "<i class=\"fa-solid fa-check\"></i> 每月赠送当季隐藏款特调 1 杯",
        "member-t2-b3": "<i class=\"fa-solid fa-check\"></i> 会员专属“沙滩贝壳粗砂杯”1个",
        "member-t2-b4": "<i class=\"fa-solid fa-check\"></i> 预约露台落日卡座优先安排",
        "member-join-btn2": "付费开通",
        "member-t3-title": "潮汐主理人",
        "member-t3-b1": "<i class=\"fa-solid fa-check\"></i> 全年全品类饮品/轻食享 8.2 折",
        "member-t3-b2": "<i class=\"fa-solid fa-check\"></i> 每月赠送当季单一源手冲 2 杯",
        "member-t3-b3": "<i class=\"fa-solid fa-check\"></i> 赠 18°D「海风产地探索」礼包",
        "member-t3-b4": "<i class=\"fa-solid fa-check\"></i> 无限次优先预留落日面海席位",
        "member-t3-b5": "<i class=\"fa-solid fa-check\"></i> 旗下中餐及粉面馆优先品鉴特权",
        "member-join-btn3": "付费开通",
        "member-modal-title": "开通海岛旅人会员",
        "member-modal-desc": "只需填写基本信息即可生成您的 18°D 专属电子会员卡。",
        "member-modal-submit": "立即激活会员卡",
        "member-card-name-lbl": "会员姓名",
        "member-card-id-lbl": "会员卡号",
        "member-success-title": "🎉 会员激活成功！",
        "member-success-desc": "欢迎成为 18°D 同频旅人，会员卡条形码已激活，到店消费出示即可享受专属权益。",

        // Booking
        "book-badge": "SUNSET SEAT RESERVATION",
        "book-title": "预约三亚海岸 · <span class=\"italic\">日落席位</span>",
        "book-desc": "我们在三亚海棠湾海岸边，用粗粝玄武石与白色清水混凝土筑成了一座半开放露台，正对南海一望无际的晚霞与落日。",
        "book-t1-title": "科学日落概率提示",
        "book-t1-desc": "三亚今日落日预计发生于 19:12，目前根据气象湿度测算，晚霞概率为 88%。",
        "book-t2-title": "低碳环保倡议",
        "book-t2-desc": "我们不提供纸质小票。预约成功后，系统将为您生成环保电子品鉴单，凭电子二维码入场消费，可积攒低碳积分。",
        "book-form-title": "预约海岸表单",
        "book-label-name": "预订姓名 <span class=\"required\">*</span>",
        "book-label-phone": "手机号码 <span class=\"required\">*</span>",
        "book-label-guests": "座席人数 <span class=\"required\">*</span>",
        "book-label-date": "预约日期 <span class=\"required\">*</span>",
        "book-label-time": "预约时段 <span class=\"required\">*</span>",
        "book-label-care": "特殊关怀安排 (暖心服务)",
        "book-ph-name": "请填写您的姓名/称呼",
        "book-ph-phone": "请输入11位手机号",
        "book-label-eco": "我承诺搭乘公共交通/步行前往，减少尾气碳排",
        "book-submit-btn": "立即预约席位并获取电子确认函",
        
        // Careers
        "careers-badge": "Group Careers",
        "careers-title": "寻找同频旅人 · 集团联合招募",
        "care-badge": "Join the Lab",
        "care-title": "寻找同频旅人 · <span class=\"italic\">加入我们</span>",
        "care-desc": "山海共生集团为员工提供公平、安全且尊重个人价值的人文雇主环境。我们在咖啡、旅宿、中餐各板块寻找对风土地理心存敬畏、对邻里社区满怀温情的伙伴。这不仅是一份工作，更是一场关于风味与人情的美好旅程。",
        "care-recruit-title": "招聘渠道与应聘方式",
        "care-c1-title": "官方简历邮箱",
        "care-c1-desc": "发送简历至集团人力邮箱 <a href=\"mailto:join@shanhai-coexist.com\" class=\"highlight-link\">join@shanhai-coexist.com</a>。邮件中请备注您感兴趣的品牌（咖啡/旅宿/中餐）以及意向岗位，随附您的个人生活或风味故事更佳。",
        "care-c2-title": "店内“一杯直面”",
        "care-c2-desc": "每周二下午 14:00 - 17:00，您可以直接携带您的常用咖啡杯来到三亚海棠湾门店。我们会请您喝一杯火山豆手冲，在海风中面对面边喝边聊。",
        "care-c3-title": "「低碳同行」绿色推荐",
        "care-c3-desc": "如果你有同频的朋友热爱咖啡与人情，欢迎推荐。推荐成功入职并满三个月，推荐人与被推荐人都将获得 18°D 「海风产地溯源探索之旅」积分大礼包。",
        
        // Affiliates
        "aff-badge": "Branches & Affiliates",
        "aff-title": "品牌版图 · <span class=\"italic\">山海共生集团</span>",
        "aff-desc": "从海岸日落到火山地质公园，从咖啡香气到创意中餐美学，我们致力于将地缘风土地貌与温暖人情融入每一次旅人餐桌体验中。",
        "aff-branch-title": "18°D 全球分店选址",
        "aff-sister-title": "山海共生集团旗下品牌",
        "aff-hotel-tag": "环保可持续旅居",
        "aff-hotel-desc": "作为集团旗下倡导“自然共生”的先锋人文旅宿，亚美不仅在设计上做减法，更在社区连接上做加法，选用火山红土原材，提供充满人文善意与极致舒适的栖息空间。",
        "aff-hotel-btn": "探索旅宿 & 预订房间 <i class=\"fa-solid fa-arrow-right\"></i>",
        "aff-s1-btn": "探索菜单 & 立即预约 <i class=\"fa-solid fa-arrow-right\"></i>",
        
        // Footer
        "foot-brand": "18°D COFFEE",
        "foot-slogan": "Sanya Specialty Coffee Laboratory",
        "foot-desc": "在三亚海棠湾的咸湿海风与椰影斜照下，我们以一杯火山岩风味的咖啡豆，写一首给自然的温情诗篇。",
        "foot-shop-title": "三亚海岸门店",
        "foot-shop-addr": "<i class=\"fa-solid fa-location-dot\"></i> 三亚市海棠湾椰风路8号（喜来登旁海滩）",
        "foot-shop-time": "<i class=\"fa-solid fa-clock\"></i> 每日 08:30 - 22:00",
        "foot-shop-phone": "<i class=\"fa-solid fa-phone\"></i> 0898-8888-1818",
        "foot-eco-title": "绿色环保指标",
        "foot-eco-m1": "<i class=\"fa-solid fa-recycle\"></i> 100% 纸质降解吸管",
        "foot-eco-m2": "<i class=\"fa-solid fa-seedling\"></i> 循环咖啡渣有机基肥料",
        "foot-eco-m3": "<i class=\"fa-solid fa-solar-panel\"></i> 太阳能中和加热热水",
        "foot-copy": "&copy; 2026 山海共生（海南）美学生活集团旗下品牌 // 18°D COFFEE / YAMEI HOTEL / SILAN BISTRO. All rights reserved.",
        
        // Ticket Modal
        "ticket-badge": "<i class=\"fa-solid fa-circle-check\"></i> 已锁定落日座",
        "ticket-sub": "三亚海棠湾店 · 席位凭证",
        "ticket-title": "海岸落日卡座预留成功",
        "ticket-order-prefix": "预订编号:",
        "ticket-label-name": "预订人",
        "ticket-label-phone": "电话",
        "ticket-label-guests": "预订人数",
        "ticket-label-sun": "落日概率预测",
        "ticket-label-date": "预订日期",
        "ticket-label-time": "预约时段",
        "ticket-eco-title": "绿色出行积分累积：+100 积分",
        "ticket-eco-desc": "您已承诺低碳出行前往，本次预约将同步减少碳排放。可在前台出示获取积分赠礼！",
        "ticket-care-title": "人文关怀专属登记",
        "ticket-qr-tip": "到店出示此电子核销二维码",
        "ticket-close-btn": "我知道了，锁定预约",

        // Ordering Section
        "nav-order": "扫桌点单",
        "nav-order-table": "输入桌号",
        "nav-order-menu": "查看菜单",
        "order-badge": "DINE-IN ORDER",
        "order-title": "扫桌点单 · <span class=\"italic\">好咖啡一触即达</span>",
        "order-desc": "请输入您的桌号，选择您喜爱的饮品与轻食，我们的咖啡师将亲手为您奉上。",
        "order-table-label": "您的桌号 / Table No.",
        "order-table-placeholder": "01",
        "order-confirm-btn": "确认入座",
        "order-confirmed-msg": "已就座",
        "cat-all": "全部",
        "cat-sig": "特调招牌",
        "cat-pour": "手冲单品",
        "cat-esp": "经典意式",
        "cat-pastry": "海岛轻食",
        "cat-hidden": "暖心隐藏",
        "cart-title": "我的点单",
        "cart-empty": "还没有选择，请从菜单中添加。",
        "cart-total": "合计",
        "cart-place-btn": "提交点单",
        "order-success-title": "点单成功！",
        "order-done-btn": "继续点单",
        // New features:
        "hero-bar-humidity": "今日湿度",
        "hero-bar-wave": "海浪高度",
        "eco-live-title": "LIVE TELEMETRY / 三亚海岸气象遥测",
        "eco-card-title": "今日山海黄金萃取协议 · Today's Sanya Terroir Brew",
        "eco-label-temp": "当日气温 (Temp)",
        "eco-label-wind": "当日风速 (Wind)",
        "eco-label-humidity": "空气湿度 (Humidity)",
        "eco-label-wave": "海浪高度 (Wave Ht)",
        "eco-advice-title": "⚙️ 智能自适应冲滤工艺调整 / Dynamic Brew Protocol",
        "eco-param-grind": "磨粉粒径 / Grind Size",
        "eco-param-temp": "萃取水温 / Brew Temp",
        "eco-param-flow": "冲滤流速 / Water Flow",
        "eco-param-tds": "预期浓度 / Target TDS",
        "cart-label-barista": "指定风味研制咖啡师 / Brewed By",
        "barista-any-opt": "随机值班咖啡师 / Random Barista",
        "barista-badge": "SILENT ECONOMICS",
        "barista-title": "无声经济学 · <span class=\"italic\">星级风味研发团队</span>",
        "barista-desc": "这绝非同情，而是对极致风味专业认证的敬意。我们的听障咖啡师全员获得SCA（精品咖啡协会）专业认证，为您的每一杯咖啡进行微秒级定制。",
        "barista-q-title": "SCA金杯萃取大师 // 手冲风味专家",
        "barista-q-spec": "<strong>专长：</strong>火山岩手冲极速慢滤，善于把控15.5粉水比的焦糖醇厚度。",
        "barista-q-bio": "“水流的震颤通过指尖传回，我能感知火山红土豆在滤纸中每一次膨胀的节奏。”",
        "barista-l-title": "SCA感官品鉴大师 // 特调融合主理",
        "barista-l-spec": "<strong>专长：</strong>海岛天然植物基乳融合，擅长调配温差风味梯度。",
        "barista-l-bio": "“我的世界十分安静，所以嗅觉与温度感知被放大了十倍。我能捕捉椰乳最细腻的果香。”",
        "barista-f-title": "拉花艺术冠军 // 意式经典研发",
        "barista-f-spec": "<strong>专长：</strong>微孔奶泡研制与意式拉花，擅长绘制“椰风海韵”意境拉花。",
        "barista-f-bio": "“发泡时的振动频率是我跟牛奶沟通的语言。将拉花杯倾斜15度，是三亚海滩的坡度。”",
        "barista-training-badge": "培训体系公开化：",
        "barista-training-text": "我们为所有无言伙伴提供为期300小时的国际SCA资质全额资助培训，并执行与行业接轨的专业评星与研发提成机制。",
        "book-label-barista": "指定专属风味研制师 (专业认可) / Designated Barista",
        "ticket-barista-title": "专属风味研制顾问",
        "source-badge": "TERROIR TRACEABILITY",
        "source-title": "澄迈火山红土 · <span class=\"italic\">咖啡批次溯源</span>",
        "source-desc": "输入您的咖啡外袋或挂耳包装底部的批次号，查验从火山灰红土到这一杯的可验证完整旅程。",
        "source-placeholder": "例如：18D-VOL-0608",
        "source-btn-text": "风物寻源",
        "source-samples-label": "快速体验样本："
    },
    en: {
        // Shanhai Group Additions
        "group-footer-text": "A Brand of Shanhai Gongsheng Aesthetic Life Group",
        "nav-group-brand": 'Shanhai Group <i class="fa-solid fa-chevron-down"></i>',
        "nav-group-home": "Group Home | GROUP",
        "nav-group-hotel": 'YAMEI Hotel',
        "nav-group-coffee": '18°D Coffee',
        "nav-group-bistro": 'SILAN Bistro',
        "nav-group-pass": 'Shanhai Pass',
        "shanhai-hero-title": "Shanhai Coexistence, Everything is Alive",
        "shanhai-hero-sub": "Between Mountains and Seas, Three Daily Aesthetic Connections",
        "shanhai-hero-desc": "We believe that whether it is the Chengmai basalt volcanic soil coffee beans of 18°D, the fresh coastal ingredients of Silan Bistro, or the warm minimalist serene lodgings of Yamei, we are honoring the local terroir through everyday aesthetics. Same land, three experiences, one complete Hainan.",
        "scroll-tip": "Scroll down to explore group aesthetics",
        "shanhai-matrix-title": "Aesthetic Brands Under the Group",
        "shanhai-matrix-subtitle": "Explore the terroir connection of soil, sea breeze, and forest",
        "shanhai-coffee-title": "18°D Coffee | 18°D",
        "shanhai-coffee-desc": "Specialty coffee beans nurtured in basalt volcanic clay of Chengmai. Hand in hand with hearing-impaired baristas, extracting today's unique island flavors based on real-time weather.",
        "shanhai-bistro-title": "Silan Bistro | SILAN",
        "shanhai-bistro-desc": "Ingredients caught off the shores of Wanning Sheraton Bay and supplied directly by small farmers. Creative Chinese bistro aesthetics with a low-carbon, zero-waste kitchen.",
        "shanhai-hotel-title": "Yamei Lodging | YAMEI",
        "shanhai-hotel-desc": "The quietest harbor between the mountain and the sea. Blending Atour-like warm minimalist design with eco-friendly zero-waste operations to deliver a simple, warm lodging experience.",
        "cp-promo-title": "Full-Link Inclusive & Accessible Service",
        "cp-promo-desc": "We weave human warmth into every service link of coffee, dining, and hotel. From sign language training and silent communication led by hearing-impaired baristas, mild dietary adjustments tailored to climate and humidity, to pet waste bags made from recycled coffee grounds, we ensure every traveler feels at home.",
        "cp-promo-btn": "Learn More About Our Inclusive Care Plan",
        "shanhai-pass-title": "Shanhai Pass QR-Code",
        "shanhai-pass-desc": "Activate your exclusive pass card. Present the QR code to enjoy privileges such as free size-up at 18°D Coffee, a free appetizer from Silan's head chef, and complimentary breakfast at Yamei.",
        "shanhai-pass-btn": "Activate Pass Now",
        "shanhai-day-title": "「One Day in Shanhai」Joint Itinerary",
        "shanhai-day-desc": "One reservation, three experiences. Savor volcanic hand-drip in the morning, taste creative Chinese cuisine at noon, enjoy a sunset dinner at dusk, and fall asleep under serene bamboo shadows at night.",
        "shanhai-day-btn": "Book Joint Itinerary",
        "shanhai-founder-name": "Austin Paris (Ma Xiaoyu)",
        "shanhai-founder-title": "Founder of Shanhai Coexistence Group",
        "shanhai-founder-section-title": "Founder & Brand Vision",
        "shanhai-founder-bio": "Founder of Shanhai Coexistence (Hainan) Aesthetic Life Group. Austin Paris advocates honoring Hainan's terroir through daily aesthetics, low-carbon ecology, and humanistic kindness. In his blueprint, he connects Yamei's warm minimalist sanctuary, 18°D's silent professional brewing, and Silan's low-carbon, zero-waste dining, pioneering a unique mountain-and-sea lifestyle aesthetic for Hainan.",
        "shanhai-founder-quote": "“Same land, three experiences, one complete Hainan. We warm every traveler coming to the island with the gentle light of daily aesthetics.”",
        "shanhai-philosophy-divider-title": "FOUNDER'S CORE PHILOSOPHY",
        "founder-p1-title": "Terroir Symbiosis",
        "founder-p1-desc": "From volcanic basalt coffee to coastal fresh ingredients, each experience remains rooted.",
        "founder-p2-title": "Humanistic Warmth",
        "founder-p2-desc": "Treat every co-worker and guest with equal respect, letting community warmth converge.",
        "founder-p3-title": "Green Ecology",
        "founder-p3-desc": "From composting to recycled sand cups, achieving seamless low-carbon cycles.",
        "book-joint-title": "Shanhai Day Itinerary Reservation",
        "book-joint-subtitle": "Coffee, lunch, private dinner, and luxury stay—all in one click",
        "book-timeline-title": "Shanhai Day Itinerary Plan",
        "joint-n1-desc": "Morning Hand-drip & Tide Parameter",
        "joint-n2-desc": "Chef's Daily Special Dish",
        "joint-n3-desc": "Low-carbon private custom dinner",
        "joint-n4-desc": "Zhuying Room for 1 night (*Priority)",
        "book-joint-submit-btn": "Book Shanhai Day Program",
        "care-opt-stroller": "Infant & Toddler Care (Bottle warmer, sanitized high chair, and room kids pack)",
        "care-opt-wheelchair": "Accessibility & Elders (Flat table, ramp assistance, and accessible guestroom)",
        "care-opt-pet": "Pet Companion Plan (Homemade coconut pet biscuits, dedicated bowls, pad, & beach lifejacket)",
        "care-opt-disability": "Visual Impairment Orientation (Braille menus, dedicated guide assistant, room tide soundtrack)",
        "care-opt-silent": "Silent Sign Language & Peaceful Service (Deaf barista signing, sign-language menu helper, do-not-disturb delivery)",
        "care-opt-elder-diet": "Elders Healthy Diet & Mugwort Bag (Low-sodium diet custom, bed-side mugwort heating bag)",
        "ticket-care-detail-title": "Shanhai Inclusive Care Execution Roadmap",
        "careers-philo-title": "Shanhai Coexistence · Group Philosophy",
        "careers-philo-text": "'One land, three experiences, one complete Hainan.'<br>We believe that whether it is the 'volcanic rich-selenium coffee beans' at 18°D Coffee, the 'coastal wild seasonal ingredients' at Silan Bistro, or the 'quiet mountain-sea sanctuary' at Yamei Hotel, they all pay homage to the local terroir. Within our group, we coordinate services to weave a warm, seamless accessible care roadmap. We are not hiring employees, but inviting fellow travelers who co-exist with nature and care for Sanya's communities.",
        "careers-philo-b1": '<i class="fa-solid fa-seedling"></i> Volcanic soil terroir respect',
        "careers-philo-b2": '<i class="fa-solid fa-hands-holding"></i> Unified barrier-free care',
        "careers-philo-b3": '<i class="fa-solid fa-recycle"></i> Coffee ground microcycling',

        // Nav Menu
        "nav-latitude": "Latitude",
        "nav-materials": "Tracing",
        "nav-menu": "Menu",
        "nav-community": "Community",
        "nav-services": "Services",
        "nav-careers": "Careers",
        "nav-branches": "Branches",
        "nav-club": "Club",
        "nav-booking": "Booking",
        "nav-reserve-btn": "Sunset Reservation",
        "nav-brand": "Brand Story",
        "nav-story-sub": "Terroir Story",
        "nav-details-sub": "Terroir Details",
        "nav-flavor": "Flavors",
        "nav-menu-sub": "Specialty Menu",
        "nav-dash-sub": "Live Dash",
        "nav-tiers-sub": "Member Tiers",
        "nav-activate-sub": "Activate Card",
        "nav-booking-nav": "Booking",
        "nav-reserve-sub": "Reserve Seat",
        "nav-services-sub": "Bespoke Service",
        "nav-community-sub": "Community Care",
        "nav-about-sub": "About Us",
        "nav-branches-sub": "Global Branches",
        "nav-bistro-sub": "Silan Bistro",
        "nav-careers-sub": "Join Us",
        "nav-home-link": "Home",
        "nav-menu-home": "Flavor Page",
        "nav-club-home": "Member Club",
        "nav-booking-home": "Booking Page",
        "nav-about-home": "About Brand",
        "hero-bar-temp": "Temperature",
        "hero-bar-beans": "Featured Beans",
        "hero-bar-wind": "Wind Vector",
        
        // Hero
        "hero-title": "18°N Latitude · <span class=\"highlight\">Flavor Reborn</span>",
        "hero-desc": "In the warm sea breeze of 18°N, we recreate the island's taste profile with respect for nature. Every cup connects volcanic soil with the hardworking hands of the groves.",
        
        // Brand Latitude
        "lat-badge": "LATITUDE 18°N",
        "lat-title": "Why Latitude<br><span class=\"italic\">18°N?</span>",
        "lat-lead": "\"Geography only defines the boundaries of growth; only the warmth of human hands can reshape the soul of flavor.\"",
        "lat-para1": "Sanya, Hainan, is situated at 18.25°N, offering mineral-rich volcanic soil, abundant sunlight, and humid Pacific wind. This meets all the strict conditions required for coffee plants. 18°D Coffee (18°Degree) is dedicated to exploring the secret behind this geographical line, while thanking the generations of local farmers.",
        "lat-para2": "We combine Gold Cup extraction with warm hospitality. With a stable 92°C water temperature, 1:15 ratio, and slow pour extraction, we extract the signature cocoa and nut flavors of the volcanic soil. This is a sensory resonance of nature and care.",
        "lat-map-txt": "18.25° N (Sanya)",
        "lat-belt-txt": "COFFEE BELT",
        "lat-altitude": "Altitude",
        "lat-sunshine": "Sunshine Hours",
        "lat-rainfall": "Rainfall",
        
        // Brand Story
        "story-badge": "Brand Story & Journal",
        "story-title": "Sea & Land,<br>Everything Has <span class=\"italic\">A Story</span>",
        "story-lead": "\"We are not just brewing a liquid; we are weaving a narrative poem of soil, waves, and the warmth of hands.\"",
        "story-caption-label": "Photography Journal",
        "story-caption-desc": "The 18°D reusable sand cup resting on coastal basalt, crafted from recycled sand and shells collected from beach cleanups.",
        "story-body1": "18°D Coffee started during a geological field survey in Autumn 2024. Standing on mineral-rich volcanic soil, holding green beans offered by local farmers, a geologist's words inspired us: 'This land has accumulated volcanic minerals for millennia, while the tide brings salt and humidity. This is nature's formula.'",
        "story-body2": "Returning to Sanya, we founded 18°D. As part of Shanhai Group, we share a geographical soul across our brands: coffee beans grown in volcanic soils (18°D), daily fresh catches from the coastline (Silan Bistro), and the quietest sanctuary between mountains and sea (Yamei Hotel). Same land, three experiences, one complete Hainan. We present volcanic beans with silent barista mastery, honoring Sanya's coastal beauty.",
        
        // Origins
        "origins-badge": "GEOGRAPHIC TRACING",
        "origins-title": "Geographic Tracing · <span class=\"italic\">Source of Flavor</span>",
        "origins-desc": "We travel across Hainan to source unique local ingredients. Out of respect for terroir, 18°D delivers an incomparable island taste.",
        "origins-bean-title": "Chengmai Volcanic Beans",
        "origins-bean-desc": "Grown in iron-and-magnesium-rich volcanic basalt soil in Chengmai. Deep root systems draw rich minerals. Medium-dark roast offers nutty and dark chocolate aromas, followed by smooth brown sugar sweetness with low acidity.",
        "origins-bean-bar1": "Nutty Cocoa Aroma",
        "origins-bean-bar2": "Flavor Body",
        "origins-bean-bar3": "Citrus Acidity",
        "origins-coco-title": "Wenchang Organic Coconut",
        "origins-coco-desc": "Wenchang coconut groves sit close to the coast, where sea breeze and sandy soil yield pure, mineral-rich coconut water. Freshly harvested every morning, cold-pressed to preserve pure creaminess, a perfect companion for specialty drinks.",
        "origins-coco-bar1": "Natural Sweetness",
        "origins-coco-bar2": "Coconut Creaminess",
        "origins-coco-bar3": "Minerals & Electrolytes",
        
        // Menu & Dashboard
        "menu-badge": "18°D FLAVOR MENU",
        "menu-title": "Coastal Flavor Menu",
        "menu-desc": "Each brew is a scientific balance of TDS and flavor, rejecting artificial syrup, keeping only natural ingredients.",
        "dash-title": "18°D LAB Live Extraction Monitoring",
        "dash-label-temp": "Water Temp",
        "dash-label-tds": "Gold Cup TDS",
        "dash-label-flow": "Flow Rate",
        "dash-label-hardness": "Water Hardness",
        "dash-label-grind": "Grind Size",
        "dash-label-bpm": "Acoustic Beats (BPM)",
        "dash-label-wave": "Wave Frequency (Freq)",
        
        // Community
        "comm-badge": "Humanistic Care",
        "comm-title": "Kindness in a Cup · <span class=\"italic\">Community Care</span>",
        "comm-desc": "We believe a cafe is not just a commercial space, but a warm bond connecting people and nature. At 18°D, every cup carries warmth.",
        "comm-c1-title": "\"Warm Cup\" Pending Plan",
        "comm-c1-desc": "Under Sanya's hot sun, we provide free chilled coconut water and herbal tea for sanitation workers, riders, and beach volunteers. You can join the pending cup plan to pass kindness to a stranger.",
        "comm-c2-title": "Island Pet-Friendly Space",
        "comm-c2-desc": "Your pets are family here. We provide dedicated pet rest areas, fresh filtered water, and dehydrated organic coconut treats for your furry friends to enjoy the coastal breeze.",
        "comm-c3-title": "Barrier-Free Sunset Ramp",
        "comm-c3-desc": "Sunset views should belong to everyone. Our space features concrete ramps, spacious seating, and visual/audio guidance, ensuring seniors, wheelchair users, and families enjoy sunset with dignity.",
        
        // Services
        "serv-badge": "Hospitality & Services",
        "serv-title": "Coastal Hospitality · <span class=\"italic\">Thoughtful Service</span>",
        "serv-desc": "At 18°D, we believe in mindful hospitality. Coffee is not just flavor extraction, but an art of eye contact, understanding, and respect.",
        "serv-c1-title": "Mindful Listening & Customization",
        "serv-c1-desc": "Our baristas don't just take orders. We listen to your preference of acidity, sweetness, and body, adjusting temp, grind size, and foam thickness to craft your ideal flavor.",
        "serv-c2-title": "\"Silent Barista\" Inclusion Support",
        "serv-c2-desc": "To foster inclusion, our team includes hearing-impaired baristas. We designed sign menus, LCD pads, and pagers. Respect and kindness flow through every silent eye contact and warm nod.",
        "serv-c3-title": "Coastal Weather Care",
        "serv-c3-desc": "Unpredictable coast weather shouldn't ruin your day. We prepare dry beach towels, clean sandals, warm coconut water for chilly winds, umbrellas, and eco-sunscreen, acting before you even ask.",
        "serv-c4-title": "10-Second Smile & Respectful Space",
        "serv-c4-desc": "Every guest receives a warm nod and smile within 10 seconds. We maintain a distance of 'caring without intruding,' giving you quiet space to gaze at the sea while always ready to serve.",
        
        // Details
        "pion-badge": "18°D Details",
        "pion-title": "18°D's Coastal Warmth & <span class=\"italic\">Details</span>",
        "pion-desc": "Instead of unapproachable luxury packaging, we blend respect for nature and care for you into these four thoughtful details.",
        "pion-c1-title": "Ocean Breeze & Beats",
        "pion-c1-desc": "We wait for sea breeze on the terrace. The soft Lo-Fi beats in the shop follow the natural rhythm of the waves. Quiet at ebb tide, cheerful at high tide. We want your coffee hour to sync with the breath of the sea.",
        "pion-c2-title": "Volcanic Basalt Sand Filtration",
        "pion-c2-desc": "We filter brewing water through natural basalt sand from Hainan. Rich in trace minerals, the basalt sand naturally softens the water, making every cup of coffee smoother, less bitter, and naturally sweet.",
        "pion-c3-title": "Wooden Tags for Silent Ordering",
        "pion-c3-desc": "To make communication with our silent baristas warmer, we crafted wooden tags representing flavor notes. Just point or pass them to customize your drink. A simple gesture and a smile speak volumes.",
        "pion-c4-title": "Recycled Beach Sand Cup",
        "pion-c4-desc": "We collect broken shells and sand on beach walks to blend with bamboo fiber for our reusable cups. Tactile and raw, they are 100% natural, returning to sand in seawater in 90 days. Take it to the beach with you.",

        // Membership
        "member-badge": "18°D Club",
        "member-title": "Traveler Club · <span class=\"italic\">Join Membership</span>",
        "member-desc": "Every coffee is an exploration of terroir and kindness. Join 18°D Club to unlock your exclusive island privileges.",
        "member-t1-title": "Coastal Wanderer",
        "member-free-tag": "/ Free",
        "member-t1-b1": "<i class=\"fa-solid fa-check\"></i> Earn low-carbon green carbon credits",
        "member-t1-b2": "<i class=\"fa-solid fa-check\"></i> ¥5 discount coupon for your first drink",
        "member-t1-b3": "<i class=\"fa-solid fa-check\"></i> 1 free specialty coffee on your birthday",
        "member-join-btn1": "Join Free",
        "member-popular-tag": "Best Value",
        "member-t2-title": "Volcanic Curator",
        "member-year-tag": "/ Yr",
        "member-t2-b1": "<i class=\"fa-solid fa-check\"></i> 12% off all pour-over & espresso drinks",
        "member-t2-b2": "<i class=\"fa-solid fa-check\"></i> 1 free seasonal hidden menu drink monthly",
        "member-t2-b3": "<i class=\"fa-solid fa-check\"></i> 1 free signature shell sandstone cup",
        "member-t2-b4": "<i class=\"fa-solid fa-check\"></i> Priority booking for sunset terrace tables",
        "member-join-btn2": "Subscribe",
        "member-t3-title": "Tidal Host",
        "member-t3-b1": "<i class=\"fa-solid fa-check\"></i> 18% off all coffee drinks and pastries",
        "member-t3-b2": "<i class=\"fa-solid fa-check\"></i> 2 free single origin pour-overs monthly",
        "member-t3-b3": "<i class=\"fa-solid fa-check\"></i> 1 free 'Seabreeze Origin' exploration gift box",
        "member-t3-b4": "<i class=\"fa-solid fa-check\"></i> Unlimited priority pre-booking for sunset seats",
        "member-t3-b5": "<i class=\"fa-solid fa-check\"></i> Priority entry to sister bistros & noodle labs",
        "member-join-btn3": "Subscribe",
        "member-modal-title": "Join Traveler Club",
        "member-modal-desc": "Fill in basic details to instantly generate your 18°D digital member card.",
        "member-modal-submit": "Activate Member Card Now",
        "member-card-name-lbl": "Member Name",
        "member-card-id-lbl": "Card Number",
        "member-success-title": "🎉 Membership Activated!",
        "member-success-desc": "Welcome to 18°D Club! Your digital barcode has been activated. Present it at checkout to enjoy benefits.",

        // Booking
        "book-badge": "SUNSET SEAT RESERVATION",
        "book-title": "Book Sunset Seats · <span class=\"italic\">Sanya Coast</span>",
        "book-desc": "We built a concrete terrace facing the South China Sea, where you can watch the sunset with rough basalt stone under the sea breeze.",
        "book-t1-title": "Sunset Probability Forecast",
        "book-t1-desc": "Sunset is expected around 19:12 today. Based on local humidity, there is an 88% chance of sunset glow.",
        "book-t2-title": "Low Carbon Initiative",
        "book-t2-desc": "We do not provide paper receipts. A digital voucher with a QR code will be generated upon booking to track your green carbon credits.",
        "book-form-title": "Coastal Seat Reservation",
        "book-label-name": "Full Name <span class=\"required\">*</span>",
        "book-label-phone": "Phone Number <span class=\"required\">*</span>",
        "book-label-guests": "Number of Guests <span class=\"required\">*</span>",
        "book-label-date": "Reservation Date <span class=\"required\">*</span>",
        "book-label-time": "Time Slot <span class=\"required\">*</span>",
        "book-label-care": "Special Care Arrangement (Warm Care)",
        "book-ph-name": "Please enter your name",
        "book-ph-phone": "11-digit mobile number",
        "book-label-eco": "I promise to walk or take public transit to lower carbon footprint",
        "book-submit-btn": "Confirm Booking & Get Digital Voucher",
        
        // Careers
        "careers-badge": "Group Careers",
        "careers-title": "Join Us · <span class=\"italic\">Shanhai Careers</span>",
        "care-badge": "Join the Lab",
        "care-title": "Join Us · <span class=\"italic\">Seeking Kindred Spirits</span>",
        "care-desc": "Shanhai Coexistence Group provides a fair, safe, and respectful employer environment. We look for partners across coffee, lodging, and bistro who respect local terroir and love community.",
        "care-recruit-title": "Application Channels",
        "care-c1-title": "Official Email",
        "care-c1-desc": "Send your CV to group HR email <a href=\"mailto:join@shanhai-coexist.com\" class=\"highlight-link\">join@shanhai-coexist.com</a>. Please note the brand (Coffee/Hotel/Bistro) and position you are interested in.",
        "care-c2-title": "In-Store \"Coffee & Chat\"",
        "care-c2-desc": "Every Tuesday 14:00-17:00, bring your favorite cup to Sanya. We will invite you for a volcanic pour-over and chat in the sea breeze.",
        "care-c3-title": "\"Eco-Together\" Referrals",
        "care-c3-desc": "Refer friends who love coffee and care. If hired for 3 months, both you and the candidate win a Sanya Origin Trip points package.",
        
        // Affiliates
        "aff-badge": "Branches & Affiliates",
        "aff-title": "Brand Map · <span class=\"italic\">Shanhai Coexistence Group</span>",
        "aff-desc": "From sunset coast to volcanic parks, coffee aroma to creative dining, we blend terroir and warm care into every traveler's table.",
        "aff-branch-title": "18°D Global Locations",
        "aff-sister-title": "Shanhai Coexistence Brands",
        "aff-hotel-tag": "Sustainable Lodging",
        "aff-hotel-desc": "As the pioneering eco-lodge under the group, Yamei practices minimalism in design and connection in community, providing warm, sustainable, and comfortable sanctuaries.",
        "aff-hotel-btn": "Explore Hotel & Book Room <i class=\"fa-solid fa-arrow-right\"></i>",
        "aff-s1-btn": "Explore Menu & Book Now <i class=\"fa-solid fa-arrow-right\"></i>",
        
        // Footer
        "foot-brand": "18°D COFFEE",
        "foot-slogan": "Sanya Specialty Coffee Laboratory",
        "foot-desc": "Under Sanya's sea breeze and coconut shadows, we brew volcanic soil beans to write a warm poem for nature.",
        "foot-shop-title": "Sanya Beach Store",
        "foot-shop-addr": "<i class=\"fa-solid fa-location-dot\"></i> No. 8 Yefeng Road, Haitang Bay, Sanya (Sheraton Beach)",
        "foot-shop-time": "<i class=\"fa-solid fa-clock\"></i> Daily 08:30 - 22:00",
        "foot-shop-phone": "<i class=\"fa-solid fa-phone\"></i> 0898-8888-1818",
        "foot-eco-title": "Eco Indexes",
        "foot-eco-m1": "<i class=\"fa-solid fa-recycle\"></i> 100% Biodegradable Straws",
        "foot-eco-m2": "<i class=\"fa-solid fa-seedling\"></i> Upcycled Coffee Ground Fertilizers",
        "foot-eco-m3": "<i class=\"fa-solid fa-solar-panel\"></i> Solar-Powered Water Heating",
        "foot-copy": "&copy; 2026 Shanhai Coexistence (Hainan) Aesthetic Life Group. Brands // 18°D COFFEE / YAMEI HOTEL / SILAN BISTRO. All rights reserved.",
        
        // Ticket Modal
        "ticket-badge": "<i class=\"fa-solid fa-circle-check\"></i> Sunset Seat Reserved",
        "ticket-sub": "Sanya Bay · Reservation Voucher",
        "ticket-title": "Coastal Seat Reserved Successfully",
        "ticket-order-prefix": "Voucher ID:",
        "ticket-label-name": "Guest",
        "ticket-label-phone": "Phone",
        "ticket-label-guests": "Guests",
        "ticket-label-sun": "Sunset Glow Chance",
        "ticket-label-date": "Date",
        "ticket-label-time": "Time Slot",
        "ticket-eco-title": "Eco-Transit Green Credits: +100",
        "ticket-eco-desc": "You promised low-carbon transport. This booking reduces carbon footprints. Show this at the counter for an eco-gift!",
        "ticket-care-title": "Special Care Arrangement",
        "ticket-qr-tip": "Present this QR code upon arrival",
        "ticket-close-btn": "Understood, Secure Seating",

        // Ordering Section
        "nav-order": "Order at Table",
        "nav-order-table": "Enter Table No.",
        "nav-order-menu": "Browse Menu",
        "order-badge": "DINE-IN ORDER",
        "order-title": "Order at Table · <span class=\"italic\">Your Coffee, Instantly</span>",
        "order-desc": "Enter your table number, browse our menu, and your barista will craft every cup with care.",
        "order-table-label": "Your Table No. / 桌号",
        "order-table-placeholder": "01",
        "order-confirm-btn": "Confirm Seat",
        "order-confirmed-msg": "Seated",
        "cat-all": "All",
        "cat-sig": "Signature",
        "cat-pour": "Pour-Over",
        "cat-esp": "Espresso",
        "cat-pastry": "Pastry",
        "cat-hidden": "Hidden Menu",
        "cart-title": "My Order",
        "cart-empty": "No items yet. Add from the menu.",
        "cart-total": "Total",
        "cart-place-btn": "Place Order",
        "order-success-title": "Order Placed!",
        "order-done-btn": "Continue Ordering",
        // New features:
        "hero-bar-humidity": "Humidity",
        "hero-bar-wave": "Wave Height",
        "eco-live-title": "LIVE TELEMETRY / Sanya Coastal Weather Care",
        "eco-card-title": "Today's Sanya Terroir Brew Protocol",
        "eco-label-temp": "Air Temp",
        "eco-label-wind": "Wind Speed",
        "eco-label-humidity": "Humidity",
        "eco-label-wave": "Wave Height",
        "eco-advice-title": "⚙️ Dynamic Brew Protocol Adjustment",
        "eco-param-grind": "Grind Size",
        "eco-param-temp": "Brew Temp",
        "eco-param-flow": "Water Flow",
        "eco-param-tds": "Target TDS",
        "cart-label-barista": "Designated Barista / Brewed By",
        "barista-any-opt": "Random Barista on Duty",
        "barista-badge": "SILENT ECONOMICS",
        "barista-title": "Silent Economics · <span class=\"italic\">Our Elite Baristas</span>",
        "barista-desc": "This is not charity, but deep respect for elite craft. All of our deaf baristas hold international SCA certifications, micro-customizing every single cup.",
        "barista-q-title": "SCA Golden Cup Master // Pour-Over Specialist",
        "barista-q-spec": "<strong>Specialty:</strong> Volcanic slow dripping, precise 1:15.5 coffee-to-water ratio control.",
        "barista-q-bio": "\"The tremor of water flow feeds back through my fingers. I feel the volcanic grounds breathing inside the paper.\"",
        "barista-l-title": "SCA Sensory Master // Fusion Infusions Lead",
        "barista-l-spec": "<strong>Specialty:</strong> Plant-based milk pairings, warm-cold temperature flavor gradient tuning.",
        "barista-l-bio": "\"My world is completely silent, so my sense of smell is magnified tenfold. I capture the finest fruit notes of coconut milk.\"",
        "barista-f-title": "Latte Art Champion // Espresso QC Lead",
        "barista-f-spec": "<strong>Specialty:</strong> Microfoam density engineering, crafting 'Seabreeze Palms' latte art.",
        "barista-f-bio": "\"The frequency of steam vibration is how I talk with milk. Tilted at 15 degrees, it mirrors the slope of Sanya beach.\"",
        "barista-training-badge": "Open Training System:",
        "barista-training-text": "We fund 300 hours of international SCA certification training for all deaf partners, implementing standard career leveling and research commissions.",
        "book-label-barista": "Designated Barista (Professional Recognition)",
        "ticket-barista-title": "Designated Brew Advisor",
        "source-badge": "TERROIR TRACEABILITY",
        "source-title": "Volcanic Terroir · <span class=\"italic\">Batch Sourcing Journey</span>",
        "source-desc": "Enter the batch number on the bottom of your bean bag or drip package to trace the verifiable path from volcanic red clay to your hand.",
        "source-placeholder": "e.g. 18D-VOL-0608",
        "source-btn-text": "Trace Terroir",
        "source-samples-label": "Quick Samples:"
    }
};

// ==========================================
// 3. DOM Elements & Initial Setup
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Current Active Language (persist in localstorage)
    let currentLang = localStorage.getItem("lang") || "zh";
    let activeCategory = "all";

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
    
    // Membership Elements
    const memberModal = document.getElementById("member-modal");
    const memberJoinForm = document.getElementById("member-join-form");
    const memberFormBox = document.getElementById("member-form-box");
    const memberCardBox = document.getElementById("member-card-box");
    const memberSelectedTierInput = document.getElementById("member-selected-tier");
    const cardTierBadge = document.getElementById("card-tier-badge");
    const cardNameEl = document.getElementById("card-name");
    const cardNumberEl = document.getElementById("card-number");
    const cardBarcodeNum = document.getElementById("card-barcode-number");
    const digitalCard = document.getElementById("digital-member-card");
    const joinMemberButtons = document.querySelectorAll(".join-member-btn");

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

    // Initialize Language
    updateLanguage(currentLang);

    // Initialize Menu items (render all by default)
    renderMenuItems(activeCategory);

    // ==========================================
    // 4. i18n Language Toggle Logic
    // ==========================================
    function updateLanguage(lang) {
        document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
        
        // Translate all static nodes with data-key
        const i18nElements = document.querySelectorAll("[data-key]");
        i18nElements.forEach(el => {
            const key = el.getAttribute("data-key");
            if (I18N_DICTS[lang] && I18N_DICTS[lang][key] !== undefined) {
                el.innerHTML = I18N_DICTS[lang][key];
            }
        });

        // Translate placeholders
        const i18nPlaceholders = document.querySelectorAll("[data-placeholder-key]");
        i18nPlaceholders.forEach(el => {
            const key = el.getAttribute("data-placeholder-key");
            if (I18N_DICTS[lang] && I18N_DICTS[lang][key] !== undefined) {
                el.setAttribute("placeholder", I18N_DICTS[lang][key]);
            }
        });

        // Update dropdown option elements
        translateSelectOptions(lang);

        // Update lang switch buttons text (should show alternate language option)
        const langBtns = document.querySelectorAll(".lang-switch-btn");
        langBtns.forEach(btn => {
            btn.textContent = lang === "zh" ? "EN" : "中文";
        });

        // Persist language state
        localStorage.setItem("lang", lang);
        currentLang = lang;
    }

    function toggleLanguage() {
        const nextLang = currentLang === "zh" ? "en" : "zh";
        
        // Apply smooth fade-out class to body
        document.body.classList.add("lang-transitioning");
        
        setTimeout(() => {
            updateLanguage(nextLang);
            renderMenuItems(activeCategory);
            updateWeatherTelemetry(); // Translate floating status bars immediately
            
            // Dispatch event for other components (e.g. ordering section)
            document.dispatchEvent(new CustomEvent('langChange', { detail: { lang: nextLang } }));
            
            // Fade-in
            setTimeout(() => {
                document.body.classList.remove("lang-transitioning");
            }, 50);
        }, 200);
    }

    function translateSelectOptions(lang) {
        Object.keys(SELECT_I18N).forEach(selectId => {
            const selectEl = document.getElementById(selectId);
            if (selectEl) {
                const selectedVal = selectEl.value; // preserve value
                selectEl.innerHTML = "";
                
                SELECT_I18N[selectId][lang].forEach(optData => {
                    const opt = document.createElement("option");
                    opt.value = optData.value;
                    opt.textContent = optData.text;
                    if (optData.value === selectedVal || optData.selected && !selectedVal) {
                        opt.selected = true;
                    }
                    selectEl.appendChild(opt);
                });
            }
        });
    }

    // Register Lang Switch Buttons Listeners
    const desktopLangBtn = document.getElementById("lang-switch-btn");
    const drawerLangBtn = document.getElementById("drawer-lang-btn");
    if (desktopLangBtn) desktopLangBtn.addEventListener("click", toggleLanguage);
    if (drawerLangBtn) drawerLangBtn.addEventListener("click", toggleLanguage);

    // ==========================================
    // 5. Navbar scroll & Mobile Drawer
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

    const openMobileDrawer = () => {
        mobileDrawer.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Lock background scroll
    };

    const closeMobileDrawer = () => {
        mobileDrawer.classList.add("hidden");
        document.body.style.overflow = "";
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileDrawer);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeMobileDrawer);
    
    drawerLinkItems.forEach(link => {
        link.addEventListener("click", closeMobileDrawer);
    });

    // ==========================================
    // 6. Dynamic Menu Rendering & Filtering
    // ==========================================
    function renderMenuItems(categoryFilter) {
        if (!menuItemsGrid) return;
        
        // Clear grid
        menuItemsGrid.innerHTML = "";
        
        // Prepend Community Tracker Card if category is hidden
        if (categoryFilter === "hidden") {
            const trackerCard = document.createElement("div");
            trackerCard.className = "menu-item-card community-tracker-card";
            
            const trackerTitle = currentLang === "en" 
                ? '<i class="fa-solid fa-heart"></i> Daily Community Pending Cup Counter' 
                : '<i class="fa-solid fa-heart"></i> 社区「暖心待用杯」今日共享实时数据统计';
            
            const trackerDesc = currentLang === "en"
                ? "Your small kindness provides chilled coconut water and herbal tea for Sanya outdoor workers."
                : "您的每一次随手善意，都在为高温下的环卫工人、骑手与志愿者积攒清凉。";
                
            const labelClaimed = currentLang === "en" ? "Chilled Coconut Claimed Today" : "今日已领待用椰水";
            const labelRemaining = currentLang === "en" ? "Remaining Cups Ready to Claim" : "剩余待领椰水";
            const labelTea = currentLang === "en" ? "Herbal Tea Dispensed Today" : "凉茶桶今日已出水";
            
            const buttonText = currentLang === "en" 
                ? '<i class="fa-solid fa-plus"></i> Donate a Pending Cup ($0)' 
                : '<i class="fa-solid fa-plus"></i> 我想捐赠一杯待用椰水 (¥0)';
                
            trackerCard.innerHTML = `
                <div class="tracker-header">
                    <h4>${trackerTitle}</h4>
                    <p>${trackerDesc}</p>
                </div>
                <div class="tracker-grid">
                    <div class="tracker-item">
                        <span class="tracker-label">${labelClaimed}</span>
                        <strong class="tracker-value" id="tracker-claimed">${sharedCoconutClaimed} ${currentLang === 'en' ? 'Cups' : '杯'}</strong>
                    </div>
                    <div class="tracker-item">
                        <span class="tracker-label">${labelRemaining}</span>
                        <strong class="tracker-value accent-color" id="tracker-remaining">${sharedCoconutRemaining} ${currentLang === 'en' ? 'Cups' : '杯'}</strong>
                    </div>
                    <div class="tracker-item">
                        <span class="tracker-label">${labelTea}</span>
                        <strong class="tracker-value" id="tracker-tea">${sharedHerbalTeaLiters} L</strong>
                    </div>
                </div>
                <button class="donate-btn" id="donate-cup-btn">
                    ${buttonText}
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
                        remainingEl.textContent = `${sharedCoconutRemaining} ${currentLang === 'en' ? 'Cups' : '杯'}`;
                        remainingEl.classList.add("pulse-update");
                        setTimeout(() => remainingEl.classList.remove("pulse-update"), 500);
                    }
                    
                    const successMsg = currentLang === "en"
                        ? "Thank you! You donated a cup of cool relief for Sanya workers 🥥"
                        : "捐赠成功！感谢您为烈日下的劳动者送去一份海岛清凉 🥥";
                    showToast(successMsg, "success");
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
            card.style.animationDelay = `${index * 0.06}s`;
            
            // Build Tags HTML
            let tagsHtml = "";
            item.tags.forEach(tag => {
                const mappedTag = (TAG_MAP[tag] && TAG_MAP[tag][currentLang]) ? TAG_MAP[tag][currentLang] : tag;
                tagsHtml += `<span class="menu-tag">${mappedTag}</span>`;
            });
            
            // Highlight special tags
            if (item.accent) {
                const accentLabel = currentLang === 'en' ? 'Signature' : '招牌必尝';
                tagsHtml = `<span class="menu-tag accent-tag"><i class="fa-solid fa-fire-flame-simple"></i> ${accentLabel}</span>` + tagsHtml;
            }
            if (item.coord) {
                tagsHtml = `<span class="menu-tag coord-tag"><i class="fa-solid fa-location-dot"></i> ${item.coord}</span>` + tagsHtml;
            }
            
            // Localize price label
            let displayPrice = "";
            if (item.price === 0) {
                displayPrice = currentLang === "en" ? "Free" : "免费";
            } else {
                displayPrice = `¥${item.price}`;
            }
            
            // Localize names & descriptions
            const displayName = currentLang === "en" ? item.englishName : item.name;
            const subName = currentLang === "en" ? item.name : item.englishName;
            const displayDesc = currentLang === "en" ? item.description_en : item.description;
            
            const formulaPrefix = currentLang === "en" ? "Formula" : "萃取配方";
            
            card.innerHTML = `
                <div class="menu-item-top">
                    <div class="menu-item-title-box">
                        <h4>${displayName}</h4>
                        <span class="eng-name">${subName}</span>
                    </div>
                    <div class="menu-item-price-box">
                        <span class="menu-item-price">${displayPrice}</span>
                        <i class="fa-solid fa-chevron-down accordion-arrow"></i>
                    </div>
                </div>
                <div class="menu-item-details-wrapper">
                    <div class="menu-item-details">
                        <p class="menu-item-desc">${displayDesc}</p>
                        ${item.formula ? `<div class="menu-item-formula"><i class="fa-solid fa-flask"></i> ${formulaPrefix}: <code>${item.formula}</code></div>` : ''}
                        <div class="menu-item-bottom">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
            `;
            
            // Add click listener for mobile accordion toggle
            card.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    if (e.target.closest("a") || e.target.closest("button")) return;
                    
                    const isExpanded = card.classList.contains("expanded");
                    
                    // Collapse all cards first for accordion behavior
                    menuItemsGrid.querySelectorAll(".menu-item-card").forEach(c => {
                        c.classList.remove("expanded");
                    });
                    
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
        
        // Translate tab labels dynamically if DOM keys aren't enough
        const tabKeysMap = {
            "all": { zh: "全部风味", en: "All Flavors" },
            "signature": { zh: "18°特调系列", en: "18° Specials" },
            "so-pour": { zh: "手冲单一源", en: "Single Origin" },
            "espresso": { zh: "经典意式", en: "Classic Espresso" },
            "pastry": { zh: "海岛轻食", en: "Island Pastry" },
            "hidden": { zh: '<i class="fa-solid fa-gift"></i> 暖心隐藏款', en: '<i class="fa-solid fa-gift"></i> Warm Hidden Menu' }
        };

        const updateTabTexts = () => {
            tabs.forEach(tab => {
                const filter = tab.getAttribute("data-filter");
                if (tabKeysMap[filter]) {
                    tab.innerHTML = tabKeysMap[filter][currentLang];
                }
            });
        };

        // Initial tab labels update
        updateTabTexts();
        
        // Reroute lang button click to also refresh tab texts
        desktopLangBtn.addEventListener("click", updateTabTexts);
        drawerLangBtn.addEventListener("click", updateTabTexts);

        tabs.forEach(tab => {
            tab.addEventListener("click", (e) => {
                tabs.forEach(t => t.classList.remove("active"));
                
                // support click target being an icon within button
                const activeTab = e.target.closest(".menu-tab");
                activeTab.classList.add("active");
                
                activeCategory = activeTab.getAttribute("data-filter");
                renderMenuItems(activeCategory);
            });
        });
    }

    // ==========================================
    // 7. Booking Flow & Modal Ticket Generation
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

            const baristaSelect = document.getElementById("book-barista-select");
            const baristaVal = baristaSelect ? baristaSelect.value : "any";
            
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
                    if (currentLang === "en") {
                        if (careNeedVal === "stroller") {
                            desc = "Spacious window seat prioritized with stroller parking and a sanitized baby high chair ready.";
                        } else if (careNeedVal === "wheelchair") {
                            desc = "Flat access seat locked (no stairs). Our barista will assist you at the ramp upon arrival.";
                        } else if (careNeedVal === "pet") {
                            desc = "Pet-friendly table reserved. Clean water bowl and fresh dehydrated coconut treats will be provided.";
                        } else if (careNeedVal === "disability") {
                            desc = "Accessibility support registered. Our staff will assist with ordering and provide sunset/tidal descriptions.";
                        }
                    } else {
                        if (careNeedVal === "stroller") {
                            desc = "已优先安排宽敞靠窗席位，预留婴幼儿车位，并备妥经紫外线消杀的儿童安全餐椅。";
                        } else if (careNeedVal === "wheelchair") {
                            desc = "已为您锁定无障碍清水平台专属桌位（无阶梯阻隔），到店前将有专属咖啡师提前出迎提供坡道引导。";
                        } else if (careNeedVal === "pet") {
                            desc = "宠物友好席位锁合成功。桌下将备有洗净饮水碗与一次性无尘垫纸，到店可领取自制有机冷榨椰肉干宠用饼干。";
                        } else if (careNeedVal === "disability") {
                            desc = "已登记暖心特殊关怀协助。届时我们将指派一名专职店员为您进行语音点单指引，并伴随落日潮汐进行声画导览。";
                        }
                    }
                    vCareText.textContent = desc;
                } else {
                    vCareContainer.style.display = "none";
                }
            }

            // Populate barista details in reservation ticket (🤝 Silent Economics)
            const vBaristaContainer = document.getElementById("voucher-barista-container");
            const vBaristaText = document.getElementById("voucher-barista-text");
            if (vBaristaContainer && vBaristaText) {
                if (baristaVal !== "any") {
                    vBaristaContainer.style.display = "flex";
                    let baristaName = "";
                    let note = "";
                    if (baristaVal === "qiang") {
                        baristaName = currentLang === "en" ? "Ah Qiang (SCA Cup Master)" : "阿强 (SCA金杯大师)";
                        note = currentLang === "en"
                            ? "\"I've reserved my signature volcano slow-pour beans for you. See you tomorrow!\""
                            : "“已为您预留今日澄迈火山单品最佳豆批，期待明天用慢滤手艺为您冲滤。—— 阿强”";
                    } else if (baristaVal === "lin") {
                        baristaName = currentLang === "en" ? "Ah Lin (SCA Sensory Master)" : "阿林 (SCA感官大师)";
                        note = currentLang === "en"
                            ? "\"Welcome to the coast! I'll craft a customized coconut signature latte tailored to your taste.\""
                            : "“海棠落日最适宜微温椰乳特调，明天我将根据气象湿度为您量身配比。—— 阿林”";
                    } else if (baristaVal === "fang") {
                        baristaName = currentLang === "en" ? "Xiao Fang (Latte Art Champion)" : "小芳 (拉花艺术冠军)";
                        note = currentLang === "en"
                            ? "\"Looking forward to pouring my signature 'Ocean Breeze' latte art on your flat white!\""
                            : "“期待为您冲制一杯经典澳白，并在那层细腻的奶泡上，为您手绘一幅椰风海韵。—— 小芳”";
                    }
                    vBaristaText.innerHTML = `<strong>${baristaName}</strong><br>${note}`;
                } else {
                    vBaristaContainer.style.display = "none";
                }
            }
            
            // Show Modal
            if (voucherModal) {
                voucherModal.classList.remove("hidden");
                document.body.style.overflow = "hidden"; // Lock scroll
            }
            
            const successMsg = currentLang === "en"
                ? "Seat Reserved! Your Sanya coast voucher has been generated"
                : "预约成功！已为您生成电子海岛确认单";
            showToast(successMsg, "success");
            bookingForm.reset();
            
            // Keep default dates valid after reset
            if (bookDateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                bookDateInput.value = tomorrow.toISOString().split('T')[0];
            }
        });
    }

    // ==========================================
    // 7.2 Shanhai Day Joint Booking Handler
    // ==========================================
    window.switchBookingType = function(type) {
        const singleForm = document.getElementById("seat-booking-form");
        const jointForm = document.getElementById("joint-booking-form");
        const tabSingle = document.getElementById("tab-single");
        const tabJoint = document.getElementById("tab-joint");
        
        if (type === "single") {
            if (singleForm) singleForm.classList.remove("hidden");
            if (jointForm) jointForm.classList.add("hidden");
            if (tabSingle) {
                tabSingle.classList.add("active");
                tabSingle.style.color = "var(--text-main)";
            }
            if (tabJoint) {
                tabJoint.classList.remove("active");
                tabJoint.style.color = "var(--text-muted)";
            }
        } else {
            if (singleForm) singleForm.classList.add("hidden");
            if (jointForm) jointForm.classList.remove("hidden");
            if (tabSingle) {
                tabSingle.classList.remove("active");
                tabSingle.style.color = "var(--text-muted)";
            }
            if (tabJoint) {
                tabJoint.classList.add("active");
                tabJoint.style.color = "var(--text-main)";
            }
            
            // Populate default date for joint date
            const jointDate = document.getElementById("joint-date");
            const bookDate = document.getElementById("book-date");
            if (jointDate && bookDate) {
                jointDate.value = bookDate.value;
                jointDate.min = bookDate.min;
            }
        }
    };

    const jointBookingForm = document.getElementById("joint-booking-form");
    if (jointBookingForm) {
        jointBookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("joint-name").value.trim();
            const phone = document.getElementById("joint-phone").value.trim();
            const guestsSelect = document.getElementById("joint-guests-count");
            const guests = guestsSelect.options[guestsSelect.selectedIndex].text;
            const date = document.getElementById("joint-date").value;
            const careOptions = Array.from(document.querySelectorAll("input[name='joint-care-option']:checked")).map(el => el.value);
            
            // Format phone number: mask middle 4 digits
            const maskedPhone = phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
            
            // Generate Random Order ID
            const dateStr = date.replace(/-/g, "");
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const orderId = `SHD${dateStr}${randomNum}`;
            
            // Populate Voucher Modal for Joint Booking
            if (vOrderId) vOrderId.textContent = orderId;
            if (vName) vName.textContent = name;
            if (vPhone) vPhone.textContent = maskedPhone;
            if (vGuests) vGuests.textContent = guests;
            if (vDate) vDate.textContent = date;
            
            // Render Joint timeline detail inside vTime
            if (vTime) {
                let listHtml = "";
                if (currentLang === "en") {
                    listHtml = `
                        <div class="joint-voucher-schedule" style="text-align: left; font-size: 0.8rem; margin-top: 10px; background: rgba(197, 168, 128, 0.05); border: 1px solid rgba(197, 168, 128, 0.15); border-radius: 8px; padding: 12px;">
                            <h4 style="font-family: var(--font-serif); font-size: 0.9rem; color: var(--accent); margin-bottom: 8px; border-bottom: 1px solid rgba(197,168,128,0.2); padding-bottom: 5px;">Shanhai Day Itinerary</h4>
                            <div style="margin-bottom: 5px;">☀️ <strong>08:00 Coffee</strong>: 18°D Hand-drip & Tide Parameter</div>
                            <div style="margin-bottom: 5px;">🍱 <strong>12:00 Lunch</strong>: Silan Chef's Special Dish</div>
                            <div style="margin-bottom: 5px;">🍷 <strong>18:00 Dinner</strong>: Silan Low-carbon Private Dinner</div>
                            <div>🏨 <strong>21:00 Lodging</strong>: Yamei Zhuying Room (*Check-in priority)</div>
                        </div>
                    `;
                } else {
                    listHtml = `
                        <div class="joint-voucher-schedule" style="text-align: left; font-size: 0.8rem; margin-top: 10px; background: rgba(197, 168, 128, 0.05); border: 1px solid rgba(197, 168, 128, 0.15); border-radius: 8px; padding: 12px;">
                            <h4 style="font-family: var(--font-serif); font-size: 0.9rem; color: var(--accent); margin-bottom: 8px; border-bottom: 1px solid rgba(197,168,128,0.2); padding-bottom: 5px;">「山海一日」联合预订明细</h4>
                            <div style="margin-bottom: 5px;">☀️ <strong>08:00 晨光咖啡</strong>: 18°D 专属手冲与自然参数萃取</div>
                            <div style="margin-bottom: 5px;">🍱 <strong>12:00 海岛正午</strong>: 汐澜中餐主厨今日一句话推荐菜</div>
                            <div style="margin-bottom: 5px;">🍷 <strong>18:00 日落晚宴</strong>: 汐澜低碳私房美学晚餐</div>
                            <div>🏨 <strong>21:00 静谧宿处</strong>: 亚美旅宿竹影大床房1晚 (*前台优先选房)</div>
                        </div>
                    `;
                }
                vTime.innerHTML = listHtml;
            }
            
            // Adjust carbon emission text
            const ecoBadge = document.querySelector(".ticket-eco-badge");
            if (ecoBadge) {
                ecoBadge.style.display = "flex"; 
                const ecoTitle = ecoBadge.querySelector("h4");
                const ecoDesc = ecoBadge.querySelector("p");
                if (ecoTitle && ecoDesc) {
                    if (currentLang === "en") {
                        ecoTitle.textContent = "Eco Joint Booking Discount: +300 Points";
                        ecoDesc.textContent = "You've successfully booked our unified low-carbon day program, reducing food waste and hotel printouts.";
                    } else {
                        ecoTitle.textContent = "山海一日低碳出行：+300 积分已累积";
                        ecoDesc.textContent = "您已成功订阅山海一日联合低碳计划，全程倡议绿色出行与光盘行动。凭此单可获取免费环保礼遇！";
                    }
                }
            }

            // Adjust care need badge and multi-brand execution checklist
            const vCareContainer = document.getElementById("voucher-care-container");
            const vCareText = document.getElementById("voucher-care-text");
            const careListContainer = document.getElementById("voucher-care-list-container");
            const careListBody = document.getElementById("voucher-care-list-body");

            const careDetails = {
                zh: {
                    stroller: {
                        title: "👶 婴幼儿专属关怀",
                        specialist: "婴幼儿关怀管家：小文",
                        coffee: "18°D 咖啡：备妥儿童无菌椅，并提供保温温奶服务及温热牛奶。",
                        bistro: "汐澜中餐：为家庭锁定微风开阔席位，备好经紫外线消杀的儿童餐具与宝宝椅。",
                        hotel: "亚美旅宿：客房内提前放置防滑婴儿浴盆、环保木质摇铃及儿童温和备品礼包。"
                    },
                    wheelchair: {
                        title: "♿ 行动不便与长辈无障碍",
                        specialist: "无障碍出迎管家：阿峰",
                        coffee: "18°D 咖啡：专人导引平地缓坡入座，留出宽敞的轮椅轮置通道空间。",
                        bistro: "汐澜中餐：锁定一层无门槛清水石露台大圆桌，提供全平无障碍通路。",
                        hotel: "亚美旅宿：优先分配一层低位开关及扶手拉栏的无障碍竹影大床房。"
                    },
                    pet: {
                        title: "🐾 宠物友好伴侣计划",
                        specialist: "爱宠侍奉管家：阿木",
                        coffee: "18°D 咖啡：提供专用饮水盆，赠送无糖椰油烘干犬类松饼零食。",
                        bistro: "汐澜中餐：锁定海滩露台宠物桌，提供防风系绳锚点及宠物洁净淡水。",
                        hotel: "亚美旅宿：房间铺设降解咖啡渣除味尿垫，提供专用食盆及迷你救生衣。"
                    },
                    disability: {
                        title: "👁️ 视力障碍暖心助览",
                        specialist: "声音导引管家：阿强",
                        coffee: "18°D 咖啡：提供触觉盲文纸质菜单，由主理人进行咖啡豆香气嗅觉导览。",
                        bistro: "汐澜中餐：指派专人进行餐品摆盘方位声画讲解（如“鱼位于三点钟方向”）。",
                        hotel: "亚美旅宿：客房音响默认开启白噪音潮汐伴眠，大堂提供触感盲道引导。"
                    },
                    "silent-service": {
                        title: "🤟 无声手语与安静协助",
                        specialist: "手语共创管家：阿林",
                        coffee: "18°D 咖啡：由 SCA 认证听障咖啡师以自然手语致意，提供手语字牌沟通。",
                        bistro: "汐澜中餐：提供图示卡片点单册，服务员以基本手语指引，全程轻音服务。",
                        hotel: "亚美旅宿：客房启用“无打扰”指示灯配送，专人无声送件，保障绝对隐私安宁。"
                    },
                    "elder-diet": {
                        title: "🍵 长辈膳食定制与温情暖袋",
                        specialist: "长辈膳食管家：主厨阿峰",
                        coffee: "18°D 咖啡：免费将手冲升级为澄迈火山富硒大麦温热谷物特调（无咖啡因）。",
                        bistro: "汐澜中餐：通知主厨对正餐菜品做低盐、低糖、低嘌呤无化学调味定制处理。",
                        hotel: "亚美旅宿：睡前将中草药艾草草本温热袋放置于床头，备好全温控恒温水杯。"
                    }
                },
                en: {
                    stroller: {
                        title: "👶 Infant & Kids Care",
                        specialist: "Care Specialist: Winnie (Housekeeping)",
                        coffee: "18°D Coffee: High chair prepared, milk warming service and hot milk provided.",
                        bistro: "Silan Bistro: Open airy table reserved, sanitized utensils and baby chair ready.",
                        hotel: "Yamei Hotel: Non-slip baby tub, wooden baby toy, and organic kids wash pack placed in room."
                    },
                    wheelchair: {
                        title: "♿ Accessibility & Elders",
                        specialist: "Accessibility Specialist: Frank (Guest Experience)",
                        coffee: "18°D Coffee: Accessible seating ramp guided, spacious layout reserved.",
                        bistro: "Silan Bistro: Ground floor seamless entrance round table locked.",
                        hotel: "Yamei Hotel: Ground floor accessible room with low switches and safety bar assigned."
                    },
                    pet: {
                        title: "🐾 Pet Companion Plan",
                        specialist: "Pet Specialist: Mumu (Pet Concierge)",
                        coffee: "18°D Coffee: Pet water bowl and sugar-free coconut dried biscuit treats provided.",
                        bistro: "Silan Bistro: Outdoor beachside table reserved with tie anchors and fresh water.",
                        hotel: "Yamei Hotel: Coffee-compost odor-control pad, pet dining bowl, and lifejacket ready."
                    },
                    disability: {
                        title: "👁️ Visual Impairment Orientation",
                        specialist: "Audio Guide Specialist: Qiang (Orientation Pro)",
                        coffee: "18°D Coffee: Braille tactile menu provided, fragrance jar sensory experience guided.",
                        bistro: "Silan Bistro: Staff assigned to explain food clock coordinates (e.g. 'fish at 3 o'clock').",
                        hotel: "Yamei Hotel: Room smart speaker pre-configured with tide sounds; tactile route guidance."
                    },
                    "silent-service": {
                        title: "🤟 Silent Signing & Quiet Service",
                        specialist: "Sign Specialist: Alin (SCA Deaf Specialist)",
                        coffee: "18°D Coffee: Served by certified deaf baristas with sign language greeting and card tools.",
                        bistro: "Silan Bistro: Visual menu card book provided, basic sign language guided by table staff.",
                        hotel: "Yamei Hotel: Silent do-not-disturb delivery mode activated, keyless guestroom service."
                    },
                    "elder-diet": {
                        title: "🍵 Elders Healthy Diet & Mugwort",
                        specialist: "Diet Specialist: Chef Feng (F&B Director)",
                        coffee: "18°D Coffee: Hand-drip upgraded to hot caffeine-free volcanic grain brew.",
                        bistro: "Silan Bistro: Executive chef notified to customize dinner for low-sodium and low-purine.",
                        hotel: "Yamei Hotel: Mugwort warming water bag placed on bed; temperature-controlled mug ready."
                    }
                }
            };

            if (careListContainer && careListBody) {
                if (careOptions.length > 0) {
                    careListContainer.style.display = "block";
                    let listHtml = "";
                    careOptions.forEach(opt => {
                        const item = careDetails[currentLang] && careDetails[currentLang][opt];
                        if (item) {
                            listHtml += `
                                <div class="care-list-item">
                                    <div class="care-list-item-title">
                                        <span>${item.title}</span>
                                        <span class="care-specialist-badge">${item.specialist}</span>
                                    </div>
                                    <div class="care-brand-actions">
                                        <div class="care-brand-line"><strong>☕ 18°D</strong>: ${item.coffee}</div>
                                        <div class="care-brand-line"><strong>🍽️ 汐澜</strong>: ${item.bistro}</div>
                                        <div class="care-brand-line"><strong>🏨 亚美</strong>: ${item.hotel}</div>
                                    </div>
                                </div>
                            `;
                        }
                    });
                    careListBody.innerHTML = listHtml;
                    
                    if (vCareContainer && vCareText) {
                        vCareContainer.style.display = "flex";
                        vCareText.innerHTML = currentLang === "en" 
                            ? `Customized ${careOptions.length} inclusive service items.` 
                            : `已为您定制并下发 ${careOptions.length} 项联动无障碍关怀服务。`;
                    }
                } else {
                    careListContainer.style.display = "none";
                    if (vCareContainer) vCareContainer.style.display = "none";
                }
            }

            // Adjust butler message
            const vBaristaContainer = document.getElementById("voucher-barista-container");
            const vBaristaText = document.getElementById("voucher-barista-text");
            if (vBaristaContainer && vBaristaText) {
                vBaristaContainer.style.display = "flex";
                vBaristaContainer.style.background = "rgba(43, 76, 48, 0.05)";
                vBaristaContainer.style.border = "1px solid rgba(43, 76, 48, 0.15)";
                const vBaristaTitle = document.querySelector("#voucher-barista-container h4");
                if (vBaristaTitle) {
                    vBaristaTitle.textContent = currentLang === "en" ? "Group Butler Message" : "山海主理人致意";
                }
                
                vBaristaText.innerHTML = currentLang === "en"
                    ? `<strong>Shanhai Group Butler Office</strong><br>"We have coordinated coffee baristas, bistro chefs, and Yamei hotel room housekeepers to ensure your seamless coastal journey."`
                    : `<strong>山海共生管家办公室</strong><br>“我们已为您一键协调 18°D 听障咖啡师、汐澜主厨及亚美房务部，期待明天为您开启无缝衔接的海岸美物之旅。”`;
            }
            
            // Show Modal
            if (voucherModal) {
                voucherModal.classList.remove("hidden");
                document.body.style.overflow = "hidden"; // Lock scroll
            }
            
            const successMsg = currentLang === "en"
                ? "Shanhai Day Program Booked! Your unified voucher has been generated"
                : "预约成功！已为您生成「山海一日」联合电子确认单";
            showToast(successMsg, "success");
            jointBookingForm.reset();
        });
    }

    // ==========================================
    // 7.5 Interactive Loyalty Membership Program
    // ==========================================
    if (joinMemberButtons.length > 0) {
        joinMemberButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const tier = btn.getAttribute("data-tier");
                if (memberSelectedTierInput) {
                    memberSelectedTierInput.value = tier;
                }
                
                // Reset Modal View to form state
                if (memberFormBox) memberFormBox.classList.remove("hidden");
                if (memberCardBox) memberCardBox.classList.add("hidden");
                
                // Show modal
                if (memberModal) {
                    memberModal.classList.remove("hidden");
                    document.body.style.overflow = "hidden"; // Lock scroll
                }
            });
        });
    }

    if (memberJoinForm) {
        memberJoinForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("member-name").value.trim().toUpperCase();
            const phone = document.getElementById("member-phone").value.trim();
            const tier = memberSelectedTierInput ? memberSelectedTierInput.value : "wanderer";
            
            // Save to localStorage for integration with Bistro
            localStorage.setItem("coff_member_active", "true");
            localStorage.setItem("coff_member_name", name);
            localStorage.setItem("coff_member_phone", phone);
            localStorage.setItem("coff_member_tier", tier);
            
            // Generate Member Card details
            const randomSuffix1 = Math.floor(1000 + Math.random() * 9000);
            const randomSuffix2 = Math.floor(1000 + Math.random() * 9000);
            const memberId = `18D-${randomSuffix1}-${randomSuffix2}`;
            
            const randomBarcode = `18D${Date.now().toString().slice(-8)}`;
            
            // Localize tier display on the member card
            let tierName = "浪迹旅人";
            if (tier === "curator") {
                tierName = currentLang === "en" ? "Volcanic Curator" : "火山风物师";
            } else if (tier === "host") {
                tierName = currentLang === "en" ? "Tidal Host" : "潮汐主理人";
            } else {
                tierName = currentLang === "en" ? "Coastal Wanderer" : "浪迹旅人";
            }
            
            // Populate card info
            if (cardNameEl) cardNameEl.textContent = name;
            if (cardNumberEl) cardNumberEl.textContent = memberId;
            if (cardTierBadge) cardTierBadge.textContent = tierName;
            if (cardBarcodeNum) cardBarcodeNum.textContent = randomBarcode;
            
            // Set card theme class
            if (digitalCard) {
                digitalCard.className = "digital-member-card"; // reset
                if (tier === "curator") {
                    digitalCard.classList.add("curator-card");
                } else if (tier === "host") {
                    digitalCard.classList.add("host-card");
                } else {
                    digitalCard.classList.add("wanderer-card");
                }
            }
            
            // Switch views in modal
            if (memberFormBox) memberFormBox.classList.add("hidden");
            if (memberCardBox) memberCardBox.classList.remove("hidden");
            
            // Trigger toast
            const successMsg = currentLang === "en"
                ? `Welcome to 18°D! Your ${tierName} card is now active ☕️`
                : `恭喜您！您的 18°D「${tierName}」会员卡已成功开通 ☕️`;
            showToast(successMsg, "success");
            
            memberJoinForm.reset();
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

    if (voucherModal) {
        voucherModal.addEventListener("click", (e) => {
            if (e.target === voucherModal) {
                voucherModal.classList.add("hidden");
                document.body.style.overflow = "";
            }
        });
    }

    if (memberModal) {
        memberModal.addEventListener("click", (e) => {
            if (e.target === memberModal) {
                memberModal.classList.add("hidden");
                document.body.style.overflow = "";
            }
        });
    }

    // ==========================================
    // 8. Toast Notification Helper
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
    // 9. Scroll Reveal Animation Logic
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
    
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);

    // ==========================================
    // 10. Sunset Parameters Auto-Fluctuation
    // ==========================================
    const tempField = document.querySelector(".hero-floating-info .info-item:nth-child(1)");
    const beanField = document.querySelector(".hero-floating-info .info-item:nth-child(3)");
    const windField = document.querySelector(".hero-floating-info .info-item:nth-child(5)");
    const humidityField = document.querySelector(".hero-floating-info .info-item:nth-child(7)");
    const waveField = document.querySelector(".hero-floating-info .info-item:nth-child(9)");
    
    // Environmental fluctuations caching state
    let cachedTemp = "30.8";
    let cachedWindSpeed = "4.2";
    let cachedWindDir = "SSW";
    let cachedHumidity = "82";
    let cachedWave = "1.2";

    function updateWeatherTelemetry() {
        if (!tempField || !windField || !beanField) return;
        
        const labelTemp = currentLang === "en" ? "Temp" : "当日温度";
        const labelBeans = currentLang === "en" ? "Beans" : "本季豆选";
        const labelWind = currentLang === "en" ? "Wind" : "海风流向";
        const labelHumidity = currentLang === "en" ? "Humidity" : "相对湿度";
        const labelWave = currentLang === "en" ? "Wave Height" : "海浪高度";
        
        const beansName = currentLang === "en" ? "Chengmai Volcanic G1" : "澄迈火山玄武岩 G1";
        
        let displayWindDir = cachedWindDir;
        if (currentLang === "en") {
            if (cachedWindDir === "南南西") displayWindDir = "SSW";
            else if (cachedWindDir === "西南") displayWindDir = "SW";
            else if (cachedWindDir === "偏南风") displayWindDir = "Southerly";
            else if (cachedWindDir === "南风") displayWindDir = "South";
        } else {
            if (cachedWindDir === "SSW") displayWindDir = "南南西";
            else if (cachedWindDir === "SW") displayWindDir = "西南";
            else if (cachedWindDir === "Southerly") displayWindDir = "偏南风";
            else if (cachedWindDir === "South") displayWindDir = "南风";
        }

        tempField.innerHTML = `<i class="fa-solid fa-temperature-half"></i> ${labelTemp}: ${cachedTemp}°C`;
        beanField.innerHTML = `<i class="fa-solid fa-circle-nodes"></i> ${labelBeans}: ${beansName}`;
        windField.innerHTML = `<i class="fa-solid fa-wind"></i> ${labelWind}: ${displayWindDir} ${cachedWindSpeed}m/s`;
        if (humidityField) {
            humidityField.innerHTML = `<i class="fa-solid fa-droplet"></i> ${labelHumidity}: ${cachedHumidity}%`;
        }
        if (waveField) {
            waveField.innerHTML = `<i class="fa-solid fa-water"></i> ${labelWave}: ${cachedWave}m`;
        }

        // Update Eco-Brew Card elements if visible (🌊 Natural System Integration)
        const ecoTemp = document.getElementById("eco-val-temp");
        const ecoWind = document.getElementById("eco-val-wind");
        const ecoHumid = document.getElementById("eco-val-humidity");
        const ecoWave = document.getElementById("eco-val-wave");
        
        if (ecoTemp) ecoTemp.textContent = `${cachedTemp}°C`;
        if (ecoWind) ecoWind.textContent = `${displayWindDir} ${cachedWindSpeed}m/s`;
        if (ecoHumid) ecoHumid.textContent = `${cachedHumidity}%`;
        if (ecoWave) ecoWave.textContent = `${cachedWave}m`;

        // Calculate recipe advice based on weather
        const hum = parseFloat(cachedHumidity);
        const tempVal = parseFloat(cachedTemp);
        const wav = parseFloat(cachedWave);
        
        // Grind: High humidity -> coarser grind
        const grindVal = (4.0 + (hum / 100) * 0.4).toFixed(1);
        const grindLabel = currentLang === "en" ? `${grindVal} (Coarse Adjust)` : `${grindVal} (高湿防堵微调)`;
        
        // Water temp: Higher humidity / lower temp -> slightly higher water temp
        const brewTemp = (90.0 + (hum / 100) * 3.0).toFixed(1);
        
        // Flow rate: influenced by wave heights
        const flowVal = (1.8 + wav * 0.3).toFixed(1);
        
        // Target TDS
        const tdsVal = (1.30 + (tempVal / 100) * 0.25).toFixed(2);

        const grindEl = document.getElementById("eco-param-grind-val");
        const tempEl = document.getElementById("eco-param-temp-val");
        const flowEl = document.getElementById("eco-param-flow-val");
        const tdsEl = document.getElementById("eco-param-tds-val");
        const explainEl = document.getElementById("eco-explain-text");

        if (grindEl) grindEl.textContent = grindLabel;
        if (tempEl) tempEl.textContent = `${brewTemp} °C`;
        if (flowEl) flowEl.textContent = `${flowVal} ml/s`;
        if (tdsEl) tdsEl.textContent = `${tdsVal}%`;

        if (explainEl) {
            if (currentLang === "en") {
                explainEl.textContent = `Today's relative humidity in Sanya is ${cachedHumidity}% with waves at ${cachedWave}m. To prevent beans from clogging due to sea-spray humidity, we have adjusted the grind size to ${grindLabel} and recommended extraction at ${brewTemp}°C with a steady ${flowVal}ml/s flow. This ensures a balanced extraction of Hainan volcanic cacao notes. Today's cup is a unique terroir fingerprint.`;
            } else {
                explainEl.textContent = `今日三亚相对湿度为 ${cachedHumidity}%，海浪高度为 ${cachedWave}m。由于海岛高湿度易导致咖啡粉吸潮板结，咖啡师已将磨粉粒度微调至 ${grindLabel}，推荐采用 ${brewTemp}°C 水温以 ${flowVal}ml/s 慢流速进行金杯冲滤，完美锁住火山红土豆的黑可可与焦糖后味。—— 这杯咖啡，今日限定。`;
            }
        }
    }

    // Telemetry updates interval
    setInterval(() => {
        const baseTemp = 30.5;
        const variance = (Math.random() * 2 - 1).toFixed(1);
        cachedTemp = (parseFloat(baseTemp) + parseFloat(variance)).toFixed(1);
        
        cachedWindSpeed = (3.8 + Math.random() * 1.2).toFixed(1);
        cachedHumidity = Math.floor(75 + Math.random() * 15).toString();
        cachedWave = (0.8 + Math.random() * 0.8).toFixed(1);
        
        const directions = currentLang === "en" 
            ? ["SSW", "SW", "Southerly", "South"]
            : ["南南西", "西南", "偏南风", "南风"];
        cachedWindDir = directions[Math.floor(Math.random() * directions.length)];
        
        updateWeatherTelemetry();
    }, 8000);

    // Initial weather populate
    updateWeatherTelemetry();

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

    // ==========================================
    // 11. Table Ordering Simulation
    // ==========================================

    const tableNumberInput = document.getElementById('table-number-input');
    const tableConfirmBtn = document.getElementById('table-confirm-btn');
    const tableConfirmedBadge = document.getElementById('table-confirmed-badge');
    const confirmedTableDisplay = document.getElementById('confirmed-table-display');
    const orderMenuWrapper = document.getElementById('order-menu-wrapper');
    const orderItemsGrid = document.getElementById('order-items-grid');
    const orderFilterTabs = document.getElementById('order-filter-tabs');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmpty = document.getElementById('cart-empty');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const cartTableTag = document.getElementById('cart-table-tag');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const orderSuccessOverlay = document.getElementById('order-success-overlay');
    const orderSuccessMsg = document.getElementById('order-success-msg');
    const orderReceipt = document.getElementById('order-receipt');
    const orderDoneBtn = document.getElementById('order-done-btn');

    // Only run if ordering section exists on this page
    if (tableConfirmBtn && orderItemsGrid) {
        let currentTableNo = null;
        let cart = {}; // { itemId: { item, qty } }
        let currentFilterCat = 'all';
        const lang = () => document.documentElement.getAttribute('data-lang') || 'zh';

        // Render menu items into grid
        function renderOrderItems(cat) {
            currentFilterCat = cat;
            const filtered = cat === 'all' ? MENU_DATA : MENU_DATA.filter(i => i.category === cat);
            orderItemsGrid.innerHTML = '';
            filtered.forEach(item => {
                const isHidden = item.category === 'hidden';
                const isFree = item.price === 0;
                const priceText = isFree ? (lang() === 'zh' ? '爱心免费' : 'Free') : (item.price === 1 ? '¥1' : `¥${item.price}`);
                const nameDisplay = lang() === 'zh' ? item.name : item.englishName;
                const descDisplay = lang() === 'zh' ? item.description : (item.description_en || item.description);

                const card = document.createElement('div');
                card.className = `order-item-card${item.accent ? ' accent-card' : ''}${isHidden ? ' hidden-item' : ''}`;
                card.innerHTML = `
                    <div class="item-card-top">
                        <div>
                            <div class="item-name-zh">${item.name}</div>
                            <div class="item-name-en">${item.englishName}</div>
                        </div>
                        <span class="item-price-tag ${isFree || item.price === 1 ? 'free-tag' : ''}">${priceText}</span>
                    </div>
                    <p class="item-desc">${descDisplay}</p>
                    <div class="item-tags">
                        ${item.tags.map(t => `<span class="item-tag-chip">${t}</span>`).join('')}
                    </div>
                    <button class="item-add-btn ${isFree || item.price === 1 ? 'free-btn' : ''}" data-id="${item.id}">
                        <i class="fa-solid fa-plus"></i> 
                        ${lang() === 'zh' ? (isHidden ? '我要领取' : '加入点单') : (isHidden ? 'Claim' : 'Add to Order')}
                    </button>
                `;
                orderItemsGrid.appendChild(card);
            });

            // Add event listeners for add buttons
            orderItemsGrid.querySelectorAll('.item-add-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const itemId = btn.dataset.id;
                    const item = MENU_DATA.find(i => i.id === itemId);
                    if (!item) return;
                    if (cart[itemId]) {
                        cart[itemId].qty += 1;
                    } else {
                        cart[itemId] = { item, qty: 1 };
                    }
                    renderCart();
                    // Flash feedback
                    btn.style.transform = 'scale(0.92)';
                    setTimeout(() => btn.style.transform = '', 200);
                });
            });
        }

        // Render cart
        function renderCart() {
            const cartKeys = Object.keys(cart);
            placeOrderBtn.disabled = cartKeys.length === 0;

            if (cartKeys.length === 0) {
                cartItemsList.innerHTML = '';
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'cart-empty';
                emptyDiv.id = 'cart-empty';
                emptyDiv.innerHTML = `<span>${lang() === 'zh' ? '还没有选择，请从菜单中添加。' : 'No items added yet.'}</span>`;
                cartItemsList.appendChild(emptyDiv);
                cartTotalAmount.textContent = '0';
                return;
            }

            cartItemsList.innerHTML = '';
            let total = 0;
            cartKeys.forEach(id => {
                const { item, qty } = cart[id];
                const itemTotal = item.price * qty;
                total += itemTotal;
                const row = document.createElement('div');
                row.className = 'cart-item-row';
                row.innerHTML = `
                    <span class="cart-item-name" title="${item.name}">${item.name}</span>
                    <div class="cart-item-qty-ctrl">
                        <button class="qty-btn qty-minus" data-id="${id}">−</button>
                        <span class="qty-display">${qty}</span>
                        <button class="qty-btn qty-plus" data-id="${id}">+</button>
                    </div>
                    <span class="cart-item-price">${item.price === 0 ? (lang() === 'zh' ? '免费' : 'Free') : `¥${itemTotal}`}</span>
                `;
                cartItemsList.appendChild(row);
            });
            cartTotalAmount.textContent = total;

            // Qty controls
            cartItemsList.querySelectorAll('.qty-minus').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    if (cart[id].qty > 1) {
                        cart[id].qty -= 1;
                    } else {
                        delete cart[id];
                    }
                    renderCart();
                });
            });
            cartItemsList.querySelectorAll('.qty-plus').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    cart[id].qty += 1;
                    renderCart();
                });
            });
        }

        // Table confirm
        tableConfirmBtn.addEventListener('click', () => {
            const val = parseInt(tableNumberInput.value, 10);
            if (!val || val < 1 || val > 50) {
                tableNumberInput.style.borderColor = '#c0392b';
                tableNumberInput.focus();
                setTimeout(() => tableNumberInput.style.borderColor = '', 1500);
                return;
            }
            currentTableNo = val;
            const padded = String(val).padStart(2, '0');
            const tableLabel = lang() === 'zh' ? `桌号 ${padded}` : `Table ${padded}`;
            confirmedTableDisplay.textContent = tableLabel;
            cartTableTag.textContent = tableLabel;
            tableConfirmedBadge.classList.remove('hidden');
            orderMenuWrapper.classList.remove('hidden');

            // Scroll to order menu smoothly
            setTimeout(() => {
                orderMenuWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);

            // Render menu initially
            renderOrderItems('all');
            renderCart();
        });

        // Filter tabs
        if (orderFilterTabs) {
            orderFilterTabs.querySelectorAll('.filter-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    orderFilterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    renderOrderItems(tab.dataset.cat);
                });
            });
        }

        // Place order
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', () => {
                const cartKeys = Object.keys(cart);
                if (cartKeys.length === 0 || !currentTableNo) return;

                const padded = String(currentTableNo).padStart(2, '0');
                const tableLabel = lang() === 'zh' ? `桌号 ${padded}` : `Table ${padded}`;
                const now = new Date();
                const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

                // Brewed by selected barista msg (🤝 Silent Economics)
                const baristaSelect = document.getElementById("order-barista-select");
                const baristaVal = baristaSelect ? baristaSelect.value : "any";
                let baristaMsg = "";
                if (lang() === "en") {
                    if (baristaVal === "qiang") baristaMsg = "Specialist Ah Qiang is hand-dripping your cup.";
                    else if (baristaVal === "lin") baristaMsg = "Specialist Ah Lin is blending your raw coconut infusion.";
                    else if (baristaVal === "fang") baristaMsg = "Champion Xiao Fang is steaming microfoam for your cup.";
                    else baristaMsg = "Our barista on duty is preparing your order.";
                } else {
                    if (baristaVal === "qiang") baristaMsg = "手冲专家【阿强】正在使用火山岩慢滤工艺为您冲滤。";
                    else if (baristaVal === "lin") baristaMsg = "特调大师【阿林】正在按照今日湿度黄金配比为您调制椰乳拿铁。";
                    else if (baristaVal === "fang") baristaMsg = "拉花冠军【小芳】正在为您打发微孔奶泡并手绘拉花。";
                    else baristaMsg = "值班咖啡师正在为您精心制作，请稍候。";
                }

                // Build receipt
                let receiptHTML = '';
                let total = 0;
                cartKeys.forEach(id => {
                    const { item, qty } = cart[id];
                    const itemTotal = item.price * qty;
                    total += itemTotal;
                    const priceStr = item.price === 0
                        ? (lang() === 'zh' ? '爱心免费' : 'Free')
                        : `¥${itemTotal}`;
                    receiptHTML += `<div class="receipt-row"><span>${item.name} × ${qty}</span><span>${priceStr}</span></div>`;
                });
                receiptHTML += `<div class="receipt-row"><span>${lang() === 'zh' ? '合计' : 'Total'}</span><span>¥${total}</span></div>`;

                orderReceipt.innerHTML = receiptHTML;
                orderSuccessMsg.textContent = `${tableLabel} · ${timeStr} — ${baristaMsg}`;

                orderSuccessOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        }

        // Order done (clear cart)
        if (orderDoneBtn) {
            orderDoneBtn.addEventListener('click', () => {
                cart = {};
                renderCart();
                orderSuccessOverlay.classList.add('hidden');
                document.body.style.overflow = '';
                orderMenuWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        // Re-render on language switch
        document.addEventListener('langChange', () => {
            if (currentTableNo && !orderMenuWrapper.classList.contains('hidden')) {
                renderOrderItems(currentFilterCat);
                renderCart();
                const padded = String(currentTableNo).padStart(2, '0');
                cartTableTag.textContent = lang() === 'zh' ? `桌号 ${padded}` : `Table ${padded}`;
                confirmedTableDisplay.textContent = lang() === 'zh' ? `桌号 ${padded}` : `Table ${padded}`;
            }
        });
    }

    // ==========================================
    // 12. Multi-Page Navigation Helpers
    // ==========================================

    // Accordion Menu Toggle for Mobile Drawer
    const accordionBtns = document.querySelectorAll(".drawer-accordion-btn");
    accordionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const accordion = btn.closest(".drawer-accordion");
            if (accordion) {
                // Close other accordions for cleaner accordion behavior
                document.querySelectorAll(".drawer-accordion").forEach(acc => {
                    if (acc !== accordion) acc.classList.remove("active");
                });
                accordion.classList.toggle("active");
            }
        });
    });

    // Auto High-lighting for active navigation links
    const activePath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-menu a, .dropdown-content a, .drawer-links a");
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href) {
            // Check if current URL ends with href or is equivalent
            const isMatch = activePath.endsWith(href) || 
                            (activePath === "/" && href === "index.html") || 
                            (activePath.endsWith("/") && href === "index.html");
            if (isMatch) {
                link.classList.add("active");
                
                // Highlight parent dropdown if inside one
                const dropdown = link.closest(".nav-dropdown");
                if (dropdown) {
                    const parentMenu = dropdown.querySelector(".menu-item");
                    if (parentMenu) parentMenu.classList.add("active");
                }
                
                // Expand parent accordion if inside one
                const accordion = link.closest(".drawer-accordion");
                if (accordion) {
                    accordion.classList.add("active");
                }
            }
        }
    });

    // Cross-page Member activation trigger click listener
    const joinMemberTriggers = document.querySelectorAll(".join-member-btn-trigger");
    joinMemberTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            const isClubPage = window.location.pathname.includes("club.html");
            if (isClubPage) {
                e.preventDefault();
                closeMobileDrawer(); // Close mobile drawer if open
                
                if (memberSelectedTierInput) {
                    memberSelectedTierInput.value = "wanderer";
                }
                if (memberFormBox) memberFormBox.classList.remove("hidden");
                if (memberCardBox) memberCardBox.classList.add("hidden");
                if (memberModal) {
                    memberModal.classList.remove("hidden");
                    document.body.style.overflow = "hidden";
                }
            } else {
                trigger.setAttribute("href", "club.html?join=true");
            }
        });
    });

    // Check query params on page load for immediate join trigger (e.g. club.html?join=true)
    if (window.location.search.includes("join=true")) {
        if (memberSelectedTierInput) {
            memberSelectedTierInput.value = "wanderer";
        }
        if (memberFormBox) memberFormBox.classList.remove("hidden");
        if (memberCardBox) memberCardBox.classList.add("hidden");
        if (memberModal) {
            memberModal.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        }
    }

    // ==========================================
    // 📜 Sanya Terroir Batch Sourcing Database
    // ==========================================
    const SOURCING_DB = {
        "18D-VOL-0608": {
            name: { zh: "澄迈火山玄武岩 G1 (单品手冲)", en: "Hainan Chengmai Volcanic G1 (Single Origin)" },
            origin: { zh: "海南澄迈火山岩红土庄园", en: "Chengmai Volcanic Soil Estate, Hainan" },
            timeline: [
                {
                    title: { zh: "火山灰红土育种与采收", en: "Soil Cultivation & Harvesting" },
                    time: "2026-05-10",
                    media: "volcanic_coffee_farm.png",
                    desc: {
                        zh: "产自富含微量元素的玄武岩红土带。当地黎族咖啡农吉叔进行人工全红果采收。土壤富硒，含水量22%。",
                        en: "Grown in iron-rich basaltic clay. Harvested at peak ripeness by local farmer Uncle Wang. Soil selenium-rich, moisture 22%."
                    },
                    meta: [
                        { label: { zh: "坐标/Location", en: "Coordinates" }, val: "19.234°N, 110.013°E" },
                        { label: { zh: "海拔/Altitude", en: "Elevation" }, val: "220m" },
                        { label: { zh: "种植户/Farmer", en: "Farmer" }, val: "吉叔 (Uncle Wang)" }
                    ]
                },
                {
                    title: { zh: "微发酵与双重厌氧蜜处理", en: "Anaerobic Honey Fermentation" },
                    time: "2026-05-12 - 2026-05-15",
                    media: "coffee_source.webp",
                    desc: {
                        zh: "进行72小时恒温24°C双重厌氧发酵，保留糖度22.5 Brix，最大化火山豆的黑可可与甘草坚果甜韵。",
                        en: "72-hour double anaerobic fermentation under constant 24°C, preserving sugar content at 22.5 Brix to highlight rich dark cacao notes."
                    },
                    meta: [
                        { label: { zh: "发酵时长/Duration", en: "Fermentation" }, val: "72 Hours" },
                        { label: { zh: "发酵温控/Temp Control", en: "Temp" }, val: "24°C Constant" },
                        { label: { zh: "出水糖度/Brix", en: "Preserved sugar" }, val: "22.5 Brix" }
                    ]
                },
                {
                    title: { zh: "海岸烘焙实验室精细调校", en: "Coastal Roasting Protocol" },
                    time: "2026-06-01",
                    media: "coffee_cup.webp",
                    desc: {
                        zh: "在18°D三亚海岸烘焙实验室，由烘焙师阿林调校。采用中深焙曲线，Agtron色度值控制在58，锁住浓郁焦糖香气。",
                        en: "Roasted at the 18°D Sanya Coastal Lab by Roaster Ah Lin. Medium-dark roast profile, Agtron color value 58, locking in sweet caramel aromas."
                    },
                    meta: [
                        { label: { zh: "烘焙度/Roast Level", en: "Roast" }, val: "中深烘焙 (Med-Dark)" },
                        { label: { zh: "色度值/Agtron Color", en: "Agtron" }, val: "58" },
                        { label: { zh: "烘焙师/Roaster", en: "Roaster" }, val: "阿林 (Ah Lin)" }
                    ]
                },
                {
                    title: { zh: "潮汐海岸金杯萃取", en: "Tidal Golden Cup Brew" },
                    time: "2026-06-08 (今日限定)",
                    media: "coffee_shell_cup.webp",
                    desc: {
                        zh: "在三亚海棠湾店，由您指定的星级咖啡师按照今日气象湿度参数（磨粉粒径4.3，水温92.5°C）为您现场慢滤冲煮。",
                        en: "Brewed live at our Sanya Bay shop by your designated star barista using today's eco-driven recipe (Grind size 4.3, 92.5°C water)."
                    },
                    meta: [
                        { label: { zh: "今日水温/Today Temp", en: "Brew Temp" }, val: "92.5°C" },
                        { label: { zh: "今日流速/Today Flow", en: "Flow Rate" }, val: "2.2 ml/s" },
                        { label: { zh: "金杯浓度/TDS Target", en: "TDS" }, val: "1.38%" }
                    ]
                }
            ]
        },
        "18D-YIG-0518": {
            name: { zh: "水洗·耶加雪菲 葛德 (浅度烘焙)", en: "Washed Yirgacheffe Gedeo (Light Roast)" },
            origin: { zh: "埃塞俄比亚 Gedeo 产区", en: "Gedeo Zone, Ethiopia" },
            timeline: [
                {
                    title: { zh: "高海拔手工采收", en: "High Elevation Harvesting" },
                    time: "2026-04-20",
                    media: "coffee_source.webp",
                    desc: {
                        zh: "产自海拔 1900m - 2100m 高原，由合作社农户手工甄选全熟樱桃，展现干净高雅的柑橘茉莉花香韵律。",
                        en: "Harvested at 1900m - 2100m elevation. Hand-sorted at peak ripeness to ensure clean citrus and white floral aromas."
                    },
                    meta: [
                        { label: { zh: "坐标/Location", en: "Coordinates" }, val: "6.132°N, 38.201°E" },
                        { label: { zh: "海拔/Altitude", en: "Elevation" }, val: "2050m" },
                        { label: { zh: "处理厂/Station", en: "Station" }, val: "Gedeo Cooperative" }
                    ]
                },
                {
                    title: { zh: "传统双重水洗处理", en: "Traditional Washed Process" },
                    time: "2026-04-22 - 2026-04-24",
                    media: "coffee_belt_map.webp",
                    desc: {
                        zh: "去皮后发酵 36 小时，并在山泉水中清洗，置于高架非洲晒床慢速干燥 14 天，确保水分活度达到最佳的 0.60。",
                        en: "Fermented for 36 hours, washed in pure mountain springs, and dried on African raised beds for 14 days to target a water activity of 0.60."
                    },
                    meta: [
                        { label: { zh: "发酵时长/Fermentation", en: "Fermentation" }, val: "36 Hours" },
                        { label: { zh: "日晒干燥/Sun Drying", en: "Drying" }, val: "14 Days" },
                        { label: { zh: "水分活度/Water Act.", en: "Water Act." }, val: "0.60 aw" }
                    ]
                },
                {
                    title: { zh: "浅度曲线烘焙释放酸甜", en: "Light Roast Profile" },
                    time: "2026-05-18",
                    media: "coffee_cup.webp",
                    desc: {
                        zh: "采用北欧风浅焙曲线，Agtron色度值 75，最大化保留茉莉花与柠檬柑橘的明亮酸质与茶感余韵。",
                        en: "Light roast profile (Scandinavian style), Agtron color value 75. Preserves persistence of jasmine and bright lemon acids."
                    },
                    meta: [
                        { label: { zh: "烘焙度/Roast Level", en: "Roast" }, val: "浅度烘焙 (Light)" },
                        { label: { zh: "色度值/Agtron Color", en: "Agtron" }, val: "75" },
                        { label: { zh: "烘焙师/Roaster", en: "Roaster" }, val: "阿林 (Ah Lin)" }
                    ]
                }
            ]
        },
        "18D-COL-0524": {
            name: { zh: "哥伦比亚·粉红波旁 (双重厌氧蜜处理)", en: "Colombia Pink Bourbon (Anaerobic Honey)" },
            origin: { zh: "哥伦比亚 Huila 产地 蒙特贝罗庄园", en: "Finca Montebello, Huila, Colombia" },
            timeline: [
                {
                    title: { zh: "珍稀粉红波旁手工采选", en: "Rare Pink Bourbon Harvesting" },
                    time: "2026-04-28",
                    media: "hainan_coffee_farmer.png",
                    desc: {
                        zh: "采选罕见的粉红波旁变种，果实呈粉红色，糖度极高，带来水蜜桃与玫瑰的多汁香气层级。",
                        en: "Grown at Finca Montebello. The ripe cherries display a rare pink color with extremely high sugar content, yielding peach notes."
                    },
                    meta: [
                        { label: { zh: "坐标/Location", en: "Coordinates" }, val: "2.921°N, 76.035°W" },
                        { label: { zh: "海拔/Altitude", en: "Elevation" }, val: "1850m" },
                        { label: { zh: "庄园/Farm", en: "Estate" }, val: "Finca Montebello" }
                    ]
                },
                {
                    title: { zh: "双重厌氧发酵与冷水锁香", en: "Double Anaerobic Honey Fermentation" },
                    time: "2026-05-02",
                    media: "coffee_source.webp",
                    desc: {
                        zh: "咖啡樱桃密封充氮发酵48小时，去皮后再次带果胶进行厌氧发酵36小时，最后以冰水洗涤锁住花果芬芳。",
                        en: "Nitrogen anaerobic fermentation for 48 hours, pulped, fermented with mucilage for 36 hours, and locked with ice water rinse."
                    },
                    meta: [
                        { label: { zh: "一级发酵/Phase 1", en: "Phase 1" }, val: "48h Full Cherry" },
                        { label: { zh: "二级发酵/Phase 2", en: "Phase 2" }, val: "36h De-pulped" },
                        { label: { zh: "洗涤温控/Washing", en: "Washing Temp" }, val: "10°C Cold Shock" }
                    ]
                },
                {
                    title: { zh: "中浅烘焙保留丰富果香", en: "Light-Medium Roast Lab" },
                    time: "2026-05-24",
                    media: "coffee_cup.webp",
                    desc: {
                        zh: "在中浅烘焙下爆发花香，Agtron 色度值 66，在玫瑰香气与红茶尾韵间取得完美平衡。",
                        en: "Roasted at Light-Medium. Agtron color value 66. Provides balanced rose tea aromas with juice peach finish."
                    },
                    meta: [
                        { label: { zh: "烘焙度/Roast Level", en: "Roast" }, val: "中浅烘焙 (Light-Med)" },
                        { label: { zh: "色度值/Agtron Color", en: "Agtron" }, val: "66" },
                        { label: { zh: "烘焙师/Roaster", en: "Roaster" }, val: "阿林 (Ah Lin)" }
                    ]
                }
            ]
        }
    };

    // Sourcing elements
    const sourcingInput = document.getElementById("sourcing-input");
    const sourcingSearchBtn = document.getElementById("sourcing-search-btn");
    const sourcingResultContainer = document.getElementById("sourcing-result-container");
    const sampleTagBtns = document.querySelectorAll(".sample-tag-btn");

    function handleSourcingQuery(batchNo) {
        if (!sourcingResultContainer) return;
        
        const cleanBatch = batchNo.trim().toUpperCase();
        const data = SOURCING_DB[cleanBatch];
        
        if (!data) {
            const errorMsg = currentLang === "en" 
                ? "Batch number not found. Please check and try again." 
                : "未找到该批次号。请检查输入是否正确（可体验下方快速体验样本）。";
            showToast(errorMsg, "error");
            return;
        }

        sourcingResultContainer.innerHTML = "";
        sourcingResultContainer.classList.remove("hidden");

        // Render header
        const labelBatch = currentLang === "en" ? "BATCH NO" : "溯源批次";
        const labelOrigin = currentLang === "en" ? "TERROIR ORIGIN" : "原产区";
        const titleText = data.name[currentLang];
        const originText = data.origin[currentLang];

        const headerDiv = document.createElement("div");
        headerDiv.className = "sourcing-result-header";
        headerDiv.innerHTML = `
            <div class="sourcing-bean-info">
                <h3>${titleText}</h3>
                <p><i class="fa-solid fa-map-location-dot"></i> ${labelOrigin}: ${originText}</p>
            </div>
            <div class="sourcing-batch-stamp">
                <span>${labelBatch}</span>
                <strong>${cleanBatch}</strong>
            </div>
        `;
        sourcingResultContainer.appendChild(headerDiv);

        // Render timeline
        const timelineDiv = document.createElement("div");
        timelineDiv.className = "sourcing-timeline";

        data.timeline.forEach((step, index) => {
            const stepDiv = document.createElement("div");
            stepDiv.className = `timeline-step ${index === data.timeline.length - 1 ? 'active' : ''}`;
            
            const stepTitle = step.title[currentLang];
            const stepDesc = step.desc[currentLang];
            
            // Build metadata list
            let metaHtml = "";
            step.meta.forEach(m => {
                const label = m.label[currentLang];
                let valHtml = m.val;
                // If it looks like coordinates, wrap with maps link
                if (m.label.en === "Coordinates" || m.label.zh === "坐标/Location") {
                    valHtml = `<a href="https://maps.google.com/?q=${m.val}" target="_blank" class="coord-link"><i class="fa-solid fa-location-arrow"></i> ${m.val}</a>`;
                }
                metaHtml += `
                    <div class="step-meta-item">
                        <span>${label}</span>
                        <strong>${valHtml}</strong>
                    </div>
                `;
            });

            // Media HTML
            const mediaHtml = step.media 
                ? `<div class="step-media-box"><img src="${step.media}" alt="${stepTitle}"></div>`
                : "";

            stepDiv.innerHTML = `
                <div class="step-marker"></div>
                <div class="step-header">
                    <h4>${stepTitle}</h4>
                    <span class="step-time">${step.time}</span>
                </div>
                <div class="step-body">
                    <div class="step-text">
                        <p>${stepDesc}</p>
                        <div class="step-meta-grid">${metaHtml}</div>
                    </div>
                    ${mediaHtml}
                </div>
            `;
            timelineDiv.appendChild(stepDiv);
        });

        sourcingResultContainer.appendChild(timelineDiv);
        
        // Scroll smoothly to result
        setTimeout(() => {
            sourcingResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    if (sourcingSearchBtn && sourcingInput) {
        sourcingSearchBtn.addEventListener("click", () => {
            handleSourcingQuery(sourcingInput.value);
        });
        
        sourcingInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleSourcingQuery(sourcingInput.value);
            }
        });
    }

    if (sampleTagBtns) {
        sampleTagBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const batch = btn.getAttribute("data-batch");
                if (sourcingInput) sourcingInput.value = batch;
                handleSourcingQuery(batch);
            });
        });
    }
});

