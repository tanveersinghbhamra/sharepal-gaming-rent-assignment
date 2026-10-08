import { ImageResponse } from "next/og";

export const alt = "SharePal — Rent gaming gadgets in Bangalore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* SharePal's blue tile with the lime "P" mark — the same artwork their link previews use */
const P_MARK =
    "M20.786 15.106h8.14c5.075 0 7.917 2.679 7.917 6.682 0 5.477-3.84 8.93-10 8.93h-3.052l-1.25 5.863h-6.294l1.07-5.06c6.5-1.309 10.317-6.29 10.317-6.29l2.168 1.84 1.601-8.78-8.404 3.004 2.04 1.731s-2.377 3.315-7.047 5.296z";

export default function OgImage() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1945E8",
            }}
        >
            <svg width="560" height="560" viewBox="9.7 11.8 40 40">
                <path fill="#9EFF00" fillRule="evenodd" d={P_MARK} transform="translate(4 6)" />
            </svg>
        </div>,
        size,
    );
}
