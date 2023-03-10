import { AddInfoDataModel } from '@/app/add-information/model/addInfoData.model';

export const addInfoData: AddInfoDataModel[] = [
  {
    name: 'Client',
    link: '/adauga/client',
    icon: 'client',
  },
  {
    name: 'Nutritie',
    link: '/adauga/nutritie',
    icon: 'nutrition',
  },
  {
    name: 'Antrenament',
    link: '/adauga/antrenament',
    icon: 'workout',
  },
  {
    name: 'Antrenor',
    link: '/adauga/antrenor',
    icon: 'trainer',
  },
];

export function getAddInfoData(): AddInfoDataModel[] {
  return addInfoData;
}
