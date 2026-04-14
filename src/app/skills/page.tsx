import { Skills } from "@/components/Skills";
import styles from "../page.module.css";

export default function SkillsPage() {
  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '80px' }}>
        <Skills />
      </div>
    </main>
  );
}
