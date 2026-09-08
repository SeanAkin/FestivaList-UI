import CreateListForm from "@/components/Home/CreateListForm";
import OpenListForm from "@/components/Home/OpenListForm";
import Wordmark from "@/components/common/Wordmark";
import styles from "./Home.module.css";

const steps = [
    { number: "01", title: "Name the list", detail: "One list for the whole crew, made in a second." },
    { number: "02", title: "Send the link", detail: "Anyone with it can add what they're bringing." },
    { number: "03", title: "Flag the essentials", detail: "Filter down to the things you cannot turn up without." },
];

export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.ambient} aria-hidden="true" />

            <header className={styles.header}>
                <Wordmark asLink={false} />
            </header>

            <main id="main" className={styles.main}>
                <section className={styles.hero}>
                    <div className={styles.copy}>
                        <p className={styles.eyebrow}>Shared festival packing lists</p>
                        <h1 className={styles.headline}>Nobody forgets the tent this year.</h1>
                        <p className={styles.lede}>
                            Build one list for everyone coming, split it into categories, and mark the things that
                            can't be left in the hallway. No account, no app - just a link.
                        </p>

                        <div className={styles.actions}>
                            <CreateListForm />
                            <div className={styles.separator} aria-hidden="true" />
                            <OpenListForm />
                        </div>
                    </div>

                    <div className={styles.art}>
                        <div className={styles.artGlow} aria-hidden="true" />
                        <img
                            className={styles.badge}
                            src="/festivalist-no-bg.png"
                            alt="FestivaList emblem: a smiling festival main-stage tent flanked by palm trees, a camping tent and a folding chair"
                            width={512}
                            height={512}
                        />
                    </div>
                </section>

                <section className={styles.steps} aria-label="How it works">
                    <ol className={styles.stepList}>
                        {steps.map((step) => (
                            <li key={step.number} className={styles.step}>
                                <span className={styles.stepNumber}>{step.number}</span>
                                <h2 className={styles.stepTitle}>{step.title}</h2>
                                <p className={styles.stepDetail}>{step.detail}</p>
                            </li>
                        ))}
                    </ol>
                </section>
            </main>

            <footer className={styles.footer}>
                <Wordmark />
                <p className={styles.footerNote}>Built for muddy fields and one bar of signal.</p>
            </footer>
        </div>
    );
}
