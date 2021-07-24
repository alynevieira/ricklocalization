export interface ICharacter {
  id: number,
  name: string,
  dimension: string,
  description: string,
  urlImageSmall: string,
  urlImageLarge: string,
  historic: [
    {
      dimensionDestination: string,
      createdAt: Date
    }
  ]
}