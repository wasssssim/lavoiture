import { CartProvider } from "@/context/CartContext";
import ShopNavbar from "@/components/shop/ShopNavbar";

export const metadata = {
  title: "Boutique — LAVOITURE",
  description:
    "Reservez vos prestations de detailing automobile en ligne. Polissage, ceramique, PPF, nettoyage interieur.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <ShopNavbar />
      <main className="min-h-dvh pt-16 bg-gradient-to-b from-[#050a14] via-[#080f1e] to-[#050a14]">
        {children}
      </main>
    </CartProvider>
  );
}
