import { create } from "zustand";
import { ShoppingList } from "../types/shoppingList";
import shoppingListService from "@/services/shopping-list-service";

export type ListStatus = "idle" | "loading" | "ready" | "not-found" | "error";

interface AppState {
    shoppingList: ShoppingList | null;
    status: ListStatus;
    requestedId: string | null;
    essentialsOnly: boolean;

    loadShoppingList: (id: string) => Promise<void>;
    setEssentialsOnly: (essentialsOnly: boolean) => void;

    addCategory: (name: string) => Promise<boolean>;
    removeCategory: (categoryId: string) => Promise<boolean>;
    addItem: (categoryId: string, item: { name: string; url: string; essential: boolean }) => Promise<boolean>;
    removeItem: (categoryId: string, itemId: string) => Promise<boolean>;
}

export const useAppStore = create<AppState>((set, get) => ({
    shoppingList: null,
    status: "idle",
    requestedId: null,
    essentialsOnly: false,

    loadShoppingList: async (id) => {
        set({ status: "loading", requestedId: id, shoppingList: null });

        const result = await shoppingListService.getShoppingListById(id);

        const supersededByNewerRequest = get().requestedId !== id;
        if (supersededByNewerRequest) return;

        if (result.status === "ok") {
            set({ shoppingList: result.list, status: "ready" });
        } else {
            set({ shoppingList: null, status: result.status });
        }
    },

    setEssentialsOnly: (essentialsOnly) => set({ essentialsOnly }),

    addCategory: async (name) => {
        const { shoppingList } = get();
        if (!shoppingList) return false;

        const newCategory = await shoppingListService.addCategory(shoppingList.shoppingListId, { name });
        if (!newCategory) return false;

        set((state) =>
            state.shoppingList
                ? { shoppingList: { ...state.shoppingList, categories: [...state.shoppingList.categories, newCategory] } }
                : state
        );
        return true;
    },

    removeCategory: async (categoryId) => {
        const success = await shoppingListService.deleteCategory(categoryId);
        if (!success) return false;

        set((state) =>
            state.shoppingList
                ? {
                      shoppingList: {
                          ...state.shoppingList,
                          categories: state.shoppingList.categories.filter((c) => c.categoryId !== categoryId),
                      },
                  }
                : state
        );
        return true;
    },

    addItem: async (categoryId, item) => {
        const newItem = await shoppingListService.addItem(categoryId, item);
        if (!newItem) return false;

        set((state) =>
            state.shoppingList
                ? {
                      shoppingList: {
                          ...state.shoppingList,
                          categories: state.shoppingList.categories.map((category) =>
                              category.categoryId === categoryId
                                  ? { ...category, items: [...category.items, newItem] }
                                  : category
                          ),
                      },
                  }
                : state
        );
        return true;
    },

    removeItem: async (categoryId, itemId) => {
        const success = await shoppingListService.deleteItem(itemId);
        if (!success) return false;

        set((state) =>
            state.shoppingList
                ? {
                      shoppingList: {
                          ...state.shoppingList,
                          categories: state.shoppingList.categories.map((category) =>
                              category.categoryId === categoryId
                                  ? { ...category, items: category.items.filter((i) => i.itemId !== itemId) }
                                  : category
                          ),
                      },
                  }
                : state
        );
        return true;
    },
}))
