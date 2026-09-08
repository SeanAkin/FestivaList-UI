import { FormEvent, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { useAppStore } from "@/store/store";

interface AddItemProps {
    open: boolean;
    onClose: () => void;
    categoryId: string;
    categoryName: string;
}

const MAX_NAME_LENGTH = 80;

const normaliseUrl = (value: string) => (/^https?:\/\//i.test(value) ? value : `https://${value}`);

const isValidUrl = (value: string) => {
    try {
        const url = new URL(normaliseUrl(value));
        return Boolean(url.hostname.includes("."));
    } catch {
        return false;
    }
};

export default function AddItem({ open, onClose, categoryId, categoryName }: AddItemProps) {
    const addItem = useAppStore((state) => state.addItem);

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [isEssential, setIsEssential] = useState(false);
    const [attempted, setAttempted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);

    const trimmedName = name.trim();
    const trimmedUrl = url.trim();

    const nameError =
        trimmedName.length === 0
            ? "Give the item a name."
            : trimmedName.length > MAX_NAME_LENGTH
              ? `Keep it to ${MAX_NAME_LENGTH} characters or fewer.`
              : null;
    const urlError = trimmedUrl.length > 0 && !isValidUrl(trimmedUrl) ? "That doesn't look like a link." : null;

    const close = () => {
        setName("");
        setUrl("");
        setIsEssential(false);
        setAttempted(false);
        setHasFailed(false);
        onClose();
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setAttempted(true);
        if (nameError || urlError || isSaving) return;

        setIsSaving(true);
        setHasFailed(false);
        const success = await addItem(categoryId, {
            name: trimmedName,
            url: trimmedUrl ? normaliseUrl(trimmedUrl) : "",
            essential: isEssential,
        });
        setIsSaving(false);

        if (success) close();
        else setHasFailed(true);
    };

    return (
        <Dialog open={open} onClose={close} fullWidth maxWidth="xs" closeAfterTransition={false}>
            <form onSubmit={handleSubmit} noValidate>
                <DialogTitle>Add to {categoryName}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Item"
                        placeholder="4-berth tent"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setHasFailed(false);
                        }}
                        disabled={isSaving}
                        autoComplete="off"
                        error={Boolean(attempted && nameError)}
                        helperText={(attempted && nameError) || " "}
                    />
                    <TextField
                        fullWidth
                        label="Link (optional)"
                        placeholder="argos.co.uk/tent"
                        value={url}
                        onChange={(event) => {
                            setUrl(event.target.value);
                            setHasFailed(false);
                        }}
                        disabled={isSaving}
                        autoComplete="off"
                        error={Boolean(attempted && urlError)}
                        helperText={(attempted && urlError) || " "}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isEssential}
                                onChange={(event) => setIsEssential(event.target.checked)}
                                disabled={isSaving}
                            />
                        }
                        label="Can't go without it"
                    />
                    {hasFailed && (
                        <Typography role="alert" variant="body2" color="error" sx={{ mt: 1 }}>
                            We couldn't add that item. Try again.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSaving}>
                        {isSaving ? "Adding" : "Add item"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
