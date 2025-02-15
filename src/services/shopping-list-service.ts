import { ShoppingList } from "../types/shoppingList";

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
    name: "Beach Trip Shopping List",
    categories: [
      {
        categoryId: "1",
        name: "Essentials",
        items: [
          { itemId: "1", name: "Sunscreen", url: "https://example.com/sunscreen", essential: true },
          { itemId: "2", name: "Towel", url: "https://example.com/towel", essential: true },
        ],
      },
    ],
  },
];

const getShoppingListById = (id: string): Promise<ShoppingList | null> => {
  return Promise.resolve(mockShoppingLists.find(list => list.guidId === id) || null);
};

export default {
  getShoppingListById,
};
