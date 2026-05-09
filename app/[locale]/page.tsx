import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { WatchCard } from "@/components/catalog/watch-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default async function HomePage() {
  const t = await getTranslations("home");

  // Fetch the latest/featured watches for the home page
  const featuredWatches = await prisma.watchReference.findMany({
    take: 8,
    orderBy: {
      year: "desc",
    },
    include: {
      family: {
        include: {
          brand: true,
        },
      },
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
  });

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pb-48">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
              <Link href="/catalog">{t("hero.cta")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base font-semibold border-border hover:bg-accent">
              <Link href="/guides">{t("hero.ctaGuides")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Watches Grid */}
      <section className="container mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">{t("trending")}</h2>
          <Button variant="ghost" asChild>
            <Link href="/catalog">Ver todo el catálogo &rarr;</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredWatches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </section>
    </div>
  );
}
