import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, InputBase, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import shoppingListService from "@/services/shopping-list-service";
import styles from "./CreateListForm.module.css";

const MAX_NAME_LENGTH = 60;

type SubmitState = "idle" | "saving" | "rate-limited" | "failed";

const submitErrors: Record<Exclude<SubmitState, "idle" | "saving">, string> = {
    "rate-limited": "Too many lists created from here just now. Try again in a minute.",
    failed: "We couldn't create that list. Check your connection and try again.",
};

export default function CreateListForm() {
    const [name, setName] = useState("");
    const [attempted, setAttempted] = useState(false);
    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const navigate = useNavigate();

    const trimmedName = name.trim();
    const validationError =
        trimmedName.length === 0
            ? "Give your list a name first."
            : trimmedName.length > MAX_NAME_LENGTH
              ? `Keep it to ${MAX_NAME_LENGTH} characters or fewer.`
              : null;

    const errorMessage =
        (attempted && validationError) ||
        (submitState === "rate-limited" || submitState === "failed" ? submitErrors[submitState] : null);

    const isSaving = submitState === "saving";

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setAttempted(true);
        if (validationError || isSaving) return;

        setSubmitState("saving");
        const result = await shoppingListService.createShoppingList(trimmedName);

        if (result.status === "ok") {
            navigate(`/shopping-list/${result.shoppingListId}`);
            return;
        }

        setSubmitState(result.status === "rate-limited" ? "rate-limited" : "failed");
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.label} htmlFor="new-list-name">
                Start a new list
            </label>

            <div className={`${styles.field} ${errorMessage ? styles.fieldError : ""}`}>
                <InputBase
                    id="new-list-name"
                    className={styles.input}
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        if (submitState !== "saving") setSubmitState("idle");
                    }}
                    placeholder="Glastonbury 2026"
                    disabled={isSaving}
                    autoComplete="off"
                    inputProps={{
                        "aria-label": "Name your new shopping list",
                        "aria-invalid": Boolean(errorMessage),
                        "aria-describedby": errorMessage ? "new-list-error" : undefined,
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    className={styles.submit}
                    disabled={isSaving}
                    endIcon={
                        isSaving ? (
                            <CircularProgress size={16} thickness={5} color="inherit" />
                        ) : (
                            <ArrowForward fontSize="small" />
                        )
                    }
                >
                    {isSaving ? "Creating" : "Create list"}
                </Button>
            </div>

            {errorMessage ? (
                <Typography id="new-list-error" role="alert" className={styles.error} variant="body2">
                    {errorMessage}
                </Typography>
            ) : (
                <Typography className={styles.hint} variant="body2">
                    No account needed. You'll get a link to share with everyone coming.
                </Typography>
            )}
        </form>
    );
}
