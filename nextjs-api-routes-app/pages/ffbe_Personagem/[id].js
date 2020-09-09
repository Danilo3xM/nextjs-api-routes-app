import { useRouter } from 'next/router'
import useSWR from '../../../pages/ffbe_Personagem/node_modules/swr'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Person() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.id && `/api/ffbe_Personagem/${query.id}`,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Jogo Original</th>
          <th>Classe</th>
          <th>Elemento</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.nome}</td>
          <td>{data.jogo}</td>
          <td>{data.classe}</td>
          <td>{data.elemento}</td>
        </tr>
      </tbody>
    </table>
  )
}