import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { TiltCard } from "@/components/TiltCard";
import { ParticleField } from "@/components/ParticleField";
import g1 from "@/assets/studio-zeez-gallery-1.jpg";
import g2 from "@/assets/studio-zeez-gallery-2.jpg";
import g3 from "@/assets/studio-zeez-gallery-3.jpg";
import g4 from "@/assets/studio-zeez-gallery-4.jpg";
import g5 from "@/assets/studio-zeez-gallery-5.jpg";
import g6 from "@/assets/studio-zeez-gallery-6.jpg";
import g7 from "@/assets/studio-zeez-gallery-7.jpg";
import g8 from "@/assets/studio-zeez-gallery-8.jpg";
import upGreen1 from "@/assets/upload-traditional-green-1.jpg";
import upGreen2 from "@/assets/upload-traditional-green-2.jpg";
import upPurple from "@/assets/upload-portrait-purple.jpg";
import upPony from "@/assets/upload-portrait-ponytail.jpg";
import upKids from "@/assets/upload-family-kids.jpg";
import upCouple from "@/assets/upload-couple-red.jpg";
import upFamily from "@/assets/upload-family-portrait.jpg";
import upSmoke from "@/assets/upload-smoke-portrait.jpg";
import upDenim from "@/assets/upload-denim-ladder.jpg";
import upBlack from "@/assets/upload-black-dress.jpg";
import upWhiteShirt from "@/assets/upload-white-shirt.jpg";
import upNyCap from "@/assets/upload-ny-cap.jpg";
import upTealSit from "@/assets/upload-teal-sit.jpg";
import upTealStand from "@/assets/upload-teal-stand.jpg";
import upSetCurtains from "@/assets/upload-set-curtains.jpg";
import upSetPedestals from "@/assets/upload-set-pedestals.jpg";
import upSetWave from "@/assets/upload-set-wave.jpg";
import upStairsWarm from "@/assets/upload-set-stairs-warm.jpg";
import upStairsPurple from "@/assets/upload-set-stairs-purple.jpg";
import edBrownChair from "@/assets/editorial-brown-chair.jpg.asset.json";
import edLimePlinth from "@/assets/editorial-lime-plinth.jpg.asset.json";
import bdLimeStairs from "@/assets/birthday-lime-stairs.jpg.asset.json";
import bdBlackGold from "@/assets/birthday-black-gold-stairs.jpg.asset.json";
import bdBlueSequin from "@/assets/birthday-blue-sequin.jpg.asset.json";
import bdRedRoses from "@/assets/birthday-red-roses.jpg.asset.json";
import bbYellow from "@/assets/baby-yellow-agbada.jpg.asset.json";
import bbJordan from "@/assets/baby-blue-jordan.jpg.asset.json";
import bbWhite from "@/assets/baby-white-agbada.jpg.asset.json";
import bbMilk from "@/assets/baby-milk-tins.jpg.asset.json";
import bbTwins from "@/assets/baby-twins-one.jpg.asset.json";
import bbSuit from "@/assets/baby-black-suit.jpg.asset.json";

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
  { src: bbWhite.url, label: "Oriwajaiye", category: "Baby Shoot" },
  { src: bbTwins.url, label: "Turning One", category: "Baby Shoot" },
  { src: bbYellow.url, label: "Little Chief", category: "Baby Shoot" },
  { src: bbSuit.url, label: "Young Gentleman", category: "Baby Shoot" },
  { src: bbJordan.url, label: "Play Day", category: "Baby Shoot" },
  { src: bbMilk.url, label: "Milestone", category: "Baby Shoot" },
  { src: edBrownChair.url, label: "Terracotta", category: "Editorial" },
  { src: bdLimeStairs.url, label: "Citrine Ascent", category: "Birthday" },
  { src: bdRedRoses.url, label: "Fifty Roses", category: "Birthday" },
  { src: edLimePlinth.url, label: "Chartreuse", category: "Editorial" },
  { src: bdBlackGold.url, label: "Gilded Noir", category: "Birthday" },
  { src: bdBlueSequin.url, label: "Cobalt Bloom", category: "Birthday" },
  { src: upSmoke, label: "Veil of Smoke", category: "Editorial" },
  { src: upWhiteShirt, label: "Crisp Cotton", category: "Fashion" },
  { src: upTealStand, label: "Tassel & Teal", category: "Couture" },
  { src: upGreen2, label: "Emerald Grace", category: "Traditional" },
  { src: upBlack, label: "Crimson Noir", category: "Fashion" },
  { src: upNyCap, label: "Off Duty", category: "Street" },
  { src: upFamily, label: "House of Red", category: "Family" },
  { src: upTealSit, label: "Atelier", category: "Couture" },
  { src: upPurple, label: "Violet Hour", category: "Portrait" },
  { src: upSetCurtains, label: "Velvet Stage", category: "Set Design" },
  { src: upDenim, label: "Studio Day", category: "Lifestyle" },
  { src: upCouple, label: "Heirloom", category: "Couples" },
  { src: upSetPedestals, label: "Plinths", category: "Set Design" },
  { src: upGreen1, label: "Iroyin", category: "Traditional" },
  { src: upPony, label: "Silhouette", category: "Portrait" },
  { src: upSetWave, label: "Crescent", category: "Set Design" },
  { src: upKids, label: "Little Royals", category: "Family" },
  { src: upStairsWarm, label: "Ascent", category: "Architecture" },
  { src: upStairsPurple, label: "Neon Climb", category: "Architecture" },
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
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
        <ParticleField />
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

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 scene-3d">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance] preserve-3d">
          {items.map((it, i) => {
            const depthZ = (i % 3) * 14 - 14;
            const tiltY = ((i % 5) - 2) * 1.4;
            return (
            <TiltCard key={i} className="mb-6 break-inside-avoid block animate-drift" max={9}>
              <figure
                className="group relative overflow-hidden bg-card border border-border/40 depth-glow"
                style={{ transform: `translateZ(${depthZ}px) rotateY(${tiltY}deg)`, animationDelay: `${(i % 4) * 0.8}s` }}
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
            </TiltCard>
          );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
