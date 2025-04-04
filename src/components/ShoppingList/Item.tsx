import { Card, CardContent, Typography, Chip, Link as MuiLink, Box, Tooltip, IconButton } from "@mui/material";
import { Star, OpenInNew, Close } from "@mui/icons-material";
import { Item as ItemType } from "@/types/item";
import styles from "./Item.module.css";
import shoppingListService from "@/services/shopping-list-service";
import { useAppStore } from "@/store/store";

interface ItemProps {
  item: ItemType;
}

export default function Item({ item }: ItemProps) {
  const { shoppingList, setShoppingList } = useAppStore();

  const handleDelete = async () => {
    const success = await shoppingListService.deleteItem(item.itemId);
    if (success && shoppingList) {
      const updatedList = await shoppingListService.getShoppingListById(shoppingList.shoppingListId);
      if (updatedList) {
        setShoppingList(updatedList);
      }
    }
  };

  return (
    <Card className={styles.card} variant="outlined">
      <Box className={styles.header}>
        <IconButton 
          size="small" 
          onClick={handleDelete}
          className={styles.deleteButton}
        >
          <Close />
        </IconButton>
      </Box>
      <CardContent className={styles.content}>
        <Box className={styles.mainContent}>
          <Box className={styles.nameRow}>
            <Tooltip title={item.name} placement="top-start">
              <Typography className={styles.name}>
                {item.name}
              </Typography>
            </Tooltip>
            {item.essential && (
              <Chip
                label="Essential"
                icon={<Star className={styles.starIcon} />}
                size="small"
                color="secondary"
                className={styles.essential}
              />
            )}
          </Box>
          {item.url && (
            <MuiLink
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              View item
              <OpenInNew className={styles.icon} />
            </MuiLink>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
