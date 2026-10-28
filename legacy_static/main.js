/**
 * ZARGUL - Client-Side Logic & Dynamic Interactions
 * Multi-Page Luxury Claymorphism Architecture with Part 1 Features:
 * 1. Product Quick-View Modal + Dynamic Variant/Size Selector
 * 2. Cash on Delivery (COD) Checkout Drawer & Order ID Generator
 * 3. Smart Royal Combo Builder (Auto -Rs. 1,000 Discount)
 * 4. Live Social Proof Popup (Urgency Engine) + Instant Search Overlay
 */

// --- FALLBACK PRODUCT DATABASE (REAL PERFUMES & WATCHES COLLECTION) ---
const FALLBACK_PRODUCTS = [
  // --- 3 NEW LUXURY HD PERFUMES ---
  {
    id: 101,
    title: "Hawajes Eau de Parfum For Him",
    category: "Fragrances",
    price: 4000,
    originalPrice: 5000,
    rating: 4.9,
    image: "assets/perfumes/Hawajes_4000.jpg",
    tag: "20% OFF",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 102,
    title: "Joyous S-PRO 8 AM Eau de Parfum",
    category: "Fragrances",
    price: 4000,
    originalPrice: 5000,
    rating: 4.9,
    image: "assets/perfumes/Joyous_4000.jpg",
    tag: "20% OFF",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 103,
    title: "Murooj Caliph Luxury Eau de Parfum",
    category: "Fragrances",
    price: 4000,
    originalPrice: 5000,
    rating: 5.0,
    image: "assets/perfumes/Murooj_4000.jpg",
    tag: "20% OFF",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 104,
    title: "Joyous Warrant 44 Intense Eau de Parfum",
    category: "Fragrances",
    price: 4000,
    originalPrice: 5000,
    rating: 4.9,
    image: "assets/perfumes/Warrant_4275.jpg",
    tag: "20% OFF",
    badgeType: "sale",
    cardBg: "white",
    inStock: true,
    featured: true,
    description: "An intense and magnetic interpretation of modern executive sophistication. Joyous Warrant 44 Intense opens with crisp sparkling bergamot, fresh lemon zest, and spicy pink pepper, unfolding into a captivating heart of smoky birch, rich amber, and aromatic lavender.",
    warranty: "1 Year Official Brand Warranty / 100% Original Guarantee"
  },
  {
    id: 201,
    title: "Elegant Pearl Beaded Handbag",
    category: "Bags",
    price: 6500,
    originalPrice: 7000,
    rating: 4.9,
    image: "assets/bags/Pearl_Handbag_6500.jpg",
    tag: "7% OFF",
    badgeType: "sale",
    cardBg: "white",
    inStock: true,
    featured: true,
    description: "An exquisite handcrafted luxury handbag woven with lustrous ivory pearls in an intricate diamond lattice pattern. Featuring a smooth champagne satin pouch interior and an elegant beaded shoulder strap, this masterpiece adds timeless royal glamour to bridal wear, evening galas, and festive celebrations.",
    warranty: "100% Handcrafted Quality Guarantee"
  },

  // --- 26 REAL LUXURY WATCHES ---
  {
    id: 1,
    title: "Rolex Submariner Edition I",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 5.0,
    image: "assets/watches/Rolex_4500.jpg",
    tag: "Best Seller",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 2,
    title: "Rolex Luxury Edition II",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 4.9,
    image: "assets/watches/Rolex_4500_2.jpg",
    tag: "Luxury",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 3,
    title: "Rolex Oyster Perpetual III",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 4.9,
    image: "assets/watches/Rolex_4500_3.jpg",
    tag: "Luxury",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 4,
    title: "Rolex Datejust Edition IV",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 5.0,
    image: "assets/watches/Rolex_4500_4.jpg",
    tag: "Trending",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 5,
    title: "Rolex Cosmograph Edition V",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 4.9,
    image: "assets/watches/Rolex_4500_5.jpg",
    tag: "Trending",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 6,
    title: "Rolex Day-Date Edition VI",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 4.9,
    image: "assets/watches/Rolex_4500_6.jpg",
    tag: "Luxury",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 7,
    title: "Rolex Masterpiece Edition VII",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 5.0,
    image: "assets/watches/Rolex_4500_7.jpg",
    tag: "Exclusive",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 8,
    title: "Rolex Royal Edition VIII",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 4.9,
    image: "assets/watches/Rolex_4500_8.jpg",
    tag: "Luxury",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 9,
    title: "Rolex Executive Edition IX",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 4.9,
    image: "assets/watches/Rolex_4500_9.jpg",
    tag: "Trending",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 10,
    title: "Rolex Diamond Bezel X",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 5.0,
    image: "assets/watches/Rolex_4500_10.jpg",
    tag: "Hot",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 11,
    title: "Bugatti Chronograph Sport",
    category: "Timepieces",
    price: 8000,
    originalPrice: 9500,
    rating: 5.0,
    image: "assets/watches/Bugati_8000.jpg",
    tag: "Exclusive",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 12,
    title: "Cartier Santos Classic Watch",
    category: "Timepieces",
    price: 4000,
    originalPrice: 5500,
    rating: 4.9,
    image: "assets/watches/Catier_4000.jpg",
    tag: "Classic",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 13,
    title: "Hublot Classic Fusion",
    category: "Timepieces",
    price: 4000,
    originalPrice: 5500,
    rating: 4.9,
    image: "assets/watches/Hublot_4000.jpg",
    tag: "Trending",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 14,
    title: "Kademan Executive Watch",
    category: "Timepieces",
    price: 5000,
    originalPrice: 6500,
    rating: 4.8,
    image: "assets/watches/Kademan_5000.jpg",
    tag: "Executive",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 15,
    title: "BestWin Chronograph Sport",
    category: "Timepieces",
    price: 4500,
    originalPrice: 6000,
    rating: 4.9,
    image: "assets/watches/Best_win_4500.jpg",
    tag: "New",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 16,
    title: "Aura Minimalist Timepiece",
    category: "Timepieces",
    price: 3500,
    originalPrice: 5000,
    rating: 4.8,
    image: "assets/watches/Aura_3500.jpg",
    tag: "Minimal",
    badgeType: "new",
    cardBg: "beige"
  },
  {
    id: 17,
    title: "Aqua Time Marine Edition",
    category: "Timepieces",
    price: 2000,
    originalPrice: 3500,
    rating: 4.8,
    image: "assets/watches/Aqua_time_2000.jpg",
    tag: "Special",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 18,
    title: "Power Tactical Chronograph",
    category: "Timepieces",
    price: 4000,
    originalPrice: 5500,
    rating: 4.8,
    image: "assets/watches/Power_4000.jpg",
    tag: "Popular",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 19,
    title: "Praward Elegant Timepiece",
    category: "Timepieces",
    price: 3500,
    originalPrice: 5000,
    rating: 4.8,
    image: "assets/watches/Praward_3500.jpg",
    tag: "Classic",
    badgeType: "new",
    cardBg: "beige"
  },
  {
    id: 20,
    title: "Puccess Way Luxury Watch I",
    category: "Timepieces",
    price: 4000,
    originalPrice: 5500,
    rating: 4.9,
    image: "assets/watches/Puccess_way_4000.jpg",
    tag: "Luxury",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 21,
    title: "Puccess Way Dual Time II",
    category: "Timepieces",
    price: 4000,
    originalPrice: 5500,
    rating: 4.9,
    image: "assets/watches/Puccess_way_4000_2.jpg",
    tag: "Trending",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 22,
    title: "Universe Point Chrono I",
    category: "Timepieces",
    price: 4000,
    originalPrice: 5500,
    rating: 4.8,
    image: "assets/watches/Universe_point_4000.jpg",
    tag: "New",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 23,
    title: "Universe Point Steel Edition II",
    category: "Timepieces",
    price: 4000,
    originalPrice: 5500,
    rating: 4.8,
    image: "assets/watches/Universe_point_4000_2.jpg",
    tag: "Trending",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 24,
    title: "Sovereign Royal Watch I",
    category: "Timepieces",
    price: 5000,
    originalPrice: 6500,
    rating: 4.9,
    image: "assets/watches/Watch1_5000.jpg",
    tag: "Luxury",
    badgeType: "new",
    cardBg: "white"
  },
  {
    id: 25,
    title: "Sovereign Royal Watch II",
    category: "Timepieces",
    price: 5000,
    originalPrice: 6500,
    rating: 4.9,
    image: "assets/watches/Watch1_2nd_design_5000.jpg",
    tag: "Trending",
    badgeType: "sale",
    cardBg: "white"
  },
  {
    id: 26,
    title: "Vantage Classic Timepiece",
    category: "Timepieces",
    price: 3000,
    originalPrice: 4500,
    rating: 4.8,
    image: "assets/watches/Watch2_3000.jpg",
    tag: "Best Seller",
    badgeType: "new",
    cardBg: "beige"
  }
];
let PRODUCTS = [...FALLBACK_PRODUCTS];

