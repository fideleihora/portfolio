import { Stats } from "@/components/Stats";
import styles from "../page.module.css";

export default function StatsPage() {
  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '80px' }}>
        <Stats />
      </div>
    </main>
  );
}
