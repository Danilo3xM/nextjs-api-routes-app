import { ffbe_Personagem } from '../../../data'

export default function handler(req, res) {
  res.status(200).json(ffbe_Personagem)
}