// --- 28 REALISTIC PAKISTANI CUSTOMER REVIEWS ---
const FALLBACK_REVIEWS = [
  { name: "Bilal Ahmed", city: "Lahore", rating: 5, text: "Hawajes Eau de Parfum has an insane projection! Spray kiya subah office ke liye aur shaam tak khushbu bilkul fresh rahi. Superb quality!", day: 2 },
  { name: "Usman Tariq", city: "Islamabad", rating: 5, text: "Ordered the Rolex Submariner. Watch ka weight aur finish dekh kar dil khush ho gaya. Pure executive feel, looks 100% genuine.", day: 3 },
  { name: "Hamza Ali", city: "Karachi", rating: 5, text: "Joyous S-PRO is such an invigorating morning scent. Citrus aur woody notes ka balance bohot aala hai. Delivery within 48 hours to DHA.", day: 5 },
  { name: "Ayesha Khan", city: "Lahore", rating: 5, text: "Murooj Caliph Luxury EDP is heavenly! It has that rich amber-floral richness jo kapron par 2 din rehti hai. My husband also loved it.", day: 6 },
  { name: "Zainab Malik", city: "Rawalpindi", rating: 5, text: "Got the Cartier Santos Classic Watch as an anniversary gift. Dial finishing aur clay-styled box packaging outstanding thi!", day: 7 },
  { name: "Saad Qureshi", city: "Faisalabad", rating: 5, text: "Bugatti Chronograph Sport is next-level. Everyone at my office noticed it right away. Best purchase in Rs. 8,000.", day: 8 },
  { name: "Farhan Sheikh", city: "Peshawar", rating: 5, text: "Ordered Hawajes and Joyous perfumes together with the 20% discount. Peshawar me safe bubble-wrapped delivery mili TCS se.", day: 9 },
  { name: "Hira Mansoor", city: "Multan", rating: 5, text: "Murooj perfume bottle feels so heavy and artistic on my vanity table. Scent profile is easily comparable to 30K international brands.", day: 10 },
  { name: "Daniyal Raza", city: "Sialkot", rating: 5, text: "Rolex Datejust IV in two-tone looks extremely sophisticated. Crown adjustment and bezel precision are top tier.", day: 11 },
  { name: "Nimra Tariq", city: "Karachi", rating: 5, text: "WhatsApp checkout process was so effortless. Order details share kiye aur representative ne 5 minute me confirmation bhej di.", day: 12 },
  { name: "Shahzaib Khan", city: "Islamabad", rating: 5, text: "Hublot Classic Fusion has that sleek matte dark bezel jo har formal suit ke sath match hoti hai. 10/10 recommendation!", day: 13 },
  { name: "Mehwish Bukhari", city: "Lahore", rating: 5, text: "Gifted Hawajes to my fiancé. He was amazed by the woody sillage and sleek blue bottle design.", day: 14 },
  { name: "Arham Siddiqui", city: "Gujranwala", rating: 5, text: "BestWin Chronograph for Rs. 4,500 is unbelievable value for money. Subdials work smoothly aur chain heavy hai.", day: 15 },
  { name: "Sana Javed", city: "Faisalabad", rating: 5, text: "Joyous S-Pro is so pleasant and uplifting. Not overpowering, just clean luxury throughout the day.", day: 16 },
  { name: "Mohsin Naqvi", city: "Karachi", rating: 5, text: "Kademan Executive Watch is sturdy and water-resistant. Daily bike ride pe pehanta hoon, absolutely no scratches.", day: 17 },
  { name: "Maryam Farooq", city: "Rawalpindi", rating: 5, text: "Unboxing experience was so aesthetic. The claymorphic cards and personalized note feel like a proper luxury brand.", day: 18 },
  { name: "Talha Aslam", city: "Multan", rating: 5, text: "Murooj Caliph EDP is royal! Projection is so strong that everyone in the car asked what perfume I was wearing.", day: 19 },
  { name: "Rabia Basheer", city: "Islamabad", rating: 5, text: "Rolex Diamond Bezel edition shines gracefully without being flashy. Highly recommended for special occasions.", day: 20 },
  { name: "Ahsan Mahmood", city: "Peshawar", rating: 5, text: "Hawajes perfume delivers unbelievable longevity in KPK winter. Clothes smell incredible even after washing.", day: 21 },
  { name: "Zoya Rehman", city: "Lahore", rating: 5, text: "Joyous S-Pro 8 AM is now my brother's signature scent. Fresh, modern and very charismatic.", day: 22 },
  { name: "Waqas Akram", city: "Hyderabad", rating: 5, text: "Puccess Way Dual Time is a lifesaver for scheduling meetings with my overseas clients. Beautiful build.", day: 23 },
  { name: "Fatima Noor", city: "Sargodha", rating: 5, text: "Ordered both Murooj perfume and Rolex Oyster watch. Dono items premium clay packaging me safely deliver huay.", day: 24 },
  { name: "Omair Hassan", city: "Abbottabad", rating: 5, text: "Universe Point Steel Edition has solid stainless steel weight. Doesn't feel cheap or hollow like local market copies.", day: 25 },
  { name: "Mahnoor Shah", city: "Karachi", rating: 5, text: "Hawajes EDP is genuine EDP concentration. 6 sprays lasted through my 10-hour university shift.", day: 26 },
  { name: "Rehan Butt", city: "Lahore", rating: 5, text: "Rolex Oyster Perpetual III has that minimalist clean dial jo jeans aur formal dono pe zabardast lagta hai.", day: 27 },
  { name: "Anum Zehra", city: "Islamabad", rating: 5, text: "Murooj perfume + Cartier watch combo order. Packing secure thi aur WhatsApp support bohot cooperative tha.", day: 28 },
  { name: "Zeeshan Haider", city: "Quetta", rating: 5, text: "Quetta me 3 din me parcel receive hua. Safe transit and exact watch picture jaisi thi.", day: 29 },
  { name: "Alishba Nadeem", city: "Lahore", rating: 5, text: "Zargul Collection has set the new standard for luxury accessories in Pakistan. Will definitely buy again!", day: 30 }
];
let REVIEWS = [...FALLBACK_REVIEWS];

