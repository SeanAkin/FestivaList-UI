import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import shoppingListService from "@/services/shopping-list-service";
import { useAppStore } from "@/store/store";

interface AddCategoryProps {
    open: boolean;
    onClose: () => void;
}

export default function AddCategory({ open, onClose }: AddCategoryProps) {
    const [categoryName, setCategoryName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const { shoppingList, setShoppingList } = useAppStore();

    const handleSave = async () => {
        if (!categoryName.trim() || !shoppingList) return;

        setIsSaving(true);
        const newCategory = await shoppingListService.addCategory(shoppingList.shoppingListId, { name: categoryName.trim() });
        setIsSaving(false);

        if (newCategory) {
            setShoppingList({
                ...shoppingList,
                categories: [...shoppingList.categories, newCategory],
            });
            setCategoryName("");
            onClose();
        } else {
            console.error("Failed to add category");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm" closeAfterTransition={false}>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Category Name"
                    fullWidth
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    disabled={isSaving}
                    autoComplete="off"
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
