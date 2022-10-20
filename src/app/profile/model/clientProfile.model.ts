import {
  Birth,
  GenderType,
  GymDetails,
  ProfessionalDetails,
  UserImage,
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
    public coverPicture: UserImage | null,
    public profilePicture: UserImage | null,
    public currentPhysicalDetails: ClientPhysicalDetails | null,
    public nutritionist: ProfessionalDetails | null,
    public trainer: ProfessionalDetails | null,
    public gym: GymDetails | null
  ) {}
}

export class ClientPhysicalDetails {
  constructor(
    public clientId: string,
    public id: string,
    public date: Birth,
    public weight: string,
    public height: string,
    public head: string,
    public shoulders: string,
    public chest: string,
    public armLeft: string,
    public armRight: string,
    public waist: string,
    public highHip: string,
    public hip: string,
    public waistToKnee: string,
    public knee: string,
    public ankle: string,
    public clientGalleryFront: UserImage,
    public clientGallerySide: UserImage,
    public clientGalleryBack: UserImage
  ) {}
}
