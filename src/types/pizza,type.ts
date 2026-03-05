
export interface Pizza {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  types: number[]; 
  sizes: number[]; 
  category: number;
  rating: number;
}

export interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
}