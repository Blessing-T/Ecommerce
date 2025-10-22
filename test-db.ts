import { db } from "./src/shared/lib/db";

async function testConnection() {
  try {
    const brand = await db.brand.create({
      data: {
        name: "Test Brand"
      }
    });
    console.log("Successfully created brand:", brand);

    const brands = await db.brand.findMany();
    console.log("All brands:", brands);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await db.$disconnect();
  }
}

testConnection();