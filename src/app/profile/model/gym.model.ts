import {
  ClientDetails,
  Contact,
  GymType,
  ProfessionalDetails,
  ProfessionalGalleryPicture,
  Review,
  UserType,
} from './profile-interface';

export class Gym {
  constructor(
    public userId: string,
    public name: string,
    public joined: Date,
    public profilePicture: string,
    public hasProPremium: boolean,
    public status: UserType.Gym,
    public gymType: GymType,
    public country: string,
    public city: string,
    public age: string,
    public shortDescription: string,
    public longDescription: string,
    public contact: Contact,
    public gallery?: ProfessionalGalleryPicture[],
    public reviews?: Review[],
    public personal?: ProfessionalDetails[],
    public activeClients?: ClientDetails[]
  ) {}
}
