import styles from './page.module.css'
import { Hero } from '@/components/Hero'
import { Memories } from '@/components/Memories'
import { Projects } from '@/components/Projects'
import { Honors } from '@/components/Honors'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Projects />
      <Honors />
      <Memories />
    </main>
  )
}
