import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data } = body;

    if (!data) {
      return new NextResponse("No image data provided", { status: 400 });
    }

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(data, {
      folder: "bitex",
    });

    return NextResponse.json({
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return new NextResponse("Error uploading image", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { publicId } = body;

    if (!publicId) {
      return new NextResponse("No public ID provided", { status: 400 });
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return new NextResponse("Image deleted successfully", { status: 200 });
    } else {
      throw new Error("Failed to delete image");
    }
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return new NextResponse("Error deleting image", { status: 500 });
  }
}