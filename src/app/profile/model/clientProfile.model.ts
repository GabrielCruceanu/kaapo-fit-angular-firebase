import {
  Birth,
  ClientGalleryPicture,
  GenderType,
  GymDetails,
  ProfessionalDetails,
  UserType,
} from './profile-interface';

export class ClientProfile {
  constructor(
    public id: string,
    public status: UserType,
    public firstName: string,
    public lastName: string,
    public name: null,
    public email: string,
    public phone: string,
    public gender: GenderType,
    public country: string,
    public state: string,
    public city: string,
    public hasPremium: boolean,
    public birth: Birth,
    public joined: Birth,
    public profilePicture: string | null,
    public currentPhysicalDetails: ClientPhysicalDetails | null,
    public historyPhysicalDetails: ClientPhysicalDetails[] | null,
    public nutritionist: ProfessionalDetails | null,
    public trainer: ProfessionalDetails | null,
    public gym: GymDetails | null
  ) {}
}

export class ClientPhysicalDetails {
  constructor(
    public date: Birth,
    public birth: Birth,
    public weight: string,
    public neck: string,
    public shoulders: string,
    public chest: string,
    public arm: string,
    public waist: string,
    public hip: string,
    public ass: string,
    public thigh: string,
    public gallery: ClientGalleryPicture[]
  ) {}
}
