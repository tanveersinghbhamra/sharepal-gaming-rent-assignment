# SharePal — Gaming Gadgets on Rent (recreation)

A front-end recreation of [sharepal.in/bangalore/gaming-gadgets-on-rent](https://sharepal.in/bangalore/gaming-gadgets-on-rent), built for the SharePal hiring assignment by **Tanveersingh Bhamra**.

- **Live site:** https://sharepal-gaming-rent-assignment.vercel.app
- **Repository:** https://github.com/tanveersinghbhamra/sharepal-gaming-rent-assignment

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Inter + Ubuntu (self-hosted via Fontsource) · lucide-react · Prettier with the Tailwind plugin

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

The page is served at both `/` and `/bangalore/gaming-gadgets-on-rent` (the canonical URL). It deploys to Vercel with zero config. If the deployment URL ever changes, set `NEXT_PUBLIC_SITE_URL` so the link-preview image resolves.

## Project structure

```
src/
  app/            layout + metadata, the page routes, Open Graph image
  components/     Header, CategoryTabs, HeroBanner, Sidebar, ProductSection,
                  ProductCard, PromoBanner, DateModal, Faq, Reviews, Footer,
                  Overlays (cart, search, city picker, toasts, chat button, mobile nav)
  data/           product-list.json (provided) + page copy (FAQ, reviews, footer, cities)
  lib/            store (React context + localStorage), date maths, product sorting/formatting
```

## How it matches the original

The design tokens were read from the live site's Tailwind build, not eyeballed. Layout was then compared element by element against the live page, on desktop (1440px) and mobile (375px), with a DOM measuring script.

- **Colours:** primary `#1945E8` / `#030D31`, lime `#9EFF00`, category purple `#8A2BE2 → #4C187C`, the full neutral/gray scales, decorative blue, pink and orange, and the review gradient.
- **Type scale:** SharePal's custom `d4…o4` tokens (for example `sh2` = 16/24/700 and `bt3` = 14/16/600), set up as Tailwind v4 `@theme` tokens. All sizes and spacing are Tailwind classes, not hard-coded pixels.
- **Layout:** the 1216px container, the 120px sidebar beside the grid, the 4/3/2-column product grid, and the original paddings and radii (28px `rounded-4xl` buttons, 24px cards).
- **Content:** the FAQ answers, testimonials, stats, SEO copy and footer link structure come from the live page. The SharePal wordmark, icons, city artwork and empty-cart illustration use the site's own SVGs and image CDN.
- **Products:** product data comes from the provided `product-list.json` (`src/data/product-list.json`). Images load from SharePal's image CDN.

### Sections

- Purple header with the hanging logo tab, a city + date pill (with an "N days" badge once dates are set), search, cart and login. It hides when you scroll down and comes back when you scroll up.
- Super-category tabs (Photography / Gaming / Outdoor / Entertainment). These are sticky on desktop and sit on the purple block on mobile.
- Sub-category sidebar (All, GTA VI, PS5, Xbox, VR, Racing Wheel, Big Screen) with active states.
- "Gaming Consoles" hero banner with the side artwork and brand logos.
- SharePal's in-grid promo strips (Asset Partner after row 1, Earn With Us after row 2), with desktop and mobile artwork.
- The date picker opens automatically on the first visit of a session, like the live site.
- Product grid with Trending/New/Vote-to-Launch badges, a wishlist heart, the waitlist progress card, the "Incl. of GST" price tag and Add to Cart. It shows 12 products at first, then **Show More**.
- "Select your Dates" modal: a two-month calendar on desktop and a bottom sheet on mobile, with the rental-period and chargeable-period logic. Example: deliver on the 5th, pick up on the 8th, and you're charged for 2 days.
- **Cart** and **Search** open as SharePal's right-hand sheet. The empty cart shows their basket illustration with "Oops! Your Cart is Feeling Lonely...". Search has the coupon banner, a Popular Items carousel and a live results dropdown.
- **City picker:** "Select Your City" dialog with the six popular cities (with their city artwork) and other cities.
- FAQ accordion, breadcrumb, a marquee of Google reviews that pauses on hover, stats, and the footer (category accordions on mobile, collapsible SEO text, link columns).
- Floating "Select rental dates to view prices" pill, the animated AI chat button and the mobile bottom nav.
- Link previews: Open Graph and Twitter tags with a SharePal-style preview image, so the URL shows a card when shared on WhatsApp, LinkedIn or Slack.

### Interactions and animations

Header hide and show on scroll · tab underline · sidebar icon zoom · card hover lift with image zoom · wishlist pop · plus icon that rotates on hover · cart badge bump · staggered fade-up of cards · accordion height transitions · marquee · count-up stats · scroll reveal · sheet and modal slide-ins · shine on the floating pill · the AI chat button's chat-bubble loop (SharePal's Lottie animation rebuilt frame-for-frame in SVG + CSS, so no animation library is needed). All motion respects `prefers-reduced-motion`.

## Improvements I made (from a user's point of view)

1. **Prices are shown before you pick dates.** The original blurs the price as `₹N/A` until you choose dates. Here each card shows the per-day rent right away. Once dates are chosen, the card shows the total for that period, with the per-day rate next to it.
2. **Add to Cart without dates stays in your flow.** It opens the date picker, then adds that product automatically when you press Continue.
3. **Quick duration presets** in the date picker: 1 day, 3 days, 1 week and 1 month.
4. **Social proof on cards.** Each card shows its rating and how many times it has been rented, using `rating` and `booked_count` from the JSON. Products with no ratings yet are labelled "New launch".
5. **Sort and quick filters:** Recommended, Most booked, price low to high and high to low, Top rated; plus In stock and 1/2/4-controller chips.
6. **Clearer out-of-stock state.** The image is greyed out, an "Out of stock" pill is added, a **Notify me** button replaces Add to Cart, and these products sort to the end of the list.
7. **Working cart.** It keeps SharePal's look, and adds quantity steppers, an editable date strip and a price breakdown (free delivery, ₹0 deposit, total incl. GST).
8. **Search that takes you to the product.** Choosing a result or a popular item closes the sheet and scrolls to that product card, briefly highlighting it.
9. **Feedback toasts** confirm what just happened, such as an item added to the cart or a city changed.
10. **Waitlist:** "Join Waitlist" updates the progress bar and the button state.
11. **Your choices are kept between visits.** Dates, cart, wishlist and city are saved in `localStorage`.
12. **Accessibility:** semantic headings, `aria-expanded`/`aria-pressed`, labelled progress bars, Escape closes overlays, visible focus rings, and the reduced-motion fallback.

## Assumptions and scope

- The JSON has 23 products (4 out of stock). The live page lists 50, but the counts and pagination here follow the provided data.
- 21 products match PS5 and 1 matches Racing Wheel. Sub-categories with no products in the JSON (GTA VI, Xbox, VR, Big Screen) show a "Coming soon" empty state.
- Login, checkout, the chatbot and the other category pages are out of scope. Those controls show a short info toast instead.
- Pricing is per-day rent × chargeable days. The "up to 12%" long-rental discount appears as copy only and isn't applied.
