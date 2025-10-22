import { db } from "./src/shared/lib/db";

async function setupNavigation() {
  try {
    // Create parent categories
    const pcLaptops = await db.category.create({
      data: {
        name: "PC & Laptops",
        url: "pc-laptops",
        iconUrl: "/icons/pc-laptop.svg",
        iconSize: [24, 24],
        parentID: null
      }
    });

    const smartphones = await db.category.create({
      data: {
        name: "Smartphones",
        url: "smartphones",
        iconUrl: "/icons/smartphone.svg",
        iconSize: [24, 24],
        parentID: null
      }
    });
    
    await db.category.create({
      data: {
        name: "TVs",
        url: "tvs",
        iconUrl: "/icons/tv.svg",
        iconSize: [24, 24],
        parentID: null
      }
    });

    await db.category.create({
      data: {
        name: "Gaming",
        url: "video-games",
        iconUrl: "/icons/gaming.svg",
        iconSize: [24, 24],
        parentID: null
      }
    });

    const photography = await db.category.create({
      data: {
        name: "Photography",
        url: "photography",
        iconUrl: "/icons/camera.svg",
        iconSize: [24, 24],
        parentID: null
      }
    });

    await db.category.create({
      data: {
        name: "Tablets",
        url: "tablets",
        iconUrl: "/icons/tablet.svg",
        iconSize: [24, 24],
        parentID: null
      }
    });

    await db.category.create({
      data: {
        name: "Watches",
        url: "watches",
        iconUrl: "/icons/watch.svg",
        iconSize: [24, 24],
        parentID: null
      }
    });

   
    await db.category.create({
      data: {
        name: "Computer",
        url: "computer",
        iconUrl: "/icons/computer.svg",
        iconSize: [24, 24],
        parentID: pcLaptops.id
      }
    });

    await db.category.create({
      data: {
        name: "Laptop",
        url: "laptops",
        iconUrl: "/icons/laptop.svg",
        iconSize: [24, 24],
        parentID: pcLaptops.id
      }
    });

    await db.category.create({
      data: {
        name: "Cameras",
        url: "cameras",
        iconUrl: "/icons/camera.svg",
        iconSize: [24, 24],
        parentID: photography.id
      }
    });

    await db.category.create({
      data: {
        name: "Mobile Phones",
        url: "mobile-phones",
        iconUrl: "/icons/mobile-phone.svg",
        iconSize: [24, 24],
        parentID: smartphones.id
      }
    });

    console.log("Navigation categories created successfully!");
  } catch (error) {
    console.error("Error creating navigation categories:", error);
  } finally {
    await db.$disconnect();
  }
}

setupNavigation();