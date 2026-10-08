import { IMG } from "@/data/content";

const banners = {
    assets: {
        href: "https://assets.sharepal.in/",
        desktop: `${IMG}/sharepal-banners/assets-fund-banner.png`,
        mobile: `${IMG}/sharepal-banners/asset-partner-mobile.png`,
        alt: "Become an Asset Partner. Earn monthly with SharePal",
        wrap: "md:my-5",
    },
    earn: {
        href: "https://earnwithus.sharepal.in/",
        desktop: `${IMG}/sharepal-banners/ews-generic-banner-desktop.png`,
        mobile: `${IMG}/sharepal-banners/ews-generic-banner-mobile.png`,
        alt: "Earn with SharePal by renting out your gear",
        wrap: "py-2 md:py-4 lg:py-6",
    },
} as const;

/** Full-width promo strips SharePal places inside the product grid (after rows 1 and 2). */
export default function PromoBanner({ kind }: { kind: keyof typeof banners }) {
    const b = banners[kind];
    return (
        <div className={`col-span-full ${b.wrap}`}>
            <a
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-lg md:rounded-2xl"
            >
                <picture>
                    <source media="(min-width: 48rem)" srcSet={b.desktop} />
                    <img
                        src={b.mobile}
                        alt={b.alt}
                        width={1920}
                        height={400}
                        loading="lazy"
                        className="h-full w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-101 md:rounded-2xl"
                    />
                </picture>
            </a>
        </div>
    );
}
