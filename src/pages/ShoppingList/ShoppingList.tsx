import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, IconButton, Snackbar, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import {
    Add,
    ArrowBack,
    IosShare,
    SearchOff,
    SentimentDissatisfied,
    Inventory2Outlined,
} from "@mui/icons-material";
import { useAppStore } from "@/store/store";
import Category from "@/components/ShoppingList/Category";
import AddCategory from "@/components/ShoppingList/AddCategory";
import ListSkeleton from "@/components/ShoppingList/ListSkeleton";
import MessageState from "@/components/common/MessageState";
import Wordmark from "@/components/common/Wordmark";
import styles from "./ShoppingList.module.css";

export default function ShoppingList() {
    const { id } = useParams();
    const shoppingList = useAppStore((state) => state.shoppingList);
    const status = useAppStore((state) => state.status);
    const essentialsOnly = useAppStore((state) => state.essentialsOnly);
    const setEssentialsOnly = useAppStore((state) => state.setEssentialsOnly);
    const loadShoppingList = useAppStore((state) => state.loadShoppingList);

    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (id) loadShoppingList(id);
    }, [id, loadShoppingList]);

    const allItems = shoppingList?.categories.flatMap((category) => category.items) ?? [];
    const essentialCount = allItems.filter((item) => item.essential).length;

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setToast("Link copied. Send it to whoever is coming.");
        } catch {
            setToast("We could not copy it automatically. Copy the address bar instead.");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.ambient} aria-hidden="true" />

            <header className={styles.topbar}>
                <div className={styles.topbarInner}>
                    <Link to="/" className={styles.back}>
                        <ArrowBack fontSize="small" />
                        <span>Home</span>
                    </Link>
                    <Wordmark />
                    <Tooltip title="Copy link to this list">
                        <span>
                            <IconButton
                                onClick={handleShare}
                                aria-label="Copy link to this list"
                                disabled={status !== "ready"}
                            >
                                <IosShare fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </div>
            </header>

            <main id="main" className={styles.main}>
                {status === "loading" || status === "idle" ? (
                    <ListSkeleton />
                ) : status === "not-found" ? (
                    <MessageState
                        variant="page"
                        icon={<SearchOff />}
                        title="No list with that code"
                        description="The code may be mistyped, or the list has been deleted. Check the link you were sent."
                        action={
                            <Button component={Link} to="/" variant="contained">
                                Back to home
                            </Button>
                        }
                    />
                ) : status === "error" ? (
                    <MessageState
                        variant="page"
                        icon={<SentimentDissatisfied />}
                        title="We could not load that list"
                        description="The connection dropped on the way. Try again in a moment."
                        action={
                            <Button variant="contained" onClick={() => id && loadShoppingList(id)}>
                                Try again
                            </Button>
                        }
                    />
                ) : shoppingList ? (
                    <>
                        <section className={styles.listHeader}>
                            <p className={styles.eyebrow}>Packing list</p>
                            <h1 className={styles.title}>{shoppingList.name}</h1>

                            <div className={styles.controls}>
                                <p className={styles.meta}>
                                    <span className={styles.metaStrong}>{allItems.length}</span>{" "}
                                    {allItems.length === 1 ? "item" : "items"}
                                    <span className={styles.metaDivider}>·</span>
                                    <span className={styles.metaAccent}>{essentialCount} essential</span>
                                    <span className={styles.metaDivider}>·</span>
                                    {shoppingList.categories.length}{" "}
                                    {shoppingList.categories.length === 1 ? "category" : "categories"}
                                </p>

                                <div className={styles.controlActions}>
                                    <ToggleButtonGroup
                                        exclusive
                                        size="small"
                                        value={essentialsOnly ? "essential" : "all"}
                                        onChange={(_, value) => value && setEssentialsOnly(value === "essential")}
                                        aria-label="Filter items"
                                    >
                                        <ToggleButton value="all">Everything</ToggleButton>
                                        <ToggleButton value="essential">Essentials</ToggleButton>
                                    </ToggleButtonGroup>

                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        onClick={() => setIsAddCategoryOpen(true)}
                                    >
                                        Category
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {shoppingList.categories.length > 0 ? (
                            <div className={styles.columns}>
                                {shoppingList.categories.map((category) => (
                                    <Category key={category.categoryId} category={category} />
                                ))}
                            </div>
                        ) : (
                            <MessageState
                                variant="page"
                                icon={<Inventory2Outlined />}
                                title="Nothing packed yet"
                                description="Start with a category - camping, food, wearables - then fill it with the things you need."
                                action={
                                    <Button variant="contained" onClick={() => setIsAddCategoryOpen(true)}>
                                        Add your first category
                                    </Button>
                                }
                            />
                        )}

                        <AddCategory open={isAddCategoryOpen} onClose={() => setIsAddCategoryOpen(false)} />
                    </>
                ) : null}
            </main>

            <Snackbar
                open={toast !== null}
                onClose={() => setToast(null)}
                autoHideDuration={4000}
                message={toast}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </div>
    );
}
