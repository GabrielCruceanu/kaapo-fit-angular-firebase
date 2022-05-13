import {
  GenderType,
  ClientDetails,
  UserType,
} from '../app/profile/model/profile-interface';

export const UserDataMockup: ClientDetails = {
  userId: 'asdas',
  firstName: 'Cristina',
  lastName: 'Cruceanu',
  email: 'test@test.ro',
  phone: '0770231495',
  joined: new Date(3 / 4 / 2022),
  profilePicture: './assets/images/mock/profile-mock.jpg',
  hasPremium: true,
  status: UserType.Client,
  gender: GenderType.Female,
  city: 'Focsani',
  country: 'Romania',
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

export const getUserDataMock = (): ClientDetails => ({
  ...UserDataMockup,
});
