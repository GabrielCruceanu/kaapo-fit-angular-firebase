export interface TabModel {
  name: string;
  link: string;
  icon: string;
}

export const TabsData: TabModel[] = [
  {
    name: 'Home',
    link: '/home',
    icon: 'home',
  },
  {
    name: 'Profile',
    link: '/profile',
    icon: 'profile',
  },
  {
    name: 'Add',
    link: '/add',
    icon: 'add',
  },
  {
    name: 'Nutrition',
    link: '/nutrition',
    icon: 'nutrition',
  },
  {
    name: 'Workout',
    link: '/workout',
    icon: 'workout',
  },
];

export function getTabsData(): TabModel[] {
  return TabsData;
}
