import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { ScrollProgress } from "./ScrollProgress";
import { CursorSpotlight } from "./CursorSpotlight";
import { useInViewReveal } from "@/hooks/useInViewReveal";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  useInViewReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <CursorSpotlight />
      <SiteNav />
      <main className="pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
