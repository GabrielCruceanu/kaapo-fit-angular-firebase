import {
  ClientDetails,
  Contact,
  GenderType,
  ProfessionalGalleryPicture,
  Review,
  UserType,
} from './profile-interface';

export class Professional {
  constructor(
    public userId: string,
    public firstName: string,
    public lastName: string,
    public joined: Date,
    public profilePicture: string,
    public hasProPremium: boolean,
    public certificate: boolean,
    public status: UserType,
    public experience: number,
    public gender: GenderType,
    public country: string,
    public city: string,
    public age: string,
    public shortDescription: string,
    public longDescription: string,
    public contact: Contact,
    public gallery?: ProfessionalGalleryPicture[],
    public reviews?: Review[],
    public completedClients?: number,
    public activeClients?: ClientDetails[]
  ) {}
}
