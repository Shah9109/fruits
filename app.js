// FreshPick Client Application Controller (Fully Functional SPA)

// 1. Initial Mock Database (Default Fruits and Users)
const DEFAULT_PRODUCTS = [
    {
        id: "prod-001",
        name: "Valencia Oranges",
        category: "Citrus",
        decayModel: "linear",
        priceBase: 120.00,
        stock: 150,
        harvestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        shelfLife: 7, // days
        decayCoefficient: 0.25,
        image: "assets/orange.png",
        rating: 4.6,
        ratingCount: 18,
        origin: "Golden Valley Farms, Rupnagar",
        brix: "12.2%",
        temp: "4.2"
    },
    {
        id: "prod-002",
        name: "Fresh Blueberries",
        category: "Berries",
        decayModel: "exponential",
        priceBase: 280.00,
        stock: 45,
        harvestDate: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
        shelfLife: 4,
        decayCoefficient: 0.60,
        image: "assets/blueberry.png",
        rating: 4.9,
        ratingCount: 32,
        origin: "Shiwalik Berry Orchards, Pinjore",
        brix: "14.5%",
        temp: "3.8"
    },
    {
        id: "prod-003",
        name: "Organic Mangoes",
        category: "Tropical",
        decayModel: "stepwise",
        priceBase: 200.00,
        stock: 80,
        harvestDate: new Date(Date.now() - 3.2 * 24 * 60 * 60 * 1000).toISOString(), // 3.2 days ago
        shelfLife: 6,
        decayCoefficient: 0.35,
        image: "assets/mango.png",
        rating: 4.8,
        ratingCount: 45,
        origin: "Hoshiarpur Agri-Farms, Punjab",
        brix: "16.8%",
        temp: "5.0"
    },
    {
        id: "prod-004",
        name: "Sweet Strawberries",
        category: "Berries",
        decayModel: "exponential",
        priceBase: 180.00,
        stock: 60,
        harvestDate: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        shelfLife: 3,
        decayCoefficient: 0.80,
        image: "assets/strawberry.png",
        rating: 4.7,
        ratingCount: 20,
        origin: "Solan Cold-Chain Cooperative, HP",
        brix: "11.8%",
        temp: "3.5"
    },
    {
        id: "prod-005",
        name: "Fresh Grapefruit",
        category: "Citrus",
        decayModel: "linear",
        priceBase: 150.00,
        stock: 120,
        harvestDate: new Date(Date.now() - 5.5 * 24 * 60 * 60 * 1000).toISOString(), // 5.5 days ago
        shelfLife: 10,
        decayCoefficient: 0.15,
        image: "assets/grapefruit.png",
        rating: 4.3,
        ratingCount: 14,
        origin: "Golden Valley Farms, Rupnagar",
        brix: "10.5%",
        temp: "4.5"
    },
    {
        id: "prod-006",
        name: "Red Seedless Grapes",
        category: "Berries",
        decayModel: "exponential",
        priceBase: 160.00,
        stock: 0, // Out of stock simulation
        harvestDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        shelfLife: 5,
        decayCoefficient: 0.50,
        image: "assets/grape.png",
        rating: 4.5,
        ratingCount: 22,
        origin: "Sangrur Vineyards, Punjab",
        brix: "15.2%",
        temp: "4.0"
    }
];

const MOCK_REVIEWS_DB = {
    "prod-001": [
        { author: "Raman Kumar", rating: 5, comment: "Incredibly sweet oranges! The brix sweetness is exactly as advertised, very refreshing." },
        { author: "Shreya Sharma", rating: 4, comment: "Good citrus flavor. The linear decay pricing discount made it a great deal." },
        { author: "Gurpreet Singh", rating: 5, comment: "Direct sourcing trace map shows it came from Rupnagar, which is near my hometown. Quality is top-notch." }
    ],
    "prod-002": [
        { author: "Aditya Verma", rating: 5, comment: "Best blueberries I've had. Plump and very sweet. Worth the price!" },
        { author: "Pooja Malhotra", rating: 5, comment: "Extremely fresh! The brix levels were spot on." }
    ],
    "prod-003": [
        { author: "Satnam Singh", rating: 5, comment: "Alphonso quality mangoes! Very sweet, rich aroma. Will order again next week." },
        { author: "Neha Gupta", rating: 4, comment: "Delicious but shelf life is a bit short. Eat them quickly!" }
    ],
    "prod-004": [
        { author: "Divya Kapoor", rating: 5, comment: "Freshly picked strawberries, kids loved them. Price was very fair due to exponential decay model." }
    ],
    "prod-005": [
        { author: "Vikram Sen", rating: 4, comment: "Tangy grapefruit. Very large sizes, great for breakfast juice." }
    ],
    "prod-006": [
        { author: "Manpreet Kaur", rating: 5, comment: "Seedless grapes are superb. Crispy and sweet." }
    ]
};

const DEFAULT_USERS = [
    { email: "admin@freshpick.com", password: "Password123", name: "Dr. Navpreet Kaur", role: "admin" },
    { email: "consumer@freshpick.com", password: "Password123", name: "Sanjay Shah", role: "customer" },
    { email: "farmer@freshpick.com", password: "Password123", name: "Baldev Singh", role: "supplier" }
];

// Helper functions for localStorage DB
function dbGet(key, fallback) {
    const data = localStorage.getItem(`freshpick_${key}`);
    return data ? JSON.parse(data) : fallback;
}

function dbSet(key, value) {
    localStorage.setItem(`freshpick_${key}`, JSON.stringify(value));
}

// Bootstrapping local storage databases with migrations
let storedProducts = dbGet("products", []);
const needsMigration = storedProducts.length === 0 || !storedProducts.every(p => p.hasOwnProperty("origin"));
if (needsMigration) {
    dbSet("products", DEFAULT_PRODUCTS);
}
if (!localStorage.getItem("freshpick_users")) dbSet("users", DEFAULT_USERS);
if (!localStorage.getItem("freshpick_cart")) dbSet("cart", []);
if (!localStorage.getItem("freshpick_orders")) dbSet("orders", []);

// State Managers
let currentUser = dbGet("currentUser", null);
let cart = dbGet("cart", []);
let activeCategory = "all";
let searchQuery = "";
let appliedCoupon = null;
let selectedDetailsProduct = null;

// Coupon codes mapping
const MOCK_COUPONS = {
    "FRESH20": 0.20,
    "AGRITECH10": 0.10
};

