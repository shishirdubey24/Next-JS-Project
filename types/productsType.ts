export interface Product {
  id: string;

  image?: string | null;
  company?: string | null;
  category?: string | null;
  item_name?: string | null;

  original_price?: number | null;
  current_price?: number | null;
  discount_percentage?: number | null;

  return_period?: number | null;
  delivery_date?: string | null;

  rating?: {
    stars?: number | null;
    count?: number | null;
  } | null;
}

export interface ProductCardProps {
  item: Product;
}

export interface BagButtonProps {
  itemId: Product["id"];
}

export interface CategoryPageProps {
  params: Promise<{ name: string }>;
}
