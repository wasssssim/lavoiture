import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Date requise" }, { status: 400 });
  }

  const settings = await prisma.settings.findMany();
  const get = (key: string, def: string) =>
    settings.find((s) => s.key === key)?.value ?? def;

  const openHour = parseInt(get("opening_hour", "9"));
  const closeHour = parseInt(get("closing_hour", "18"));
  const slotDuration = parseInt(get("slot_duration", "60"));
  const workingDays = get("working_days", "0,1,2,3,4,5")
    .split(",")
    .map(Number);

  const dayOfWeek = new Date(date).getDay();
  if (!workingDays.includes(dayOfWeek)) {
    return NextResponse.json({ slots: [], closed: true });
  }

  const reservations = await prisma.reservation.findMany({
    where: { date, status: { not: "annule" } },
    select: { timeSlot: true },
  });
  const takenSlots = new Set(reservations.map((r) => r.timeSlot));

  const slots = [];
  for (let h = openHour; h < closeHour; h++) {
    for (let m = 0; m < 60; m += slotDuration) {
      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      slots.push({ time, available: !takenSlots.has(time) });
    }
  }

  return NextResponse.json({ slots, closed: false });
}