// SVG Fallback Icons library
const FRUIT_SVGS = {
    Citrus: `<svg class="card-fruit-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" fill="hsl(38, 92%, 50%)" fill-opacity="0.2"/><circle cx="12" cy="12" r="6" stroke-dasharray="3 3"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`,
    Berries: `<svg class="card-fruit-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c-.6 0-1.1.4-1.3 1-.7.2-1.3.7-1.5 1.4-.4.1-.8.4-1 .8-.6-.2-1.3.1-1.6.7-.4-.1-.8.2-1 .6-.6-.2-1.3 0-1.6.6C4 7 4 7.2 4.1 7.3c-.6.2-1 .7-1.1 1.3C3 9 3 9.3 3.1 9.5c-.6.3-.9.9-.9 1.5.1.5.3 1 .7 1.2-.4.4-.6 1-.5 1.6.2.6.6 1.1 1.2 1.3-.2.5-.2 1.1.1 1.6.3.5.9.8 1.5.8h13.6c.6 0 1.2-.3 1.5-.8.3-.5.3-1.1.1-1.6.6-.2 1-.7 1.2-1.3.1-.6-.1-1.2-.5-1.6.4-.2.6-.7.7-1.2 0-.6-.3-1.2-.9-1.5.1-.2.1-.5.1-.7 0-.6-.4-1.1-1.1-1.3.1-.1.1-.3.1-.5-.3-.6-1-.8-1.6-.6-.2-.4-.6-.7-1-.8-.2-.6-.9-.9-1.6-.7-.2-.4-.6-.7-1-.8-.2-.6-.7-1-1.3-1z" fill="hsl(350, 80%, 55%)" fill-opacity="0.2"/></svg>`,
    StoneFruits: `<svg class="card-fruit-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="hsl(24, 95%, 58%)" fill-opacity="0.2"/><path d="M12 6a6 6 0 0 0-6 6c0 4 6 6 6 6s6-2 6-6a6 6 0 0 0-6-6z"/></svg>`,
    Tropical: `<svg class="card-fruit-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" fill="none"/><path d="M10 2c2 3 0 7 2 9s7 2 7 2" fill="hsl(38, 92%, 50%)" fill-opacity="0.2"/></svg>`,
    Melons: `<svg class="card-fruit-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="hsl(150, 76%, 38%)" fill-opacity="0.2"/><path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6"/></svg>`
};

function getFruitIcon(category) {
    const key = category.replace(/\s+/g, '');
    return FRUIT_SVGS[key] || FRUIT_SVGS['Tropical'];
}

