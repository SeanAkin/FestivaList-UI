import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch } from "@mui/material";
import shoppingListService from "@/services/shopping-list-service";
import { useAppStore } from "@/store/store";

interface AddItemProps {
    open: boolean;
    onClose: () => void;
    categoryId: string;
}

export default function AddItem({ open, onClose, categoryId }: AddItemProps) {
    const [itemName, setItemName] = useState("");
    const [itemUrl, setItemUrl] = useState("");
    const [isEssential, setIsEssential] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { shoppingList, setShoppingList } = useAppStore();

    const handleSave = async () => {
        if (!itemName.trim() || !shoppingList) return;

        setIsSaving(true);
        const newItem = await shoppingListService.addItem(categoryId, {
            name: itemName.trim(),
            url: itemUrl.trim(),
            essential: isEssential,
        });
        setIsSaving(false);

        if (newItem) {
            setShoppingList({
                ...shoppingList,
                categories: shoppingList.categories.map(category =>
                    category.categoryId === categoryId
                        ? { ...category, items: [...category.items, newItem] }
                        : category
                ),
            });
            setItemName("");
            setItemUrl("");
            setIsEssential(false);
            onClose();
        } else {
            console.error("Failed to add item");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm" closeAfterTransition={false}>
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Item Name"
                    fullWidth
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    disabled={isSaving}
                    autoComplete="off"
                />
                <TextField
                    margin="dense"
                    label="URL (optional)"
                    fullWidth
                    value={itemUrl}
                    onChange={(e) => setItemUrl(e.target.value)}
                    disabled={isSaving}
                    autoComplete="off"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={isEssential}
                            onChange={(e) => setIsEssential(e.target.checked)}
                            disabled={isSaving}
                        />
                    }
                    label="Essential Item"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={isSaving}>
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
} 