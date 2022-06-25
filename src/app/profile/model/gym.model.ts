import {
  Birth,
  Contact,
  GymType,
  ProfessionalDetails,
  ProfessionalGalleryPicture,
  Review,
  UserImage,
  UserType,
} from './profile-interface';

export class GymProfile {
  constructor(
    public id: string,
    public status: UserType.Gym,
    public firstName: null,
    public lastName: null,
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
    public description: string | null,
    public coverPicture: UserImage | null,
    public profilePicture: UserImage | null,
    public gallery: ProfessionalGalleryPicture[] | null,
    public reviews: Review[] | null,
    public personal: ProfessionalDetails[] | null
  ) {}
}
