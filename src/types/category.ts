import { Item } from "./item";

export interface Category {
  categoryId: string;
  name: string;
  items: Item[];
}
