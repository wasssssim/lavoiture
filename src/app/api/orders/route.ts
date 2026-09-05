import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer } = body;

    if (!items?.length || !customer?.firstName || !customer?.phone || !customer?.email) {
      return NextResponse.json({ error: "Donnees manquantes" }, { status: 400 });
    }

    const total = items.reduce(
      (sum: number, i: { productId: string; price: number; quantity: number }) =>
        sum + i.price * i.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        carBrand: customer.carBrand,
        carModel: customer.carModel,
        carYear: customer.carYear || "",
        notes: customer.notes || "",
        total,
        items: {
          create: items.map(
            (i: { productId: string; price: number; quantity: number }) => ({
              productId: i.productId,
              quantity: i.quantity,
              price: i.price,
            })
          ),
        },
      },
      include: { items: { include: { product: true } } },
    });

    // TODO: envoyer email recap avec Nodemailer

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