// ==========================================
// 2. DYNAMIC TOAST ALERT NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast glass`;
    toast.innerHTML = `
        <span class="toast-success-icon">✓</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto fade out after 2.8s, remove after 3.1s
    setTimeout(() => {
        toast.classList.add("fade-out");
    }, 2800);

    setTimeout(() => {
        toast.remove();
    }, 3100);
}

// ==========================================
// 3. DYNAMIC PRICING DECAY ALGORITHMIC ENGINE
// ==========================================
function evaluateDecayedPrice(product) {
    const harvestTime = new Date(product.harvestDate).getTime();
    const ageInDays = Math.max(0, (Date.now() - harvestTime) / (1000 * 60 * 60 * 24));
    const shelfLife = product.shelfLife;
    const base = product.priceBase;
    const coeff = product.decayCoefficient || 0.05;

    // Minimum liquid clearance pricing floor (15% of base value)
    const minPrice = base * 0.15;
    
    // Spoilage limit check: if product exceeds estimated shelf life, drop to floor clearance rate (10%)
    if (ageInDays >= shelfLife) {
        return {
            livePrice: Math.round((base * 0.10) * 100) / 100,
            discount: 90,
            ageDays: ageInDays.toFixed(1),
            status: "clearance"
        };
    }

    let calculated = base;
    
    if (product.decayModel === "linear") {
        // Model A: Linear Spoilage Decay
        const decayFactor = coeff * (ageInDays / shelfLife);
        calculated = base * (1 - decayFactor);
    } else if (product.decayModel === "exponential") {
        // Model B: Exponential Spoilage Decay
        calculated = base * Math.exp(-coeff * (ageInDays / shelfLife));
    } else if (product.decayModel === "stepwise") {
        // Model C: Stepwise Markdown Decay
        const ratio = ageInDays / shelfLife;
        if (ratio >= 0.75) {
            calculated = base * 0.50; // 50% discount
        } else if (ratio >= 0.50) {
            calculated = base * 0.70; // 30% discount
        } else if (ratio >= 0.25) {
            calculated = base * 0.85; // 15% discount
        } else {
            calculated = base;
        }
    }

    const livePrice = Math.max(calculated, minPrice);
    const discount = Math.round(((base - livePrice) / base) * 100);
    
    // Freshness status categorization
    const lifeRatio = ageInDays / shelfLife;
    let status = "fresh"; // Green
    if (lifeRatio >= 0.66) {
        status = "clearance"; // Red
    } else if (lifeRatio >= 0.33) {
        status = "standard"; // Orange
    }

    return {
        livePrice: Math.round(livePrice * 100) / 100,
        discount: discount,
        ageDays: ageInDays.toFixed(1),
        status: status
    };
}

// ==========================================
// 4. SPA ROUTING ENGINE
// ==========================================
function routeApp() {
    const hash = window.location.hash || "#catalog";
    
    // Hide all views
    document.querySelectorAll(".app-view").forEach(view => {
        view.style.display = "none";
    });
    
    // Remove active class from nav links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    if (hash === "#catalog") {
        document.getElementById("view-catalog").style.display = "block";
        document.getElementById("link-catalog").classList.add("active");
        renderCatalog();
    } else if (hash === "#auth") {
        document.getElementById("view-auth").style.display = "block";
        document.getElementById("link-auth").classList.add("active");
    } else if (hash === "#admin" && currentUser && currentUser.role === "admin") {
        document.getElementById("view-admin").style.display = "block";
        document.getElementById("link-admin").classList.add("active");
        renderAdminDashboard();
    } else if (hash === "#supplier" && currentUser && currentUser.role === "supplier") {
        document.getElementById("view-supplier").style.display = "block";
        document.getElementById("link-supplier").classList.add("active");
        renderSupplierDashboard();
    } else {
        // Fallback redirection
        window.location.hash = "#catalog";
    }
}

// ==========================================
// 5. USER AUTHENTICATION HANDLERS
// ==========================================
function initAuth() {
    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");
    
    tabLogin.addEventListener("click", () => {
        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");
        formLogin.style.display = "block";
        formRegister.style.display = "none";
    });

    tabRegister.addEventListener("click", () => {
        tabRegister.classList.add("active");
        tabLogin.classList.remove("active");
        formRegister.style.display = "block";
        formLogin.style.display = "none";
    });

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const pass = document.getElementById("login-password").value;
        const errorDiv = document.getElementById("login-error");
        
        const users = dbGet("users", []);
        const matched = users.find(u => u.email === email && u.password === pass);
        
        if (matched) {
            currentUser = matched;
            dbSet("currentUser", currentUser);
            updateNavUI();
            formLogin.reset();
            showToast(`Welcome back, ${matched.name}!`);
            window.location.hash = "#catalog";
        } else {
            errorDiv.textContent = "Invalid email credentials or password match.";
            errorDiv.style.display = "block";
        }
    });

    formRegister.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const pass = document.getElementById("reg-password").value;
        const role = document.getElementById("reg-role").value;
        const errorDiv = document.getElementById("reg-error");
        
        if (pass.length < 6) {
            errorDiv.textContent = "Password must be at least 6 characters long.";
            errorDiv.style.display = "block";
            return;
        }

        const users = dbGet("users", []);
        if (users.some(u => u.email === email)) {
            errorDiv.textContent = "This email is already registered.";
            errorDiv.style.display = "block";
            return;
        }

        const newUser = { name, email, password: pass, role };
        users.push(newUser);
        dbSet("users", users);
        
        currentUser = newUser;
        dbSet("currentUser", currentUser);
        updateNavUI();
        formRegister.reset();
        showToast("Account successfully registered!");
        window.location.hash = "#catalog";
    });

    document.getElementById("btn-logout").addEventListener("click", () => {
        currentUser = null;
        localStorage.removeItem("freshpick_currentUser");
        appliedCoupon = null;
        updateNavUI();
        showToast("Logged out successfully.");
        window.location.hash = "#catalog";
    });
}

function updateNavUI() {
    const linkAdmin = document.getElementById("link-admin");
    const linkSupplier = document.getElementById("link-supplier");
    const linkAuth = document.getElementById("link-auth");
    const btnLogout = document.getElementById("btn-logout");
    const userBadge = document.getElementById("user-badge");
    const btnOrders = document.getElementById("btn-orders");

    if (currentUser) {
        linkAuth.style.display = "none";
        btnLogout.style.display = "inline-block";
        
        let roleName = "Customer";
        if (currentUser.role === "admin") roleName = "Admin";
        else if (currentUser.role === "supplier") roleName = "Farmer";

        userBadge.textContent = roleName;
        userBadge.style.display = "inline-block";
        btnOrders.style.display = "inline-block";
        
        if (currentUser.role === "admin") {
            linkAdmin.style.display = "inline-block";
            linkSupplier.style.display = "none";
        } else if (currentUser.role === "supplier") {
            linkAdmin.style.display = "none";
            linkSupplier.style.display = "inline-block";
        } else {
            linkAdmin.style.display = "none";
            linkSupplier.style.display = "none";
        }
    } else {
        linkAuth.style.display = "inline-block";
        btnLogout.style.display = "none";
        userBadge.style.display = "none";
        linkAdmin.style.display = "none";
        linkSupplier.style.display = "none";
        btnOrders.style.display = "none";
    }
}

// ==========================================
// 6. CUSTOMER CATALOG & CART ENGINE
// ==========================================
function renderCatalog() {
    const grid = document.getElementById("catalog-grid");
    const products = dbGet("products", []);
    
    let filtered = products.filter(p => {
        const matchesCategory = activeCategory === "all" || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    grid.innerHTML = "";
    
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="auth-card text-center" style="grid-column: 1/-1; max-width:100%;"><p>No harvest inventory matches your search criteria.</p></div>`;
        return;
    }

    filtered.forEach(p => {
        const pricing = evaluateDecayedPrice(p);
        
        let badgeClass = "badge-fresh";
        let badgeText = "Freshly Harvested";
        if (pricing.status === "clearance") {
            badgeClass = "badge-clearance";
            badgeText = "Clearance Savings";
        } else if (pricing.status === "standard") {
            badgeClass = "badge-standard";
            badgeText = "Standard Shelf";
        }

        const isOutOfStock = p.stock <= 0;

        const card = document.createElement("div");
        card.className = "product-card glass";
        
        // Attach card click logic (excluding internal action nodes)
        card.addEventListener("click", (e) => {
            if (e.target.closest('button') || e.target.closest('.star')) return;
            openProductDetails(p);
        });

        // Image render logic (AI Generated file check or SVG fallback)
        let imageHTML = "";
        if (p.image) {
            imageHTML = `<img src="${p.image}" class="card-product-img" alt="${p.name}">`;
        } else {
            imageHTML = getFruitIcon(p.category);
        }

        // Star rating HTML generation
        const ratingVal = p.rating || 5.0;
        const ratingCountVal = p.ratingCount || 1;
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.round(ratingVal)) {
                starsHTML += `<span class="star" onclick="window.appRateProduct('${p.id}', ${i})">★</span>`;
            } else {
                starsHTML += `<span class="star" style="color:var(--border-subtle);" onclick="window.appRateProduct('${p.id}', ${i})">★</span>`;
            }
        }

        card.innerHTML = `
            <div class="card-header-img">
                ${imageHTML}
                <div class="card-badges">
                    <span class="badge ${badgeClass}">${badgeText}</span>
                    <span class="badge" style="background: rgba(0,0,0,0.4); color: white;">Age: ${pricing.ageDays}d</span>
                </div>
                ${pricing.discount > 0 ? `<div class="card-discount-tag">${pricing.discount}% OFF</div>` : ''}
            </div>
            <div class="card-body">
                <h3>${p.name}</h3>
                
                <!-- Dynamic Review Ratings -->
                <div class="star-rating">
                    ${starsHTML}
                    <span class="star-value">${ratingVal.toFixed(1)} (${ratingCountVal} reviews)</span>
                </div>

                <div class="card-meta">
                    <span>Model: ${p.decayModel.toUpperCase()}</span>
                    <span>Intake: ${p.stock} kg</span>
                </div>
                <div class="card-price-row">
                    ${pricing.discount > 0 ? `<span class="price-base-crossed">₹${p.priceBase.toFixed(2)}</span>` : ''}
                    <span class="price-live">₹${pricing.livePrice.toFixed(2)}</span>
                    <span class="price-unit">/ kg</span>
                </div>
                <div class="card-actions">
                    <span class="stock-status ${isOutOfStock ? 'stock-out' : 'stock-ok'}">
                        ${isOutOfStock ? 'Out of Stock' : `${p.stock} kg left`}
                    </span>
                    <button class="btn btn-primary" ${isOutOfStock ? 'disabled' : ''} onclick="window.appAddToCart('${p.id}')">
                        ${isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Render Ratings Breakdown Horizontal Bar Chart
function renderRatingsBreakdown(product) {
    const container = document.getElementById("det-ratings-breakdown");
    if (!container) return;

    const rating = product.rating || 5.0;
    const count = product.ratingCount || 1;
    
    // Seed distributions based on average rating
    let dist = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
    if (rating >= 4.7) {
        dist = [Math.round(count * 0.82), Math.round(count * 0.14), Math.round(count * 0.04), 0, 0];
    } else if (rating >= 4.4) {
        dist = [Math.round(count * 0.62), Math.round(count * 0.28), Math.round(count * 0.08), Math.round(count * 0.02), 0];
    } else if (rating >= 4.0) {
        dist = [Math.round(count * 0.45), Math.round(count * 0.35), Math.round(count * 0.15), Math.round(count * 0.05), 0];
    } else {
        dist = [Math.round(count * 0.25), Math.round(count * 0.25), Math.round(count * 0.30), Math.round(count * 0.15), Math.round(count * 0.05)];
    }

    // Adjust to make sum equal to count
    const sum = dist.reduce((a, b) => a + b, 0);
    if (sum !== count) {
        dist[0] += (count - sum);
        if (dist[0] < 0) dist[0] = 0;
    }

    container.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        const starsNum = 5 - i;
        const val = dist[i] || 0;
        const pct = count > 0 ? (val / count) * 100 : 0;
        
        const row = document.createElement("div");
        row.className = "rating-bar-row";
        row.innerHTML = `
            <span class="rating-bar-label">${starsNum} ★</span>
            <div class="rating-bar-outer">
                <div class="rating-bar-inner" style="width: 0%;"></div>
            </div>
            <span class="rating-bar-value">${val}</span>
        `;
        container.appendChild(row);
        
        // Animate the widths in the next frame
        setTimeout(() => {
            const bar = row.querySelector(".rating-bar-inner");
            if (bar) bar.style.width = `${pct}%`;
        }, 80);
    }
}

// Render Product Review Feed
function renderReviewsFeed(product) {
    const container = document.getElementById("det-reviews-list");
    if (!container) return;
    
    const reviews = MOCK_REVIEWS_DB[product.id] || [
        { author: "Rajesh Patel", rating: 5, comment: "Fabulous batch! Extremely fresh and crispy." }
    ];
    
    container.innerHTML = "";
    reviews.forEach(r => {
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
            starsHTML += i <= r.rating ? "★" : "<span style='color:var(--border-subtle);'>★</span>";
        }
        
        const item = document.createElement("div");
        item.className = "review-item";
        item.innerHTML = `
            <div class="review-header">
                <span class="review-author">${r.author}</span>
                <span class="review-stars">${starsHTML}</span>
            </div>
            <p class="review-comment">${r.comment}</p>
        `;
        container.appendChild(item);
    });
}

// Open Detailed Product Modal
function openProductDetails(product) {
    selectedDetailsProduct = product;
    
    const pricing = evaluateDecayedPrice(product);
    
    document.getElementById("det-title").textContent = product.name;
    document.getElementById("det-brix").textContent = product.brix || "12.0% Sugar";
    document.getElementById("det-temp").textContent = `${product.temp || "4.0"} °C`;
    document.getElementById("det-origin").textContent = product.origin || "Golden Valley Farms, Punjab";
    document.getElementById("det-harvest").textContent = new Date(product.harvestDate).toLocaleString();
    document.getElementById("det-engine").textContent = product.decayModel;

    // Show mathematical decay curve details based on models
    const formulaDiv = document.getElementById("det-math-formula");
    if (product.decayModel === "linear") {
        formulaDiv.innerHTML = `Price_live = Base * (1 - coeff * (Age / ShelfLife))<br><br><span style="color:var(--brand-accent);">Value: ₹${product.priceBase} * (1 - ${product.decayCoefficient} * (${pricing.ageDays} / ${product.shelfLife}))</span>`;
    } else if (product.decayModel === "exponential") {
        formulaDiv.innerHTML = `Price_live = Base * e^(-coeff * (Age / ShelfLife))<br><br><span style="color:var(--brand-accent);">Value: ₹${product.priceBase} * e^(-${product.decayCoefficient} * (${pricing.ageDays} / ${product.shelfLife}))</span>`;
    } else if (product.decayModel === "stepwise") {
        formulaDiv.innerHTML = `Price_live = Base * (1 - StepDiscountRatio)<br><br><span style="color:var(--brand-accent);">Active Tier discount applied: ${pricing.discount}% off</span>`;
    }

    const btnAdd = document.getElementById("btn-det-add-cart");
    if (product.stock <= 0) {
        btnAdd.disabled = true;
        btnAdd.textContent = "Sold Out";
    } else {
        btnAdd.disabled = false;
        btnAdd.textContent = "Add to Cart";
    }

    // Set up Dynamic Aging Projection Simulator
    const simSlider = document.getElementById("det-sim-slider");
    const simDaysVal = document.getElementById("det-sim-days-val");
    const simBrixVal = document.getElementById("det-sim-brix-val");
    const simWeightLoss = document.getElementById("det-sim-weight-loss");
    const simPrice = document.getElementById("det-sim-price");
    const simMaxLabel = document.getElementById("det-sim-max-label");
    const traceSoil = document.getElementById("det-trace-soil");
    const traceStorage = document.getElementById("det-trace-storage");
    const traceDecayDesc = document.getElementById("det-trace-decay-desc");
    
    const maxSimDays = product.shelfLife + 3;
    simSlider.max = maxSimDays.toFixed(1);
    simMaxLabel.textContent = `Limit (${product.shelfLife}d)`;
    
    const currentAge = parseFloat(pricing.ageDays);
    simSlider.value = currentAge;
    
    if (traceSoil) traceSoil.textContent = `Soil Grade: ${product.soil || "Clay-Loam Organic (pH 6.8)"}`;
    if (traceStorage) traceStorage.textContent = `Stored at ${product.temp || "4.2"}°C under active cold storage`;
    if (traceDecayDesc) traceDecayDesc.textContent = `Decay Engine Model: ${product.decayModel.toUpperCase()}`;

    function updateSimulatedMetrics(simDays) {
        simDays = parseFloat(simDays);
        simDaysVal.textContent = `${simDays.toFixed(1)} days`;
        
        const mockProduct = { 
            ...product, 
            harvestDate: new Date(Date.now() - simDays * 24 * 60 * 60 * 1000).toISOString() 
        };
        const simPricing = evaluateDecayedPrice(mockProduct);
        
        simPrice.textContent = `₹${simPricing.livePrice.toFixed(2)}`;
        
        // Sweetness Brix decay projection
        const baseBrix = parseFloat(product.brix) || 12.0;
        let simBrix = baseBrix;
        if (simDays <= product.shelfLife * 0.4) {
            simBrix = baseBrix + (simDays * 0.4); // slightly sweetens during early ripening
        } else {
            simBrix = baseBrix + (product.shelfLife * 0.16) - ((simDays - product.shelfLife * 0.4) * 0.8);
        }
        simBrix = Math.max(4.0, Math.min(25.0, simBrix)).toFixed(1);
        simBrixVal.textContent = `${simBrix}% Sugar`;
        
        // Moisture weight loss projection
        const weightLoss = Math.min(15.0, simDays * 1.25).toFixed(1);
        simWeightLoss.textContent = `${weightLoss}%`;
        
        // Tracing Nodes visual updates
        const line = document.getElementById("det-trace-active-line");
        const nodeFarmer = document.getElementById("trace-node-farmer");
        const nodeQa = document.getElementById("trace-node-qa");
        const nodeHub = document.getElementById("trace-node-hub");
        const nodeConsumer = document.getElementById("trace-node-consumer");
        
        nodeFarmer.classList.remove("active");
        nodeQa.classList.remove("active");
        nodeHub.classList.remove("active");
        nodeConsumer.classList.remove("active");
        
        let activePct = 0;
        
        if (simDays >= 0) {
            nodeFarmer.classList.add("active");
            activePct = 0;
        }
        if (simDays >= 0.5) {
            nodeQa.classList.add("active");
            activePct = 33;
        }
        if (simDays >= 1.5) {
            nodeHub.classList.add("active");
            activePct = 66;
        }
        if (simDays >= 3.0) {
            nodeConsumer.classList.add("active");
            activePct = 100;
        }
        
        if (line) {
            line.style.height = `${activePct}%`;
        }
    }
    
    simSlider.oninput = (e) => {
        updateSimulatedMetrics(e.target.value);
    };
    
    // Initial display evaluations
    updateSimulatedMetrics(currentAge);
    renderRatingsBreakdown(product);
    renderReviewsFeed(product);

    document.getElementById("product-details-modal").classList.add("open");
}

// Star rating submission hook
function rateProduct(productId, newRating) {
    const products = dbGet("products", []);
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const count = product.ratingCount || 1;
    const current = product.rating || 5.0;
    
    const calculated = (current * count + newRating) / (count + 1);
    
    product.rating = Math.round(calculated * 10) / 10;
    product.ratingCount = count + 1;
    
    dbSet("products", products);
    renderCatalog();
    showToast(`Added a ${newRating}-star rating for ${product.name}!`);
}

function addToCart(productId) {
    const products = dbGet("products", []);
    const product = products.find(p => p.id === productId);
    
    if (!product || product.stock <= 0) return;

    const existingIndex = cart.findIndex(item => item.productId === productId);
    
    const currentQty = existingIndex > -1 ? cart[existingIndex].quantity : 0;
    if (currentQty + 1 > product.stock) {
        alert(`Sorry, you cannot add more than ${product.stock} kg for this batch.`);
        return;
    }

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ productId: productId, quantity: 1 });
    }

    dbSet("cart", cart);
    updateCartUI();
    toggleCartDrawer(true);
    showToast(`${product.name} added to cart.`);
}

function updateCartUI() {
    const container = document.getElementById("cart-items-container");
    const countBadge = document.getElementById("cart-count");
    const subtotalBaseSpan = document.getElementById("cart-subtotal-base");
    const savingsSpan = document.getElementById("cart-savings-total");
    const subtotalFinalSpan = document.getElementById("cart-subtotal-final");
    
    const products = dbGet("products", []);
    
    container.innerHTML = "";
    
    let totalItems = 0;
    let baseTotal = 0.0;
    let finalTotal = 0.0;
    
    cart.forEach((item, index) => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        
        const pricing = evaluateDecayedPrice(product);
        const itemBaseTotal = product.priceBase * item.quantity;
        const itemFinalTotal = pricing.livePrice * item.quantity;
        
        totalItems += item.quantity;
        baseTotal += itemBaseTotal;
        finalTotal += itemFinalTotal;
        
        const cartItemEl = document.createElement("div");
        cartItemEl.className = "cart-item";
        cartItemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${product.name}</h4>
                <div class="cart-item-price-meta">
                    <span class="price-live" style="font-size:1rem;">₹${pricing.livePrice.toFixed(2)}</span>
                    <span class="price-unit">x ${item.quantity} kg</span>
                    ${pricing.discount > 0 ? `<span class="cart-item-decay">(${pricing.discount}% Clearance)</span>` : ''}
                </div>
                <div class="cart-item-ctrls">
                    <div style="display:flex; align-items:center; gap:0.4rem;">
                        <button class="qty-btn" onclick="window.appUpdateQty(${index}, -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="window.appUpdateQty(${index}, 1)">+</button>
                    </div>
                    <button class="btn-remove-item" onclick="window.appRemoveCartItem(${index})">Remove</button>
                </div>
            </div>
        `;
        container.appendChild(cartItemEl);
    });

    const savings = baseTotal - finalTotal;
    
    let couponDiscountValue = 0.0;
    const rowCoupon = document.getElementById("row-coupon-discount");
    const couponValSpan = document.getElementById("cart-coupon-amount");

    if (appliedCoupon) {
        const rate = MOCK_COUPONS[appliedCoupon];
        couponDiscountValue = finalTotal * rate;
        rowCoupon.style.display = "flex";
        rowCoupon.querySelector('span:first-child').textContent = `Promo Discount (${rate * 100}%)`;
        couponValSpan.textContent = `-₹${couponDiscountValue.toFixed(2)}`;
    } else {
        rowCoupon.style.display = "none";
    }

    const netPayable = finalTotal - couponDiscountValue;

    countBadge.textContent = totalItems;
    subtotalBaseSpan.textContent = `₹${baseTotal.toFixed(2)}`;
    savingsSpan.textContent = `-₹${savings.toFixed(2)}`;
    subtotalFinalSpan.textContent = `₹${netPayable.toFixed(2)}`;

    document.getElementById("btn-checkout").disabled = cart.length === 0;
}

