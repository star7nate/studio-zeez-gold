import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BookingSteps } from "@/components/BookingSteps";
import { getPackage, TIME_SLOTS, saveBooking, generateReference, loadBooking } from "@/lib/booking";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/$slug")({
  component: BookPage,
  loader: ({ params }) => {
    const pkg = getPackage(params.slug);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Book ${loaderData.pkg.title} — Studio Zeez` : "Book — Studio Zeez" },
      { name: "description", content: "Select a date and time and share your details to begin your Studio Zeez booking." },
      { property: "og:title", content: "Book your session — Studio Zeez" },
      { property: "og:description", content: "Reserve your Studio Zeez photography session." },
    ],
  }),
});

function BookPage() {
  const { pkg } = Route.useLoaderData();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", eventType: "", eventLocation: "", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Restore prior draft for this package
  useEffect(() => {
    const prev = loadBooking();
    if (prev && prev.packageSlug === pkg.slug) {
      setForm({
        fullName: prev.fullName || "",
        email: prev.email || "",
        phone: prev.phone || "",
        eventType: prev.eventType || "",
        eventLocation: prev.eventLocation || "",
        notes: prev.notes || "",
      });
      setTime(prev.time || "");
      if (prev.date) setDate(new Date(prev.date));
    }
  }, [pkg.slug]);

  const canSubmit =
    !!date && !!time &&
    form.fullName.trim() && form.email.trim() && form.phone.trim() &&
    form.eventType.trim() && form.eventLocation.trim();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || !date) return;
    setSubmitting(true);
    const existing = loadBooking();
    const reference =
      existing && existing.packageSlug === pkg.slug && existing.reference
        ? existing.reference
        : generateReference();
    saveBooking({
      reference,
      packageSlug: pkg.slug,
      packageTitle: pkg.title,
      price: pkg.price,
      date: date.toISOString(),
      time,
      ...form,
    });
    navigate({ to: "/book/$slug/payment", params: { slug: pkg.slug } });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <SiteLayout>
      <section className="max-w-6xl mx-auto px-6 lg:px-10 pt-8 pb-6 animate-fade-in">
        <BookingSteps current={2} />
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-8 md:py-12 grid lg:grid-cols-[1fr,380px] gap-10">
        <div className="animate-fade-in">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Reserve your session</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            Book <span className="text-gradient-gold italic">{pkg.title}</span>
          </h1>
          <div className="gold-divider w-24 mt-6" />

          <form onSubmit={handleSubmit} className="mt-10 space-y-10">
            <div>
              <h2 className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                <CalendarDays size={14} className="text-primary" /> Select a date
              </h2>
              <div className="border border-border/60 bg-card/40 p-3 md:p-5 inline-block">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); setTime(""); }}
                  disabled={(d) => d < today}
                  className={cn("p-3 pointer-events-auto")}
                />
              </div>
            </div>

            {date && (
              <div className="animate-fade-in">
                <h2 className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  <Clock size={14} className="text-primary" /> Available time slots
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={cn(
                        "px-3 py-3 text-xs uppercase tracking-[0.2em] border transition-all",
                        time === t
                          ? "border-primary text-primary bg-primary/10 shadow-gold"
                          : "border-border/60 text-muted-foreground hover:border-primary/60 hover:text-foreground"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
              <Field label="Email address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Phone number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <Field label="Event type" placeholder="Portrait, wedding, birthday…" value={form.eventType} onChange={(v) => setForm({ ...form, eventType: v })} />
              <div className="md:col-span-2">
                <Field label="Event location" placeholder="City, address, or 'At the studio'" value={form.eventLocation} onChange={(v) => setForm({ ...form, eventLocation: v })} />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Additional notes or special requests</label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="mt-2 w-full bg-input/50 border border-border/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-gold text-primary-foreground text-xs uppercase tracking-[0.3em] shadow-gold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <aside className="lg:sticky lg:top-28 h-max border border-primary/30 bg-gradient-dark p-8 shadow-elegant animate-fade-in">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Your selection</p>
          <h3 className="font-display text-2xl leading-tight">{pkg.title}</h3>
          <div className="mt-4 flex items-center justify-between text-sm border-t border-border/40 pt-4">
            <span className="text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Duration</span>
            <span>{pkg.duration}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm border-t border-border/40 pt-4">
            <span className="text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Total</span>
            <span className="text-gradient-gold text-xl">{pkg.price}</span>
          </div>
          <p className="mt-6 text-xs text-muted-foreground leading-relaxed">{pkg.text}</p>
          <Link to="/services" className="mt-6 inline-block text-[11px] uppercase tracking-[0.3em] text-primary story-link">
            ← Change package
          </Link>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-input/50 border border-border/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  );
}