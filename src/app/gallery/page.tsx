import { Gallery } from '@/components/Gallery'
import styles from '../page.module.css'

export default function GalleryPage() {
  return (
    <main className={styles.main}>
      <div style={{ paddingTop: '80px' }}>
        <Gallery />
      </div>
    </main>
  )
}
