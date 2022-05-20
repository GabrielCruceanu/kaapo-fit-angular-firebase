import {
  Birth,
  ClientDetails,
  Contact,
  GymType,
  ProfessionalDetails,
  ProfessionalGalleryPicture,
  Review,
  UserType,
} from './profile-interface';

export class GymProfile {
  constructor(
    public id: string,
    public status: UserType.Gym,
    public name: string,
    public joined: Birth,
    public hasProPremium: boolean,
    public gymType: GymType,
    public country: string,
    public state: string,
    public city: string,
    public street: string,
    public strNo: string,
    public contact: Contact,
    public shortDescription: string | null,
    public longDescription: string | null,
    public profilePicture: string | null,
    public gallery: ProfessionalGalleryPicture[] | null,
    public reviews: Review[] | null,
    public personal: ProfessionalDetails[] | null
  ) {}
}
