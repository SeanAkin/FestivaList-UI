import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ExploreOff } from "@mui/icons-material";
import MessageState from "@/components/common/MessageState";
import Wordmark from "@/components/common/Wordmark";
import styles from "./NotFound.module.css";

export default function NotFound() {
    return (
        <div className={styles.page}>
            <div className={styles.ambient} aria-hidden="true" />

            <header className={styles.header}>
                <Wordmark />
            </header>

            <main id="main" className={styles.main}>
                <p className={styles.code}>404</p>
                <MessageState
                    variant="page"
                    icon={<ExploreOff />}
                    title="Wrong field entirely"
                    description="That page does not exist. Head back and start a list, or open one you already have."
                    action={
                        <Button component={Link} to="/" variant="contained">
                            Back to home
                        </Button>
                    }
                />
            </main>
        </div>
    );
}
