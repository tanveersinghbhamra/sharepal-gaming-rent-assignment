"use client";

import { ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Breadcrumb() {
    const { city } = useStore();
    return (
        <nav aria-label="breadcrumb" className="container py-3 md:py-6">
            <ol className="flex items-center gap-1.5 text-sm sm:gap-2.5">
                <li className="inline-flex items-center gap-1.5">
                    <a
                        href="#top"
                        className="text-sh7 text-neutral-500 transition-colors hover:text-neutral-600 md:text-sh5"
                    >
                        {city}
                    </a>
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-400" aria-hidden />
                </li>
                <li>
                    <span aria-current="page" className="text-sh7 text-neutral-900 md:text-sh5">
                        Gaming gadgets on rent
                    </span>
                </li>
            </ol>
        </nav>
    );
}
