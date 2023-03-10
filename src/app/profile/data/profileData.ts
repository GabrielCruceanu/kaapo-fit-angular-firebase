import { ProfileData } from '@/app/profile/model/profileData.model';

export const SampleUserProfileImage = './assets/images/user.jpg';
export const SampleUserProfileCover = './assets/images/cover.jpg';

export const ProfilesData: ProfileData[] = [
  {
    name: 'Client',
    link: '/profil/client',
    icon: 'client',
  },
  {
    name: 'Nutritionist',
    link: '/profil/nutritionist',
    icon: 'nutrition',
  },
  {
    name: 'Antrenor',
    link: '/profil/antrenor',
    icon: 'trainer',
  },
  {
    name: 'Sala',
    link: '/profil/sala',
    icon: 'workout',
  },
];

export function getProfilesData(): ProfileData[] {
  return ProfilesData;
}
