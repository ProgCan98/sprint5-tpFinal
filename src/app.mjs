import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.mjs';
import countryRoutes from './routes/countryRoutes.mjs';
import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

// Conectar a MongoDB
connectDB();

// Obtiene la ruta del archivo actual (__filename) y el directorio (__dirname) para trabajar con rutas de archivos.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar motor de vistas
app.set('view engine', 'ejs');
// Especifica la carpeta donde se encuentran las vistas EJS
app.set('views', './src/views');
// Habilita el uso de layouts con express-ejs-layouts para estructurar las vistas con una plantilla común.
app.use(expressLayouts);
// Establece el archivo de layout predeterminado
app.set('layout', './layout');

// Middleware para parsear solicitudes con cuerpos en formato JSON.
app.use(express.json());
// Middleware para parsear datos de formularios HTML
app.use(express.urlencoded({ extended: true }));
// Middleware para permitir el uso de métodos HTTP como PUT y DELETE en formularios HTML.
app.use(methodOverride('_method'));
// Configura la carpeta 'public' como estática para servir archivos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', countryRoutes);

// Define el puerto en el que el servidor escuchará solicitudes.
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
