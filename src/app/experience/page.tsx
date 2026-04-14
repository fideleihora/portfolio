import { Timeline } from "@/components/Timeline";
import styles from "../page.module.css";

export default function ExperiencePage() {
  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '80px' }}>
        <Timeline />
      </div>
    </main>
  );
}