function updateQty(index, change) {
    const products = dbGet("products", []);
    const item = cart[index];
    const product = products.find(p => p.id === item.productId);
    
    if (!product) return;
    
    const newQty = item.quantity + change;
    
    if (newQty <= 0) {
        cart.splice(index, 1);
    } else if (newQty > product.stock) {
        alert(`Maximum available stock limit for this batch is ${product.stock} kg.`);
    } else {
        item.quantity = newQty;
    }
    
    dbSet("cart", cart);
    updateCartUI();
}

function removeCartItem(index) {
    cart.splice(index, 1);
    dbSet("cart", cart);
    updateCartUI();
}

function toggleCartDrawer(open) {
    const drawer = document.getElementById("cart-drawer");
    if (open) {
        drawer.classList.add("open");
    } else {
        drawer.classList.remove("open");
    }
}

// ==========================================
// 6. ADMIN DASHBOARD & DUAL CANVAS CHARTS
// ==========================================
function renderAdminDashboard() {
    const products = dbGet("products", []);
    const tableBody = document.getElementById("inventory-table-body");
    
    document.getElementById("metric-active-items").textContent = products.length;
    
    let totalWeight = 0;
    let nearExpiration = 0;
    
    tableBody.innerHTML = "";
    
    const categoryWeights = {
        "Citrus": 0,
        "Berries": 0,
        "Stone Fruits": 0,
        "Tropical": 0,
        "Melons": 0
    };

    products.forEach(p => {
        totalWeight += p.stock;
        
        if (categoryWeights[p.category] !== undefined) {
            categoryWeights[p.category] += p.stock;
        }

        const pricing = evaluateDecayedPrice(p);
        
        const lifeRatio = (Date.now() - new Date(p.harvestDate).getTime()) / (p.shelfLife * 24 * 60 * 60 * 1000);
        if (lifeRatio >= 0.8) {
            nearExpiration++;
        }
        
        let statusDotClass = "dot-fresh";
        if (pricing.status === "clearance") {
            statusDotClass = "dot-clearance";
        } else if (pricing.status === "standard") {
            statusDotClass = "dot-standard";
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <span class="inventory-fresh-dot ${statusDotClass}"></span>
                <strong>${p.name}</strong>
            </td>
            <td>${p.category}</td>
            <td>${new Date(p.harvestDate).toLocaleDateString()}</td>
            <td>₹${p.priceBase.toFixed(2)} / <strong style="color:var(--brand-primary);">₹${pricing.livePrice.toFixed(2)}</strong></td>
            <td>${p.stock} kg</td>
            <td>
                <button class="btn-table-del" onclick="window.appDeleteProduct('${p.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("metric-total-weight").textContent = `${totalWeight} kg`;
    document.getElementById("metric-expiring-items").textContent = nearExpiration;

    // Draw both Canvas Charts
    drawSpoilageChart(categoryWeights);
    drawDecayCurvesChart();
}

function drawSpoilageChart(weights) {
    const canvas = document.getElementById("spoilage-chart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const categories = Object.keys(weights);
    const data = Object.values(weights);
    const maxVal = Math.max(...data, 100);

    const padding = 35;
    const chartHeight = canvas.height - padding * 2;
    const chartWidth = canvas.width - padding * 2;
    const barWidth = 24;
    const gap = (chartWidth - barWidth * categories.length) / (categories.length - 1);

    const theme = document.documentElement.getAttribute("data-theme");
    const textColor = theme === "dark" ? "#f1f5f9" : "#1e293b";
    const barColor = "hsl(150, 76%, 38%)";
    const accentBarColor = "hsl(24, 95%, 54%)";

    categories.forEach((cat, index) => {
        const val = data[index];
        const pct = val / maxVal;
        const bHeight = chartHeight * pct;

        const x = padding + index * (barWidth + gap);
        const y = canvas.height - padding - bHeight;

        ctx.fillStyle = cat === "Berries" ? accentBarColor : barColor;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(x, y, barWidth, bHeight, [3, 3, 0, 0]);
        } else {
            ctx.rect(x, y, barWidth, bHeight);
        }
        ctx.fill();

        ctx.fillStyle = textColor;
        ctx.font = "bold 8px var(--font-body)";
        ctx.textAlign = "center";
        ctx.fillText(cat.substring(0, 5) + ".", x + barWidth / 2, canvas.height - padding + 12);
        ctx.fillText(`${val}`, x + barWidth / 2, y - 6);
    });

    ctx.strokeStyle = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding - 5, canvas.height - padding);
    ctx.lineTo(canvas.width - padding + 5, canvas.height - padding);
    ctx.stroke();
}

// Render decaying projection lines chart
function drawDecayCurvesChart() {
    const canvas = document.getElementById("decay-curves-chart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const theme = document.documentElement.getAttribute("data-theme");
    const textColor = theme === "dark" ? "#94a3b8" : "#64748b";
    
    const padding = 30;
    const w = canvas.width - padding * 2;
    const h = canvas.height - padding * 2;

    // Draw chart axes grid lines
    ctx.strokeStyle = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Grid horizontal line divisions
    for (let i = 0; i <= 4; i++) {
        const yVal = padding + (h / 4) * i;
        ctx.moveTo(padding, yVal);
        ctx.lineTo(canvas.width - padding, yVal);
    }
    ctx.stroke();

    // 1. Draw Linear decay curve (Green)
    ctx.strokeStyle = "hsl(150, 76%, 38%)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(canvas.width - padding, padding + h * 0.85); // linear decline
    ctx.stroke();

    // 2. Draw Exponential decay curve (Orange)
    ctx.strokeStyle = "hsl(24, 95%, 52%)";
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    for (let xPos = 0; xPos <= w; xPos += 5) {
        const ratio = xPos / w;
        // exponential formula curve calculation
        const yVal = padding + h * (1 - Math.exp(-2.2 * ratio));
        ctx.lineTo(padding + xPos, yVal);
    }
    ctx.stroke();

    // 3. Draw Stepwise Curve (Red)
    ctx.strokeStyle = "hsl(350, 80%, 55%)";
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    // Draw stair step patterns
    ctx.lineTo(padding + w * 0.33, padding);
    ctx.lineTo(padding + w * 0.33, padding + h * 0.25);
    ctx.lineTo(padding + w * 0.66, padding + h * 0.25);
    ctx.lineTo(padding + w * 0.66, padding + h * 0.60);
    ctx.lineTo(padding + w, padding + h * 0.60);
    ctx.stroke();

    // Labels
    ctx.fillStyle = textColor;
    ctx.font = "7px var(--font-body)";
    ctx.textAlign = "left";
    ctx.fillText("Day 0 (Harvest)", padding, canvas.height - 10);
    ctx.textAlign = "right";
    ctx.fillText("Day N (Shelf Life)", canvas.width - padding, canvas.height - 10);
}

function deleteProduct(productId) {
    if (!confirm("Are you sure you want to delete this fruit inventory batch?")) return;
    
    let products = dbGet("products", []);
    products = products.filter(p => p.id !== productId);
    dbSet("products", products);
    
    cart = cart.filter(item => item.productId !== productId);
    dbSet("cart", cart);
    
    updateCartUI();
    renderAdminDashboard();
    renderCatalog();
    showToast("Product deleted from database.");
}

function handleAddProductSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById("prod-name").value.trim();
    const category = document.getElementById("prod-category").value;
    const decayModel = document.getElementById("prod-decay-model").value;
    const priceBase = parseFloat(document.getElementById("prod-base-price").value);
    const stock = parseInt(document.getElementById("prod-stock").value);
    const harvestDate = new Date(document.getElementById("prod-harvest-date").value).toISOString();
    const shelfLife = parseInt(document.getElementById("prod-shelf-life").value);
    const decayCoefficient = parseFloat(document.getElementById("prod-decay-coeff").value);

    const products = dbGet("products", []);
    const newProd = {
        id: `prod-${Date.now()}`,
        name,
        category,
        decayModel,
        priceBase,
        stock,
        harvestDate,
        shelfLife,
        decayCoefficient,
        image: "",
        rating: 5.0,
        ratingCount: 1,
        origin: "Regional Cooperative, Rupnagar",
        brix: "12.0%",
        temp: "4.0"
    };

    products.push(newProd);
    dbSet("products", products);
    
    document.getElementById("form-add-product").reset();
    showToast("Harvest batch logged successfully!");
    
    renderAdminDashboard();
    renderCatalog();
}

function handleFarmerAddProductSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById("farm-prod-name").value.trim();
    const category = document.getElementById("farm-prod-category").value;
    const decayModel = document.getElementById("farm-prod-decay-model").value;
    const priceBase = parseFloat(document.getElementById("farm-prod-base-price").value);
    const stock = parseInt(document.getElementById("farm-prod-stock").value);
    const shelfLife = parseInt(document.getElementById("farm-prod-shelf-life").value);
    const decayCoefficient = parseFloat(document.getElementById("farm-prod-decay-coeff").value);
    const brix = document.getElementById("farm-prod-brix").value + "% Sugar";
    const temp = parseFloat(document.getElementById("farm-prod-temp").value);
    const soil = document.getElementById("farm-prod-soil").value.trim();

    const products = dbGet("products", []);
    const newProd = {
        id: `prod-${Date.now()}`,
        name,
        category,
        decayModel,
        priceBase,
        stock,
        harvestDate: new Date().toISOString(),
        shelfLife,
        decayCoefficient,
        image: "", // uses default SVG category fallback
        rating: 5.0,
        ratingCount: 1,
        origin: currentUser ? `${currentUser.name}'s Farm, Rupnagar` : "Farmer Node, Rupnagar",
        brix,
        temp: temp.toFixed(1),
        soil
    };

    products.push(newProd);
    dbSet("products", products);
    
    document.getElementById("form-farmer-add-product").reset();
    showToast("Farmer Sourcing Batch QC Registered & Published!");
    
    renderSupplierDashboard();
    renderCatalog();
}

// ==========================================
// 6B. FARMER / SUPPLIER DASHBOARD ENGINE
// ==========================================
function renderSupplierDashboard() {
    const products = dbGet("products", []);
    const tableBody = document.getElementById("farmer-inventory-table-body");
    const farmerName = document.getElementById("farmer-display-name");
    
    if (currentUser) {
        farmerName.textContent = currentUser.name;
    }

    // Filter products representing this supplier (e.g. Valencia Oranges, Grapefruit, and Grapes)
    // In our client simulation, the farmer owns Rupnagar & Sangrur vine sourced items
    const supplierProducts = products.filter(p => 
        p.origin.includes("Rupnagar") || p.origin.includes("Sangrur")
    );

    document.getElementById("farmer-active-batches").textContent = supplierProducts.length;

    let totalSoldWeight = 0;
    let payoutTotal = 0.0;
    
    tableBody.innerHTML = "";

    supplierProducts.forEach(p => {
        // Calculate dynamic pricing parameters
        const pricing = evaluateDecayedPrice(p);
        
        // Sourced weight Sold simulation (we assume 20% of stock has been sold)
        const soldWeight = Math.round(p.stock * 0.25);
        totalSoldWeight += soldWeight;
        payoutTotal += soldWeight * pricing.livePrice;

        const deductionPercent = pricing.discount;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${p.name}</strong></td>
            <td>${pricing.ageDays} days</td>
            <td style="color: ${deductionPercent > 50 ? 'var(--badge-clearance)' : 'var(--text-secondary)'}; font-weight:600;">
                -${deductionPercent}% decay
            </td>
            <td>₹${p.priceBase.toFixed(2)} / <strong style="color:var(--brand-primary)">₹${pricing.livePrice.toFixed(2)}</strong></td>
            <td>
                <span class="order-paid-badge" style="background:var(--brand-primary-light); color:var(--brand-primary);">
                    Active
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("farmer-total-sold").textContent = `${totalWeightToText(totalSoldWeight)} kg`;
    document.getElementById("farmer-total-payout").textContent = `₹${payoutTotal.toFixed(2)}`;
}

function totalWeightToText(weight) {
    return weight > 0 ? weight : "0";
}

// ==========================================
// 7. CHECKOUT & PAYMENT INTEGRATION SIMULATION
// ==========================================
function initCheckout() {
    const btnCheckout = document.getElementById("btn-checkout");
    const modalCheckout = document.getElementById("checkout-modal");
    const btnCloseStripe = document.getElementById("btn-close-stripe");
    const stripePayable = document.getElementById("stripe-payable-amount");
    const stripeForm = document.getElementById("stripe-payment-form");
    const stripeSubmit = document.getElementById("btn-stripe-submit");
    const stripeBtnText = document.getElementById("stripe-btn-text");
    
    const modalSuccess = document.getElementById("success-modal");
    const btnCloseSuccess = document.getElementById("btn-close-success");
    const receiptOrder = document.getElementById("receipt-order-id");
    const receiptAmount = document.getElementById("receipt-amount");

    btnCheckout.addEventListener("click", () => {
        if (!currentUser) {
            showToast("Please authenticate to proceed with checkouts.", "error");
            window.location.hash = "#auth";
            toggleCartDrawer(false);
            return;
        }

        const products = dbGet("products", []);
        let total = 0.0;
        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const pricing = evaluateDecayedPrice(product);
                total += pricing.livePrice * item.quantity;
            }
        });

        let couponDiscountValue = 0.0;
        if (appliedCoupon) {
            couponDiscountValue = total * MOCK_COUPONS[appliedCoupon];
        }
        
        const finalAmount = total - couponDiscountValue;

        stripePayable.textContent = `₹${finalAmount.toFixed(2)}`;
        stripeBtnText.textContent = `Pay ₹${finalAmount.toFixed(2)}`;
        
        toggleCartDrawer(false);
        modalCheckout.classList.add("open");
    });

    btnCloseStripe.addEventListener("click", () => {
        modalCheckout.classList.remove("open");
    });

    stripeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        stripeSubmit.disabled = true;
        stripeBtnText.textContent = "Processing payment authorizations...";
        
        setTimeout(() => {
            const products = dbGet("products", []);
            let total = 0.0;
            const orderItemsSummary = [];
            
            cart.forEach(item => {
                const product = products.find(p => p.id === item.productId);
                if (product) {
                    const pricing = evaluateDecayedPrice(product);
                    total += pricing.livePrice * item.quantity;
                    product.stock = Math.max(0, product.stock - item.quantity);
                    orderItemsSummary.push(`${product.name} (x${item.quantity} kg)`);
                }
            });

            dbSet("products", products);
            
            let couponDiscountValue = 0.0;
            if (appliedCoupon) {
                couponDiscountValue = total * MOCK_COUPONS[appliedCoupon];
            }
            const finalAmount = total - couponDiscountValue;

            const orderId = `#FP-${Math.floor(10000 + Math.random() * 90000)}`;
            
            const orders = dbGet("orders", []);
            orders.unshift({
                id: orderId,
                email: currentUser.email,
                items: orderItemsSummary.join(", "),
                amount: finalAmount.toFixed(2),
                date: new Date().toLocaleDateString(),
                timestamp: Date.now()
            });
            dbSet("orders", orders);

            receiptOrder.textContent = orderId;
            receiptAmount.textContent = `₹${finalAmount.toFixed(2)}`;
            
            cart = [];
            dbSet("cart", cart);
            appliedCoupon = null;
            document.getElementById("cart-coupon").value = "";
            document.getElementById("coupon-feedback").style.display = "none";
            updateCartUI();
            
            modalCheckout.classList.remove("open");
            modalSuccess.classList.add("open");
            
            stripeForm.reset();
            stripeSubmit.disabled = false;
            stripeBtnText.textContent = "Pay Now";
            showToast("Order transaction processed successfully!");
            
            renderCatalog();
            if (window.location.hash === "#admin") renderAdminDashboard();
            if (window.location.hash === "#supplier") renderSupplierDashboard();
        }, 1200);
    });

    btnCloseSuccess.addEventListener("click", () => {
        modalSuccess.classList.remove("open");
    });
}

