import { ProfileData } from '../app/profile/model/profileData.model';

export const ProfilesData: ProfileData[] = [
  {
    name: 'Client',
    link: '/profile/add-client',
    icon: 'client',
  },
  {
    name: 'Nutritionist',
    link: '/profile/add-professional',
    mode: 'nutrition',
    icon: 'nutrition',
  },
  {
    name: 'Trainer',
    link: '/profile/add-professional',
    mode: 'trainer',
    icon: 'trainer',
  },
  {
    name: 'Gym',
    link: '/profile/add-gym',
    icon: 'workout',
  },
];

export function getProfilesData(): ProfileData[] {
  return ProfilesData;
}
