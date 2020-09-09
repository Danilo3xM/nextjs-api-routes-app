import Link from 'next/link'
import styles from '../styles.module.css'

export default function Personagem({ char }) {
  return (
    <li className={styles.hello}>
      <Link href="/char/[id]" as={`/char/${char.id}`}>
        <a>{char.name}</a>
      </Link>
    </li>
  )
}