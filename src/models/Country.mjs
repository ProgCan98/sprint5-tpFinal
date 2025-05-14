import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: {
    official: {
      type: String,
      required: [true, 'El nombre oficial es obligatorio'],
      trim: true,
      minlength: [3, 'El nombre oficial debe tener al menos 3 caracteres'],
      maxlength: [90, 'El nombre oficial no puede superar los 90 caracteres'],
    },
    common: String,
  },
  capital: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.every((c) => c.trim().length >= 3 && c.trim().length <= 90);
      },
      message: 'Cada capital debe tener entre 3 y 90 caracteres.',
    },
  },
  borders: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.every((b) => /^[A-Z]{3}$/.test(b));
      },
      message: 'Cada frontera debe ser un código de 3 letras mayúsculas.',
    },
  },
  area: {
    type: Number,
    required: [true, 'El área es obligatoria'],
    min: [0, 'El área debe ser un número positivo'],
  },
  population: {
    type: Number,
    required: [true, 'La población es obligatoria'],
    min: [0, 'La población debe ser un número positivo'],
  },
  gini: {
    type: Number,
    min: [0, 'El índice Gini debe ser al menos 0'],
    max: [100, 'El índice Gini no puede superar 100'],
  },
  timezones: [String],
  creador: {
    type: String,
    default: 'Leandro', // Reemplaza 'TuNombre' con tu nombre real
  },
  createdAt: { type: Date, default: Date.now },
});

const Country = mongoose.model('Country', countrySchema, 'Grupo-17');
export default Country;

// Este código define el modelo Country para MongoDB usando Mongoose