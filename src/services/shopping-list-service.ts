import { ShoppingList } from "../types/shoppingList";
import { Category } from "../types/category";

const API_BASE_URL = "https://seanofthe.dev/festival-shopping-api";

// TODO: Clean this up and add error handling
const getShoppingListById = async (id: string): Promise<ShoppingList | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shopping-list/${id}`);
    if (!response.ok) throw new Error("Failed to fetch shopping list");
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching shopping list:", error);
    return null;
  }
};

const addCategory = async (listId: string, newCategory: { name: string }): Promise<Category | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${listId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });

    if (!response.ok) throw new Error("Failed to add category");

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
};

export default {
  getShoppingListById,
  addCategory,
};
