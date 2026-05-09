<div align="center">

# ⌚ WatchWorld

**La plataforma definitiva para análisis, catalogación y descubrimiento de relojes.**

Desde el primer reloj hasta la colección de ensueño — para cada amante de la relojería.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[🌐 Demo en vivo](#) · [📖 Documentación](#) · [🐛 Reportar bug](issues) · [✨ Solicitar feature](issues)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Stack tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Instalación y desarrollo local](#-instalación-y-desarrollo-local)
- [Variables de entorno](#-variables-de-entorno)
- [Estrategia de ramas (Git Flow)](#-estrategia-de-ramas-git-flow)
- [Convención de commits](#-convención-de-commits)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Roadmap](#-roadmap)
- [Licencia](#-licencia)

---

## 🎯 Sobre el proyecto

WatchWorld es una plataforma web full-stack orientada a cualquier persona con interés en la relojería: desde el curioso que está considerando su primer reloj de €200, hasta el coleccionista experimentado con una cartera de cinco cifras.

### Funcionalidades principales

| Módulo | Descripción |
|--------|-------------|
| 🗂️ **Catálogo** | +500 referencias con specs técnicas completas, filtros avanzados y búsqueda fulltext |
| 📊 **Análisis de mercado** | Histórico de precios, heatmap de marcas, tendencias del mercado secundario |
| ⚖️ **Comparador** | Comparativa visual de hasta 4 relojes en paralelo |
| 👤 **Mi Colección** | Portfolio personal con valoración en tiempo real |
| 🧠 **IA** | Recomendador personalizado e identificación de relojes por foto |
| 🎓 **Guías** | Contenido educativo para todos los niveles |
| 🌍 **Multiidioma** | Español e Inglés completos desde el inicio |

---

## 🛠️ Stack tecnológico

### Frontend
- **[Next.js 15](https://nextjs.org/)** — Framework React con App Router y RSC
- **[TypeScript 5](https://www.typescriptlang.org/)** — Tipado estático
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** — Componentes accesibles
- **[Framer Motion](https://www.framer.com/motion/)** — Animaciones premium
- **[next-intl](https://next-intl-docs.vercel.app/)** — Internacionalización (ES/EN)
- **[TanStack Query](https://tanstack.com/query)** — Server state management
- **[Zustand](https://zustand-demo.pmnd.rs/)** — Client state management
- **[Recharts](https://recharts.org/) + [D3.js](https://d3js.org/)** — Visualización de datos

### Backend
- **[Prisma ORM](https://www.prisma.io/)** — Acceso a base de datos type-safe
- **[NextAuth.js v5](https://authjs.dev/)** — Autenticación (Google OAuth)
- **[MeiliSearch](https://www.meilisearch.com/)** — Motor de búsqueda fulltext
- **[OpenAI API](https://openai.com/api/)** — GPT-4o para IA conversacional e identificación de imágenes

### Infraestructura
- **[Neon](https://neon.tech/)** — PostgreSQL serverless
- **[Upstash Redis](https://upstash.com/)** — Cache y rate limiting
- **[Cloudinary](https://cloudinary.com/)** — Gestión y CDN de imágenes
- **[Vercel](https://vercel.com/)** — Hosting y CI/CD

---

## 🏗️ Arquitectura

```
watchworld/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Routing i18n (es | en)
│   │   ├── page.tsx              # Home / Discover
│   │   ├── catalogo/             # Catálogo de relojes
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx   # Ficha detallada
│   │   ├── marcas/               # Directorio de marcas
│   │   ├── comparar/             # Comparador
│   │   ├── mercado/              # Análisis de precios
│   │   ├── mi-coleccion/         # Área privada de usuario
│   │   └── guias/                # Contenido educativo
│   └── api/                      # Route Handlers
│       ├── watches/
│       ├── brands/
│       ├── prices/
│       └── auth/
├── components/
│   ├── catalog/                  # WatchCard, WatchGrid, FilterSidebar
│   ├── watch/                    # WatchDetail, SpecTable, PriceChart
│   ├── compare/                  # CompareTable, CompareSelector
│   ├── market/                   # PriceHeatmap, MarketTrends
│   ├── user/                     # CollectionManager, WishlistButton
│   └── ui/                       # Componentes base (shadcn)
├── lib/
│   ├── db.ts                     # Prisma client
│   ├── auth.ts                   # NextAuth config
│   ├── meilisearch.ts            # Search client
│   └── utils.ts
├── messages/
│   ├── es.json                   # Traducciones ES
│   └── en.json                   # Traducciones EN
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── types/                        # TypeScript global types
```

---

## 🚀 Instalación y desarrollo local

### Prerrequisitos

- Node.js >= 20
- pnpm >= 9 (`npm install -g pnpm`)
- Docker (para MeiliSearch local)
- Cuenta en [Neon](https://neon.tech/) (free tier)

### Setup

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/watchworld.git
cd watchworld

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env.local

# 4. Levantar MeiliSearch en local
docker run -d -p 7700:7700 getmeili/meilisearch:latest

# 5. Sincronizar base de datos
pnpm db:push

# 6. Ejecutar seed de datos iniciales
pnpm db:seed

# 7. Arrancar servidor de desarrollo
pnpm dev
```

La app estará disponible en `http://localhost:3000`.

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm lint` | ESLint |
| `pnpm type-check` | TypeScript check |
| `pnpm db:push` | Sincronizar schema Prisma |
| `pnpm db:migrate` | Crear y ejecutar migración |
| `pnpm db:seed` | Poblar la base de datos |
| `pnpm db:studio` | Abrir Prisma Studio |

---

## 🔐 Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores:

```env
# Base de datos (Neon PostgreSQL)
DATABASE_URL=

# Auth (NextAuth / Auth.js)
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# MeiliSearch
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# OpenAI
OPENAI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🌿 Estrategia de ramas (Git Flow)

Este proyecto sigue una **convención Git Flow adaptada** para un equipo pequeño con foco en calidad y trazabilidad.

### Ramas principales

| Rama | Propósito | Protegida |
|------|-----------|-----------|
| `main` | Código en producción. Siempre estable y desplegado | ✅ Sí |
| `develop` | Rama de integración. Base para todas las features | ✅ Sí |

### Ramas de trabajo

| Tipo | Nomenclatura | Ejemplo | Se crea desde | Se mergea en |
|------|-------------|---------|---------------|--------------|
| **Feature** | `feat/<descripcion-corta>` | `feat/watch-catalog-filters` | `develop` | `develop` |
| **Fix** | `fix/<descripcion-corta>` | `fix/price-chart-overflow` | `develop` | `develop` |
| **Hotfix** | `hotfix/<descripcion-corta>` | `hotfix/auth-session-expired` | `main` | `main` + `develop` |
| **Release** | `release/<version>` | `release/1.2.0` | `develop` | `main` + `develop` |
| **Chore** | `chore/<descripcion-corta>` | `chore/update-dependencies` | `develop` | `develop` |
| **Docs** | `docs/<descripcion-corta>` | `docs/api-reference` | `develop` | `develop` |

### Flujo de trabajo

```
main ──────────────────────────────────────────────────► producción
  ↑                                        ↑
  │  release/1.0.0                         │  hotfix/critical-bug
  │       ↑                                │
develop ──┼────────────────────────────────┼────────────► integración
  ↑       │                                │
  │  feat/watch-catalog      fix/price-chart
  │       ↑                       ↑
  └───────┴───────────────────────┘
```

### Reglas

1. **Nunca hacer push directo a `main` o `develop`**
2. Toda feature/fix se trabaja en su propia rama
3. Los merges a `develop` se hacen mediante **Pull Request** con al menos una revisión
4. Los merges a `main` solo desde ramas `release/*` o `hotfix/*`
5. Al hacer merge, usar **squash merge** para mantener un historial limpio
6. Eliminar la rama remota tras el merge

---

## 📝 Convención de commits

Este proyecto sigue el estándar **[Conventional Commits](https://www.conventionalcommits.org/)**, compatible con **SemVer** y la generación automática de changelogs.

### Estructura

```
<tipo>(<ámbito>): <descripción corta>

[cuerpo opcional]

[pie opcional]
```

### Tipos de commit

| Tipo | Cuándo usarlo | Ejemplo |
|------|--------------|---------|
| `feat` | Nueva funcionalidad | `feat(catalog): add price range filter` |
| `fix` | Corrección de bug | `fix(auth): resolve session timeout issue` |
| `docs` | Solo documentación | `docs(readme): add environment variables section` |
| `style` | Formato, sin cambio de lógica | `style(components): fix indentation in WatchCard` |
| `refactor` | Refactorización sin fix ni feat | `refactor(db): extract price query to repository` |
| `perf` | Mejora de rendimiento | `perf(images): enable cloudinary lazy loading` |
| `test` | Añadir o corregir tests | `test(api): add watches endpoint integration tests` |
| `chore` | Mantenimiento, deps, config | `chore(deps): upgrade next to 15.3.0` |
| `ci` | Cambios en CI/CD | `ci(vercel): add preview deployment config` |
| `build` | Sistema de build | `build(prisma): add migration for price_history table` |
| `revert` | Revertir commit anterior | `revert: feat(catalog): add price range filter` |

### Ámbitos (scopes)

```
catalog, watch, compare, market, user, auth, db, 
api, i18n, ui, search, ai, docs, ci, config
```

### Reglas

- La **descripción** va en **inglés**, en **imperativo presente** y en **minúsculas**
- Máximo **72 caracteres** en la primera línea
- Si el cambio rompe compatibilidad: añadir `!` después del tipo → `feat!: redesign watch schema`
- Usar el **cuerpo** para explicar el *por qué*, no el *qué*

### Ejemplos reales

```bash
# ✅ Bien
feat(catalog): add multi-brand filter with URL persistence
fix(market): correct EUR/USD conversion in price history chart
docs(readme): add local development setup guide
chore(deps): upgrade prisma to 6.2.0
refactor(auth): move session logic to dedicated service
perf(search): add meilisearch result caching with redis

# ❌ Mal
git commit -m "fix stuff"
git commit -m "WIP"
git commit -m "cambios en el catálogo"
git commit -m "Added new feature for watches"
```

---

## 🗺️ Roadmap

### 🏁 Fase 1 — MVP
- [ ] Setup del proyecto y design system
- [ ] Catálogo con búsqueda y filtros
- [ ] Ficha detallada de reloj
- [ ] Comparador de hasta 4 relojes
- [ ] Autenticación con Google
- [ ] Colección personal y Wishlist
- [ ] i18n completo ES/EN
- [ ] Home con segmentación por presupuesto

### 🚀 Fase 2 — Análisis de Mercado
- [ ] Histórico de precios por referencia
- [ ] Market Heatmap de marcas
- [ ] Integración WatchBase DataFeed (~500 relojes)
- [ ] Calculadora de portfolio

### 🧠 Fase 3 — Inteligencia Artificial
- [ ] Recomendador personalizado con GPT-4o
- [ ] Identificación de reloj por foto
- [ ] Resúmenes automáticos de especificaciones

### 📰 Fase 4 — Editorial
- [ ] Blog / Guías en MDX
- [ ] Newsletter
- [ ] Calendario de lanzamientos (Watches & Wonders, etc.)

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver [`LICENSE`](LICENSE) para más información.

---

<div align="center">

Hecho con ❤️ y mucha pasión por la relojería

⌚ *"El tiempo es el activo más valioso que tenemos."*

</div>
