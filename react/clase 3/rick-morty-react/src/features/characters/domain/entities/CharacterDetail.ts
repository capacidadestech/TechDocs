export interface CharacterPlace {
  name: string
  url: string
}

export interface CharacterDetail {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: CharacterPlace
  location: CharacterPlace
  image: string
  episode: string[]
  created: string
}
