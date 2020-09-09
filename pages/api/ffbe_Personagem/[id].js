import { nanatsuPerson } from '../../../data'

export default function personagens({ query: { id } }, res) {
  const filtered = nanatsuPerson.filter((p) => p.id === id)

  // User with id exists
  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Personagem com o ID: ${id} não encontrado.` })
  }
}