import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const settings = await prisma.settings.findMany();
  const obj: Record<string, string> = {};
  settings.forEach((s) => (obj[s.key] = s.value));
  return NextResponse.json(obj);
}

export async function PUT(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json();
  for (const [key, value] of Object.entries(body)) {
    await prisma.settings.upsert({
      where: { key },
      update: { value: String(value) },
      create: { id: key, key, value: String(value) },
    });
  }
  return NextResponse.json({ success: true });
}
