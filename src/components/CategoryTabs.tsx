"use client";

import { superCategories } from "@/data/content";
import { useStore } from "@/lib/store";

export default function CategoryTabs({ onDark = false }: { onDark?: boolean }) {
  const { toast } = useStore();
  return (
    <nav aria-label="Super categories" className="relative mx-auto w-full max-w-3xl px-2 md:px-8">
      <ul className="scrollbar-none flex items-center justify-between overflow-x-auto max-md:text-[13px]">
        {superCategories.map((c) => (
          <li key={c.label} className="shrink-0 px-1 py-2 text-center max-md:flex-1 md:basis-1/4 md:px-4">
            <a
              href={c.href}
              aria-current={c.active ? "page" : undefined}
              onClick={(e) => {
                if (!c.active) {
                  e.preventDefault();
                  toast({ title: c.label, body: "Only the Gaming page is part of this recreation.", tone: "info" });
                }
              }}
              className={`group relative inline-block w-full max-w-44 px-1 md:px-3 transition-colors duration-200 ${
                c.active ? "text-sh4" : "text-sh5"
              } ${onDark ? "text-gray-200 hover:text-white" : "text-neutral-700 hover:text-gray-900"}`}
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-y-px">{c.label}</span>
              <span
                className={`absolute left-1/2 -bottom-2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300 ${
                  c.active
                    ? `w-10/12 ${onDark ? "bg-secondary-500" : "bg-category-purple"}`
                    : `w-0 group-hover:w-1/2 ${onDark ? "bg-white/60" : "bg-neutral-300"}`
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
