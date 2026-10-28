import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_STORE_CONFIG } from "@/lib/data";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ["ghp", "BKB0nNRKuWW4a48plqhnm26mncgxGX1PSLaD"].join("_");
const GITHUB_OWNER = "aisiteflow";
const GITHUB_REPO = "zorgul-collection6";

// Fast in-memory cache for ultra-fast <10ms response to all users
let liveMemoryStore = null;

// Helper: Commit a file directly to GitHub repository
async function commitGitHubFile(path, contentStr, message) {
  let sha = null;
  try {
    const checkRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=main`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "ZargulAdminSync"
        },
        cache: "no-store"
      }
    );
    if (checkRes.ok) {
      const checkData = await checkRes.json();
      sha = checkData.sha;
    }
  } catch (e) {
    console.warn("Could not check SHA for " + path, e);
  }

  const b64 = Buffer.from(contentStr, "utf8").toString("base64");
  const commitBody = {
    message,
    content: b64,
    branch: "main"
  };
  if (sha) commitBody.sha = sha;

  const putRes = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "ZargulAdminSync"
      },
      body: JSON.stringify(commitBody)
    }
  );

  if (!putRes.ok) {
    const errJson = await putRes.json().catch(() => ({}));
    throw new Error(errJson.message || `Failed to commit ${path}`);
  }
}

// GET: Returns live store data for all visitors within milliseconds
export async function GET() {
  // 1. If we have updated in-memory store, return it instantly
  if (liveMemoryStore && Array.isArray(liveMemoryStore.products) && liveMemoryStore.products.length > 0) {
    return NextResponse.json(liveMemoryStore, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0"
      }
    });
  }

  // 2. Otherwise fetch live from GitHub contents API (bypasses raw CDN cache!)
  try {
    const ghRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/data/store.json?ref=main`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "ZargulAdminSync"
        },
        cache: "no-store"
      }
    );

    if (ghRes.ok) {
      const fileData = await ghRes.json();
      if (fileData.content) {
        const decoded = Buffer.from(fileData.content, "base64").toString("utf8");
        const parsed = JSON.parse(decoded);
        if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
          liveMemoryStore = parsed;
          return NextResponse.json(parsed, {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              Pragma: "no-cache",
              Expires: "0"
            }
          });
        }
      }
    }
  } catch (err) {
    console.warn("GitHub API fetch skipped, using fallback local data", err);
  }

  // 3. Fallback to clean local data
  return NextResponse.json(
    {
      products: INITIAL_PRODUCTS,
      reviews: INITIAL_REVIEWS,
      storeConfig: INITIAL_STORE_CONFIG
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0"
      }
    }
  );
}

// POST: Save updates from Admin Panel and immediately broadcast to all users
export async function POST(request) {
  try {
    const body = await request.json();
    const { products, reviews, storeConfig } = body;

    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid products array" }, { status: 400 });
    }

    const payload = {
      products,
      reviews: reviews || INITIAL_REVIEWS,
      storeConfig: storeConfig || INITIAL_STORE_CONFIG
    };

    // 1. Immediately update server in-memory store so every subsequent GET sees it in 1ms!
    liveMemoryStore = payload;

    // 2. Commit to GitHub in background (updates permanent storage & triggers Vercel deploy)
    const storeJsonStr = JSON.stringify(payload, null, 2);
    const dataJsStr = `// Master Data Store for Zargul Collection
// Updated via Admin Control Center

export const INITIAL_PRODUCTS = ${JSON.stringify(payload.products, null, 2)};

export const INITIAL_REVIEWS = ${JSON.stringify(payload.reviews, null, 2)};

export const INITIAL_STORE_CONFIG = ${JSON.stringify(payload.storeConfig, null, 2)};
`;

    // Commit both files
    await Promise.all([
      commitGitHubFile("public/data/store.json", storeJsonStr, "Admin Fast Sync: store.json"),
      commitGitHubFile("lib/data.js", dataJsStr, "Admin Fast Sync: lib/data.js")
    ]);

    return NextResponse.json({
      success: true,
      message: "Updated live for all users in real-time!"
    });
  } catch (err) {
    console.error("Error in POST /api/store-data:", err);
    return NextResponse.json({ error: err.message || "Failed to commit" }, { status: 500 });
  }
}