// --- DYNAMIC STORE CONFIGURATION ---
let STORE_CONFIG = {
  announcement: {
    enabled: true,
    text: "🔥 Limited Time Offer: Flat 20% OFF on Luxury Watches & Eau de Parfums + Free Nationwide Delivery!"
  },
  whatsappNumber: "923485245955",
  deliveryFee: 0,
  freeDeliveryThreshold: 0,
  comboDeal: {
    enabled: true,
    discountAmount: 1000
  },
  adminPin: "2026"
};

async function loadStoreData() {
  // 1. Check local storage override first (for instant client preview on device)
  try {
    const localConfig = localStorage.getItem("zargul_store_config");
    if (localConfig) {
      STORE_CONFIG = Object.assign(STORE_CONFIG, JSON.parse(localConfig));
      if (STORE_CONFIG.reviews && STORE_CONFIG.reviews.length > 0) {
        REVIEWS = STORE_CONFIG.reviews;
      }
    }
    const localProducts = localStorage.getItem("zargul_products");
    if (localProducts) {
      PRODUCTS = JSON.parse(localProducts);
    }
  } catch(e) {
    console.warn("Local storage check error", e);
  }

  // 2. Fetch live JSON files (for public visitors or if no localStorage override)
  try {
    const [prodRes, confRes] = await Promise.all([
      fetch("products.json?v=" + Date.now()).catch(() => null),
      fetch("store-config.json?v=" + Date.now()).catch(() => null)
    ]);

    if (confRes && confRes.ok) {
      const remoteConfig = await confRes.json();
      if (!localStorage.getItem("zargul_store_config")) {
        STORE_CONFIG = remoteConfig;
        if (remoteConfig.reviews && remoteConfig.reviews.length > 0) {
          REVIEWS = remoteConfig.reviews;
        }
      }
    }

    if (prodRes && prodRes.ok) {
      const remoteProducts = await prodRes.json();
      if (!localStorage.getItem("zargul_products")) {
        PRODUCTS = remoteProducts;
      }
    }
  } catch(e) {
    console.log("Using cached/fallback store data", e);
  }
}

function initAnnouncementBar() {
  if (!STORE_CONFIG.announcement || !STORE_CONFIG.announcement.enabled) return;
  if (document.getElementById("top-announcement-bar")) return;

  const bar = document.createElement("div");
  bar.className = "top-announcement-bar";
  bar.id = "top-announcement-bar";
  bar.innerHTML = `
    <span class="announcement-text">${STORE_CONFIG.announcement.text}</span>
    <button class="announcement-close" onclick="document.getElementById('top-announcement-bar').remove()" aria-label="Close Announcement">✕</button>
  `;
  document.body.prepend(bar);
}

