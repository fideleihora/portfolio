import { About } from "@/components/About";
import styles from "../page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '80px' }}>
        <About />
      </div>
    </main>
  );
}
