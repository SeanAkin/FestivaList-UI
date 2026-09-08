import { FormEvent, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useAppStore } from "@/store/store";

interface AddCategoryProps {
    open: boolean;
    onClose: () => void;
}

const MAX_NAME_LENGTH = 40;

export default function AddCategory({ open, onClose }: AddCategoryProps) {
    const addCategory = useAppStore((state) => state.addCategory);

    const [name, setName] = useState("");
    const [attempted, setAttempted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);

    const trimmedName = name.trim();
    const validationError =
        trimmedName.length === 0
            ? "Give the category a name."
            : trimmedName.length > MAX_NAME_LENGTH
              ? `Keep it to ${MAX_NAME_LENGTH} characters or fewer.`
              : null;
    const fieldError = attempted ? validationError : null;

    const close = () => {
        setName("");
        setAttempted(false);
        setHasFailed(false);
        onClose();
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setAttempted(true);
        if (validationError || isSaving) return;

        setIsSaving(true);
        setHasFailed(false);
        const success = await addCategory(trimmedName);
        setIsSaving(false);

        if (success) close();
        else setHasFailed(true);
    };

    return (
        <Dialog open={open} onClose={close} fullWidth maxWidth="xs" closeAfterTransition={false}>
            <form onSubmit={handleSubmit} noValidate>
                <DialogTitle>New category</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Group things that get packed together - camping, food, wearables.
                    </Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Category name"
                        placeholder="Camping"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setHasFailed(false);
                        }}
                        disabled={isSaving}
                        autoComplete="off"
                        error={Boolean(fieldError)}
                        helperText={fieldError ?? " "}
                    />
                    {hasFailed && (
                        <Typography role="alert" variant="body2" color="error">
                            We couldn't add that category. Try again.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSaving}>
                        {isSaving ? "Adding" : "Add category"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
