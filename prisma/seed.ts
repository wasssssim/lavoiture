import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { products } from "../src/lib/products";

const prisma = new PrismaClient();

async function main() {
  // Create admin
  const hash = await bcryptjs.hash("admin123", 12);
  await prisma.admin.upsert({
    where: { email: "admin@lavoiture.dz" },
    update: {},
    create: {
      email: "admin@lavoiture.dz",
      password: hash,
      name: "Admin LAVOITURE",
    },
  });
  console.log("Admin cree : admin@lavoiture.dz / admin123");

  // Seed products
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.id },
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        image: p.image,
        active: p.inStock,
      },
      create: {
        slug: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        image: p.image,
        stock: p.category.startsWith("produit") || p.category === "accessoire" ? 50 : -1,
        active: p.inStock,
      },
    });
  }
  console.log(`${products.length} produits inseres`);

  // Default settings
  const defaults = [
    { key: "opening_hour", value: "9" },
    { key: "closing_hour", value: "18" },
    { key: "slot_duration", value: "60" },
    { key: "working_days", value: "0,1,2,3,4,5" }, // dim=6, sam=5
  ];
  for (const s of defaults) {
    await prisma.settings.upsert({
      where: { key: s.key },
      update: {},
      create: { id: s.key, key: s.key, value: s.value },
    });
  }
  console.log("Parametres par defaut inseres");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
