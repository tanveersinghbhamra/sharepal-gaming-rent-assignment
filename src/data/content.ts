// Static page content mirrored from sharepal.in/bangalore/gaming-gadgets-on-rent

export const IMG = "https://images.sharepal.in";

export const superCategories = [
  { label: "Photography", href: "#photography" },
  { label: "Gaming", href: "#", active: true },
  { label: "Outdoor", href: "#outdoor" },
  { label: "Entertainment", href: "#entertainment" },
];

export type SubCategory = {
  id: string;
  label: string;
  image: string;
  /** keyword test against product name; undefined = all */
  match?: (name: string) => boolean;
};

export const subCategories: SubCategory[] = [
  { id: "all", label: "All", image: `${IMG}/misc/hard-coded/sharepal/Product=All%20Products.webp` },
  { id: "gta-vi", label: "GTA VI", image: `${IMG}/category-icons/gta-vi.webp`, match: (n) => /gta/i.test(n) },
  { id: "ps5", label: "PS5 Console", image: `${IMG}/sub-category-card/ps5-console-on-rent-sharepal.webp`, match: (n) => /ps5|fc2|controller/i.test(n) && !/portal|wheel/i.test(n) },
  { id: "xbox", label: "Xbox Console", image: `${IMG}/sub-category-card/xbox-console-on-rent-sharepal.webp`, match: (n) => /xbox/i.test(n) },
  { id: "vr", label: "VR", image: `${IMG}/sub-category-card/vr-on-rent-sharepal.webp`, match: (n) => /vr|oculus|quest/i.test(n) },
  { id: "racing", label: "Racing Wheel", image: `${IMG}/categories/gaming-consoles/gaming-accessories/logitech-G29-driving-force-racing-wheel/logitech-g29-racing-wheel-on-rent-sharepal-1.webp`, match: (n) => /wheel|racing/i.test(n) },
  { id: "big-screen", label: "Big Screen Gaming", image: `${IMG}/categories/gaming-consoles/big-screen-gaming/products/ps5-with-2-controllers-with-projector-on-rent+.webp`, match: (n) => /projector|big screen/i.test(n) },
];

export const cities = ["Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Kolkata", "Gurgaon", "Noida", "Ahmedabad"];

export const faqs = [
  {
    q: "How can I rent from SharePal?",
    a: "Renting from SharePal is quick and easy. You can browse the products, select your dates and add them to cart and checkout. You can choose to pay online or upon delivery.",
  },
  {
    q: "If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?",
    a: "No, partial extension is not possible, all the products that are rented in that particular order have to be extended.",
  },
  {
    q: "When does the rental start?",
    a: "The rental starts from the following day of the delivery day and ends a day prior to the return date. So for example, if you select the delivery date as 5th June and return date as 8th June. The rental is charged for 2 days.",
  },
  {
    q: "What will be the condition of the products at the time of delivery?",
    a: "At SharePal.in, we make sure that the products you receive are in great condition upon delivery. We thoroughly inspect and clean each item before sending it your way. If you ever face any issues, our friendly customer support team is here to help. Your satisfaction matters to us the most!",
  },
  {
    q: "Why is verification required?",
    a: "Profile verification is a crucial step at SharePal.in to ensure the safety and security of our platform and users. It helps us confirm the identity of our users, prevent fraud, and maintain a secure environment for everyone involved.",
  },
];

export const moreFaqs = [
  {
    q: "Do I need to pay a security deposit?",
    a: "No. SharePal offers zero-deposit rentals once your profile is verified, so you only pay the rent for the days you use the product.",
  },
  {
    q: "Are delivery and pickup free?",
    a: "Yes. Delivery to your doorstep and pickup at the end of your rental are free, and the delivery and pickup days are not charged.",
  },
  {
    q: "Can I extend my rental?",
    a: "Yes, you can extend your rental from your orders page before the pickup date, subject to availability. All products in the order are extended together.",
  },
];

