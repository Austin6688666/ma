// ==========================================================================
// YAMEI Hotel - Application JavaScript
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initDates();
    setupNavbarScroll();
    setupMobileMenu();
    setupScrollReveal();
    setupAccordion();
    setupBookingFlow();
    checkUrlVerification();
});

// --- Initialize Default Dates ---
function initDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatCheckDate = (d) => {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const inDateStr = formatCheckDate(today);
    const outDateStr = formatCheckDate(tomorrow);

    // Set values on Home Floating Panel
    document.getElementById("book-checkin").value = inDateStr;
    document.getElementById("book-checkout").value = outDateStr;
    document.getElementById("book-checkin").min = inDateStr;
    document.getElementById("book-checkout").min = outDateStr;

    // Set values on Modal Form
    document.getElementById("book-in-date").value = inDateStr;
    document.getElementById("book-out-date").value = outDateStr;
    document.getElementById("book-in-date").min = inDateStr;
    document.getElementById("book-out-date").min = outDateStr;
}

// --- Navigation Bar transparency scroll effect ---
function setupNavbarScroll() {
    const nav = document.getElementById("main-nav");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            nav.classList.add("scrolled");
            nav.classList.remove("transparent");
        } else {
            nav.classList.remove("scrolled");
            nav.classList.add("transparent");
        }
    });
}

// --- Mobile Drawer Toggle ---
function setupMobileMenu() {
    const btnOpen = document.getElementById("mobile-menu-btn");
    const btnClose = document.getElementById("mobile-close-btn");
    const drawer = document.getElementById("mobile-drawer");
    const drawerLinks = document.querySelectorAll(".drawer-link-item, .drawer-book-btn");

    const openDrawer = () => {
        drawer.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    };

    const closeDrawer = () => {
        drawer.classList.add("hidden");
        document.body.style.overflow = "";
    };

    btnOpen.addEventListener("click", openDrawer);
    btnClose.addEventListener("click", closeDrawer);
    drawerLinks.forEach(link => link.addEventListener("click", closeDrawer));
}

// --- Scroll Reveal and Eco Number Counter Animations ---
function setupScrollReveal() {
    const elementsToReveal = document.querySelectorAll(".scroll-reveal");
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                
                // If it is the eco section, fire the counter increments
                if (entry.target.id === "eco-section") {
                    triggerCounters();
                }
                
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(el => observer.observe(el));
}

let countersFired = false;
function triggerCounters() {
    if (countersFired) return;
    countersFired = true;

    const counters = document.querySelectorAll(".stat-num");
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"), 10);
        let start = 0;
        const duration = 1500; // 1.5s duration
        const stepTime = 15; // 15ms per frame
        const steps = duration / stepTime;
        const increment = target / steps;
        
        const updateCount = () => {
            start += increment;
            if (start < target) {
                counter.innerText = Math.floor(start).toLocaleString();
                setTimeout(updateCount, stepTime);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };

        updateCount();
    });
}

// --- Lifestyle Spaces Accordion & Dynamic Image Swapper ---
function setupAccordion() {
    const items = document.querySelectorAll(".space-accordion .accordion-item");
    const imgEl = document.getElementById("spaces-dynamic-img");

    items.forEach(item => {
        item.addEventListener("click", () => {
            if (item.classList.contains("active")) return;

            // Deactivate others
            items.forEach(i => i.classList.remove("active"));
            
            // Activate current
            item.classList.add("active");

            // Dynamic Image Swap with fade out/in transition
            const targetImgSrc = item.getAttribute("data-img");
            
            imgEl.style.opacity = "0.3";
            imgEl.style.transform = "scale(0.98)";
            
            setTimeout(() => {
                imgEl.src = targetImgSrc;
                imgEl.style.opacity = "1";
                imgEl.style.transform = "scale(1)";
            }, 300);
        });
    });
}

// --- Booking Flow State & Logics ---
let bookingState = {
    selectedRoomName: "竹影静音大床房",
    selectedRoomPrice: 480,
    checkInDate: "",
    checkOutDate: "",
    daysCount: 1,
    ecoPoints: 230
};

