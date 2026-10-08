"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs, moreFaqs } from "@/data/content";

export default function Faq() {
    const [open, setOpen] = useState<number | null>(null);
    const [more, setMore] = useState(false);
    const list = more ? [...faqs, ...moreFaqs] : faqs;

    return (
        <section
            className="reveal container !my-10 rounded-3xl bg-gray-100 p-4 py-10"
            aria-labelledby="faq-title"
        >
            <div className="flex w-full flex-col items-start gap-2 p-4 !pt-0 md:p-6">
                <h2 id="faq-title" className="py-2 text-h4 text-neutral-900 md:text-h2">
                    Frequently Asked Questions (FAQs)
                </h2>
                <div className="w-full">
                    {list.map((f, i) => {
                        const isOpen = open === i;
                        return (
                            <div
                                key={f.q}
                                className="rounded-xl bg-gray-100 transition-colors duration-300 hover:bg-gray-150"
                            >
                                <h3 className="flex">
                                    <button
                                        type="button"
                                        id={`faq-btn-${i}`}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-panel-${i}`}
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        className="flex flex-1 items-center justify-between gap-4 px-4 py-4 text-left text-sm leading-5 font-medium hover:underline"
                                    >
                                        {f.q}
                                        <ChevronDown
                                            className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </h3>
                                <div
                                    id={`faq-panel-${i}`}
                                    role="region"
                                    aria-labelledby={`faq-btn-${i}`}
                                    className="accordion-panel"
                                    data-open={isOpen}
                                >
                                    <div>
                                        <p className="px-4 pb-4 text-sm leading-6 text-neutral-600">
                                            {f.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button
                    type="button"
                    onClick={() => setMore((m) => !m)}
                    className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-4xl bg-neutral-150 px-6 py-3 text-sm font-semibold text-primary-900 transition-colors hover:bg-neutral-200 active:opacity-90 md:text-base"
                >
                    {more ? "Show fewer FAQ's" : "View more FAQ's"}
                </button>
            </div>
        </section>
    );
}
