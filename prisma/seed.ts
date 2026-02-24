import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const STATIC_PAGES = [
  {
    slug: "home",
    pageName: "home",
    title: "Taxi in Paris - Book Your Ride",
    secureBooking: "<p>Secure online booking system for your peace of mind.</p>",
    reliableService:
      "<p>Professional and reliable taxi service across Paris.</p>",
    customerService: "<p>24/7 customer support for all your needs.</p>",
    fairPrice: "<p>Transparent and competitive pricing with no hidden fees.</p>",
    metaTitle: "Book Paris Taxi Service at Cheapest Fare | Taxis in Paris",
    metaDescription:
      "Book reliable and affordable taxi services in Paris with professional drivers.",
    metaKeywords: "paris taxi, book taxi paris, taxi service paris",
    status: "active",
  },
  {
    slug: "about",
    pageName: "about",
    title: "About Us - Taxi in Paris",
    content: "<p>Taxi in Paris is your best choice for reliable transportation.</p>",
    metaTitle: "About Taxi in Paris",
    metaDescription: "Learn about our Paris taxi service.",
    metaKeywords: "about taxi paris, paris taxi company",
    status: "active",
  },
  {
    slug: "services",
    pageName: "services",
    title: "Our Services - Taxi in Paris",
    content: "<p>Explore our range of professional taxi services in Paris.</p>",
    metaTitle: "Taxi Services in Paris",
    metaDescription: "Explore our range of taxi services in Paris.",
    metaKeywords: "paris taxi services, airport transfer paris",
    status: "active",
  },
  {
    slug: "terms",
    pageName: "terms",
    title: "Terms & Conditions - Taxi in Paris",
    content: "<p>Please read our terms and conditions carefully.</p>",
    metaTitle: "Terms & Conditions | Taxi in Paris",
    metaDescription: "Read our terms and conditions for taxi services.",
    metaKeywords: "terms conditions taxi paris",
    status: "active",
  },
];

async function main() {
  console.log("Seeding static pages...");

  for (const page of STATIC_PAGES) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {}, // Don't overwrite existing admin edits
      create: page,
    });
    console.log(`  ✓ ${page.slug}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
