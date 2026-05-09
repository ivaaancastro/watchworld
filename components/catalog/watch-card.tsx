import { Link } from "@/i18n/routing";
import { formatPrice } from "@/lib/utils";
import { Watch } from "lucide-react";
import { Prisma } from "@prisma/client";

// Define the type we expect based on the query we'll make
type WatchCardProps = {
  watch: Prisma.WatchReferenceGetPayload<{
    include: { family: { include: { brand: true } } };
  }>;
};

export function WatchCard({ watch }: WatchCardProps) {
  return (
    <Link href={`/catalog/${watch.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        {/* Aspect ratio container for the image */}
        <div className="relative aspect-[4/5] bg-zinc-900/50 flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105">
          {/* Placeholder image (to be replaced with actual image later) */}
          <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-800/50 border border-white/5 shadow-inner">
            <Watch className="h-16 w-16 text-muted-foreground/30" />
          </div>
          
          {/* Badges / Overlay */}
          <div className="absolute top-4 left-4 flex gap-2">
            {watch.year && (
              <span className="rounded-full bg-background/80 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                {watch.year}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {watch.family.brand.name}
          </div>
          <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {watch.name}
          </h3>
          <p className="line-clamp-1 mt-1 text-sm text-muted-foreground font-mono">
            Ref. {watch.reference}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-medium text-foreground">
              {watch.retailPriceEur ? formatPrice(watch.retailPriceEur) : "N/A"}
            </div>
            {watch.caseDiameter && (
              <div className="text-xs text-muted-foreground">
                {watch.caseDiameter}mm
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
