import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

  if (!id || !email) {
    return NextResponse.json(
        { message: "Missing required fields: id or email" },
        { status: 400 }
      );
  }
  try {
    const response = await db.user.delete({
        where: { email },
    })
    if(!response) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
