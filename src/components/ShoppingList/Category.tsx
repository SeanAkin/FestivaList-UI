import { Card, CardHeader, CardContent, Typography, Grid2 } from "@mui/material";
import { Category as CategoryType } from "@/types/category";
import Item from "./Item";
import styles from "./Category.module.css";
import { useAppStore } from "@/store/store";

interface CategoryProps {
    category: CategoryType;
}

export default function Category({ category }: CategoryProps) {
    const { showEssentialItems } = useAppStore();

    const filteredItems = showEssentialItems
        ? category.items.filter((item) => item.essential)
        : category.items;

    return (
        <Card className={styles.card}>
            <CardHeader
                className={styles.header}
                title={
                    <Typography variant="h6" className={styles.title}>
                        {category.name}
                    </Typography>
                }
            />
            <CardContent className={styles.content}>
                <Grid2 container spacing={3}>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <Grid2 key={item.itemId} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Item item={item} />
                            </Grid2>
                        ))
                    ) : (
                        <Typography variant="body2" className={styles.typography}>
                            {category.items.length > 0 && showEssentialItems
                                ? "No essential items in this category."
                                : "No items in this category."}
                        </Typography>
                    )}
                </Grid2>
            </CardContent>
        </Card>
    );
}
