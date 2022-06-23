export class Review {
  constructor(
    public beneficiaryId: string,
    public date: string,
    public description: string,
    public stars: number,
    public clientId: string,
    public clientFirstName: string,
    public clientLastName: string,
    public clientPhoto: string
  ) {}
}
