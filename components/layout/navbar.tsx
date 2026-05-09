import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./language-switcher";
import { Watch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center mx-auto px-4 sm:px-8">
        <div className="flex flex-1 items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Watch className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-lg tracking-tight">
              WatchWorld
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/catalog"
              className="transition-colors hover:text-primary text-foreground/80"
            >
              {t("catalog")}
            </Link>
            <Link
              href="/brands"
              className="transition-colors hover:text-primary text-foreground/80"
            >
              {t("brands")}
            </Link>
            <Link
              href="/guides"
              className="transition-colors hover:text-primary text-foreground/80"
            >
              {t("guides")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-end gap-4 flex-1">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search goes here */}
          </div>
          <nav className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="outline" className="hidden sm:flex border-primary/20 text-primary hover:bg-primary/10">
              {t("signIn")}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
