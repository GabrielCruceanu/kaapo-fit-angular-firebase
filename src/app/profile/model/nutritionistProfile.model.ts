import {
  Birth,
  Contact,
  GenderType,
  ProfessionalGalleryPicture,
  Review,
  UserImage,
  UserType,
} from './profile-interface';
import { ClientPhysicalDetails, ClientProfile } from './clientProfile.model';

export class NutritionistProfile {
  constructor(
    public id: string,
    public status: UserType.Nutritionist,
    public firstName: string,
    public lastName: string,
    public name: null,
    public gender: GenderType,
    public joined: Birth,
    public birth: Birth,
    public hasProPremium: boolean,
    public certificate: boolean,
    public experience: number,
    public country: string,
    public state: string,
    public city: string,
    public contact: Contact,
    public description: string,
    public completedClients: number | null,
    public coverPicture: UserImage | null,
    public profilePicture: UserImage | null,
    public currentPhysicalDetails: ClientPhysicalDetails | null,
    public activeClients: ClientProfile[] | null,
    public gallery: ProfessionalGalleryPicture[] | null,
    public reviews: Review[] | null
  ) {}
}
