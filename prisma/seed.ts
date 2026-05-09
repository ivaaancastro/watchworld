import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const DATABASE_URL = "postgresql://neondb_owner:npg_Pzva9ImcAS0y@ep-gentle-mode-abndtcju.eu-west-2.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // ── COMPLICATIONS ──────────────────────────────
  const complications = await Promise.all([
    prisma.complication.upsert({ where: { slug: "chronograph" }, update: {}, create: { nameEs: "Cronógrafo", nameEn: "Chronograph", slug: "chronograph" } }),
    prisma.complication.upsert({ where: { slug: "tourbillon" }, update: {}, create: { nameEs: "Tourbillón", nameEn: "Tourbillon", slug: "tourbillon" } }),
    prisma.complication.upsert({ where: { slug: "perpetual-calendar" }, update: {}, create: { nameEs: "Calendario perpetuo", nameEn: "Perpetual Calendar", slug: "perpetual-calendar" } }),
    prisma.complication.upsert({ where: { slug: "gmt" }, update: {}, create: { nameEs: "GMT / Doble huso", nameEn: "GMT / Dual Time", slug: "gmt" } }),
    prisma.complication.upsert({ where: { slug: "date" }, update: {}, create: { nameEs: "Fecha", nameEn: "Date", slug: "date" } }),
    prisma.complication.upsert({ where: { slug: "moonphase" }, update: {}, create: { nameEs: "Fase lunar", nameEn: "Moon Phase", slug: "moonphase" } }),
    prisma.complication.upsert({ where: { slug: "power-reserve" }, update: {}, create: { nameEs: "Indicador de reserva", nameEn: "Power Reserve Indicator", slug: "power-reserve" } }),
    prisma.complication.upsert({ where: { slug: "minute-repeater" }, update: {}, create: { nameEs: "Repetición de minutos", nameEn: "Minute Repeater", slug: "minute-repeater" } }),
  ]);
  console.log(`✅ ${complications.length} complications`);

  // ── ROLEX ──────────────────────────────────────
  const rolex = await prisma.brand.upsert({
    where: { slug: "rolex" }, update: {},
    create: {
      name: "Rolex", slug: "rolex", country: "Switzerland", foundedYear: 1905, isFeatured: true,
      description: { es: "La marca de relojes de lujo más reconocida del mundo.", en: "The world's most recognized luxury watch brand." },
      websiteUrl: "https://www.rolex.com",
      calibres: { create: [
        { name: "Cal. 3235", type: "AUTOMATIC", frequency: 28800, powerReserve: 70, jewels: 31, cosc: true, certified: "Superlative Chronometer", features: ["stop-seconds", "rapid-set date"] },
        { name: "Cal. 3285", type: "AUTOMATIC", frequency: 28800, powerReserve: 70, jewels: 33, cosc: true, certified: "Superlative Chronometer", features: ["stop-seconds", "gmt", "rapid-set date"] },
      ]},
    },
    include: { calibres: true },
  });
  const rolexCal3235 = rolex.calibres.find(c => c.name === "Cal. 3235")!;
  const rolexCal3285 = rolex.calibres.find(c => c.name === "Cal. 3285")!;

  const subFamily = await prisma.watchFamily.upsert({ where: { slug: "rolex-submariner" }, update: {}, create: { brandId: rolex.id, name: "Submariner", slug: "rolex-submariner", description: { es: "El reloj de buceo por excelencia.", en: "The quintessential diving watch." } } });
  const gmtFamily = await prisma.watchFamily.upsert({ where: { slug: "rolex-gmt-master-ii" }, update: {}, create: { brandId: rolex.id, name: "GMT-Master II", slug: "rolex-gmt-master-ii", description: { es: "El reloj de los viajeros.", en: "The traveller's watch." } } });

  await prisma.watchReference.upsert({
    where: { slug: "rolex-submariner-126610ln" }, update: {},
    create: {
      familyId: subFamily.id, calibreId: rolexCal3235.id, reference: "126610LN",
      name: "Submariner Date", slug: "rolex-submariner-126610ln", year: 2020, movementType: "AUTOMATIC",
      retailPriceEur: 9450, retailPriceUsd: 10200, caseDiameter: 41, caseThickness: 12.5, lugWidth: 20,
      caseMaterial: "Oystersteel", bezelMaterial: "Ceramic", crystalType: "Sapphire", waterResistance: 300,
      dialColor: "Black", strapMaterial: "Oystersteel", claspType: "Oysterlock",
      description: { es: "El Submariner Date con esfera negra y bisel de cerámica negra.", en: "The Submariner Date with black dial and black ceramic bezel." },
      complications: { connect: [{ slug: "date" }] },
    },
  });

  await prisma.watchReference.upsert({
    where: { slug: "rolex-gmt-master-ii-126710blnr" }, update: {},
    create: {
      familyId: gmtFamily.id, calibreId: rolexCal3285.id, reference: "126710BLNR",
      name: "GMT-Master II \"Batman\"", slug: "rolex-gmt-master-ii-126710blnr", year: 2019, movementType: "AUTOMATIC",
      retailPriceEur: 10400, retailPriceUsd: 11200, caseDiameter: 40, caseMaterial: "Oystersteel",
      bezelMaterial: "Ceramic", crystalType: "Sapphire", waterResistance: 100,
      dialColor: "Black", strapMaterial: "Jubilee Oystersteel",
      description: { es: "El GMT-Master II apodado \"Batman\" con bisel azul/negro.", en: "The GMT-Master II nicknamed \"Batman\" with blue/black ceramic bezel." },
      complications: { connect: [{ slug: "gmt" }, { slug: "date" }] },
    },
  });
  console.log("✅ Rolex");

  // ── OMEGA ──────────────────────────────────────
  const omega = await prisma.brand.upsert({
    where: { slug: "omega" }, update: {},
    create: {
      name: "Omega", slug: "omega", country: "Switzerland", foundedYear: 1848, isFeatured: true,
      description: { es: "El primer reloj en la Luna y cronometrador oficial de los JJ.OO.", en: "The first watch on the Moon and official Olympic Games timekeeper." },
      websiteUrl: "https://www.omegawatches.com",
      calibres: { create: [
        { name: "Cal. 8900", type: "AUTOMATIC", frequency: 25200, powerReserve: 60, jewels: 39, cosc: true, certified: "Master Chronometer", features: ["co-axial", "anti-magnetic"] },
        { name: "Cal. 3861", type: "MANUAL", frequency: 21600, powerReserve: 50, jewels: 33, cosc: true, certified: "Master Chronometer", features: ["chronograph", "anti-magnetic"] },
      ]},
    },
    include: { calibres: true },
  });
  const omegaCal8900 = omega.calibres.find(c => c.name === "Cal. 8900")!;
  const omegaCal3861 = omega.calibres.find(c => c.name === "Cal. 3861")!;

  const smFamily = await prisma.watchFamily.upsert({ where: { slug: "omega-seamaster-professional" }, update: {}, create: { brandId: omega.id, name: "Seamaster Professional 300M", slug: "omega-seamaster-professional", description: { es: "El reloj de James Bond.", en: "James Bond's watch." } } });
  const speedFamily = await prisma.watchFamily.upsert({ where: { slug: "omega-speedmaster" }, update: {}, create: { brandId: omega.id, name: "Speedmaster", slug: "omega-speedmaster", description: { es: "El reloj que fue a la Luna.", en: "The watch that went to the Moon." } } });

  await prisma.watchReference.upsert({
    where: { slug: "omega-seamaster-210-30-42-20-03-001" }, update: {},
    create: {
      familyId: smFamily.id, calibreId: omegaCal8900.id, reference: "210.30.42.20.03.001",
      name: "Seamaster Professional 300M", slug: "omega-seamaster-210-30-42-20-03-001", year: 2018, movementType: "AUTOMATIC",
      retailPriceEur: 5100, retailPriceUsd: 5500, caseDiameter: 42, caseMaterial: "Stainless Steel",
      bezelMaterial: "Ceramic", crystalType: "Sapphire", waterResistance: 300,
      dialColor: "Blue", strapMaterial: "Stainless Steel",
      description: { es: "El Seamaster 300M con esfera azul y bisel de cerámica.", en: "The Seamaster 300M with blue dial and ceramic bezel." },
      complications: { connect: [{ slug: "date" }] },
    },
  });

  await prisma.watchReference.upsert({
    where: { slug: "omega-speedmaster-310-30-42-50-01-001" }, update: {},
    create: {
      familyId: speedFamily.id, calibreId: omegaCal3861.id, reference: "310.30.42.50.01.001",
      name: "Speedmaster Moonwatch Professional", slug: "omega-speedmaster-310-30-42-50-01-001", year: 2021, movementType: "MANUAL",
      retailPriceEur: 6400, retailPriceUsd: 6900, caseDiameter: 42, caseMaterial: "Stainless Steel",
      crystalType: "Hesalite (acrylic)", waterResistance: 50,
      dialColor: "Black", strapMaterial: "Nylon NATO",
      description: { es: "El Moonwatch. El reloj que pisó la Luna en 1969.", en: "The Moonwatch. The watch that landed on the Moon in 1969." },
      complications: { connect: [{ slug: "chronograph" }] },
    },
  });
  console.log("✅ Omega");

  // ── TUDOR ──────────────────────────────────────
  const tudor = await prisma.brand.upsert({
    where: { slug: "tudor" }, update: {},
    create: {
      name: "Tudor", slug: "tudor", country: "Switzerland", foundedYear: 1926, isFeatured: true,
      description: { es: "La marca hermana de Rolex con valor inmejorable.", en: "Rolex's sister brand with unbeatable value." },
      websiteUrl: "https://www.tudorwatch.com",
      calibres: { create: [{ name: "MT5402", type: "AUTOMATIC", frequency: 28800, powerReserve: 70, jewels: 26, cosc: true, features: ["silicon hairspring"] }] },
    },
    include: { calibres: true },
  });

  const bbFamily = await prisma.watchFamily.upsert({ where: { slug: "tudor-black-bay" }, update: {}, create: { brandId: tudor.id, name: "Black Bay", slug: "tudor-black-bay", description: { es: "El reloj de buceo icónico de Tudor.", en: "Tudor's iconic diving watch." } } });

  await prisma.watchReference.upsert({
    where: { slug: "tudor-black-bay-58-m79030n" }, update: {},
    create: {
      familyId: bbFamily.id, calibreId: tudor.calibres[0].id, reference: "M79030N-0001",
      name: "Black Bay 58", slug: "tudor-black-bay-58-m79030n", year: 2018, movementType: "AUTOMATIC",
      retailPriceEur: 3210, retailPriceUsd: 3500, caseDiameter: 39, caseThickness: 11.9, lugWidth: 20,
      caseMaterial: "Stainless Steel", bezelMaterial: "Aluminum", crystalType: "Sapphire", waterResistance: 200,
      dialColor: "Black", strapMaterial: "Leather + Fabric NATO",
      description: { es: "El BB58 negro, compacto y elegante.", en: "The black BB58, compact and elegant." },
      complications: { connect: [{ slug: "date" }] },
    },
  });
  console.log("✅ Tudor");

  // ── TAG HEUER ──────────────────────────────────
  const tag = await prisma.brand.upsert({
    where: { slug: "tag-heuer" }, update: {},
    create: {
      name: "TAG Heuer", slug: "tag-heuer", country: "Switzerland", foundedYear: 1860, isFeatured: true,
      description: { es: "Pioneros en cronógrafos de precisión y relojes deportivos de lujo.", en: "Pioneers in precision chronographs and luxury sports watches." },
      websiteUrl: "https://www.tagheuer.com",
      calibres: { create: [{ name: "Cal. Heuer 02", type: "AUTOMATIC", frequency: 28800, powerReserve: 80, jewels: 26, features: ["chronograph", "column wheel"] }] },
    },
    include: { calibres: true },
  });

  const carreraFamily = await prisma.watchFamily.upsert({ where: { slug: "tag-heuer-carrera" }, update: {}, create: { brandId: tag.id, name: "Carrera", slug: "tag-heuer-carrera", description: { es: "El cronógrafo inspirado en la carrera Panamericana.", en: "The chronograph inspired by the Carrera Panamericana race." } } });

  await prisma.watchReference.upsert({
    where: { slug: "tag-heuer-carrera-cbk2110" }, update: {},
    create: {
      familyId: carreraFamily.id, calibreId: tag.calibres[0].id, reference: "CBK2110.BA0715",
      name: "Carrera Chronograph 42mm", slug: "tag-heuer-carrera-cbk2110", year: 2019, movementType: "AUTOMATIC",
      retailPriceEur: 5450, retailPriceUsd: 5900, caseDiameter: 42, caseMaterial: "Stainless Steel",
      crystalType: "Sapphire", waterResistance: 100, dialColor: "Black", strapMaterial: "Leather",
      description: { es: "Carrera cronógrafo con calibre in-house Heuer 02.", en: "Carrera chronograph with in-house Heuer 02 calibre." },
      complications: { connect: [{ slug: "chronograph" }, { slug: "date" }] },
    },
  });
  console.log("✅ TAG Heuer");

  // ── SEIKO ──────────────────────────────────────
  const seiko = await prisma.brand.upsert({
    where: { slug: "seiko" }, update: {},
    create: {
      name: "Seiko", slug: "seiko", country: "Japan", foundedYear: 1881, isFeatured: true,
      description: { es: "El gigante japonés que democratizó la relojería de calidad.", en: "The Japanese giant that democratized quality watchmaking." },
      websiteUrl: "https://www.seikowatches.com",
      calibres: { create: [{ name: "4R36", type: "AUTOMATIC", frequency: 21600, powerReserve: 41, jewels: 24, features: ["hack", "hand-wind"] }] },
    },
    include: { calibres: true },
  });

  const sports5Family = await prisma.watchFamily.upsert({ where: { slug: "seiko-5-sports" }, update: {}, create: { brandId: seiko.id, name: "5 Sports", slug: "seiko-5-sports", description: { es: "La línea automática más asequible del mercado.", en: "The most affordable automatic lineup on the market." } } });

  await prisma.watchReference.upsert({
    where: { slug: "seiko-5-sports-srpd51k1" }, update: {},
    create: {
      familyId: sports5Family.id, calibreId: seiko.calibres[0].id, reference: "SRPD51K1",
      name: "5 Sports Automatic 40mm Blue", slug: "seiko-5-sports-srpd51k1", year: 2019, movementType: "AUTOMATIC",
      retailPriceEur: 279, retailPriceUsd: 299, caseDiameter: 40, caseMaterial: "Stainless Steel",
      crystalType: "Hardlex mineral", waterResistance: 100, dialColor: "Blue", strapMaterial: "Stainless Steel",
      description: { es: "El Seiko 5 Sports más popular, con esfera azul.", en: "The most popular Seiko 5 Sports, with blue dial." },
      complications: { connect: [{ slug: "date" }] },
    },
  });
  console.log("✅ Seiko");

  // ── CASIO ──────────────────────────────────────
  const casio = await prisma.brand.upsert({
    where: { slug: "casio" }, update: {},
    create: {
      name: "Casio", slug: "casio", country: "Japan", foundedYear: 1946, isFeatured: false,
      description: { es: "Icono japonés conocido por durabilidad y tecnología accesible.", en: "Japanese icon known for durability and accessible technology." },
      websiteUrl: "https://www.casio.com",
      calibres: { create: [{ name: "Module 3495", type: "SOLAR", features: ["solar charging", "atomic timekeeping", "world time"] }] },
    },
    include: { calibres: true },
  });

  const gShockFamily = await prisma.watchFamily.upsert({ where: { slug: "casio-g-shock" }, update: {}, create: { brandId: casio.id, name: "G-Shock", slug: "casio-g-shock", description: { es: "El reloj indestructible.", en: "The indestructible watch." } } });

  await prisma.watchReference.upsert({
    where: { slug: "casio-g-shock-gw-m5610" }, update: {},
    create: {
      familyId: gShockFamily.id, reference: "GW-M5610U-1CJF",
      name: "G-Shock Square Solar Atomic", slug: "casio-g-shock-gw-m5610", year: 2021, movementType: "SOLAR",
      retailPriceEur: 119, retailPriceUsd: 130, caseDiameter: 43.2, caseMaterial: "Resin",
      crystalType: "Mineral", waterResistance: 200, dialColor: "Black",
      description: { es: "El G-Shock cuadrado clásico con carga solar y sincronización atómica.", en: "The classic square G-Shock with solar charging and atomic sync." },
    },
  });
  console.log("✅ Casio");

  console.log("\n✨ Seed completed!");
  console.log("   Brands: 6 | Families: 8 | References: 9 | Calibres: 9 | Complications: 8");
}

main()
  .catch(e => { console.error("❌ Seed error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