function setupBookingFlow() {
    // 1. Sync checkin/checkout between panels
    const homeCheckIn = document.getElementById("book-checkin");
    const homeCheckOut = document.getElementById("book-checkout");
    const modalCheckIn = document.getElementById("book-in-date");
    const modalCheckOut = document.getElementById("book-out-date");

    const handleCheckInChange = (e) => {
        const val = e.target.value;
        homeCheckIn.value = val;
        modalCheckIn.value = val;
        
        // Ensure checkout is after checkin
        const checkinDate = new Date(val);
        const checkoutDate = new Date(modalCheckOut.value);
        if (checkoutDate <= checkinDate) {
            const newCheckout = new Date(checkinDate);
            newCheckout.setDate(newCheckout.getDate() + 1);
            const formatted = formatDate(newCheckout);
            homeCheckOut.value = formatted;
            modalCheckOut.value = formatted;
        }
        
        modalCheckOut.min = formatDate(new Date(new Date(val).getTime() + 24 * 60 * 60 * 1000));
        calculateBookingSummary();
    };

    const handleCheckOutChange = (e) => {
        const val = e.target.value;
        homeCheckOut.value = val;
        modalCheckOut.value = val;
        calculateBookingSummary();
    };

    homeCheckIn.addEventListener("change", handleCheckInChange);
    modalCheckIn.addEventListener("change", handleCheckInChange);
    homeCheckOut.addEventListener("change", handleCheckOutChange);
    modalCheckOut.addEventListener("change", handleCheckOutChange);

    // 2. Room selection booking buttons
    const triggerButtons = document.querySelectorAll(".room-book-btn-trigger");
    triggerButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const roomName = btn.getAttribute("data-room");
            const price = parseInt(btn.getAttribute("data-price"), 10);
            
            bookingState.selectedRoomName = roomName;
            bookingState.selectedRoomPrice = price;

            // Sync Modal Header
            document.getElementById("modal-room-name").innerText = roomName;
            document.getElementById("modal-room-price").innerText = price;

            calculateBookingSummary();
            openModal("booking-modal");
        });
    });

    // 3. Search button in Hero Panel - Scroll & Highlight Room Card
    document.getElementById("hero-book-search-btn").addEventListener("click", () => {
        const roomSelect = document.getElementById("book-room-type");
        const selectedRoomId = roomSelect.value;
        const selectedRoomText = roomSelect.options[roomSelect.selectedIndex].text.split(" (")[0];

        // Scroll to the selected room card smoothly
        const roomCard = document.getElementById(selectedRoomId);
        if (roomCard) {
            roomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remove highlight from all cards first
            document.querySelectorAll(".room-card").forEach(card => card.classList.remove("highlight-card"));
            
            // Add highlight class to trigger animation after a short delay
            setTimeout(() => {
                roomCard.classList.add("highlight-card");
            }, 600); // delay to wait for scrolling to complete
            
            showToast(`已为您筛选出【${selectedRoomText}】，请点击立即预约！`, "success");
        } else {
            document.getElementById("rooms-section").scrollIntoView({ behavior: 'smooth' });
            showToast("已为您筛选可用房型，请选择入住！", "success");
        }
    });

    // 4. Eco choices checkboxes change recalculation
    const ecoCheckboxes = document.querySelectorAll(".eco-checkboxes input[type='checkbox']");
    ecoCheckboxes.forEach(cb => cb.addEventListener("change", calculateBookingSummary));

    // Listen to guest phone input to apply membership discount dynamically
    const phoneInput = document.getElementById("book-guest-phone");
    if (phoneInput) {
        phoneInput.addEventListener("input", calculateBookingSummary);
    }

    // 5. Booking Form Submission (Generating confirmation voucher & carbon ledger)
    const form = document.getElementById("booking-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const guestName = document.getElementById("book-guest-name").value.trim();
        const guestPhone = document.getElementById("book-guest-phone").value.trim();
        const gender = document.getElementById("book-guest-gender").value;
        const pillow = document.getElementById("book-pillow-type").value;
        const pet = document.getElementById("book-pet-stay").value;

        // Generate voucher ticket data
        const orderId = "YM" + String(Date.now()).substring(2, 12) + String(Math.floor(Math.random() * 90 + 10));
        
        // Bind DOM elements on Voucher Card
        document.getElementById("voucher-order-id").innerText = orderId;
        document.getElementById("voucher-name").innerText = `${guestName} ${gender}`;
        
        // Mask Phone Number
        const maskedPhone = guestPhone.substring(0, 3) + "****" + guestPhone.substring(7);
        document.getElementById("voucher-phone").innerText = maskedPhone;
        document.getElementById("voucher-room").innerText = bookingState.selectedRoomName;
        document.getElementById("voucher-checkin").innerText = modalCheckIn.value;
        document.getElementById("voucher-checkout").innerText = modalCheckOut.value;
        document.getElementById("voucher-points").innerText = bookingState.ecoPoints;

        // Update Carbon Ledger values
        const ledgerStats = calculateCarbonLedgerValues();
        document.getElementById("ledger-carbon").innerText = ledgerStats.carbon + " kg";
        document.getElementById("ledger-water").innerText = ledgerStats.water + " L";
        document.getElementById("ledger-plastic").innerText = ledgerStats.plastic + " 个";

        // Generate real QR code offline
        const qrBox = document.querySelector(".ticket-qr-section .mock-qr-code");
        if (qrBox) {
            qrBox.innerHTML = "";
            qrBox.classList.add("real-qr");
            const verifyUrl = `https://austin6688666.github.io/ma/hotel.html?verify=hotel&id=${orderId}&name=${encodeURIComponent(guestName)}&room=${encodeURIComponent(bookingState.selectedRoomName)}&checkin=${modalCheckIn.value}&checkout=${modalCheckOut.value}`;
            new QRCode(qrBox, {
                text: verifyUrl,
                width: 90,
                height: 90,
                colorDark: "#1c1a17",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.M
            });
        }

        closeModal("booking-modal");
        openModal("voucher-modal");
        
        // Auto-close success voucher modal after 6 seconds
        const autoCloseTimer = setTimeout(() => {
            closeModal("voucher-modal");
        }, 6000);
        
        // Clear auto-close timer if manually closed
        const originalClose = document.querySelectorAll(".modal-close");
        originalClose.forEach(btn => {
            btn.addEventListener("click", () => clearTimeout(autoCloseTimer));
        });
        
        // Custom interactive feedback toasts reflecting humanistic care
        setTimeout(() => {
            showToast("预订成功！已生成您的低碳出行凭证", "success");
            if (pillow !== "默认原装防螨枕") {
                showToast(`已通知前台为您准备【${pillow}】。`, "info");
            }
            if (pet === "yes") {
                showToast("已为您的爱宠备妥客房宠物食盆与免费椰肉犬用零食！", "info");
            }
        }, 500);
    });

    // 6. Bind Modal overlays and closes
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

