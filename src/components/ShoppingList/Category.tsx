import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
} from "@mui/material";
import { Add, DeleteOutline, Inventory2Outlined } from "@mui/icons-material";
import { Category as CategoryType } from "@/types/category";
import { useAppStore } from "@/store/store";
import MessageState from "@/components/common/MessageState";
import Item from "./Item";
import AddItem from "./AddItem";
import styles from "./Category.module.css";

interface CategoryProps {
    category: CategoryType;
}

export default function Category({ category }: CategoryProps) {
    const essentialsOnly = useAppStore((state) => state.essentialsOnly);
    const removeCategory = useAppStore((state) => state.removeCategory);

    const [isAddItemOpen, setIsAddItemOpen] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const visibleItems = essentialsOnly ? category.items.filter((item) => item.essential) : category.items;
    const essentialCount = category.items.filter((item) => item.essential).length;

    const handleDelete = async () => {
        setIsDeleting(true);
        const success = await removeCategory(category.categoryId);
        if (!success) setIsDeleting(false);
        setIsConfirmingDelete(false);
    };

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <div className={styles.heading}>
                    <h2 className={styles.title}>{category.name}</h2>
                    <p className={styles.count}>
                        {category.items.length} {category.items.length === 1 ? "item" : "items"}
                        {essentialCount > 0 && <span className={styles.countAccent}> · {essentialCount} essential</span>}
                    </p>
                </div>

                <div className={styles.actions}>
                    <Tooltip title="Add item">
                        <IconButton
                            size="small"
                            onClick={() => setIsAddItemOpen(true)}
                            aria-label={`Add an item to ${category.name}`}
                        >
                            <Add fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete category">
                        <IconButton
                            size="small"
                            onClick={() => setIsConfirmingDelete(true)}
                            className={styles.delete}
                            aria-label={`Delete the ${category.name} category`}
                        >
                            <DeleteOutline fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            </header>

            {visibleItems.length > 0 ? (
                <ul className={styles.items}>
                    {visibleItems.map((item) => (
                        <Item key={item.itemId} item={item} categoryId={category.categoryId} />
                    ))}
                </ul>
            ) : (
                <MessageState
                    icon={<Inventory2Outlined fontSize="small" />}
                    title={category.items.length > 0 ? "Nothing essential here" : "Empty so far"}
                    description={
                        category.items.length > 0
                            ? "This category has items, but none are marked essential."
                            : "Add the first thing that belongs in this category."
                    }
                    action={
                        category.items.length === 0 ? (
                            <Button size="small" variant="outlined" onClick={() => setIsAddItemOpen(true)}>
                                Add an item
                            </Button>
                        ) : undefined
                    }
                />
            )}

            <AddItem
                open={isAddItemOpen}
                onClose={() => setIsAddItemOpen(false)}
                categoryId={category.categoryId}
                categoryName={category.name}
            />

            <Dialog open={isConfirmingDelete} onClose={() => setIsConfirmingDelete(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Delete {category.name}?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {category.items.length > 0
                            ? `This removes the category and its ${category.items.length} ${
                                  category.items.length === 1 ? "item" : "items"
                              }. It can't be undone.`
                            : "This can't be undone."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsConfirmingDelete(false)} disabled={isDeleting}>
                        Keep it
                    </Button>
                    <Button onClick={handleDelete} disabled={isDeleting} color="error" variant="contained">
                        {isDeleting ? "Deleting" : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </article>
    );
}
