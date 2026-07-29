import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BookingSteps } from "@/components/BookingSteps";
import { getPackage, loadBooking, saveBooking, studio, formatDate } from "@/lib/booking";
import { useEffect, useRef, useState } from "react";
import { Copy, Upload, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/$slug/payment")({
  component: PaymentPage,
  loader: ({ params }) => {
    const pkg = getPackage(params.slug);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: () => ({
    meta: [
      { title: "Payment — Studio Zeez" },
      { name: "description", content: "Complete your Studio Zeez booking with a secure bank transfer and receipt upload." },
    ],
  }),
});

function PaymentPage() {
  const { pkg } = Route.useLoaderData();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(() => loadBooking());
  const [copied, setCopied] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const b = loadBooking();
    if (!b || b.packageSlug !== pkg.slug) {
      navigate({ to: "/book/$slug", params: { slug: pkg.slug } });
      return;
    }
    setBooking(b);
    if (b.receiptName) setUploaded(true);
  }, [pkg.slug, navigate]);

  function copy(value: string, key: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      alert("File too large. Please keep it under 10 MB.");
      return;
    }
    setFile(f);
    setUploaded(false);
  }

  function submitReceipt() {
    if (!file || !booking) return;
    setUploading(true);
    // Simulate upload; store filename in booking.
    setTimeout(() => {
      const updated = { ...booking, receiptName: file.name };
      saveBooking(updated);
      setBooking(updated);
      setUploaded(true);
      setUploading(false);
    }, 900);
  }

  if (!booking) return null;

  const rows: Array<{ label: string; value: string; key: string; copyable?: boolean }> = [
    { label: "Bank name", value: studio.bankName, key: "bank" },
    { label: "Account name", value: studio.accountName, key: "name" },
    { label: "Account number", value: studio.accountNumber, key: "acct", copyable: true },
    { label: "Amount due", value: pkg.price, key: "amount", copyable: true },
    { label: "Booking reference", value: booking.reference, key: "ref", copyable: true },
  ];

  return (
    <SiteLayout>
      <section className="max-w-6xl mx-auto px-6 lg:px-10 pt-8 pb-6 animate-fade-in">
        <BookingSteps current={3} />
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-8 md:py-12 animate-fade-in">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Complete payment</p>
        <h1 className="font-display text-4xl md:text-5xl leading-tight">
          Secure your <span className="text-gradient-gold italic">session</span>
        </h1>
        <div className="gold-divider w-24 mt-6" />
        <p className="mt-6 text-muted-foreground max-w-xl">
          Transfer the amount below to our studio account, then upload your payment receipt. Your booking is only confirmed after the payment has been verified.
        </p>

        {/* Payment card */}
        <div className="mt-10 border border-primary/30 bg-gradient-dark shadow-elegant p-8 md:p-10">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Payment details</p>
              <h3 className="font-display text-2xl mt-2">{pkg.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(booking.date)} · {booking.time}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Total</p>
              <p className="text-gradient-gold font-display text-3xl mt-1">{pkg.price}</p>
            </div>
          </div>

          <dl className="divide-y divide-border/40 border-t border-border/40">
            {rows.map((r) => (
              <div key={r.key} className="flex items-center justify-between gap-4 py-4">
                <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{r.label}</dt>
                <dd className="flex items-center gap-3">
                  <span className={cn("text-sm md:text-base", r.key === "ref" && "text-primary tracking-wider")}>{r.value}</span>
                  {r.copyable && (
                    <button
                      type="button"
                      onClick={() => copy(r.value, r.key)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Copy ${r.label}`}
                    >
                      {copied === r.key ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex items-start gap-3 border border-primary/20 bg-primary/5 p-4">
            <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your booking is only confirmed after we verify your payment. Please use your booking reference{" "}
              <span className="text-primary">{booking.reference}</span> as the transfer description.
            </p>
          </div>
        </div>

        {/* Receipt upload */}
        <div className="mt-10 border border-border/60 bg-card/40 p-8 md:p-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Step 4</p>
          <h3 className="font-display text-2xl mt-2">Upload payment receipt</h3>
          <p className="text-xs text-muted-foreground mt-2">Accepted: image or PDF · Max 10 MB</p>

          <label
            htmlFor="receipt"
            className="mt-6 flex flex-col items-center justify-center gap-3 border border-dashed border-border/60 hover:border-primary/60 transition-colors p-10 cursor-pointer text-center"
          >
            <Upload size={24} className="text-primary" />
            <span className="text-sm">{file ? file.name : "Click to choose a file or drag & drop"}</span>
            <span className="text-xs text-muted-foreground">
              {file ? `${(file.size / 1024).toFixed(0)} KB` : "PNG, JPG, or PDF"}
            </span>
            <input
              id="receipt"
              ref={fileRef}
              type="file"
              accept="image/*,application/pdf"
              className="sr-only"
              onChange={handleFile}
            />
          </label>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={submitReceipt}
              disabled={!file || uploading || uploaded}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-gold text-primary-foreground text-xs uppercase tracking-[0.3em] shadow-gold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading…" : uploaded ? "Receipt uploaded" : "Submit Receipt"}
              {!uploading && !uploaded && <Upload size={16} />}
              {uploaded && <Check size={16} />}
            </button>

            {uploaded && (
              <button
                type="button"
                onClick={() => navigate({ to: "/book/$slug/confirm", params: { slug: pkg.slug } })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-primary/60 text-primary text-xs uppercase tracking-[0.3em] hover:bg-primary/10 transition-all animate-fade-in"
              >
                Continue <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/book/$slug"
            params={{ slug: pkg.slug }}
            className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
          >
            ← Edit booking details
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}