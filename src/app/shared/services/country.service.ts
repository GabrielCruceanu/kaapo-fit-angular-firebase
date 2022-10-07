import { Injectable } from '@angular/core';
import { CountriesData } from '../../../data/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countriesData = CountriesData;

  constructor() {}

  public _filterData(value: string, list: string[]): string[] {
    if (value && list) {
      const filterValue = value.toLowerCase();

      return list.filter((item) => item.toLowerCase().includes(filterValue));
    } else {
      return [];
    }
  }

  // Country
  public mapCountriesData(): string[] {
    return this.countriesData.map((country) => country.name);
  }

  //  State
  public mapStatesData(): string[] {
    let statesName = [''];
    const statesFromCountry = this.countriesData.map((county) => county.states);

    statesFromCountry.map((state) =>
      state.map((state) => {
        statesName.push(state.name);
      })
    );

    return statesName;
  }

  public mapStateFromSelectedCountryData(countryName: string): string[] {
    const selectedCountry = this.countriesData.find(
      (country) => country.name === countryName
    );

    if (selectedCountry) {
      return selectedCountry.states.map((county) => county.name);
    } else {
      return [];
    }
  }

  //  City
  public mapCitiesData(): string[] {
    let citiesName = [''];
    const statesFromCountry = this.countriesData.map((county) => county.states);

    statesFromCountry.map((state) =>
      state.map((state) => {
        state.cities.map((city) => citiesName.push(city));
      })
    );

    return citiesName;
  }

  public mapCityFromSelectedCountryData(
    countryName: string,
    stateName: string
  ): string[] {
    const selectedCountry = this.countriesData.find(
      (country) => country.name === countryName
    );

    const selectedState = selectedCountry?.states.find(
      (county) => county.name === stateName
    );
    if (selectedState) {
      return selectedState.cities;
    } else {
      return [];
    }
  }
}
