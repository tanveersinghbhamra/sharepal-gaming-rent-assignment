import { IMG } from "@/data/content";
import { LogoPal, LogoShare } from "./icons";

export default function HeroBanner({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl ${
        mobile ? "min-h-[150px] shadow-lg" : "min-h-[228px]"
      }`}
      style={{ background: "linear-gradient(360deg, #8A2BE2 0%, #4C187C 100%)" }}
    >
      {/* subtle animated sheen */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.14),transparent_70%)]" />
      {!mobile && (
        <img
          src={`${IMG}/super-categories/gaming-left.webp`}
          alt=""
          width={250}
          height={250}
          className="absolute -bottom-12 left-0 z-0 w-44 object-contain transition-transform duration-700 ease-out hover:-translate-y-1 xl:w-[250px]"
        />
      )}
      <img
        src={`${IMG}/super-categories/gaming-right.webp`}
        alt=""
        width={250}
        height={250}
        className={`absolute right-0 z-0 object-contain ${mobile ? "-bottom-11 w-48 sm:w-60" : "-bottom-12 w-44 xl:w-[250px]"}`}
      />
      <div
        className={`relative z-10 flex w-full flex-col justify-center gap-1.5 px-4 text-white md:items-center md:gap-3 md:text-center ${
          mobile ? "items-start" : "items-center"
        }`}
      >
        <h1 className="font-ubuntu text-h5 font-bold capitalize leading-tight tracking-tight drop-shadow-lg md:text-d5">
          Gaming Consoles
        </h1>
        <h2 className="w-[75%] text-o4 font-bold drop-shadow-md max-md:text-start sm:text-b4 md:max-w-[70%] lg:text-sh1 lg:font-bold xl:text-h6">
          Rent the latest gaming gadgets from{" "}
          <span className="mx-1 inline-flex w-14 items-center align-middle md:w-20">
            <LogoShare className="h-auto w-[63%]" />
            <LogoPal fill="#fff" className="h-auto w-[37%]" />
          </span>{" "}
          PS5, Xbox, Oculus VR, Racing Wheel on rent.
        </h2>
        <div className="flex w-full flex-wrap items-center justify-center gap-0 md:mt-3 md:max-w-lg md:gap-2 max-md:justify-start">
          {["XBOX", "PS5", "Sony"].map((b, i) => (
            <div key={b} className="flex items-center gap-0 md:gap-2">
              {i > 0 && <span className="h-4 w-[2px] rounded-full bg-category-purple opacity-50 md:h-6 md:w-[3px] md:opacity-70" />}
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
