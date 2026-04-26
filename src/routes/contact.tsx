import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Studio Zeez" },
      { name: "description", content: "Begin your commission with Studio Zeez. Reach out for editorial, weddings, brand, and private photography." },
      { property: "og:title", content: "Contact — Studio Zeez" },
      { property: "og:description", content: "Begin your commission with Studio Zeez." },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1]">
            Begin your <span className="text-gradient-gold italic">commission</span>
          </h1>
          <div className="gold-divider w-24 mt-8" />
          <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-md">
            Tell us about your project. We respond to every inquiry personally within two business
            days.
          </p>
          <ul className="mt-12 space-y-6">
            <li className="flex items-start gap-4">
              <Mail className="text-primary mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Email</p>
                <p className="text-foreground mt-1">Studiozeez@gmail.com</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-primary mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Phone</p>
                <p className="text-foreground mt-1">+2348131117298</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="text-primary mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Instagram</p>
                <p className="text-foreground mt-1">@studio_zeez</p>
              </div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="border border-border/60 bg-card/40 p-8 md:p-10 space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name" name="first" />
            <Field label="Last name" name="last" />
          </div>
          <Field label="Email" name="email" type="email" />
          <Field label="Project type" name="type" placeholder="Editorial, wedding, brand…" />
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Tell us about your vision
            </label>
            <textarea
              required
              rows={5}
              className="mt-2 w-full bg-input/50 border border-border/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sent}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-gold text-primary-foreground text-xs uppercase tracking-[0.3em] shadow-gold hover:opacity-90 transition-all disabled:opacity-60"
          >
            {sent ? "Thank you — we'll be in touch" : (<>Send Inquiry <Send size={16} /></>)}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full bg-input/50 border border-border/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  );
}
