import express from 'express';
import CountryController from '../controllers/countryController.mjs';
import validarCountry from '../middleware/validarCountry.mjs';
import methodOverride from 'method-override';

const router = express.Router();
const controller = new CountryController();

router.use(methodOverride('_method'));

// Rutas API
router.get('/api/fetch', controller.fetchCountries);
router.get('/api/countries', controller.getAllCountries);
router.get('/api/countries/:id', controller.getCountryById);
router.get('/api/countries/search', controller.searchCountriesByAttribute);
router.get('/api/countries/population', controller.getCountriesByPopulation);

// Rutas de vistas
router.get('/', (req, res) => res.render('home', { title: 'Inicio' }));
router.get('/dashboard', controller.getAllCountries);
router.get('/add', controller.showAddForm);
router.post('/add', validarCountry, controller.createCountry);
router.get('/edit/:id', controller.showEditForm);
router.put('/edit/:id', validarCountry, controller.updateCountry);
router.delete('/delete/:id', controller.deleteCountry);

export default router;

// Explicación:
// Define rutas para la API (/api/*) y para las vistas (/, /dashboard, etc.).
// Usa method-override para soportar PUT y DELETE en formularios.
// Aplica el middleware validarCountry a las rutas que modifican datos.
