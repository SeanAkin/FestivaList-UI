import { Category } from "./category";

export interface ShoppingList {
  shoppingListId: string;
  name: string;
  categories: Category[];
}