// ==========================================
// 8. ORDER HISTORY VIEW LOGIC WITH TIMELINE
// ==========================================
function initOrderHistory() {
    const btnOrders = document.getElementById("btn-orders");
    const modalOrders = document.getElementById("orders-modal");
    const btnCloseOrders = document.getElementById("btn-close-orders");
    const container = document.getElementById("orders-list-container");

    btnOrders.addEventListener("click", () => {
        if (!currentUser) return;
        
        const allOrders = dbGet("orders", []);
        const userOrders = allOrders.filter(o => o.email === currentUser.email);
        
        container.innerHTML = "";
        
        if (userOrders.length === 0) {
            container.innerHTML = `<p class="text-center" style="color:var(--text-muted); font-size:0.9rem; padding: 2rem 0;">You have not made any purchases yet.</p>`;
        } else {
            userOrders.forEach(o => {
                const elapsedMs = Date.now() - (o.timestamp || Date.now());
                const elapsedSeconds = elapsedMs / 1000;
                
                let percent = 10;
                if (elapsedSeconds > 120) {
                    percent = 100;
                } else if (elapsedSeconds > 60) {
                    percent = 66;
                } else if (elapsedSeconds > 25) {
                    percent = 33;
                }

                // Simulated event log timestamps
                const time1 = new Date(o.timestamp).toLocaleTimeString();
                const time2 = new Date(o.timestamp + 10000).toLocaleTimeString();
                const time3 = new Date(o.timestamp + 30000).toLocaleTimeString();
                const time4 = new Date(o.timestamp + 60000).toLocaleTimeString();

                const el = document.createElement("div");
                el.className = "order-history-card";
                el.innerHTML = `
                    <div class="order-history-header">
                        <span>Order ${o.id}</span>
                        <span style="color:var(--brand-primary); font-weight: 800;">₹${o.amount}</span>
                    </div>
                    <div class="order-history-items" style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.2rem;">${o.items}</div>
                    
                    <div class="logistics-tracking-wrapper">
                        <h4 style="font-family: var(--font-heading); font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.2rem;">Live Delivery Dispatch Map</h4>
                        <div class="transit-track-bg">
                            <div class="transit-track-fill" style="width: ${percent}%;"></div>
                            <div class="transit-milestone-marker passed" style="left: 0%;" title="Harvested"></div>
                            <div class="transit-milestone-marker ${percent >= 33 ? 'passed' : ''}" style="left: 33%;" title="QC Pass"></div>
                            <div class="transit-milestone-marker ${percent >= 66 ? 'passed' : ''}" style="left: 66%;" title="Transit"></div>
                            <div class="transit-milestone-marker ${percent >= 100 ? 'passed' : ''}" style="left: 100%;" title="Delivered"></div>
                            
                            <!-- Floating Animated Truck -->
                            <svg class="transit-truck-icon" style="left: calc(${percent}% - 12px);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                        </div>
                        
                        <div class="transit-log-list">
                            <div class="transit-log-item">
                                <span>🌱 Sourced & Harvested from Farmer Node</span>
                                <span class="transit-log-time">${time1}</span>
                            </div>
                            ${percent >= 33 ? `
                            <div class="transit-log-item">
                                <span>🔬 Quality Inspection & Brix Score Validated</span>
                                <span class="transit-log-time">${time2}</span>
                            </div>
                            ` : ''}
                            ${percent >= 66 ? `
                            <div class="transit-log-item">
                                <span>🚛 Dispatched in Refrigerated Logistics Chain</span>
                                <span class="transit-log-time">${time3}</span>
                            </div>
                            ` : ''}
                            ${percent >= 100 ? `
                            <div class="transit-log-item">
                                <span>🏠 Delivered directly to Consumer doorstep</span>
                                <span class="transit-log-time">${time4}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <div class="order-history-footer" style="margin-top: 1rem;">
                        <span>Date: ${o.date}</span>
                        <span class="order-paid-badge">PAID</span>
                    </div>
                `;
                container.appendChild(el);
            });
        }
        
        modalOrders.classList.add("open");
    });

    btnCloseOrders.addEventListener("click", () => {
        modalOrders.classList.remove("open");
    });
}

// ==========================================
// 9. PROMO CODE COUPON VERIFICATION
// ==========================================
function initCoupons() {
    const btnApply = document.getElementById("btn-apply-coupon");
    const inputCoupon = document.getElementById("cart-coupon");
    const feedback = document.getElementById("coupon-feedback");

    btnApply.addEventListener("click", () => {
        const code = inputCoupon.value.trim().toUpperCase();
        
        if (!code) {
            feedback.textContent = "Please enter a coupon code.";
            feedback.className = "coupon-feedback error";
            feedback.style.display = "block";
            return;
        }

        if (MOCK_COUPONS[code] !== undefined) {
            appliedCoupon = code;
            feedback.textContent = `Promo code "${code}" applied successfully!`;
            feedback.className = "coupon-feedback success";
            feedback.style.display = "block";
            updateCartUI();
            showToast(`Coupon "${code}" applied!`);
        } else {
            feedback.textContent = "Invalid coupon code or expired.";
            feedback.className = "coupon-feedback error";
            feedback.style.display = "block";
        }
    });
}

// ==========================================
// 10. BACKGROUND ANIME DECORATIVE FLOW
// ==========================================
function startLeavesAnimation() {
    const container = document.getElementById("leaf-container");
    if (!container) return;
    
    for (let i = 0; i < 12; i++) {
        spawnLeaf(container);
    }
}

function spawnLeaf(parent) {
    const leaf = document.createElement("div");
    leaf.className = "floating-leaf";
    leaf.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22C2 22 8 22 12 18C16 14 18 10 18 10C18 10 14 10 10 12C6 14 2 20 2 22Z" fill="var(--brand-primary)" fill-opacity="0.1"/><path d="M12 18l6 4M10 12l8-4"/></svg>`;
    
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.width = `${12 + Math.random() * 15}px`;
    leaf.style.height = leaf.style.width;
    leaf.style.animationDuration = `${8 + Math.random() * 10}s`;
    leaf.style.animationDelay = `${Math.random() * 5}s`;
    
    parent.appendChild(leaf);
    
    leaf.addEventListener("animationiteration", () => {
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.animationDuration = `${8 + Math.random() * 10}s`;
    });
}

// ==========================================
// 11. LIFECYCLE EVENT INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    updateNavUI();

    window.addEventListener("hashchange", routeApp);
    routeApp();

    const harvestInput = document.getElementById("prod-harvest-date");
    if (harvestInput) {
        const localNow = new Date();
        localNow.setMinutes(localNow.getMinutes() - localNow.getTimezoneOffset());
        harvestInput.value = localNow.toISOString().slice(0, 16);
    }

    const toggleBtn = document.getElementById("theme-toggle");
    let currentTheme = localStorage.getItem("freshpick_theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);

    toggleBtn.addEventListener("click", () => {
        currentTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", currentTheme);
        localStorage.setItem("freshpick_theme", currentTheme);
        if (window.location.hash === "#admin") renderAdminDashboard();
        if (window.location.hash === "#supplier") renderSupplierDashboard();
    });

    document.getElementById("cart-trigger").addEventListener("click", () => toggleCartDrawer(true));
    document.getElementById("close-cart").addEventListener("click", () => toggleCartDrawer(false));
    
    document.addEventListener("click", (e) => {
        const drawer = document.getElementById("cart-drawer");
        const trigger = document.getElementById("cart-trigger");
        if (drawer.classList.contains("open") && !drawer.contains(e.target) && !trigger.contains(e.target)) {
            toggleCartDrawer(false);
        }
    });

    document.getElementById("search-input").addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        renderCatalog();
    });

    document.querySelectorAll(".filter-chip").forEach(chip => {
        chip.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            activeCategory = chip.dataset.category;
            renderCatalog();
        });
    });

    document.getElementById("form-add-product").addEventListener("submit", handleAddProductSubmit);
    
    const farmerForm = document.getElementById("form-farmer-add-product");
    if (farmerForm) {
        farmerForm.addEventListener("submit", handleFarmerAddProductSubmit);
    }

    // Detail modal add to cart hook
    document.getElementById("btn-det-add-cart").addEventListener("click", () => {
        if (selectedDetailsProduct) {
            addToCart(selectedDetailsProduct.id);
            document.getElementById("product-details-modal").classList.remove("open");
        }
    });
    
    document.getElementById("btn-close-details").addEventListener("click", () => {
        document.getElementById("product-details-modal").classList.remove("open");
    });

    initCheckout();
    initCoupons();
    initOrderHistory();
    updateCartUI();
    
    startLeavesAnimation();

    // Floating Demo Panel Toggle Logic
    const demoPanel = document.getElementById("demo-floating-panel");
    const demoToggle = document.getElementById("demo-panel-toggle");
    if (demoToggle && demoPanel) {
        demoToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            demoPanel.classList.toggle("open");
        });
        
        // Close when clicking outside the floating block
        document.addEventListener("click", (e) => {
            if (!demoPanel.contains(e.target)) {
                demoPanel.classList.remove("open");
            }
        });
    }
});

