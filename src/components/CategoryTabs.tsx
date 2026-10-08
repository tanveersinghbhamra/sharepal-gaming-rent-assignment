"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { superCategories } from "@/data/content";
import { useStore } from "@/lib/store";

export default function CategoryTabs({ onDark = false }: { onDark?: boolean }) {
    const { toast } = useStore();
    const track = useRef<HTMLUListElement>(null);

    const scrollBy = (dir: 1 | -1) => {
        const el = track.current;
        if (!el) return;
        el.scrollBy({ left: dir * el.clientWidth * 0.4, behavior: "smooth" });
    };

    return (
        <nav aria-label="Super categories" className="relative mx-auto w-full max-w-3xl px-8">
            <ul
                ref={track}
                className="scrollbar-none flex snap-x snap-mandatory items-center overflow-x-auto scroll-smooth"
            >
                {superCategories.map((c) => (
                    <li
                        key={c.label}
                        className="shrink-0 basis-2/5 snap-start px-2 py-2 text-center sm:basis-1/2 md:basis-1/3 md:px-4 lg:basis-1/4"
                    >
                        <a
                            href={c.href}
                            aria-current={c.active ? "page" : undefined}
                            onClick={(e) => {
                                if (!c.active) {
                                    e.preventDefault();
                                    toast({
                                        title: c.label,
                                        body: "Only the Gaming page is part of this recreation.",
                                        tone: "info",
                                    });
                                }
                            }}
                            className={`group relative inline-block w-full max-w-44 px-3 transition-colors duration-200 ${
                                c.active ? "text-sh4" : "text-sh5"
                            } ${onDark ? "text-gray-200 hover:text-white" : "text-neutral-700 hover:text-gray-900"}`}
                        >
                            <span className="inline-block transition-transform duration-200 group-hover:-translate-y-px">
                                {c.label}
                            </span>
                            <span
                                className={`absolute -bottom-2 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-category-purple transition-all duration-300 ${
                                    c.active
                                        ? "w-full md:w-10/12"
                                        : "w-0 opacity-60 group-hover:w-1/2"
                                }`}
                            />
                        </a>
                    </li>
                ))}
            </ul>
            {/* swiper-style arrows (mobile only, like the original) */}
            <button
                type="button"
                aria-label="Previous categories"
                onClick={() => scrollBy(-1)}
                className="absolute top-1/2 left-1 grid size-7 -translate-y-1/2 place-items-center rounded-full transition-colors hover:bg-primary-900 md:hidden"
            >
                <ChevronLeft className="size-4 text-gray-400" />
            </button>
            <button
                type="button"
                aria-label="Next categories"
                onClick={() => scrollBy(1)}
                className="absolute top-1/2 right-1 grid size-7 -translate-y-1/2 place-items-center rounded-full transition-colors hover:bg-primary-900 md:hidden"
            >
                <ChevronRight className="size-4 text-gray-400" />
            </button>
        </nav>
    );
}
