import CountryService from '../services/countryService.mjs';

class CountryController {
  constructor() {
    this.service = new CountryService();
  }

  getCountryById = async (req, res) => {
    try {
      const country = await this.service.obtenerPaisPorId(req.params.id);
      if (!country)
        return res.status(404).json({ message: 'Country not found' });
      res.json(country);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllCountries = async (req, res) => {
    try {
      const countries = await this.service.obtenerTodosLosPaises();
      res.render('dashboard', { countries, title: 'Dashboard - Países' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  searchCountriesByAttribute = async (req, res) => {
    try {
      const { attribute, value } = req.query;
      const countries = await this.service.buscarPaisesPorAtributo(
        attribute,
        value
      );
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getCountriesByPopulation = async (req, res) => {
    try {
      const { value } = req.query;
      const countries = await this.service.obtenerPaisesConPoblacionMayorDe(
        Number(value)
      );
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  showAddForm = (req, res) => {
    res.render('addCountry', { title: 'Agregar País' });
  };

  createCountry = async (req, res) => {
    try {
      await this.service.crearPais(req.body);
      res.redirect('/dashboard');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  showEditForm = async (req, res) => {
    try {
      const country = await this.service.obtenerPaisPorId(req.params.id);
      res.render('editCountry', { country, title: 'Editar País' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  updateCountry = async (req, res) => {
    try {
      await this.service.actualizarPais(req.params.id, req.body);
      res.redirect('/dashboard');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteCountry = async (req, res) => {
    try {
      await this.service.eliminarPais(req.params.id);
      res.redirect('/dashboard');
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  fetchCountries = async (req, res) => {
    try {
      const result = await this.service.fetchCountriesFromAPI();
      // Envía una respuesta HTTP con el resultado en formato JSON (ej. { message: 'Countries fetched and saved', count: 21 }).
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default CountryController;

// Explicación:
// Define métodos para manejar las solicitudes HTTP (listar, agregar, editar, eliminar países).
// Usa res.render para mostrar vistas EJS y res.json para las rutas API.
