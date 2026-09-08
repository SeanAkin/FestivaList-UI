import { ReactNode } from "react";
import styles from "./MessageState.module.css";

interface MessageStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
    variant?: "inset" | "page";
}

export default function MessageState({ icon, title, description, action, variant = "inset" }: MessageStateProps) {
    return (
        <div className={`${styles.root} ${variant === "page" ? styles.page : styles.inset}`}>
            <span className={styles.icon} aria-hidden="true">
                {icon}
            </span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            {action && <div className={styles.action}>{action}</div>}
        </div>
    );
}
