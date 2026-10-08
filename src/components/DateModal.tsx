"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useStore } from "@/lib/store";
import {
    addDays,
    chargeableDays,
    fmtShort,
    monthGrid,
    monthLabel,
    sameDay,
    startOfDay,
} from "@/lib/dates";
import { CalDeliveryIcon, CalPickupIcon, DiscountIcon, InfoIcon } from "./icons";

const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function Month({
    month,
    delivery,
    pickup,
    hover,
    setHover,
    onPick,
    min,
}: {
    month: Date;
    delivery: Date | null;
    pickup: Date | null;
    hover: Date | null;
    setHover: (d: Date | null) => void;
    onPick: (d: Date) => void;
    min: Date;
}) {
    const cells = useMemo(() => monthGrid(month), [month]);
    const end = pickup ?? (delivery && hover && hover > delivery ? hover : null);
    return (
        <div className="w-full">
            <p className="mb-3 text-center text-sh5 text-neutral-900">{monthLabel(month)}</p>
            <div className="grid grid-cols-7 gap-y-1 text-center">
                {WEEK.map((w) => (
                    <span key={w} className="pb-2 text-o2 text-neutral-400">
                        {w}
                    </span>
                ))}
                {cells.map((d, i) => {
                    if (!d) return <span key={i} />;
                    const disabled = d < min;
                    const isStart = sameDay(d, delivery);
                    const isEnd = sameDay(d, end);
                    const inRange = !!delivery && !!end && d > delivery && d < end;
                    const today = sameDay(d, new Date());
                    return (
                        <div
                            key={i}
                            className={`relative flex h-10 items-center justify-center ${
                                inRange ? "bg-primary-100" : ""
                            } ${isStart && end ? "rounded-l-full bg-gradient-to-r from-transparent from-50% to-primary-100 to-50%" : ""} ${
                                isEnd && delivery
                                    ? "rounded-r-full bg-gradient-to-l from-transparent from-50% to-primary-100 to-50%"
                                    : ""
                            }`}
                        >
                            <button
                                type="button"
                                disabled={disabled && !isStart}
                                onClick={() => onPick(d)}
                                onMouseEnter={() => setHover(d)}
                                onMouseLeave={() => setHover(null)}
                                aria-label={d.toDateString()}
                                aria-pressed={isStart || isEnd}
                                className={`relative grid h-10 w-10 place-items-center rounded-full text-sh5 transition-all duration-150 ${
                                    isStart || isEnd
                                        ? "bg-primary-500 text-white shadow-day"
                                        : disabled
                                          ? "cursor-not-allowed text-neutral-300"
                                          : "text-neutral-900 hover:bg-primary-150"
                                }`}
                            >
                                {d.getDate()}
                                {today && !isStart && !isEnd && (
                                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary-500" />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function DateModal() {
    const { dateOpen, closeDates, confirmDates, delivery: savedD, pickup: savedP } = useStore();
    const today = startOfDay(new Date());
    const [delivery, setDelivery] = useState<Date | null>(null);
    const [pickup, setPickup] = useState<Date | null>(null);
    const [field, setField] = useState<"delivery" | "pickup">("delivery");
    const [hover, setHover] = useState<Date | null>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (!dateOpen) return;
        setDelivery(savedD);
        setPickup(savedP);
        setField(savedD ? "pickup" : "delivery");
        setOffset(0);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDates();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [dateOpen, savedD, savedP, closeDates]);

    const base = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const next = new Date(base.getFullYear(), base.getMonth() + 1, 1);
    const days = chargeableDays(delivery, pickup);

    const pick = (d: Date) => {
        if (field === "delivery" || !delivery || d <= delivery) {
            setDelivery(d);
            if (pickup && pickup <= d) setPickup(null);
            setField("pickup");
        } else {
            setPickup(d);
        }
    };

    const quick = (n: number) => {
        const d = delivery ?? addDays(today, 1);
        setDelivery(d);
        setPickup(addDays(d, n + 1));
        setField("pickup");
    };

    return (
        <div
            className={`fixed inset-0 z-70 flex items-end justify-center md:items-center ${dateOpen ? "visible" : "invisible"}`}
            aria-hidden={!dateOpen}
        >
            <div
                onClick={closeDates}
                className={`absolute inset-0 bg-primary-900/40 backdrop-blur-sm transition-opacity duration-300 ${dateOpen ? "opacity-100" : "opacity-0"}`}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="date-title"
                className={`relative flex max-h-sheet w-full flex-col overflow-hidden rounded-t-3xl bg-gray-100 shadow-2xl transition-all duration-300 ease-out md:max-w-240 md:rounded-3xl ${
                    dateOpen
                        ? "translate-y-0 opacity-100 md:scale-100"
                        : "translate-y-full opacity-0 md:translate-y-4 md:scale-95"
                }`}
            >
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-neutral-200 md:hidden" />
                <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 md:border-0 md:px-6 md:pb-2">
                    <h2 id="date-title" className="text-h4 text-neutral-900">
                        Select your Dates
                    </h2>
                    <button
                        type="button"
                        onClick={closeDates}
                        aria-label="Close"
                        className="rounded-full p-1.5 transition-colors hover:bg-neutral-150"
                    >
                        <X className="size-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-neutral-150 md:bg-gray-100">
                    <div className="flex flex-col gap-5 p-5 md:flex-row md:gap-6 md:px-6 md:pt-2 md:pb-4">
                        {/* form */}
                        <div className="flex flex-col gap-4 md:w-90 md:shrink-0">
                            <div>
                                <p className="mb-2 text-b4 text-neutral-900">
                                    Delivery Date <span className="text-destructive-500">*</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setField("delivery")}
                                    className={`flex h-10.5 w-full items-center gap-2 rounded-2xl border-2 bg-gray-100 px-4 text-left text-b4 transition-colors ${
                                        field === "delivery" && delivery
                                            ? "border-primary-500"
                                            : "border-neutral-200"
                                    } ${delivery ? "text-neutral-900" : "text-neutral-300"}`}
                                >
                                    <CalDeliveryIcon className="size-5 text-neutral-900" />
                                    {delivery
                                        ? fmtShort(delivery) +
                                          ", " +
                                          delivery.toLocaleDateString("en-IN", { weekday: "long" })
                                        : "Select delivery date"}
                                </button>
                            </div>

                            <div className="flex gap-2 rounded-xl bg-primary-100 p-3 text-b6 text-primary-800 md:text-sm md:leading-5">
                                <InfoIcon className="mt-0.5 size-5 shrink-0 text-primary-500" />
                                <p>
                                    <b>Same-day delivery</b> between <b>5PM and 11PM</b> For future
                                    dates, you can select a specific time slot available at
                                    checkout. We pickup between <b>9AM to 1PM</b>.
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-b4 text-neutral-900">
                                    Pickup Date <span className="text-destructive-500">*</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={() => delivery && setField("pickup")}
                                    className={`flex h-10.5 w-full items-center gap-2 rounded-2xl border-2 bg-gray-100 px-4 text-left text-b4 transition-colors ${
                                        field === "pickup" && delivery
                                            ? "border-primary-500"
                                            : "border-neutral-200"
                                    } ${pickup ? "text-neutral-900" : "text-neutral-300"}`}
                                >
                                    <CalPickupIcon className="size-5 text-neutral-900" />
                                    {pickup
                                        ? fmtShort(pickup) +
                                          ", " +
                                          pickup.toLocaleDateString("en-IN", { weekday: "long" })
                                        : "Select pickup date"}
                                </button>
                                {/* enhancement: quick duration presets */}
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {[1, 3, 7, 30].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => quick(n)}
                                            className={`rounded-full border px-2.5 py-1 text-o2 transition-colors ${
                                                days === n && pickup
                                                    ? "border-primary-500 bg-primary-100 text-primary-600"
                                                    : "border-neutral-200 bg-gray-100 text-neutral-500 hover:border-neutral-300"
                                            }`}
                                        >
                                            {n === 30
                                                ? "1 month"
                                                : n === 7
                                                  ? "1 week"
                                                  : `${n} day${n > 1 ? "s" : ""}`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-b4 text-neutral-900">Your Rental Period:</p>
                                <div className="flex items-center gap-4 rounded-2xl border-2 border-neutral-200 bg-gray-100 px-5 py-3">
                                    <p className="flex items-baseline gap-1">
                                        <span
                                            key={days}
                                            className="inline-block animate-pop font-ubuntu text-display leading-none font-bold text-neutral-900"
                                        >
                                            {String(days).padStart(2, "0")}
                                        </span>
                                        <span className="text-b2 text-neutral-500">
                                            {days > 1 ? "Days" : "Day"}
                                        </span>
                                    </p>
                                    <span className="h-12 w-px bg-neutral-200" />
                                    <div className="text-b4">
                                        <p className="text-neutral-900">Chargeable Period:</p>
                                        <p className="mt-1 flex items-center gap-1.5 text-neutral-500">
                                            <CalAddIcon2 />
                                            {delivery && pickup
                                                ? days === 1
                                                    ? fmtShort(addDays(delivery, 1))
                                                    : `${fmtShort(addDays(delivery, 1))} – ${fmtShort(addDays(pickup, -1))}`
                                                : "--"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-navy-950 p-4 text-white">
                                <p className="flex items-center gap-3 font-ubuntu text-h6 text-highlight italic">
                                    <DiscountIcon className="size-9 shrink-0 text-highlight" />
                                    Save more with us!
                                </p>
                                <p className="mt-2 text-b6 leading-5 font-semibold text-gray-100 md:text-b4">
                                    Longer rental periods mean bigger savings—enjoy discounts of up
                                    to 12%. We don&apos;t charge you for deliver and pickup days!
                                </p>
                            </div>
                        </div>

                        {/* calendar */}
                        <div className="min-w-0 flex-1 rounded-2xl bg-gray-100 p-4 md:bg-neutral-150 md:p-5">
                            <div className="relative mb-1 flex items-center justify-between">
                                <button
                                    type="button"
                                    aria-label="Previous month"
                                    disabled={offset === 0}
                                    onClick={() => setOffset((o) => o - 1)}
                                    className="grid size-8 place-items-center rounded-full border border-neutral-200 bg-gray-100 text-neutral-700 transition-colors hover:bg-neutral-200 disabled:opacity-40"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>
                                <p className="text-o2 text-neutral-500">
                                    {field === "delivery" || !delivery
                                        ? "Pick your delivery date"
                                        : "Now pick your pickup date"}
                                </p>
                                <button
                                    type="button"
                                    aria-label="Next month"
                                    disabled={offset >= 5}
                                    onClick={() => setOffset((o) => o + 1)}
                                    className="grid size-8 place-items-center rounded-full border border-neutral-200 bg-gray-100 text-neutral-700 transition-colors hover:bg-neutral-200 disabled:opacity-40"
                                >
                                    <ChevronRight className="size-4" />
                                </button>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <Month
                                    month={base}
                                    delivery={delivery}
                                    pickup={pickup}
                                    hover={hover}
                                    setHover={setHover}
                                    onPick={pick}
                                    min={
                                        field === "pickup" && delivery
                                            ? addDays(delivery, 1)
                                            : today
                                    }
                                />
                                <div className="hidden md:block">
                                    <Month
                                        month={next}
                                        delivery={delivery}
                                        pickup={pickup}
                                        hover={hover}
                                        setHover={setHover}
                                        onPick={pick}
                                        min={
                                            field === "pickup" && delivery
                                                ? addDays(delivery, 1)
                                                : today
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-200 bg-gray-100 p-4 md:border-0 md:px-6 md:pt-2 md:pb-6">
                    <button
                        type="button"
                        disabled={!delivery || !pickup}
                        onClick={() => delivery && pickup && confirmDates(delivery, pickup)}
                        className="h-14 w-full rounded-full bg-primary-500 text-lg font-semibold text-white transition-all duration-200 hover:bg-primary-600 active:scale-99 disabled:bg-primary-500/45 md:max-w-90"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

function CalAddIcon2() {
    return <CalPickupIcon className="size-4 text-neutral-700" />;
}
