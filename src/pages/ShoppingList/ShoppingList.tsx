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
    Divider,
    Tooltip,
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
        <Container maxWidth="xl" className={styles.container} disableGutters>
            <Card className={styles.headerCard} elevation={0}>
                <CardHeader
                    title={
                        <Typography variant="h5" className={styles.title}>
                            {shoppingList.name}
                        </Typography>
                    }
                    action={
                        <Tooltip title="Share list">
                            <IconButton aria-label="share" className={styles.iconButton}>
                                <Share />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <Divider sx={{ opacity: 0.1 }} />
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <ShoppingBag className={styles.icon} />
                            <Typography variant="body1" className={styles.text}>
                                {itemCount} items
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body2" className={styles.text}>
                                    Show essential only
                                </Typography>
                                <Switch 
                                    checked={showEssentialItems} 
                                    onChange={toggleShowEssentialItems} 
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#E38800',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#E38800',
                                        },
                                    }}
                                />
                            </Box>
                            <Tooltip title="Add new category">
                                <IconButton
                                    aria-label="add"
                                    className={`${styles.iconButton} ${styles.addButton}`}
                                    onClick={() => setIsAddCategoryOpen(true)}
                                    size="small"
                                    sx={{ 
                                        backgroundColor: '#E38800',
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            backgroundColor: '#FFA726',
                                        }
                                    }}
                                >
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Grid2 container spacing={3}>
                {shoppingList.categories.map((category) => (
                    <Grid2
                    key={category.categoryId}
                    component="div"
                    size={{ xs: 12, md: 6, lg: 4 }}
                    sx={{
                        display: 'flex',
                        width: '100%',
                    }}
                    >
                        <Box sx={{ width: '100%' }}>
                            <Category category={category} />
                        </Box>
                    </Grid2>
                ))}
            </Grid2>

            <AddCategory open={isAddCategoryOpen} onClose={() => setIsAddCategoryOpen(false)} />
        </Container>
    ) : (
        <Container className={styles.container}>
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <Typography variant="h5" color="textSecondary">Loading shopping list...</Typography>
            </Box>
        </Container>
    );
}
