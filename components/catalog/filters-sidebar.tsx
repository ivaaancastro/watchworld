"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

type FilterSidebarProps = {
  brands: { slug: string; name: string }[];
  complications: { slug: string; nameEs: string; nameEn: string }[];
  currentLocale: string;
};

export function FiltersSidebar({ brands, complications, currentLocale }: FilterSidebarProps) {
  const t = useTranslations("catalog.filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a new URLSearchParams to manipulate
  const updateQueryParams = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
    router.push(pathname);
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(type === "min" ? "minPrice" : "maxPrice", value);
    } else {
      params.delete(type === "min" ? "minPrice" : "maxPrice");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Extract current active filters
  const activeBrands = searchParams.get("brands")?.split(",") || [];
  const activeComplications = searchParams.get("complications")?.split(",") || [];
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight">{t("brand")}</h3>
        {(activeBrands.length > 0 || activeComplications.length > 0 || minPrice || maxPrice) && (
          <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
            {t("clearAll")}
          </Button>
        )}
      </div>
      
      <div className="space-y-8">
        {/* BRANDS */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground/80 tracking-wide uppercase">{t("brand")}</h4>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3 pt-1">
              {brands.map((brand) => (
                <div key={brand.slug} className="flex items-center space-x-3">
                  <Checkbox
                    id={`brand-${brand.slug}`}
                    checked={activeBrands.includes(brand.slug)}
                    className="rounded-[4px]"
                    onCheckedChange={(checked) => {
                      const newBrands = checked
                        ? [...activeBrands, brand.slug]
                        : activeBrands.filter((b) => b !== brand.slug);
                      updateQueryParams("brands", newBrands);
                    }}
                  />
                  <label
                    htmlFor={`brand-${brand.slug}`}
                    className="text-sm font-medium text-foreground/90 leading-none cursor-pointer"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator className="bg-border/50" />

        {/* PRICE */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground/80 tracking-wide uppercase">{t("priceRange")}</h4>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              placeholder="Min €"
              value={minPrice}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              className="h-10 text-sm bg-secondary/30 border-none rounded-lg"
            />
            <span className="text-muted-foreground/50">-</span>
            <Input
              type="number"
              placeholder="Max €"
              value={maxPrice}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              className="h-10 text-sm bg-secondary/30 border-none rounded-lg"
            />
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* COMPLICATIONS */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground/80 tracking-wide uppercase">{t("complications")}</h4>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3 pt-1">
              {complications.map((comp) => (
                <div key={comp.slug} className="flex items-center space-x-3">
                  <Checkbox
                    id={`comp-${comp.slug}`}
                    checked={activeComplications.includes(comp.slug)}
                    className="rounded-[4px]"
                    onCheckedChange={(checked) => {
                      const newComps = checked
                        ? [...activeComplications, comp.slug]
                        : activeComplications.filter((c) => c !== comp.slug);
                      updateQueryParams("complications", newComps);
                    }}
                  />
                  <label
                    htmlFor={`comp-${comp.slug}`}
                    className="text-sm font-medium text-foreground/90 leading-none cursor-pointer"
                  >
                    {currentLocale === "es" ? comp.nameEs : comp.nameEn}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
