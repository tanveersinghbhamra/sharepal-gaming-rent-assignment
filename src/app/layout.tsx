import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import "./globals.css";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharepal-gaming-rent-assignment.vercel.app";
const TITLE = "Rent gaming gadgets in Bangalore | Zero Deposit Rentals";
const DESCRIPTION =
    "Rent gaming gadgets in Bangalore from SharePal - India's most trusted lifestyle gear rental platform. Zero Deposit | Free Delivery | Excellent Quality |";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: `${TITLE} | SharePal`,
    description: DESCRIPTION,
    icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
    alternates: { canonical: "/bangalore/gaming-gadgets-on-rent" },
    openGraph: {
        type: "website",
        siteName: "SharePal",
        locale: "en_IN",
        url: "/bangalore/gaming-gadgets-on-rent",
        title: TITLE,
        description: DESCRIPTION,
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
    themeColor: "#4C187C",
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en-IN">
            <body className="antialiased">{children}</body>
        </html>
    );
}
