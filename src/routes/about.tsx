import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import portrait from "@/assets/about-portrait.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Studio Zeez" },
      { name: "description", content: "Studio Zeez is a luxury photography practice based in New York, working worldwide for editorial, brand, and private clients." },
      { property: "og:title", content: "About — Studio Zeez" },
      { property: "og:description", content: "A luxury photography practice in gold and shadow." },
      { property: "og:image", content: portrait },
      { name: "twitter:image", content: portrait },
    ],
  }),
});

function About() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border border-border/60 shadow-elegant">
            <img
              src={portrait}
              alt="Founder of Studio Zeez behind the camera"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">The Founder</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Behind every <span className="text-gradient-gold italic">frame</span>.
          </h1>
          <div className="gold-divider w-24 mt-8" />
          <div className="mt-8 space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              Studio Zeez was founded in 2018 with a simple obsession: that a photograph should feel
              like a relic. Something you'd find in a velvet-lined drawer a hundred years from now
              and still feel its pulse.
            </p>
            <p>
              Working out of a Brooklyn studio and on assignment worldwide, we've collaborated with
              independent designers, heritage maisons, and couples who refuse the ordinary. Our
              language is gold, shadow, and the quiet space between.
            </p>
            <p>
              Every commission is taken personally. There is no team of associates, no factory line.
              Just one lens, one vision, and a fanatical commitment to the image you'll keep
              forever.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 border border-primary/40 text-primary text-xs uppercase tracking-[0.3em] hover:bg-primary/10 transition-all"
          >
            Work With Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid md:grid-cols-4 gap-10 text-center">
          {[
            { n: "120+", l: "Commissions" },
            { n: "32", l: "Countries" },
            { n: "14", l: "Awards" },
            { n: "6yr", l: "Practice" },
          ].map((s, i) => (
            <div key={i}>
              <p className="font-display text-5xl md:text-6xl text-gradient-gold">{s.n}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-6">Featured In</p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 font-display text-2xl text-muted-foreground/70 italic">
          <span>Vogue Italia</span>
          <span>Harper's Bazaar</span>
          <span>Rolling Stone</span>
          <span>WSJ Magazine</span>
          <span>Numéro</span>
        </div>
      </section>
    </SiteLayout>
  );
}