export const testimonials = [
  { name: "Satyaki", initials: "SB", city: "Kolkata", cat: "Trekking Gear", stars: 5, text: "I would recommend SharePal for anybody looking to rent trekking gears, on time delivery, condition of products delivered were very good, super transparent deposit return policy." },
  { name: "Afrana", initials: "AS", city: "Bangalore", cat: "Gaming Console", stars: 5, text: "Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well. Rented trekking gear and PS4. Thanks Sharepal! Cheers to you guys!" },
  { name: "Kanthikiran", initials: "KK", city: "Bangalore", cat: "Riding Gear", stars: 5, text: "It’s an amazing service, starting from the quality of the gear provided to the pickup and drop at doorstep facility. The staff is extremely helpful and supportive. The jacket was freshly washed and the shoes provided were brand new. The refund for the deposit was also processed immediately. We had no clue that this kind of service existed in India, SharePal." },
  { name: "Amal", initials: "AA", city: "Bangalore", cat: "Gaming Console", stars: 5, text: "I am a regular customer and order ps4 It’s very affordable and booking an order is super easy and user friendly website and polite staff." },
  { name: "Pankaj", initials: "PS", city: "Mumbai", cat: "Action Cameras", stars: 5, text: "The experience with share pal is awesome . The camera , service provide by them is good. Overall I am Happy by renting camera gear from share pal. Next time I will rent the gears from share pal only. Must recommend to everyone" },
  { name: "Jayaraman", initials: "JS", city: "Mumbai", cat: "Riding Gear", stars: 5, text: "Great company amazing products at affordable prices and great service I would recommend share pal to everybody they really go out of the way for the best service I surely know I will be their forever customer." },
  { name: "Manish", initials: "MM", city: "Mumbai", cat: "Gaming console", stars: 5, text: "I like the way sharepal work and really enjoyed the ps4 will order again. Thanks sharepal" },
  { name: "Rakesh", initials: "RS", city: "Mumbai", cat: "Trekking Gear", stars: 2, text: "Ordered 2 pair of shoes & 3 trekking poles. Shoes were in mint condition, very well cleaned and sanitized and so does the trekking poles. Delivery and pick-up was smooth. Refund was done within the time frame. If you have UPI it will be transferred immediately. I overall had a very good experience with Sharepal. Have recommended to my family and friends as well. Thank you Sharepal." },
  { name: "Shruti", initials: "SJ", city: "Mumbai", cat: "Winter Wear", stars: 5, text: "Right from the time I saw their website, till i got my refund the entire experience with SharePal was brilliant. The product listing, prices, delivery, communication, return. Everything was spot on. Product quality was brilliant. The way the team solves your issues is so rare to find in today’s times.. I dont think I am gonna look at any other place for my travel needs." },
  { name: "Amit", initials: "AK", city: "Delhi", cat: "Riding Gear", stars: 5, text: "Awesome experience. Please be the way you are. Received excellent clothes and shoes in washed and clean state. They looked like new ones. Received hasslefree refund." },
];

export const stats = [
  { value: 250, prefix: "", suffix: "Cr+", label: "Saved Together" },
  { value: 4.5, prefix: "", suffix: "M Kg", label: "CO₂e Emissions Saved", decimals: 1 },
  { value: 100, prefix: "", suffix: "K+", label: "Products in Circulation" },
];

const c = (city: string, path: string) => `#${city}-${path}`;
export const footerCategories = [
  { title: "Action Cameras", links: ["Action Cameras", "Pocket Cameras", "GoPro Cameras", "DJI Cameras", "DJI Drones", "360 Cameras"] },
  { title: "Cameras", links: ["DSLR Cameras", "Cameras", "iPhones", "DSLR Gimbal Combos", "Wildlife Photography", "Tripod and camera accessories"] },
  { title: "Trekking Gear", links: ["Trekking Gear", "Trekking Jackets", "Trek/Snow Pants", "Trekking Shoes", "Trek Accessories"] },
  { title: "Riding Gear", links: ["Riding Gear", "Riding Luggage", "Riding Jackets", "Riding Essentials", "Riding Boots", "Binoculars"] },
  { title: "Creator Gear", links: ["Wireless & Collar Mics", "Professional Cameras", "Mirrorless Cameras", "UNLMTD Vlogging", "Mobile Gimbals", "Vlogging"] },
  { title: "Gaming Console", links: ["PS5 Console", "VR", "Racing Wheel", "Big Screen Gaming", "Xbox Console"] },
  { title: "Winter Wear", links: ["Snow Boots", "Winter Jackets", "Backpacks"] },
  { title: "Camping Gear", links: ["Camping Gear", "Camping Stools & Tables", "Camping Tents", "Sleeping Bags & Mats"] },
  { title: "Audio Visual Equipment", links: ["Projectors", "VR", "Mics", "Speakers"] },
].map((g) => ({ ...g, links: g.links.map((l) => ({ label: l, href: c("bangalore", l.toLowerCase().replace(/[^a-z0-9]+/g, "-")) })) }));

export const footerColumns = [
  { title: "Sharepal", links: [{ label: "About" }, { label: "Why SharePal" }, { label: "Sitemap" }, { label: "CarePal" }] },
  { title: "Become a Pal", links: [{ label: "Sharepal for Creators" }, { label: "Careers" }, { label: "Sharepal for Brands" }, { label: "Asset Funding Program", isNew: true }, { label: "Rent Your Gear", isNew: true }] },
  { title: "Information", links: [{ label: "How it works?" }, { label: "FAQs" }, { label: "Verification" }, { label: "Cancellation Policy" }, { label: "Life at Sharepal" }] },
  { title: "Policies", links: [{ label: "Terms & Condition" }, { label: "Shipping policy" }, { label: "Damage Policy" }, { label: "Terms of Use" }, { label: "Privacy Policy" }] },
];
