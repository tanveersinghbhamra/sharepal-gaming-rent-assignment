import raw from "@/data/product-list.json";

export type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  booked_count: number;
  tag: "" | "Trending" | "New" | "Vote to Launch" | string;
  per_day_rent: number;
  out_of_stock: boolean;
};

export const products: Product[] = raw.products as Product[];

const order = new Map(raw.products.map((p, i) => [p.id, i]));

const tagRank: Record<string, number> = { "Vote to Launch": 0, New: 1, Trending: 2 };

/** Default "Recommended" order — mirrors the live page: Vote to Launch → New → Trending → rest, out of stock last. */
export function recommended(list: Product[]) {
  return [...list].sort((a, b) => {
    if (a.out_of_stock !== b.out_of_stock) return a.out_of_stock ? 1 : -1;
    const ta = tagRank[a.tag] ?? 3;
    const tb = tagRank[b.tag] ?? 3;
    if (ta !== tb) return ta - tb;
    // newest launches (no ratings yet) first, then smaller bundles first, then catalogue order
    if ((a.rating === 0) !== (b.rating === 0)) return a.rating === 0 ? -1 : 1;
    const ca = controllersIn(a.name) ?? 9;
    const cb = controllersIn(b.name) ?? 9;
    if (ca !== cb) return ca - cb;
    return order.get(a.id)! - order.get(b.id)!;
  });
}

export type SortKey = "recommended" | "popular" | "price-asc" | "price-desc" | "rating";

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "popular", label: "Most booked" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top rated" },
];

export function sortProducts(list: Product[], key: SortKey) {
  if (key === "recommended") return recommended(list);
  const sorted = [...list];
  const stockFirst = (a: Product, b: Product) => Number(a.out_of_stock) - Number(b.out_of_stock);
  switch (key) {
    case "popular":
      return sorted.sort((a, b) => stockFirst(a, b) || b.booked_count - a.booked_count);
    case "price-asc":
      return sorted.sort((a, b) => stockFirst(a, b) || a.per_day_rent - b.per_day_rent);
    case "price-desc":
      return sorted.sort((a, b) => stockFirst(a, b) || b.per_day_rent - a.per_day_rent);
    case "rating":
      return sorted.sort((a, b) => stockFirst(a, b) || b.rating - a.rating || b.booked_count - a.booked_count);
  }
}

export const controllersIn = (name: string) => {
  const m = name.match(/(\d)\s*Controller/i);
  return m ? Number(m[1]) : null;
};

export const formatINR = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `${n}`);
