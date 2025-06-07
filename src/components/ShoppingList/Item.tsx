import { Card, CardContent, Typography, Chip, Link as MuiLink, Box, Tooltip, IconButton, CardHeader } from "@mui/material";
import { Star, OpenInNew, Close } from "@mui/icons-material";
import { Item as ItemType } from "@/types/item";
import styles from "./Item.module.css";
import shoppingListService from "@/services/shopping-list-service";
import { useAppStore } from "@/store/store";
import { useRef, useState, useEffect } from "react";

const TruncatedTooltip = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };
    
    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [text]);

  return (
    <Tooltip title={text} placement="top-start" disableHoverListener={!isTruncated}>
      <Typography className={styles.itemTitle} ref={textRef}>
        {text}
      </Typography>
    </Tooltip>
  );
};

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
      <CardHeader
        className={styles.header}
        title={<TruncatedTooltip text={item.name} />}
        action={
          <Tooltip title="Remove item">
            <IconButton 
              size="small" 
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              <Close fontSize="small" />
            </IconButton>
          </Tooltip>
        }
        disableTypography
      />
      <CardContent className={styles.content}>
        <Box className={styles.mainContent}>
          <Box className={styles.leftContent}>
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
          <Box className={styles.rightContent}>
            {item.essential && (
              <Chip
                label="Essential"
                icon={<Star className={styles.starIcon} />}
                size="small"
                className={styles.essential}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
