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
  Grid2
} from "@mui/material";
import { Share, ShoppingBag } from "@mui/icons-material";
import { ShoppingList as ShoppingListType } from "@/types/shoppingList";
import styles from "./ShoppingList.module.css";
import shoppingListService from "@/services/shopping-list-service";
import Category from "@/components/ShoppingList/Category";

export default function ShoppingList() {
  const { id } = useParams();
  const [showEssential, setShowEssential] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListType | null>(null);

  useEffect(() => {
    if (id) {
      shoppingListService.getShoppingListById(id).then(setShoppingList);
    }
  }, [id]);

  const itemCount = shoppingList
    ? shoppingList.categories.flatMap(category => category.items).filter(item => !showEssential || item.essential).length
    : 0;

  return shoppingList !== null ? (
    <Container maxWidth="lg" className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          className={styles.header}
          title={<Typography variant="h5" className={styles.title}>{shoppingList.name}</Typography>}
          action={<IconButton aria-label="share" className={styles.iconButton}><Share /></IconButton>}
        />
        <CardContent className={styles.info}>
          <Box className={styles.info}>
            <ShoppingBag color="primary" className={styles.icon} />
            <Typography variant="body2" className={styles.text}>{itemCount} items</Typography>
            <Box className={styles.grow} />
            <Typography variant="body2" className={styles.text}>Show essential only</Typography>
            <Switch checked={showEssential} onChange={(e) => setShowEssential(e.target.checked)} color="primary" />
          </Box>
        </CardContent>
      </Card>

      <Grid2 container spacing={3}>
        {shoppingList.categories.map((category) => (
          <Grid2 key={category.categoryId} size={{ xs: 12 }}>
            <Category category={category} showEssential={showEssential} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  ) : (
    "Bath too small..."
  );
}
