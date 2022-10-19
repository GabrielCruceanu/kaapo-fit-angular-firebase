export enum UserImageType {
  profile = 'profile',
  cover = 'cover',
  clientGalleryFront = 'clientGalleryFront',
  clientGallerySide = 'clientGallerySide',
  clientGalleryBack = 'clientGalleryBack',
  proGallery = 'proGallery',
}

export interface UserImage {
  downloadURL: string;
  path: string;
}

export interface ClientGalleryPicture {
  perspective: string;
  image: UserImage;
}

export interface UserInfo {
  type: string;
  number: string;
}

export interface Review {
  beneficiaryId: string;
  date: Date;
  title: string;
  description: string;
  stars: number;
  clientId: string;
  clientFirstName: string;
  clientName: string;
  clientPhoto: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Contact {
  phone: string;
  email: string;
  website: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
}

export interface ProfessionalGalleryPicture {
  src: string;
  alt: string;
}

export interface Birth {
  date: number;
  month: number;
  year: number;
}

export enum UserType {
  Client = 'Client',
  Nutritionist = 'Nutritionist',
  Trainer = 'Trainer',
  Gym = 'Gym',
}

export enum CollectionsType {
  clients = 'clients',
  gyms = 'gyms',
  nutritionists = 'nutritionists',
  trainers = 'trainers',
  users = 'users',
}

export enum GenderType {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}
export enum NutritionistType {
  TerapeutNutritionist = 'Terapeut nutritionist',
  MedicNutritionist = 'Medic nutritionist',
  TehnicianNutritie = 'Tehnician nutritie',
}
export enum TrainerType {
  Powerlifting = 'Powerlifting',
  Calisthenic = 'Calisthenic',
  Fitness = 'Fitness',
  Yoga = 'Yoga',
  Spin = 'Spin',
  Barre = 'Barre',
  Pilates = 'Pilates',
  Bootcamp = 'Bootcamp',
  RockClimbing = 'Rock climbing',
  Other = 'Other',
}

export enum GymType {
  Powerlifting = 'Powerlifting',
  Calisthenic = 'Calisthenic',
  Fitness = 'Fitness',
  Yoga = 'Yoga',
  Spin = 'Spin',
  Barre = 'Barre',
  Pilates = 'Pilates',
  Bootcamp = 'Bootcamp',
  RockClimbing = 'Rock climbing',
  Other = 'Other',
}

export interface UserDetails {
  id: string;
  email: string;
  hasProfile: boolean;
  dayJoined: number;
  monthJoined: number;
  yearJoined: number;
}

export interface ClientDetailsHistory {
  date: Date;
  weight: string;
  neck: string;
  shoulders: string;
  chest: string;
  arm: string;
  waist: string;
  hip: string;
  ass: string;
  thigh: string;
  gallery: ClientGalleryPicture[];
}

export interface ClientDetails {
  userId: string;
  gender: GenderType;
  firstName: string;
  lastName: string;
  birth: Birth;
  email: string;
  phone: string;
  country: string;
  city: string;
  joined: Date;
  profilePicture: string;
  hasPremium: boolean;
  status: UserType;
  weight: string;
  neck: string;
  shoulders: string;
  chest: string;
  arm: string;
  waist: string;
  hip: string;
  ass: string;
  thigh: string;
  gallery: ClientGalleryPicture[];
  history?: ClientDetailsHistory[];
  nutritionist?: ProfessionalDetails;
  trainer?: ProfessionalDetails;
  gym?: GymDetails;
}

export interface ProfessionalDetails {
  userId: string;
  firstName: string;
  lastName: string;
  joined: Date;
  profilePicture: string;
  hasProPremium: boolean;
  certificate: boolean;
  status: UserType;
  experience: number;
  gender: GenderType;
  country: string;
  city: string;
  birth: Birth;
  shortDescription: string;
  longDescription: string;
  contact: Contact;
  gallery?: ProfessionalGalleryPicture[];
  reviews?: Review[];
  completedClients?: number;
  activeClients?: ClientDetails[];
}

export interface GymDetails {
  userId: string;
  name: string;
  joined: Date;
  profilePicture: string;
  hasProPremium: boolean;
  status: UserType.Gym;
  gymType: GymType;
  country: string;
  city: string;
  birth: Birth;
  shortDescription: string;
  longDescription: string;
  contact: Contact;
  gallery?: ProfessionalGalleryPicture[];
  reviews?: Review[];
  personal?: ProfessionalDetails[];
  activeClients?: ClientDetails[];
}
