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
    name: 'Adauga',
    link: '/adauga',
    icon: 'add',
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
