import mongoose, { type Model, Schema } from "mongoose";
import type { Product } from "@/types/product";

const ProductSchema = new Schema<Product>({
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  company: {
    type: String,
  },
  category: {
    type: String,
  },
  item_name: { type: String },
  original_price: { type: Number },
  current_price: { type: Number },
  discount_percentage: { type: Number },
  return_period: { type: Number },
  delivery_date: { type: String },
  rating: {
    stars: { type: Number },
    count: { type: Number },
  },
});

// `mongoose.models` is untyped, so retain the model's `Product` generic when
// reusing the cached model during development.
const ProductModel: Model<Product> =
  (mongoose.models.Products as Model<Product> | undefined) ??
  mongoose.model<Product>("Products", ProductSchema);
export default ProductModel;
