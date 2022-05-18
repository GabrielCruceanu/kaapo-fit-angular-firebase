export interface County {
  name: string;
  cities: string[];
}

export interface Country {
  name: string;
  counties: County[];
}

export const CountriesData: Country[] = [
  {
    name: 'Romania',
    counties: [
      {
        name: 'Bucharest',
        cities: ['Bucharest'],
      },
      {
        name: 'Vrancea',
        cities: ['Adjud', 'Focsani', 'Marasesti', 'Odobesti', 'Panciu'],
      },
    ],
  },
  {
    name: 'Germany',
    counties: [
      {
        name: 'Baden-Württemberg',
        cities: [
          'Stuttgart',
          'Karlsruhe',
          'Mannheim',
          'Freiburg im Breisgau',
          'Heidelberg',
          'Ulm',
          'Heilbronn',
          'Pforzheim',
          'Reutlingen',
        ],
      },
      {
        name: 'Bavaria',
        cities: [
          'Munich',
          'Nuremberg',
          'Augsburg',
          'Regensburg',
          'Ingolstadt',
          'Würzburg',
          'Fürth',
          'Erlangen',
        ],
      },
      {
        name: 'Berlin',
        cities: ['Berlin'],
      },
    ],
  },
];
