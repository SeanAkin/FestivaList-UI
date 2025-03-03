import { create } from "zustand";
import { ShoppingList } from "../types/shoppingList";

interface AppState {
    shoppingList: ShoppingList | null;
    showEssentialItems: boolean;
    setShoppingList: (list: ShoppingList | null) => void;
    toggleShowEssentialItems: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    shoppingList: null,
    showEssentialItems: false,
    setShoppingList: (list) => set({ shoppingList: list }),
    toggleShowEssentialItems: () => set((state) => ({ showEssentialItems: !state.showEssentialItems })),
}))