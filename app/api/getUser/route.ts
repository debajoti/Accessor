import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const currentUserEmail = searchParams.get("email");

    if (!role || !currentUserEmail) {
      return NextResponse.json(
        { message: "Role or email not provided" },
        { status: 400 }
      );
    }

    let users;
    if (role === "ADMIN") {
      users = await db.user.findMany({
        where: {
          email: {
            not: currentUserEmail,
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          permissions: true,
          status: true,
        },
      });
    } else if (role === "USER") {
      users = await db.user.findMany({
        where: {
          role: "USER",
          email: {
            not: currentUserEmail,
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          permissions : true,
          status: true,
        },
      });
    } else {
      return NextResponse.json(
        { message: "Invalid role provided" },
        { status: 400 }
      );
    }

    if (!users || users.length === 0) {
      return NextResponse.json(
        { message: "No users found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/posts/GET: ", error);
    return NextResponse.json(
      { message: "Something went wrong in /api/posts/GET" },
      { status: 500 }
    );
  }
}
