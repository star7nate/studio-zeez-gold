import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import g1 from "@/assets/studio-zeez-gallery-1.jpg";
import g2 from "@/assets/studio-zeez-gallery-2.jpg";
import g3 from "@/assets/studio-zeez-gallery-3.jpg";
import g4 from "@/assets/studio-zeez-gallery-4.jpg";
import g5 from "@/assets/studio-zeez-gallery-5.jpg";
import g6 from "@/assets/studio-zeez-gallery-6.jpg";
import g7 from "@/assets/studio-zeez-gallery-7.jpg";
import g8 from "@/assets/studio-zeez-gallery-8.jpg";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery — Studio Zeez" },
      { name: "description", content: "Selected works from Studio Zeez: editorial, portraits, weddings, products, and street." },
      { property: "og:title", content: "Gallery — Studio Zeez" },
      { property: "og:description", content: "Cinematic photography portfolio by Studio Zeez." },
      { property: "og:image", content: g2 },
      { name: "twitter:image", content: g2 },
    ],
  }),
});

const items = [
  { src: g2, label: "Aurum", category: "Portrait" },
  { src: g4, label: "Heritage", category: "Traditional" },
  { src: g1, label: "Scarlet", category: "Editorial" },
  { src: g5, label: "Intimate", category: "Couples" },
  { src: g3, label: "Nocturne", category: "Fashion" },
  { src: g6, label: "Vow", category: "Wedding" },
  { src: g7, label: "Elegance", category: "Portrait" },
  { src: g8, label: "Studio Day", category: "Lifestyle" },
];

function Gallery() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">Portfolio</p>
        <h1 className="font-display text-5xl md:text-7xl">
          The <span className="text-gradient-gold italic">Gallery</span>
        </h1>
        <div className="gold-divider w-32 mt-8" />
        <p className="mt-8 max-w-xl text-muted-foreground text-lg leading-relaxed">
          A curated selection of recent work. Each frame tells its own story — bound by light,
          shadow, and the unmistakable hand of Studio Zeez.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {items.map((it, i) => (
            <figure
              key={i}
              className="group relative mb-6 break-inside-avoid overflow-hidden bg-card border border-border/40"
            >
              <img
                src={it.src}
                alt={`${it.label} — ${it.category} photography`}
                loading="lazy"
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute bottom-0 inset-x-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary">{it.category}</p>
                <p className="font-display text-2xl text-foreground italic mt-1">{it.label}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
