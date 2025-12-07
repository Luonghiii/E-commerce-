
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  description?: string;
  sizes?: string[];
}

export interface NavItem {
  label: string;
  id: string;   // ID used for document.getElementById
  path: string; // Clean path for URL (e.g., /shop)
}

export interface CartItem extends Product {
  cartId: string; // Unique ID for cart item (product ID + size)
  quantity: number;
  selectedSize: string;
}
