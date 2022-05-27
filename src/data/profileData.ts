import { ProfileData } from '@/app/profile/model/profileData.model';

export const SampleUserProfileImage = './assets/images/user.jpg';
export const SampleUserProfileCover = './assets/images/cover.jpg';

export const ProfilesData: ProfileData[] = [
  {
    name: 'Client',
    link: '/profile/client',
    icon: 'client',
  },
  {
    name: 'Nutritionist',
    link: '/profile/nutritionist',
    icon: 'nutrition',
  },
  {
    name: 'Trainer',
    link: '/profile/trainer',
    icon: 'trainer',
  },
  {
    name: 'Gym',
    link: '/profile/gym',
    icon: 'workout',
  },
];

export function getProfilesData(): ProfileData[] {
  return ProfilesData;
}
