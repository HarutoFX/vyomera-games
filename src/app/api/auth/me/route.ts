import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
