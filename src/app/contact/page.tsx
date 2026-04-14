import { Contact } from "@/components/Contact";
import styles from "../page.module.css";

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '80px' }}>
        <Contact />
      </div>
    </main>
  );
}