// --- APP STATE WITH PERSISTENT CART ---
let cart = [];
try {
  const savedCart = localStorage.getItem("zargul_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  cart = [];
}

let currentFilter = "all";
let currentSearchQuery = "";
let currentSort = "featured";

// Quick View State
let currentQVProduct = null;
let currentQVVariant = "";
let currentQVExtraPrice = 0;

// --- DOM ELEMENTS ---
const productsGrid = document.getElementById("products-grid");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartOverlay = document.getElementById("cart-overlay");
const cartDrawer = document.getElementById("cart-drawer");
const cartCountBadge = document.getElementById("cart-count");
const toastContainer = document.getElementById("toast-container");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const header = document.getElementById("header");
const searchBtn = document.getElementById("search-btn");
const catalogSearchInput = document.getElementById("catalog-search");
const catalogSortSelect = document.getElementById("catalog-sort");
const productCountBadge = document.getElementById("product-count");

// --- INITIALIZE APPLICATION ---
document.addEventListener("DOMContentLoaded", async () => {
  // 0. Load Dynamic Catalog & Store Settings (localStorage override or products.json/store-config.json)
  await loadStoreData();

  // 1. Initialize DOM modules (Top Announcement Ribbon, Quick View, COD Checkout, Search Modal, Social Proof Toast, Combo Banner)
  initAnnouncementBar();
  initQuickViewModal();
  initCODCheckoutView();
  initSearchModal();
  initSocialProofToast();
  initRoyalComboBanner();

  // 2. Check URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("category");
  if (catParam) {
    currentFilter = catParam;
  }

  // 3. Render content
  renderProducts(currentFilter);
  renderReviews();
  setupEventListeners();
  updateCartUI();

  // 4. Sync active category button if present
  if (catParam) {
    const filterBtns = document.querySelectorAll(".filter-bar .filter-btn");
    filterBtns.forEach(btn => {
      if (btn.innerText.toLowerCase().includes(catParam.toLowerCase())) {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      }
    });
  }
});

// ================================================================
// 1. PRODUCT QUICK-VIEW MODAL + VARIANT SELECTOR
// ================================================================

function initQuickViewModal() {
  if (document.getElementById("quickview-overlay")) return;

  const overlay = document.createElement("div");
  overlay.className = "quickview-overlay";
  overlay.id = "quickview-overlay";
  overlay.innerHTML = `
    <div class="quickview-modal clay-card white" id="quickview-modal">
      <button class="clay-icon-btn quickview-close-btn" id="close-quickview-btn" aria-label="Close Preview">✕</button>
      
      <div class="quickview-img-box">
        <img id="qv-img" src="" alt="Product Preview">
      </div>

      <div class="quickview-details">
        <div>
          <div class="quickview-meta-row">
            <span class="product-badge sale" id="qv-badge">New</span>
            <span class="clay-stock-badge"><span class="stock-pulse"></span> Only 3 Left in Stock!</span>
          </div>
          <h2 class="quickview-title" id="qv-title" style="margin-top: 10px;"></h2>
          <div class="quickview-price-row" style="margin-top: 6px;">
            <span class="quickview-current-price" id="qv-price"></span>
            <span class="quickview-original-price" id="qv-original-price"></span>
          </div>
        </div>

        <div class="quickview-specs-panel">
          <div class="quickview-specs-title">Luxury Specifications</div>
          <p class="quickview-specs-list" id="qv-specs"></p>
        </div>

        <div class="variant-selection-group">
          <span class="variant-label" id="qv-variant-label">Select Option</span>
          <div class="variant-pills-row" id="qv-variant-pills"></div>
        </div>

        <button class="clay-btn accent" id="qv-add-btn" style="width: 100%;">
          Add to Bag ✦
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Close handlers
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeQuickView();
  });
  const closeBtn = overlay.querySelector("#close-quickview-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeQuickView);

  const addBtn = overlay.querySelector("#qv-add-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (currentQVProduct) {
        addToBag(currentQVProduct.id, currentQVVariant, currentQVExtraPrice);
        closeQuickView();
      }
    });
  }
}

window.openQuickView = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentQVProduct = product;
  const overlay = document.getElementById("quickview-overlay");
  if (!overlay) return;

  const img = document.getElementById("qv-img");
  const title = document.getElementById("qv-title");
  const price = document.getElementById("qv-price");
  const originalPrice = document.getElementById("qv-original-price");
  const badge = document.getElementById("qv-badge");
  const specs = document.getElementById("qv-specs");
  const variantLabel = document.getElementById("qv-variant-label");
  const pillsContainer = document.getElementById("qv-variant-pills");

  img.src = product.image;
  img.alt = product.title;
  title.innerText = product.title;
  price.innerText = `Rs. ${product.price.toLocaleString()}`;
  
  if (product.originalPrice) {
    originalPrice.style.display = "inline";
    originalPrice.innerText = `Rs. ${product.originalPrice.toLocaleString()}`;
  } else {
    originalPrice.style.display = "none";
  }

  if (product.tag) {
    badge.style.display = "inline-block";
    badge.innerText = product.tag;
    badge.className = `product-badge ${product.badgeType || 'new'}`;
  } else {
    badge.style.display = "none";
  }

  // Stock status handling
  const isSoldOut = product.inStock === false;
  const stockBadge = overlay.querySelector(".clay-stock-badge");
  const addBtn = document.getElementById("qv-add-btn");

  if (stockBadge) {
    if (isSoldOut) {
      stockBadge.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#b71c1c;margin-right:6px;"></span> Sold Out / Out of Stock`;
      stockBadge.style.color = "#b71c1c";
    } else {
      stockBadge.innerHTML = `<span class="stock-pulse"></span> Only 3 Left in Stock!`;
      stockBadge.style.color = "";
    }
  }

  if (addBtn) {
    if (isSoldOut) {
      addBtn.disabled = true;
      addBtn.innerText = "Sold Out ✕";
      addBtn.style.opacity = "0.5";
      addBtn.style.cursor = "not-allowed";
    } else {
      addBtn.disabled = false;
      addBtn.innerText = "Add to Bag ✦";
      addBtn.style.opacity = "1";
      addBtn.style.cursor = "pointer";
    }
  }

  // Category specifications
  if (product.category === "Fragrances") {
    specs.innerText = "Volume: 100ml Eau de Parfum • Sillage: Heavy/Invigorating • Longevity: 12-16+ Hours • Origin: Fine French & Oriental Extracts";
  } else if (product.category === "Shoes") {
    specs.innerText = "Material: Hand-Finished Matte Clay Leather • Insole: Ortho-Comfort Cushion • Sole: Anti-Slip Rubber • Style: Oxford Brogue";
  } else if (product.category === "Wascot") {
    specs.innerText = "Fabric: Tactile Wool Blend • Lining: Pure Silk Satin • Cut: Modern Slim Fit • Craft: Master Tailored";
  } else {
    specs.innerText = "Movement: Quartz Chronograph • Case: 316L Solid Stainless Steel • Bezel: Scratch-Resistant Matte Finish • Water Resistance: 3ATM • Warranty: 1 Year";
  }

  // Dynamic variants
  pillsContainer.innerHTML = "";
  let variantsList = [];

  if (product.category === "Shoes") {
    variantLabel.innerText = "Select Footwear Size (EU)";
    variantsList = [
      { name: "Size 40", extra: 0 },
      { name: "Size 41", extra: 0 },
      { name: "Size 42 (Standard)", extra: 0 },
      { name: "Size 43", extra: 0 },
      { name: "Size 44", extra: 0 }
    ];
  } else if (product.category === "Wascot") {
    variantLabel.innerText = "Select Size";
    variantsList = [
      { name: "Small (S)", extra: 0 },
      { name: "Medium (M)", extra: 0 },
      { name: "Large (L)", extra: 0 },
      { name: "X-Large (XL)", extra: 0 }
    ];
  } else if (product.category === "Fragrances") {
    variantLabel.innerText = "Select Packaging Option";
    variantsList = [
      { name: "100ml Standard Box", extra: 0 },
      { name: "Luxury Gift Wrapped (+Rs. 300)", extra: 300 }
    ];
  } else {
    variantLabel.innerText = "Select Presentation Box";
    variantsList = [
      { name: "Standard Box (Included)", extra: 0 },
      { name: "Royal Velvet Gift Box (+Rs. 500)", extra: 500 }
    ];
  }

  // Default selection
  currentQVVariant = variantsList[0].name;
  currentQVExtraPrice = variantsList[0].extra;

  variantsList.forEach((v, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `variant-pill-btn ${index === 0 ? 'active' : ''}`;
    btn.innerText = v.name;
    btn.addEventListener("click", () => {
      pillsContainer.querySelectorAll(".variant-pill-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentQVVariant = v.name;
      currentQVExtraPrice = v.extra;
      
      const calcPrice = product.price + v.extra;
      price.innerText = `Rs. ${calcPrice.toLocaleString()}`;
    });
    pillsContainer.appendChild(btn);
  });

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

function closeQuickView() {
  const overlay = document.getElementById("quickview-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// ================================================================
// 2. CASH ON DELIVERY (COD) CHECKOUT DRAWER
// ================================================================

function initCODCheckoutView() {
  if (!cartDrawer) return;

  // Check if drawer already contains views wrapper
  if (document.getElementById("cart-views-wrapper")) return;

  const header = cartDrawer.querySelector(".cart-header");
  const itemsContainer = document.getElementById("cart-items-container");
  const summary = cartDrawer.querySelector(".cart-summary");

  if (!itemsContainer || !summary) return;

  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "cart-views-wrapper";
  wrapper.id = "cart-views-wrapper";

  // View 1: Items
  const view1 = document.createElement("div");
  view1.className = "cart-view active";
  view1.id = "cart-view-items";
  view1.appendChild(itemsContainer);
  view1.appendChild(summary);

  // View 2: COD Checkout Form
  const view2 = document.createElement("div");
  view2.className = "cart-view";
  view2.id = "cart-view-checkout";
  view2.innerHTML = `
    <div style="padding-bottom: 8px;">
      <button type="button" class="checkout-back-btn" onclick="backToCartStep()">
        ← Back to Shopping Bag
      </button>
    </div>

    <div class="cod-form-container">
      <div class="payment-method-card">
        <span style="font-size: 1.3rem;">🛡️</span>
        <div>
          <span>Cash on Delivery (COD)</span>
          <p style="font-size: 0.75rem; color: #356b1a; margin: 0;">Pay in cash when parcel reaches your doorstep</p>
        </div>
      </div>

      <form id="cod-checkout-form" onsubmit="submitCODOrder(event)">
        <div class="cod-field-group">
          <label for="cod-name">Full Name *</label>
          <input type="text" id="cod-name" class="cod-input" placeholder="e.g. Daniyal Tariq" required>
        </div>

        <div class="cod-field-group">
          <label for="cod-phone">Active WhatsApp Phone *</label>
          <input type="tel" id="cod-phone" class="cod-input" placeholder="e.g. 0348 1234567" required>
        </div>

        <div class="cod-field-group">
          <label for="cod-city">City *</label>
          <select id="cod-city" class="cod-select" required>
            <option value="" disabled selected>Select Your City</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Multan">Multan</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Quetta">Quetta</option>
            <option value="Gujranwala">Gujranwala</option>
            <option value="Sialkot">Sialkot</option>
            <option value="Swat">Swat</option>
            <option value="Other">Other City (All Pakistan)</option>
          </select>
        </div>

        <div class="cod-field-group">
          <label for="cod-address">Complete Street Address & Landmark *</label>
          <input type="text" id="cod-address" class="cod-input" placeholder="House #, Street, Block, Area, Nearest Landmark" required>
        </div>

        <div class="cod-field-group">
          <label for="cod-notes">Order Notes (Optional)</label>
          <input type="text" id="cod-notes" class="cod-input" placeholder="e.g. Please call before arrival">
        </div>

        <div style="background: var(--pastel-pink); padding: 12px 16px; border-radius: 16px; margin: 16px 0;">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 700; color: var(--color-text-dark);">
            <span>Total Payable on Delivery:</span>
            <span id="cod-total-payable">Rs. 0</span>
          </div>
          <p style="font-size: 0.72rem; color: var(--color-text-muted); margin-top: 4px;">Free Nationwide Shipping • 7 Days Return/Exchange</p>
        </div>

        <button type="submit" class="clay-btn accent" style="width: 100%;">
          Confirm COD Order via WhatsApp ✦
        </button>
      </form>
    </div>
  `;

  wrapper.appendChild(view1);
  wrapper.appendChild(view2);
  cartDrawer.appendChild(wrapper);

  // Override standard checkout button click to switch to COD view
  const oldCheckoutBtn = document.getElementById("checkout-btn");
  if (oldCheckoutBtn) {
    oldCheckoutBtn.innerText = "Proceed to Shipping & COD Details →";
    oldCheckoutBtn.onclick = function(e) {
      e.preventDefault();
      if (cart.length === 0) return;
      openCheckoutStep();
    };
  }
}

window.openCheckoutStep = function() {
  const v1 = document.getElementById("cart-view-items");
  const v2 = document.getElementById("cart-view-checkout");
  if (v1 && v2) {
    v1.classList.remove("active");
    v2.classList.add("active");
  }
};

window.backToCartStep = function() {
  const v1 = document.getElementById("cart-view-items");
  const v2 = document.getElementById("cart-view-checkout");
  if (v1 && v2) {
    v2.classList.remove("active");
    v1.classList.add("active");
  }
};

window.submitCODOrder = function(event) {
  event.preventDefault();
  if (cart.length === 0) return;

  const name = document.getElementById("cod-name").value.trim();
  const phone = document.getElementById("cod-phone").value.trim();
  const city = document.getElementById("cod-city").value;
  const address = document.getElementById("cod-address").value.trim();
  const notes = document.getElementById("cod-notes").value.trim() || "None";

  // Generate unique Order ID
  const orderId = `#ZRG-${Math.floor(1000 + Math.random() * 9000)}`;

  // Calculate totals and combo discount
  let subtotal = 0;
  cart.forEach(item => {
    const itemPrice = item.product.price + (item.extraPrice || 0);
    subtotal += itemPrice * item.quantity;
  });

  const hasWatch = cart.some(item => item.product.category === "Timepieces");
  const hasPerfume = cart.some(item => item.product.category === "Fragrances");
  const isComboEnabled = STORE_CONFIG.comboDeal?.enabled !== false;
  const comboDiscountAmount = STORE_CONFIG.comboDeal?.discountAmount || 1000;
  const isCombo = isComboEnabled && hasWatch && hasPerfume;
  const comboDiscount = isCombo ? comboDiscountAmount : 0;
  const deliveryFee = STORE_CONFIG.deliveryFee || 0;
  const finalTotal = Math.max(0, subtotal - comboDiscount + deliveryFee);

  // Save order to localStorage
  try {
    const orders = JSON.parse(localStorage.getItem("zargul_orders") || "[]");
    orders.unshift({
      orderId,
      date: new Date().toISOString(),
      customer: { name, phone, city, address, notes },
      items: cart,
      subtotal,
      comboDiscount,
      deliveryFee,
      total: finalTotal,
      status: "Pending Confirmation"
    });
    localStorage.setItem("zargul_orders", JSON.stringify(orders));
  } catch (e) {
    console.warn("Orders storage error", e);
  }

  // Construct Invoice Message for WhatsApp
  let message = `🛍️ *NEW CASH ON DELIVERY (COD) ORDER*\n`;
  message += `*Order ID:* ${orderId}\n`;
  message += `*Date:* ${new Date().toLocaleDateString('en-GB')}\n\n`;

  message += `👤 *CUSTOMER DETAILS:*\n`;
  message += `• Name: ${name}\n`;
  message += `• WhatsApp: ${phone}\n`;
  message += `• City: ${city}\n`;
  message += `• Delivery Address: ${address}\n`;
  message += `• Order Notes: ${notes}\n`;
  message += `• Payment Mode: Cash on Delivery (COD)\n\n`;

  message += `📦 *ORDERED ITEMS:*\n`;
  cart.forEach((item, index) => {
    const itemPrice = (item.product.price + (item.extraPrice || 0)) * item.quantity;
    const variantStr = item.variant ? `\n   Option: ${item.variant}` : "";
    message += `${index + 1}. *${item.product.title}* (${item.quantity}x)${variantStr}\n   Price: Rs. ${itemPrice.toLocaleString()}\n`;
  });

  message += `\n💰 *PRICE BREAKDOWN:*\n`;
  message += `• Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
  if (comboDiscount > 0) {
    message += `• 👑 Royal Combo Discount: -Rs. ${comboDiscount.toLocaleString()} (🎉 Applied)\n`;
  }
  message += `• Delivery Fee: ${deliveryFee === 0 ? "FREE Nationwide 🇵🇰" : "Rs. " + deliveryFee.toLocaleString()}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🔥 *TOTAL PAYABLE:* Rs. ${finalTotal.toLocaleString()} (Cash on Delivery)\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `Please confirm my order dispatch! ✨`;

  showToast(`Order ${orderId} created! Opening WhatsApp...`);

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();
  backToCartStep();
  closeCartDrawer();

  const targetWhatsApp = (STORE_CONFIG.whatsappNumber || "923485245955").replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${targetWhatsApp}?text=${encodedMsg}`;

  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
  }, 700);
};

// ================================================================
// 3. SMART ROYAL COMBO BUILDER
// ================================================================

function initRoyalComboBanner() {
  // Only inject banner on pages that have products grid or category banner
  const target = document.getElementById("featured-products") || document.querySelector(".products-section");
  if (!target || document.querySelector(".royal-combo-banner")) return;

  const banner = document.createElement("div");
  banner.className = "royal-combo-banner clay-card pink";
  banner.innerHTML = `
    <div class="combo-content">
      <div class="combo-icon-circle">👑</div>
      <div class="combo-text">
        <h3>Royal Gift Combo Offer</h3>
        <p>Buy <strong>Any Luxury Watch + Any Fragrance Together</strong> & get <strong>Instant Rs. 1,000 OFF</strong> + Free Gift Box!</p>
      </div>
    </div>
    <a href="categories.html" class="clay-btn accent">Build Your Combo →</a>
  `;

  target.parentNode.insertBefore(banner, target);
}

// ================================================================
// 4. LIVE SOCIAL PROOF POPUP (URGENCY ENGINE)
// ================================================================

function initSocialProofToast() {
  if (document.getElementById("social-proof-toast")) return;

  const toast = document.createElement("div");
  toast.className = "social-proof-toast";
  toast.id = "social-proof-toast";
  toast.innerHTML = `
    <div class="social-proof-icon">🛍️</div>
    <div class="social-proof-content">
      <p class="social-proof-title" id="sp-title">Daniyal from Islamabad just ordered</p>
      <span class="social-proof-time" id="sp-time">Rolex Submariner (Rs. 4,500) • 2 mins ago</span>
    </div>
    <button class="social-proof-close" onclick="dismissSocialProof()" aria-label="Dismiss">✕</button>
  `;

  document.body.appendChild(toast);

  const purchaseFeed = [
    { buyer: "Daniyal", city: "Islamabad", item: "Rolex Submariner Edition I", price: "Rs. 4,500", time: "2 mins ago" },
    { buyer: "Ayesha", city: "Lahore", item: "Hawajes Eau de Parfum", price: "Rs. 4,000", time: "Just now" },
    { buyer: "Hamza", city: "Karachi", item: "Bugatti Chronograph Sport", price: "Rs. 8,000", time: "4 mins ago" },
    { buyer: "Zainab", city: "Rawalpindi", item: "Murooj Caliph Luxury EDP", price: "Rs. 4,000", time: "1 min ago" },
    { buyer: "Usman", city: "Faisalabad", item: "Cartier Santos Classic Watch", price: "Rs. 4,000", time: "3 mins ago" },
    { buyer: "Farhan", city: "Peshawar", item: "Joyous S-PRO 8 AM EDP", price: "Rs. 4,000", time: "Just now" },
    { buyer: "Talha", city: "Multan", item: "Hublot Classic Fusion", price: "Rs. 4,000", time: "5 mins ago" },
    { buyer: "Shahzaib", city: "Islamabad", item: "Royal Combo (Watch + Hawajes)", price: "Rs. 7,500", time: "Just now" },
    { buyer: "Arham", city: "Gujranwala", item: "BestWin Chronograph", price: "Rs. 4,500", time: "2 mins ago" }
  ];

  let feedIdx = 0;

  function showNextPurchase() {
    const item = purchaseFeed[feedIdx];
    feedIdx = (feedIdx + 1) % purchaseFeed.length;

    const titleEl = document.getElementById("sp-title");
    const timeEl = document.getElementById("sp-time");
    if (titleEl && timeEl) {
      titleEl.innerText = `${item.buyer} from ${item.city} just ordered`;
      timeEl.innerText = `${item.item} (${item.price}) • ${item.time}`;
    }

    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 6000);
  }

  // Start after 4s, rotate every 18s
  setTimeout(() => {
    showNextPurchase();
    setInterval(showNextPurchase, 18000);
  }, 4000);
}

window.dismissSocialProof = function() {
  const toast = document.getElementById("social-proof-toast");
  if (toast) toast.classList.remove("show");
};

// ================================================================
// 5. INSTANT SEARCH OVERLAY / MODAL
// ================================================================

function initSearchModal() {
  if (document.getElementById("search-overlay")) return;

  const overlay = document.createElement("div");
  overlay.className = "search-overlay";
  overlay.id = "search-overlay";
  overlay.innerHTML = `
    <div class="search-modal-container clay-card white">
      <div class="search-header-row">
        <h3>Instant Catalog Search</h3>
        <button class="clay-icon-btn" id="close-search-btn" aria-label="Close Search">✕</button>
      </div>

      <div class="search-modal-input-box">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-accent);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="instant-search-input" placeholder="Type Rolex, Hawajes, Murooj, Bugatti, or price...">
      </div>

      <div class="search-quick-chips">
        <span class="search-chip" onclick="searchByChip('All')">All Creations</span>
        <span class="search-chip" onclick="searchByChip('Under Rs. 4,000')">Under Rs. 4,000</span>
        <span class="search-chip" onclick="searchByChip('Rolex')">Rolex Series</span>
        <span class="search-chip" onclick="searchByChip('Hawajes')">Hawajes EDP</span>
        <span class="search-chip" onclick="searchByChip('Murooj')">Murooj EDP</span>
        <span class="search-chip" onclick="searchByChip('Sale')">20% OFF Sale</span>
      </div>

      <div class="search-results-list" id="search-results-list">
        <!-- Live Search Items Rendered Here -->
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Close handlers
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeSearchModal();
  });
  const closeBtn = overlay.querySelector("#close-search-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeSearchModal);

  const input = overlay.querySelector("#instant-search-input");
  if (input) {
    input.addEventListener("input", (e) => {
      renderInstantSearchResults(e.target.value);
    });
  }
}

window.openSearchModal = function() {
  const overlay = document.getElementById("search-overlay");
  if (overlay) {
    overlay.classList.add("open");
    const input = document.getElementById("instant-search-input");
    if (input) {
      input.focus();
      renderInstantSearchResults(input.value);
    }
    document.body.style.overflow = "hidden";
  }
};

window.closeSearchModal = function() {
  const overlay = document.getElementById("search-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
};

window.searchByChip = function(query) {
  const input = document.getElementById("instant-search-input");
  if (query === "All") {
    if (input) input.value = "";
    renderInstantSearchResults("");
  } else if (query === "Under Rs. 4,000") {
    if (input) input.value = "under 4000";
    renderInstantSearchResults("under 4000");
  } else {
    if (input) input.value = query;
    renderInstantSearchResults(query);
  }
};

function renderInstantSearchResults(query = "") {
  const container = document.getElementById("search-results-list");
  if (!container) return;

  const q = query.toLowerCase().trim();
  let results = PRODUCTS;

  if (q === "under 4000") {
    results = PRODUCTS.filter(p => p.price <= 4000);
  } else if (q !== "") {
    results = PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  }

  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--color-text-muted); padding: 30px 0;">No matching luxury creations found for "${query}".</p>`;
    return;
  }

  results.forEach(product => {
    const item = document.createElement("div");
    item.className = "search-result-item";
    item.innerHTML = `
      <div class="search-result-left">
        <div class="search-result-thumb">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="search-result-info">
          <h4>${product.title}</h4>
          <span>Rs. ${product.price.toLocaleString()}</span>
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="clay-btn secondary" style="padding: 6px 14px; font-size: 0.78rem;" onclick="closeSearchModal(); openQuickView(${product.id});">
          Quick View
        </button>
        <button class="clay-btn accent" style="padding: 6px 14px; font-size: 0.78rem;" onclick="closeSearchModal(); addToBag(${product.id});">
          + Add
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

// ================================================================
// PRODUCTS GRID RENDERING
// ================================================================

function renderProducts(filter = currentFilter) {
  if (!productsGrid) return;
  productsGrid.innerHTML = "";

  const catMap = {
    'perfumes': 'fragrances',
    'fragrances': 'fragrances',
    'watches': 'timepieces',
    'timepieces': 'timepieces',
    'bags': 'leather bags',
    'leather bags': 'leather bags',
    'shoes': 'shoes',
    'wascot': 'wascot',
    'sale': 'sale',
    'all': 'all'
  };
  const normalizedFilter = catMap[filter.toLowerCase()] || filter.toLowerCase();

  let filtered = [...PRODUCTS];

  // 1. Category Filter
  if (normalizedFilter !== "all") {
    if (normalizedFilter === "sale") {
      filtered = filtered.filter(p => p.tag === "20% OFF" || p.tag === "Sale" || p.badgeType === "sale");
    } else {
      filtered = filtered.filter(p => p.category.toLowerCase() === normalizedFilter);
    }
  }

  // 2. Search Query Filter
  if (currentSearchQuery.trim() !== "") {
    const q = currentSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      (p.tag && p.tag.toLowerCase().includes(q))
    );
  }

  // 3. Sort Filter
  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (productCountBadge) {
    productCountBadge.innerText = `Showing ${filtered.length} Creations`;
  }

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p class="empty-cart-message">No creations found matching your selection.</p>
        <button onclick="resetFilters()" class="clay-btn secondary" style="margin-top: 18px; font-size: 0.85rem;">View All Creations</button>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const isSoldOut = product.inStock === false;
    const card = document.createElement("div");
    card.className = `product-card clay-card white ${isSoldOut ? 'sold-out' : ''}`;
    
    let badgeHtml = "";
    if (isSoldOut) {
      badgeHtml = `<span class="product-badge sold-out">Sold Out</span>`;
    } else if (product.tag) {
      badgeHtml = `<span class="product-badge ${product.badgeType || 'sale'}">${product.tag}</span>`;
    }

    let priceHtml = "";
    if (product.originalPrice) {
      priceHtml = `
        <span class="product-price-original">Rs. ${product.originalPrice.toLocaleString()}</span>
        Rs. ${product.price.toLocaleString()}
      `;
    } else {
      priceHtml = `Rs. ${product.price.toLocaleString()}`;
    }

    const actionBtn = isSoldOut
      ? `<button class="add-to-cart-btn" disabled title="Sold Out" style="background: #e2dbdf !important; color: #8c8288 !important; cursor: not-allowed;"><span style="font-size: 0.68rem; font-weight: 700;">SOLD</span></button>`
      : `<button class="add-to-cart-btn" aria-label="Add ${product.title} to bag" onclick="openQuickView(${product.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>`;

    card.innerHTML = `
      <button class="product-card-quickview-btn" onclick="openQuickView(${product.id})">Quick View ✦</button>
      ${badgeHtml}
      <div class="product-image-container ${product.cardBg || 'white'}" onclick="openQuickView(${product.id})" style="cursor: pointer;">
        <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
      </div>
      <div class="product-details">
        <div class="product-meta">
          <span class="product-category">${product.category}</span>
          <div class="product-rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${product.rating}</span>
          </div>
        </div>
        <h3 class="product-title" onclick="openQuickView(${product.id})" style="cursor: pointer;">${product.title}</h3>
        <div class="product-footer">
          <div class="product-price">
            ${priceHtml}
          </div>
          ${actionBtn}
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

window.resetFilters = function() {
  currentFilter = "all";
  currentSearchQuery = "";
  if (catalogSearchInput) catalogSearchInput.value = "";
  const filterBtns = document.querySelectorAll(".filter-bar .filter-btn");
  filterBtns.forEach(btn => btn.classList.remove("active"));
  const allBtn = document.querySelector(".filter-bar .filter-btn");
  if (allBtn) allBtn.classList.add("active");
  renderProducts("all");
};

window.filterProducts = function(category, buttonEl) {
  currentFilter = category;
  renderProducts(category);

  const filterBtns = document.querySelectorAll(".filter-bar .filter-btn");
  filterBtns.forEach(btn => btn.classList.remove("active"));
  if (buttonEl) buttonEl.classList.add("active");
};

window.filterCategory = function(category) {
  if (!productsGrid && !document.getElementById("featured-products")) {
    window.location.href = `categories.html?category=${encodeURIComponent(category.toLowerCase())}`;
    return;
  }

  const catMap = {
    'perfumes': 'Fragrances',
    'fragrances': 'Fragrances',
    'watches': 'Timepieces',
    'timepieces': 'Timepieces',
    'bags': 'Leather Bags',
    'leather bags': 'Leather Bags',
    'shoes': 'Shoes',
    'wascot': 'Wascot',
    'sale': 'Sale',
    'all': 'all'
  };
  const normalized = catMap[category.toLowerCase()] || category;

  const filterBtns = document.querySelectorAll(".filter-bar .filter-btn");
  let found = false;
  
  filterBtns.forEach(btn => {
    if (btn.innerText.toLowerCase().includes(normalized.toLowerCase())) {
      filterProducts(normalized, btn);
      found = true;
    }
  });

  if (!found) {
    filterBtns.forEach(btn => btn.classList.remove("active"));
    renderProducts(normalized);
  }

  const productsSection = document.getElementById("featured-products");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
};

// ================================================================
// REVIEWS RENDERING
// ================================================================

function renderReviews() {
  const row1 = document.getElementById("marquee-row-1");
  const row2 = document.getElementById("marquee-row-2");
  const reviewsGrid = document.getElementById("reviews-grid");

  function buildCard(r) {
    const card = document.createElement("div");
    card.className = "marquee-card clay-card white";

    let starsHtml = "";
    for (let i = 0; i < r.rating; i++) {
      starsHtml += `<svg width="15" height="15" viewBox="0 0 24 24" fill="#ffb400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }

    card.innerHTML = `
      <div class="review-header">
        <div class="review-user">
          <div class="user-avatar" style="background-color: var(--pastel-pink);">${r.name.charAt(0)}</div>
          <div>
            <h4 class="user-name">${r.name}</h4>
            <span class="review-city-badge">✦ ${r.city}</span>
          </div>
        </div>
        <div class="review-stars">${starsHtml}</div>
      </div>
      <p class="review-text">"${r.text}"</p>
    `;
    return card;
  }

  if (row1 && row2) {
    row1.innerHTML = "";
    row2.innerHTML = "";

    const half = Math.ceil(REVIEWS.length / 2);
    const track1 = [...REVIEWS.slice(0, half), ...REVIEWS.slice(0, half)];
    const track2 = [...REVIEWS.slice(half), ...REVIEWS.slice(half)];

    track1.forEach(r => row1.appendChild(buildCard(r)));
    track2.forEach(r => row2.appendChild(buildCard(r)));
  }

  if (reviewsGrid && !row1) {
    reviewsGrid.innerHTML = "";
    REVIEWS.slice(0, 6).forEach(r => reviewsGrid.appendChild(buildCard(r)));
  }
}

// ================================================================
// PERSISTENT CART LOGIC + ROYAL COMBO DISCOUNT
// ================================================================

function saveCart() {
  try {
    localStorage.setItem("zargul_cart", JSON.stringify(cart));
  } catch (e) {
    console.warn("Storage error", e);
  }
}

window.addToBag = function(productId, variant = "", extraPrice = 0) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Look for existing item matching both product id AND variant
  const existingItem = cart.find(item => item.product.id === productId && (item.variant || "") === (variant || ""));
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1, variant, extraPrice });
  }

  saveCart();
  showToast(`Added ${product.title} to your bag!`);
  updateCartUI();
  openCartDrawer();
};

