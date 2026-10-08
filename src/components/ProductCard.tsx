"use client";

import { memo } from "react";
import { useStore } from "@/lib/store";
import { formatCount, formatINR, type Product } from "@/lib/products";
import { HeartIcon, PlusIcon, SparkleIcon, StarIcon } from "./icons";

const WAITLIST_BASE = 24;
const WAITLIST_GOAL = 1000;

function Badge({ tag }: { tag: string }) {
    if (!tag) return null;
    const styles: Record<string, string> = {
        New: "text-decorative-blue border-decorative-blue",
        Trending: "text-decorative-orange border-decorative-orange",
        "Vote to Launch":
            "border-secondary-400 bg-secondary-100 text-secondary-850 max-md:font-bold max-md:leading-3.5",
    };
    return (
        <span
            className={`absolute top-2 left-2 z-1 inline-flex items-center rounded-lg border px-1.5 py-0 text-2xs leading-5 font-semibold md:top-3 md:left-3 md:border-2 md:px-2.5 md:py-0.5 md:text-xs md:leading-4 ${
                styles[tag] ?? "border-neutral-300 text-neutral-500"
            }`}
        >
            {tag}
        </span>
    );
}

function ProductCardBase({ product, index }: { product: Product; index: number }) {
    const {
        days,
        delivery,
        openDates,
        addToCart,
        cart,
        wishlist,
        toggleWish,
        waitlist,
        joinWaitlist,
        toast,
    } = useStore();
    const vote = product.tag === "Vote to Launch";
    const oos = product.out_of_stock;
    const inCart = cart[product.id] ?? 0;
    const wished = wishlist.includes(product.id);
    const joined = waitlist.includes(product.id);
    const hasDates = !!delivery && days > 0;
    const joinedCount = WAITLIST_BASE + (joined ? 1 : 0);

    const onAdd = () => {
        if (oos) {
            toast({
                title: "We'll notify you",
                body: `${product.name} is back in stock soon.`,
                tone: "info",
            });
            return;
        }
        if (!hasDates) openDates(product);
        else addToCart(product);
    };

    return (
        <article
            id={`product-${product.id}`}
            className="group relative flex h-full animate-fade-up scroll-mt-40 flex-col overflow-hidden rounded-2xl bg-gray-100 p-2.5 leading-5 transition-all duration-300 md:rounded-3xl md:bg-transparent md:p-3 md:hover:bg-gray-100 md:hover:shadow-card"
            style={{ animationDelay: `${(index % 12) * 40}ms` }}
        >
            {/* image */}
            <div className="relative aspect-square shrink-0 overflow-hidden rounded-lg bg-gray-100 p-1.5 md:rounded-2xl md:p-3">
                <div className="h-full w-full p-3 md:p-5">
                    <img
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding="async"
                        className={`h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-106 ${
                            oos ? "opacity-50 grayscale" : ""
                        }`}
                    />
                </div>
                <Badge tag={product.tag} />
                {oos && (
                    <span className="absolute inset-x-0 bottom-3 mx-auto w-max rounded-full bg-neutral-900/85 px-3 py-1 text-o2 text-white">
                        Out of stock
                    </span>
                )}
                <button
                    type="button"
                    aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={wished}
                    onClick={() => toggleWish(product.id)}
                    className={`absolute top-1 right-1 z-1 grid place-items-center rounded-full p-1 transition-all duration-300 md:top-3 md:right-3 ${
                        wished
                            ? "scale-100 opacity-100"
                            : "scale-90 text-gray-500 opacity-60 group-hover:scale-100 group-hover:opacity-100 focus-visible:opacity-100 md:opacity-0"
                    } hover:text-decorative-pink`}
                >
                    <HeartIcon
                        filled={wished}
                        className={`size-4 md:size-6 ${wished ? "animate-pop" : ""}`}
                    />
                </button>
            </div>

            {vote && (
                <div className="mt-2 flex w-full flex-col gap-1.5 rounded-xl bg-secondary-100 p-2">
                    <div className="flex items-start gap-1.5">
                        <SparkleIcon className="size-3.5 shrink-0 text-success-600" />
                        <p
                            className="text-o4 text-pretty text-success-700"
                            role="status"
                            aria-live="polite"
                        >
                            {joined
                                ? "You're in! We'll notify you at launch."
                                : "We launch if 1k people join the waitlist. Get notified first!"}
                        </p>
                    </div>
                    <div
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={WAITLIST_GOAL}
                        aria-valuenow={joinedCount}
                        aria-label={`${joinedCount} of ${WAITLIST_GOAL} people joined the waitlist`}
                        className="relative h-5 w-full overflow-hidden rounded-full bg-gray-200"
                    >
                        <div
                            className="h-full rounded-full bg-category-purple transition-all duration-700 ease-out"
                            style={{
                                width: `${Math.max(2.4, (joinedCount / WAITLIST_GOAL) * 100)}%`,
                            }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-o3 text-gray-100 tabular-nums">
                            {joinedCount}/{WAITLIST_GOAL} Joined
                        </span>
                    </div>
                </div>
            )}

            <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col items-start gap-1 pt-2.5 pb-1 md:gap-1.5 md:p-2 md:pb-0">
                    <h3 className="line-clamp-2 text-b6 font-bold md:text-sh2">{product.name}</h3>
                    {!vote && (
                        <p className="flex items-center gap-1 text-o4 text-gray-600 md:text-sh7">
                            {product.rating > 0 ? (
                                <>
                                    <StarIcon className="size-3 md:size-3.5" />
                                    <span className="text-neutral-700">
                                        {product.rating.toFixed(1)}
                                    </span>
                                    <span className="text-neutral-300">•</span>
                                </>
                            ) : (
                                <span className="rounded bg-primary-100 px-1 whitespace-nowrap text-primary-600 max-sm:hidden">
                                    New launch
                                </span>
                            )}
                            <span className="whitespace-nowrap">
                                {formatCount(product.booked_count)}+ rented
                            </span>
                        </p>
                    )}
                </div>

                <div className="flex w-full flex-col items-start gap-0 md:gap-1 md:px-2">
                    <div aria-hidden className="my-1 h-px w-full bg-neutral-200" />
                    {vote ? (
                        <button
                            type="button"
                            disabled={joined}
                            onClick={() => joinWaitlist(product.id)}
                            className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-full bg-secondary-500 px-2 text-bt3 whitespace-nowrap text-primary-900 transition duration-150 ease-out hover:bg-secondary-400 active:scale-98 disabled:bg-secondary-100 disabled:text-secondary-850 md:h-10"
                        >
                            {joined ? "✓ Joined Waitlist" : "Join Waitlist"}
                        </button>
                    ) : (
                        <div className="flex w-full items-end justify-between gap-1 max-md:flex-wrap md:gap-2">
                            <div className="flex flex-col items-baseline gap-0 md:gap-1">
                                <div className="text-o3 text-gray-600 md:text-sh5">
                                    {hasDates
                                        ? `For ${days} ${days === 1 ? "day" : "days"}`
                                        : "Select Dates to view price"}
                                </div>
                                <div className="flex items-baseline gap-1 text-sh4 text-gray-900 md:text-h6">
                                    {hasDates ? (
                                        <>
                                            {formatINR(product.per_day_rent * days)}
                                            <span className="text-o4 font-medium text-gray-600 md:text-b6">
                                                ({formatINR(product.per_day_rent)}/day)
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {formatINR(product.per_day_rent)}
                                            <span className="text-o4 font-medium text-gray-600 md:text-b6">
                                                /day
                                            </span>
                                        </>
                                    )}
                                </div>
                                <span className="rounded bg-secondary-500 px-1 py-px text-o3 text-secondary-900 md:px-1.5 md:py-0.5 md:text-sh7">
                                    Incl. of GST
                                </span>
                            </div>
                            <div className="flex items-center gap-1 max-md:w-full md:gap-2">
                                {oos ? (
                                    <button
                                        type="button"
                                        onClick={onAdd}
                                        className="flex h-8 items-center justify-center rounded-full border-2 border-neutral-300 px-3 text-bt4 text-neutral-500 transition-colors hover:border-primary-900 hover:text-primary-900 max-md:w-full md:h-10 lg:h-12"
                                    >
                                        Notify me
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={onAdd}
                                        aria-label={`Add ${product.name} to cart`}
                                        className={`relative flex h-8 items-center justify-center rounded-full border-2 border-primary-900 px-4 transition-all duration-300 active:scale-95 max-md:w-full md:h-9 md:w-9 md:p-2 lg:h-12 lg:w-12 ${
                                            inCart
                                                ? "bg-primary-900 text-white"
                                                : "bg-transparent text-primary-900 hover:bg-neutral-150"
                                        }`}
                                    >
                                        <span className="text-bt4 md:hidden">
                                            {inCart ? `In Cart (${inCart})` : "Add to Cart"}
                                        </span>
                                        <PlusIcon className="hidden size-5 transition-transform duration-300 group-hover:rotate-90 md:block lg:size-6" />
                                        {inCart > 0 && (
                                            <span className="absolute -top-1 -right-1 hidden h-5 min-w-5 place-items-center rounded-full bg-secondary-500 px-1 text-tiny font-bold text-primary-900 md:grid">
                                                {inCart}
                                            </span>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

export default memo(ProductCardBase);
