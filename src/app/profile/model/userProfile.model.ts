import { UserType } from './profile-interface';

export class UserProfile {
  constructor(
    public id: string,
    public email: string,
    public hasProfile: boolean,
    public dayJoined: number,
    public monthJoined: number,
    public yearJoined: number,
    public userType: UserType | null
  ) {}
}
