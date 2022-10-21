export interface TabModel {
  name: string;
  link: string;
  icon: string;
}

export const TabsData: TabModel[] = [
  {
    name: 'Acasa',
    link: '/acasa',
    icon: 'home',
  },
  {
    name: 'Profil',
    link: '/profil',
    icon: 'profile',
  },
  {
    name: 'Antrenori',
    link: '/antrenori',
    icon: 'trainer',
  },
  {
    name: 'Nutritionisti',
    link: '/nutritionisti',
    icon: 'nutrition',
  },
  {
    name: 'Sali',
    link: '/sali',
    icon: 'workout',
  },
];

export function getTabsData(): TabModel[] {
  return TabsData;
}
