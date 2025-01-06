import { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Switch,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import { Share, ShoppingBag } from "@mui/icons-material";
import { ShoppingList as ShoppingListType } from "@/types/shoppingList";
import Category from "./Category";
import styles from "./ShoppingList.module.css";

const mockShoppingList: ShoppingListType = {
  guidId: "123e4567-e89b-12d3-a456-426614174000",
  name: "Coachella 2024 Shopping List",
  categories: [
    {
      categoryId: "1",
      name: "Camping Gear",
      items: [
        {
          itemId: "1",
          name: "Tent",
          url: "https://example.com/tent",
          essential: true,
        },
        {
          itemId: "2",
          name: "Sleeping Bag",
          url: "https://example.com/sleeping-bag",
          essential: true,
        },
        {
          itemId: "3",
          name: "Camping Chair",
          url: "https://example.com/chair",
          essential: false,
        },
      ],
    },
    {
      categoryId: "2",
      name: "Clothing",
      items: [
        {
          itemId: "4",
          name: "Sunhat",
          url: "https://example.com/sunhat",
          essential: true,
        },
        {
          itemId: "5",
          name: "Sunglasses",
          url: "https://example.com/sunglasses",
          essential: true,
        },
        {
          itemId: "6",
          name: "Festival Outfit",
          url: "https://example.com/outfit",
          essential: false,
        },
      ],
    },
    {
      categoryId: "3",
      name: "Food & Drinks",
      items: [
        {
          itemId: "7",
          name: "Water Bottle",
          url: "https://example.com/water-bottle",
          essential: true,
        },
        {
          itemId: "8",
          name: "Snacks",
          url: "https://example.com/snacks",
          essential: false,
        },
        {
          itemId: "9",
          name: "Cooler",
          url: "https://example.com/cooler",
          essential: true,
        },
      ],
    },
  ],
};

export default function ShoppingList() {
  const [showEssential, setShowEssential] = useState(false);
  const list = mockShoppingList;

  const itemCount = list.categories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          className={styles.header}
          title={
            <Typography variant="h5" className={styles.title}>
              {list.name}
            </Typography>
          }
          action={
            <IconButton aria-label="share" className={styles.iconButton}>
              <Share />
            </IconButton>
          }
        />
        <CardContent className={styles.info}>
          <Box className={styles.info}>
            <ShoppingBag color="primary" className={styles.icon} />
            <Typography variant="body2" className={styles.text}>
              {itemCount} items
            </Typography>
            <Box className={styles.grow} />
            <Typography variant="body2" className={styles.text}>
              Show essential only
            </Typography>
            <Switch
              checked={showEssential}
              onChange={(e) => setShowEssential(e.target.checked)}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {list.categories.map((category) => (
          <Grid item xs={12} key={category.categoryId}>
            <Category category={category} showEssential={showEssential} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
