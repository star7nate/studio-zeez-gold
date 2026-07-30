import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BookingSteps } from "@/components/BookingSteps";
import { getPackage, loadBooking, buildWhatsAppUrl, clearBooking, formatDate, type BookingDetails } from "@/lib/booking";
import { useEffect, useState } from "react";
import { MessageCircle, Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/book/$slug/confirm")({
  component: ConfirmPage,
  loader: ({ params }) => {
    const pkg = getPackage(params.slug);
    if (!pkg) throw notFound();
    return { slug: pkg.slug };
  },
  head: () => ({
    meta: [
      { title: "Confirm on WhatsApp — Studio Zeez" },
      { name: "description", content: "Send your Studio Zeez booking details on WhatsApp to complete confirmation." },
    ],
  }),
});

function ConfirmPage() {
  const { slug } = Route.useLoaderData();
  const pkg = getPackage(slug)!;
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const b = loadBooking();
    if (!b || b.packageSlug !== pkg.slug) {
      navigate({ to: "/book/$slug", params: { slug: pkg.slug } });
      return;
    }
    setBooking(b);
  }, [pkg.slug, navigate]);

  if (!booking) return null;

  function openWhatsApp() {
    if (!booking) return;
    window.open(buildWhatsAppUrl(booking), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <SiteLayout>
      <section className="max-w-6xl mx-auto px-6 lg:px-10 pt-8 pb-6 animate-fade-in">
        <BookingSteps current={5} />
      </section>

      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-8 md:py-16 text-center animate-fade-in">
        {!sent ? (
          <>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Final step</p>
            <h1 className="font-display text-4xl md:text-6xl leading-tight">
              Confirm on <span className="text-gradient-gold italic">WhatsApp</span>
            </h1>
            <div className="gold-divider w-24 mt-6 mx-auto" />
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Tap the button below to send your booking details to Studio Zeez on WhatsApp. Your message is pre-filled with everything we need to confirm your session.
            </p>

            <div className="mt-10 border border-primary/30 bg-gradient-dark shadow-elegant p-8 md:p-10 text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Booking summary</p>
              <h3 className="font-display text-2xl mt-2">{booking.packageTitle}</h3>
              <dl className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <Row label="Reference" value={booking.reference} accent />
                <Row label="Name" value={booking.fullName} />
                <Row label="Date" value={formatDate(booking.date)} />
                <Row label="Time" value={booking.time} />
                <Row label="Phone" value={booking.phone} />
                <Row label="Email" value={booking.email} />
                <Row label="Event type" value={booking.eventType} />
                <Row label="Location" value={booking.eventLocation} />
                <Row label="Amount" value={booking.price} accent />
                <Row label="Receipt" value={booking.receiptName || "Uploaded"} />
              </dl>
            </div>

            <button
              onClick={openWhatsApp}
              className="mt-10 inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-gold text-primary-foreground text-xs uppercase tracking-[0.3em] shadow-gold hover:opacity-90 transition-all"
            >
              <MessageCircle size={18} /> Continue on WhatsApp
            </button>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="mx-auto w-20 h-20 rounded-full border border-primary/60 flex items-center justify-center shadow-gold">
              <Check size={36} className="text-primary" />
            </div>
            <h1 className="mt-8 font-display text-4xl md:text-6xl leading-tight">
              Booking <span className="text-gradient-gold italic">received</span>
            </h1>
            <div className="gold-divider w-24 mt-6 mx-auto" />
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Thank you, {booking.fullName.split(" ")[0]}. We&apos;ll review your payment receipt and confirm your booking on WhatsApp shortly. Please keep your reference{" "}
              <span className="text-primary">{booking.reference}</span> handy.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-3 px-8 py-4 border border-primary/60 text-primary text-xs uppercase tracking-[0.3em] hover:bg-primary/10 transition-all"
              >
                <MessageCircle size={16} /> Reopen WhatsApp
              </button>
              <Link
                to="/"
                onClick={() => clearBooking()}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-primary-foreground text-xs uppercase tracking-[0.3em] shadow-gold hover:opacity-90 transition-all"
              >
                <Sparkles size={16} /> Back to home
              </Link>
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/40 pb-3">
      <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</dt>
      <dd className={accent ? "text-primary" : ""}>{value}</dd>
    </div>
  );
}