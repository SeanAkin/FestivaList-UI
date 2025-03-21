import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Switch,
    IconButton,
    Box,
    Grid2,
} from "@mui/material";
import { Share, ShoppingBag, Add } from "@mui/icons-material";
import styles from "./ShoppingList.module.css";
import shoppingListService from "@/services/shopping-list-service";
import Category from "@/components/ShoppingList/Category";
import AddCategory from "@/components/ShoppingList/AddCategory";
import { useAppStore } from "@/store/store";

export default function ShoppingList() {
    const { shoppingList, setShoppingList, showEssentialItems, toggleShowEssentialItems } = useAppStore();
    const { id } = useParams();
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

    useEffect(() => {
        if (id) {
            shoppingListService.getShoppingListById(id).then(setShoppingList);
        }
    }, [id, setShoppingList]);

    const itemCount = shoppingList
        ? shoppingList.categories.flatMap(category => category.items).filter(item => !showEssentialItems || item.essential).length
        : 0;

    return shoppingList !== null ? (
        <Container maxWidth="xl" className={styles.container}>
            <Card className={styles.headerCard}>
                <CardHeader
                    title={
                        <Typography variant="h5" className={styles.title}>
                            {shoppingList.name}
                        </Typography>
                    }
                    action={
                        <IconButton aria-label="share" className={styles.iconButton}>
                            <Share />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={1}>
                            <ShoppingBag color="primary" className={styles.icon} />
                            <Typography variant="body2" className={styles.text}>
                                {itemCount} items
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" className={styles.text}>
                                Show essential only
                            </Typography>
                            <Switch checked={showEssentialItems} onChange={toggleShowEssentialItems} color="primary" />
                            <IconButton
                                aria-label="add"
                                className={styles.iconButton}
                                onClick={() => setIsAddCategoryOpen(true)}
                            >
                                <Add />
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Grid2 container spacing={3}>
                {shoppingList.categories.map((category) => (
                    <Grid2 key={category.categoryId} size={{ xs: 12 }}>
                        <Category category={category} />
                    </Grid2>
                ))}
            </Grid2>

            <AddCategory open={isAddCategoryOpen} onClose={() => setIsAddCategoryOpen(false)} />
        </Container>
    ) : (
        "Bath too small..."
    );
}
