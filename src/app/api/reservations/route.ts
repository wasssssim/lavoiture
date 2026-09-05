import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, carBrand, carModel, carYear, prestation, date, timeSlot, notes } = body;

    if (!firstName || !phone || !email || !prestation || !date || !timeSlot) {
      return NextResponse.json({ error: "Donnees manquantes" }, { status: 400 });
    }

    const existing = await prisma.reservation.findFirst({
      where: { date, timeSlot, status: { not: "annule" } },
    });
    if (existing) {
      return NextResponse.json({ error: "Ce creneau est deja reserve" }, { status: 409 });
    }

    const reservation = await prisma.reservation.create({
      data: {
        firstName,
        lastName: lastName || "",
        email,
        phone,
        carBrand: carBrand || "",
        carModel: carModel || "",
        carYear: carYear || "",
        prestation,
        date,
        timeSlot,
        notes: notes || "",
      },
    });

    // TODO: envoyer email confirmation avec Nodemailer

    return NextResponse.json({ success: true, reservationId: reservation.id });
  } catch (error) {
    console.error("Reservation error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
