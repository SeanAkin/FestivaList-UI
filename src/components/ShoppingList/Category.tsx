import { useState } from "react";
import { Card, CardHeader, CardContent, Typography, IconButton, Tooltip, Grid2 } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Category as CategoryType } from "@/types/category";
import Item from "./Item";
import AddItem from "./AddItem";
import styles from "./Category.module.css";
import { useAppStore } from "@/store/store";

interface CategoryProps {
    category: CategoryType;
}

export default function Category({ category }: CategoryProps) {
    const { showEssentialItems } = useAppStore();
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);

    const filteredItems = showEssentialItems
        ? category.items.filter((item) => item.essential)
        : category.items;

    return (
        <Card className={styles.card} elevation={0} sx={{ width: '100%' }}>
            <CardHeader
                className={styles.header}
                title={
                    <Typography variant="h6" className={styles.title}>
                        {category.name}
                    </Typography>
                }
                action={
                    <Tooltip title="Add item">
                        <IconButton
                            aria-label="add item"
                            onClick={() => setIsAddItemOpen(true)}
                            className={styles.iconButton}
                            size="small"
                        >
                            <Add />
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent className={styles.content}>
                <Grid2 container spacing={2}>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <Grid2 key={item.itemId} size={12}>
                                <Item item={item} />
                            </Grid2>
                        ))
                    ) : (
                        <Grid2 size={12}>
                            <Typography variant="body2" className={styles.typography}>
                                {category.items.length > 0 && showEssentialItems
                                ? "No essential items in this category."
                                : "No items in this category."}
                            </Typography>
                        </Grid2>
                    )}
                </Grid2>
            </CardContent>
            <AddItem
                open={isAddItemOpen}
                onClose={() => setIsAddItemOpen(false)}
                categoryId={category.categoryId}
            />
        </Card>
    );
}
