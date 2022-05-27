import { CollectionsType } from '@/app/profile/model/profile-interface';

export enum TypeOfUploadImage {
  Profile = 'Profile',
  Cover = 'Cover',
  ClientGallery = 'ClientGallery',
  ProGallery = 'ProGallery',
}

export interface UploadImageData {
  id: string;
  typeOfUploadImage: TypeOfUploadImage;
  imageName: string;
  folder: CollectionsType;
}
