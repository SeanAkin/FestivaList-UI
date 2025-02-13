import { Card, CardContent, Typography, Chip, Link as MuiLink, Box, Tooltip } from "@mui/material";
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
        <Box className={styles.left}>
          <Tooltip title={item.name} placement="top-start">
            <Typography className={styles.name}>
              {item.name}
            </Typography>
          </Tooltip>
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
          <Box className={styles.right}>
            <Chip
              label="Essential"
              icon={<Star className={styles.starIcon} />}
              size="small"
              color="secondary"
              className={styles.essential}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
