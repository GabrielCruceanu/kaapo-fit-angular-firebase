export class UserProfile {
  constructor(
    public id: string,
    public email: string,
    public hasProfile: boolean,
    public dayJoined: number,
    public monthJoined: number,
    public yearJoined: number
  ) {}
}
