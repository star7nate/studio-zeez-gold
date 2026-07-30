import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { getPackage } from "@/lib/booking";

export const Route = createFileRoute("/book/$slug")({
  loader: ({ params }) => {
    const pkg = getPackage(params.slug);
    if (!pkg) throw notFound();
    return { slug: pkg.slug };
  },
  component: BookLayout,
});

function BookLayout() {
  return <Outlet />;
}
