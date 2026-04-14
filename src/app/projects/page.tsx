import { Projects } from '@/components/Projects'
import styles from '../page.module.css'

export default function ProjectsPage() {
  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '80px' }}>
        <Projects />
      </div>
    </main>
  )
}
