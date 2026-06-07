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
        "story-body2": "回到三亚后，我们创立了 18°D（18°Degree）。我们建立了一套属于海岸的“提取纪实”：只选用火山岩红土地带的单一源（Single Origin）咖啡，并与文昌东郊椰林签署有机椰乳直供协议。为了能让自然与邻里在这里和谐共处，我们不仅设计了无障碍的清水日落坡道，还引入了“无声咖啡师”点单系统。这是咖啡与社会的温情碰撞，更是我们对三亚这片山海的敬畏礼赞。",
        
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
        "care-badge": "Join the Lab",
        "care-title": "寻找同频旅人 · <span class=\"italic\">加入我们</span>",
        "care-desc": "我们一直在寻找对风土地理心存敬畏、对邻里社区满怀温情的伙伴。这不仅是一份工作，更是一场关于风味与人情的美好旅程。",
        "care-recruit-title": "招聘渠道与应聘方式",
        "care-c1-title": "官方简历邮箱",
        "care-c1-desc": "发送简历至 <a href=\"mailto:talent@18dcoffee.com\" class=\"highlight-link\">talent@18dcoffee.com</a>。邮件中可附上一段关于您个人冲煮日常或风味自述的短视频，让我们更立体地认识您。",
        "care-c2-title": "店内“一杯直面”",
        "care-c2-desc": "每周二下午 14:00 - 17:00，您可以直接携带您的常用咖啡杯来到三亚海棠湾门店。我们会请您喝一杯火山豆手冲，在海风中面对面边喝边聊。",
        "care-c3-title": "「低碳同行」绿色推荐",
        "care-c3-desc": "如果你有同频的朋友热爱咖啡与人情，欢迎推荐。推荐成功入职并满三个月，推荐人与被推荐人都将获得 18°D 「海风产地溯源探索之旅」积分大礼包。",
        
        // Affiliates
        "aff-badge": "Branches & Affiliates",
        "aff-title": "分店选址 · <span class=\"italic\">旗下风物食肆</span>",
        "aff-desc": "从海岸日落到火山地质公园，从咖啡香气到创意中餐美学，我们致力于将地缘风土地貌与温暖人情融入每一次旅人餐桌体验中。",
        "aff-branch-title": "18°D 全球分店选址",
        "aff-sister-title": "旗下创意中餐",
        
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
        "foot-copy": "&copy; 2026 18°D 咖啡集团 18°Degree Coffee Group | 极简海岸咖啡店设计演示官网",
        
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
        "ticket-close-btn": "我知道了，锁定预约"
    },
    en: {
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
        "story-body2": "Returning to Sanya, we founded 18°D. We created coastal extraction standards: sourcing exclusively from volcanic Single Origin beans and organic coconut milk from Wenchang. To foster harmony, we built concrete ramps and introduced a silent gesture ordering system. This is where coffee meets community care.",
        
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
        "care-badge": "Join the Lab",
        "care-title": "Join Us · <span class=\"italic\">Seeking Kindred Spirits</span>",
        "care-desc": "We look for partners who respect local terroir and love community. This is not just a job, but a warm journey of flavor.",
        "care-recruit-title": "Application Channels",
        "care-c1-title": "Official Email",
        "care-c1-desc": "Send your CV to <a href=\"mailto:talent@18dcoffee.com\" class=\"highlight-link\">talent@18dcoffee.com</a>. A short video of your brewing routine or flavor thoughts is highly welcomed.",
        "care-c2-title": "In-Store \"Coffee & Chat\"",
        "care-c2-desc": "Every Tuesday 14:00-17:00, bring your favorite cup to Sanya. We will invite you for a volcanic pour-over and chat in the sea breeze.",
        "care-c3-title": "\"Eco-Together\" Referrals",
        "care-c3-desc": "Refer friends who love coffee and care. If hired for 3 months, both you and the candidate win a Sanya Origin Trip points package.",
        
        // Affiliates
        "aff-badge": "Branches & Affiliates",
        "aff-title": "Locations · <span class=\"italic\">Sister Eateries</span>",
        "aff-desc": "From sunset coast to volcanic parks, coffee aroma to creative dining, we blend terroir and warm care into every traveler's table.",
        "aff-branch-title": "18°D Global Locations",
        "aff-sister-title": "Creative Chinese Dining",
        
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
        "foot-copy": "&copy; 2026 18°D Coffee Group | Minimalist Coastal Cafe Design Demo Website",
        
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
        "ticket-close-btn": "Understood, Secure Seating"
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
    
    // Environmental fluctuations caching state
    let cachedTemp = "30.8";
    let cachedWindSpeed = "4.2";
    let cachedWindDir = "SSW";

    function updateWeatherTelemetry() {
        if (!tempField || !windField || !beanField) return;
        
        const labelTemp = currentLang === "en" ? "Temp" : "当日温度";
        const labelBeans = currentLang === "en" ? "Beans" : "本季豆选";
        const labelWind = currentLang === "en" ? "Wind" : "海风流向";
        
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
    }

    // Telemetry updates interval
    setInterval(() => {
        const baseTemp = 30.5;
        const variance = (Math.random() * 2 - 1).toFixed(1);
        cachedTemp = (parseFloat(baseTemp) + parseFloat(variance)).toFixed(1);
        
        cachedWindSpeed = (3.8 + Math.random() * 1.2).toFixed(1);
        
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
});
