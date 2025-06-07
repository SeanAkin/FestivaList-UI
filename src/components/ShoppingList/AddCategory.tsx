import { useState } from "react";
import { 
    Button, 
    TextField, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
    Box 
} from "@mui/material";
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
        <Dialog 
            open={open} 
            onClose={onClose} 
            fullWidth={true} 
            maxWidth="sm" 
            closeAfterTransition={false}
            PaperProps={{
                sx: {
                    backgroundColor: '#1E1E1E',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                }
            }}
        >
            <DialogTitle sx={{ color: '#FFFFFF', fontWeight: 600 }}>Add Category</DialogTitle>
            <DialogContent>
                <Box sx={{ my: 1 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        fullWidth
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        disabled={isSaving}
                        autoComplete="off"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.12)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#E38800',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#E38800',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#E38800',
                            },
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={isSaving} sx={{ color: '#CCCCCC' }}>
                    Cancel
                </Button>
                <Button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    variant="contained"
                    sx={{
                        backgroundColor: '#E38800',
                        '&:hover': {
                            backgroundColor: '#FFA726',
                        }
                    }}
                >
                    {isSaving ? "Saving..." : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
