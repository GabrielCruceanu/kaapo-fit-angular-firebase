export interface UserGalleryPicture {
  perspective: string;
  imgSrc: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  joined: string;
  profilePicture: string;
  isPro: boolean;
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
  gallery: UserGalleryPicture[];
}

export const UserDataMockup: UserDetails = {
  firstName: 'Cristina',
  lastName: 'Cruceanu',
  joined: '2 mon',
  profilePicture: './assets/images/mock/profile-mock.jpg',
  isPro: true,
  age: '25',
  weight: '56',
  neck: '60',
  shoulders: '144',
  chest: '124',
  arm: '75',
  waist: '125',
  hip: '175',
  ass: '175',
  thigh: '125',
  gallery: [
    {
      perspective: 'Front',
      imgSrc: './assets/images/mock/front-mock.jpg',
    },
    {
      perspective: 'Back',
      imgSrc: './assets/images/mock/back-mock.jpg',
    },
    {
      perspective: 'Side',
      imgSrc: './assets/images/mock/side-mock.jpg',
    },
  ],
};

export function getUserDataMock(): UserDetails{
  return UserDataMockup;
}
