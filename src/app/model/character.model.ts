export class Character {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public species: string,
    public gender: string,
    public imageURL: string,
    public created: Date,
    public firstEpisode: string
  ) {}

}
