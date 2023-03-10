export interface State {
  name: string;
  cities: string[];
}

export interface Country {
  name: string;
  states: State[];
}

export const CountriesData: Country[] = [
  {
    name: 'Romania',
    states: [
      {
        name: 'Bucuresti',
        cities: [
          'Sector 1',
          'Sector 2',
          'Sector 3',
          'Sector 4',
          'Sector 5',
          'Sector 6',
        ],
      },
      {
        name: 'Vrancea',
        cities: ['Adjud', 'Focsani', 'Marasesti', 'Odobesti', 'Panciu'],
      },
    ],
  },
];
