import { prisma } from "@/lib/db";
import { ImageUploader } from "@/components/admin/image-uploader";
import { CldImage } from "next-cloudinary";

export default async function AdminWatchesPage() {
  // Fetch all watches, ordered by brand and reference
  const watches = await prisma.watchReference.findMany({
    include: {
      family: {
        include: { brand: true },
      },
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
    orderBy: [
      { family: { brand: { name: "asc" } } },
      { name: "asc" },
    ],
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 border-b border-border/40 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Administración de Relojes</h1>
        <p className="text-muted-foreground mt-2">Sube las fotos reales a Cloudinary para cada modelo.</p>
        
        <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
          <p className="text-sm text-foreground/80 font-medium">
            ⚠️ <strong>Importante:</strong> Asegúrate de tener configurado un <code className="bg-background px-1 py-0.5 rounded">Upload Preset</code> "Unsigned" en Cloudinary llamado <code>watchworld_preset</code>.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {watches.map((watch) => (
          <div 
            key={watch.id} 
            className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/40 hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-center gap-6">
              {/* Image Preview */}
              <div className="relative h-16 w-16 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden border border-border/50">
                {watch.images.length > 0 ? (
                  <CldImage
                    src={watch.images[0].url}
                    alt={watch.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground/60 text-center px-1 leading-tight">Sin Foto</span>
                )}
              </div>

              {/* Watch Info */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  {watch.family.brand.name}
                </div>
                <h3 className="font-semibold text-foreground text-lg leading-none">
                  {watch.name}
                </h3>
                <p className="text-sm text-muted-foreground font-mono mt-1">
                  Ref. {watch.reference}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pl-4">
              <ImageUploader watchId={watch.id} watchName={`${watch.family.brand.name} ${watch.name}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
