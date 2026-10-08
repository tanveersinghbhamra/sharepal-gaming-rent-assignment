"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Headset, Mail } from "lucide-react";
import { footerCategories, footerColumns } from "@/data/content";
import { useStore } from "@/lib/store";
import { Logo, SocialIcon } from "./icons";

const seoCategories = [
    {
        title: "Action Cameras on Rent",
        body: "Capture your adventures in stunning detail with our range of action cameras. Choose from top brands like GoPro, Insta360, and DJI, perfect for everything from extreme sports to casual vlogging. Whether you need high-quality video for your next trek or a 360-degree camera to capture every angle, we've got you covered.",
    },
    {
        title: "Cameras on Rent",
        body: "From DSLRs to mirrorless cameras, SharePal offers a wide selection of high-quality cameras for rent. Whether you're a professional photographer or an enthusiast, our range of cameras will suit your every need. Capture life's precious moments without the hefty price tag of ownership.",
    },
    {
        title: "Trekking Gear on Rent",
        body: "Gear up for your next adventure with SharePal's range of trekking equipment. Rent everything you need, from jackets and shoes to backpacks and accessories. Our trekking gear is designed to keep you comfortable and safe on your journey, no matter the terrain.",
    },
    {
        title: "Riding Gear on Rent",
        body: "Stay safe and stylish on your rides with our collection of riding gear. From helmets to jackets, we offer everything you need to enjoy a thrilling ride. Our riding gear is carefully selected to ensure you have the best experience on the road.",
    },
    {
        title: "Projectors/Speakers on Rent",
        body: "Make your events memorable with our high-quality projectors and speakers. Whether you're hosting a movie night, a presentation, or a party, our rental options provide top-notch audio and visual equipment to make your event a success.",
    },
    {
        title: "Creator Gear on Rent",
        body: "For content creators, having access to the right gear is crucial. SharePal offers a wide range of creator gear, including lights, tripods, and microphones. Elevate your content without the burden of buying expensive equipment.",
    },
    {
        title: "Gaming Consoles on Rent",
        body: "Experience the latest gaming consoles without the upfront cost. Rent PS5, Xbox, and more from SharePal. Whether you're a casual gamer or a hardcore enthusiast, our gaming consoles will provide hours of entertainment.",
    },
];

