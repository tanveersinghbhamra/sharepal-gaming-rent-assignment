import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import "./globals.css";

export const metadata: Metadata = {
    title: "Rent gaming gadgets in Bangalore | Zero Deposit Rentals | SharePal",
    description:
        "Rent PS5, Xbox, Oculus VR and racing wheels in Bangalore with zero deposit, free delivery and pickup. Flexible daily, weekly and monthly gaming console rentals.",
    icons: { icon: "/favicon.svg" },
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
