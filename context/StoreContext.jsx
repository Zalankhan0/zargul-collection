"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_STORE_CONFIG } from "@/lib/data";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [storeConfig, setStoreConfig] = useState(INITIAL_STORE_CONFIG);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize from localStorage on client
  useEffect(() => {
    try {
      // 1. Products
      const localProducts = localStorage.getItem("zargul_products");
      if (localProducts) {
        try {
          const parsed = JSON.parse(localProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
          }
        } catch {
          localStorage.removeItem("zargul_products");
        }
      }

      // 2. Store Config
      const localConfig = localStorage.getItem("zargul_store_config");
      if (localConfig) {
        try {
          const parsed = JSON.parse(localConfig);
          if (parsed && typeof parsed === "object") {
            setStoreConfig((prev) => ({ ...prev, ...parsed }));
          }
        } catch {
          localStorage.removeItem("zargul_store_config");
        }
      }

      // 3. Reviews
      const localReviews = localStorage.getItem("zargul_reviews");
      if (localReviews) {
        try {
          const parsed = JSON.parse(localReviews);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReviews(parsed);
          }
        } catch {
          localStorage.removeItem("zargul_reviews");
        }
      }

      // 4. Cart
      const localCart = localStorage.getItem("zargul_cart");
      if (localCart) {
        try {
          const parsed = JSON.parse(localCart);
          if (Array.isArray(parsed)) {
            const validItems = parsed.filter((it) => it && it.product && typeof it.product === "object");
            setCart(validItems);
          }
        } catch {
          localStorage.removeItem("zargul_cart");
        }
      }

      // 5. Admin Session
      const sessionAuth = sessionStorage.getItem("zargul_admin_auth");
      if (sessionAuth === "true") {
        setIsAdminAuthenticated(true);
      }

      // 6. Live Global Sync: Single fast fetch without CPU-draining 4-second polling loops
      const fetchLiveData = () => {
        fetch(`/api/store-data?t=${Date.now()}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((live) => {
            if (!live) return;
            let isAdmin = false;
            try {
              isAdmin = typeof window !== "undefined" && sessionStorage.getItem("zargul_admin_auth") === "true";
            } catch {}

            if (!isAdmin) {
              if (Array.isArray(live.products) && live.products.length > 0) {
                const existingMap = new Map();
                for (const p of live.products) {
                  existingMap.set(p.id, p);
                }
                for (const p of INITIAL_PRODUCTS) {
                  if (!existingMap.has(p.id)) {
                    existingMap.set(p.id, p);
                  }
                }
                const mergedProducts = Array.from(existingMap.values());
                setProducts((prev) => {
                  if (
                    prev.length === mergedProducts.length &&
                    prev[0]?.id === mergedProducts[0]?.id &&
                    prev[0]?.price === mergedProducts[0]?.price
                  ) {
                    return prev;
                  }
                  try {
                    localStorage.setItem("zargul_products", JSON.stringify(mergedProducts));
                  } catch {}
                  return mergedProducts;
                });
              }

              if (live.storeConfig && typeof live.storeConfig === "object") {
                setStoreConfig((prev) => ({ ...prev, ...live.storeConfig }));
                try {
                  localStorage.setItem("zargul_store_config", JSON.stringify(live.storeConfig));
                } catch {}
              }

              if (Array.isArray(live.reviews) && live.reviews.length > 0) {
                setReviews(live.reviews);
                try {
                  localStorage.setItem("zargul_reviews", JSON.stringify(live.reviews));
                } catch {}
              }
            }
          })
          .catch(() => {});
      };

      // Initial fast fetch
      fetchLiveData();

      // Only refresh if visitor switches back to the tab
      const handleVisibilityChange = () => {
        if (typeof document !== "undefined" && document.visibilityState === "visible") {
          fetchLiveData();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    } catch {}
  }, []);

  // Listen for Secret Trigger: Ctrl + Shift + Z
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "Z" || e.key === "z")) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Toast Helper
  const showToast = (msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  // Cart Functions
  const addToCart = (product, variant = "", extraPrice = 0, quantity = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && (item.variant || "") === (variant || "")
      );
      let updated;
      if (existingIdx !== -1) {
        updated = [...prev];
        updated[existingIdx].quantity += quantity;
      } else {
        updated = [...prev, { product, variant, extraPrice, quantity }];
      }
      localStorage.setItem("zargul_cart", JSON.stringify(updated));
      return updated;
    });
    showToast(`Added "${product.title}" to your Bag!`);
    setIsCartOpen(true);
  };

  const updateCartQty = (index, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].quantity += delta;
        if (updated[index].quantity <= 0) {
          updated.splice(index, 1);
        }
      }
      localStorage.setItem("zargul_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => {
      const updated = prev.filter((_, idx) => idx !== index);
      localStorage.setItem("zargul_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("zargul_cart");
  };

  // Admin Data Modifiers
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("zargul_products", JSON.stringify(newProducts));
  };

  const updateStoreConfig = (newConfig) => {
    setStoreConfig(newConfig);
    localStorage.setItem("zargul_store_config", JSON.stringify(newConfig));
  };

  const updateReviews = (newReviews) => {
    setReviews(newReviews);
    localStorage.setItem("zargul_reviews", JSON.stringify(newReviews));
  };

  // Compute Cart Calculations
  const safeCart = Array.isArray(cart) ? cart.filter((it) => it && it.product) : [];

  const cartSubtotal = safeCart.reduce((sum, item) => {
    const unitPrice = Number(item.product?.price || 0) + Number(item.extraPrice || 0);
    return sum + unitPrice * (item.quantity || 1);
  }, 0);

  const hasWatch = safeCart.some(
    (item) => item.product?.category === "Watches" || item.product?.category === "Timepieces"
  );
  const hasPerfume = safeCart.some(
    (item) => item.product?.category === "Perfumes" || item.product?.category === "Fragrances"
  );
  const isComboActive = storeConfig?.comboDeal?.enabled !== false;
  const comboDiscount = isComboActive && hasWatch && hasPerfume ? (storeConfig?.comboDeal?.discountAmount || 1000) : 0;

  // Multi-Watch Tier Discount Calculation
  const totalWatches = safeCart
    .filter((item) => {
      const cat = (item.product?.category || "").toLowerCase();
      const title = (item.product?.title || "").toLowerCase();
      return (
        cat === "timepieces" ||
        cat === "watches" ||
        title.includes("watch") ||
        title.includes("rolex") ||
        title.includes("hublot") ||
        title.includes("omega") ||
        title.includes("patek") ||
        title.includes("chronograph") ||
        title.includes("cadisen") ||
        title.includes("poedagar") ||
        title.includes("kademan") ||
        title.includes("bestwin") ||
        title.includes("edition")
      );
    })
    .reduce((sum, item) => sum + (item.quantity || 1), 0);

  let multiWatchDiscount = 0;
  let multiWatchTierLabel = "";

  if (totalWatches === 2) {
    multiWatchDiscount = 400;
    multiWatchTierLabel = "2 Watches Bundle (Rs. 400 OFF)";
  } else if (totalWatches === 3) {
    multiWatchDiscount = 1000;
    multiWatchTierLabel = "3 Watches Deal (Rs. 1,000 OFF)";
  } else if (totalWatches === 4) {
    multiWatchDiscount = 1600;
    multiWatchTierLabel = "4 Watches VIP Deal (Rs. 1,600 OFF)";
  } else if (totalWatches >= 5) {
    multiWatchDiscount = totalWatches * 700;
    multiWatchTierLabel = `${totalWatches} Watches Wholesale Tier (Rs. ${multiWatchDiscount.toLocaleString()} OFF)`;
  }

  const deliveryFee =
    (storeConfig?.freeDeliveryThreshold || 0) > 0 && cartSubtotal >= (storeConfig?.freeDeliveryThreshold || 0)
      ? 0
      : storeConfig?.deliveryFee || 0;

  const totalDiscount = comboDiscount + multiWatchDiscount;
  const cartTotal = Math.max(0, cartSubtotal - totalDiscount + deliveryFee);
  const totalCartCount = safeCart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        reviews,
        storeConfig,
        cart,
        isCartOpen,
        setIsCartOpen,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        toastMessage,
        showToast,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        updateProducts,
        updateStoreConfig,
        updateReviews,
        cartSubtotal,
        comboDiscount,
        multiWatchDiscount,
        multiWatchTierLabel,
        totalWatches,
        deliveryFee,
        cartTotal,
        totalCartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