function Seo({ city }: { city: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col gap-2">
            <div
                className="relative overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: open ? 2400 : 260 }}
                id="seo-content"
            >
                <div className="text-sm text-neutral-300 [&_a]:font-semibold [&_a]:text-primary-100 [&_a]:underline [&_h2]:my-1 [&_h2]:text-b4 [&_h2]:font-bold [&_h2]:text-gray-150 [&_h3]:my-2 [&_h3]:text-b4 [&_h3]:font-bold [&_h3]:text-gray-150 [&_li]:mt-1 [&_li]:leading-5 [&_p]:mt-1 [&_p]:leading-5 [&_strong]:font-bold [&_strong]:text-gray-150 [&_ul]:list-none">
                    <h2>Renting from SharePal in {city}</h2>
                    <p>
                        Discover the convenience of renting from SharePal, your trusted partner in{" "}
                        {city} for all your rental needs. Whether you&apos;re exploring the vibrant
                        streets of Koramangala, setting up a shoot in Indiranagar, or planning a
                        trek from the outskirts of Whitefield, SharePal has you covered. We offer a
                        wide range of products, including cameras, action cameras, gaming consoles,
                        projectors, speakers, trekking gear, riding gear, and creator gear. With
                        free home delivery and pickup services, flexible rental tenures, and an
                        easy-to-use platform, renting has never been easier. Experience the freedom
                        to rent what you need, when you need it, without the commitment of buying.
                    </p>
                    <p>&nbsp;</p>
                    <h2>Categories on Rent</h2>
                    {seoCategories.map((c) => (
                        <div key={c.title}>
                            <h3>{c.title}</h3>
                            <p>{c.body}</p>
                        </div>
                    ))}
                    <p>&nbsp;</p>
                    <h2>Renting vs. Buying</h2>
                    <ul>
                        <li>
                            <strong>Cost-Effective</strong>: Renting allows you to access
                            high-quality products without the significant investment of buying. Save
                            money by renting only when you need the product.
                        </li>
                        <li>
                            <strong>Flexibility</strong>: Enjoy the flexibility to rent for as long
                            as you need, whether it&apos;s for a day, a week, or a month. No
                            long-term commitments required.
                        </li>
                        <li>
                            <strong>Access to the Latest Gear</strong>: Stay up-to-date with the
                            latest technology and trends without the hassle of reselling outdated
                            products.
                        </li>
                        <li>
                            <strong>No Maintenance Worries</strong>: Forget about maintenance and
                            storage concerns. With renting, you&apos;re free from the
                            responsibilities that come with ownership.
                        </li>
                    </ul>
                    <p>&nbsp;</p>
                    <h2>Why SharePal in {city}</h2>
                    <p>
                        SharePal stands out in {city} for its customer-focused services and unique
                        selling propositions (USPs):
                    </p>
                    <ul>
                        <li>
                            <strong>Zero Deposit</strong>: Rent without the worry of a hefty
                            deposit.
                        </li>
                        <li>
                            <strong>Free Delivery and Pickup</strong>: Enjoy the convenience of
                            having your rentals delivered to your doorstep and picked up when
                            you&apos;re done.
                        </li>
                        <li>
                            <strong>Wide Range of Products</strong>: From cameras to gaming
                            consoles, we offer a diverse selection of high-quality products for
                            rent.
                        </li>
                        <li>
                            <strong>Flexible Rental Tenures</strong>: Rent for a day, a week, or
                            even longer with our flexible rental options.
                        </li>
                        <li>
                            <strong>Top-Notch Customer Support</strong>: Our dedicated customer
                            support team is always ready to assist you with any questions or
                            concerns.
                        </li>
                    </ul>
                    <p>&nbsp;</p>
                    <h2>Read Our Reviews of Customers in SharePal {city}</h2>
                    <p>
                        <a
                            href="https://maps.app.goo.gl/GydVypN8UytSTiFU8"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read Google reviews of SharePal in {city}
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://www.trustpilot.com/review/sharepal.in"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read Trust Pilot reviews of our customers from {city}
                        </a>
                    </p>
                </div>
                {!open && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary-900 to-transparent" />
                )}
            </div>
            <button
                type="button"
                aria-expanded={open}
                aria-controls="seo-content"
                onClick={() => setOpen((o) => !o)}
                className="flex w-max items-center gap-1 text-bt4 text-neutral-200 transition-colors hover:text-neutral-100"
            >
                {open ? "Read Less" : "Read More"}
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>
        </div>
    );
}

