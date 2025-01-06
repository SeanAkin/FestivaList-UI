import { Card, CardContent, Typography, Chip, Link as MuiLink, Box } from "@mui/material";
import { Star, OpenInNew } from "@mui/icons-material";
import { Item as ItemType } from "@/types/item";
import styles from "./Item.module.css";

interface ItemProps {
  item: ItemType;
}

export default function Item({ item }: ItemProps) {
  return (
    <Card className={styles.card} variant="outlined">
      <CardContent className={styles.content}>
        <Box>
          <Typography variant="subtitle1" className={styles.name}>
            {item.name}
          </Typography>
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
        {item.essential && (
          <Chip
            label="Essential"
            icon={<Star className={styles.starIcon} />}
            size="small"
            color="secondary"
            className={styles.essential}
          />
        )}
      </CardContent>
    </Card>
  );
}
