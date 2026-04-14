import { Honors } from '@/components/Honors'
import styles from '../page.module.css'

export default function HonorsPage() {
  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '80px' }}>
        <Honors />
      </div>
    </main>
  )
}
