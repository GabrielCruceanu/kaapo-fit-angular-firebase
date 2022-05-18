import {
  Birth,
  ClientDetailsHistory,
  ClientGalleryPicture,
  GenderType,
  GymDetails,
  ProfessionalDetails,
  UserType,
} from './profile-interface';

export class ClientProfile {
  constructor(
    public userId: string,
    public gender: GenderType,
    public firstName: string,
    public lastName: string,
    public birth: Birth,
    public email: string,
    public phone: string,
    public country: string,
    public city: string,
    public joined: Date,
    public profilePicture: string,
    public hasPremium: boolean,
    public status: UserType,
    public weight: string,
    public neck: string,
    public shoulders: string,
    public chest: string,
    public arm: string,
    public waist: string,
    public hip: string,
    public ass: string,
    public thigh: string,
    public gallery: ClientGalleryPicture[],
    public history?: ClientDetailsHistory[],
    public nutritionist?: ProfessionalDetails,
    public trainer?: ProfessionalDetails,
    public gym?: GymDetails
  ) {}
}
