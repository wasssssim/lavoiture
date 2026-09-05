import { Product } from "./types";

export const products: Product[] = [
  // ========== PRESTATIONS ==========

  // Soins Carrosserie
  {
    id: "polissage-standard",
    name: "Polissage Standard",
    description:
      "Elimination des micro-rayures et swirls. Restauration de l'eclat d'origine de la peinture.",
    price: 15000,
    category: "soin",
    image: "/products/polissage-standard.jpg",
    inStock: true,
  },
  {
    id: "polissage-complet",
    name: "Polissage Complet",
    description:
      "Correction complete en plusieurs passes. Traitement des rayures profondes et defauts de peinture.",
    price: 25000,
    category: "soin",
    image: "/products/polissage-complet.jpg",
    inStock: true,
  },
  {
    id: "renovation-optiques",
    name: "Renovation Optiques",
    description:
      "Restauration des phares ternis ou opaques. Retrouvez une visibilite optimale et un aspect neuf.",
    price: 5000,
    category: "soin",
    image: "/products/renovation-optiques.jpg",
    inStock: true,
  },

  // Protection
  {
    id: "ceramique-1an",
    name: "Protection Ceramique 1 an",
    description:
      "Traitement ceramique avec protection 1 an. Hydrophobie, brillance et protection UV.",
    price: 35000,
    category: "protection",
    image: "/products/ceramique-1an.jpg",
    inStock: true,
  },
  {
    id: "ceramique-3ans",
    name: "Protection Ceramique 3 ans",
    description:
      "Traitement ceramique premium longue duree. Protection optimale contre les agressions exterieures.",
    price: 60000,
    category: "protection",
    image: "/products/ceramique-3ans.jpg",
    inStock: true,
  },
  {
    id: "ppf-face-avant",
    name: "Film PPF Face Avant",
    description:
      "Film de protection transparent sur capot, pare-chocs et ailes avant. Anti-gravillon et anti-rayures.",
    price: 80000,
    category: "protection",
    image: "/products/ppf-face-avant.jpg",
    inStock: true,
  },
  {
    id: "ppf-complet",
    name: "Film PPF Complet",
    description:
      "Protection integrale du vehicule en film PPF haute performance. Garantie 5 ans.",
    price: 250000,
    category: "protection",
    image: "/products/ppf-complet.jpg",
    inStock: true,
  },

  // Interieur
  {
    id: "nettoyage-interieur",
    name: "Nettoyage Interieur Standard",
    description:
      "Aspiration, nettoyage des plastiques, vitres interieures. Desodorisation de l'habitacle.",
    price: 8000,
    category: "interieur",
    image: "/products/nettoyage-interieur.jpg",
    inStock: true,
  },
  {
    id: "nettoyage-interieur-complet",
    name: "Nettoyage Interieur Complet",
    description:
      "Shampooing sieges/moquettes, traitement cuir, nettoyage en profondeur de chaque recoin.",
    price: 18000,
    category: "interieur",
    image: "/products/nettoyage-interieur-complet.jpg",
    inStock: true,
  },
  {
    id: "traitement-cuir",
    name: "Traitement Cuir",
    description:
      "Nettoyage, nourrissage et protection du cuir. Redonne souplesse et eclat a vos sieges.",
    price: 12000,
    category: "interieur",
    image: "/products/traitement-cuir.jpg",
    inStock: true,
  },

  // Packs
  {
    id: "pack-essentiel",
    name: "Pack Essentiel",
    description:
      "Lavage exterieur premium + nettoyage interieur standard. L'entretien de base complet.",
    price: 12000,
    category: "pack",
    image: "/products/pack-essentiel.jpg",
    inStock: true,
  },
  {
    id: "pack-premium",
    name: "Pack Premium",
    description:
      "Polissage standard + ceramique 1 an + nettoyage interieur complet. La renovation complete.",
    price: 55000,
    category: "pack",
    image: "/products/pack-premium.jpg",
    inStock: true,
  },
  {
    id: "pack-ultimate",
    name: "Pack Ultimate",
    description:
      "Polissage complet + ceramique 3 ans + PPF face avant + interieur complet. Le meilleur pour votre vehicule.",
    price: 150000,
    category: "pack",
    image: "/products/pack-ultimate.jpg",
    inStock: true,
  },

  // ========== PRODUITS EXTERIEUR ==========
  {
    id: "shampoing-auto",
    name: "Shampoing Auto Premium",
    description:
      "Shampoing concentre haute mousse, pH neutre. Nettoie en profondeur sans agresser la peinture. 500ml.",
    price: 1800,
    category: "produit-ext",
    image: "/products/shampoing-auto.jpg",
    inStock: true,
  },
  {
    id: "cire-carnauba",
    name: "Cire Carnauba",
    description:
      "Cire naturelle de carnauba pour une brillance profonde et une protection durable. 200g.",
    price: 3500,
    category: "produit-ext",
    image: "/products/cire-carnauba.jpg",
    inStock: true,
  },
  {
    id: "spray-ceramique",
    name: "Spray Ceramique",
    description:
      "Protection ceramique en spray facile a appliquer. Hydrophobie instantanee et brillance miroir. 500ml.",
    price: 4500,
    category: "produit-ext",
    image: "/products/spray-ceramique.jpg",
    inStock: true,
  },
  {
    id: "clay-bar",
    name: "Barre d'Argile (Clay Bar)",
    description:
      "Decontaminant pour carrosserie. Elimine les contaminants incrustes, goudron et retombees industrielles. 200g.",
    price: 2500,
    category: "produit-ext",
    image: "/products/clay-bar.jpg",
    inStock: true,
  },
  {
    id: "polish-compound",
    name: "Polish Compound",
    description:
      "Compound de polissage pour correction des defauts de peinture. Usage professionnel. 250ml.",
    price: 3000,
    category: "produit-ext",
    image: "/products/polish-compound.jpg",
    inStock: true,
  },
  {
    id: "nettoyant-jantes",
    name: "Nettoyant Jantes",
    description:
      "Nettoyant decontaminant pour jantes. Dissout la poussiere de frein et les salissures tenaces. 750ml.",
    price: 2200,
    category: "produit-ext",
    image: "/products/nettoyant-jantes.jpg",
    inStock: true,
  },
  {
    id: "renovateur-pneus",
    name: "Renovateur Pneus",
    description:
      "Gel renovateur pour pneus et plastiques exterieurs. Aspect satin longue duree. 500ml.",
    price: 1500,
    category: "produit-ext",
    image: "/products/renovateur-pneus.jpg",
    inStock: true,
  },
  {
    id: "nettoyant-vitres",
    name: "Nettoyant Vitres Auto",
    description:
      "Nettoyant vitres sans traces. Formule anti-buee pour une visibilite parfaite. 500ml.",
    price: 1200,
    category: "produit-ext",
    image: "/products/nettoyant-vitres.jpg",
    inStock: true,
  },

  // ========== PRODUITS INTERIEUR ==========
  {
    id: "nettoyant-cuir",
    name: "Nettoyant Cuir",
    description:
      "Nettoyant doux pour cuir automobile. Elimine les salissures sans dessecher. 500ml.",
    price: 2800,
    category: "produit-int",
    image: "/products/nettoyant-cuir.jpg",
    inStock: true,
  },
  {
    id: "conditionneur-cuir",
    name: "Conditionneur Cuir",
    description:
      "Creme nourrissante pour cuir. Protege, assouplit et previent les craquelures. 250ml.",
    price: 3200,
    category: "produit-int",
    image: "/products/conditionneur-cuir.jpg",
    inStock: true,
  },
  {
    id: "nettoyant-plastiques",
    name: "Renovateur Plastiques",
    description:
      "Renovateur pour tableaux de bord et plastiques interieurs. Finition satinee anti-poussiere. 500ml.",
    price: 1800,
    category: "produit-int",
    image: "/products/nettoyant-plastiques.jpg",
    inStock: true,
  },
  {
    id: "nettoyant-tissus",
    name: "Nettoyant Tissus & Moquettes",
    description:
      "Mousse nettoyante pour sieges tissu et moquettes. Elimine les taches tenaces. 500ml.",
    price: 2000,
    category: "produit-int",
    image: "/products/nettoyant-tissus.jpg",
    inStock: true,
  },
  {
    id: "desodorisant-auto",
    name: "Desodorisant Auto",
    description:
      "Eliminateur d'odeurs professionnel. Neutralise les mauvaises odeurs sans les masquer. 200ml.",
    price: 1500,
    category: "produit-int",
    image: "/products/desodorisant-auto.jpg",
    inStock: true,
  },

  // ========== ACCESSOIRES ==========
  {
    id: "microfibre-lot3",
    name: "Microfibres Premium (lot de 3)",
    description:
      "Chiffons microfibre ultra-doux 40x40cm, 400g/m2. Lavage, sechage et finitions sans rayures.",
    price: 1500,
    category: "accessoire",
    image: "/products/microfibre-lot3.jpg",
    inStock: true,
  },
  {
    id: "microfibre-sechage",
    name: "Microfibre de Sechage XL",
    description:
      "Grande microfibre de sechage 60x90cm, ultra-absorbante. Seche votre vehicule en un passage.",
    price: 2500,
    category: "accessoire",
    image: "/products/microfibre-sechage.jpg",
    inStock: true,
  },
  {
    id: "applicateur-ceramique",
    name: "Applicateur Ceramique",
    description:
      "Bloc applicateur avec microfibre suede pour application de coating ceramique. Lot de 5.",
    price: 1200,
    category: "accessoire",
    image: "/products/applicateur-ceramique.jpg",
    inStock: true,
  },
  {
    id: "gant-lavage",
    name: "Gant de Lavage Microfibre",
    description:
      "Gant de lavage en microfibre chenille. Mousse abondante, lavage sans rayures.",
    price: 1800,
    category: "accessoire",
    image: "/products/gant-lavage.jpg",
    inStock: true,
  },
  {
    id: "kit-brosses",
    name: "Kit Brosses Detailing (5 pieces)",
    description:
      "Set de 5 brosses detailing pour jantes, grilles, joints, bouches d'aeration et interieur.",
    price: 2800,
    category: "accessoire",
    image: "/products/kit-brosses.jpg",
    inStock: true,
  },
  {
    id: "pad-polissage-lot",
    name: "Pads de Polissage (lot de 6)",
    description:
      "Jeu de 6 pads de polissage 150mm : 2 cutting, 2 polishing, 2 finishing. Compatible toutes polisseuses.",
    price: 4500,
    category: "accessoire",
    image: "/products/pad-polissage-lot.jpg",
    inStock: true,
  },
  {
    id: "seau-detailing",
    name: "Seau Detailing avec Grille",
    description:
      "Seau 20L avec grille anti-remous (grit guard). Evite de remonter les salissures sur le gant.",
    price: 3500,
    category: "accessoire",
    image: "/products/seau-detailing.jpg",
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
