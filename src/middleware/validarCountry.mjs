const validarCountry = (req, res, next) => {
  const { name, capital, borders, area, population, gini, timezones } =
    req.body;

  const errores = [];

  // Validar name.official
  if (
    !name?.official ||
    name.official.trim().length < 3 ||
    name.official.trim().length > 90
  ) {
    errores.push('El nombre oficial debe tener entre 3 y 90 caracteres.');
  }

  // Validar capital
  let capitalArray = [];
  if (typeof capital === 'string') {
    capitalArray = capital
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
  } else if (Array.isArray(capital)) {
    capitalArray = capital;
  }
  if (
    capitalArray.length > 0 &&
    !capitalArray.every((c) => c.trim().length >= 3 && c.trim().length <= 90)
  ) {
    errores.push('Cada capital debe tener entre 3 y 90 caracteres.');
  }
  req.body.capital = capitalArray;

  // Validar borders
  let bordersArray = [];
  if (typeof borders === 'string') {
    bordersArray = borders
      .split(',')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
  } else if (Array.isArray(borders)) {
    bordersArray = borders;
  }
  if (
    bordersArray.length > 0 &&
    !bordersArray.every((b) => /^[A-Z]{3}$/.test(b))
  ) {
    errores.push('Cada frontera debe ser un código de 3 letras mayúsculas.');
  }
  req.body.borders = bordersArray;

  // Validar area
  if (!area || isNaN(area) || area < 0) {
    errores.push('El área debe ser un número positivo.');
  }

  // Validar population
  if (
    !population ||
    isNaN(population) ||
    population < 0 ||
    !Number.isInteger(Number(population))
  ) {
    errores.push('La población debe ser un número entero positivo.');
  }

  // Validar gini
  if (gini && (isNaN(gini) || gini < 0 || gini > 100)) {
    errores.push('El índice Gini debe estar entre 0 y 100.');
  }

  // Validar timezones
  let timezonesArray = [];
  if (typeof timezones === 'string') {
    timezonesArray = timezones
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  } else if (Array.isArray(timezones)) {
    timezonesArray = timezones;
  }
  req.body.timezones = timezonesArray;

  if (errores.length > 0) {
    return res.status(400).render('addCountry', {
      errores,
      country: req.body,
      title: 'Agregar País',
    });
  }

  next();
};

export default validarCountry;
