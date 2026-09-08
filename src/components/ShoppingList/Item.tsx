import { useEffect, useRef, useState } from "react";
import { IconButton, Link as MuiLink, Tooltip } from "@mui/material";
import { NorthEast, Close } from "@mui/icons-material";
import { Item as ItemType } from "@/types/item";
import { useAppStore } from "@/store/store";
import styles from "./Item.module.css";

const TruncatedName = ({ text }: { text: string }) => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
            }
        };

        checkTruncation();
        window.addEventListener("resize", checkTruncation);
        return () => window.removeEventListener("resize", checkTruncation);
    }, [text]);

    return (
        <Tooltip title={text} placement="top-start" disableHoverListener={!isTruncated}>
            <p className={styles.name} ref={textRef}>
                {text}
            </p>
        </Tooltip>
    );
};

interface ItemProps {
    item: ItemType;
    categoryId: string;
}

export default function Item({ item, categoryId }: ItemProps) {
    const removeItem = useAppStore((state) => state.removeItem);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleDelete = async () => {
        setIsRemoving(true);
        const success = await removeItem(categoryId, item.itemId);
        if (!success) setIsRemoving(false);
    };

    return (
        <li className={`${styles.row} ${item.essential ? styles.essential : ""} ${isRemoving ? styles.removing : ""}`}>
            <div className={styles.body}>
                <TruncatedName text={item.name} />
                {item.url && (
                    <MuiLink
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                        underline="none"
                    >
                        Open link
                        <NorthEast className={styles.linkIcon} />
                    </MuiLink>
                )}
            </div>

            {item.essential && <span className={styles.tag}>Essential</span>}

            <Tooltip title="Remove item">
                <span>
                    <IconButton
                        size="small"
                        onClick={handleDelete}
                        disabled={isRemoving}
                        className={styles.remove}
                        aria-label={`Remove ${item.name}`}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </span>
            </Tooltip>
        </li>
    );
}
