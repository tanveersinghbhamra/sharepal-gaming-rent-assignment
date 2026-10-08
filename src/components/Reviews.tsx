"use client";

import { useEffect, useRef, useState } from "react";
import { stats, testimonials } from "@/data/content";
import { GoogleIcon, StarIcon } from "./icons";

function ReviewCard({ t }: { t: (typeof testimonials)[number] }) {
    return (
        <figure className="flex max-w-82 min-w-82 flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-100 p-3 transition duration-300 hover:-translate-y-1 hover:shadow-card-lg md:rounded-3xl lg:max-w-90 lg:min-w-90 lg:px-0 lg:py-4">
            <div className="flex flex-col gap-3 md:px-4">
                <div className="flex gap-2">
                    <GoogleIcon />
                    <div className="flex gap-1" aria-label={`${t.stars} out of 5 stars`}>
                        {Array.from({ length: t.stars }).map((_, i) => (
                            <StarIcon key={i} />
                        ))}
                    </div>
                </div>
                <blockquote className="line-clamp-4 text-sh6 text-primary-900 lg:text-sh2">
                    “ {t.text} ”
                </blockquote>
            </div>
            <figcaption className="flex items-center gap-5 md:px-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-150 text-xs font-semibold text-primary-600 md:text-base">
                    {t.initials}
                </span>
                <div>
                    <p className="text-xs font-medium text-gray-600 lg:text-sm">{t.name}</p>
                    <p className="text-2xs text-gray-400 lg:text-sm">
                        {t.city} • {t.cat}
                    </p>
                </div>
            </figcaption>
        </figure>
    );
}

function CountUp({
    value,
    decimals = 0,
    suffix,
}: {
    value: number;
    decimals?: number;
    suffix: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const [n, setN] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting) return;
                io.disconnect();
                const start = performance.now();
                const dur = 1400;
                const tick = (now: number) => {
                    const p = Math.min(1, (now - start) / dur);
                    setN(value * (1 - Math.pow(1 - p, 3)));
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            },
            { threshold: 0.4 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [value]);
    return (
        <span ref={ref} className="tabular-nums">
            {n.toFixed(decimals)}
            {suffix}
        </span>
    );
}

export default function Reviews() {
    return (
        <section
            className="flex flex-col gap-5 bg-gray-100 py-4 lg:gap-12 lg:py-12"
            aria-labelledby="reviews-title"
        >
            <h2
                id="reviews-title"
                className="reveal px-4 text-center font-ubuntu text-d7 md:text-d4"
            >
                Served more than <span className="text-decorative-orange">1 Lakh Orders</span>
            </h2>
            <div className="group overflow-hidden p-2 py-3">
                <div
                    className="flex w-max animate-marquee gap-4 px-4 group-hover:[animation-play-state:paused]"
                    style={{ ["--duration" as string]: "60s" }}
                >
                    {[0, 1].map((k) => (
                        <div key={k} className="flex shrink-0 gap-4" aria-hidden={k === 1}>
                            {testimonials.map((t) => (
                                <ReviewCard key={t.name + k} t={t} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="container grid w-full grid-cols-3 justify-between gap-3 border-y-2 border-neutral-150 px-0 py-4 md:gap-6 md:py-6">
                {stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-2">
                        <p className="text-gradient-review py-0 text-center font-ubuntu text-2xl font-bold md:py-3 lg:text-6xl">
                            <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                        </p>
                        <p className="text-center text-xs text-gray-800 capitalize sm:text-xl">
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
