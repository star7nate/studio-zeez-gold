import { Camera, Heart, Sparkles, Building2, Home, Users, Clock, Armchair, type LucideIcon } from "lucide-react";

export type Package = {
  slug: string;
  icon: LucideIcon;
  title: string;
  price: string;
  priceValue: number;
  duration: string;
  text: string;
  features: string[];
};

export const packages: Package[] = [
  { slug: "full-session-content-studio", icon: Camera, title: "Full Session — Content Studio", price: "₦200,000", priceValue: 200000, duration: "90 mins", text: "Full photo shoot session in our content studio. 3 outfits with 10 edited pictures.", features: ["3 outfits", "10 edited pictures", "Content studio"] },
  { slug: "half-session-content-studio", icon: Clock, title: "Half Session — Content Studio", price: "₦150,000", priceValue: 150000, duration: "60 mins", text: "Half session at our photo studio. 3 outfits with 10 edited pictures.", features: ["3 outfits", "10 edited pictures", "Photo studio"] },
  { slug: "mini-session-content-studio", icon: Sparkles, title: "Mini Session — Content Studio", price: "₦100,000", priceValue: 100000, duration: "30 mins", text: "Mini session at our photo studio (not the content house). 2 outfits with 6 edited pictures.", features: ["2 outfits", "6 edited pictures", "Photo studio"] },
  { slug: "half-session-content-space", icon: Clock, title: "Half Session — Content Space", price: "₦50,000", priceValue: 50000, duration: "30 mins", text: "One outfit with 3 edited pictures at our photo studio.", features: ["1 outfit", "3 edited pictures", "Photo studio"] },
  { slug: "designer-space-session", icon: Armchair, title: "Designer Space Session", price: "₦140,000", priceValue: 140000, duration: "60 mins", text: "2 outfits with 6 edited pictures at our content house, in a designer space that elevates your picture quality.", features: ["2 outfits", "6 edited pictures", "Content house"] },
  { slug: "home-service", icon: Home, title: "Home Service", price: "₦300,000", priceValue: 300000, duration: "90 mins", text: "Outdoor shoot with 2–3 outfits and 10 edited pictures. All raw pictures from the session are sent to you via Google Drive.", features: ["Outdoor shoot", "2–3 outfits", "10 edited pictures", "All raw files via Google Drive"] },
  { slug: "family-session", icon: Users, title: "Family Session", price: "₦450,000", priceValue: 450000, duration: "90 mins", text: "Family shoot with 15 edited pictures and one 24×36 frame enlargement.", features: ["15 edited pictures", "24×36 frame enlargement", "90 minutes"] },
  { slug: "content-space-single-setup", icon: Building2, title: "Content Space for Rent — Single Setup", price: "₦20,000", priceValue: 20000, duration: "30 mins", text: "Use a particular setup of your choice in our content space for 30 minutes.", features: ["One setup of choice", "30 minutes", "No shoot included"] },
  { slug: "content-space-full-setup", icon: Building2, title: "Content Space for Rent — Full Setup", price: "₦50,000", priceValue: 50000, duration: "60 mins", text: "Use the whole setup in our content space for one hour.", features: ["Whole setup access", "60 minutes", "No shoot included"] },
  { slug: "family-session-no-frame", icon: Users, title: "Family Session — Without Frame", price: "₦350,000", priceValue: 350000, duration: "90 mins", text: "Family shoot without frame. 12 retouched pictures, with all unedited pictures sent via Google Drive.", features: ["12 retouched pictures", "All raw files via Google Drive", "90 minutes"] },
  { slug: "one-outfit-content-space", icon: Camera, title: "1 Outfit — Content Space", price: "₦70,000", priceValue: 70000, duration: "30 mins", text: "One outfit at the content space: ₦20,000 for 30 minutes space rental + ₦50,000 for the shoot.", features: ["1 outfit", "3 edited pictures", "Space rental + shoot"] },
  { slug: "silver-wedding-360", icon: Heart, title: "Silver Package 1 — Photobook + Frame", price: "₦360,000", priceValue: 360000, duration: "Full event", text: "Photobook size 10x20, 40 pages, plus one 16x20 frame.", features: ["Photobook 10x20 · 40 pages", "1 × 16x20 frame", "75–80% upfront"] },
  { slug: "silver-wedding-600", icon: Heart, title: "Silver Package 2 — Photobook + Video", price: "₦600,000", priceValue: 600000, duration: "Full event", text: "Photobook size 8x20, 50 pages, plus video coverage and one 16x20 frame.", features: ["Photobook 8x20 · 50 pages", "Video coverage", "1 × 16x20 frame"] },
  { slug: "silver-wedding-700", icon: Heart, title: "Silver Package 3 — Photobook, Video + 2 Frames", price: "₦700,000", priceValue: 700000, duration: "Full event", text: "Photobook size 10x20, 50 pages, plus video and two 16x20 frames.", features: ["Photobook 10x20 · 50 pages", "Video coverage", "2 × 16x20 frames"] },
  { slug: "silver-wedding-850", icon: Heart, title: "Silver Package 4 — Free Prewedding", price: "₦850,000", priceValue: 850000, duration: "Full event", text: "Photobook size 12x12, 50 pages, plus video and two 16x20 frames. Includes a free prewedding shoot (1 outfit).", features: ["Photobook 12x12 · 50 pages", "Video coverage", "2 × 16x20 frames", "Free prewedding (1 outfit)"] },
  { slug: "gold-wedding-1m", icon: Heart, title: "Golden Package 5 — Drone & Dual Video", price: "₦1,000,000", priceValue: 1000000, duration: "Full event", text: "Photobook size 12x24, 50 pages, plus 2 video sources with drone — one for the bride, one for the groom — and two 20x30 frames. Free prewedding.", features: ["Photobook 12x24 · 50 pages", "2 video sources + drone", "2 × 20x30 frames", "Free prewedding"] },
  { slug: "gold-wedding-1-2m", icon: Heart, title: "Golden Package 6 — Premium Collection", price: "₦1,200,000", priceValue: 1200000, duration: "Full event", text: "Photobook size 12x24, 50 pages, plus a small 8x8 photobook, video with 2 cameras and drone, and two 20x30 frames. Free prewedding.", features: ["Photobook 12x24 · 50 pages", "Extra 8x8 photobook", "2 cameras + drone video", "2 × 20x30 frames", "Free prewedding"] },
];

