"use client";

import { StoreProvider } from "@/lib/store";
import Header from "./Header";
import CategoryTabs from "./CategoryTabs";
import HeroBanner from "./HeroBanner";
import ProductSection from "./ProductSection";
import Faq from "./Faq";
import Breadcrumb from "./Breadcrumb";
import Reviews from "./Reviews";
import Footer from "./Footer";
import DateModal from "./DateModal";
import Reveal from "./Reveal";
import { CartDrawer, ChatBubble, CityPicker, FloatingDatePill, MobileNav, SearchOverlay, Toaster } from "./Overlays";

export default function GamingPage() {
  return (
    <StoreProvider>
      <div id="top" />
      <Header />
      <main className="min-h-dvh">
        <div className="container px-0 pb-6 pt-[96px] md:pt-[112px] lg:pt-[84px]">
          {/* mobile: purple block with tabs + banner */}
          <div className="relative pb-3 md:hidden" style={{ background: "linear-gradient(360deg, #8A2BE2 0%, #4C187C 100%)" }}>
            <div className="py-1">
              <CategoryTabs onDark />
            </div>
            <div className="px-2">
              <HeroBanner mobile />
            </div>
          </div>
          {/* desktop: sticky tab bar */}
          <div className="sticky top-0 z-20 hidden bg-neutral-150/90 py-1 backdrop-blur-md md:block">
            <CategoryTabs />
          </div>
          <ProductSection />
        </div>
        <Faq />
        <Breadcrumb />
        <Reviews />
      </main>
      <Footer />
      <FloatingDatePill />
      <ChatBubble />
      <MobileNav />
      <DateModal />
      <CartDrawer />
      <SearchOverlay />
      <CityPicker />
      <Toaster />
      <Reveal />
    </StoreProvider>
  );
}
