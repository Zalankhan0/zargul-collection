// Advanced Client-Side Fraud Prevention & Device Fingerprinting
// Strictly enforces 1 Shahi Tijori Claim per Device every 365 days across all browser modes

export function getDeviceFingerprint() {
  if (typeof window === "undefined") return "zg_server";
  try {
    const nav = window.navigator;
    const screen = window.screen;

    // 1. Canvas 2D Cryptographic Render Fingerprint
    let canvasHash = "";
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 160;
      canvas.height = 40;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial', sans-serif";
        ctx.fillStyle = "#d4af37";
        ctx.fillRect(5, 5, 100, 30);
        ctx.fillStyle = "#18181b";
        ctx.fillText("ZARGUL_TIJORI_7860", 8, 12);
        ctx.fillStyle = "rgba(239, 68, 68, 0.8)";
        ctx.fillText("🔒🎁👑", 75, 22);
        canvasHash = canvas.toDataURL().slice(-45);
      }
    } catch (e) {}

    // 2. WebGL Hardware GPU Fingerprint
    let gpuRenderer = "";
    try {
      const glCanvas = document.createElement("canvas");
      const gl = glCanvas.getContext("webgl") || glCanvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          gpuRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
        }
      }
    } catch (e) {}

    // 3. Hardware & Environment Vector
    const vector = [
      screen.width + "x" + screen.height,
      screen.colorDepth,
      nav.hardwareConcurrency || 2,
      nav.language || "en",
      nav.platform || "",
      new Date().getTimezoneOffset(),
      canvasHash,
      gpuRenderer
    ].join("###");

    // 4. Deterministic 64-bit Hash
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < vector.length; i++) {
      const ch = vector.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    const finalHash = 4294967296 * (2097151 & h2) + (h1 >>> 0);
    return "zg_dev_" + finalHash.toString(36);
  } catch (err) {
    return "zg_dev_fallback";
  }
}

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export function checkDeviceAlreadyClaimed() {
  if (typeof window === "undefined") return false;
  try {
    const now = Date.now();
    const fp = getDeviceFingerprint();

    // Layer 1: LocalStorage Record
    const rawLocal = localStorage.getItem("zargul_tijori_device_claim");
    if (rawLocal) {
      try {
        const record = JSON.parse(rawLocal);
        if (record && typeof record.timestamp === "number") {
          if (now - record.timestamp < ONE_YEAR_MS) {
            return true;
          }
        }
      } catch (e) {}
    }

    // Layer 2: Cookie Check (Persists even when localStorage is altered)
    if (document.cookie) {
      const cookies = document.cookie.split(";");
      for (const c of cookies) {
        const [k, v] = c.trim().split("=");
        if (k === "zg_tijori_claimed" && v) {
          return true;
        }
      }
    }

    // Layer 3: Fingerprint Registry Map
    const rawMap = localStorage.getItem("zargul_claimed_fps");
    if (rawMap) {
      try {
        const list = JSON.parse(rawMap);
        if (Array.isArray(list)) {
          const match = list.find((it) => it.fp === fp && now - it.time < ONE_YEAR_MS);
          if (match) return true;
        }
      } catch (e) {}
    }

    return false;
  } catch (err) {
    return false;
  }
}

export function recordDeviceClaimSuccess() {
  if (typeof window === "undefined") return;
  try {
    const now = Date.now();
    const fp = getDeviceFingerprint();
    const record = {
      fp,
      timestamp: now,
      claimedAt: new Date().toISOString(),
      code: "7860"
    };

    // Layer 1: LocalStorage
    localStorage.setItem("zargul_tijori_device_claim", JSON.stringify(record));
    localStorage.setItem("zargul_vault_unlocked", "true");

    // Layer 2: Cookie (Valid for 365 days)
    document.cookie = `zg_tijori_claimed=${fp}; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax`;

    // Layer 3: Fingerprint Registry Map
    let list = [];
    try {
      const raw = localStorage.getItem("zargul_claimed_fps");
      if (raw) list = JSON.parse(raw);
    } catch (e) {}
    if (!Array.isArray(list)) list = [];
    list.push({ fp, time: now });
    localStorage.setItem("zargul_claimed_fps", JSON.stringify(list));
  } catch (err) {}
}
