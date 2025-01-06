import { Category } from "./category";

export interface ShoppingList {
  guidId: string;
  name: string;
  categories: Category[];
}
