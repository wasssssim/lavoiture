import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "asc" },
  });
  return NextResponse.json(reservations);
}

export async function PUT(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id, status } = await req.json();
  const reservation = await prisma.reservation.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(reservation);
}
