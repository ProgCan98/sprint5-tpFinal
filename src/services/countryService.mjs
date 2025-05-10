import axios from 'axios';
import CountryRepository from '../repositories/CountryRepository.mjs';

class CountryService {
  constructor() {
    this.repository = new CountryRepository();
  }

  async fetchCountriesFromAPI() {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const countries = response.data.filter(
        (country) =>
          country.languages &&
          Object.values(country.languages).includes('Spanish')
      );

      const countryData = countries.map((country) => {
        const {
          translations,
          tld,
          cca2,
          ccn3,
          cca3,
          cioc,
          idd,
          altSpellings,
          car,
          coatOfArms,
          postalCode,
          demonyms,
          ...rest
        } = country;
        return {
          name: { official: rest.name.official, common: rest.name.common },
          capital: rest.capital || ['N/A'],
          borders: rest.borders || [],
          area: rest.area,
          population: rest.population,
          gini: rest.gini ? Object.values(rest.gini)[0] : null,
          timezones: rest.timezones,
          creador: 'Leandro', // Reemplaza con tu nombre real
        };
      });

      await this.repository.deleteAll();
      await this.repository.insertMany(countryData);
      return {
        message: 'Countries fetched and saved',
        count: countryData.length,
      };
    } catch (error) {
      throw new Error(`Error fetching countries: ${error.message}`);
    }
  }

  async obtenerPaisPorId(id) {
    return await this.repository.getById(id);
  }

  async obtenerTodosLosPaises() {
    return await this.repository.getAll();
  }

  async buscarPaisesPorAtributo(atributo, valor) {
    return await this.repository.findByAttribute(atributo, valor);
  }

  async obtenerPaisesConPoblacionMayorDe(valor) {
    return await this.repository.findByPopulationGreaterThan(valor);
  }

  async crearPais(data) {
    return await this.repository.create(data);
  }

  async actualizarPais(id, datosActualizados) {
    return await this.repository.update(id, datosActualizados);
  }

  async eliminarPais(id) {
    return await this.repository.delete(id);
  }
}

export default CountryService;

// Explicación:
// Usa axios para consumir la API de Rest Countries y filtrar países hispanohablantes.
// Implementé fetchCountriesFromAPI según el enunciado, filtrando países hispanohablantes y eliminando las propiedades indicadas.
// Añadí el campo creador con tu nombre (reemplaza TuNombre con tu nombre real).
// Ajusté los métodos para trabajar con el modelo Country.
