import { db } from "./src/shared/lib/db";

async function createTestData() {
  try {
    // Create root category (Computers & Laptops)
    const pcCategory = await db.category.create({
      data: {
        name: "PC & Laptops",
        url: "pc-laptops",
        iconUrl: "/icons/pc.svg",
        iconSize: [24, 24]
      }
    });

    // Create subcategories
    const computerCategory = await db.category.create({
      data: {
        name: "Computer",
        url: "computer",
        parentID: pcCategory.id,
        iconUrl: "/icons/computer.svg",
        iconSize: [24, 24]
      }
    });

    const laptopCategory = await db.category.create({
      data: {
        name: "Laptop",
        url: "laptops",
        parentID: pcCategory.id,
        iconUrl: "/icons/laptop.svg",
        iconSize: [24, 24]
      }
    });

    // Create a brand
    const brand = await db.brand.create({
      data: {
        name: "Test Brand"
      }
    });

    // Create a test product in the computer category
    await db.product.create({
      data: {
        name: "Test Computer",
        isAvailable: true,
        desc: "A test computer description",
        specialFeatures: ["Feature 1", "Feature 2"],
        images: ["computer1.jpg", "computer2.jpg"],
        categoryID: computerCategory.id,
        price: 999.99,
        salePrice: 899.99,
        brandID: brand.id,
        specs: [
          {
            specGroupID: "1",
            specValues: ["Value 1", "Value 2"]
          }
        ]
      }
    });

    // Create a test product in the laptop category
    await db.product.create({
      data: {
        name: "Test Laptop",
        isAvailable: true,
        desc: "A test laptop description",
        specialFeatures: ["Feature 1", "Feature 2"],
        images: ["laptop1.jpg", "laptop2.jpg"],
        categoryID: laptopCategory.id,
        price: 1299.99,
        salePrice: 1199.99,
        brandID: brand.id,
        specs: [
          {
            specGroupID: "1",
            specValues: ["Value 1", "Value 2"]
          }
        ]
      }
    });

    console.log("Test data created successfully");
  } catch (error) {
    console.error("Error creating test data:", error);
  } finally {
    await db.$disconnect();
  }
}

createTestData();