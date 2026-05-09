import { Link } from "@/i18n/routing";
import { formatPrice } from "@/lib/utils";
import { Watch } from "lucide-react";
import { Prisma } from "@prisma/client";
import { CldImage } from "next-cloudinary";

// Define the type we expect based on the query we'll make
type WatchCardProps = {
  watch: Prisma.WatchReferenceGetPayload<{
    include: { 
      family: { include: { brand: true } };
      images: true; 
    };
  }>;
};

export function WatchCard({ watch }: WatchCardProps) {
  const primaryImage = watch.images && watch.images.length > 0 ? watch.images[0].url : null;

  return (
    <Link href={`/catalog/${watch.slug}`} className="group block h-full">
      <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Aspect ratio container for the image */}
        <div className="relative aspect-[4/3] bg-secondary/30 flex items-center justify-center p-8 transition-colors group-hover:bg-secondary/50">
          {primaryImage ? (
            <CldImage
              src={primaryImage}
              alt={watch.name}
              fill
              className="object-contain p-4 mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Watch className="h-16 w-16 text-muted-foreground/40 transition-transform duration-500 group-hover:scale-110" strokeWidth={1} />
          )}
          
          {/* Badges / Overlay */}
          <div className="absolute top-4 left-4 flex gap-2">
            {watch.year && (
              <span className="rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold text-foreground uppercase tracking-wider backdrop-blur-md shadow-sm">
                {watch.year}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {watch.family.brand.name}
          </div>
          <h3 className="line-clamp-2 text-base font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
            {watch.name}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground font-mono">
            Ref. {watch.reference}
          </p>
          
          <div className="mt-auto pt-6 flex items-center justify-between">
            <div className="text-base font-semibold text-foreground">
              {watch.retailPriceEur ? formatPrice(watch.retailPriceEur) : "N/A"}
            </div>
            {watch.caseDiameter && (
              <div className="text-xs font-medium text-muted-foreground">
                {watch.caseDiameter}mm
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
