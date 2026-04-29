import { Link } from "@tanstack/react-router";
import { Camera, Mail, Phone } from "lucide-react";

const currentYear = 2026;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-card/40 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl">
            <span className="text-gradient-gold">Studio</span> Zeez
          </h3>
          <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
            Crafting timeless imagery in gold and shadow. Available worldwide for editorial, brand,
            and private commissions.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail size={14} className="text-primary" /><span>Studiozeez@gmail.com</span></li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-primary" /><span>+2348131117298</span></li>
            <li className="flex items-center gap-2"><Camera size={14} className="text-primary" /><span>@studio_zeez</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {currentYear} Studio Zeez. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Light · Shadow · Gold</p>
        </div>
      </div>
    </footer>
  );
}
