import { ShoppingList } from "../types/shoppingList";
import { Category } from "../types/category";
import { Item } from "../types/item";

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

const addItem = async (categoryId: string, newItem: { name: string; url: string; essential: boolean }): Promise<Item | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newItem,
        categoryId,
      }),
    });

    if (!response.ok) throw new Error("Failed to add item");

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
};

const deleteItem = async (itemId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/item/${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete item");

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
};

export default {
  getShoppingListById,
  addCategory,
  addItem,
  deleteItem,
};
