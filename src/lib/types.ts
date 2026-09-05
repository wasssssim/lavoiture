export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  inStock: boolean;
}

export type Category =
  | "soin"
  | "protection"
  | "interieur"
  | "pack"
  | "produit-ext"
  | "produit-int"
  | "accessoire";

export const categoryLabels: Record<Category, string> = {
  soin: "Prestations Carrosserie",
  protection: "Prestations Protection",
  interieur: "Prestations Interieur",
  pack: "Packs",
  "produit-ext": "Produits Exterieur",
  "produit-int": "Produits Interieur",
  accessoire: "Accessoires",
};

export const CURRENCY = "DA";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  notes: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: OrderInfo;
  total: number;
  createdAt: string;
}
