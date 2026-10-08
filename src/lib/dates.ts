export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export const sameDay = (a?: Date | null, b?: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const diffDays = (a: Date, b: Date) => Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / 86400000);

/**
 * SharePal rule: rental starts the day after delivery and ends the day before pickup.
 * Deliver 5th, pickup 8th → 2 chargeable days (min 1).
 */
export const chargeableDays = (delivery?: Date | null, pickup?: Date | null) => {
  if (!delivery || !pickup) return 0;
  return Math.max(1, diffDays(delivery, pickup) - 1);
};

export const fmtShort = (d?: Date | null) =>
  d ? d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "";

export const fmtLong = (d?: Date | null) =>
  d ? d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }) : "";

export const monthLabel = (d: Date) => d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

/** 6x7 grid of dates (or null padding) for a month, Sunday first */
export function monthGrid(month: Date): (Date | null)[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = Array(first.getDay()).fill(null);
  for (let i = 1; i <= days; i++) cells.push(new Date(month.getFullYear(), month.getMonth(), i));
  while (cells.length % 7) cells.push(null);
  return cells;
}
