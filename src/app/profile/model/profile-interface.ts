export interface ClientGalleryPicture {
  perspective: string;
  imgSrc: string;
}

export interface UserInfo {
  type: string;
  number: string;
}

export interface Review {
  date: Date;
  title: string;
  description: string;
  stars: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Contact {
  phone: string;
  email: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  location: Location;
}

export interface ProfessionalGalleryPicture {
  src: string;
  alt: string;
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
export enum GymType {
  Powerlifting = 'Powerlifting',
  Fitness = 'Fitness',
  Yoga = 'Yoga',
  Spin = 'Spin',
  Barre = 'Barre',
  Pilates = 'Pilates',
  Bootcamp = 'Bootcamp',
  RockClimbing = 'Rock climbing',
}

export interface ClientDetailsHistory {
  date: Date;
  age: string;
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
  age: string;
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
  age: string;
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
  age: string;
  shortDescription: string;
  longDescription: string;
  contact: Contact;
  gallery?: ProfessionalGalleryPicture[];
  reviews?: Review[];
  personal?: ProfessionalDetails[];
  activeClients?: ClientDetails[];
}
