export interface UserGalleryPicture {
  perspective: string;
  imgSrc: string;
}

export interface UserInfo {
  type: string;
  number: string;
}

export interface UserMock {
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
  info: UserInfo[];
  gallery: UserGalleryPicture[];
}

export const UserDataMockup: UserMock = {
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
  info: [
    {
      type: 'Age',
      number: '25 years',
    },
    {
      type: 'Weight',
      number: '56 Kg',
    },
    {
      type: 'Neck',
      number: '60 cm',
    },
    {
      type: 'Shoulders',
      number: '144 cm',
    },
    {
      type: 'Chest',
      number: '124 cm',
    },
    {
      type: 'Arm',
      number: '75 cm',
    },
    {
      type: 'Waist',
      number: '125 cm',
    },
    {
      type: 'Hip',
      number: '175 cm',
    },
    {
      type: 'Ass',
      number: '175 cm',
    },
    {
      type: 'Thigh',
      number: '125 cm',
    },
  ],
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

export const getUserDataMock = (): UserMock => ({
  ...UserDataMockup,
});
