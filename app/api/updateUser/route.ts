import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, name, email, role, status } = data;
    let permissions = data.permissions;

    if (!id || !name || !email || !role || !status || permissions.includes("UPDATE")) {
      return NextResponse.json(
        { message: "Missing required fields: id, name, email, role, or status." },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if(role === "ADMIN") {
      permissions = ["CREATE", "READ", "UPDATE", "DELETE"];
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
        status,
        permissions: Array.isArray(permissions) ? permissions : [],
      },
    });

    return NextResponse.json(
      { message: "User updated successfully.", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
