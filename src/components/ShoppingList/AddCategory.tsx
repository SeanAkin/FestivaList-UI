import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface AddCategoryProps {
    onSave: (categoryName: string) => void;
    open: boolean;
    onClose: () => void;
}

export default function AddCategory({ onSave, open, onClose }: AddCategoryProps) {
    const [categoryName, setCategoryName] = useState("");

    const handleSave = () => {
        if (categoryName.trim()) {
            onSave(categoryName.trim());
            setCategoryName("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Category Name"
                    fullWidth
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
