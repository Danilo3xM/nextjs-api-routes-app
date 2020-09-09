import { useRouter } from 'next/router'
import useSWR from 'swr'
import { resolveHref } from 'next/dist/next-server/lib/router/router'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

function MyImage() {
  return <img src="/my-image.png" alt="my image" />
}

export default MyImage

export default function Person() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.id && `/api/people/${query.id}`,
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
          <th>Portrait</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.nome}</td>
          <td>{data.jogo}</td>
          <td>{data.classe}</td>
          <td>{data.elemento}</td>
          <img src={data.portrait} />
        </tr>
      </tbody>
    </table>
  )
}
