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
        <tr><img src={data.portrait}/></tr>
        <tr>
          <th>Nome</th>
          <th>Jogo Original</th>
          <th>Classe</th>
          <th>Elemento</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.nome}</td>
          <td>{data.jogo}</td>
          <td>{data.classe}</td>
          <td>{data.elemento}</td>
          <td><img src={data.img_elemento}/></td>
        </tr>
      </tbody>
    </table>
  )
}