// ==========================================
// 12. EXPOSE GLOBAL APIS FOR INLINE HTML EVENT HANDLERS
// ==========================================
function demoLogin(role) {
    let email = "";
    if (role === "customer") email = "consumer@freshpick.com";
    else if (role === "farmer") email = "farmer@freshpick.com";
    else if (role === "admin") email = "admin@freshpick.com";
    
    const users = dbGet("users", []);
    const matched = users.find(u => u.email === email);
    
    if (matched) {
        currentUser = matched;
        dbSet("currentUser", currentUser);
        updateNavUI();
        
        // Auto fill form inputs for demo visibility
        const emailInput = document.getElementById("login-email");
        const passInput = document.getElementById("login-password");
        if (emailInput) emailInput.value = email;
        if (passInput) passInput.value = "Password123";
        
        showToast(`Demo Quick Login: ${matched.name} (${role.toUpperCase()})`);
        
        setTimeout(() => {
            if (role === "admin") {
                window.location.hash = "#admin";
            } else if (role === "farmer") {
                window.location.hash = "#supplier";
            } else {
                window.location.hash = "#catalog";
            }
        }, 300);
    }
}

window.appAddToCart = addToCart;
window.appUpdateQty = updateQty;
window.appRemoveCartItem = removeCartItem;
window.appDeleteProduct = deleteProduct;
window.appRateProduct = rateProduct;
window.appDemoLogin = demoLogin;
