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
import {
    CartDrawer,
    ChatBubble,
    CityPicker,
    FloatingDatePill,
    MobileNav,
    SearchOverlay,
    Toaster,
} from "./Overlays";

export default function GamingPage() {
    return (
        <StoreProvider>
            <div id="top" />
            <Header />
            <main className="min-h-dvh">
                <div className="container px-0 pt-24 pb-6 md:pt-28 lg:pt-20">
                    {/* mobile: purple block with tabs + banner */}
                    <div className="relative bg-linear-to-t from-category-purple to-category-purple-dark pb-3 md:hidden">
                        <div className="py-1">
                            <CategoryTabs onDark />
                        </div>
                        <div className="px-2">
                            <HeroBanner mobile />
                        </div>
                    </div>
                    {/* desktop: sticky tab bar */}
                    <div className="sticky top-(--header-offset) z-20 hidden bg-neutral-150 py-1 transition-all duration-500 md:block">
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
