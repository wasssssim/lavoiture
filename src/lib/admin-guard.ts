import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }
  return null;
}
