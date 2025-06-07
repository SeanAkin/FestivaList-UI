import { useState } from "react";
import { 
    Button, 
    TextField, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    FormControlLabel, 
    Switch,
    Box
} from "@mui/material";
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

    const textFieldSx = {
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
            <DialogTitle sx={{ color: '#FFFFFF', fontWeight: 600 }}>Add Item</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        autoFocus
                        label="Item Name"
                        fullWidth
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        disabled={isSaving}
                        autoComplete="off"
                        sx={textFieldSx}
                    />
                    <TextField
                        label="URL (optional)"
                        fullWidth
                        value={itemUrl}
                        onChange={(e) => setItemUrl(e.target.value)}
                        disabled={isSaving}
                        autoComplete="off"
                        sx={textFieldSx}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isEssential}
                                onChange={(e) => setIsEssential(e.target.checked)}
                                disabled={isSaving}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#E38800',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#E38800',
                                    },
                                }}
                            />
                        }
                        label="Essential Item"
                        sx={{ color: '#CCCCCC' }}
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