function calculateCarbonLedgerValues() {
    const checkinVal = document.getElementById("book-in-date").value;
    const checkoutVal = document.getElementById("book-out-date").value;
    
    let days = 1;
    if (checkinVal && checkoutVal) {
        const d1 = new Date(checkinVal);
        const d2 = new Date(checkoutVal);
        const timeDiff = d2.getTime() - d1.getTime();
        days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (days <= 0) days = 1;
    }

    let carbon = 0.5; // Base carbon footprint reduction per booking in kg
    let water = 20;   // Base water saved in Liters
    let plastic = 0;  // Base single-use plastic cups saved

    if (document.getElementById("eco-opt-toiletries").checked) {
        carbon += 1.2 * days;
        plastic += 2 * days;
    }
    if (document.getElementById("eco-opt-linen").checked) {
        carbon += 0.8 * days;
        water += 50 * days;
    }
    if (document.getElementById("eco-opt-transit").checked) {
        carbon += 1.5;
    }

    return {
        carbon: carbon.toFixed(1),
        water: water,
        plastic: plastic
    };
}

function calculateBookingSummary() {
    const checkinVal = document.getElementById("book-in-date").value;
    const checkoutVal = document.getElementById("book-out-date").value;
    
    if (!checkinVal || !checkoutVal) return;

    const d1 = new Date(checkinVal);
    const d2 = new Date(checkoutVal);

    // Calculate days count
    const timeDiff = d2.getTime() - d1.getTime();
    let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (days <= 0) days = 1;

    bookingState.daysCount = days;

    // Calculate Eco Points
    let points = 50; // Base green booking points
    if (document.getElementById("eco-opt-toiletries").checked) points += 50;
    if (document.getElementById("eco-opt-linen").checked) points += 80;
    if (document.getElementById("eco-opt-transit").checked) points += 100;
    
    bookingState.ecoPoints = points;

    // Calculate Member Discount based on guest phone last digit
    const phoneInput = document.getElementById("book-guest-phone");
    let discount = 1.0;
    let discountLabel = "";
    if (phoneInput && phoneInput.value.length === 11) {
        const phone = phoneInput.value;
        const lastDigit = parseInt(phone.slice(-1), 10);
        if (lastDigit % 3 === 0) {
            discount = 0.85;
            discountLabel = " (已享森栖会员85折)";
        } else if (lastDigit % 2 === 0) {
            discount = 0.9;
            discountLabel = " (已享竹友会员90折)";
        } else {
            discount = 0.95;
            discountLabel = " (已享木邻会员95折)";
        }
    }

    // Calculate Total Price
    const basePrice = days * bookingState.selectedRoomPrice;
    const totalPrice = Math.round(basePrice * discount);

    // Update Summary in Booking Modal
    document.getElementById("summary-days").innerText = days;
    document.getElementById("summary-points").innerText = points;
    document.getElementById("summary-total-price").innerText = totalPrice.toLocaleString() + discountLabel;
}

// --- Date Formatter Helper ---
function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// --- Modal Helper Functions ---
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

// --- Toast System ---
function showToast(message, type = 'info') {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = '<i class="fa-solid fa-circle-check"></i>';
    if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation"></i>';
    if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("fade-out");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 3000);
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

    if (verifyType === "hotel") {
        titleText = "亚美旅宿房单验证成功";
        subtitleText = "YAMEI HOTEL BOOKING VERIFIED";
        const id = params.get("id") || "N/A";
        const name = params.get("name") || "N/A";
        const room = params.get("room") || "N/A";
        const checkin = params.get("checkin") || "N/A";
        const checkout = params.get("checkout") || "N/A";
        htmlContent = `
            <div><strong>酒店订单号:</strong> <span style="font-family:monospace">${id}</span></div>
            <div><strong>住客姓名:</strong> <span style="font-weight:700">${name}</span></div>
            <div><strong>预订房型:</strong> <span>${room}</span></div>
            <div><strong>入住日期:</strong> <span>${checkin}</span></div>
            <div><strong>退房日期:</strong> <span>${checkout}</span></div>
            <div style="border-top:1px dashed #d4c5b3; margin-top:10px; padding-top:10px; color:#3C5C43; font-weight:bold; text-align:center">
                🌴 绿意邻里，欢迎您回家！
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
