import { Skeleton } from "@mui/material";
import styles from "./ListSkeleton.module.css";

const placeholderCards = [4, 3, 5];

export default function ListSkeleton() {
    return (
        <div className={styles.root} aria-hidden="true">
            <div className={styles.header}>
                <Skeleton variant="text" width={120} height={16} />
                <Skeleton variant="text" width="min(22rem, 70%)" height={56} />
                <Skeleton variant="text" width={220} height={20} />
            </div>

            <div className={styles.columns}>
                {placeholderCards.map((rows, cardIndex) => (
                    <div className={styles.card} key={cardIndex}>
                        <Skeleton variant="text" width="55%" height={26} />
                        <Skeleton variant="text" width="30%" height={14} />
                        <div className={styles.rows}>
                            {Array.from({ length: rows }).map((_, rowIndex) => (
                                <Skeleton key={rowIndex} variant="rounded" height={34} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
