# Proyecto de Gestión de Países Hispanohablantes

## Objetivos del Proyecto

Este proyecto tiene como objetivo desarrollar una aplicación web utilizando Node.js, Express y MongoDB para gestionar información de países hispanohablantes. Los datos se consumen de la API https://restcountries.com/v3.1/all, se procesan y se almacenan en la colección `Grupo-17` de la base de datos `Node-js`. La aplicación permite listar, agregar, editar y eliminar países con validaciones y una interfaz web intuitiva.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para crear el servidor y manejar rutas.
- **MongoDB/Mongoose**: Base de datos y ORM para interactuar con la colección `Grupo-17`.
- **EJS**: Motor de plantillas para las vistas.
- **Express-EJS-Layouts**: Para usar layouts en las vistas.
- **Method-Override**: Para soportar métodos HTTP como PUT y DELETE en formularios.
- **Axios**: Para consumir la API de Rest Countries.
- **Dotenv**: Para manejar variables de entorno.
- **Nodemon**: Para recarga automática durante desarrollo.

## Pasos para Ejecutar la Aplicación

1. Clona o descarga el proyecto en tu máquina.
2. Navega al directorio del proyecto:
   ```bash
   cd hispanic-countries-app
   ```