function updateCartQty(index, change) {
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(index) {
  if (cart[index]) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountBadge) {
    cartCountBadge.innerText = totalItems;
    cartCountBadge.style.display = totalItems > 0 ? "flex" : "none";
  }

  const itemsContainer = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const codTotalPayable = document.getElementById("cod-total-payable");

  if (!itemsContainer) return;
  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-cart-message">
        <p>Your bag is currently empty.</p>
        <a href="categories.html" onclick="closeCartDrawer()" class="clay-btn secondary" style="margin-top: 20px; font-size: 0.8rem; padding: 10px 20px;">Explore Collection</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = "Rs. 0";
    if (totalEl) totalEl.innerText = "Rs. 0";
    if (codTotalPayable) codTotalPayable.innerText = "Rs. 0";
    if (checkoutBtn) checkoutBtn.disabled = true;

    // Remove combo discount row if present
    const existingComboRow = document.getElementById("cart-combo-row");
    if (existingComboRow) existingComboRow.remove();
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;

  // Calculate Subtotal with variants
  let subtotal = 0;
  cart.forEach((item, index) => {
    const itemPrice = item.product.price + (item.extraPrice || 0);
    subtotal += itemPrice * item.quantity;

    const variantBadge = item.variant ? `<div style="font-size: 0.72rem; color: var(--color-accent); font-weight: 600; margin-top: 2px;">• ${item.variant}</div>` : '';

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item clay-card white";
    itemEl.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.product.image}" alt="${item.product.title}">
      </div>
      <div class="cart-item-details">
        <div>
          <h4 class="cart-item-title">${item.product.title}</h4>
          <span class="cart-item-price">Rs. ${itemPrice.toLocaleString()}</span>
          ${variantBadge}
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" aria-label="Decrease quantity" onclick="updateCartQty(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" aria-label="Increase quantity" onclick="updateCartQty(${index}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" aria-label="Remove item" onclick="removeFromCart(${index})">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      </button>
    `;
    itemsContainer.appendChild(itemEl);
  });

  // Check Royal Combo Discount logic (Watch + Perfume)
  const hasWatch = cart.some(item => item.product.category === "Timepieces");
  const hasPerfume = cart.some(item => item.product.category === "Fragrances");
  const isComboEnabled = STORE_CONFIG.comboDeal?.enabled !== false;
  const comboDiscountAmount = STORE_CONFIG.comboDeal?.discountAmount || 1000;
  const isCombo = isComboEnabled && hasWatch && hasPerfume;
  const comboDiscount = isCombo ? comboDiscountAmount : 0;
  const deliveryFee = STORE_CONFIG.deliveryFee || 0;
  const finalTotal = Math.max(0, subtotal - comboDiscount + deliveryFee);

  // Update Delivery display
  const deliveryEl = document.getElementById("cart-delivery");
  if (deliveryEl) {
    deliveryEl.innerText = (deliveryFee === 0) ? "Free" : `Rs. ${deliveryFee.toLocaleString()}`;
  }

  // Manage Combo Badge in items view
  let comboBadge = document.getElementById("cart-combo-badge");
  if (isCombo) {
    if (!comboBadge) {
      comboBadge = document.createElement("div");
      comboBadge.className = "combo-unlocked-badge";
      comboBadge.id = "cart-combo-badge";
      itemsContainer.prepend(comboBadge);
    }
    comboBadge.innerHTML = `<span>🎉</span> <span>Royal Combo Unlocked! -Rs. ${comboDiscountAmount.toLocaleString()} Saved!</span>`;
  } else if (comboBadge) {
    comboBadge.remove();
  }

  // Manage Combo Row in Summary
  const summaryEl = cartDrawer.querySelector(".cart-summary");
  let comboRow = document.getElementById("cart-combo-row");
  if (isCombo && summaryEl) {
    if (!comboRow) {
      comboRow = document.createElement("div");
      comboRow.className = "summary-row combo-discount";
      comboRow.id = "cart-combo-row";
      const totalRow = summaryEl.querySelector(".summary-row.total");
      summaryEl.insertBefore(comboRow, totalRow);
    }
    comboRow.innerHTML = `<span>Royal Combo Discount</span><span>- Rs. ${comboDiscountAmount.toLocaleString()}</span>`;
  } else if (comboRow) {
    comboRow.remove();
  }

  if (subtotalEl) subtotalEl.innerText = `Rs. ${subtotal.toLocaleString()}`;
  if (totalEl) totalEl.innerText = `Rs. ${finalTotal.toLocaleString()}`;
  if (codTotalPayable) codTotalPayable.innerText = `Rs. ${finalTotal.toLocaleString()}`;
}

// Global scope helpers
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;

// --- CART DRAWER CONTROLS ---
function openCartDrawer() {
  if (cartOverlay && cartDrawer) {
    cartOverlay.classList.add("open");
    cartDrawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

window.closeCartDrawer = function() {
  if (cartOverlay && cartDrawer) {
    cartOverlay.classList.remove("open");
    cartDrawer.classList.remove("open");
    document.body.style.overflow = "";
    backToCartStep();
  }
};

// --- CONTACT FORM SUBMISSION ---
window.handleContactSubmit = function(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name ? form.name.value.trim() : "";
  const phone = form.phone ? form.phone.value.trim() : "";
  const subject = form.subject ? form.subject.value.trim() : "";
  const message = form.message ? form.message.value.trim() : "";

  let whatsappMsg = `*New Customer Inquiry - Zargul Collection*\n\n`;
  whatsappMsg += `👤 *Name:* ${name}\n`;
  whatsappMsg += `📱 *Phone:* ${phone}\n`;
  whatsappMsg += `📌 *Subject:* ${subject}\n\n`;
  whatsappMsg += `💬 *Message:*\n${message}\n`;

  const encoded = encodeURIComponent(whatsappMsg);
  const waUrl = `https://wa.me/923485245955?text=${encoded}`;
  
  showToast("Opening WhatsApp Concierge...");
  setTimeout(() => {
    window.open(waUrl, "_blank");
    form.reset();
  }, 600);
};

// --- EVENT REGISTRATION ---
function setupEventListeners() {
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  if (cartBtn) cartBtn.addEventListener("click", openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", window.closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", window.closeCartDrawer);

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = menuToggle.querySelector("svg");
      if (navMenu.classList.contains("open")) {
        icon.innerHTML = `<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`;
      } else {
        icon.innerHTML = `<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>`;
      }
    });
  }

  // Header Search button opens instant search modal!
  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSearchModal();
    });
  }

  if (catalogSearchInput) {
    catalogSearchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      renderProducts();
    });
  }

  if (catalogSortSelect) {
    catalogSortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }
}

// --- TOAST NOTIFICATIONS ---
function showToast(message) {
  if (!toastContainer) return;
  
  const toast = document.createElement("div");
  toast.className = "toast success";
  toast.innerHTML = `
    <span>✨</span>
    <span>${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "slideIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) reverse forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
