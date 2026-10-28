import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import TopOfferBar from "@/components/TopOfferBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SecretAdminModal from "@/components/SecretAdminModal";
import Toast from "@/components/Toast";
import { Analytics } from "@vercel/analytics/next";

export const viewport = {
  themeColor: "#faf9f6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Zargul Collection ✦ Executive Timepieces & Haute Parfumerie",
  description: "Curated luxury timepieces, Eau de Parfums, and handcrafted accessories with our signature 3D Soft Claymorphism aesthetic. Cash on Delivery across Pakistan.",
  icons: {
    icon: "/assets/logo.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#faf9f6" />
        <meta name="color-scheme" content="light" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: "#faf9f6", color: "#141316", minHeight: "100vh", margin: 0, padding: 0 }}>
        <StoreProvider>
          {/* 1-Line Animated Top Offer Marquee */}
          <TopOfferBar />

          {/* Sticky Navigation Bar */}
          <Navbar />

          {/* Page Body */}
          <main>{children}</main>

          {/* Luxury Footer with 5-tap mobile trigger */}
          <Footer />

          {/* Shopping Bag Drawer & COD Drawer */}
          <CartDrawer />

          {/* 100% Secret Admin Portal (Ctrl+Shift+Z or 5-Tap Trigger) */}
          <SecretAdminModal />

          {/* Reactive Toast Notification */}
          <Toast />

          {/* Floating Contact Buttons (Email & WhatsApp) */}
          <div className="floating-contact-container">
            <a
              href="mailto:zargulcollection1@gmail.com"
              className="floating-contact-btn email"
              aria-label="Email Zargul Collection"
              title="Email Us"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>

            <a
              href="https://wa.me/923485245955?text=Hello%20Zargul%20Collection,%20I%20am%20interested%20in%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="floating-contact-btn whatsapp"
              aria-label="WhatsApp Concierge"
              title="Chat on WhatsApp"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2c-5.514 0-9.99 4.478-9.99 9.99 0 1.996.586 3.856 1.597 5.433L2.053 22l4.743-1.222c1.517.931 3.29 1.464 5.235 1.464 5.514 0 9.99-4.478 9.99-9.99 0-5.512-4.476-9.99-9.99-9.99zm5.626 14.18c-.237.666-1.183 1.221-1.74 1.285-.506.059-1.157.085-1.871-.144-1.265-.405-2.228-.962-3.136-1.766-.81-.718-1.51-1.579-1.921-2.453-.306-.65-.411-1.28-.411-1.89 0-1.139.544-1.685.986-2.124.168-.166.368-.242.544-.242.176 0 .346.008.497.017.159.01.36.033.529.418.176.402.604 1.472.656 1.58.05.109.084.235.008.386-.075.151-.118.243-.235.378-.118.134-.244.302-.353.403-.118.109-.244.227-.101.47.143.243.638 1.05 1.378 1.706.958.85 1.764 1.118 2.016 1.243.252.126.395.101.546-.067.151-.168.647-.756.823-1.017.176-.26.353-.218.596-.126.244.092 1.546.73 1.815.865.269.135.445.202.513.319.067.118.067.68-.17 1.347z"/>
              </svg>
            </a>
          </div>
        </StoreProvider>

        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
