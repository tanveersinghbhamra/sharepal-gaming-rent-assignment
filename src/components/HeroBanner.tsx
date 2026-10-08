import { IMG } from "@/data/content";
import { LogoPal, LogoShare } from "./icons";

export default function HeroBanner({ mobile = false }: { mobile?: boolean }) {
    return (
        <div
            className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-t from-category-purple to-category-purple-dark ${
                mobile ? "min-h-44.5 shadow-lg" : "min-h-57"
            }`}
        >
            {!mobile && (
                <img
                    src={`${IMG}/super-categories/gaming-left.webp`}
                    alt=""
                    width={250}
                    height={250}
                    className="absolute -bottom-12 left-0 z-0 w-44 object-contain transition-transform duration-700 ease-out hover:-translate-y-1 xl:w-62.5"
                />
            )}
            <img
                src={`${IMG}/super-categories/gaming-right.webp`}
                alt=""
                width={250}
                height={250}
                className={`absolute right-0 z-0 object-contain ${mobile ? "-bottom-11 w-48 sm:w-60" : "-bottom-12 w-44 xl:w-62.5"}`}
            />
            <div
                className={`relative z-10 flex w-full flex-col justify-center gap-1.5 px-4 text-white md:items-center md:gap-3 md:text-center ${
                    mobile ? "items-start" : "items-center"
                }`}
            >
                <h1 className="font-ubuntu text-h5 font-bold capitalize drop-shadow-lg max-md:leading-tight max-md:tracking-wide md:text-d5">
                    Gaming Consoles
                </h1>
                <h2 className="w-3/4 text-o4 font-bold drop-shadow-md max-md:text-start max-md:leading-5 sm:text-b4 md:max-w-13/24 lg:text-sh1 lg:font-bold xl:text-h6">
                    Rent the latest gaming gadgets from{" "}
                    <span className="mx-1 inline-flex h-2.75 items-center align-middle md:h-4">
                        <LogoShare className="h-full w-auto" />
                        <LogoPal fill="#fff" className="h-full w-auto" />
                    </span>{" "}
                    PS5, Xbox, Oculus VR, Racing Wheel on rent.
                </h2>
                <div className="flex w-full flex-wrap items-center justify-center gap-0 max-md:justify-start md:mt-3 md:max-w-lg md:gap-2">
                    {["XBOX", "PS5", "Sony"].map((b, i) => (
                        <div key={b} className="flex items-center gap-0 md:gap-2">
                            {i > 0 && (
                                <span className="h-4 w-0.5 rounded-full bg-category-purple opacity-50 md:h-6 md:w-0.75 md:opacity-70" />
                            )}
                            <img
                                src={`${IMG}/super-categories-brand-logos/gaming/${b}.svg`}
                                alt={b === "Sony" ? "Meta" : b}
                                width={200}
                                height={100}
                                className="h-auto w-12 object-contain md:w-24"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
