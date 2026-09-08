import { ShoppingList } from "../types/shoppingList";
import { Category } from "../types/category";
import { Item } from "../types/item";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://seanofthe.dev/festival-shopping-api";

export type FetchListResult =
  | { status: "ok"; list: ShoppingList }
  | { status: "not-found" }
  | { status: "error" };

export type CreateListResult =
  | { status: "ok"; shoppingListId: string }
  | { status: "rate-limited" }
  | { status: "error" };

const getShoppingListById = async (id: string): Promise<FetchListResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shopping-list/${id}`);

    if (response.status === 404) return { status: "not-found" };
    if (!response.ok) throw new Error(`Failed to fetch shopping list (${response.status})`);

    const result = await response.json();
    if (!result.success || !result.data) return { status: "not-found" };

    return { status: "ok", list: result.data as ShoppingList };
  } catch (error) {
    console.error("Error fetching shopping list:", error);
    return { status: "error" };
  }
};

const createShoppingList = async (name: string): Promise<CreateListResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/shopping-list?name=${encodeURIComponent(name)}`, {
      method: "POST",
    });

    if (response.status === 429) return { status: "rate-limited" };
    if (!response.ok) throw new Error(`Failed to create shopping list (${response.status})`);

    const result = await response.json();
    if (!result.success || !result.data) return { status: "error" };

    return { status: "ok", shoppingListId: result.data as string };
  } catch (error) {
    console.error("Error creating shopping list:", error);
    return { status: "error" };
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

const deleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete category");

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
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
  createShoppingList,
  addCategory,
  deleteCategory,
  addItem,
  deleteItem,
};
