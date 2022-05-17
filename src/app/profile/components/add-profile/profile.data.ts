export interface ProfileModel {
  name: string;
  link: string;
  mode?: string;
  icon: string;
}

export const ProfilesData: ProfileModel[] = [
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

export function getProfilesData(): ProfileModel[] {
  return ProfilesData;
}