export function getPackage(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

// Studio payment + WhatsApp config — update these values with real details.
export const studio = {
  bankName: "Zenith Bank",
  accountName: "StudioZeezGallery",
  accountNumber: "1310294633",
  whatsappNumber: "2348131117298", // international format, no +
  email: "Studiozeez@gmail.com",
};

export const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export type BookingDetails = {
  reference: string;
  packageSlug: string;
  packageTitle: string;
  price: string;
  date: string; // ISO date
  time: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventLocation: string;
  notes: string;
  receiptName?: string;
};

const STORAGE_KEY = "studiozeez.booking";

export function saveBooking(b: BookingDetails) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(b));
}

export function loadBooking(): BookingDetails | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as BookingDetails; } catch { return null; }
}

export function clearBooking() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export function generateReference() {
  const n = Math.floor(10000 + Math.random() * 89999);
  return `SZ-${n}`;
}

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch { return iso; }
}

export function buildWhatsAppUrl(b: BookingDetails) {
  const msg = [
    "Hello Studio Zeez, I have completed my booking.",
    "",
    `Booking Reference: ${b.reference}`,
    `Package: ${b.packageTitle}`,
    `Name: ${b.fullName}`,
    `Phone: ${b.phone}`,
    `Email: ${b.email}`,
    `Date: ${formatDate(b.date)}`,
    `Time: ${b.time}`,
    `Event Type: ${b.eventType}`,
    `Location: ${b.eventLocation}`,
    `Amount Paid: ${b.price}`,
    b.notes ? `Notes: ${b.notes}` : "",
    "",
    "I have uploaded my payment receipt. Kindly confirm my booking.",
  ].filter(Boolean).join("\n");
  return `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}