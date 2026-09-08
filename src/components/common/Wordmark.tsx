import { Link } from "react-router-dom";
import styles from "./Wordmark.module.css";

interface WordmarkProps {
    asLink?: boolean;
}

export default function Wordmark({ asLink = true }: WordmarkProps) {
    const content = (
        <span className={styles.wordmark}>
            Festiva<span className={styles.accent}>List</span>
        </span>
    );

    return asLink ? (
        <Link to="/" className={styles.link} aria-label="FestivaList home">
            {content}
        </Link>
    ) : (
        content
    );
}
