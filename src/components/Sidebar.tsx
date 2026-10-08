"use client";

import { subCategories } from "@/data/content";

export default function Sidebar({
    active,
    onSelect,
}: {
    active: string;
    onSelect: (id: string) => void;
}) {
    return (
        <aside className="block w-20 shrink-0 md:w-25 lg:w-30">
            <div className="sticky top-15 scrollbar-none max-h-sidebar overflow-y-auto rounded-lg bg-gray-100 p-1 shadow-sidebar transition-all duration-300 max-md:py-3 md:top-20 md:mt-3 md:rounded-xl md:p-3">
                <ul className="flex flex-col gap-2 md:gap-3 lg:gap-4">
                    {subCategories.map((s) => {
                        const on = s.id === active;
                        return (
                            <li key={s.id}>
                                <button
                                    type="button"
                                    onClick={() => onSelect(s.id)}
                                    aria-pressed={on}
                                    className="group flex w-full flex-col items-center justify-center gap-0.5 transition-all duration-300 md:gap-1"
                                >
                                    <span
                                        className={`relative flex aspect-square w-12 items-center justify-center overflow-hidden rounded-lg p-1 transition-all duration-300 group-hover:bg-gray-100 md:w-14 md:rounded-xl md:p-1.5 lg:w-16 ${
                                            on
                                                ? "border-2 border-primary-500 bg-gray-100"
                                                : "border border-neutral-200 bg-gray-50"
                                        }`}
                                    >
                                        <img
                                            src={s.image}
                                            alt=""
                                            width={80}
                                            height={80}
                                            loading="lazy"
                                            className={`h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 ${on ? "scale-105" : ""}`}
                                        />
                                    </span>
                                    <span
                                        className={`line-clamp-2 max-w-14 text-center text-2xs leading-tight font-semibold md:max-w-15 md:text-xs md:font-bold lg:max-w-20 lg:text-sh5 lg:leading-4.5 lg:font-semibold ${
                                            on ? "text-primary-500" : "text-neutral-900"
                                        }`}
                                    >
                                        {s.label}
                                        {on && (
                                            <span className="mx-auto mt-0.5 block h-0.5 w-4 rounded-full bg-primary-500 md:w-6 lg:w-8" />
                                        )}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
