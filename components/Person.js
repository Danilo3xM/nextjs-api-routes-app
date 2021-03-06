import Link from 'next/link'
import styles from '../styles.module.css'

export default function Person({ person }) {
  return (
    <li className={styles.hello}>
      <Link href="/person/[id]" as={`/person/${person.id}`}>
        <a>{person.nome}</a>
      </Link>
      <img src={person.ico}/>
    </li>
  )
}
