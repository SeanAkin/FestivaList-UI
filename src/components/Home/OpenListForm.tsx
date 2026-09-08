import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputBase, Typography } from "@mui/material";
import styles from "./OpenListForm.module.css";

const GUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const extractListId = (value: string): string | null => {
    const trimmed = value.trim();
    const candidate = trimmed.includes("/") ? (trimmed.split("/").pop() ?? "") : trimmed;
    return GUID_PATTERN.test(candidate) ? candidate : null;
};

export default function OpenListForm() {
    const [code, setCode] = useState("");
    const [attempted, setAttempted] = useState(false);
    const navigate = useNavigate();

    const listId = extractListId(code);
    const validationError =
        code.trim().length === 0 ? "Paste a list code or link." : !listId ? "That doesn't look like a list code." : null;
    const errorMessage = attempted ? validationError : null;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setAttempted(true);
        if (!listId) return;
        navigate(`/shopping-list/${listId}`);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.label} htmlFor="existing-list-code">
                Already have one?
            </label>

            <div className={styles.row}>
                <InputBase
                    id="existing-list-code"
                    className={`${styles.input} ${errorMessage ? styles.inputError : ""}`}
                    value={code}
                    onChange={(event) => {
                        setCode(event.target.value);
                        setAttempted(false);
                    }}
                    placeholder="Paste a list code or link"
                    autoComplete="off"
                    inputProps={{
                        "aria-label": "Existing list code or link",
                        "aria-invalid": Boolean(errorMessage),
                        "aria-describedby": errorMessage ? "existing-list-error" : undefined,
                    }}
                />
                <Button type="submit" variant="text" className={styles.submit}>
                    Open
                </Button>
            </div>

            {errorMessage && (
                <Typography id="existing-list-error" role="alert" className={styles.error} variant="body2">
                    {errorMessage}
                </Typography>
            )}
        </form>
    );
}