function MobileCategory({ g }: { g: (typeof footerCategories)[number] }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-lg bg-primary-800 px-3 py-3 text-left text-xs font-semibold text-gray-100"
            >
                {g.title}
                <ChevronDown
                    className={`h-4 w-4 text-neutral-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <div className="accordion-panel" data-open={open}>
                <div>
                    <div className="flex flex-col gap-2 px-3 py-3">
                        {g.links.map((l) => (
                            <a key={l.label} href={l.href} className="text-b6 text-neutral-300">
                                {l.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Footer() {
    const { city, toast } = useStore();
    return (
        <footer className="bg-primary-900 py-5 pb-16 md:py-18 md:pb-10">
            <div className="container mx-auto flex w-full flex-col gap-5 md:gap-12">
                <div className="grid gap-6 max-md:hidden md:grid-cols-4 md:gap-10 lg:grid-cols-5">
                    {footerCategories.map((g) => (
                        <div key={g.title} className="flex w-full flex-col gap-4">
                            <h3 className="line-clamp-2 text-lg font-semibold text-gray-100">
                                {g.title}
                            </h3>
                            {g.links.map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    className="block w-full text-b4 text-neutral-300 transition-all duration-75 hover:text-neutral-200 hover:underline"
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-3 md:hidden">
                    {footerCategories.map((g) => (
                        <MobileCategory key={g.title} g={g} />
                    ))}
                </div>

                <Seo city={city} />

                <div className="flex w-full flex-col gap-8">
                    <div className="flex h-10 w-full items-center bg-linear-to-r from-primary-900 to-primary-950">
                        <Logo className="h-5.5" />
                    </div>
                    <div className="grid w-full grid-cols-2 gap-x-3 gap-y-6 md:gap-3 lg:grid-cols-5">
                        {footerColumns.map((col) => (
                            <div key={col.title}>
                                <h3 className="mb-3 min-w-max text-sh4 text-gray-100 md:mb-6">
                                    {col.title}
                                </h3>
                                <div className="flex min-w-max flex-col gap-1">
                                    {col.links.map((l) => (
                                        <a
                                            key={l.label}
                                            href="#"
                                            onClick={(e) => e.preventDefault()}
                                            className="block w-full min-w-max py-1.5 text-b6 text-neutral-300 decoration-transparent transition-all duration-300 hover:text-primary-100 hover:underline hover:decoration-white md:py-3 md:text-b4"
                                        >
                                            {l.label}
                                            {"isNew" in l && l.isNew && (
                                                <span className="ml-1 inline-flex -translate-y-2 rounded-full bg-secondary-500 px-2.5 py-px text-2xs font-bold text-secondary-900">
                                                    New
                                                </span>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div>
                            <h3 className="mb-3 min-w-max text-sh4 text-gray-100 md:mb-6">
                                Need Help
                            </h3>
                            <div className="flex min-w-max flex-col gap-2 text-neutral-300">
                                <button
                                    type="button"
                                    onClick={() =>
                                        toast({
                                            title: "Support",
                                            body: "Chat support opens here on the live site.",
                                            tone: "info",
                                        })
                                    }
                                    className="flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-white md:py-3"
                                >
                                    <Headset className="h-4 w-4 shrink-0" />
                                    <span className="text-b6 md:text-b4">Contact Support</span>
                                </button>
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className="py-1.5 text-b6 transition-colors duration-300 hover:text-white md:py-3 md:text-b4"
                                >
                                    Contact Us
                                </a>
                                <a
                                    href="mailto:care@sharepal.in"
                                    className="flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-white md:py-3"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span className="text-b6 md:text-b4">care@sharepal.in</span>
                                </a>
                                <div className="flex items-center gap-3 py-1.5 md:py-3">
                                    {(["facebook", "instagram", "linkedin"] as const).map((k) => (
                                        <a
                                            key={k}
                                            href="#"
                                            onClick={(e) => e.preventDefault()}
                                            aria-label={`SharePal on ${k}`}
                                            className="transition duration-300 hover:-translate-y-0.5 hover:opacity-80"
                                        >
                                            <SocialIcon kind={k} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-center justify-between gap-4 border-t border-primary-700 py-6 text-sm font-medium text-primary-300 max-md:flex-col">
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="group flex items-center gap-2 max-md:w-full max-md:justify-center max-md:rounded-sm max-md:bg-primary-850 max-md:py-2"
                    >
                        Go up{" "}
                        <ChevronUp className="transition-transform duration-300 group-hover:-translate-y-1" />
                    </button>
                    <p>© 2026. SWNAC E-Kiraya Services Pvt Ltd</p>
                    <p>Made with ♥️ for India</p>
                </div>
                <p className="-mt-4 mb-4 text-center text-tiny text-primary-300/70 md:-mt-8 mb-4">
                    Frontend recreation built by Tanveersingh Bhamra as a hiring assignment for SharePal · product data
                    from the provided product-list.json
                </p>
            </div>
        </footer>
    );
}
