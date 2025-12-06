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
  href: string;
}

export interface CartItem extends Product {
  cartId: string; // Unique ID for cart item (product ID + size)
  quantity: number;
  selectedSize: string;
}