import { ShoppingList } from "../types/shoppingList";
import { Category } from "../types/category";

const mockShoppingLists: ShoppingList[] = [
  {
    guidId: "123e4567-e89b-12d3-a456-426614174000",
    name: "Coachella 2024 Shopping List",
    categories: [
      {
        categoryId: "1",
        name: "Camping Gear",
        items: [
          { itemId: "1", name: "Tent", url: "https://example.com/tent", essential: true },
          { itemId: "2", name: "Very Very Very Very Very Very Lon Sleeping Bag", url: "https://example.com/sleeping-bag", essential: true },
          { itemId: "3", name: "Very Very Very Very Very Very Long Camping Chair", url: "https://example.com/chair", essential: false },
          { itemId: "5", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "6", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "7", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "8", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "9", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "10", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "11", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "12", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "13", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "14", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "15", name: "Big Chair", url: "https://example.com/chair", essential: false },
          { itemId: "16", name: "Big Chair", url: "https://example.com/chair", essential: false },
        ],
      },
      {
        categoryId: "2",
        name: "Clothing",
        items: [
          { itemId: "4", name: "Sunhat", url: "https://example.com/sunhat", essential: true },
          { itemId: "5", name: "Sunglasses", url: "https://example.com/sunglasses", essential: true },
          { itemId: "6", name: "Festival Outfit", url: "https://example.com/outfit", essential: false },
        ],
      },
      {
        categoryId: "3",
        name: "Food & Drinks",
        items: [
          { itemId: "7", name: "Water Bottle", url: "https://example.com/water-bottle", essential: true },
          { itemId: "8", name: "Snacks", url: "https://example.com/snacks", essential: false },
          { itemId: "9", name: "Cooler", url: "https://example.com/cooler", essential: true },
        ],
      },
    ],
  },
  {
    guidId: "987e6543-a21b-34d5-c789-567890123456",
    name: "One Item + Category Test",
    categories: [
      {
        categoryId: "1",
        name: "Essentials",
        items: [
          { itemId: "1", name: "Sunscreen", url: "https://example.com/sunscreen", essential: true }
        ],
      },
    ],
  },
  {
    guidId: "7d54e77e-e457-4bc0-9222-5d52beda65dd",
    name: "No Items + Not Category",
    categories: [ ],
  },
];

const getShoppingListById = (id: string): Promise<ShoppingList | null> => {
  return Promise.resolve(mockShoppingLists.find(list => list.guidId === id) || null);
};

const addCategory = (listId: string, newCategory: Category): Promise<boolean> => {
  const shoppingList = mockShoppingLists.find(list => list.guidId === listId);

  if (!shoppingList) {
    return Promise.resolve(false);
  }

  shoppingList.categories.push(newCategory);
  return Promise.resolve(true);
};

export default {
  getShoppingListById,
  addCategory,
};
