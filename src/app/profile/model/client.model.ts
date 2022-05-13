import {
  GenderType,
  GymDetails,
  ProfessionalDetails,
  ClientDetailsHistory,
  ClientGalleryPicture,
  UserType,
} from './profile-interface';

export class Client {
  constructor(
    public userId: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public joined: Date,
    public profilePicture: string,
    public hasPremium: boolean,
    public status: UserType,
    public gender: GenderType,
    public country: string,
    public city: string,
    public age: string,
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
