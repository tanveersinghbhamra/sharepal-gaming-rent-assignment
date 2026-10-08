"use client";

import { useMemo, useState } from "react";
import { subCategories } from "@/data/content";
import { controllersIn, products, sortOptions, sortProducts, type SortKey } from "@/lib/products";
import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import HeroBanner from "./HeroBanner";
import Sidebar from "./Sidebar";
import { ChevronDown } from "./icons";

const PAGE = 12;

type Chip = "instock" | "c1" | "c2" | "c4";
const chips: { id: Chip; label: string }[] = [
  { id: "instock", label: "In stock" },
  { id: "c1", label: "1 Controller" },
  { id: "c2", label: "2 Controllers" },
  { id: "c4", label: "4 Controllers" },
];

export default function ProductSection() {
  const { city } = useStore();
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [active, setActive] = useState<Chip[]>([]);
  const [visible, setVisible] = useState(PAGE);

  const list = useMemo(() => {
    const sub = subCategories.find((s) => s.id === cat);
    let l = products.filter((p) => (sub?.match ? sub.match(p.name) : true));
    if (active.includes("instock")) l = l.filter((p) => !p.out_of_stock);
    const counts = active.filter((c) => c.startsWith("c")).map((c) => Number(c.slice(1)));
    if (counts.length) l = l.filter((p) => counts.includes(controllersIn(p.name) ?? -1));
    return sortProducts(l, sort);
  }, [cat, sort, active]);

  const toggle = (c: Chip) => {
    setActive((a) => (a.includes(c) ? a.filter((x) => x !== c) : [...a, c]));
    setVisible(PAGE);
  };

  const selectCat = (id: string) => {
    setCat(id);
    setVisible(PAGE);
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const catLabel = subCategories.find((s) => s.id === cat)?.label;
  const shown = list.slice(0, visible);

  return (
    <div className="flex flex-row gap-2 px-2 max-md:pt-4 md:grid md:grid-cols-[100px_1fr] md:gap-8 md:px-0 lg:grid-cols-[120px_1fr]">
      <Sidebar active={cat} onSelect={selectCat} />

      <div className="min-w-0 flex-1">
        <div className="hidden md:block">
          <HeroBanner />
        </div>

        <section id="products-section" className="relative z-[1] scroll-mt-28 pb-10">
          <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-3 md:py-4">
            <h2 className="text-sh4 capitalize md:text-h2">
              {cat === "all" ? "gaming gadgets on rent" : `${catLabel} on rent`}
              <span className="sr-only"> in {city}</span>
            </h2>
            <p className="flex items-center gap-1 text-b6 text-neutral-300 md:text-b2">
              <span className="hidden md:inline-flex">Total items:</span>
              <span className="text-neutral-500">{list.length} items</span>
            </p>
          </div>

          {/* toolbar (enhancement: sort + quick filters) */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 md:mt-4">
            <div className="scrollbar-none -mx-0.5 flex gap-2 overflow-x-auto px-0.5 py-0.5">
              {chips.map((c) => {
                const on = active.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(c.id)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-sh7 transition-all duration-200 active:scale-95 md:text-sh5 ${
                      on
                        ? "border-primary-900 bg-primary-900 text-white"
                        : "border-neutral-200 bg-gray-100 text-neutral-700 hover:border-neutral-300"
                    }`}
                  >
                    {on && <span className="mr-1">✓</span>}
                    {c.label}
                  </button>
                );
              })}
            </div>
            <label className="relative flex items-center gap-2 text-sh7 text-neutral-500 md:text-sh5">
              <span className="hidden sm:inline">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="cursor-pointer appearance-none rounded-full border border-neutral-200 bg-gray-100 py-1.5 pl-3 pr-8 text-sh7 text-neutral-900 transition-colors hover:border-neutral-300 md:text-sh5"
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 size-4 text-neutral-500" />
            </label>
          </div>

          {shown.length ? (
            <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-5 md:mt-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {shown.map((p, i) => (
                <ProductCard key={`${p.id}-${sort}-${cat}`} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-3xl bg-gray-100 px-6 py-14 text-center">
              <p className="text-h6 text-neutral-900">Coming soon to {city}</p>
              <p className="max-w-sm text-b5 text-neutral-500">
                {catLabel} rentals aren&apos;t available right now. Browse all gaming gadgets in the meantime.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCat("all");
                  setActive([]);
                }}
                className="mt-2 rounded-4xl border-2 border-neutral-900 bg-gray-100 px-6 py-2.5 text-bt3 transition-colors hover:bg-neutral-150"
              >
                View all products
              </button>
            </div>
          )}

          {list.length > 0 && (
            <div className="mt-5 flex w-full flex-col items-center justify-center border-t border-gray-200 py-7 md:mt-10">
              <p className="pb-3 text-sm text-gray-400 md:text-base">
                Showing {shown.length} of {list.length} results
              </p>
              <div className="mb-4 h-1 w-40 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-primary-500 transition-[width] duration-500"
                  style={{ width: `${(shown.length / list.length) * 100}%` }}
                />
              </div>
              {visible < list.length && (
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE)}
                  className="inline-flex h-9 w-full items-center justify-center rounded-4xl border-2 border-neutral-900 bg-gray-100 p-5 text-base font-medium transition-colors hover:bg-neutral-150 active:opacity-90 sm:max-w-72 md:p-6"
                >
                  Show More
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
