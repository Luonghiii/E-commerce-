import { Product, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Shop', href: '#new-drops' },
  { label: 'Collections', href: '#collections' },
  { label: 'About', href: '#about' },
  { label: 'Sale', href: '#sale' },
];

export const CATEGORIES = ['All', 'Hoodies', 'T-Shirts', 'Bottoms', 'Outerwear', 'Accessories', 'Footwear', 'Tops'];

const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];
const SHOE_SIZES = ['39', '40', '41', '42', '43'];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Oversized Cyber Hoodie",
    price: 1250000,
    category: "Hoodies",
    image: "https://picsum.photos/800/1000?random=1",
    isNew: true,
    sizes: DEFAULT_SIZES,
    description: "Hoodie form rộng phong cách Cyberpunk. Chất liệu nỉ bông cao cấp 100% Cotton, in họa tiết phản quang."
  },
  {
    id: 2,
    name: "Urban Cargo Pants",
    price: 950000,
    category: "Bottoms",
    image: "https://picsum.photos/800/1000?random=2",
    isNew: true,
    sizes: ['29', '30', '31', '32'],
    description: "Quần Cargo đa túi tiện lợi, vải Kaki co giãn nhẹ, phù hợp cho các hoạt động ngoài trời."
  },
  {
    id: 3,
    name: "Minimalist Boxy Tee",
    price: 450000,
    category: "T-Shirts",
    image: "https://picsum.photos/800/1000?random=3",
    sizes: DEFAULT_SIZES,
    description: "Áo thun phom Boxy hiện đại, cổ bo dày dặn. Minimalist style dễ phối đồ."
  },
  {
    id: 4,
    name: "Techwear Vest",
    price: 890000,
    category: "Outerwear",
    image: "https://picsum.photos/800/1000?random=4",
    sizes: ['M', 'L'],
    description: "Áo Vest phong cách Techwear với nhiều ngăn túi utility, khóa zip chống nước."
  },
  {
    id: 5,
    name: "Distressed Denim Jacket",
    price: 1550000,
    category: "Outerwear",
    image: "https://picsum.photos/800/1000?random=5",
    sizes: DEFAULT_SIZES,
    description: "Áo khoác Denim wash rách bụi bặm, form classic fit."
  },
  {
    id: 6,
    name: "Essential Cap",
    price: 320000,
    category: "Accessories",
    image: "https://picsum.photos/800/1000?random=6",
    sizes: ['One Size'],
    description: "Nón lưỡi trai basic thêu logo nổi, khóa kim loại điều chỉnh phía sau."
  },
  {
    id: 7,
    name: "Graphic Print Sweater",
    price: 780000,
    category: "Tops",
    image: "https://picsum.photos/800/1000?random=7",
    isNew: true,
    sizes: DEFAULT_SIZES,
    description: "Áo len dệt kim in hình graphic nghệ thuật, chất len mềm không gây ngứa."
  },
  {
    id: 8,
    name: "Chunky Sneakers V2",
    price: 2100000,
    category: "Footwear",
    image: "https://picsum.photos/800/1000?random=8",
    sizes: SHOE_SIZES,
    description: "Giày sneaker đế chunky hack chiều cao, phối màu retro cực cháy."
  },
  {
    id: 9,
    name: "Basic White Tee",
    price: 350000,
    category: "T-Shirts",
    image: "https://picsum.photos/800/1000?random=9",
    sizes: DEFAULT_SIZES,
    description: "Áo thun trắng trơn basic, chất liệu cotton 2 chiều mát mẻ."
  },
  {
    id: 10,
    name: "Black Jogger Pants",
    price: 650000,
    category: "Bottoms",
    image: "https://picsum.photos/800/1000?random=10",
    sizes: ['M', 'L', 'XL'],
    description: "Quần Jogger nỉ đen, bo gấu, phong cách thể thao năng động."
  }
];