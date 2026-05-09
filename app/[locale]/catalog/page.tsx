import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { WatchCard } from "@/components/catalog/watch-card";
import { FiltersSidebar } from "@/components/catalog/filters-sidebar";
import { Prisma } from "@prisma/client";

// In Next.js 15, searchParams is an asynchronous promise
type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CatalogPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("catalog");
  const resolvedParams = await searchParams;

  // Extract params
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : undefined;
  const minPrice = typeof resolvedParams.minPrice === "string" ? Number(resolvedParams.minPrice) : undefined;
  const maxPrice = typeof resolvedParams.maxPrice === "string" ? Number(resolvedParams.maxPrice) : undefined;
  
  const brandsFilter = typeof resolvedParams.brands === "string" ? resolvedParams.brands.split(",") : [];
  const complicationsFilter = typeof resolvedParams.complications === "string" ? resolvedParams.complications.split(",") : [];

  // Build Prisma Where Clause dynamically
  const whereClause: Prisma.WatchReferenceWhereInput = {};

  if (q) {
    whereClause.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { reference: { contains: q, mode: "insensitive" } },
      { family: { name: { contains: q, mode: "insensitive" } } },
      { family: { brand: { name: { contains: q, mode: "insensitive" } } } },
    ];
  }

  if (brandsFilter.length > 0) {
    whereClause.family = {
      brand: {
        slug: { in: brandsFilter },
      },
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    whereClause.retailPriceEur = {};
    if (minPrice !== undefined && !isNaN(minPrice)) whereClause.retailPriceEur.gte = minPrice;
    if (maxPrice !== undefined && !isNaN(maxPrice)) whereClause.retailPriceEur.lte = maxPrice;
  }

  if (complicationsFilter.length > 0) {
    whereClause.complications = {
      some: {
        slug: { in: complicationsFilter },
      },
    };
  }

  // Fetch data in parallel
  const [watches, allBrands, allComplications] = await Promise.all([
    prisma.watchReference.findMany({
      where: whereClause,
      include: {
        family: {
          include: { brand: true },
        },
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
      orderBy: {
        year: "desc",
      },
    }),
    prisma.brand.findMany({
      select: { slug: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.complication.findMany({
      select: { slug: true, nameEs: true, nameEn: true },
      orderBy: locale === "es" ? { nameEs: "asc" } : { nameEn: "asc" },
    }),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10 md:py-16 flex-1">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{t("title")}</h1>
        <p className="text-lg text-muted-foreground mt-3 font-medium">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
        {/* Sidebar Filters */}
        <FiltersSidebar 
          brands={allBrands} 
          complications={allComplications} 
          currentLocale={locale} 
        />

        {/* Main Content */}
        <div className="flex-1 w-full space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-border/40">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t("resultsCount", { count: watches.length })}
            </p>
            {/* Sorting could go here */}
          </div>

          {watches.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 rounded-2xl bg-secondary/20 text-center">
              <h3 className="text-xl font-semibold text-foreground/80">{t("noResults")}</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {watches.map((watch) => (
                <WatchCard key={watch.id} watch={watch} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
