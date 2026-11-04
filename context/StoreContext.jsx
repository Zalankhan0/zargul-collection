"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_STORE_CONFIG } from "@/lib/data";

const StoreContext = createContext(null);

// Resilient Storage Helpers: Never throw errors even in iOS Safari Private Mode or restricted WebViews
const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window === "undefined") return null;
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, val) => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, val);
    } catch {}
  },
  removeItem: (key) => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem(key);
    } catch {}
  }
};

const safeSession = {
  getItem: (key) => {
    try {
      if (typeof window === "undefined") return null;
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, val) => {
    try {
      if (typeof window === "undefined") return;
      window.sessionStorage.setItem(key, val);
    } catch {}
  },
  removeItem: (key) => {
    try {
      if (typeof window === "undefined") return;
      window.sessionStorage.removeItem(key);
    } catch {}
  }
};

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [storeConfig, setStoreConfig] = useState(INITIAL_STORE_CONFIG);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);

  // Initialize from safe storage on client
  useEffect(() => {
    try {
      // 0. Secret Vault State
      const vaultSaved = safeStorage.getItem("zargul_vault_unlocked");
      if (vaultSaved === "true") {
        setIsVaultUnlocked(true);
      }
      // 1. Products - Always ensure all 62 INITIAL_PRODUCTS are present
      const localProducts = safeStorage.getItem("zargul_products");
      if (localProducts) {
        try {
          const parsed = JSON.parse(localProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const existingMap = new Map();
            // Start with all 62 products from INITIAL_PRODUCTS
            for (const initP of INITIAL_PRODUCTS) {
              existingMap.set(initP.id, initP);
            }
            // Overlay any admin changes
            for (const p of parsed) {
              if (existingMap.has(p.id)) {
                existingMap.set(p.id, { ...existingMap.get(p.id), ...p });
              } else {
                existingMap.set(p.id, p);
              }
            }
            const merged = Array.from(existingMap.values());
            setProducts(merged);
            safeStorage.setItem("zargul_products", JSON.stringify(merged));
          }
        } catch {
          safeStorage.removeItem("zargul_products");
        }
      }

      // 2. Store Config
      const localConfig = safeStorage.getItem("zargul_store_config");
      if (localConfig) {
        try {
          const parsed = JSON.parse(localConfig);
          if (parsed && typeof parsed === "object") {
            setStoreConfig((prev) => ({ ...prev, ...parsed }));
          }
        } catch {
          safeStorage.removeItem("zargul_store_config");
        }
      }

      // 3. Reviews
      const localReviews = safeStorage.getItem("zargul_reviews");
      if (localReviews) {
        try {
          const parsed = JSON.parse(localReviews);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReviews(parsed);
          }
        } catch {
          safeStorage.removeItem("zargul_reviews");
        }
      }

      // 4. Cart
      const localCart = safeStorage.getItem("zargul_cart");
      if (localCart) {
        try {
          const parsed = JSON.parse(localCart);
          if (Array.isArray(parsed)) {
            const validItems = parsed.filter((it) => it && it.product && typeof it.product === "object");
            setCart(validItems);
          }
        } catch {
          safeStorage.removeItem("zargul_cart");
        }
      }

      // 5. Admin Session
      const sessionAuth = safeSession.getItem("zargul_admin_auth");
      if (sessionAuth === "true") {
        setIsAdminAuthenticated(true);
      }

      // 6. Live Global Sync: Fast single fetch with guaranteed all-category merge
      const fetchLiveData = () => {
        fetch(`/api/store-data?t=${Date.now()}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((live) => {
            if (!live) return;
            const isAdmin = safeSession.getItem("zargul_admin_auth") === "true";

            if (!isAdmin) {
              if (Array.isArray(live.products) && live.products.length > 0) {
                const existingMap = new Map();
                for (const initP of INITIAL_PRODUCTS) {
                  existingMap.set(initP.id, initP);
                }
                for (const p of live.products) {
                  if (existingMap.has(p.id)) {
                    existingMap.set(p.id, { ...existingMap.get(p.id), ...p });
                  } else {
                    existingMap.set(p.id, p);
                  }
                }
                const mergedProducts = Array.from(existingMap.values());
                setProducts(mergedProducts);
                safeStorage.setItem("zargul_products", JSON.stringify(mergedProducts));
              }

              if (live.storeConfig && typeof live.storeConfig === "object") {
                setStoreConfig((prev) => ({ ...prev, ...live.storeConfig }));
                safeStorage.setItem("zargul_store_config", JSON.stringify(live.storeConfig));
              }

              if (Array.isArray(live.reviews) && live.reviews.length > 0) {
                setReviews(live.reviews);
                safeStorage.setItem("zargul_reviews", JSON.stringify(live.reviews));
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

  // Secret Royal Vault Helper
  const unlockVault = () => {
    safeStorage.setItem("zargul_vault_unlocked", "true");
    setIsVaultUnlocked(true);
    showToast("🎉 Shahi Tijori Unlocked! +1 FREE 30ml Perfume Active!");
  };

  // Claim Shahi Tijori 30ml Luxury Perfume Free Gift
  const claimVaultFreeGift = () => {
    const freeItem = {
      id: "free-30ml-perfume-reward",
      title: "🎁 + 30ml FREE Perfume (Tijori Claimed)",
      category: "Perfumes",
      price: 0,
      originalPrice: 1500,
      image: "/assets/perfumes/free_30ml_perfume_reward.jpg",
      isFreeGift: true,
      tag: "100% FREE GIFT",
      description: "Exclusive Shahi Tijori 30ml Luxury Eau de Parfum reward unlocked with Secret Code 7860."
    };
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.product?.id === "free-30ml-perfume-reward" || it.product?.isFreeGift || it.isLockedFreeGift
      );
      if (existingIdx !== -1) return prev;
      const updated = [
        {
          product: freeItem,
          variant: "30ml Royal EDP (Secret Code: 7860)",
          extraPrice: 0,
          quantity: 1,
          isLockedFreeGift: true
        },
        ...prev
      ];
      safeStorage.setItem("zargul_cart", JSON.stringify(updated));
      return updated;
    });
    safeStorage.setItem("zargul_vault_unlocked", "true");
    setIsVaultUnlocked(true);
    showToast("🎉 30ml FREE Perfume Locked into your Bag!");
    setIsCartOpen(true);
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
      safeStorage.setItem("zargul_cart", JSON.stringify(updated));
      return updated;
    });
    showToast(`Added "${product.title}" to your Bag!`);
    setIsCartOpen(true);
  };

  const updateCartQty = (index, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        if (updated[index].isLockedFreeGift || updated[index].product?.isFreeGift) {
          showToast("🎁 Free Shahi Tijori Gift is locked at 1 per order!", "info");
          return prev;
        }
        updated[index].quantity += delta;
        if (updated[index].quantity <= 0) {
          updated.splice(index, 1);
        }
      }
      safeStorage.setItem("zargul_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => {
      if (prev[index]?.isLockedFreeGift || prev[index]?.product?.isFreeGift) {
        showToast("🎁 Free Shahi Tijori Gift cannot be removed!", "info");
        return prev;
      }
      const updated = prev.filter((_, idx) => idx !== index);
      safeStorage.setItem("zargul_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    safeStorage.removeItem("zargul_cart");
  };

  // Admin Data Modifiers
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    safeStorage.setItem("zargul_products", JSON.stringify(newProducts));
  };

  const updateStoreConfig = (newConfig) => {
    setStoreConfig(newConfig);
    safeStorage.setItem("zargul_store_config", JSON.stringify(newConfig));
  };

  const updateReviews = (newReviews) => {
    setReviews(newReviews);
    safeStorage.setItem("zargul_reviews", JSON.stringify(newReviews));
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
        totalCartCount,
        isVaultUnlocked,
        unlockVault,
        claimVaultFreeGift,
        isVaultModalOpen,
        setIsVaultModalOpen
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
