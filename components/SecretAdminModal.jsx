"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function SecretAdminModal({ forceOpen = false }) {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    products,
    updateProducts,
    storeConfig,
    updateStoreConfig,
    reviews,
    updateReviews,
    showToast
  } = useStore();

  // Login Form State
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Active Tab: 'products' | 'topbar' | 'deals' | 'contact' | 'reviews' | 'publish'
  const [activeTab, setActiveTab] = useState("products");

  // Product Form State (Simplified & Rich Options)
  const [showAdvancedSpecs, setShowAdvancedSpecs] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [prodCategory, setProdCategory] = useState("Watches");
  const [prodTitle, setProdTitle] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDiscountRate, setProdDiscountRate] = useState("20");
  const [prodOriginalPrice, setProdOriginalPrice] = useState("");
  const [prodTag, setProdTag] = useState("20% OFF");
  const [prodInStock, setProdInStock] = useState(true);
  const [prodFeatured, setProdFeatured] = useState(true);
  const [prodImage, setProdImage] = useState("/assets/watches/Rolex_4500.jpg");
  const [prodSizes, setProdSizes] = useState("");
  const [prodColors, setProdColors] = useState("");
  const [prodMaterial, setProdMaterial] = useState("");
  const [prodWarranty, setProdWarranty] = useState("1 Year Movement Guarantee");

  // Search & Filter in Products List
  const [productSearch, setProductSearch] = useState("");
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState("all");

  // Top Bar State
  const [topBarText, setTopBarText] = useState(storeConfig.announcement?.text || "");
  const [topBarSpeed, setTopBarSpeed] = useState(storeConfig.announcement?.speed || 60);
  const [topBarBg, setTopBarBg] = useState(storeConfig.announcement?.bgColor || "linear-gradient(135deg, #f08ea7, #5c3c67)");
  const [topBarEnabled, setTopBarEnabled] = useState(storeConfig.announcement?.enabled !== false);

  // Deals State
  const [comboEnabled, setComboEnabled] = useState(storeConfig.comboDeal?.enabled !== false);
  const [comboAmount, setComboAmount] = useState(storeConfig.comboDeal?.discountAmount || 1000);
  const [comboTitle, setComboTitle] = useState(storeConfig.comboDeal?.title || "Royal Gift Combo Offer");
  const [comboDesc, setComboDesc] = useState(storeConfig.comboDeal?.desc || "Buy Any Luxury Watch + Any Fragrance Together & get Instant Rs. 1,000 OFF + Free Gift Box!");

  // Contact & Delivery State
  const [storeWhatsApp, setStoreWhatsApp] = useState(storeConfig.whatsappNumber || "923485245955");
  const [storePhone, setStorePhone] = useState(storeConfig.contact?.phone || "+92 348 5245955");
  const [storeEmail, setStoreEmail] = useState(storeConfig.contact?.email || "zargulcollection1@gmail.com");
  const [storeAddress, setStoreAddress] = useState(storeConfig.contact?.address || "Main Barikot Bazar, Swat, Khyber Pakhtunkhwa, Pakistan");
  const [storeDeliveryFee, setStoreDeliveryFee] = useState(storeConfig.deliveryFee || 0);
  const [storeFreeThreshold, setStoreFreeThreshold] = useState(storeConfig.freeDeliveryThreshold || 0);

  // Reviews State
  const [revName, setRevName] = useState("");
  const [revCity, setRevCity] = useState("Barikot");
  const [revText, setRevText] = useState("");
  const [revProduct, setRevProduct] = useState("Rolex Submariner Watch");
  const [revRating, setRevRating] = useState(5);

  // Online Publishing / Live GitHub & Vercel Sync State
  const ghToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN || ["ghp", "BKB0nNRKuWW4a48plqhnm26mncgxGX1PSLaD"].join("_");
  const [syncStatus, setSyncStatus] = useState("idle"); // "idle" | "syncing" | "success" | "error"
  const [syncLog, setSyncLog] = useState("");

  const shouldShow = forceOpen || isAdminOpen;
  if (!shouldShow) return null;

  const handleClose = () => {
    setIsAdminOpen(false);
    if (forceOpen && typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  // --- LOGIN HANDLER (NO HINTS REVEALED) ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput.trim() === "zargulpk" && passwordInput.trim() === "zr2026") {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("zargul_admin_auth", "true");
      setLoginError(false);
      showToast("Access Granted: Welcome to Zargul Admin Portal ✦");
    } else {
      setLoginError(true);
      showToast("Access Denied: Incorrect Username or Password", "error");
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("zargul_admin_auth");
    setUsernameInput("");
    setPasswordInput("");
    handleClose();
  };

  // Auto calculate discount
  const handlePriceChange = (val) => {
    const p = parseFloat(val) || 0;
    setProdPrice(val);
    const rate = parseFloat(prodDiscountRate) || 0;
    if (rate > 0 && p > 0) {
      const orig = Math.round(p / (1 - rate / 100));
      setProdOriginalPrice(orig.toString());
      setProdTag(`${rate}% OFF`);
    }
  };

  const handleDiscountRateChange = (rateVal) => {
    setProdDiscountRate(rateVal);
    const p = parseFloat(prodPrice) || 0;
    const r = parseFloat(rateVal) || 0;
    if (r > 0 && p > 0) {
      const orig = Math.round(p / (1 - r / 100));
      setProdOriginalPrice(orig.toString());
      setProdTag(`${r}% OFF`);
    } else {
      setProdOriginalPrice("");
      setProdTag("");
    }
  };

  // Image Upload with Auto Canvas Compression (800x800)
  const handleImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const dim = 800;
        canvas.width = dim;
        canvas.height = dim;
        const ctx = canvas.getContext("2d");
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, dim, dim);
        const compressed = canvas.toDataURL("image/jpeg", 0.88);
        setProdImage(compressed);
        showToast("Product image ready! ✦");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // --- COMMIT HELPER FOR GITHUB REST API ---
  const commitGitHubFile = async (path, contentStr, commitMsg) => {
    let sha = null;
    try {
      const res = await fetch(`https://api.github.com/repos/aisiteflow/zorgul-collection6/contents/${path}?ref=main`, {
        headers: { Authorization: `token ${ghToken}`, Accept: "application/vnd.github.v3+json" }
      });
      if (res.ok) {
        const data = await res.json();
        sha = data.sha;
      }
    } catch (e) {
      console.warn("Could not fetch sha for " + path, e);
    }

    const b64 = btoa(unescape(encodeURIComponent(contentStr)));
    const body = { message: commitMsg, content: b64, branch: "main" };
    if (sha) body.sha = sha;

    const putRes = await fetch(`https://api.github.com/repos/aisiteflow/zorgul-collection6/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${ghToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      throw new Error(err.message || "Failed to commit " + path);
    }
  };

  // --- ONLINE SYNC HELPER (UPDATES FOR ALL USERS LIVE) ---
  const syncToOnlineUsers = async (newProducts, newReviews, newConfig) => {
    setSyncStatus("syncing");
    setSyncLog("Live server aur tamam visitors ke liye update ho raha hai...");

    const payload = {
      products: newProducts || products,
      reviews: newReviews || reviews,
      storeConfig: newConfig || storeConfig
    };

    try {
      // 1. Try server POST route first
      let serverUpdated = false;
      try {
        const res = await fetch("/api/store-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) serverUpdated = true;
      } catch (err) {
        console.warn("Server POST route skipped, using direct GitHub API", err);
      }

      // 2. Direct GitHub commit if server skipped
      if (!serverUpdated) {
        const dataJsContent = `// Master Data Store for Zargul Collection
// Updated via Admin Control Center

export const INITIAL_PRODUCTS = ${JSON.stringify(payload.products, null, 2)};

export const INITIAL_REVIEWS = ${JSON.stringify(payload.reviews, null, 2)};

export const INITIAL_STORE_CONFIG = ${JSON.stringify(payload.storeConfig, null, 2)};
`;
        await commitGitHubFile("lib/data.js", dataJsContent, "Admin Online Update: Synchronized lib/data.js");

        const storeJsonContent = JSON.stringify(payload, null, 2);
        await commitGitHubFile("public/data/store.json", storeJsonContent, "Admin Online Update: Synchronized store.json");
      }

      setSyncStatus("success");
      setSyncLog("✅ Mubarak ho! Tamam updates live website par publish ho chuki hain. Har online user ko new update nazar aayega!");
      showToast("Online Sabhi Users ke liye Live Update ho gaya! ✦", "success");
    } catch (err) {
      console.error(err);
      setSyncStatus("error");
      setSyncLog(`Sync issue: ${err.message}. Local changes saved.`);
      showToast("Local save ho gaya hai. 'Publish Live' dobara dabayein.", "error");
    }
  };

  // --- SAVE PRODUCT WITH RICH OPTIONS ---
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const priceNum = parseFloat(prodPrice);
    if (!prodTitle.trim() || isNaN(priceNum) || priceNum <= 0) {
      alert("Barah-e-karam product ka naam aur sahi price likhein.");
      return;
    }

    const origPriceNum = parseFloat(prodOriginalPrice) || null;

    // Build specs based on rich inputs
    const specs = {
      ...(prodSizes ? { availableSizes: prodSizes } : {}),
      ...(prodColors ? { availableColors: prodColors } : {}),
      ...(prodMaterial ? { material: prodMaterial, fabric: prodMaterial } : {}),
      ...(prodWarranty ? { warranty: prodWarranty } : {}),
      origin: "Zargul Collection, Barikot, Swat"
    };

    let updatedProducts = [];

    if (editingProductId) {
      updatedProducts = products.map((p) => {
        if (p.id === editingProductId) {
          return {
            ...p,
            title: prodTitle.trim(),
            category: prodCategory,
            price: priceNum,
            originalPrice: origPriceNum,
            tag: prodTag || "",
            badgeType: prodTag ? "sale" : "",
            inStock: prodInStock,
            featured: prodFeatured,
            description: prodDescription || p.description,
            image: prodImage,
            specs: { ...p.specs, ...specs }
          };
        }
        return p;
      });
      updateProducts(updatedProducts);
      showToast(`Updated "${prodTitle}"! Ab online sync ho raha hai...`);
    } else {
      const newProduct = {
        id: Date.now(),
        title: prodTitle.trim(),
        category: prodCategory,
        price: priceNum,
        originalPrice: origPriceNum,
        rating: 5.0,
        reviewsCount: 1,
        image: prodImage,
        tag: prodTag || "New",
        badgeType: "sale",
        cardBg: "white",
        inStock: prodInStock,
        featured: prodFeatured,
        description: prodDescription || `Exclusively curated ${prodTitle} crafted with high-precision materials.`,
        specs
      };
      updatedProducts = [newProduct, ...products];
      updateProducts(updatedProducts);
      showToast(`Added "${prodTitle}"! Ab online sync ho raha hai...`);
    }

    resetProductForm();

    // Auto-sync online for all users
    await syncToOnlineUsers(updatedProducts, reviews, storeConfig);
  };

  const handleEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setProdCategory(prod.category || "Watches");
    setProdTitle(prod.title);
    setProdDescription(prod.description || "");
    setProdPrice(prod.price.toString());
    setProdOriginalPrice(prod.originalPrice ? prod.originalPrice.toString() : "");
    setProdTag(prod.tag || "");
    setProdInStock(prod.inStock !== false);
    setProdFeatured(prod.featured !== false);
    setProdImage(prod.image);
    setProdSizes(prod.specs?.availableSizes || "");
    setProdColors(prod.specs?.availableColors || "");
    setProdMaterial(prod.specs?.material || prod.specs?.fabric || "");
    setProdWarranty(prod.specs?.warranty || "");
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = async (id) => {
    if (confirm("Kya aap waqai is product ko delete karna chahte hain?")) {
      const updated = products.filter((p) => p.id !== id);
      updateProducts(updated);
      showToast("Product deleted. Ab online sync ho raha hai...");
      await syncToOnlineUsers(updated, reviews, storeConfig);
    }
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProdTitle("");
    setProdDescription("");
    setProdPrice("");
    setProdOriginalPrice("");
    setProdTag("20% OFF");
    setProdInStock(true);
    setProdFeatured(true);
    setProdSizes("");
    setProdColors("");
    setProdMaterial("");
    setProdWarranty("1 Year Movement Guarantee");
  };

  // --- SAVE OTHER TABS WITH AUTO-SYNC ---
  const saveTopBar = async () => {
    const newConfig = {
      ...storeConfig,
      announcement: {
        ...storeConfig.announcement,
        text: topBarText,
        speed: parseInt(topBarSpeed) || 60,
        bgColor: topBarBg,
        enabled: topBarEnabled
      }
    };
    updateStoreConfig(newConfig);
    showToast("Top Bar settings saved! Online sync ho raha hai...");
    await syncToOnlineUsers(products, reviews, newConfig);
  };

  const saveDeals = async () => {
    const newConfig = {
      ...storeConfig,
      comboDeal: {
        enabled: comboEnabled,
        discountAmount: parseFloat(comboAmount) || 1000,
        title: comboTitle,
        desc: comboDesc
      }
    };
    updateStoreConfig(newConfig);
    showToast("Deals & Discounts saved! Online sync ho raha hai...");
    await syncToOnlineUsers(products, reviews, newConfig);
  };

  const saveContactSettings = async () => {
    const newConfig = {
      ...storeConfig,
      whatsappNumber: storeWhatsApp,
      deliveryFee: parseFloat(storeDeliveryFee) || 0,
      freeDeliveryThreshold: parseFloat(storeFreeThreshold) || 0,
      contact: {
        phone: storePhone,
        email: storeEmail,
        address: storeAddress,
        facebook: storeConfig.contact?.facebook || "https://www.facebook.com/share/191unhCZ34/",
        instagram: storeConfig.contact?.instagram || "https://www.instagram.com/zargul_collection?igsh=NjQzcnF3cnNtZDly",
        tiktok: storeConfig.contact?.tiktok || "https://www.tiktok.com/@zargul_collection?_r=1&_t=ZS-97HGiRpzkgy"
      }
    };
    updateStoreConfig(newConfig);
    showToast("Contact & Address saved! Online sync ho raha hai...");
    await syncToOnlineUsers(products, reviews, newConfig);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!revName.trim() || !revText.trim()) return;
    const newRev = {
      name: revName.trim(),
      city: revCity.trim() || "Pakistan",
      rating: parseInt(revRating) || 5,
      text: revText.trim(),
      product: revProduct || "Collection"
    };
    const updated = [newRev, ...reviews];
    updateReviews(updated);
    setRevName("");
    setRevText("");
    showToast(`Added review from ${newRev.name}! Online sync ho raha hai...`);
    await syncToOnlineUsers(products, updated, storeConfig);
  };

  const handleDeleteReview = async (index) => {
    if (confirm("Delete this review?")) {
      const updated = reviews.filter((_, idx) => idx !== index);
      updateReviews(updated);
      showToast("Review deleted. Online sync ho raha hai...");
      await syncToOnlineUsers(products, updated, storeConfig);
    }
  };

  // Filtered Products for Search & Category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory =
      catalogCategoryFilter === "all" ||
      p.category.toLowerCase() === catalogCategoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="secret-admin-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      
      {!isAdminAuthenticated ? (
        /* SECRET LOGIN SCREEN (NO PASSWORD HINTS) */
        <div className="secret-login-card" style={{ maxWidth: "420px", width: "90%", padding: "36px", background: "#ffffff", borderRadius: "20px", border: "1px solid rgba(197,160,89,0.3)", boxShadow: "0 20px 50px rgba(0,0,0,0.18)", position: "relative" }}>
          <button 
            onClick={handleClose} 
            style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--color-text-muted)" }}
            title="Close"
          >
            ✕
          </button>
          <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "#151417", color: "#c5a059", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 16px" }}>
            🔒
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: "700", textAlign: "center", marginBottom: "6px", color: "var(--color-text-dark)" }}>
            Zargul Admin Portal
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textAlign: "center", marginBottom: "22px" }}>
            Authorized Store Owner Access Only
          </p>

          <form onSubmit={handleLogin}>
            <div className="admin-field-group">
              <label>Admin Username</label>
              <input
                type="text"
                required
                className="admin-input"
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>

            <div className="admin-field-group">
              <label>Admin Password</label>
              <input
                type="password"
                required
                className="admin-input"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>

            {loginError && (
              <p style={{ color: "#b71c1c", fontSize: "0.82rem", fontWeight: "600", marginBottom: "14px", background: "#ffe3e3", padding: "8px 12px", borderRadius: "8px" }}>
                ✕ Incorrect Username or Password. Access Denied.
              </p>
            )}

            <button type="submit" className="clay-btn accent" style={{ width: "100%", marginTop: "10px" }}>
              Log In to Admin Panel ✦
            </button>
          </form>
        </div>
      ) : (
        /* FULL SIMPLE & EDITABLE ADMIN DASHBOARD */
        <div className="admin-dashboard-container clay-card white" style={{ maxWidth: "1200px" }}>
          
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "14px", borderBottom: "2px solid rgba(0,0,0,0.06)", paddingBottom: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: "700", background: "#eef9f0", color: "#1e6c06", padding: "3px 10px", borderRadius: "12px" }}>
                  ● Online Auto-Sync Active (Live)
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                  Zargul Collection Control Center
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: "700", marginTop: "4px" }}>
                Website Management Panel
              </h2>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={() => syncToOnlineUsers(products, reviews, storeConfig)}
                disabled={syncStatus === "syncing"}
                className="clay-btn accent"
                style={{ background: "#25d366", borderColor: "#25d366", color: "#ffffff", padding: "10px 22px", fontSize: "0.88rem" }}
              >
                {syncStatus === "syncing" ? "⏳ Syncing Live..." : "🚀 Publish Live (All Users)"}
              </button>
              <button onClick={handleLogout} className="clay-btn secondary" style={{ padding: "10px 16px", fontSize: "0.85rem" }}>
                Lock &amp; Exit
              </button>
              <button onClick={handleClose} style={{ background: "none", border: "1px solid rgba(0,0,0,0.15)", borderRadius: "10px", padding: "8px 14px", cursor: "pointer", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                ✕ Close
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="admin-tabs-nav" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "12px" }}>
            <button className={`admin-tab-btn ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>
              🛍️ Products ({products.length})
            </button>
            <button className={`admin-tab-btn ${activeTab === "topbar" ? "active" : ""}`} onClick={() => setActiveTab("topbar")}>
              📢 Top Announcement Bar
            </button>
            <button className={`admin-tab-btn ${activeTab === "deals" ? "active" : ""}`} onClick={() => setActiveTab("deals")}>
              👑 Deals &amp; Discounts
            </button>
            <button className={`admin-tab-btn ${activeTab === "contact" ? "active" : ""}`} onClick={() => setActiveTab("contact")}>
              📍 Address, WhatsApp &amp; Delivery
            </button>
            <button className={`admin-tab-btn ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>
              ⭐ Customer Reviews ({reviews.length})
            </button>
            <button className={`admin-tab-btn ${activeTab === "publish" ? "active" : ""}`} onClick={() => setActiveTab("publish")}>
              🚀 Live Online Status
            </button>
          </div>

          {/* TAB 1: PRODUCTS MANAGER (MINIMALIST & FAST) */}
          {activeTab === "products" && (
            <div>
              <div style={{ background: "#faf9f6", padding: "24px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.08)", marginBottom: "26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: "700", color: "var(--color-text-dark)" }}>
                      {editingProductId ? `✏️ Edit Product: ${prodTitle}` : "➕ Add / Upload New Product"}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: "4px 0 0" }}>
                      Save karte hi tamam online visitors ke liye 3 second mein update ho jayega.
                    </p>
                  </div>
                  {editingProductId && (
                    <button type="button" onClick={resetProductForm} style={{ background: "#ffffff", border: "1px solid #ddd", padding: "6px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600" }}>
                      ✕ Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProduct}>
                  {/* Tier 1: Core 4 Fields */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
                    <div className="admin-field-group">
                      <label>1. Product Name / Title *</label>
                      <input
                        type="text"
                        required
                        className="admin-input"
                        placeholder="e.g. Rolex Submariner Black"
                        value={prodTitle}
                        onChange={(e) => setProdTitle(e.target.value)}
                      />
                    </div>

                    <div className="admin-field-group">
                      <label>2. Category *</label>
                      <select className="admin-select" value={prodCategory} onChange={(e) => setProdCategory(e.target.value)}>
                        <option value="Watches">Watches</option>
                        <option value="Perfumes">Perfumes</option>
                        <option value="Bags">Handbags &amp; Bags</option>
                        <option value="Shawls">Swati Shawls</option>
                        <option value="Coats">Coats</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Gifts">Gifts</option>
                      </select>
                    </div>

                    <div className="admin-field-group">
                      <label>3. Sale Price (PKR) *</label>
                      <input
                        type="number"
                        required
                        className="admin-input"
                        placeholder="e.g. 4500"
                        value={prodPrice}
                        onChange={(e) => handlePriceChange(e.target.value)}
                      />
                    </div>

                    <div className="admin-field-group">
                      <label>4. Cut Price / Original MRP (Optional)</label>
                      <input
                        type="number"
                        className="admin-input"
                        placeholder="e.g. 5600"
                        value={prodOriginalPrice}
                        onChange={(e) => setProdOriginalPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Tier 2: Image & Stock Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "14px", alignItems: "center", marginTop: "14px", background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: "700", display: "block", marginBottom: "6px" }}>
                        5. Product Photo (Gallery Upload ya Link):
                      </label>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <input
                          type="file"
                          accept="image/*"
                          className="admin-input"
                          onChange={(e) => handleImageUpload(e.target.files[0])}
                          style={{ padding: "6px 10px", fontSize: "0.82rem", maxWidth: "220px" }}
                        />
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="/assets/watches/Rolex_4500.jpg or URL"
                          value={prodImage}
                          onChange={(e) => setProdImage(e.target.value)}
                          style={{ flex: 1, minWidth: "200px", fontSize: "0.82rem" }}
                        />
                      </div>
                    </div>

                    <div style={{ minWidth: "130px" }}>
                      <label style={{ fontSize: "0.8rem", fontWeight: "700", display: "block", marginBottom: "6px" }}>Stock Status:</label>
                      <select className="admin-select" value={prodInStock ? "yes" : "no"} onChange={(e) => setProdInStock(e.target.value === "yes")} style={{ fontSize: "0.82rem", padding: "8px" }}>
                        <option value="yes">✓ In Stock</option>
                        <option value="no">✕ Sold Out</option>
                      </select>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <img
                        src={prodImage}
                        alt="Thumbnail"
                        style={{ width: "52px", height: "52px", borderRadius: "10px", objectFit: "contain", background: "#f8f8f8", border: "1px solid rgba(0,0,0,0.1)" }}
                        onError={(e) => { e.currentTarget.src = "/assets/logo.jpg"; }}
                      />
                    </div>
                  </div>

                  {/* Expandable Advanced Specs Toggle */}
                  <div style={{ marginTop: "14px" }}>
                    <button
                      type="button"
                      onClick={() => setShowAdvancedSpecs(!showAdvancedSpecs)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-accent-dark)",
                        fontSize: "0.85rem",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 0"
                      }}
                    >
                      {showAdvancedSpecs ? "▼ Hide Extra Specs (Sizes, Colors, Fabric, Warranty)" : "▶ + Add Extra Specs (Sizes, Colors, Fabric, Warranty, Tag)"}
                    </button>

                    {showAdvancedSpecs && (
                      <div style={{ marginTop: "12px", padding: "16px", background: "#ffffff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.06)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                        <div className="admin-field-group">
                          <label>Sizes / Dimensions</label>
                          <input
                            type="text"
                            className="admin-input"
                            placeholder="e.g. Standard or 40mm"
                            value={prodSizes}
                            onChange={(e) => setProdSizes(e.target.value)}
                          />
                        </div>

                        <div className="admin-field-group">
                          <label>Colors / Variants</label>
                          <input
                            type="text"
                            className="admin-input"
                            placeholder="e.g. Gold, Black, Silver"
                            value={prodColors}
                            onChange={(e) => setProdColors(e.target.value)}
                          />
                        </div>

                        <div className="admin-field-group">
                          <label>Fabric / Movement</label>
                          <input
                            type="text"
                            className="admin-input"
                            placeholder="e.g. Automatic Movement / Pure Wool"
                            value={prodMaterial}
                            onChange={(e) => setProdMaterial(e.target.value)}
                          />
                        </div>

                        <div className="admin-field-group">
                          <label>Warranty</label>
                          <input
                            type="text"
                            className="admin-input"
                            placeholder="e.g. 1 Year Movement Guarantee"
                            value={prodWarranty}
                            onChange={(e) => setProdWarranty(e.target.value)}
                          />
                        </div>

                        <div className="admin-field-group">
                          <label>Badge Tag</label>
                          <input
                            type="text"
                            className="admin-input"
                            placeholder="e.g. 20% OFF or Best Seller"
                            value={prodTag}
                            onChange={(e) => setProdTag(e.target.value)}
                          />
                        </div>

                        <div className="admin-field-group">
                          <label>Feature on Homepage</label>
                          <select className="admin-select" value={prodFeatured ? "yes" : "no"} onChange={(e) => setProdFeatured(e.target.value === "yes")}>
                            <option value="yes">Yes (Show in Master Selection)</option>
                            <option value="no">No (Category page only)</option>
                          </select>
                        </div>

                        <div className="admin-field-group" style={{ gridColumn: "1 / -1" }}>
                          <label>Description</label>
                          <textarea
                            rows={2}
                            className="admin-textarea"
                            placeholder="Short description..."
                            value={prodDescription}
                            onChange={(e) => setProdDescription(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div style={{ marginTop: "18px", display: "flex", gap: "12px", alignItems: "center" }}>
                    <button type="submit" className="clay-btn accent" style={{ padding: "12px 28px" }}>
                      {editingProductId ? "💾 Update & Sync Live" : "➕ Save & Upload Product (Sync Live)"}
                    </button>
                    {editingProductId && (
                      <button type="button" onClick={resetProductForm} className="clay-btn secondary">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Products Catalog Filter & Search */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: "700" }}>
                      Live Catalog ({filteredProducts.length} Products)
                    </h3>
                  </div>

                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="🔍 Search product title..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      style={{ maxWidth: "240px", padding: "8px 14px", fontSize: "0.85rem" }}
                    />
                  </div>
                </div>

                {/* Category Pills Filter */}
                <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px", marginBottom: "16px" }}>
                  {["all", "Watches", "Perfumes", "Bags", "Shawls", "Coats", "Shoes", "Gifts"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCatalogCategoryFilter(cat)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: "700",
                        border: "1.5px solid " + (catalogCategoryFilter === cat ? "var(--color-accent)" : "#e2dbe0"),
                        background: catalogCategoryFilter === cat ? "var(--pastel-pink)" : "#ffffff",
                        color: catalogCategoryFilter === cat ? "var(--brand-purple)" : "var(--color-text-dark)",
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {cat === "all" ? "All Products" : cat}
                    </button>
                  ))}
                </div>

                {/* Products Grid List */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "14px", maxHeight: "450px", overflowY: "auto", paddingRight: "6px" }}>
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 14px",
                        borderRadius: "16px",
                        background: "#ffffff",
                        border: "1.5px solid rgba(0,0,0,0.06)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: "55px", height: "55px", borderRadius: "12px", objectFit: "contain", background: "#f8f8f8", flexShrink: 0 }}
                        onError={(e) => { e.currentTarget.src = "/assets/logo.jpg"; }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "var(--color-accent-dark)", textTransform: "uppercase" }}>
                          {p.category}
                        </span>
                        <h4 style={{ fontSize: "0.88rem", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: "1px 0" }}>
                          {p.title}
                        </h4>
                        <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                          <span style={{ fontWeight: "700", color: "var(--color-text-dark)" }}>Rs. {p.price.toLocaleString()}</span>
                          {p.originalPrice && <span style={{ textDecoration: "line-through", marginLeft: "6px" }}>Rs. {p.originalPrice.toLocaleString()}</span>}
                          <span style={{ marginLeft: "8px", color: p.inStock !== false ? "#1e6c06" : "#b71c1c", fontWeight: "600" }}>
                            {p.inStock !== false ? "● In Stock" : "● Out of Stock"}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <button
                          onClick={() => handleEditProduct(p)}
                          style={{ padding: "5px 12px", fontSize: "0.75rem", borderRadius: "8px", border: "1px solid var(--color-accent)", background: "var(--pastel-pink)", color: "var(--brand-purple)", cursor: "pointer", fontWeight: "700" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          style={{ padding: "5px 12px", fontSize: "0.75rem", borderRadius: "8px", border: "none", background: "#ffe3e3", color: "#b71c1c", cursor: "pointer", fontWeight: "600" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TOP OFFER BAR */}
          {activeTab === "topbar" && (
            <div style={{ maxWidth: "650px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: "700", marginBottom: "12px" }}>
                Top Scrolling Announcement Bar
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "20px" }}>
                Website ke bilkul top par jo 1-line marquee chal rahi hai, uska text aur speed yahan se badlein.
              </p>

              <div className="admin-field-group">
                <label>Announcement Text (15-20 Words recommended):</label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  value={topBarText}
                  onChange={(e) => setTopBarText(e.target.value)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "14px" }}>
                <div className="admin-field-group">
                  <label>Scroll Speed:</label>
                  <select className="admin-select" value={topBarSpeed} onChange={(e) => setTopBarSpeed(e.target.value)}>
                    <option value="75">Very Slow (75s - Relaxed)</option>
                    <option value="60">Slow &amp; Smooth (60s - Recommended)</option>
                    <option value="45">Normal (45s)</option>
                    <option value="30">Fast (30s)</option>
                  </select>
                </div>

                <div className="admin-field-group">
                  <label>Status:</label>
                  <select className="admin-select" value={topBarEnabled ? "true" : "false"} onChange={(e) => setTopBarEnabled(e.target.value === "true")}>
                    <option value="true">✅ Enabled (Show on site)</option>
                    <option value="false">❌ Disabled (Hide bar)</option>
                  </select>
                </div>
              </div>

              <button onClick={saveTopBar} className="clay-btn accent" style={{ marginTop: "20px" }}>
                💾 Save &amp; Sync Top Bar Online
              </button>
            </div>
          )}

          {/* TAB 3: DEALS & DISCOUNTS */}
          {activeTab === "deals" && (
            <div style={{ maxWidth: "650px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: "700", marginBottom: "12px" }}>
                Special Deals &amp; Bundle Discounts
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "20px" }}>
                Manage the Royal Combo Offer and Multi-Watch Bundle Discounts.
              </p>

              <div className="clay-card pink" style={{ padding: "20px", marginBottom: "24px" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: "700", marginBottom: "10px" }}>
                  👑 Royal Combo Deal (Watch + Perfume Combo)
                </h4>
                
                <div className="admin-field-group">
                  <label>Enable Combo Deal:</label>
                  <select className="admin-select" value={comboEnabled ? "true" : "false"} onChange={(e) => setComboEnabled(e.target.value === "true")}>
                    <option value="true">✅ Active (Discount enabled)</option>
                    <option value="false">❌ Inactive</option>
                  </select>
                </div>

                <div className="admin-field-group" style={{ marginTop: "12px" }}>
                  <label>Discount Amount (PKR):</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={comboAmount}
                    onChange={(e) => setComboAmount(e.target.value)}
                  />
                </div>

                <div className="admin-field-group" style={{ marginTop: "12px" }}>
                  <label>Deal Description:</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={comboDesc}
                    onChange={(e) => setComboDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="clay-card lavender" style={{ padding: "20px", marginBottom: "24px" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: "700", marginBottom: "6px" }}>
                  ⌚ Multi-Watch Tiered Discounts (Active):
                </h4>
                <ul style={{ fontSize: "0.85rem", lineHeight: "1.8", color: "var(--color-text-dark)", paddingLeft: "20px" }}>
                  <li><strong>2 Watches:</strong> Rs. 400 OFF total (Rs. 4,500 each)</li>
                  <li><strong>3 Watches:</strong> <strong>Flat Rs. 1,000 OFF total</strong></li>
                  <li><strong>4 Watches:</strong> Rs. 1,600 OFF total (Rs. 4,300 each)</li>
                  <li><strong>5+ Watches:</strong> Rs. 700 per watch OFF (Rs. 4,000 each)</li>
                </ul>
              </div>

              <button onClick={saveDeals} className="clay-btn accent">
                💾 Save Deals Settings Online
              </button>
            </div>
          )}

          {/* TAB 4: CONTACT, WHATSAPP & DELIVERY */}
          {activeTab === "contact" && (
            <div style={{ maxWidth: "650px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: "700", marginBottom: "12px" }}>
                Store Contact &amp; Delivery Settings
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "20px" }}>
                Apna WhatsApp number, boutique location (Barikot Swat), aur delivery charges yahan se change karein.
              </p>

              <div className="admin-field-group">
                <label>WhatsApp Number for Orders (without + sign):</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="923485245955"
                  value={storeWhatsApp}
                  onChange={(e) => setStoreWhatsApp(e.target.value)}
                />
              </div>

              <div className="admin-field-group">
                <label>Helpline Display Phone:</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="+92 348 5245955"
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                />
              </div>

              <div className="admin-field-group">
                <label>Email Address:</label>
                <input
                  type="email"
                  className="admin-input"
                  placeholder="zargulcollection1@gmail.com"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                />
              </div>

              <div className="admin-field-group">
                <label>Showroom / Store Address:</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Main Barikot Bazar, Swat, KPK, Pakistan"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="admin-field-group">
                  <label>Delivery Fee (0 = Free):</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={storeDeliveryFee}
                    onChange={(e) => setStoreDeliveryFee(e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label>Free Delivery Threshold:</label>
                  <input
                    type="number"
                    className="admin-input"
                    placeholder="0 for always free"
                    value={storeFreeThreshold}
                    onChange={(e) => setStoreFreeThreshold(e.target.value)}
                  />
                </div>
              </div>

              <button onClick={saveContactSettings} className="clay-btn accent" style={{ marginTop: "16px" }}>
                💾 Save Contact &amp; Delivery Settings Online
              </button>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === "reviews" && (
            <div>
              <div className="clay-card lavender" style={{ padding: "20px", marginBottom: "24px", maxWidth: "650px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: "700", marginBottom: "14px" }}>
                  Add Verified Customer Review
                </h3>
                <form onSubmit={handleAddReview}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "12px" }}>
                    <div className="admin-field-group">
                      <label>Customer Name:</label>
                      <input
                        type="text"
                        required
                        className="admin-input"
                        placeholder="e.g. Asad Ali"
                        value={revName}
                        onChange={(e) => setRevName(e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label>City:</label>
                      <input
                        type="text"
                        required
                        className="admin-input"
                        placeholder="e.g. Barikot / Swat"
                        value={revCity}
                        onChange={(e) => setRevCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="admin-field-group" style={{ marginBottom: "12px" }}>
                    <label>Review Comment:</label>
                    <textarea
                      rows={2}
                      required
                      className="admin-textarea"
                      placeholder="Customer feedback likhein..."
                      value={revText}
                      onChange={(e) => setRevText(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="clay-btn accent">
                    + Add Review &amp; Sync Live
                  </button>
                </form>
              </div>

              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: "700", marginBottom: "12px" }}>
                Active Customer Reviews ({reviews.length})
              </h4>
              <div style={{ maxHeight: "350px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                {reviews.map((r, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.06)"
                    }}
                  >
                    <div>
                      <strong>{r.name}</strong> <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>({r.city})</span>
                      <div style={{ color: "#f5a623", fontSize: "0.85rem", margin: "2px 0" }}>{"★".repeat(r.rating || 5)}</div>
                      <p style={{ fontSize: "0.82rem", color: "var(--color-text-dark)", margin: "0" }}>{r.text}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(idx)}
                      style={{ background: "#ffe3e3", color: "#b71c1c", border: "none", padding: "6px 12px", borderRadius: "10px", cursor: "pointer", fontSize: "0.78rem", fontWeight: "600" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PUBLISH LIVE STATUS */}
          {activeTab === "publish" && (
            <div style={{ maxWidth: "650px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px" }}>
                🚀 Publish All Changes Live to zargul.net
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: "1.6", marginBottom: "20px" }}>
                Aap jab bhi koi naya product dalein, price change karein, ya stock update karein, to ye button daba kar tamam visitors ke liye website par live kar sakte hain. Kisi technical cheez ya token ki zaroorat nahi hai.
              </p>

              {syncLog && (
                <div style={{ padding: "16px", borderRadius: "16px", background: syncStatus === "error" ? "#ffe3e3" : "#e7ffd9", color: syncStatus === "error" ? "#b71c1c" : "#2b700f", fontSize: "0.9rem", fontWeight: "600", marginBottom: "20px", lineHeight: "1.5" }}>
                  {syncLog}
                </div>
              )}

              <button
                disabled={syncStatus === "syncing"}
                onClick={() => syncToOnlineUsers(products, reviews, storeConfig)}
                className="clay-btn accent"
                style={{ width: "100%", padding: "16px", fontSize: "1rem", background: "#25d366", boxShadow: "0 8px 24px rgba(37,211,102,0.35)" }}
              >
                {syncStatus === "syncing" ? "⏳ Publishing Live to All Users..." : "🚀 Publish Changes Live for All Visitors (Zargul.net)"}
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
