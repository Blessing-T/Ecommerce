import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { db } from "@/shared/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with CUSTOMER role
    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
        role: "CUSTOMER",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[REGISTER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}