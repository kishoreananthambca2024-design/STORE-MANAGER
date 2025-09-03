export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description: string;
  sales: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  total: number;
  date: string;
}

export interface StoreState {
  products: Product[];
  cart: CartItem[];
  sales: Sale[];
  totalRevenue: number;
}