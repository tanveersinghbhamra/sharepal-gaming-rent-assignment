# SharePal — Gaming Gadgets on Rent (recreation)

A front-end recreation of [sharepal.in/bangalore/gaming-gadgets-on-rent](https://sharepal.in/bangalore/gaming-gadgets-on-rent), built for the SharePal hiring assignment.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Inter + Ubuntu (self-hosted via Fontsource) · lucide-react

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /bangalore/gaming-gadgets-on-rent
npm run build && npm start
```

Deploys to Vercel with zero config.

## How it matches the original

The design tokens were read from the live site's Tailwind build, not eyeballed:

- **Colours:** primary `#1945E8` / `#030D31`, lime `#9EFF00`, category purple `#8A2BE2 → #4C187C`, the full neutral/gray scales, decorative blue, pink and orange, and the review gradient.
- **Type scale:** SharePal's custom `d4…o4` tokens (for example `sh2` = 16/24/700 and `bt3` = 14/16/600), set up as Tailwind v4 `@theme` tokens.
- **Layout:** the 1216px container, the `120px | 1fr` sidebar grid, the 4/3/2-column product grid, and the original paddings and radii (28px `rounded-4xl` buttons, 24px cards).
- **Content:** the FAQ answers, testimonials, stats, SEO copy and footer link structure come from the live page. The SharePal wordmark and icons use the page's own SVG paths.
- **Products:** product data comes from the provided `product-list.json` (`src/data/product-list.json`). Images load from SharePal's image CDN.

### Sections
- Purple header with the hanging logo tab, a city + date pill, search, cart and login. It hides when you scroll down and comes back when you scroll up.
- Super-category tabs (Photography / Gaming / Outdoor / Entertainment). These are sticky on desktop and sit on the purple block on mobile.
- Sub-category sidebar (All, GTA VI, PS5, Xbox, VR, Racing Wheel, Big Screen) with active states.
- "Gaming Consoles" hero banner with the side artwork and brand logos.
- Product grid with Trending/New/Vote-to-Launch badges, a wishlist heart, the waitlist progress card and Add to Cart. It shows 12 products at first, then **Show More**.
- "Select your Dates" modal: a two-month calendar on desktop and a bottom sheet on mobile, with the rental-period and chargeable-period logic. Example: deliver on the 5th, pick up on the 8th, and you're charged for 2 days.
- FAQ accordion, breadcrumb, a marquee of Google reviews that pauses on hover, stats, and the footer (category accordions on mobile, collapsible SEO text, link columns).
- Floating "Select rental dates to view prices" pill, chatbot bubble, and the mobile bottom nav.

### Interactions and animations
Header hide and show on scroll · tab underline · sidebar icon zoom · card hover lift with image zoom · wishlist pop · plus icon that rotates on hover · cart badge bump · staggered fade-up of cards · accordion height transitions · marquee · count-up stats · scroll reveal · modal and drawer slide-ins · shine on the floating pill. All motion respects `prefers-reduced-motion`.

## Improvements I made (from a user's point of view)

1. **Prices are shown before you pick dates.** The original blurs the price as `₹N/A` until you choose dates. Here each card shows the per-day rent right away. Once dates are chosen, the card shows the total for that period, with the per-day rate next to it.
2. **Add to Cart without dates stays in your flow.** It opens the date picker, then adds that product automatically when you press Continue.
3. **Quick duration presets** in the date picker: 1 day, 3 days, 1 week and 1 month.
4. **Social proof on cards.** Each card shows its rating and how many times it has been rented, using `rating` and `booked_count` from the JSON. Products with no ratings yet are labelled "New launch".
5. **Sort and quick filters:** Recommended, Most booked, price low to high and high to low, Top rated; plus In stock and 1/2/4-controller chips.
6. **Clearer out-of-stock state.** The image is greyed out, an "Out of stock" pill is added, a **Notify me** button replaces Add to Cart, and these products sort to the end of the list.
7. **Working cart drawer.** It has quantity steppers, a price breakdown that shows free delivery and ₹0 deposit, and an empty state.
8. **Search overlay** with suggestion chips, a **city picker**, and toasts that confirm what just happened.
9. **Waitlist:** "Join Waitlist" updates the progress bar and the button state.
10. **Your choices are kept between visits.** Dates, cart, wishlist and city are saved in `localStorage`.
11. **Accessibility:** semantic headings, `aria-expanded`/`aria-pressed`, labelled progress bars, Escape closes overlays, visible focus rings, and the reduced-motion fallback.

## Assumptions and scope
- The JSON has 23 products. The live page lists 50, but the counts and pagination here follow the provided data.
- Sub-categories that have no products in the JSON (GTA VI, Xbox, VR, Big Screen) show a "Coming soon" empty state.
- Login, checkout, the chatbot and the other category pages are out of scope. Those controls show a short info toast instead.
- Pricing is per-day rent × chargeable days. The "up to 12%" long-rental discount appears as copy only and isn't applied.
