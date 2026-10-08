"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Headset, Mail } from "lucide-react";
import { footerCategories, footerColumns } from "@/data/content";
import { useStore } from "@/lib/store";
import { Logo, SocialIcon } from "./icons";

function Seo({ city }: { city: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: open ? 2000 : 260 }}
        id="seo-content"
      >
        <div className="space-y-2 text-sm font-light leading-6 text-neutral-300 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-gray-100 [&_h4]:mt-3 [&_h4]:text-base [&_h4]:font-medium [&_h4]:text-gray-100 [&_strong]:font-bold [&_strong]:text-gray-150">
          <h3>Renting from SharePal in {city}</h3>
          <p>
            Discover the convenience of renting from SharePal, your trusted partner in {city} for all your rental needs. Whether you&apos;re
            exploring the vibrant streets of Koramangala, setting up a shoot in Indiranagar, or planning a trek from the outskirts of Whitefield,
            SharePal has you covered. We offer a wide range of products, including cameras, action cameras, gaming consoles, projectors, speakers,
            trekking gear, riding gear, and creator gear. With free home delivery and pickup services, flexible rental tenures, and an easy-to-use
            platform, renting has never been easier. Experience the freedom to rent what you need, when you need it, without the commitment of buying.
          </p>
          <h3>Categories on Rent</h3>
          <h4>Gaming Consoles on Rent</h4>
          <p>
            Experience the latest gaming consoles without the upfront cost. Rent PS5, Xbox, and more from SharePal. Whether you&apos;re a casual
            gamer or a hardcore enthusiast, our gaming consoles will provide hours of entertainment.
          </p>
          <h4>Action Cameras on Rent</h4>
          <p>
            Capture your adventures in stunning detail with our range of action cameras. Choose from top brands like GoPro, Insta360, and DJI,
            perfect for everything from extreme sports to casual vlogging.
          </p>
          <h4>Cameras on Rent</h4>
          <p>
            From DSLRs to mirrorless cameras, SharePal offers a wide selection of high-quality cameras for rent. Capture life&apos;s precious
            moments without the hefty price tag of ownership.
          </p>
          <h4>Projectors/Speakers on Rent</h4>
          <p>
            Make your events memorable with our high-quality projectors and speakers. Whether you&apos;re hosting a movie night, a presentation, or
            a party, our rental options provide top-notch audio and visual equipment.
          </p>
          <h3>Renting vs. Buying</h3>
          <ul className="list-inside list-disc space-y-1">
            <li><strong>Cost-Effective</strong>: Access high-quality products without the significant investment of buying.</li>
            <li><strong>Flexibility</strong>: Rent for a day, a week, or a month. No long-term commitments required.</li>
            <li><strong>Access to the Latest Gear</strong>: Stay up-to-date without the hassle of reselling outdated products.</li>
            <li><strong>No Maintenance Worries</strong>: Forget about maintenance and storage concerns.</li>
          </ul>
          <h3>Why SharePal in {city}</h3>
          <ul className="list-inside list-disc space-y-1">
            <li><strong>Zero Deposit</strong>: Rent without the worry of a hefty deposit.</li>
            <li><strong>Free Delivery and Pickup</strong>: Rentals delivered to your doorstep and picked up when you&apos;re done.</li>
            <li><strong>Wide Range of Products</strong>: From cameras to gaming consoles, a diverse selection of high-quality products.</li>
            <li><strong>Flexible Rental Tenures</strong>: Rent for a day, a week, or even longer.</li>
            <li><strong>Top-Notch Customer Support</strong>: Our team is always ready to help with any questions or concerns.</li>
          </ul>
        </div>
        {!open && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary-900 to-transparent" />}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="seo-content"
        onClick={() => setOpen((o) => !o)}
        className="flex w-max items-center gap-1 text-bt4 text-neutral-200 transition-colors hover:text-neutral-100"
      >
        {open ? "Read Less" : "Read More"}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
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
        className="flex w-full items-center justify-between rounded-[8px] bg-primary-800 px-3 py-3 text-left text-xs font-semibold text-gray-100"
      >
        {g.title}
        <ChevronDown className={`h-4 w-4 text-neutral-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
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
    <footer className="bg-primary-900 py-5 pb-24 md:py-[72px] md:pb-10">
      <div className="container mx-auto flex w-full flex-col gap-5 md:gap-12">
        <div className="grid gap-6 max-md:hidden md:grid-cols-4 md:gap-10 lg:grid-cols-5">
          {footerCategories.map((g) => (
            <div key={g.title} className="flex w-full flex-col gap-4">
              <h3 className="line-clamp-2 text-lg font-semibold text-gray-100">{g.title}</h3>
              {g.links.map((l) => (
                <a key={l.label} href={l.href} className="w-max text-b4 text-neutral-300 transition-all duration-75 hover:text-neutral-200 hover:underline">
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 md:hidden">
          {footerCategories.map((g) => (
            <MobileCategory key={g.title} g={g} />
          ))}
        </div>

        <Seo city={city} />

        <div className="flex w-full flex-col gap-8">
          <div className="flex h-10 w-full items-center bg-[linear-gradient(90deg,#030d31,#03134f)]">
            <Logo className="w-28" />
          </div>
          <div className="grid w-full grid-cols-2 gap-x-3 gap-y-6 md:gap-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 min-w-max text-sh4 text-gray-100 md:mb-6">{col.title}</h3>
                <div className="flex min-w-max flex-col gap-1">
                  {col.links.map((l) => (
                    <a
                      key={l.label}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="w-max py-1.5 text-b6 text-neutral-300 decoration-transparent transition-all duration-300 hover:text-primary-100 hover:underline hover:decoration-white md:py-3 md:text-b4"
                    >
                      {l.label}
                      {"isNew" in l && l.isNew && (
                        <span className="ml-1 inline-flex -translate-y-2 rounded-full bg-secondary-500 px-2.5 py-[0.5px] text-[10px] font-bold text-secondary-900">
                          New
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h3 className="mb-3 min-w-max text-sh4 text-gray-100 md:mb-6">Need Help</h3>
              <div className="flex min-w-max flex-col gap-2 text-neutral-300">
                <button
                  type="button"
                  onClick={() => toast({ title: "Support", body: "Chat support opens here on the live site.", tone: "info" })}
                  className="flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-white md:py-3"
                >
                  <Headset className="h-4 w-4 shrink-0" />
                  <span className="text-b6 md:text-b4">Contact Support</span>
                </button>
                <a href="#" onClick={(e) => e.preventDefault()} className="py-1.5 text-b6 transition-colors duration-300 hover:text-white md:py-3 md:text-b4">
                  Contact Us
                </a>
                <a href="mailto:care@sharepal.in" className="flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-white md:py-3">
                  <Mail className="h-4 w-4" />
                  <span className="text-b6 md:text-b4">care@sharepal.in</span>
                </a>
                <div className="flex items-center gap-3 py-1.5 md:py-3">
                  {(["facebook", "instagram", "linkedin"] as const).map((k) => (
                    <a key={k} href="#" onClick={(e) => e.preventDefault()} aria-label={`SharePal on ${k}`} className="transition-[opacity,transform] duration-300 hover:-translate-y-0.5 hover:opacity-80">
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
            Go up <ChevronUp className="transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
          <p>© 2026. SWNAC E-Kiraya Services Pvt Ltd</p>
          <p>Made with ♥️ for India</p>
        </div>
        <p className="-mt-4 text-center text-[11px] text-primary-300/70 md:-mt-8">
          Front-end recreation built as a hiring assignment for SharePal · product data from the provided product-list.json
        </p>
      </div>
    </footer>
  );
}
